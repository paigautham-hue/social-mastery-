import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: undefined,
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

describe("practice router", () => {
  it("should get all indicators", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.practice.getAllIndicators();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("type");
      expect(result[0]).toHaveProperty("category");
      expect(result[0]).toHaveProperty("description");
      expect(["ioi", "iod"]).toContain(result[0].type);
    }
  });

  it("should get IOI indicators only", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.practice.getIndicatorsByType({
      type: "ioi"
    });

    expect(Array.isArray(result)).toBe(true);
    result.forEach(indicator => {
      expect(indicator.type).toBe("ioi");
    });
  });

  it("should get IOD indicators only", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.practice.getIndicatorsByType({
      type: "iod"
    });

    expect(Array.isArray(result)).toBe(true);
    result.forEach(indicator => {
      expect(indicator.type).toBe("iod");
    });
  });

  it("should get indicators by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.practice.getIndicatorsByCategory({
      category: "body_language"
    });

    expect(Array.isArray(result)).toBe(true);
    result.forEach(indicator => {
      expect(indicator.category).toBe("body_language");
    });
  });

  it("should search indicators", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.practice.searchIndicators({
      query: "eye contact"
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get public field reports", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.practice.getPublicFieldReports({
      limit: 10
    });

    expect(Array.isArray(result)).toBe(true);
  });
});
