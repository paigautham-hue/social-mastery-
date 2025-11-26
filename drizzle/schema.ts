import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, tinyint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with profile fields for Social Mastery App
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Profile fields
  bio: text("bio"),
  avatarUrl: text("avatarUrl"),
  dateOfBirth: timestamp("dateOfBirth"),
  experienceLevel: mysqlEnum("experienceLevel", ["beginner", "intermediate", "advanced"]).default("beginner").notNull(),
  
  // Gamification
  totalPoints: int("totalPoints").default(0).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastActivityDate: timestamp("lastActivityDate"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/**
 * Learning paths: Beginner, Intermediate, Advanced
 */
export const learningPaths = mysqlTable("learningPaths", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  level: mysqlEnum("level", ["beginner", "intermediate", "advanced"]).notNull(),
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Individual lessons within learning paths
 */
export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  pathId: int("pathId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content").notNull(), // Markdown content
  videoUrl: text("videoUrl"),
  duration: int("duration"), // in minutes
  order: int("order").notNull(),
  pointsReward: int("pointsReward").default(10).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * User progress through lessons
 */
export const userLessonProgress = mysqlTable("userLessonProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  lessonId: int("lessonId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  timeSpent: int("timeSpent").default(0).notNull(), // in seconds
  lastAccessedAt: timestamp("lastAccessedAt").defaultNow().notNull(),
});

/**
 * Quizzes for each lesson
 */
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  passingScore: int("passingScore").default(80).notNull(), // percentage
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Quiz questions
 */
export const quizQuestions = mysqlTable("quizQuestions", {
  id: int("id").autoincrement().primaryKey(),
  quizId: int("quizId").notNull(),
  question: text("question").notNull(),
  questionType: mysqlEnum("questionType", ["multiple_choice", "scenario"]).default("multiple_choice").notNull(),
  options: text("options").notNull(), // JSON array of options
  correctAnswer: varchar("correctAnswer", { length: 255 }).notNull(),
  explanation: text("explanation"),
  order: int("order").notNull(),
});

/**
 * User quiz attempts
 */
export const quizAttempts = mysqlTable("quizAttempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  quizId: int("quizId").notNull(),
  score: int("score").notNull(), // percentage
  passed: boolean("passed").notNull(),
  answers: text("answers").notNull(), // JSON object of question_id: answer
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

/**
 * AI coaching conversations
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }),
  situationType: varchar("situationType", { length: 100 }), // club, daygame, texting, etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Messages within conversations
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * IOI/IOD indicators library
 */
export const indicators = mysqlTable("indicators", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["ioi", "iod"]).notNull(),
  category: mysqlEnum("category", ["body_language", "verbal", "behavioral"]).notNull(),
  description: text("description").notNull(),
  context: text("context"),
  confidenceLevel: mysqlEnum("confidenceLevel", ["strong", "mild", "weak"]).notNull(),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Field reports submitted by users
 */
export const fieldReports = mysqlTable("fieldReports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  venue: varchar("venue", { length: 100 }),
  venueType: mysqlEnum("venueType", ["club", "bar", "coffee_shop", "street", "gym", "social_event", "online"]),
  outcome: mysqlEnum("outcome", ["number_close", "kiss_close", "date_scheduled", "rejection", "conversation_only"]),
  description: text("description").notNull(),
  lessonsLearned: text("lessonsLearned"),
  isPublic: boolean("isPublic").default(false).notNull(),
  likes: int("likes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Approach log entries for tracking
 */
export const approachLog = mysqlTable("approachLog", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: timestamp("date").notNull(),
  venue: varchar("venue", { length: 255 }),
  venueType: mysqlEnum("venueType", ["club", "bar", "coffee_shop", "street", "gym", "social_event", "online"]),
  outcome: mysqlEnum("outcome", ["number_close", "kiss_close", "date_scheduled", "rejection", "conversation_only"]).notNull(),
  notes: text("notes"),
  rating: tinyint("rating"), // 1-5 self-rating
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * User goals and milestones
 */
export const goals = mysqlTable("goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  targetDate: timestamp("targetDate"),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Achievement badges
 */
export const badges = mysqlTable("badges", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  iconUrl: text("iconUrl"),
  requirement: text("requirement").notNull(), // JSON describing unlock criteria
  pointsReward: int("pointsReward").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * User earned badges
 */
export const userBadges = mysqlTable("userBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeId: int("badgeId").notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

/**
 * Glossary terms
 */
export const glossaryTerms = mysqlTable("glossaryTerms", {
  id: int("id").autoincrement().primaryKey(),
  term: varchar("term", { length: 255 }).notNull().unique(),
  definition: text("definition").notNull(),
  category: varchar("category", { length: 100 }),
  relatedTerms: text("relatedTerms"), // JSON array of related term IDs
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * User bookmarks for knowledge library
 */
export const bookmarks = mysqlTable("bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  resourceType: mysqlEnum("resourceType", ["lesson", "glossary", "field_report"]).notNull(),
  resourceId: int("resourceId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Success stories for DISCOVER module
 */
export const successStories = mysqlTable("successStories", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  story: text("story").notNull(),
  beforeAfter: text("beforeAfter"), // JSON with before/after stats
  imageUrl: text("imageUrl"),
  isApproved: boolean("isApproved").default(false).notNull(),
  likes: int("likes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Community challenges
 */
export const challenges = mysqlTable("challenges", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  challengeType: varchar("challengeType", { length: 100 }).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  pointsReward: int("pointsReward").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * User challenge participation
 */
export const challengeParticipation = mysqlTable("challengeParticipation", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  challengeId: int("challengeId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  progress: int("progress").default(0).notNull(), // percentage or count
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type LearningPath = typeof learningPaths.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type UserLessonProgress = typeof userLessonProgress.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Indicator = typeof indicators.$inferSelect;
export type FieldReport = typeof fieldReports.$inferSelect;
export type ApproachLog = typeof approachLog.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type Badge = typeof badges.$inferSelect;
export type UserBadge = typeof userBadges.$inferSelect;
export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type Bookmark = typeof bookmarks.$inferSelect;
export type SuccessStory = typeof successStories.$inferSelect;
export type Challenge = typeof challenges.$inferSelect;
export type ChallengeParticipation = typeof challengeParticipation.$inferSelect;
