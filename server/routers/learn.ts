import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import * as db from "../db";

export const learnRouter = router({
  // Get all learning paths
  getLearningPaths: publicProcedure
    .query(async () => {
      return await db.getAllLearningPaths();
    }),

  // Get learning path by slug with lessons
  getLearningPath: publicProcedure
    .input(z.object({
      slug: z.string()
    }))
    .query(async ({ input }) => {
      const path = await db.getLearningPathBySlug(input.slug);
      if (!path) {
        throw new Error("Learning path not found");
      }

      const lessons = await db.getLessonsByPathId(path.id);

      return {
        path,
        lessons
      };
    }),

  // Get user's progress for a specific path
  getUserPathProgress: protectedProcedure
    .input(z.object({
      pathId: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const progress = await db.getUserProgressByPath(ctx.user.id, input.pathId);
      const lessons = await db.getLessonsByPathId(input.pathId);

      const completedCount = progress.filter(p => p.completed).length;
      const totalCount = lessons.length;
      const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      return {
        progress,
        completedCount,
        totalCount,
        percentage
      };
    }),

  // Get lesson details
  getLesson: publicProcedure
    .input(z.object({
      lessonId: z.number()
    }))
    .query(async ({ input }) => {
      const lesson = await db.getLessonById(input.lessonId);
      if (!lesson) {
        throw new Error("Lesson not found");
      }

      const quiz = await db.getQuizByLessonId(input.lessonId);

      return {
        lesson,
        hasQuiz: !!quiz
      };
    }),

  // Get lesson by slug
  getLessonBySlug: publicProcedure
    .input(z.object({
      slug: z.string()
    }))
    .query(async ({ input }) => {
      const lesson = await db.getLessonBySlug(input.slug);
      if (!lesson) {
        throw new Error("Lesson not found");
      }

      const quiz = await db.getQuizByLessonId(lesson.id);

      return {
        lesson,
        hasQuiz: !!quiz
      };
    }),

  // Update lesson progress (time spent)
  updateLessonProgress: protectedProcedure
    .input(z.object({
      lessonId: z.number(),
      timeSpent: z.number() // seconds
    }))
    .mutation(async ({ ctx, input }) => {
      await db.updateLessonProgress(ctx.user.id, input.lessonId, input.timeSpent);
      return { success: true };
    }),

  // Mark lesson as complete
  completLesson: protectedProcedure
    .input(z.object({
      lessonId: z.number(),
      timeSpent: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.markLessonComplete(ctx.user.id, input.lessonId, input.timeSpent);

      // Award points
      const lesson = await db.getLessonById(input.lessonId);
      if (lesson) {
        await db.addUserPoints(ctx.user.id, lesson.pointsReward);
      }

      return { success: true };
    }),

  // Get quiz for a lesson
  getQuiz: protectedProcedure
    .input(z.object({
      lessonId: z.number()
    }))
    .query(async ({ input }) => {
      const quiz = await db.getQuizByLessonId(input.lessonId);
      if (!quiz) {
        throw new Error("Quiz not found for this lesson");
      }

      const questions = await db.getQuizQuestions(quiz.id);

      return {
        quiz,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          questionType: q.questionType,
          options: JSON.parse(q.options),
          order: q.order
          // Don't send correctAnswer to client
        }))
      };
    }),

  // Submit quiz answers
  submitQuiz: protectedProcedure
    .input(z.object({
      quizId: z.number(),
      answers: z.record(z.string(), z.string()) // questionId: answer
    }))
    .mutation(async ({ ctx, input }) => {
      const questions = await db.getQuizQuestions(input.quizId);
      if (questions.length === 0) {
        throw new Error("No questions found for this quiz");
      }

      // Calculate score
      let correctCount = 0;
      const results: Record<string, { correct: boolean; correctAnswer: string; explanation?: string }> = {};

      questions.forEach(q => {
        const userAnswer = input.answers[q.id.toString()];
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) correctCount++;

        results[q.id.toString()] = {
          correct: isCorrect,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || undefined
        };
      });

      const score = Math.round((correctCount / questions.length) * 100);
      const passed = score >= 80; // Default passing score

      // Save attempt
      await db.saveQuizAttempt(ctx.user.id, input.quizId, score, passed, input.answers as Record<string, string>);

      return {
        score,
        passed,
        correctCount,
        totalQuestions: questions.length,
        results
      };
    }),

  // Get user's quiz attempts
  getQuizAttempts: protectedProcedure
    .input(z.object({
      quizId: z.number()
    }))
    .query(async ({ ctx, input }) => {
      return await db.getUserQuizAttempts(ctx.user.id, input.quizId);
    }),

  // Get all glossary terms
  getGlossary: publicProcedure
    .query(async () => {
      return await db.getAllGlossaryTerms();
    }),

  // Search glossary
  searchGlossary: publicProcedure
    .input(z.object({
      query: z.string()
    }))
    .query(async ({ input }) => {
      return await db.searchGlossary(input.query);
    }),

  // Add bookmark
  addBookmark: protectedProcedure
    .input(z.object({
      resourceType: z.enum(["lesson", "glossary", "field_report"]),
      resourceId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.addBookmark(ctx.user.id, input.resourceType, input.resourceId);
      return { success: true };
    }),

  // Remove bookmark
  removeBookmark: protectedProcedure
    .input(z.object({
      resourceType: z.enum(["lesson", "glossary", "field_report"]),
      resourceId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.removeBookmark(ctx.user.id, input.resourceType, input.resourceId);
      return { success: true };
    }),

  // Get user bookmarks
  getBookmarks: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserBookmarks(ctx.user.id);
    }),
});
