import UseCaseTable from '../UseCaseTable';

export default function UseCaseTableExample() {
  const mockUseCases = [
    {
      id: '1',
      name: 'BBSW/FX Rate Collection',
      division: 'Real Estate Sydney',
      category: 'Data Extraction',
      status: 'Live',
      solutionType: 'Automation',
      teamContact: 'Sarah Chen',
      description: 'Automated rate collection',
      impact: 'High',
      priorityTier: 'Tier 1'
    },
    {
      id: '2',
      name: 'Investor Report Generation',
      division: 'Transaction Management',
      category: 'Document Generation',
      status: 'Developing',
      solutionType: 'AI Agent',
      teamContact: 'Jessica Park',
      description: 'Automated investor reports',
      impact: 'High',
      priorityTier: 'Tier 2'
    }
  ];

  return <UseCaseTable useCases={mockUseCases} onRowClick={(id) => console.log('Clicked:', id)} />;
}
