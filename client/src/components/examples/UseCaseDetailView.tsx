import UseCaseDetailView from '../UseCaseDetailView';

export default function UseCaseDetailViewExample() {
  const mockUseCase = {
    id: '1',
    name: 'BBSW/FX Rate Collection',
    division: 'Real Estate Sydney',
    category: 'Data Extraction & Intelligence',
    status: 'Live',
    solutionType: 'Automation',
    priorityTier: 'Tier 1',
    description: 'Automated daily collection of BBSW and FX rates from ASX and RBA sources',
    benefits: 'Eliminates manual data entry, ensures accuracy, enables real-time decision making',
    impact: 'High - Critical for all floating rate deals',
    weeklySavings: 5,
    complexity: 'Low',
    techStack: ['Python', 'Azure Functions', 'SharePoint'],
    phase: 'Phase 1',
    teamContact: 'Sarah Chen',
    effortEstimate: '1-2 weeks',
    dependencies: 'ASX API access, SharePoint integration',
    milestones: 'API setup complete, Daily automation running, Historical data imported',
    riskAssessment: 'Low - Well-defined APIs, minimal integration complexity',
    successCriteria: '100% daily data capture rate, <5 minute processing time'
  };

  return (
    <UseCaseDetailView
      useCase={mockUseCase}
      onBack={() => console.log('Back clicked')}
      onEdit={() => console.log('Edit clicked')}
      onDelete={() => console.log('Delete clicked')}
    />
  );
}
