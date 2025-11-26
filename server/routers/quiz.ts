import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import * as db from "../db";

export const quizRouter = router({
  // Get quiz by lesson ID
  getQuizByLesson: publicProcedure
    .input(z.object({
      lessonId: z.number()
    }))
    .query(async ({ input }) => {
      const quiz = await db.getQuizByLessonId(input.lessonId);
      if (!quiz) {
        return null;
      }

      const questions = await db.getQuizQuestions(quiz.id);
      
      return {
        quiz,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          questionType: q.questionType,
          options: JSON.parse(q.options),
          explanation: q.explanation,
          order: q.order
        }))
      };
    }),

  // Submit quiz attempt
  submitQuiz: protectedProcedure
    .input(z.object({
      quizId: z.number(),
      answers: z.record(z.string(), z.string()) // questionId -> answer
    }))
    .mutation(async ({ ctx, input }) => {
      // Validate the quizId exists by getting questions
      const quizQuestions = await db.getQuizQuestions(input.quizId);
      if (quizQuestions.length === 0) {
        throw new Error("Quiz not found");
      }
      const quiz = { id: input.quizId, passingScore: 80 }; // Default passing score

      const questions = await db.getQuizQuestions(input.quizId);
      
      // Calculate score
      let correctCount = 0;
      const results: Record<string, { correct: boolean; correctAnswer: string; explanation?: string }> = {};

      questions.forEach(q => {
        const userAnswer = input.answers[q.id.toString()];
        const isCorrect = userAnswer === q.correctAnswer;
        
        if (isCorrect) {
          correctCount++;
        }

        results[q.id.toString()] = {
          correct: isCorrect,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || undefined
        };
      });

      const score = Math.round((correctCount / questions.length) * 100);
      const passed = score >= quiz.passingScore;

      // Save attempt
      await db.saveQuizAttempt(ctx.user.id, input.quizId, score, passed, input.answers);

      // Award points if passed
      if (passed) {
        await db.addUserPoints(ctx.user.id, 10); // 10 points for passing a quiz
      }

      const attemptId = 0; // Will be retrieved from last insert

      return {
        attemptId,
        score,
        passed,
        correctCount,
        totalQuestions: questions.length,
        results
      };
    }),

  // Get user's quiz attempts for a lesson
  getUserQuizAttempts: protectedProcedure
    .input(z.object({
      lessonId: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const quiz = await db.getQuizByLessonId(input.lessonId);
      if (!quiz) {
        return [];
      }

      return await db.getUserQuizAttempts(ctx.user.id, quiz.id);
    }),

  // Get quiz attempt details
  getQuizAttempt: protectedProcedure
    .input(z.object({
      attemptId: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const attempts = await db.getUserQuizAttempts(ctx.user.id, 0); // Get all attempts
      const attempt = attempts.find(a => a.id === input.attemptId);
      
      if (!attempt || attempt.userId !== ctx.user.id) {
        throw new Error("Quiz attempt not found or unauthorized");
      }

      if (!attempt) {
        throw new Error("Quiz attempt not found");
      }
      
      // Get quiz info from attempt
      const quizData = await db.getQuizByLessonId(0);
      const quiz = quizData || { id: attempt.quizId, title: "Quiz", passingScore: 80 };
      const questions = await db.getQuizQuestions(attempt.quizId);

      return {
        attempt,
        quiz,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          questionType: q.questionType,
          options: JSON.parse(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          order: q.order
        })),
        userAnswers: JSON.parse(attempt.answers)
      };
    })
});
