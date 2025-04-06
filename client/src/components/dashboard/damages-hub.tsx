import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreditReports } from '@/contexts/CreditReportsContext';
import { formatCurrency } from '@/lib/utils';
import { AdverseAction, DamageItem } from '@/types';
import { QueryFunction, useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronRight, FileText, Scale } from 'lucide-react';
import { useState } from 'react';

// Legal framework scopes
const LEGAL_SCOPES = {
  UCL: {
    id: 'UCL',
    title: 'Unfair Competition Law',
    description: 'Cal. Bus. & Prof. Code § 17200 - Restitution for unfair business practices',
  },
  CCRAA: {
    id: 'CCRAA',
    title: 'CA Consumer Credit Reporting Agencies Act',
    description: 'Cal. Civil Code § 1785 - Credit reporting violations',
  },
  FCRA: {
    id: 'FCRA',
    title: 'Fair Credit Reporting Act',
    description: '15 U.S.C. § 1681 - Federal credit reporting violations',
  },
  RFDCPA: {
    id: 'RFDCPA',
    title: 'Rosenthal Fair Debt Collection Practices Act',
    description: 'Cal. Civil Code § 1788 - Debt collection practices',
  },
  GF_FD: {
    id: 'GF_FD',
    title: 'Good Faith & Fair Dealing',
    description: 'Implied covenant in contracts - Bad faith conduct',
  },
};

// Component to render a credit report document
function CreditReportDoc({
  doc,
}: {
  doc: { doc_id: string; name: string; details: string; status: string };
}) {
  const { creditReports, updateCreditReport } = useCreditReports();
  const report = creditReports[doc.doc_id];

  // Only handle credit report documents
  if (!doc.doc_id.startsWith('PREQ-01-')) {
    return (
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
    );
  }

  const handleStatusUpdate = (newStatus: typeof report.status) => {
    updateCreditReport(doc.doc_id, { status: newStatus });
  };

  return (
    <li key={doc.doc_id} className="flex items-center justify-between group">
      <div className="flex items-center">
        <span
          className={`inline-block h-2 w-2 rounded-full mr-2 ${
            report?.status === 'Verified'
              ? 'bg-emerald-600'
              : report?.status === 'Received'
              ? 'bg-amber-600'
              : 'bg-red-700'
          }`}
        ></span>
        <span className="flex-1">{doc.name}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <select
          aria-label={`Update status for ${doc.name}`}
          title={`Update status for ${doc.name}`}
          value={report?.status || 'Needed'}
          onChange={(e) => handleStatusUpdate(e.target.value as typeof report.status)}
          className="text-xs bg-transparent border-none p-0 ml-2"
        >
          <option value="Needed">Needed</option>
          <option value="Requested">Requested</option>
          <option value="Received">Received</option>
          <option value="Verified">Verified</option>
          <option value="N/A">N/A</option>
        </select>
      </div>
    </li>
  );
}

