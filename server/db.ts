import { eq, desc, and, gte, lte, sql, or, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, learningPaths, lessons, userLessonProgress, quizzes, 
  quizQuestions, quizAttempts, conversations, messages, indicators, fieldReports,
  approachLog, goals, badges, userBadges, glossaryTerms, bookmarks, successStories,
  challenges, challengeParticipation
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============= USER MANAGEMENT =============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "bio", "avatarUrl"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (user.experienceLevel !== undefined) {
      values.experienceLevel = user.experienceLevel;
      updateSet.experienceLevel = user.experienceLevel;
    }
    if (user.dateOfBirth !== undefined) {
      values.dateOfBirth = user.dateOfBirth;
      updateSet.dateOfBirth = user.dateOfBirth;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, updates: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return false;
  await db.update(users).set(updates).where(eq(users.id, userId));
  return true;
}

export async function updateUserStreak(userId: number, currentStreak: number, longestStreak: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    currentStreak, 
    longestStreak,
    lastActivityDate: new Date()
  }).where(eq(users.id, userId));
}

export async function addUserPoints(userId: number, points: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ 
    totalPoints: sql`${users.totalPoints} + ${points}`
  }).where(eq(users.id, userId));
}

// ============= LEARNING PATHS & LESSONS =============

export async function getAllLearningPaths() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(learningPaths).orderBy(learningPaths.order);
}

