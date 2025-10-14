import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const useCases = pgTable("use_cases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  division: text("division").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  solutionType: text("solution_type").notNull(),
  priorityTier: text("priority_tier"),
  description: text("description"),
  benefits: text("benefits"),
  impact: text("impact"),
  weeklySavings: integer("weekly_savings"),
  complexity: text("complexity"),
  techStack: text("tech_stack").array(),
  phase: text("phase"),
  teamContact: text("team_contact"),
  effortEstimate: text("effort_estimate"),
  dependencies: text("dependencies"),
  milestones: text("milestones"),
  riskAssessment: text("risk_assessment"),
  successCriteria: text("success_criteria"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUseCaseSchema = createInsertSchema(useCases).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UseCase = typeof useCases.$inferSelect;
export type InsertUseCase = z.infer<typeof insertUseCaseSchema>;
