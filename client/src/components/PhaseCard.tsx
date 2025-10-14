import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PhaseCardProps {
  phase: string;
  timeline: string;
  automations: number;
  weeklySavings: number;
  status: string;
  description: string;
}

export default function PhaseCard({ phase, timeline, automations, weeklySavings, status, description }: PhaseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
      case 'in progress':
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">{phase}</h3>
          <p className="text-xs text-muted-foreground">{timeline}</p>
        </div>
        <Badge variant="outline" className={getStatusColor(status)}>
          {status}
        </Badge>
      </div>
      
      <p className="text-xs text-muted-foreground mb-4">
        {description}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Automations
          </p>
          <p className="text-xl font-semibold tabular-nums">
            {automations}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Weekly Savings
          </p>
          <p className="text-xl font-semibold tabular-nums">
            {weeklySavings}h
          </p>
        </div>
      </div>
    </Card>
  );
}
