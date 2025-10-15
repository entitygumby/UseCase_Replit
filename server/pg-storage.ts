import { db } from "./db";
import { useCases, users } from "@shared/schema";
import type { UseCase, InsertUseCase, User, InsertUser } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { IStorage } from "./storage";

export class PostgresStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results[0];
  }

  async createUser(data: InsertUser): Promise<User> {
    const results = await db.insert(users).values(data).returning();
    return results[0];
  }

  async getAllUseCases(): Promise<UseCase[]> {
    return await db.select().from(useCases);
  }

  async getUseCase(id: string): Promise<UseCase | undefined> {
    const results = await db.select().from(useCases).where(eq(useCases.id, id));
    return results[0];
  }

  async createUseCase(data: InsertUseCase): Promise<UseCase> {
    const results = await db.insert(useCases).values(data).returning();
    return results[0];
  }

  async updateUseCase(id: string, updates: Partial<InsertUseCase>): Promise<UseCase | undefined> {
    const existing = await this.getUseCase(id);
    if (!existing) return undefined;

    const updated = {
      name: updates.name ?? existing.name,
      division: updates.division ?? existing.division,
      category: updates.category ?? existing.category,
      status: updates.status ?? existing.status,
      solutionType: updates.solutionType ?? existing.solutionType,
      description: updates.description !== undefined ? (updates.description ?? null) : existing.description,
      benefits: updates.benefits !== undefined ? (updates.benefits ?? null) : existing.benefits,
      impact: updates.impact !== undefined ? (updates.impact ?? null) : existing.impact,
      weeklySavings: updates.weeklySavings !== undefined ? (updates.weeklySavings ?? null) : existing.weeklySavings,
      complexity: updates.complexity !== undefined ? (updates.complexity ?? null) : existing.complexity,
      techStack: updates.techStack !== undefined ? (updates.techStack ?? null) : existing.techStack,
      phase: updates.phase !== undefined ? (updates.phase ?? null) : existing.phase,
      teamContact: updates.teamContact !== undefined ? (updates.teamContact ?? null) : existing.teamContact,
      effortEstimate: updates.effortEstimate !== undefined ? (updates.effortEstimate ?? null) : existing.effortEstimate,
      dependencies: updates.dependencies !== undefined ? (updates.dependencies ?? null) : existing.dependencies,
      milestones: updates.milestones !== undefined ? (updates.milestones ?? null) : existing.milestones,
      riskAssessment: updates.riskAssessment !== undefined ? (updates.riskAssessment ?? null) : existing.riskAssessment,
      successCriteria: updates.successCriteria !== undefined ? (updates.successCriteria ?? null) : existing.successCriteria,
    };

    const results = await db
      .update(useCases)
      .set(updated)
      .where(eq(useCases.id, id))
      .returning();
    
    return results[0];
  }

  async deleteUseCase(id: string): Promise<boolean> {
    const result = await db.delete(useCases).where(eq(useCases.id, id)).returning();
    return result.length > 0;
  }
}
