import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const trackRouter = router({
  // Get user dashboard stats
  getDashboard: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      if (!user) {
        throw new Error("User not found");
      }

      // Get learning progress
      const allPaths = await db.getAllLearningPaths();
      let totalLessons = 0;
      let completedLessons = 0;

      for (const path of allPaths) {
        const lessons = await db.getLessonsByPathId(path.id);
        const progress = await db.getUserProgressByPath(ctx.user.id, path.id);
        totalLessons += lessons.length;
        completedLessons += progress.filter(p => p.completed).length;
      }

      // Get approach log stats (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentApproaches = await db.getUserApproachLog(ctx.user.id, thirtyDaysAgo, new Date());

      // Get goals
      const goals = await db.getUserGoals(ctx.user.id);
      const activeGoals = goals.filter(g => !g.completed);
      const completedGoals = goals.filter(g => g.completed);

      // Get badges
      const userBadges = await db.getUserBadges(ctx.user.id);

      return {
        user: {
          name: user.name,
          experienceLevel: user.experienceLevel,
          totalPoints: user.totalPoints,
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
        },
        learning: {
          totalLessons,
          completedLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        },
        approaches: {
          total: recentApproaches.length,
          last30Days: recentApproaches.length
        },
        goals: {
          active: activeGoals.length,
          completed: completedGoals.length
        },
        badges: userBadges.length
      };
    }),

  // Add approach log entry
  addApproachLog: protectedProcedure
    .input(z.object({
      date: z.date(),
      venue: z.string().optional(),
      venueType: z.enum(["club", "bar", "coffee_shop", "street", "gym", "social_event", "online"]).optional(),
      outcome: z.enum(["number_close", "kiss_close", "date_scheduled", "rejection", "conversation_only"]),
      notes: z.string().optional(),
      rating: z.number().min(1).max(5).optional()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.addApproachLogEntry(ctx.user.id, input);
      
      // Update streak
      const user = await db.getUserById(ctx.user.id);
      if (user) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
        if (lastActivity) {
          lastActivity.setHours(0, 0, 0, 0);
        }

        let newStreak = user.currentStreak;
        
        if (!lastActivity || lastActivity < today) {
          // New day
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastActivity && lastActivity.getTime() === yesterday.getTime()) {
            // Consecutive day
            newStreak = user.currentStreak + 1;
          } else {
            // Streak broken
            newStreak = 1;
          }
          
          const longestStreak = Math.max(user.longestStreak, newStreak);
          await db.updateUserStreak(ctx.user.id, newStreak, longestStreak);
        }
      }

      return { success: true };
    }),

  // Get approach log
  getApproachLog: protectedProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional()
    }))
    .query(async ({ ctx, input }) => {
      return await db.getUserApproachLog(ctx.user.id, input.startDate, input.endDate);
    }),

  // Get approach statistics
  getApproachStats: protectedProcedure
    .input(z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional()
    }))
    .query(async ({ ctx, input }) => {
      const logs = await db.getUserApproachLog(ctx.user.id, input.startDate, input.endDate);

      const stats = {
        total: logs.length,
        byOutcome: {
          number_close: 0,
          kiss_close: 0,
          date_scheduled: 0,
          rejection: 0,
          conversation_only: 0
        },
        byVenue: {} as Record<string, number>,
        averageRating: 0
      };

      let totalRating = 0;
      let ratingCount = 0;

      logs.forEach(log => {
        stats.byOutcome[log.outcome]++;
        
        if (log.venueType) {
          stats.byVenue[log.venueType] = (stats.byVenue[log.venueType] || 0) + 1;
        }

        if (log.rating) {
          totalRating += log.rating;
          ratingCount++;
        }
      });

      if (ratingCount > 0) {
        stats.averageRating = totalRating / ratingCount;
      }

      return stats;
    }),

  // Create goal
  createGoal: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      targetDate: z.date().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.createGoal(ctx.user.id, input.title, input.description, input.targetDate);
      return { success: true };
    }),

  // Get user goals
  getGoals: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserGoals(ctx.user.id);
    }),

  // Complete goal
  completeGoal: protectedProcedure
    .input(z.object({
      goalId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const success = await db.completeGoal(input.goalId, ctx.user.id);
      if (!success) {
        throw new Error("Failed to complete goal");
      }

      // Award points for completing goal
      await db.addUserPoints(ctx.user.id, 50);

      return { success: true };
    }),

  // Delete goal
  deleteGoal: protectedProcedure
    .input(z.object({
      goalId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const success = await db.deleteGoal(input.goalId, ctx.user.id);
      if (!success) {
        throw new Error("Failed to delete goal");
      }
      return { success: true };
    }),

  // Get user badges
  getBadges: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserBadges(ctx.user.id);
    }),

  // Get all available badges
  getAllBadges: protectedProcedure
    .query(async () => {
      return await db.getAllBadges();
    }),
});
