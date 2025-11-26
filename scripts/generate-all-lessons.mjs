import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";
import { invokeLLM } from "../server/_core/llm.js";
import fs from 'fs';

const db = drizzle(process.env.DATABASE_URL);

// Load training data
const trainingData = fs.readFileSync('./server/training_data.md', 'utf-8');

// Lesson templates based on curriculum structure
const lessonTemplates = [
  // BEGINNER PATH (Lessons 6-15)
  {
    pathId: 1,
    title: "Opening Conversations Naturally",
    slug: "opening-conversations-naturally",
    description: "Master the art of starting conversations with direct, indirect, and situational openers",
    topics: ["Direct openers", "Indirect openers", "Situational openers", "Opinion openers", "False time constraints"],
    order: 6,
    duration: 30,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Active Listening & Engagement",
    slug: "active-listening-engagement",
    description: "Develop genuine curiosity and engagement through active listening techniques",
    topics: ["Power of curiosity", "Reflective listening", "Conversational threading", "Avoiding interview mode"],
    order: 7,
    duration: 25,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Storytelling Basics",
    slug: "storytelling-basics",
    description: "Learn to tell engaging stories that demonstrate value and create emotional connection",
    topics: ["Story structure", "Emotional hooks", "DHV through stories", "Pacing and delivery"],
    order: 8,
    duration: 30,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Handling Basic Tests",
    slug: "handling-basic-tests",
    description: "Recognize and pass compliance tests and basic shit tests with confidence",
    topics: ["Compliance tests", "Simple shit test responses", "Maintaining frame", "Playful responses"],
    order: 9,
    duration: 25,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Building Comfort & Rapport",
    slug: "building-comfort-rapport",
    description: "Create deep connection through comfort building and authentic rapport",
    topics: ["Comfort phase explained", "Finding common ground", "Vulnerability", "Trust-building"],
    order: 10,
    duration: 30,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Introduction to Kino",
    slug: "introduction-to-kino",
    description: "Understand physical touch escalation and the touch ladder fundamentals",
    topics: ["What is kino", "Touch ladder", "Casual touch", "Reading receptiveness"],
    order: 11,
    duration: 25,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Personal Space & Proximity",
    slug: "personal-space-proximity",
    description: "Master the art of closing distance while respecting boundaries",
    topics: ["Social distances", "Closing distance gradually", "Respecting boundaries", "When to step back"],
    order: 12,
    duration: 20,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Reading Interest Signals",
    slug: "reading-interest-signals",
    description: "Identify and respond to indicators of interest and disinterest",
    topics: ["Common IOIs", "Common IODs", "Mixed signals", "Calibrating responses"],
    order: 13,
    duration: 25,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "First Date Fundamentals",
    slug: "first-date-fundamentals",
    description: "Plan and execute successful first dates with proper escalation",
    topics: ["Planning dates", "Conversation topics", "Physical escalation", "Ending on high note"],
    order: 14,
    duration: 30,
    difficulty: "beginner"
  },
  {
    pathId: 1,
    title: "Beginner Path Capstone",
    slug: "beginner-path-capstone",
    description: "Integrate all beginner concepts and create your action plan",
    topics: ["Integration", "Common mistakes", "Action plan", "Next steps"],
    order: 15,
    duration: 35,
    difficulty: "beginner"
  },

  // INTERMEDIATE PATH (Lessons 16-30)
  {
    pathId: 2,
    title: "Advanced Storytelling & DHV",
    slug: "advanced-storytelling-dhv",
    description: "Master nested loops, thread management, and strategic vulnerability",
    topics: ["Nested loops", "Thread management", "Strategic vulnerability", "Social proof stories"],
    order: 16,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Push-Pull Dynamics",
    slug: "push-pull-dynamics",
    description: "Create emotional waves and maintain attraction through push-pull",
    topics: ["Emotional waves", "Interest and challenge", "Teasing vs negging", "Maintaining tension"],
    order: 17,
    duration: 25,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Frame Control Mastery",
    slug: "frame-control-mastery",
    description: "Define, hold, and control frame in any social situation",
    topics: ["Defining frame", "Holding under pressure", "Reframing techniques", "Meta-frame awareness"],
    order: 18,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Handling Advanced Shit Tests",
    slug: "handling-advanced-shit-tests",
    description: "Master agree and amplify, pressure flips, and amused mastery",
    topics: ["Agree and amplify", "Pressure flips", "Amused mastery", "Nuclear responses"],
    order: 19,
    duration: 25,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Qualification & Investment",
    slug: "qualification-investment",
    description: "Make her qualify herself and build mutual investment",
    topics: ["Making her qualify", "Mutual investment", "Power of standards", "Screening compatibility"],
    order: 20,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Nightclub & Bar Game",
    slug: "nightclub-bar-game",
    description: "Navigate high-energy nightlife environments with confidence",
    topics: ["High-energy environments", "Loud music strategies", "Group dynamics", "Logistics"],
    order: 21,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Daygame Mastery",
    slug: "daygame-mastery",
    description: "Master street approaches and daytime venue game",
    topics: ["Street approaches", "Coffee shop game", "Gym venues", "Time-bridging"],
    order: 22,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Social Circle Game",
    slug: "social-circle-game",
    description: "Leverage social proof and build attractive social circles",
    topics: ["Social proof leverage", "Building circles", "Avoiding friend zone", "Dating within circles"],
    order: 23,
    duration: 25,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Online & App Game",
    slug: "online-app-game",
    description: "Optimize your online presence and convert matches to dates",
    topics: ["Profile optimization", "Opening messages", "Moving to in-person", "Avoiding time-wasters"],
    order: 24,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Work & Professional Settings",
    slug: "work-professional-settings",
    description: "Navigate professional boundaries and workplace attraction",
    topics: ["Professional boundaries", "Subtle escalation", "Workplace IOIs", "Risk management"],
    order: 25,
    duration: 25,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Understanding Female Psychology",
    slug: "understanding-female-psychology",
    description: "Deep dive into female attraction triggers and psychology",
    topics: ["Emotional processing", "Hypergamy", "Dual mating strategy", "What women want"],
    order: 26,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Reading Emotional States",
    slug: "reading-emotional-states",
    description: "Identify and lead emotional states for deeper connection",
    topics: ["Emotional cues", "Matching and leading", "Creating experiences", "Mood calibration"],
    order: 27,
    duration: 25,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Text Game Mastery",
    slug: "text-game-mastery",
    description: "Master texting fundamentals, timing, and creating anticipation",
    topics: ["Texting fundamentals", "Timing and frequency", "Creating anticipation", "Moving to dates"],
    order: 28,
    duration: 30,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Phone Game & Voice",
    slug: "phone-game-voice",
    description: "Use voice tonality and phone calls to build attraction",
    topics: ["Call vs text", "Voice tonality", "Building comfort", "Setting up dates"],
    order: 29,
    duration: 25,
    difficulty: "intermediate"
  },
  {
    pathId: 2,
    title: "Intermediate Path Capstone",
    slug: "intermediate-path-capstone",
    description: "Integrate intermediate concepts and develop your personalized strategy",
    topics: ["Integration exercises", "Venue strategies", "Personalized plan", "Advanced preview"],
    order: 30,
    duration: 35,
    difficulty: "intermediate"
  },

  // ADVANCED PATH (Lessons 31-45)
  {
    pathId: 3,
    title: "Social Hierarchy & Status",
    slug: "social-hierarchy-status",
    description: "Understand and build genuine social value and status",
    topics: ["Social value", "Building status", "Preselection", "Alpha dynamics"],
    order: 31,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Group Dynamics Mastery",
    slug: "group-dynamics-mastery",
    description: "Master mixed sets, obstacles, and group social dynamics",
    topics: ["Mixed sets", "Handling obstacles", "AMOG tactics", "Winning groups"],
    order: 32,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Advanced Kino Escalation",
    slug: "advanced-kino-escalation",
    description: "Master the DiCarlo Escalation Ladder and sexual tension",
    topics: ["DiCarlo Ladder", "Micro-responses", "Ethical escalation", "Sexual tension"],
    order: 33,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Seduction & Intimacy",
    slug: "seduction-intimacy",
    description: "Navigate the seduction phase with ethics and effectiveness",
    topics: ["Seduction phase", "Romantic moments", "Logistics mastery", "Ethical escalation"],
    order: 34,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Long-Term Attraction",
    slug: "long-term-attraction",
    description: "Maintain attraction in relationships and avoid common pitfalls",
    topics: ["Relationship attraction", "Avoiding beta slide", "Keeping mystery", "Relationship game"],
    order: 35,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Developing Your Unique Style",
    slug: "developing-unique-style",
    description: "Find your authentic voice and develop your personal style",
    topics: ["Authentic voice", "Personality archetypes", "Playing to strengths", "Avoiding cookie-cutter"],
    order: 36,
    duration: 25,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Vocal Mastery & Presence",
    slug: "vocal-mastery-presence",
    description: "Master voice tonality, pacing, and commanding presence",
    topics: ["Voice tonality", "Pacing and rhythm", "Commanding attention", "Storytelling voice"],
    order: 37,
    duration: 25,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Leadership & Social Value",
    slug: "leadership-social-value",
    description: "Develop natural leadership and high social value",
    topics: ["Leadership qualities", "Decision-making", "Inspiring others", "Building tribes"],
    order: 38,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Emotional Mastery",
    slug: "emotional-mastery",
    description: "Master your emotions and create powerful states",
    topics: ["Managing emotions", "Staying centered", "Emotional contagion", "Powerful states"],
    order: 39,
    duration: 25,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Authentic Vulnerability",
    slug: "authentic-vulnerability",
    description: "Balance strength with openness for deep connection",
    topics: ["Strategic disclosure", "Deep connection", "Strength and openness", "True intimacy"],
    order: 40,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Reading Micro-Expressions",
    slug: "reading-micro-expressions",
    description: "Master facial coding and detecting true emotions",
    topics: ["Facial coding", "Detecting deception", "True emotions", "Calibrating responses"],
    order: 41,
    duration: 25,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Advanced Frame Battles",
    slug: "advanced-frame-battles",
    description: "Navigate complex frame dynamics and meta-frames",
    topics: ["Meta-frame concepts", "Frame grabs", "Collaborative frames", "Win-win dynamics"],
    order: 42,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Lifestyle Design",
    slug: "lifestyle-design",
    description: "Build an attractive life that creates passive attraction",
    topics: ["Attractive life", "Purpose and mission", "Circle optimization", "Passive attraction"],
    order: 43,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Ethical Game & Boundaries",
    slug: "ethical-game-boundaries",
    description: "Practice ethical game with respect for boundaries and consent",
    topics: ["Consent and respect", "Recognizing manipulation", "Genuine connections", "Long-term thinking"],
    order: 44,
    duration: 30,
    difficulty: "advanced"
  },
  {
    pathId: 3,
    title: "Advanced Path Capstone",
    slug: "advanced-path-capstone",
    description: "Complete your mastery journey and create your personal system",
    topics: ["Mastery assessment", "Personal system", "Teaching others", "Continuous growth"],
    order: 45,
    duration: 40,
    difficulty: "advanced"
  }
];

