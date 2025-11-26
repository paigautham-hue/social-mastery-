import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

async function seedQuizzes() {
  console.log("🎯 Seeding quizzes...");

  try {
    // Create quiz for lesson 1 (Introduction to Attraction Dynamics)
    console.log("Creating quiz for Lesson 1...");
    await db.insert(schema.quizzes).values({
      lessonId: 1,
      title: "Attraction Dynamics Quiz",
      passingScore: 70
    });

    await db.insert(schema.quizQuestions).values([
      {
        quizId: 1,
        question: "What is the primary principle behind attraction according to the lesson?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Attraction is a conscious choice",
          "Attraction is a biological response to specific triggers",
          "Attraction is random and unpredictable",
          "Attraction only depends on physical appearance"
        ]),
        correctAnswer: "Attraction is a biological response to specific triggers",
        explanation: "Attraction is not a choice - it's a biological response triggered by specific behaviors and traits that signal value.",
        order: 1
      },
      {
        quizId: 1,
        question: "Which of the following is an example of DHV (Demonstration of Higher Value)?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Bragging about your wealth",
          "Telling an engaging story that shows leadership",
          "Agreeing with everything she says",
          "Constantly seeking her approval"
        ]),
        correctAnswer: "Telling an engaging story that shows leadership",
        explanation: "DHV is demonstrated through stories and behaviors that naturally showcase attractive qualities like confidence, social skills, and leadership.",
        order: 2
      },
      {
        quizId: 1,
        question: "What does IOI stand for?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Indication of Intelligence",
          "Indicator of Interest",
          "Initial Opening Introduction",
          "Instant Opportunity Indicator"
        ]),
        correctAnswer: "Indicator of Interest",
        explanation: "IOI stands for Indicator of Interest - signals that show someone is attracted or interested in you.",
        order: 3
      },
      {
        quizId: 1,
        question: "According to the M3 Model, what must be established before attempting seduction?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Attraction and Comfort",
          "Physical contact only",
          "Financial stability",
          "Social media connection"
        ]),
        correctAnswer: "Attraction and Comfort",
        explanation: "The M3 Model requires building Attraction first, then Comfort, before moving to Seduction. Skipping phases leads to rejection.",
        order: 4
      },
      {
        quizId: 1,
        question: "What is 'Frame' in social dynamics?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "A picture frame you use as a prop",
          "The underlying meaning or context of a social interaction",
          "The physical space around you",
          "A time limit for conversations"
        ]),
        correctAnswer: "The underlying meaning or context of a social interaction",
        explanation: "Frame is the underlying reality and perspective of an interaction. 'He who controls the frame controls the interaction.'",
        order: 5
      }
    ]);

    // Create quiz for lesson 2 (Body Language Fundamentals)
    console.log("Creating quiz for Lesson 2...");
    await db.insert(schema.quizzes).values({
      lessonId: 2,
      title: "Body Language Fundamentals Quiz",
      passingScore: 70
    });

    await db.insert(schema.quizQuestions).values([
      {
        quizId: 2,
        question: "What percentage of communication is non-verbal according to research?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "30-40%",
          "50-60%",
          "70-80%",
          "90-95%"
        ]),
        correctAnswer: "70-80%",
        explanation: "Research shows that 70-80% of communication is non-verbal, including body language, tone, and facial expressions.",
        order: 1
      },
      {
        quizId: 2,
        question: "Which body language signal typically indicates confidence?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Crossed arms and hunched shoulders",
          "Looking down and fidgeting",
          "Open posture and steady eye contact",
          "Constantly checking your phone"
        ]),
        correctAnswer: "Open posture and steady eye contact",
        explanation: "Confident body language includes open posture, steady eye contact, and relaxed movements that take up space.",
        order: 2
      },
      {
        quizId: 2,
        question: "What is 'mirroring' in body language?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Looking at yourself in a mirror",
          "Unconsciously copying someone's body language",
          "Reflecting on your behavior",
          "Making eye contact"
        ]),
        correctAnswer: "Unconsciously copying someone's body language",
        explanation: "Mirroring is when people unconsciously copy each other's body language, gestures, and posture - a sign of rapport and attraction.",
        order: 3
      },
      {
        quizId: 2,
        question: "Which of these is typically an IOI (Indicator of Interest) in body language?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "Crossed arms",
          "Looking away frequently",
          "Leaning in toward you",
          "Checking her phone constantly"
        ]),
        correctAnswer: "Leaning in toward you",
        explanation: "Leaning in is a strong IOI showing engagement and interest. It indicates she wants to be closer and is invested in the conversation.",
        order: 4
      },
      {
        quizId: 2,
        question: "What does it typically mean when someone's feet are pointed away from you?",
        questionType: "multiple_choice",
        options: JSON.stringify([
          "They are very interested",
          "They want to leave or are not engaged",
          "They are being playful",
          "They are testing you"
        ]),
        correctAnswer: "They want to leave or are not engaged",
        explanation: "Feet direction is a reliable indicator of interest. When pointed away, it often means the person wants to leave or isn't fully engaged.",
        order: 5
      }
    ]);

    console.log("✅ Quizzes seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding quizzes:", error);
    throw error;
  }
}

seedQuizzes()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
