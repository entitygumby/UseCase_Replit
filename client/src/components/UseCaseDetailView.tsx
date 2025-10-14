import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "./StatusBadge";
import { ArrowLeft, Edit, Trash2, Clock, Target, Users, Zap } from "lucide-react";

interface UseCaseDetailProps {
  useCase: {
    id: string;
    name: string;
    division: string;
    category: string;
    status: string;
    solutionType: string;
    priorityTier: string | null;
    description: string | null;
    benefits: string | null;
    impact: string | null;
    weeklySavings: number | null;
    complexity: string | null;
    techStack: string[] | null;
    phase: string | null;
    teamContact: string | null;
    effortEstimate: string | null;
    dependencies: string | null;
    milestones: string | null;
    riskAssessment: string | null;
    successCriteria: string | null;
  };
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function UseCaseDetailView({ useCase, onBack, onEdit, onDelete }: UseCaseDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onEdit} data-testid="button-edit">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={onDelete} data-testid="button-delete">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{useCase.name}</h1>
            <div className="flex gap-2 items-center flex-wrap">
              <StatusBadge status={useCase.status} />
              <Badge variant="outline">{useCase.solutionType}</Badge>
              {useCase.priorityTier && (
                <Badge variant="secondary">{useCase.priorityTier}</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Weekly Savings</p>
                <p className="text-lg font-semibold tabular-nums">{useCase.weeklySavings || 0}h</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-md">
                <Target className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Complexity</p>
                <p className="text-lg font-semibold">{useCase.complexity || 'N/A'}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-md">
                <Zap className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Phase</p>
                <p className="text-lg font-semibold">{useCase.phase || 'N/A'}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-4/10 rounded-md">
                <Users className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Team Contact</p>
                <p className="text-lg font-semibold truncate">{useCase.teamContact || 'N/A'}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                <p className="text-base">{useCase.description || 'No description provided.'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Benefits</h3>
                <p className="text-base">{useCase.benefits || 'No benefits specified.'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Impact</h3>
                <p className="text-base">{useCase.impact || 'Impact not specified.'}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Implementation Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {useCase.techStack && useCase.techStack.length > 0 ? (
                    useCase.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No tech stack specified.</p>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Effort Estimate</h3>
                <p className="text-base">{useCase.effortEstimate || 'Not estimated.'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Dependencies</h3>
                <p className="text-base">{useCase.dependencies || 'No dependencies specified.'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Milestones</h3>
                <p className="text-base">{useCase.milestones || 'No milestones defined.'}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">General Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Division</p>
                <p className="text-base font-medium">{useCase.division}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Category</p>
                <p className="text-base font-medium">{useCase.category}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Risk & Success</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Risk Assessment</h3>
                <p className="text-sm">{useCase.riskAssessment || 'No risk assessment provided.'}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Success Criteria</h3>
                <p className="text-sm">{useCase.successCriteria || 'No success criteria defined.'}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
