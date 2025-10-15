import { db } from "./db";
import { useCases } from "@shared/schema";
import type { InsertUseCase } from "@shared/schema";

const seedUseCases: InsertUseCase[] = [
  {
    name: "BBSW/FX Rate Collection",
    division: "Finance",
    category: "Data Management",
    status: "Live",
    solutionType: "Automation",
    description: "Automated daily collection of BBSW and FX rates from ASX and RBA sources",
    benefits: "Eliminates manual data entry, ensures accuracy, enables real-time decision making",
    impact: "High",
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
    division: "Real Estate - Syd",
    category: "Document Generation",
    status: "Developing",
    solutionType: "AI Agent",
    description: "AI-powered generation of comprehensive sponsor profile documents for due diligence",
    benefits: "Reduces research time, ensures consistency, improves quality of analysis",
    impact: "High",
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
    division: "Txn Mgmt",
    category: "Document Generation",
    status: "Live",
    solutionType: "AI Agent",
    description: "Automated generation of quarterly investor reports including P&L, Balance Sheet, and Cash Flow",
    benefits: "Saves 8+ hours per report, ensures formatting consistency, reduces errors",
    impact: "High",
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
    division: "Real Estate - Syd",
    category: "Research & Analysis",
    status: "Scoping",
    solutionType: "AI Agent",
    description: "Daily digest of market news, competitor activity, and regulatory changes",
    benefits: "Executive visibility into market trends, competitive intelligence, proactive decision making",
    impact: "Medium",
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
    division: "Txn Mgmt",
    category: "Workflow Automation",
    status: "Live",
    solutionType: "Automation",
    description: "Automatic creation of folder structure, Teams chat, and Dynamo entries after IC approval",
    benefits: "Zero manual setup time, ensures consistency, eliminates setup errors",
    impact: "Medium",
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
    category: "Workflow Automation",
    status: "Scoping",
    solutionType: "Automation",
    description: "Automated PSF checks and payment request processing",
    benefits: "Reduces payment processing bottleneck, improves accuracy, faster vendor payments",
    impact: "Medium",
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
    division: "Real Estate - Bris",
    category: "Data Management",
    status: "Scoping",
    solutionType: "AI Agent",
    description: "Proprietary database of sales comparables for property valuation",
    benefits: "Competitive advantage in pricing, faster valuation process, data-driven decisions",
    impact: "High",
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
    division: "Compliance",
    category: "Review & Quality Assurance",
    status: "Live",
    solutionType: "AI Prompt",
    description: "AI-assisted review of NDAs against standard templates and requirements",
    benefits: "Faster review cycle, consistent standards application, risk identification",
    impact: "Medium",
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

async function seed() {
  console.log("Starting database seed...");
  
  // Check if database already has data
  const existing = await db.select().from(useCases);
  if (existing.length > 0) {
    console.log(`Database already has ${existing.length} use cases. Skipping seed.`);
    return;
  }

  // Insert seed data
  for (const useCase of seedUseCases) {
    await db.insert(useCases).values(useCase);
  }
  
  console.log(`Successfully seeded ${seedUseCases.length} use cases`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
