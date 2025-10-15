import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const divisions = [
  "Compliance",
  "Credit", 
  "Finance",
  "Funds Mgmt",
  "HR",
  "Private Equity",
  "Real Estate - Bris",
  "Real Estate - Melb",
  "Real Estate - Syd",
  "Special Sits",
  "Txn Mgmt",
  "Other"
] as const;

export const categories = [
  "Dashboards & Reporting",
  "Data Management",
  "Document Generation",
  "Notification & Alerts",
  "Research & Analysis",
  "Review & Quality Assurance",
  "Workflow Automation"
] as const;

export const statuses = [
  "New",
  "Scoping",
  "Developing",
  "Live"
] as const;

export const implementationPhases = [
  "Not Allocated",
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4"
] as const;

export const impacts = [
  "Low",
  "Medium",
  "High"
] as const;

export const useCases = pgTable("use_cases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  division: text("division").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  solutionType: text("solution_type").notNull(),
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

export const insertUseCaseSchema = createInsertSchema(useCases)
  .omit({
    id: true,
  })
  .extend({
    name: z.string().min(1, "Name is required"),
    division: z.string().min(1, "Division is required"),
    category: z.string().min(1, "Category is required"),
    status: z.string().min(1, "Status is required"),
    solutionType: z.string().min(1, "Solution Type is required"),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UseCase = typeof useCases.$inferSelect;
export type InsertUseCase = z.infer<typeof insertUseCaseSchema>;
