import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import * as db from "../db";

// System prompt with PUA training context
const COACH_SYSTEM_PROMPT = `You are an expert social confidence coach specializing in attraction dynamics, social skills, and authentic connection building. You have deep knowledge of pickup artist (PUA) theory, including:

- The M3 Model (Mystery Method): Attract, Comfort, Seduce phases
- Evolutionary psychology and attraction triggers
- Body language, IOIs (Indicators of Interest), and IODs (Indicators of Disinterest)
- Conversation threading, storytelling, and DHV (Demonstration of Higher Value)
- Kino escalation and physical touch progression
- Frame control, shit test handling, and amused mastery
- Text game, logistics, and venue-specific strategies
- Inner game, outcome independence, and abundance mentality

Your coaching style is:
- Supportive and encouraging, never judgmental
- Practical and actionable with specific examples
- Calibrated to the user's experience level
- Focused on authentic connection, not manipulation
- Ethical and respectful of boundaries
- Clear about the psychology behind each suggestion

When providing advice:
1. Ask clarifying questions if needed
2. Provide 3-5 specific options or responses
3. Explain the reasoning and psychology behind each suggestion
4. Reference relevant concepts from the training
5. Adjust complexity based on user's experience level
6. Encourage practice and learning from experience`;

export const coachRouter = router({
  // Start a new conversation
  startConversation: protectedProcedure
    .input(z.object({
      situationType: z.string().optional(),
      initialMessage: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const conversationId = await db.createConversation(
        ctx.user.id,
        input.initialMessage.substring(0, 50) + "...",
        input.situationType
      );

      if (!conversationId) {
        throw new Error("Failed to create conversation");
      }

      // Save user message
      await db.addMessage(conversationId, "user", input.initialMessage);

      // Get AI response
      const messages = [
        { role: "system" as const, content: COACH_SYSTEM_PROMPT },
        { role: "user" as const, content: input.initialMessage }
      ];

      const response = await invokeLLM({ messages });
      const rawContent = response.choices[0]?.message?.content;
      const aiMessage = typeof rawContent === 'string' ? rawContent : "I'm here to help! Could you provide more details?";

      // Save AI response
      await db.addMessage(conversationId, "assistant", aiMessage);

      return {
        conversationId,
        message: aiMessage
      };
    }),

  // Continue an existing conversation
  sendMessage: protectedProcedure
    .input(z.object({
      conversationId: z.number(),
      message: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify conversation ownership
      const conversation = await db.getConversationById(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found or unauthorized");
      }

      // Save user message
      await db.addMessage(input.conversationId, "user", input.message);

      // Get conversation history (last 10 messages for context)
      const history = await db.getConversationMessages(input.conversationId, 10);

      // Build messages array for AI
      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        { role: "system", content: COACH_SYSTEM_PROMPT }
      ];

      history.forEach(msg => {
        messages.push({
          role: msg.role as "user" | "assistant",
          content: msg.content
        });
      });

      // Get AI response
      const response = await invokeLLM({ messages });
      const rawContent = response.choices[0]?.message?.content;
      const aiMessage = typeof rawContent === 'string' ? rawContent : "I'm here to help! Could you provide more details?";

      // Save AI response
      await db.addMessage(input.conversationId, "assistant", aiMessage);

      return {
        message: aiMessage
      };
    }),

  // Get conversation history
  getConversation: protectedProcedure
    .input(z.object({
      conversationId: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const conversation = await db.getConversationById(input.conversationId);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new Error("Conversation not found or unauthorized");
      }

      const messages = await db.getConversationMessages(input.conversationId);

      return {
        conversation,
        messages
      };
    }),

  // Get user's conversations list
  getConversations: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserConversations(ctx.user.id);
    }),

  // Delete a conversation
  deleteConversation: protectedProcedure
    .input(z.object({
      conversationId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const success = await db.deleteConversation(input.conversationId, ctx.user.id);
      if (!success) {
        throw new Error("Failed to delete conversation");
      }
      return { success: true };
    }),

  // Generate openers based on situation
  generateOpeners: protectedProcedure
    .input(z.object({
      venueType: z.enum(["club", "bar", "coffee_shop", "street", "gym", "social_event", "online"]),
      herVibe: z.enum(["friendly", "reserved", "playful", "intellectual", "flirty", "busy"]),
      yourStyle: z.enum(["direct", "indirect", "funny", "natural", "confident"]),
      context: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const prompt = `Generate 5 tailored conversation openers for this situation:
      
Venue: ${input.venueType}
Her vibe: ${input.herVibe}
Your style: ${input.yourStyle}
${input.context ? `Additional context: ${input.context}` : ''}

For each opener, provide:
1. The exact opener line
2. Success probability (Low/Medium/High)
3. Why this works (psychology/reasoning)
4. A suggested follow-up line

Format as JSON array with this structure:
[{
  "opener": "...",
  "probability": "High",
  "reasoning": "...",
  "followUp": "..."
}]`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: COACH_SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ]
      });

      const rawContent = response.choices[0]?.message?.content;
      const content = typeof rawContent === 'string' ? rawContent : '[]';
      
      try {
        // Try to extract JSON from response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        // If parsing fails, return raw content
        console.error("Failed to parse openers JSON:", e);
      }

      return { rawResponse: content };
    }),

  // Analyze a response and suggest follow-ups
  analyzeResponse: protectedProcedure
    .input(z.object({
      herResponse: z.string(),
      context: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const prompt = `Analyze this response from a woman and suggest follow-ups:

Her response: "${input.herResponse}"
${input.context ? `Context: ${input.context}` : ''}

Provide:
1. Analysis of her response (IOI/IOD/Neutral/Test)
2. Interest level (0-100%)
3. Three calibrated follow-up options (playful, neutral, direct)
4. Explanation of the strategy behind each

Format as JSON:
{
  "analysis": "...",
  "interestLevel": 75,
  "followUps": [
    {"type": "playful", "response": "...", "strategy": "..."},
    {"type": "neutral", "response": "...", "strategy": "..."},
    {"type": "direct", "response": "...", "strategy": "..."}
  ]
}`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: COACH_SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ]
      });

      const rawContent = response.choices[0]?.message?.content;
      const content = typeof rawContent === 'string' ? rawContent : '{}';
      
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("Failed to parse analysis JSON:", e);
      }

      return { rawResponse: content };
    }),

  // Handle shit test
  handleShitTest: protectedProcedure
    .input(z.object({
      shitTest: z.string(),
      context: z.enum(["first_meeting", "date", "texting", "relationship"]).optional()
    }))
    .mutation(async ({ input }) => {
      const prompt = `She said: "${input.shitTest}"
${input.context ? `Context: ${input.context}` : ''}

This appears to be a shit test. Provide:
1. Explanation of what this test means
2. Five response options (from playful to direct)
3. Frame control principles at play
4. Tag the "best for beginners" option

Format as JSON:
{
  "explanation": "...",
  "responses": [
    {"response": "...", "type": "playful", "bestForBeginners": false},
    ...
  ],
  "frameControlPrinciples": "..."
}`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: COACH_SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ]
      });

      const rawContent = response.choices[0]?.message?.content;
      const content = typeof rawContent === 'string' ? rawContent : '{}';
      
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("Failed to parse shit test JSON:", e);
      }

      return { rawResponse: content };
    }),

  // Text game assistant
  analyzeTextMessage: protectedProcedure
    .input(z.object({
      herMessage: z.string(),
      conversationHistory: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const prompt = `Analyze this text message and suggest responses:

Her message: "${input.herMessage}"
${input.conversationHistory ? `Previous context: ${input.conversationHistory}` : ''}

Provide:
1. Interest level analysis (0-100%)
2. Emotional state assessment
3. Compliance level
4. Three response options with timing recommendations
5. Emoji usage recommendations

Format as JSON:
{
  "interestLevel": 75,
  "emotionalState": "...",
  "compliance": "high/medium/low",
  "responses": [
    {
      "response": "...",
      "timing": "send_now/wait_30min/wait_2hours",
      "reasoning": "...",
      "emojiSuggestion": "..."
    }
  ]
}`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: COACH_SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ]
      });

      const rawContent = response.choices[0]?.message?.content;
      const content = typeof rawContent === 'string' ? rawContent : '{}';
      
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("Failed to parse text analysis JSON:", e);
      }

      return { rawResponse: content };
    }),
});