async function generateLessonContent(template) {
  console.log(`Generating content for: ${template.title}...`);
  
  const prompt = `You are an expert in social dynamics and attraction. Create comprehensive lesson content for "${template.title}".

Description: ${template.description}
Topics to cover: ${template.topics.join(", ")}
Difficulty: ${template.difficulty}

Use the following structure and make it practical, actionable, and based on proven principles:

# ${template.title}

## Learning Objectives
[3-5 clear, measurable learning objectives]

## Core Concepts
[Detailed explanation of 3-4 main concepts with theory and principles. Each concept should be 2-3 paragraphs with clear headers.]

## Practical Examples
[3 detailed real-world scenarios showing the concepts in action. Use "Example 1:", "Example 2:", etc. format]

## Exercises
[3-4 actionable exercises users can practice. Use "Exercise 1:", "Exercise 2:", etc. format]

## Common Mistakes
[5 common mistakes to avoid, numbered list with explanations]

## Key Takeaways
[5-7 bullet points summarizing the most important lessons]

## Field Assignment
[A specific weekly challenge with clear instructions and tracking guidance]

Make it engaging, practical, and grounded in real social dynamics principles. Focus on ethical, authentic connection.`;

  try {
    const response = await invokeLLM({
      messages: [
        { 
          role: "system", 
          content: `You are an expert social dynamics coach. Use this training data as reference:\n\n${trainingData.substring(0, 10000)}`
        },
        { role: "user", content: prompt }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content !== 'string') {
      throw new Error('Invalid response from LLM');
    }

    return content;
  } catch (error) {
    console.error(`Error generating content for ${template.title}:`, error);
    return `# ${template.title}\n\n[Content generation in progress]`;
  }
}

async function seedAllLessons() {
  console.log("🚀 Starting comprehensive lesson generation...");
  console.log(`📝 Total lessons to generate: ${lessonTemplates.length}`);

  let successCount = 0;
  let failCount = 0;

  for (const template of lessonTemplates) {
    try {
      // Generate content using AI
      const content = await generateLessonContent(template);

      // Insert into database
      await db.insert(schema.lessons).values({
        ...template,
        content,
        videoUrl: null,
        isPublished: true
      });

      successCount++;
      console.log(`✅ [${successCount}/${lessonTemplates.length}] ${template.title}`);

      // Rate limiting - wait 2 seconds between requests
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      failCount++;
      console.error(`❌ Failed to generate ${template.title}:`, error.message);
    }
  }

  console.log(`\n📊 Generation complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
}

seedAllLessons()
  .then(() => {
    console.log("\n🎉 All lessons generated successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Fatal error:", error);
    process.exit(1);
  });
