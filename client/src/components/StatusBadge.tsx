import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
      case 'developing':
        return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      case 'scoping':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <Badge variant="outline" className={getStatusStyles(status)}>
      {status}
    </Badge>
  );
}
