import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { AdverseAction, DamageItem } from '@/types';
import { QueryFunction, useQuery } from '@tanstack/react-query';
import { ChartOptions, TooltipItem } from 'chart.js';
import { useState } from 'react';

// Component to render an individual damage claim card
function DamageCard({ damage }: { damage: DamageItem }) {
  return (
    <Card className="overflow-hidden h-full card-concrete">
      <div className="bg-card px-4 py-3 border-b border-border">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-foreground">{damage.id}</h4>
          <StatusBadge status={damage.status} size="sm" />
        </div>
        <p className="text-sm mt-1 text-muted-foreground">
          {damage.title} ({formatCurrency(damage.claimed_value)})
        </p>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-2">Required Documentation</h5>
          <ul className="text-xs text-muted-foreground space-y-2">
            {damage.required_documents.map((doc) => (
              <li key={doc.doc_id} className="flex items-center">
                <span
                  className={`inline-block h-2 w-2 rounded-full mr-2 ${
                    doc.status === 'Verified'
                      ? 'bg-emerald-600'
                      : doc.status === 'Received'
                      ? 'bg-amber-600'
                      : 'bg-red-700'
                  }`}
                ></span>
                {doc.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>
            <span className="font-medium">Source:</span>{' '}
            {damage.source_docs.map((d) => `Doc ${d}`).join(', ')}
          </p>
          {damage.date && (
            <p>
              <span className="font-medium">Date:</span> {damage.date}
            </p>
          )}
        </div>
        <Button className="mt-3 w-full text-xs button-concrete" variant="outline" size="sm">
          Upload Documentation
        </Button>
      </CardContent>
    </Card>
  );
}

interface DoughnutChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

export default function DamagesHub() {
  const [activeCategory, setActiveCategory] = useState<string>('overview');

  const fetchDamages: QueryFunction<DamageItem[]> = async () => {
    const response = await fetch('/api/damages');
    return response.json();
  };

  const fetchAdverseActions: QueryFunction<AdverseAction[]> = async () => {
    const response = await fetch('/api/adverse-actions');
    return response.json();
  };

  const { data: damages, isLoading: damagesLoading } = useQuery<DamageItem[]>({
    queryKey: ['/api/damages'],
    queryFn: fetchDamages,
  });

  const { data: adverseActions, isLoading: actionsLoading } = useQuery<AdverseAction[]>({
    queryKey: ['/api/adverse-actions'],
    queryFn: fetchAdverseActions,
  });

  if (damagesLoading || actionsLoading) {
    return <div className="flex justify-center p-8">Loading data...</div>;
  }

  if (!damages || !adverseActions) {
    return <div className="flex justify-center p-8">No data available</div>;
  }

  // Calculate summary data
  const categorySums = damages.reduce((acc: Record<string, number>, damage: DamageItem) => {
    const category = damage.category.split('-')[0] as 'PEC' | 'NONPEC';
    const subCategory = damage.category;

    if (!acc[category]) acc[category] = 0;
    if (!acc[subCategory]) acc[subCategory] = 0;

    const value = damage.claimed_value || 0;
    acc[category] += value;
    acc[subCategory] += value;

    return acc;
  }, {} as Record<string, number>);

  // Calculate adverse action statistics
  const actionStats = {
    totalActions: adverseActions.length,
    uniqueInstitutions: new Set(adverseActions.map((a: AdverseAction) => a.sender_name)).size,
    emotionalDistressCount: adverseActions.filter((a: AdverseAction) =>
      a.applicable_non_pecuniary_damages?.some((d) => d.id === 'NONPEC-ED')
    ).length,
    reputationalHarmCount: adverseActions.filter((a: AdverseAction) =>
      a.applicable_non_pecuniary_damages?.some((d) => d.id === 'NONPEC-REP')
    ).length,
  };

  // Document status counts for the chart
  const documentStatusCounts = damages
    .flatMap((d) => d.required_documents)
    .reduce(
      (acc, doc) => {
        acc[doc.status]++;
        return acc;
      },
      { Verified: 0, Received: 0, Requested: 0, Needed: 0, 'N/A': 0 } as Record<string, number>
    );

  // Chart data
  const chartData: DoughnutChartData = {
    labels: ['Verified', 'Received', 'Requested', 'Needed', 'N/A'],
    datasets: [
      {
        data: [
          documentStatusCounts.Verified,
          documentStatusCounts.Received,
          documentStatusCounts.Requested,
          documentStatusCounts.Needed,
          documentStatusCounts['N/A'],
        ],
        backgroundColor: [
          'rgb(16, 185, 129)', // Verified - emerald
          'rgb(245, 158, 11)', // Received - amber
          'rgb(59, 130, 246)', // Requested - blue
          'rgb(239, 68, 68)', // Needed - red
          'rgb(107, 114, 128)', // N/A - cool gray
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = (context.dataset.data as number[]).reduce(
              (acc: number, data: number) => acc + data,
              0
            );
            const percentage = Math.round(((value as number) / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Filter damages by category for each tab
  const getDamagesByCategory = (category: string) => {
    if (category === 'overview') return [];
    return damages.filter((d) => d.category === category);
  };

  // Calculate critical documentation needs
  const criticalDocs = damages
    .flatMap((d) => d.required_documents)
    .filter((doc) => doc.status === 'Needed')
    .sort((a, b) => {
      // Prioritize high-value claims
      const aValue = damages.find((d) => d.required_documents.includes(a))?.claimed_value || 0;
      const bValue = damages.find((d) => d.required_documents.includes(b))?.claimed_value || 0;
      return bValue - aValue;
    })
    .slice(0, 5); // Show top 5 critical docs

  // Calculate non-pecuniary impact levels
  const emotionalDistressLevel =
    actionStats.emotionalDistressCount >= 30
      ? 'Severe'
      : actionStats.emotionalDistressCount >= 20
      ? 'Substantial'
      : actionStats.emotionalDistressCount >= 10
      ? 'Moderate'
      : 'Minor';

  const reputationalHarmLevel =
    actionStats.uniqueInstitutions >= 25
      ? 'Severe'
      : actionStats.uniqueInstitutions >= 15
      ? 'Substantial'
      : actionStats.uniqueInstitutions >= 8
      ? 'Moderate'
      : 'Minor';

  // Calculate credit limit reduction impact
  const creditLimitReductions = damages.filter(
    (d) => d.category === 'PEC-COST' && d.title.includes('Credit Limit Reduction')
  );

  const totalCreditLimitReduction = creditLimitReductions.reduce((total, damage) => {
    const match = damage.description.match(/\$([0-9,]+)/);
    return total + (match ? parseInt(match[1].replace(',', '')) : 0);
  }, 0);

  const creditLimitStats = {
    totalReductions: creditLimitReductions.length,
    totalAmountReduced: totalCreditLimitReduction,
    affectedCards: creditLimitReductions.map((d) => d.title.split('(')[0].trim()),
    dateRange: {
      start: creditLimitReductions.reduce((earliest, d) => {
        if (!d.date) return earliest;
        return !earliest || d.date < earliest ? d.date : earliest;
      }, ''),
      end: creditLimitReductions.reduce((latest, d) => {
        if (!d.date) return latest;
        return !latest || d.date > latest ? d.date : latest;
      }, ''),
    },
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="h-auto flex flex-wrap space-x-0 p-1 bg-secondary rounded-lg overflow-x-auto">
          <TabsTrigger value="overview" className="tab-concrete rounded px-3 py-2">
            Overview
          </TabsTrigger>
          {[
            'PEC-PAY',
            'PEC-COST',
            'PEC-FEE',
            'PEC-DEP',
            'PEC-OOP',
            'PEC-OPP',
            'NONPEC-ED',
            'NONPEC-REP',
          ].map((category) => (
            <TabsTrigger key={category} value={category} className="tab-concrete rounded px-3 py-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Quantification Framework</h3>
              <Card className="card-concrete">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm border-b pb-2">
                      <span className="font-medium">Framework Overview:</span>
                      <span>Version 2.0 (Updated 2024-04-22)</span>
                    </div>
                    <div className="text-sm space-y-2">
                      <p>
                        This framework provides a structured approach to quantifying damages from{' '}
                        {actionStats.totalActions} adverse actions across{' '}
                        {actionStats.uniqueInstitutions} institutions:
                      </p>
                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="font-medium">Pecuniary (Economic) Damages:</h4>
                          <ul className="list-disc pl-4 space-y-1 text-muted-foreground mt-2">
                            <li>
                              Credit Limit Reductions: {creditLimitStats.totalReductions} accounts
                              affected, total reduction{' '}
                              {formatCurrency(creditLimitStats.totalAmountReduced)}
                            </li>
                            <li>
                              Required Additional Payments: Documented direct costs like security
                              deposits
                            </li>
                            <li>
                              Lost Opportunities: Harvard program withdrawal, business loan impacts
                            </li>
                            <li>Out-of-Pocket Expenses: Direct costs from remediation efforts</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Non-Pecuniary Impact Analysis:</h4>
                          <ul className="list-disc pl-4 space-y-1 text-muted-foreground mt-2">
                            <li>
                              Emotional Distress: {emotionalDistressLevel} (
                              {actionStats.emotionalDistressCount} supporting actions)
                            </li>
                            <li>
                              Reputational Harm: {reputationalHarmLevel} impact across{' '}
                              {actionStats.uniqueInstitutions} institutions
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="PEC-COST" className="pt-6">
          <div className="mb-6">
            <Card className="card-concrete">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Increased Cost of Credit Claims</h3>
                  <Button size="sm" className="button-concrete">
                    Add PEC-COST Claim
                  </Button>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Required Documentation for Credit Cost Claims:</p>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>Final Credit Agreement showing unfavorable terms</li>
                      <li>Risk-Based Pricing Notice / Adverse Action Notice</li>
                      <li>Proof of "But-For" Terms (e.g., rate sheets, pre-approval offers)</li>
                      <li>Amortization Schedule showing total cost difference</li>
                      <li>Proof of additional fees/deposits paid</li>
                    </ul>
                  </div>
                  <div className="text-sm mt-4">
                    <p className="font-medium">Summary of Claims:</p>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground mt-2">
                      <li>
                        Credit Limit Reductions: {creditLimitStats.totalReductions} accounts
                        affected, total reduction{' '}
                        {formatCurrency(creditLimitStats.totalAmountReduced)}
                      </li>
                      <li>Auto Financing Denials/Modifications: 8 instances</li>
                      <li>Student/Personal Loan Denials: 8 instances</li>
                      <li>Explicit Unfavorable Terms Notices: 2 instances</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getDamagesByCategory('PEC-COST').map((damage: DamageItem) => (
              <DamageCard key={damage.id} damage={damage} />
            ))}
            {getDamagesByCategory('PEC-COST').length === 0 && (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                No claims in this category yet. Click "Add PEC-COST Claim" to get started.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Render tabs for each damage category */}
        {['PEC-PAY', 'PEC-FEE', 'PEC-DEP', 'PEC-OOP', 'PEC-OPP', 'NONPEC-ED', 'NONPEC-REP'].map(
          (category) => (
            <TabsContent key={category} value={category} className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">{category} Damages</h3>
                {category === 'PEC-COST' && (
                  <div className="text-sm text-muted-foreground">
                    {creditLimitStats.totalReductions} credit limit reductions totaling{' '}
                    {formatCurrency(creditLimitStats.totalAmountReduced)}
                  </div>
                )}
                <Button size="sm" className="button-concrete">
                  Add {category} Claim
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getDamagesByCategory(category).map((damage) => (
                  <DamageCard key={damage.id} damage={damage} />
                ))}

                {getDamagesByCategory(category).length === 0 && (
                  <div className="col-span-full py-8 text-center text-muted-foreground">
                    No claims in this category yet. Click "Add {category} Claim" to get started.
                  </div>
                )}
              </div>
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  );
}
