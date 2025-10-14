import PhaseCard from '../PhaseCard';

export default function PhaseCardExample() {
  return (
    <PhaseCard
      phase="Phase 1: Foundation"
      timeline="Months 0-3"
      automations={15}
      weeklySavings={25}
      status="Live"
      description="Quick wins and foundational automations with immediate ROI"
    />
  );
}
