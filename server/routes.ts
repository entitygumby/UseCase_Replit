import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUseCaseSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all use cases
  app.get("/api/use-cases", async (_req, res) => {
    try {
      const useCases = await storage.getAllUseCases();
      res.json(useCases);
    } catch (error) {
      console.error("Error fetching use cases:", error);
      res.status(500).json({ error: "Failed to fetch use cases" });
    }
  });

  // Get single use case
  app.get("/api/use-cases/:id", async (req, res) => {
    try {
      const useCase = await storage.getUseCase(req.params.id);
      if (!useCase) {
        return res.status(404).json({ error: "Use case not found" });
      }
      res.json(useCase);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch use case" });
    }
  });

  // Create new use case
  app.post("/api/use-cases", async (req, res) => {
    try {
      const result = insertUseCaseSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const useCase = await storage.createUseCase(result.data);
      res.status(201).json(useCase);
    } catch (error) {
      res.status(500).json({ error: "Failed to create use case" });
    }
  });

  // Update use case
  app.put("/api/use-cases/:id", async (req, res) => {
    try {
      const result = insertUseCaseSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }

      const useCase = await storage.updateUseCase(req.params.id, result.data);
      if (!useCase) {
        return res.status(404).json({ error: "Use case not found" });
      }
      res.json(useCase);
    } catch (error) {
      res.status(500).json({ error: "Failed to update use case" });
    }
  });

  // Delete use case
  app.delete("/api/use-cases/:id", async (req, res) => {
    try {
      const success = await storage.deleteUseCase(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Use case not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete use case" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
