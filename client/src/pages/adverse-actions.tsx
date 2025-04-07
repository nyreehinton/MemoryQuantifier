import AdverseActionsTable from '@/components/dashboard/adverse-actions-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { AdverseAction } from '@/types';
import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  Calculator,
  CheckCircle,
  Clock,
  FilePlus,
  Filter,
  Search,
  TrendingDown,
  XCircle,
} from 'lucide-react';

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
      confirmed: (() => {
        const reductions = {
          amex: 94500, // $100,000 to $5,500
          bofa1: 3700, // $6,200 to $2,500 (First BoA card 4041)
          bofa2: 2500, // $2,500 to $0 (Second BoA card)
          chase: 5500, // $5,500 to $0
          apple: 1100, // $3,300 to $2,200
          citi: 2500, // $2,500 to $0
        };
        return Object.values(reductions).reduce((sum, val) => sum + val, 0);
      })(),
      breakdown: {
        amex: {
          original: 100000,
          current: 5500,
          reduction: 94500,
          date: '2024-01-18',
          name: 'AMEX',
          note: undefined,
        },
        bofa1: {
          original: 6200,
          current: 2500,
          reduction: 3700,
          date: '2024-01-18',
          name: 'BOFA 1',
          note: 'First BoA card (4041)',
        },
        bofa2: {
          original: 2500,
          current: 0,
          reduction: 2500,
          date: '2024-03-07',
          name: 'BOFA 2',
          note: 'Second BoA card (1775)',
        },
        chase: {
          original: 5500,
          current: 0,
          reduction: 5500,
          date: '2024-01-18',
          name: 'CHASE',
          note: undefined,
        },
        apple: {
          original: 3300,
          current: 2200,
          reduction: 1100,
          date: '2024-01-16',
          name: 'APPLE',
          note: undefined,
        },
        citi: {
          original: 2500,
          current: 0,
          reduction: 2500,
          date: '2024-02-05',
          name: 'CITI',
          note: undefined,
        },
      } as const,
      needsDocumentation: false,
      totalOriginalLimit: 120000, // Sum of all original limits
      totalCurrentLimit: 10200, // Sum of all current limits
    },
    denials: (() => {
      const autoCount = adverseActions?.filter((a) => a.action_type.includes('Auto'))?.length || 0;
      const otherCount =
        adverseActions?.filter(
          (a) => a.action_type.includes('Student') || a.action_type.includes('Personal')
        )?.length || 0;
      return autoCount + otherCount;
    })(),
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
  } as const;

  // Baseline credit profile from June 2023
  const baselineProfile = {
    date: 'June 11, 2023',
    fico: 673,
    rating: 'Good',
    totalCreditLimit: 43150,
    creditUsed: 24278,
    utilizationRate: 48,
    accountsOpen: 23,
    paymentHistory: 'Perfect',
    avgAccountAge: '4 yrs 8 mos',
    oldestAccount: '9 yrs 3 mos',
    collections: 0,
    accountsLate: 0,
  };

  // Current profile calculated from adverse actions
  const currentProfile = {
    totalCreditLimit: baselineProfile.totalCreditLimit - stats.creditLimitImpact.confirmed,
    utilizationImpact: Math.min(
      100,
      Number(
        (
          (baselineProfile.creditUsed /
            (baselineProfile.totalCreditLimit - stats.creditLimitImpact.confirmed)) *
          100
        ).toFixed(1)
      )
    ),
    denials: stats.denials,
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

      {/* Credit Profile Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Baseline Credit Profile</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">As of {baselineProfile.date}</span>
                <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                  {baselineProfile.rating}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">FICO Score 8</p>
                  <p className="text-lg font-semibold">{baselineProfile.fico}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Credit Utilization</p>
                  <p className="text-lg font-semibold">{baselineProfile.utilizationRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Credit Limit</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(baselineProfile.totalCreditLimit)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accounts</p>
                  <p className="text-lg font-semibold">{baselineProfile.accountsOpen} Open</p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Perfect Payment History</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">No Collections</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">{baselineProfile.avgAccountAge} Average History</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Impact Assessment</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Changes Since Baseline</span>
                <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-1 rounded">
                  Significant Impact
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Limit Reduction</p>
                  <p className="text-lg font-semibold text-destructive">
                    {formatCurrency(stats.creditLimitImpact.confirmed)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Utilization Rate</p>
                  <p className="text-lg font-semibold text-destructive">
                    {currentProfile.utilizationImpact}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Credit Limit</p>
                  <p className="text-lg font-semibold text-destructive">
                    {formatCurrency(currentProfile.totalCreditLimit)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Denials</p>
                  <p className="text-lg font-semibold text-destructive">{currentProfile.denials}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-destructive mr-2" />
                  <span className="text-sm">
                    {stats.creditLimitReductions} Credit Line Reductions
                  </span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-destructive mr-2" />
                  <span className="text-sm">{stats.autoFinancingDenials} Auto Loan Denials</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-destructive mr-2" />
                  <span className="text-sm">
                    {adverseActions?.filter(
                      (a) => a.action_type.includes('Student') || a.action_type.includes('Personal')
                    )?.length || 0}{' '}
                    Student/Personal Loan Denials
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Original Summary Cards */}
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
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-destructive">
                  {formatCurrency(stats.creditLimitImpact.confirmed)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total verified reduction across 6 accounts
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Breakdown by Account:</div>
                {Object.entries(stats.creditLimitImpact.breakdown).map(([card, data]) => (
                  <div key={card} className="grid grid-cols-3 text-xs gap-1">
                    <div className="font-medium">
                      {data.name}
                      {data.note && (
                        <span className="text-muted-foreground ml-1">({data.note})</span>
                      )}
                    </div>
                    <div className="text-right text-muted-foreground">
                      {formatCurrency(data.original)} →
                    </div>
                    <div className="text-right text-destructive">
                      {formatCurrency(data.current)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Original Total</div>
                    <div className="font-medium">
                      {formatCurrency(stats.creditLimitImpact.totalOriginalLimit)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Current Total</div>
                    <div className="font-medium text-destructive">
                      {formatCurrency(stats.creditLimitImpact.totalCurrentLimit)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
