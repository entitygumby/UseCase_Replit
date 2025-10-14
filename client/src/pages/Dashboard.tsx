import { useQuery } from "@tanstack/react-query";
import MetricCard from "@/components/MetricCard";
import PhaseCard from "@/components/PhaseCard";
import { Button } from "@/components/ui/button";
import { FolderKanban, CheckCircle, Clock, Cog, Plus } from "lucide-react";
import { Link } from "wouter";
import type { UseCase } from "@shared/schema";

export default function Dashboard() {
  const { data: useCases = [], isLoading } = useQuery<UseCase[]>({
    queryKey: ['/api/use-cases'],
  });

  // TODO: remove mock functionality - Calculate metrics from real data
  const totalUseCases = useCases.length;
  const liveCount = useCases.filter(uc => uc.status.toLowerCase() === 'live').length;
  const developingCount = useCases.filter(uc => uc.status.toLowerCase() === 'developing').length;
  const scopingCount = useCases.filter(uc => uc.status.toLowerCase() === 'scoping').length;

  const aiAgentCount = useCases.filter(uc => uc.solutionType.toLowerCase() === 'ai agent').length;
  const aiPromptCount = useCases.filter(uc => uc.solutionType.toLowerCase() === 'ai prompt').length;
  const automationCount = useCases.filter(uc => uc.solutionType.toLowerCase() === 'automation').length;

  // Calculate phase metrics
  const phase1Cases = useCases.filter(uc => uc.phase === 'Phase 1');
  const phase2Cases = useCases.filter(uc => uc.phase === 'Phase 2');
  const phase3Cases = useCases.filter(uc => uc.phase === 'Phase 3');

  const phase1Savings = phase1Cases.reduce((sum, uc) => sum + (uc.weeklySavings || 0), 0);
  const phase2Savings = phase2Cases.reduce((sum, uc) => sum + (uc.weeklySavings || 0), 0);
  const phase3Savings = phase3Cases.reduce((sum, uc) => sum + (uc.weeklySavings || 0), 0);

  const phase1Status = phase1Cases.every(uc => uc.status.toLowerCase() === 'live') ? 'Live' : 'In Progress';
  const phase2Status = phase2Cases.every(uc => uc.status.toLowerCase() === 'live') ? 'Live' : 'In Progress';
  const phase3Status = phase3Cases.every(uc => uc.status.toLowerCase() === 'live') ? 'Live' : 'In Progress';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Use Case Portfolio</h1>
          <p className="text-muted-foreground">
            Track and manage AI & automation initiatives across the organization
          </p>
        </div>
        <Link href="/use-cases/new">
          <Button data-testid="button-create">
            <Plus className="mr-2 h-4 w-4" />
            New Use Case
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Use Cases"
          value={totalUseCases}
          icon={FolderKanban}
          subtitle="Across all divisions"
        />
        <MetricCard
          title="Live"
          value={liveCount}
          icon={CheckCircle}
          subtitle={`${Math.round((liveCount / totalUseCases) * 100) || 0}% of portfolio`}
        />
        <MetricCard
          title="Developing"
          value={developingCount}
          icon={Clock}
          subtitle="In active development"
        />
        <MetricCard
          title="Scoping"
          value={scopingCount}
          icon={Cog}
          subtitle="Planning phase"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Solution Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="AI Agents"
            value={aiAgentCount}
            icon={FolderKanban}
            subtitle={`${Math.round((aiAgentCount / totalUseCases) * 100) || 0}% of total`}
          />
          <MetricCard
            title="AI Prompts"
            value={aiPromptCount}
            icon={FolderKanban}
            subtitle={`${Math.round((aiPromptCount / totalUseCases) * 100) || 0}% of total`}
          />
          <MetricCard
            title="Automations"
            value={automationCount}
            icon={FolderKanban}
            subtitle={`${Math.round((automationCount / totalUseCases) * 100) || 0}% of total`}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Implementation Phases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PhaseCard
            phase="Phase 1: Foundation"
            timeline="Months 0-3"
            automations={phase1Cases.length}
            weeklySavings={phase1Savings}
            status={phase1Status}
            description="Quick wins and foundational automations with immediate ROI"
          />
          <PhaseCard
            phase="Phase 2: Scale"
            timeline="Months 4-6"
            automations={phase2Cases.length}
            weeklySavings={phase2Savings}
            status={phase2Status}
            description="High-value agents and strategic implementations"
          />
          <PhaseCard
            phase="Phase 3: Strategic"
            timeline="Months 6-12"
            automations={phase3Cases.length}
            weeklySavings={phase3Savings}
            status={phase3Status}
            description="Complex workflows and competitive advantage initiatives"
          />
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Link href="/use-cases">
          <Button variant="outline" size="lg" data-testid="button-view-all">
            View All Use Cases
          </Button>
        </Link>
      </div>
    </div>
  );
}
