import AdverseActionsTable from '@/components/dashboard/adverse-actions-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { AdverseAction } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Calculator, FilePlus, Filter, Search, TrendingDown } from 'lucide-react';

export default function AdverseActions() {
  const { data: adverseActions, isLoading } = useQuery<AdverseAction[]>({
    queryKey: ['/api/adverse-actions'],
  });

  // Calculate summary statistics
  const stats = {
    totalActions: adverseActions?.length || 0,
    creditLimitReductions:
      adverseActions?.filter((a) => a.action_type.includes('Credit Limit'))?.length || 0,
    autoFinancingDenials:
      adverseActions?.filter((a) => a.action_type.includes('Auto'))?.length || 0,
    avgCreditScore: (() => {
      const validScores =
        adverseActions?.filter((a) => a.credit_score !== null && a.credit_score !== undefined) ||
        [];
      if (validScores.length === 0) return 0;
      const sum = validScores.reduce((acc, action) => acc + (action.credit_score || 0), 0);
      return Math.round(sum / validScores.length);
    })(),
    creditLimitImpact: {
      confirmed:
        adverseActions?.reduce((sum, action) => {
          if (!action.action_type.includes('Credit Limit')) return sum;
          const newLimit =
            action.details?.new_credit_line ||
            action.details?.new_total_credit_line ||
            action.details?.new_credit_limit ||
            0;
          const oldLimit =
            action.details?.old_credit_line ||
            action.details?.old_total_credit_line ||
            action.details?.old_credit_limit;
          if (oldLimit && newLimit) {
            return sum + (oldLimit - newLimit);
          }
          return sum;
        }, 0) || 0,
      needsDocumentation: true,
    },
    documentationNeeds: {
      creditReports: {
        code: 'PREQ-01',
        count:
          adverseActions?.filter((a) =>
            a.applicable_pecuniary_damages?.some((d) => d.evidence_needed_ref.includes('PREQ-01'))
          ).length || 0,
      },
      proofOfPayments: {
        code: 'PEC-PAY-01',
        count:
          adverseActions?.filter((a) =>
            a.applicable_pecuniary_damages?.some((d) =>
              d.evidence_needed_ref.includes('PEC-PAY-01')
            )
          ).length || 0,
      },
      loanTerms: {
        code: 'PEC-COST-01',
        count:
          adverseActions?.filter((a) =>
            a.applicable_pecuniary_damages?.some((d) =>
              d.evidence_needed_ref.includes('PEC-COST-01')
            )
          ).length || 0,
      },
      applicationFees: {
        code: 'PEC-FEE-01',
        count:
          adverseActions?.filter((a) =>
            a.applicable_pecuniary_damages?.some((d) =>
              d.evidence_needed_ref.includes('PEC-FEE-01')
            )
          ).length || 0,
      },
    },
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Adverse Actions Center</h2>
          <p className="text-sm text-muted-foreground">
            Tracking {stats.totalActions} adverse actions and their impact
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Impact
          </Button>
          <Button size="sm">
            <FilePlus className="h-4 w-4 mr-2" />
            Add Action
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.creditLimitReductions} credit limit changes • {stats.autoFinancingDenials} auto
              denials
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Limit Impact</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(stats.creditLimitImpact.confirmed)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.creditLimitImpact.needsDocumentation
                ? 'Additional documentation needed (PEC-COST)'
                : 'Confirmed reduction'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score Range</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCreditScore}</div>
            <p className="text-xs text-muted-foreground">
              Average across {adverseActions?.filter((a) => a.credit_score)?.length || 0} reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentation Needs</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(stats.documentationNeeds).reduce((sum, item) => sum + item.count, 0)}
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              {Object.entries(stats.documentationNeeds).map(([key, value]) => (
                <p key={key}>
                  • {key} ({value.code}): {value.count}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AdverseActionsTable />
    </section>
  );
}
