import MetricCard from '../MetricCard';
import { FolderKanban } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <MetricCard
      title="Total Use Cases"
      value={73}
      icon={FolderKanban}
      subtitle="Across all divisions"
      trend={{ value: "+12%", positive: true }}
    />
  );
}
