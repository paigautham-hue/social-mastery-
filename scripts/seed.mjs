import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Seed Learning Paths
    console.log("Creating learning paths...");
    const beginnerPath = await db.insert(schema.learningPaths).values({
      name: "Foundations of Attraction",
      slug: "foundations",
      description: "Master the fundamentals of social dynamics, body language, and conversation basics",
      level: "beginner",
      order: 1
    });

    const intermediatePath = await db.insert(schema.learningPaths).values({
      name: "Advanced Game Techniques",
      slug: "advanced-techniques",
      description: "Learn advanced strategies including push-pull, qualification, and escalation",
      level: "intermediate",
      order: 2
    });

    const advancedPath = await db.insert(schema.learningPaths).values({
      name: "Mastery & Inner Game",
      slug: "mastery",
      description: "Develop unshakeable confidence, abundance mentality, and authentic presence",
      level: "advanced",
      order: 3
    });

    // Seed Lessons for Beginner Path
    console.log("Creating lessons...");
    await db.insert(schema.lessons).values([
      {
        pathId: 1,
        title: "Introduction to Attraction Dynamics",
        slug: "intro-attraction",
        description: "Understanding the fundamental principles of attraction and social dynamics",
        content: "# Introduction to Attraction Dynamics\n\nAttraction is not a choice - it's a biological response to specific triggers...",
        contentType: "text",
        order: 1,
        pointsReward: 10,
        estimatedMinutes: 15
      },
      {
        pathId: 1,
        title: "Body Language Fundamentals",
        slug: "body-language-basics",
        description: "Learn to read and project confident, attractive body language",
        content: "# Body Language Fundamentals\n\nYour body language communicates more than your words...",
        contentType: "text",
        order: 2,
        pointsReward: 10,
        estimatedMinutes: 20
      },
      {
        pathId: 1,
        title: "The Art of the Approach",
        slug: "art-of-approach",
        description: "Overcome approach anxiety and learn proven opening techniques",
        content: "# The Art of the Approach\n\nThe approach is the first critical moment...",
        contentType: "text",
        order: 3,
        pointsReward: 15,
        estimatedMinutes: 25
      }
    ]);

    // Seed IOI/IOD Indicators
    console.log("Creating IOI/IOD indicators...");
    await db.insert(schema.indicators).values([
      // IOIs - Body Language
      {
        type: "ioi",
        category: "body_language",
        name: "Sustained Eye Contact",
        description: "She holds eye contact for longer than normal, especially with a smile",
        confidenceLevel: "strong"
      },
      {
        type: "ioi",
        category: "body_language",
        name: "Hair Touch/Play",
        description: "She touches or plays with her hair while talking to you",
        confidenceLevel: "mild"
      },
      {
        type: "ioi",
        category: "body_language",
        name: "Leaning In",
        description: "She leans toward you during conversation",
        confidenceLevel: "strong"
      },
      {
        type: "ioi",
        category: "body_language",
        name: "Mirroring",
        description: "She unconsciously mirrors your body language and gestures",
        confidenceLevel: "strong"
      },
      {
        type: "ioi",
        category: "body_language",
        name: "Feet Pointing Toward You",
        description: "Her feet and body are oriented toward you, not away",
        confidenceLevel: "mild"
      },
      // IOIs - Verbal
      {
        type: "ioi",
        category: "verbal",
        name: "Asking Personal Questions",
        description: "She asks about your life, interests, and background",
        confidenceLevel: "strong"
      },
      {
        type: "ioi",
        category: "verbal",
        name: "Laughing at Your Jokes",
        description: "She laughs genuinely at your humor, even mild jokes",
        confidenceLevel: "mild"
      },
      {
        type: "ioi",
        category: "verbal",
        name: "Qualifying Herself",
        description: "She tries to impress you or explains why she's interesting",
        confidenceLevel: "strong"
      },
      // IOIs - Behavioral
      {
        type: "ioi",
        category: "behavioral",
        name: "Initiating Touch",
        description: "She finds excuses to touch your arm, shoulder, or hand",
        confidenceLevel: "strong"
      },
      {
        type: "ioi",
        category: "behavioral",
        name: "Proximity Seeking",
        description: "She finds reasons to be physically close to you",
        confidenceLevel: "strong"
      },
      {
        type: "ioi",
        category: "behavioral",
        name: "Quick Text Responses",
        description: "She responds to your texts quickly and enthusiastically",
        confidenceLevel: "mild"
      },
      // IODs - Body Language
      {
        type: "iod",
        category: "body_language",
        name: "Crossed Arms",
        description: "Arms crossed, creating a physical barrier",
        confidenceLevel: "mild"
      },
      {
        type: "iod",
        category: "body_language",
        name: "Looking Away",
        description: "Frequently looking away or scanning the room",
        confidenceLevel: "strong"
      },
      {
        type: "iod",
        category: "body_language",
        name: "Leaning Back",
        description: "Leaning away from you, creating distance",
        confidenceLevel: "strong"
      },
      // IODs - Verbal
      {
        type: "iod",
        category: "verbal",
        name: "Short Answers",
        description: "One-word responses without elaboration",
        confidenceLevel: "strong"
      },
      {
        type: "iod",
        category: "verbal",
        name: "Mentioning Other Guys",
        description: "Frequently bringing up other men or her boyfriend",
        confidenceLevel: "mild"
      },
      // IODs - Behavioral
      {
        type: "iod",
        category: "behavioral",
        name: "Phone Checking",
        description: "Constantly checking her phone during conversation",
        confidenceLevel: "strong"
      },
      {
        type: "iod",
        category: "behavioral",
        name: "Slow Text Responses",
        description: "Takes hours or days to respond to messages",
        confidenceLevel: "mild"
      }
    ]);

    // Seed Badges
    console.log("Creating badges...");
    await db.insert(schema.badges).values([
      {
        name: "First Steps",
        description: "Complete your first lesson",
        iconUrl: "🎯",
        criteria: "complete_1_lesson"
      },
      {
        name: "Knowledge Seeker",
        description: "Complete 10 lessons",
        iconUrl: "📚",
        criteria: "complete_10_lessons"
      },
      {
        name: "Approach Master",
        description: "Log 50 approaches",
        iconUrl: "💪",
        criteria: "log_50_approaches"
      },
      {
        name: "Consistent Player",
        description: "Maintain a 7-day streak",
        iconUrl: "🔥",
        criteria: "7_day_streak"
      },
      {
        name: "Dedicated Student",
        description: "Maintain a 30-day streak",
        iconUrl: "⭐",
        criteria: "30_day_streak"
      },
      {
        name: "Quiz Champion",
        description: "Score 100% on 5 quizzes",
        iconUrl: "🏆",
        criteria: "perfect_5_quizzes"
      }
    ]);

    // Seed Glossary Terms
    console.log("Creating glossary terms...");
    await db.insert(schema.glossary).values([
      {
        term: "IOI",
        definition: "Indicator of Interest - A signal that shows someone is attracted to or interested in you",
        category: "fundamentals"
      },
      {
        term: "IOD",
        definition: "Indicator of Disinterest - A signal that shows someone is not interested or attracted to you",
        category: "fundamentals"
      },
      {
        term: "Kino",
        definition: "Physical touch and escalation. From 'kinesthetic' - relating to physical sensation",
        category: "escalation"
      },
      {
        term: "DHV",
        definition: "Demonstration of Higher Value - Displaying qualities that make you more attractive (confidence, social proof, etc.)",
        category: "attraction"
      },
      {
        term: "Shit Test",
        definition: "A challenge or test thrown by a woman to see if you're confident and unshakeable",
        category: "fundamentals"
      },
      {
        term: "Frame",
        definition: "Your reality and perspective. Maintaining frame means staying confident in your worldview",
        category: "fundamentals"
      },
      {
        term: "Qualification",
        definition: "Making her prove herself worthy of your attention and investment",
        category: "attraction"
      },
      {
        term: "Push-Pull",
        definition: "Alternating between showing interest and withdrawing it to create emotional tension",
        category: "advanced"
      },
      {
        term: "Compliance",
        definition: "Her willingness to follow your lead and invest in the interaction",
        category: "escalation"
      },
      {
        term: "Number Close",
        definition: "Successfully getting her phone number",
        category: "fundamentals"
      },
      {
        term: "Kiss Close",
        definition: "Successfully kissing her",
        category: "escalation"
      },
      {
        term: "Amused Mastery",
        definition: "Responding to tests and challenges with calm, playful confidence",
        category: "advanced"
      }
    ]);

    // Seed Community Challenge
    console.log("Creating community challenges...");
    await db.insert(schema.challenges).values([
      {
        title: "30-Day Approach Challenge",
        description: "Make at least one approach every day for 30 days straight",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        pointsReward: 500
      },
      {
        title: "Weekend Warrior",
        description: "Log 10 approaches this weekend",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        pointsReward: 100
      }
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
