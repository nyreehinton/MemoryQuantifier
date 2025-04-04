import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DamageItem, DamageCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Doughnut } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

// Component to render an individual damage claim card
function DamageCard({ damage }: { damage: DamageItem }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-blue-800">{damage.id}</h4>
          <StatusBadge status={damage.status} size="sm" />
        </div>
        <p className="text-sm mt-1">{damage.title} ({formatCurrency(damage.claimed_value)})</p>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-2">Required Documentation</h5>
          <ul className="text-xs text-muted-foreground space-y-2">
            {damage.required_documents.map((doc) => (
              <li key={doc.doc_id} className="flex items-center">
                <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                  doc.status === "Verified" 
                    ? "bg-green-500" 
                    : doc.status === "Received" 
                      ? "bg-yellow-500" 
                      : "bg-red-500"
                }`}></span>
                {doc.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xs text-muted-foreground">
          <p><span className="font-medium">Source:</span> {damage.source_docs.map(d => `Doc ${d}`).join(", ")}</p>
          {damage.date && <p><span className="font-medium">Date:</span> {damage.date}</p>}
        </div>
        <Button
          className="mt-3 w-full text-xs"
          variant="outline"
          size="sm"
        >
          Upload Documentation
        </Button>
      </CardContent>
    </Card>
  );
}

export default function DamagesHub() {
  const [activeCategory, setActiveCategory] = useState<string>("overview");
  
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
    const category = damage.category.split('-')[0] as "PEC" | "NONPEC";
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
    .flatMap(d => d.required_documents)
    .reduce(
      (acc, doc) => {
        acc[doc.status]++;
        return acc;
      },
      { Verified: 0, Received: 0, Requested: 0, Needed: 0, "N/A": 0 } as Record<string, number>
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
          documentStatusCounts["N/A"]
        ],
        backgroundColor: [
          '#10b981', // green
          '#f59e0b', // yellow
          '#3b82f6', // blue
          '#ef4444', // red
          '#9ca3af', // gray
        ],
        borderWidth: 0,
      },
    ],
  };

  // Filter damages by category for each tab
  const getDamagesByCategory = (category: string) => {
    if (category === "overview") return [];
    return damages.filter(d => d.category === category);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="h-auto flex flex-wrap space-x-0 p-1 bg-muted rounded-lg overflow-x-auto">
          <TabsTrigger 
            value="overview" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="PEC-PAY" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            PEC-PAY (Required Payments)
          </TabsTrigger>
          <TabsTrigger 
            value="PEC-COST" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            PEC-COST (Increased Costs)
          </TabsTrigger>
          <TabsTrigger 
            value="PEC-FEE" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            PEC-FEE (Application Fees)
          </TabsTrigger>
          <TabsTrigger 
            value="PEC-DEP" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            PEC-DEP (Lost Deposits)
          </TabsTrigger>
          <TabsTrigger 
            value="PEC-OOP" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            PEC-OOP (Expenses)
          </TabsTrigger>
          <TabsTrigger 
            value="PEC-OPP" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            PEC-OPP (Opportunities)
          </TabsTrigger>
          <TabsTrigger 
            value="NONPEC-ED" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            NONPEC-ED (Emotional)
          </TabsTrigger>
          <TabsTrigger 
            value="NONPEC-REP" 
            className="rounded px-3 py-2 data-[state=active]:bg-background"
          >
            NONPEC-REP (Reputation)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Damages Summary</h3>
              <Card>
                <CardContent className="p-6">
                  <dl className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <dt className="text-muted-foreground">Required Payments (PEC-PAY):</dt>
                      <dd className="font-medium">{formatCurrency(categorySums['PEC-PAY'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <dt className="text-muted-foreground">Increased Credit Costs (PEC-COST):</dt>
                      <dd className="font-medium">{formatCurrency(categorySums['PEC-COST'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <dt className="text-muted-foreground">Application Fees (PEC-FEE):</dt>
                      <dd className="font-medium">{formatCurrency(categorySums['PEC-FEE'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <dt className="text-muted-foreground">Lost Deposits (PEC-DEP):</dt>
                      <dd className="font-medium">{formatCurrency(categorySums['PEC-DEP'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <dt className="text-muted-foreground">Out-of-Pocket Expenses (PEC-OOP):</dt>
                      <dd className="font-medium">{formatCurrency(categorySums['PEC-OOP'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t pt-2 border-muted">
                      <dt className="text-muted-foreground">Lost Opportunities (PEC-OPP):</dt>
                      <dd className="font-medium">{formatCurrency(categorySums['PEC-OPP'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t pt-2 border-muted">
                      <dt className="font-medium">Total Quantifiable Economic:</dt>
                      <dd className="font-bold">{formatCurrency(categorySums['PEC'] || 0)}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <dt className="text-muted-foreground">Non-Pecuniary (NONPEC):</dt>
                      <dd className="font-medium">Not Quantified</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Documentation Status</h3>
              <Card>
                <CardContent className="p-6 flex justify-center">
                  <div className="w-[300px] h-[300px]">
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
                                size: 12
                              }
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = (context.dataset.data as number[]).reduce((acc, data) => acc + (data as number), 0);
                                const percentage = Math.round(((value as number) / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mb-4">Featured Claims</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {damages.slice(0, 3).map((damage) => (
              <DamageCard key={damage.id} damage={damage} />
            ))}
          </div>
        </TabsContent>
        
        {/* Render tabs for each damage category */}
        {["PEC-PAY", "PEC-COST", "PEC-FEE", "PEC-DEP", "PEC-OOP", "PEC-OPP", "NONPEC-ED", "NONPEC-REP"].map((category) => (
          <TabsContent key={category} value={category} className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">{category} Damages</h3>
              <Button size="sm">Add {category} Claim</Button>
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
