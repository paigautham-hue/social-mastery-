import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import * as db from "../db";

export const profileRouter = router({
  // Get user profile
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  // Update profile
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      avatarUrl: z.string().optional(),
      dateOfBirth: z.date().optional(),
      experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional()
    }))
    .mutation(async ({ ctx, input }) => {
      await db.updateUserProfile(ctx.user.id, input);
      return { success: true };
    }),

  // Update experience level
  updateExperienceLevel: protectedProcedure
    .input(z.object({
      level: z.enum(["beginner", "intermediate", "advanced"])
    }))
    .mutation(async ({ ctx, input }) => {
      await db.updateUserProfile(ctx.user.id, { experienceLevel: input.level });
      return { success: true };
    }),
});