export async function getLearningPathBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(learningPaths).where(eq(learningPaths.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getLessonsByPathId(pathId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(lessons).where(eq(lessons.pathId, pathId)).orderBy(lessons.order);
}

export async function getLessonById(lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getLessonBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(lessons).where(eq(lessons.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============= USER PROGRESS =============

export async function getUserLessonProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userLessonProgress)
    .where(and(eq(userLessonProgress.userId, userId), eq(userLessonProgress.lessonId, lessonId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserProgressByPath(userId: number, pathId: number) {
  const db = await getDb();
  if (!db) return [];
  const pathLessons = await getLessonsByPathId(pathId);
  const lessonIds = pathLessons.map(l => l.id);
  
  if (lessonIds.length === 0) return [];
  
  return await db.select().from(userLessonProgress)
    .where(and(
      eq(userLessonProgress.userId, userId),
      sql`${userLessonProgress.lessonId} IN (${sql.join(lessonIds.map(id => sql`${id}`), sql`, `)})`
    ));
}

export async function markLessonComplete(userId: number, lessonId: number, timeSpent: number) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await getUserLessonProgress(userId, lessonId);
  
  if (existing) {
    await db.update(userLessonProgress).set({
      completed: true,
      completedAt: new Date(),
      timeSpent: existing.timeSpent + timeSpent,
      lastAccessedAt: new Date()
    }).where(eq(userLessonProgress.id, existing.id));
  } else {
    await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      completed: true,
      completedAt: new Date(),
      timeSpent,
      lastAccessedAt: new Date()
    });
  }
}

export async function updateLessonProgress(userId: number, lessonId: number, timeSpent: number) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await getUserLessonProgress(userId, lessonId);
  
  if (existing) {
    await db.update(userLessonProgress).set({
      timeSpent: existing.timeSpent + timeSpent,
      lastAccessedAt: new Date()
    }).where(eq(userLessonProgress.id, existing.id));
  } else {
    await db.insert(userLessonProgress).values({
      userId,
      lessonId,
      completed: false,
      timeSpent,
      lastAccessedAt: new Date()
    });
  }
}

// ============= QUIZZES =============

export async function getQuizByLessonId(lessonId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getQuizQuestions(quizId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(quizQuestions).where(eq(quizQuestions.quizId, quizId)).orderBy(quizQuestions.order);
}

export async function saveQuizAttempt(userId: number, quizId: number, score: number, passed: boolean, answers: Record<string, string>) {
  const db = await getDb();
  if (!db) return;
  await db.insert(quizAttempts).values({
    userId,
    quizId,
    score,
    passed,
    answers: JSON.stringify(answers),
    completedAt: new Date()
  });
}

export async function getUserQuizAttempts(userId: number, quizId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(quizAttempts)
    .where(and(eq(quizAttempts.userId, userId), eq(quizAttempts.quizId, quizId)))
    .orderBy(desc(quizAttempts.completedAt));
}

// ============= CONVERSATIONS & MESSAGES =============

export async function createConversation(userId: number, title: string, situationType?: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(conversations).values({
    userId,
    title,
    situationType,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result[0]?.insertId;
}

export async function getUserConversations(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(desc(conversations.updatedAt))
    .limit(limit);
}

export async function getConversationById(conversationId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(conversations).where(eq(conversations.id, conversationId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function addMessage(conversationId: number, role: "user" | "assistant", content: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(messages).values({
    conversationId,
    role,
    content,
    createdAt: new Date()
  });
  await db.update(conversations).set({ updatedAt: new Date() }).where(eq(conversations.id, conversationId));
}

export async function getConversationMessages(conversationId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt)
    .limit(limit);
}

export async function deleteConversation(conversationId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Verify ownership
  const conv = await getConversationById(conversationId);
  if (!conv || conv.userId !== userId) return false;
  
  // Delete messages first
  await db.delete(messages).where(eq(messages.conversationId, conversationId));
  // Delete conversation
  await db.delete(conversations).where(eq(conversations.id, conversationId));
  return true;
}

// ============= INDICATORS (IOI/IOD) =============

export async function getAllIndicators() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(indicators);
}

export async function getIndicatorsByType(type: "ioi" | "iod") {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(indicators).where(eq(indicators.type, type));
}

export async function getIndicatorsByCategory(category: "body_language" | "verbal" | "behavioral") {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(indicators).where(eq(indicators.category, category));
}

export async function searchIndicators(query: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(indicators)
    .where(or(
      like(indicators.name, `%${query}%`),
      like(indicators.description, `%${query}%`)
    ));
}

// ============= FIELD REPORTS =============

export async function createFieldReport(userId: number, data: {
  title: string;
  venue?: string;
  venueType?: string;
  outcome?: string;
  description: string;
  lessonsLearned?: string;
  isPublic: boolean;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(fieldReports).values({
    userId,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  } as any);
}

export async function getUserFieldReports(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(fieldReports)
    .where(eq(fieldReports.userId, userId))
    .orderBy(desc(fieldReports.createdAt));
}

export async function getPublicFieldReports(limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(fieldReports)
    .where(eq(fieldReports.isPublic, true))
    .orderBy(desc(fieldReports.createdAt))
    .limit(limit);
}

export async function deleteFieldReport(reportId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const report = await db.select().from(fieldReports).where(eq(fieldReports.id, reportId)).limit(1);
  if (report.length === 0 || report[0].userId !== userId) return false;
  
  await db.delete(fieldReports).where(eq(fieldReports.id, reportId));
  return true;
}

// ============= APPROACH LOG =============

export async function addApproachLogEntry(userId: number, data: {
  date: Date;
  venue?: string;
  venueType?: string;
  outcome: string;
  notes?: string;
  rating?: number;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(approachLog).values({
    userId,
    ...data,
    createdAt: new Date()
  } as any);
}

export async function getUserApproachLog(userId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];
  
  if (startDate && endDate) {
    return await db.select().from(approachLog).where(and(
      eq(approachLog.userId, userId),
      gte(approachLog.date, startDate),
      lte(approachLog.date, endDate)
    )).orderBy(desc(approachLog.date));
  }
  
  return await db.select().from(approachLog)
    .where(eq(approachLog.userId, userId))
    .orderBy(desc(approachLog.date));
}

// ============= GOALS =============

export async function createGoal(userId: number, title: string, description?: string, targetDate?: Date) {
  const db = await getDb();
  if (!db) return;
  await db.insert(goals).values({
    userId,
    title,
    description,
    targetDate,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

export async function getUserGoals(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(goals)
    .where(eq(goals.userId, userId))
    .orderBy(goals.completed, goals.targetDate);
}

export async function completeGoal(goalId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const goal = await db.select().from(goals).where(eq(goals.id, goalId)).limit(1);
  if (goal.length === 0 || goal[0].userId !== userId) return false;
  
  await db.update(goals).set({
    completed: true,
    completedAt: new Date(),
    updatedAt: new Date()
  }).where(eq(goals.id, goalId));
  return true;
}

export async function deleteGoal(goalId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const goal = await db.select().from(goals).where(eq(goals.id, goalId)).limit(1);
  if (goal.length === 0 || goal[0].userId !== userId) return false;
  
  await db.delete(goals).where(eq(goals.id, goalId));
  return true;
}

// ============= BADGES =============

export async function getAllBadges() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(badges);
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({
    badge: badges,
    earnedAt: userBadges.earnedAt
  }).from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, userId))
    .orderBy(desc(userBadges.earnedAt));
}

export async function awardBadge(userId: number, badgeId: number) {
  const db = await getDb();
  if (!db) return;
  
  // Check if already awarded
  const existing = await db.select().from(userBadges)
    .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeId, badgeId)))
    .limit(1);
  
  if (existing.length > 0) return;
  
  await db.insert(userBadges).values({
    userId,
    badgeId,
    earnedAt: new Date()
  });
}

// ============= GLOSSARY =============

export async function getAllGlossaryTerms() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(glossaryTerms).orderBy(glossaryTerms.term);
}

export async function searchGlossary(query: string) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(glossaryTerms)
    .where(or(
      like(glossaryTerms.term, `%${query}%`),
      like(glossaryTerms.definition, `%${query}%`)
    ));
}

// ============= BOOKMARKS =============

export async function addBookmark(userId: number, resourceType: "lesson" | "glossary" | "field_report", resourceId: number) {
  const db = await getDb();
  if (!db) return;
  
  // Check if already bookmarked
  const existing = await db.select().from(bookmarks)
    .where(and(
      eq(bookmarks.userId, userId),
      eq(bookmarks.resourceType, resourceType),
      eq(bookmarks.resourceId, resourceId)
    )).limit(1);
  
  if (existing.length > 0) return;
  
  await db.insert(bookmarks).values({
    userId,
    resourceType,
    resourceId,
    createdAt: new Date()
  });
}

export async function removeBookmark(userId: number, resourceType: "lesson" | "glossary" | "field_report", resourceId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(bookmarks).where(and(
    eq(bookmarks.userId, userId),
    eq(bookmarks.resourceType, resourceType),
    eq(bookmarks.resourceId, resourceId)
  ));
}

export async function getUserBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));
}

