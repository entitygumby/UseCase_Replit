import { type User, type InsertUser, type UseCase, type InsertUseCase } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllUseCases(): Promise<UseCase[]>;
  getUseCase(id: string): Promise<UseCase | undefined>;
  createUseCase(useCase: InsertUseCase): Promise<UseCase>;
  updateUseCase(id: string, useCase: Partial<InsertUseCase>): Promise<UseCase | undefined>;
  deleteUseCase(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private useCases: Map<string, UseCase>;

  constructor() {
    this.users = new Map();
    this.useCases = new Map();
    this.seedUseCases();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllUseCases(): Promise<UseCase[]> {
    return Array.from(this.useCases.values());
  }

  async getUseCase(id: string): Promise<UseCase | undefined> {
    return this.useCases.get(id);
  }

  async createUseCase(insertUseCase: InsertUseCase): Promise<UseCase> {
    const id = randomUUID();
    const useCase: UseCase = {
      id,
      name: insertUseCase.name,
      division: insertUseCase.division,
      category: insertUseCase.category,
      status: insertUseCase.status,
      solutionType: insertUseCase.solutionType,
      description: insertUseCase.description ?? null,
      benefits: insertUseCase.benefits ?? null,
      impact: insertUseCase.impact ?? null,
      weeklySavings: insertUseCase.weeklySavings ?? null,
      complexity: insertUseCase.complexity ?? null,
      techStack: insertUseCase.techStack ?? null,
      phase: insertUseCase.phase ?? null,
      teamContact: insertUseCase.teamContact ?? null,
      effortEstimate: insertUseCase.effortEstimate ?? null,
      dependencies: insertUseCase.dependencies ?? null,
      milestones: insertUseCase.milestones ?? null,
      riskAssessment: insertUseCase.riskAssessment ?? null,
      successCriteria: insertUseCase.successCriteria ?? null,
    };
    this.useCases.set(id, useCase);
    return useCase;
  }

  async updateUseCase(id: string, updates: Partial<InsertUseCase>): Promise<UseCase | undefined> {
    const existing = this.useCases.get(id);
    if (!existing) return undefined;
    
    const updated: UseCase = {
      ...existing,
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
    this.useCases.set(id, updated);
    return updated;
  }

  async deleteUseCase(id: string): Promise<boolean> {
    return this.useCases.delete(id);
  }

  private seedUseCases() {
    // TODO: remove mock functionality - seed data for demo purposes
    const mockUseCases: InsertUseCase[] = [
      {
        name: "BBSW/FX Rate Collection",
        division: "Compliance",
        category: "Dashboards & Reporting",
        status: "Live",
        solutionType: "Automation",
        description: "Automated daily collection of BBSW and FX rates from ASX and RBA sources",
        benefits: "Eliminates manual data entry, ensures accuracy, enables real-time decision making",
        impact: "High - Critical for all floating rate deals",
        weeklySavings: 5,
        complexity: "Low",
        techStack: ["Python", "Azure Functions", "SharePoint"],
        phase: "Phase 1",
        teamContact: "Sarah Chen",
        effortEstimate: "1-2 weeks",
        dependencies: "ASX API access, SharePoint integration",
        milestones: "API setup complete, Daily automation running, Historical data imported",
        riskAssessment: "Low - Well-defined APIs, minimal integration complexity",
        successCriteria: "100% daily data capture rate, <5 minute processing time"
      },
      {
        name: "Due Diligence Sponsor Profiles",
        division: "Real Estate Sydney",
        category: "Document Generation & Management",
        status: "Developing",
        solutionType: "AI Agent",

        description: "AI-powered generation of comprehensive sponsor profile documents for due diligence",
        benefits: "Reduces research time, ensures consistency, improves quality of analysis",
        impact: "High - Accelerates deal evaluation process",
        weeklySavings: 12,
        complexity: "Medium",
        techStack: ["OpenAI GPT-4", "Web Search", "Document Generation"],
        phase: "Phase 2",
        teamContact: "Michael Torres",
        effortEstimate: "4-6 weeks",
        dependencies: "Web search API, Document template library",
        milestones: "Data collection setup, Profile template finalized, Testing with 10 sponsors",
        riskAssessment: "Medium - Dependent on data quality and availability",
        successCriteria: ">90% accuracy on key sponsor metrics, <2 hour generation time"
      },
      {
        name: "Investor Report Generation",
        division: "Transaction Management",
        category: "Document Generation & Management",
        status: "Live",
        solutionType: "AI Agent",

        description: "Automated generation of quarterly investor reports including P&L, Balance Sheet, and Cash Flow",
        benefits: "Saves 8+ hours per report, ensures formatting consistency, reduces errors",
        impact: "High - Multiple funds requiring regular reporting",
        weeklySavings: 8,
        complexity: "High",
        techStack: ["Azure OpenAI", "Power BI", "Template Engine"],
        phase: "Phase 2",
        teamContact: "Jessica Park",
        effortEstimate: "6-8 weeks",
        dependencies: "Financial data integration, Template approval",
        milestones: "Template system built, Data pipeline established, First report generated",
        riskAssessment: "Medium - Complex data transformations required",
        successCriteria: "All reports generated within 24 hours of quarter close"
      },
      {
        name: "Market Intelligence Synthesis",
        division: "Real Estate Sydney",
        category: "Data Extraction & Intelligence",
        status: "Scoping",
        solutionType: "AI Agent",

        description: "Daily digest of market news, competitor activity, and regulatory changes",
        benefits: "Executive visibility into market trends, competitive intelligence, proactive decision making",
        impact: "Medium - Strategic insights for leadership",
        weeklySavings: 6,
        complexity: "High",
        techStack: ["Web Scraping", "Azure OpenAI", "Email Digest"],
        phase: "Phase 2",
        teamContact: "David Liu",
        effortEstimate: "8-10 weeks",
        dependencies: "News API subscriptions, Content filtering rules",
        milestones: "Source identification, Scraping setup, Summary algorithm tuned",
        riskAssessment: "High - Content quality dependent on source reliability",
        successCriteria: "Daily digest delivered by 8am, >80% relevant content rating"
      },
      {
        name: "Post-IC Folder Automation",
        division: "Transaction Management",
        category: "Process Automation & Workflow",
        status: "Live",
        solutionType: "Automation",

        description: "Automatic creation of folder structure, Teams chat, and Dynamo entries after IC approval",
        benefits: "Zero manual setup time, ensures consistency, eliminates setup errors",
        impact: "Medium - Affects every new deal",
        weeklySavings: 3,
        complexity: "Medium",
        techStack: ["Power Automate", "SharePoint", "Teams API"],
        phase: "Phase 1",
        teamContact: "Amanda White",
        effortEstimate: "3-4 weeks",
        dependencies: "IC approval webhook, SharePoint permissions",
        milestones: "Workflow logic mapped, Integration tested, Rollout to all teams",
        riskAssessment: "Low - Well-understood process, stable APIs",
        successCriteria: "100% automated setup within 15 minutes of IC approval"
      },
      {
        name: "PSF Payment Automation",
        division: "Finance",
        category: "Process Automation & Workflow",
        status: "Scoping",
        solutionType: "Automation",

        description: "Automated PSF checks and payment request processing",
        benefits: "Reduces payment processing bottleneck, improves accuracy, faster vendor payments",
        impact: "Medium - Operational efficiency",
        weeklySavings: 4,
        complexity: "Medium",
        techStack: ["Email Parsing", "Excel Integration", "Approval Workflow"],
        phase: "Phase 2",
        teamContact: "Robert Kumar",
        effortEstimate: "5-6 weeks",
        dependencies: "Email system integration, Approval matrix definition",
        milestones: "Email parser built, Validation rules defined, Approval workflow tested",
        riskAssessment: "Medium - Requires careful validation logic",
        successCriteria: "<24 hour payment processing time, 0% payment errors"
      },
      {
        name: "Sales Comps Database",
        division: "Real Estate",
        category: "Data Extraction & Intelligence",
        status: "Scoping",
        solutionType: "AI Agent",
        description: "Proprietary database of sales comparables for property valuation",
        benefits: "Competitive advantage in pricing, faster valuation process, data-driven decisions",
        impact: "High - Strategic asset for deal pricing",
        weeklySavings: 10,
        complexity: "High",
        techStack: ["Multi-source Ingestion", "Vector Database", "RAG System"],
        phase: "Phase 3",
        teamContact: "Laura Martinez",
        effortEstimate: "12-16 weeks",
        dependencies: "Data source partnerships, Database infrastructure",
        milestones: "Data sources secured, Initial dataset loaded, Search functionality built",
        riskAssessment: "High - Complex data normalization, ongoing maintenance",
        successCriteria: "10,000+ comps in database, <30 second search time"
      },
      {
        name: "NDA Review Assistant",
        division: "Legal",
        category: "Review & Quality Assurance",
        status: "Live",
        solutionType: "AI Prompt",

        description: "AI-assisted review of NDAs against standard templates and requirements",
        benefits: "Faster review cycle, consistent standards application, risk identification",
        impact: "Medium - Accelerates deal initiation",
        weeklySavings: 3,
        complexity: "Low",
        techStack: ["OpenAI GPT-4", "Document Parsing"],
        phase: "Phase 1",
        teamContact: "Emily Chang",
        effortEstimate: "1-2 weeks",
        dependencies: "Standard NDA template library",
        milestones: "Template uploaded, Prompt refined, User training complete",
        riskAssessment: "Low - Limited scope, clear criteria",
        successCriteria: "Flag 100% of non-standard clauses, <10 min review time"
      }
    ];

    mockUseCases.forEach((uc) => {
      const id = randomUUID();
      const useCase: UseCase = {
        id,
        name: uc.name,
        division: uc.division,
        category: uc.category,
        status: uc.status,
        solutionType: uc.solutionType,
        description: uc.description ?? null,
        benefits: uc.benefits ?? null,
        impact: uc.impact ?? null,
        weeklySavings: uc.weeklySavings ?? null,
        complexity: uc.complexity ?? null,
        techStack: uc.techStack ?? null,
        phase: uc.phase ?? null,
        teamContact: uc.teamContact ?? null,
        effortEstimate: uc.effortEstimate ?? null,
        dependencies: uc.dependencies ?? null,
        milestones: uc.milestones ?? null,
        riskAssessment: uc.riskAssessment ?? null,
        successCriteria: uc.successCriteria ?? null,
      };
      this.useCases.set(id, useCase);
    });
  }
}

import { PostgresStorage } from "./pg-storage";

// Use PostgreSQL storage for production, fallback to in-memory for development without DATABASE_URL
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
