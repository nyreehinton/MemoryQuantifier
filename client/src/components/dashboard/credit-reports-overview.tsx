import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import { useCreditReports } from '@/contexts/CreditReportsContext';
import { Calendar, CheckCircle2, Clock, FileText } from 'lucide-react';

// Group credit report needs by agency
function groupNeedsByAgency(needs: Record<string, any>) {
  return Object.values(needs).reduce((acc, need) => {
    const agency = need.agency;
    if (!acc[agency]) {
      acc[agency] = [];
    }
    acc[agency].push(need);
    return acc;
  }, {} as Record<string, any[]>);
}

function CreditReportNeedCard({ need }: { need: any }) {
  const { getContextReports } = useCreditReports();
  const contextReports = getContextReports(need.id);

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              {need.id}
              <StatusBadge
                status={need.status.includes('Outstanding') ? 'Pending' : 'Verified'}
                size="sm"
              />
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{need.reasonNeeded}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {need.dateRange}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Date Range: {need.dateRange}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>
              Documents:{' '}
              {Array.isArray(need.documentIndices)
                ? need.documentIndices.map(String).join(', ')
                : need.documentIndices}
            </span>
          </div>
          {contextReports.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span>Context from: {contextReports.join(', ')}</span>
            </div>
          )}
        </div>

        {need.status.includes('Outstanding') && need.status.includes('Context provided by') && (
          <div className="mt-2 text-sm bg-muted/50 p-2 rounded">
            <span className="font-medium">Note:</span> {need.status}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function CreditReportsOverview() {
  const { creditReportNeeds } = useCreditReports();
  const needsByAgency = groupNeedsByAgency(creditReportNeeds);

  // Calculate statistics
  const totalNeeds = Object.keys(creditReportNeeds).length;
  const satisfiedNeeds = Object.values(creditReportNeeds).filter(
    (need) => !need.status.includes('Outstanding')
  ).length;
  const satisfiedPercentage = Math.round((satisfiedNeeds / totalNeeds) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Total Needs</h3>
              <span className="text-2xl font-bold">{totalNeeds}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Satisfied</h3>
              <span className="text-2xl font-bold">{satisfiedNeeds}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Progress</h3>
              <span className="text-2xl font-bold">{satisfiedPercentage}%</span>
            </div>
            <div className="mt-2">
              <div className="bg-muted rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2"
                  style={{ width: `${satisfiedPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(needsByAgency).map(([agency, needs]) => (
          <div key={agency}>
            <h3 className="text-lg font-semibold mb-4">{agency}</h3>
            {needs.map((need) => (
              <CreditReportNeedCard key={need.id} need={need} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
