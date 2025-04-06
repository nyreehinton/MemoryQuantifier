import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Doughnut } from '@/components/ui/chart';
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-4 text-foreground">Damages Summary</h3>
              <Card className="card-concrete">
                <CardContent className="p-6">
                  <dl className="space-y-6 text-sm">
                    {/* Pecuniary Damages Section */}
                    <div className="space-y-3">
                      <dt className="font-semibold text-base border-b border-border pb-2 text-foreground">
                        Pecuniary (Economic) Damages
                      </dt>
                      <div className="space-y-3 pl-2">
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Required Payments (PEC-PAY):</dt>
                          <dd className="font-medium">
                            {formatCurrency(categorySums['PEC-PAY'] || 0)}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">
                            Increased Credit Costs (PEC-COST):
                          </dt>
                          <dd className="font-medium">
                            {formatCurrency(categorySums['PEC-COST'] || 0)}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Application Fees (PEC-FEE):</dt>
                          <dd className="font-medium">
                            {formatCurrency(categorySums['PEC-FEE'] || 0)}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Lost Deposits (PEC-DEP):</dt>
                          <dd className="font-medium">
                            {formatCurrency(categorySums['PEC-DEP'] || 0)}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">
                            Out-of-Pocket Expenses (PEC-OOP):
                          </dt>
                          <dd className="font-medium">
                            {formatCurrency(categorySums['PEC-OOP'] || 0)}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Lost Opportunities (PEC-OPP):</dt>
                          <dd className="font-medium">
                            {formatCurrency(categorySums['PEC-OPP'] || 0)}
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t pt-2 border-muted">
                          <dt className="font-medium">Total Economic Damages:</dt>
                          <dd className="font-bold">{formatCurrency(categorySums['PEC'] || 0)}</dd>
                        </div>
                      </div>
                    </div>

                    {/* Non-Pecuniary Damages Section */}
                    <div className="space-y-3">
                      <dt className="font-semibold text-base border-b border-border pb-2 text-foreground">
                        Non-Pecuniary (Non-Economic) Damages
                      </dt>
                      <div className="space-y-3 pl-2">
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Emotional Distress (NONPEC-ED):</dt>
                          <dd className="font-medium text-foreground">
                            {emotionalDistressLevel}
                            <span className="text-xs text-muted-foreground ml-2">
                              ({actionStats.emotionalDistressCount} Adverse Actions)
                            </span>
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Reputational Harm (NONPEC-REP):</dt>
                          <dd className="font-medium text-foreground">
                            {reputationalHarmLevel}
                            <span className="text-xs text-muted-foreground ml-2">
                              ({actionStats.uniqueInstitutions} Institutions)
                            </span>
                          </dd>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2 bg-accent/30 p-3 rounded-lg">
                          <p>
                            <strong className="text-foreground">Aggravating Factors:</strong>
                          </p>
                          <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>Occurred during critical personal period (child's birth)</li>
                            <li>Prevented replacement of defective vehicle</li>
                            <li>Contrasts with prior unblemished credit history</li>
                            <li>Forced withdrawal from Harvard University</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-foreground">Documentation Status</h3>
              <Card className="card-concrete">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                  <div className="text-xs text-center text-muted-foreground">
                    <p className="font-medium">Critical Documentation Needs:</p>
                    <ul className="mt-2 text-left list-disc pl-4 space-y-1">
                      {criticalDocs.map((doc) => (
                        <li key={doc.doc_id}>
                          {doc.name}
                          <span className="text-xs text-muted-foreground ml-1">({doc.doc_id})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">
                Supporting Adverse Actions ({actionStats.totalActions})
              </h3>
              <Card className="card-concrete">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm border-b pb-2">
                      <span className="font-medium">Summary of Adverse Actions:</span>
                      <span>
                        {actionStats.totalActions} Total Actions from{' '}
                        {actionStats.uniqueInstitutions} Institutions
                      </span>
                    </div>
                    <div className="text-sm space-y-2">
                      <p>
                        These adverse actions form the basis for the damage claims below. Each
                        adverse action has been analyzed for:
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        <li>Applicable pecuniary (economic) damages</li>
                        <li>Non-pecuniary impacts (emotional distress, reputational harm)</li>
                        <li>Required documentation and evidence</li>
                      </ul>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Adverse Actions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Consolidated Damage Claims</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {damages.map((damage) => (
                  <DamageCard key={damage.id} damage={damage} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Render tabs for each damage category */}
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
          <TabsContent key={category} value={category} className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">{category} Damages</h3>
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
        ))}
      </Tabs>
    </div>
  );
}
