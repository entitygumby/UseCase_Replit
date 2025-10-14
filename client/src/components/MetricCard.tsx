import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function MetricCard({ title, value, icon: Icon, subtitle, trend }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-2xl font-semibold tabular-nums mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span className={`text-sm font-medium ${trend.positive ? 'text-chart-2' : 'text-destructive'}`}>
            {trend.value}
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      )}
    </Card>
  );
}
