import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    bio: null,
    avatarUrl: null,
    dateOfBirth: null,
    experienceLevel: "beginner",
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
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
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("coach router", () => {
  it("should start a conversation", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.coach.startConversation({
      initialMessage: "I need help approaching women in a coffee shop"
    });

    expect(result).toHaveProperty("conversationId");
    expect(result).toHaveProperty("message");
    expect(typeof result.conversationId).toBe("number");
    expect(typeof result.message).toBe("string");
    expect(result.message.length).toBeGreaterThan(0);
  }, 30000); // 30 second timeout for AI response

  it("should generate openers based on situation", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.coach.generateOpeners({
      venueType: "coffee_shop",
      herVibe: "friendly",
      yourStyle: "natural",
      context: "She's reading a book"
    });

    expect(result).toBeDefined();
    // Result could be array of openers or rawResponse
    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);
    } else {
      expect(result).toHaveProperty("rawResponse");
    }
  }, 30000);

  it("should analyze a response", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.coach.analyzeResponse({
      herResponse: "Haha yeah, I love that place too!",
      context: "Talking about a local restaurant"
    });

    expect(result).toBeDefined();
    // Result could be structured analysis or rawResponse
    if ("interestLevel" in result) {
      expect(typeof result.interestLevel).toBe("number");
    } else {
      expect(result).toHaveProperty("rawResponse");
    }
  }, 30000);
});
