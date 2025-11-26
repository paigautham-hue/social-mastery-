import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import * as db from "../db";

export const discoverRouter = router({
  // Get approved success stories
  getSuccessStories: publicProcedure
    .input(z.object({
      limit: z.number().optional()
    }))
    .query(async ({ input }) => {
      return await db.getApprovedSuccessStories(input.limit);
    }),

  // Create success story
  createSuccessStory: protectedProcedure
    .input(z.object({
      title: z.string(),
      story: z.string(),
      beforeAfter: z.string().optional(),
      imageUrl: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.createSuccessStory(ctx.user.id, input);
      return { success: true };
    }),

  // Get active challenges
  getActiveChallenges: publicProcedure
    .query(async () => {
      return await db.getActiveChallenges();
    }),

  // Join challenge
  joinChallenge: protectedProcedure
    .input(z.object({
      challengeId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.joinChallenge(ctx.user.id, input.challengeId);
      return { success: true };
    }),

  // Get user's challenges
  getUserChallenges: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getUserChallenges(ctx.user.id);
    }),
});
