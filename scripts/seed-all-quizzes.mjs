import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

// Helper to create quiz questions based on lesson topic
function generateQuizQuestions(lessonId, lessonTitle, difficulty) {
  const questions = [];
  
  // Question 1: Core concept understanding
  questions.push({
    quizId: null, // Will be set after quiz creation
    question: `What is the primary goal of the techniques taught in "${lessonTitle}"?`,
    options: JSON.stringify([
      "To manipulate people into liking you",
      "To develop authentic connections and social skills",
      "To use tricks to get what you want",
      "To become someone you're not"
    ]),
    correctAnswer: "To develop authentic connections and social skills",
    order: 1
  });

  // Question 2: Practical application
  questions.push({
    quizId: null,
    question: "When applying the concepts from this lesson, what should be your primary focus?",
    options: JSON.stringify([
      "Memorizing scripts and routines",
      "Getting a specific outcome every time",
      "Calibration and authentic interaction",
      "Impressing others with your knowledge"
    ]),
    correctAnswer: "Calibration and authentic interaction",
    order: 2
  });

  // Question 3: Common mistake
  questions.push({
    quizId: null,
    question: "Which of the following is a common mistake when learning this material?",
    options: JSON.stringify([
      "Practicing regularly and seeking feedback",
      "Being authentic and true to yourself",
      "Rushing the process and ignoring feedback",
      "Starting with low-pressure situations"
    ]),
    correctAnswer: "Rushing the process and ignoring feedback",
    order: 3
  });

  // Question 4: Ethical consideration
  questions.push({
    quizId: null,
    question: "What is the most important ethical principle to remember?",
    options: JSON.stringify([
      "Always respect boundaries and consent",
      "Use any technique that works",
      "Focus only on your own goals",
      "Persistence always pays off"
    ]),
    correctAnswer: "Always respect boundaries and consent",
    order: 4
  });

  // Question 5: Integration
  questions.push({
    quizId: null,
    question: "How should you integrate this lesson's concepts with previous learning?",
    options: JSON.stringify([
      "Forget everything you learned before",
      "Use only these new techniques",
      "Combine concepts while maintaining authenticity",
      "Keep all techniques completely separate"
    ]),
    correctAnswer: "Combine concepts while maintaining authenticity",
    order: 5
  });

  return questions;
}

async function seedQuizzes() {
  console.log("🎯 Generating quizzes for all lessons...");

  try {
    // Get all lessons that don't have quizzes yet
    const lessons = await db.select().from(schema.lessons);
    console.log(`Found ${lessons.length} total lessons`);

    // Get existing quizzes
    const existingQuizzes = await db.select().from(schema.quizzes);
    const existingLessonIds = new Set(existingQuizzes.map(q => q.lessonId));

    let created = 0;
    let skipped = 0;

    for (const lesson of lessons) {
      if (existingLessonIds.has(lesson.id)) {
        console.log(`⏭️  Skipping lesson ${lesson.id}: ${lesson.title} (quiz exists)`);
        skipped++;
        continue;
      }

      // Create quiz
      const [quiz] = await db.insert(schema.quizzes).values({
        lessonId: lesson.id,
        title: `${lesson.title} Quiz`,
        passingScore: 70
      });

      const quizId = quiz.insertId;

      // Generate and insert questions
      const questions = generateQuizQuestions(lesson.id, lesson.title, lesson.difficulty);
      
      for (const question of questions) {
        await db.insert(schema.quizQuestions).values({
          ...question,
          quizId: quizId
        });
      }

      created++;
      console.log(`✅ [${created}] Created quiz for: ${lesson.title}`);
    }

    console.log(`\n📊 Quiz generation complete!`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📝 Total: ${lessons.length}`);

  } catch (error) {
    console.error("❌ Error generating quizzes:", error);
    throw error;
  }
}

seedQuizzes()
  .then(() => {
    console.log("\n🎉 All quizzes generated successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
