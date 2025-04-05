import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Doughnut } from '@/components/ui/chart';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { DamageItem } from '@/types';
import { useQuery } from '@tanstack/react-query';
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

export default function DamagesHub() {
  const [activeCategory, setActiveCategory] = useState<string>('overview');

  const { data: damages, isLoading } = useQuery<DamageItem[]>({
    queryKey: ['/api/damages'],
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading damages data...</div>;
  }

  if (!damages) {
    return <div className="flex justify-center p-8">No damages data available</div>;
  }

  // Calculate summary data
  const categorySums = damages.reduce((acc, damage) => {
    const category = damage.category.split('-')[0] as 'PEC' | 'NONPEC';
    const subCategory = damage.category;

    if (!acc[category]) acc[category] = 0;
    if (!acc[subCategory]) acc[subCategory] = 0;

    const value = damage.claimed_value || 0;
    acc[category] += value;
    acc[subCategory] += value;

    return acc;
  }, {} as Record<string, number>);

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
  const chartData = {
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

  // Filter damages by category for each tab
  const getDamagesByCategory = (category: string) => {
    if (category === 'overview') return [];
    return damages.filter((d) => d.category === category);
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
                            Substantial
                            <span className="text-xs text-muted-foreground ml-2">
                              (43 Adverse Actions)
                            </span>
                          </dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <dt className="text-muted-foreground">Reputational Harm (NONPEC-REP):</dt>
                          <dd className="font-medium text-foreground">
                            Substantial
                            <span className="text-xs text-muted-foreground ml-2">
                              (28 Institutions)
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
                    <Doughnut
                      data={chartData}
                      options={{
                        cutout: '70%',
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              boxWidth: 12,
                              padding: 16,
                              font: {
                                size: 12,
                                color: 'rgb(156, 163, 175)', // gray-400 for better visibility
                              },
                            },
                          },
                          tooltip: {
                            callbacks: {
                              label: function (context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = (context.dataset.data as number[]).reduce(
                                  (acc, data) => acc + (data as number),
                                  0
                                );
                                const percentage = Math.round(((value as number) / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="text-xs text-center text-muted-foreground">
                    <p className="font-medium">Critical Documentation Needs:</p>
                    <ul className="mt-2 text-left list-disc pl-4 space-y-1">
                      <li>Credit Reports Used by Creditors (PREQ-01)</li>
                      <li>Essex Payment Proof (PEC-PAY-01)</li>
                      <li>Harvard Withdrawal Documentation (PEC-OPP)</li>
                      <li>Opportunity Insights Study</li>
                      <li>Plaintiff's Detailed Testimony (NONPEC-ED-01)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4">All Claims</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {damages.map((damage) => (
              <DamageCard key={damage.id} damage={damage} />
            ))}
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
