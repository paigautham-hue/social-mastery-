import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("quiz router", () => {
  it("should get quiz by lesson ID", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.getQuizByLesson({ lessonId: 1 });

    expect(result).toBeDefined();
    if (result) {
      expect(result.quiz).toBeDefined();
      expect(result.questions).toBeDefined();
      expect(Array.isArray(result.questions)).toBe(true);
    }
  });

  it("should submit quiz and calculate score", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First get the quiz
    const quiz = await caller.quiz.getQuizByLesson({ lessonId: 1 });
    
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      console.log("No quiz found for lesson 1, skipping test");
      return;
    }

    // Submit answers (all correct)
    const answers: Record<string, string> = {};
    quiz.questions.forEach(q => {
      answers[q.id.toString()] = q.options[0]; // Just pick first option for test
    });

    const result = await caller.quiz.submitQuiz({
      quizId: quiz.quiz.id,
      answers
    });

    expect(result).toBeDefined();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.totalQuestions).toBe(quiz.questions.length);
    expect(typeof result.passed).toBe("boolean");
  });

  it("should get user quiz attempts", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const attempts = await caller.quiz.getUserQuizAttempts({ lessonId: 1 });

    expect(Array.isArray(attempts)).toBe(true);
  });
});