// Component to render an individual damage claim card
function DamageCard({ damage, legalScopes }: { damage: DamageItem; legalScopes: string[] }) {
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
        <div className="flex gap-1 mt-2">
          {legalScopes.map((scope) => (
            <span key={scope} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
              {scope}
            </span>
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-2">Required Documentation</h5>
          <ul className="text-xs text-muted-foreground space-y-2">
            {damage.required_documents.map((doc) => (
              <CreditReportDoc key={doc.doc_id} doc={doc} />
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

// Component to render legal scope summary
function LegalScopeSummary({
  scope,
  damages,
  totalValue,
}: {
  scope: (typeof LEGAL_SCOPES)[keyof typeof LEGAL_SCOPES];
  damages: DamageItem[];
  totalValue: number;
}) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{scope.title}</h3>
            <p className="text-sm text-muted-foreground">{scope.description}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{formatCurrency(totalValue)}</p>
            <p className="text-sm text-muted-foreground">{damages.length} claims</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// New component for the overview tab
function OverviewTab({
  damages,
  adverseActions,
  damagesByScope,
  scopeTotals,
}: {
  damages: DamageItem[];
  adverseActions: AdverseAction[];
  damagesByScope: Record<string, DamageItem[]>;
  scopeTotals: Record<string, number>;
}) {
  const totalDamages = Object.values(scopeTotals).reduce((sum, value) => sum + value, 0);
  const uniqueInstitutions = new Set(adverseActions.map((a) => a.sender_name)).size;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{formatCurrency(totalDamages)}</h3>
                <p className="text-sm text-muted-foreground">Total Quantified Damages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{adverseActions.length}</h3>
                <p className="text-sm text-muted-foreground">
                  Adverse Actions from {uniqueInstitutions} Institutions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Legal Framework Summary</h3>
          <div className="space-y-6">
            {Object.values(LEGAL_SCOPES).map((scope) => {
              const scopeDamages = damagesByScope[scope.id] || [];
              const scopeTotal = scopeTotals[scope.id] || 0;
              const percentageOfTotal = totalDamages
                ? ((scopeTotal / totalDamages) * 100).toFixed(1)
                : 0;

              return (
                <div key={scope.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {scope.title}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-primary">{scope.id}</span>
                      </h4>
                      <p className="text-sm text-muted-foreground">{scope.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(scopeTotal)}</p>
                      <p className="text-sm text-muted-foreground">{percentageOfTotal}% of total</p>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="bg-muted rounded-full h-2 w-full">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${percentageOfTotal}%` }}
                      />
                    </div>
                  </div>

                  <div className="pl-4 border-l-2 border-muted mt-2">
                    <div className="text-sm space-y-1">
                      <p>{scopeDamages.length} claims under this framework</p>
                      {scopeDamages.length > 0 && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ArrowRight className="h-3 w-3" />
                          Top claim: {scopeDamages[0].title} (
                          {formatCurrency(scopeDamages[0].claimed_value)})
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Documentation Status</h3>
          <div className="space-y-4">
            {Object.values(LEGAL_SCOPES).map((scope) => {
              const scopeDamages = damagesByScope[scope.id] || [];
              const docs = scopeDamages.flatMap((d) => d.required_documents);
              const verifiedCount = docs.filter((d) => d.status === 'Verified').length;
              const totalDocs = docs.length;
              const verifiedPercentage = totalDocs
                ? ((verifiedCount / totalDocs) * 100).toFixed(1)
                : 0;

              return (
                <div key={scope.id} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium">{scope.id}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {verifiedCount} of {totalDocs} verified
                      </span>
                      <span>{verifiedPercentage}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2 w-full">
                      <div
                        className="bg-emerald-600 rounded-full h-2"
                        style={{ width: `${verifiedPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DamagesHub() {
  const [activeScope, setActiveScope] = useState<'overview' | keyof typeof LEGAL_SCOPES>(
    'overview'
  );

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

  // Group damages by legal scope
  const damagesByScope = damages.reduce((acc, damage) => {
    const applicableScopes = getApplicableScopes(damage);

    applicableScopes.forEach((scope) => {
      if (!acc[scope]) acc[scope] = [];
      acc[scope].push(damage);
    });

    return acc;
  }, {} as Record<string, DamageItem[]>);

  // Calculate totals by scope
  const scopeTotals = Object.entries(damagesByScope).reduce((acc, [scope, scopeDamages]) => {
    acc[scope] = scopeDamages.reduce((sum, damage) => sum + (damage.claimed_value || 0), 0);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <Tabs
        value={activeScope}
        onValueChange={(value) => setActiveScope(value as typeof activeScope)}
      >
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {Object.values(LEGAL_SCOPES).map((scope) => (
            <TabsTrigger key={scope.id} value={scope.id}>
              {scope.id}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            damages={damages}
            adverseActions={adverseActions}
            damagesByScope={damagesByScope}
            scopeTotals={scopeTotals}
          />
        </TabsContent>

        {Object.values(LEGAL_SCOPES).map((scope) => (
          <TabsContent key={scope.id} value={scope.id}>
            <LegalScopeSummary
              scope={scope}
              damages={damagesByScope[scope.id] || []}
              totalValue={scopeTotals[scope.id] || 0}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(damagesByScope[scope.id] || []).map((damage) => (
                <DamageCard
                  key={damage.id}
                  damage={damage}
                  legalScopes={getApplicableScopes(damage)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Helper function to determine applicable legal scopes for a damage
// This would need to be implemented based on your specific rules
function getApplicableScopes(damage: DamageItem): string[] {
  // This is a placeholder implementation
  // In reality, this would be based on the damage characteristics
  // and your specific legal framework
  switch (damage.category) {
    case 'PEC-PAY':
    case 'PEC-COST':
      return ['UCL', 'CCRAA', 'FCRA'];
    case 'PEC-FEE':
      return ['UCL', 'RFDCPA'];
    case 'PEC-OPP':
      return ['UCL', 'GF_FD'];
    default:
      return ['UCL'];
  }
}
