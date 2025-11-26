import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { coachRouter } from "./routers/coach";
import { learnRouter } from "./routers/learn";
import { practiceRouter } from "./routers/practice";
import { trackRouter } from "./routers/track";
import { discoverRouter } from "./routers/discover";
import { profileRouter } from "./routers/profile";
import { quizRouter } from "./routers/quiz";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Module routers
  coach: coachRouter,      // AI Coaching
  learn: learnRouter,      // Learning paths & lessons
  practice: practiceRouter, // Interactive tools
  track: trackRouter,      // Progress tracking
  discover: discoverRouter, // Community features
  profile: profileRouter,  // User profile
  quiz: quizRouter,        // Interactive quizzes
});

export type AppRouter = typeof appRouter;
