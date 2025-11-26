import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import * as db from "../db";

export const practiceRouter = router({
  // Get all IOI/IOD indicators
  getAllIndicators: publicProcedure
    .query(async () => {
      return await db.getAllIndicators();
    }),

  // Get indicators by type
  getIndicatorsByType: publicProcedure
    .input(z.object({
      type: z.enum(["ioi", "iod"])
    }))
    .query(async ({ input }) => {
      return await db.getIndicatorsByType(input.type);
    }),

  // Get indicators by category
  getIndicatorsByCategory: publicProcedure
    .input(z.object({
      category: z.enum(["body_language", "verbal", "behavioral"])
    }))
    .query(async ({ input }) => {
      return await db.getIndicatorsByCategory(input.category);
    }),

  // Search indicators
  searchIndicators: publicProcedure
    .input(z.object({
      query: z.string()
    }))
    .query(async ({ input }) => {
      return await db.searchIndicators(input.query);
    }),

  // Analyze scenario for interest level
  analyzeScenario: protectedProcedure
    .input(z.object({
      description: z.string(),
      observedSignals: z.array(z.number()) // array of indicator IDs
    }))
    .mutation(async ({ input }) => {
      // Get the indicators
      const allIndicators = await db.getAllIndicators();
      const selectedIndicators = allIndicators.filter(ind => 
        input.observedSignals.includes(ind.id)
      );

      // Build prompt for AI analysis
      const signalsList = selectedIndicators.map(ind => 
        `- ${ind.name} (${ind.type.toUpperCase()}, ${ind.confidenceLevel})`
      ).join('\n');

      const prompt = `Analyze this social interaction scenario:

Situation: ${input.description}

Observed signals:
${signalsList}

Provide:
1. Overall interest level (0-100%)
2. Analysis of the signals
3. What to do next (specific actionable advice)
4. Confidence in assessment (Low/Medium/High)

Format as JSON:
{
  "interestLevel": 75,
  "analysis": "...",
  "nextSteps": "...",
  "confidence": "High"
}`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: "You are an expert in reading social cues and attraction signals." },
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
        console.error("Failed to parse scenario analysis:", e);
      }

      return { rawResponse: content };
    }),

  // Create field report
  createFieldReport: protectedProcedure
    .input(z.object({
      title: z.string(),
      venue: z.string().optional(),
      venueType: z.enum(["club", "bar", "coffee_shop", "street", "gym", "social_event", "online"]).optional(),
      outcome: z.enum(["number_close", "kiss_close", "date_scheduled", "rejection", "conversation_only"]).optional(),
      description: z.string(),
      lessonsLearned: z.string().optional(),
      isPublic: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.createFieldReport(ctx.user.id, input);
      return { success: true };
    }),

  // Get user's field reports
  getUserFieldReports: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserFieldReports(ctx.user.id);
    }),

  // Get public field reports
  getPublicFieldReports: publicProcedure
    .input(z.object({
      limit: z.number().optional()
    }))
    .query(async ({ input }) => {
      return await db.getPublicFieldReports(input.limit);
    }),

  // Delete field report
  deleteFieldReport: protectedProcedure
    .input(z.object({
      reportId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const success = await db.deleteFieldReport(input.reportId, ctx.user.id);
      if (!success) {
        throw new Error("Failed to delete field report");
      }
      return { success: true };
    }),
});