// ============= SUCCESS STORIES =============

export async function getApprovedSuccessStories(limit: number = 20) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(successStories)
    .where(eq(successStories.isApproved, true))
    .orderBy(desc(successStories.likes), desc(successStories.createdAt))
    .limit(limit);
}

export async function createSuccessStory(userId: number, data: {
  title: string;
  story: string;
  beforeAfter?: string;
  imageUrl?: string;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(successStories).values({
    userId,
    ...data,
    isApproved: false,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

// ============= CHALLENGES =============

export async function getActiveChallenges() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(challenges)
    .where(eq(challenges.isActive, true))
    .orderBy(challenges.startDate);
}

export async function joinChallenge(userId: number, challengeId: number) {
  const db = await getDb();
  if (!db) return;
  
  // Check if already joined
  const existing = await db.select().from(challengeParticipation)
    .where(and(eq(challengeParticipation.userId, userId), eq(challengeParticipation.challengeId, challengeId)))
    .limit(1);
  
  if (existing.length > 0) return;
  
  await db.insert(challengeParticipation).values({
    userId,
    challengeId,
    joinedAt: new Date()
  });
}

export async function getUserChallenges(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select({
    challenge: challenges,
    participation: challengeParticipation
  }).from(challengeParticipation)
    .innerJoin(challenges, eq(challengeParticipation.challengeId, challenges.id))
    .where(eq(challengeParticipation.userId, userId));
}
