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

describe("learn router", () => {
  it("should get all learning paths", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.learn.getLearningPaths();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("slug");
      expect(result[0]).toHaveProperty("level");
    }
  });

  it("should get learning path by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First get all paths
    const paths = await caller.learn.getLearningPaths();
    
    if (paths.length > 0) {
      const result = await caller.learn.getLearningPath({
        slug: paths[0].slug
      });

      expect(result).toHaveProperty("path");
      expect(result).toHaveProperty("lessons");
      expect(result.path.slug).toBe(paths[0].slug);
      expect(Array.isArray(result.lessons)).toBe(true);
    }
  });

  it("should get all glossary terms", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.learn.getGlossary();

    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("term");
      expect(result[0]).toHaveProperty("definition");
      expect(result[0]).toHaveProperty("category");
    }
  });

  it("should search glossary", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.learn.searchGlossary({
      query: "IOI"
    });

    expect(Array.isArray(result)).toBe(true);
  });
});
