import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency, formatDate } from '@/lib/utils';
import { AdverseAction, CreditReport, DamageItem } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Car, CreditCard, FileText, Home } from 'lucide-react';
import { useState } from 'react';

type BadgeVariant = 'default' | 'destructive' | 'outline' | 'secondary';

export default function AdverseActionsTable({ limit }: { limit?: number }) {
  const [selectedAction, setSelectedAction] = useState<AdverseAction | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = limit || 20; // Default to 20 items per page if no limit specified

  const {
    data: adverseActions,
    isLoading: isLoadingActions,
    error: actionsError,
  } = useQuery<AdverseAction[]>({
    queryKey: ['/api/adverse-actions'],
  });

  const { data: creditReports } = useQuery<CreditReport[]>({
    queryKey: ['/api/credit-reports'],
  });

  const { data: damages } = useQuery<DamageItem[]>({
    queryKey: ['/api/damages'],
  });

  // Get credit reports linked to selected action
  const linkedReports =
    creditReports?.filter((report) =>
      report.linked_docs.includes(selectedAction?.document_index || 0)
    ) || [];

  // Get damage claims linked to selected action
  const linkedDamages =
    damages?.filter((damage) => damage.source_docs.includes(selectedAction?.document_index || 0)) ||
    [];

  const getActionIcon = (type: string) => {
    if (type.includes('Credit Limit')) return <CreditCard className="h-4 w-4" />;
    if (type.includes('Auto')) return <Car className="h-4 w-4" />;
    if (type.includes('Rental')) return <Home className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getScoreBadgeColor = (score: number | null): BadgeVariant => {
    if (!score) return 'secondary';
    if (score >= 700) return 'default';
    if (score >= 600) return 'secondary';
    return 'destructive';
  };

  const columns = [
    {
      header: 'Doc #',
      accessorKey: 'document_index' as keyof AdverseAction,
      cell: (row: AdverseAction) => (
        <div className="flex items-center">
          {getActionIcon(row.action_type)}
          <span className="ml-2 font-medium">{row.document_index}</span>
        </div>
      ),
    },
    {
      header: 'Date',
      accessorKey: 'date' as keyof AdverseAction,
      cell: (row: AdverseAction) => formatDate(row.date),
      sortable: true,
    },
    {
      header: 'Source',
      accessorKey: 'sender_name' as keyof AdverseAction,
      cell: (row: AdverseAction) => (
        <div>
          <p className="font-medium">{row.sender_name}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            {row.sender_address}
          </p>
        </div>
      ),
    },
    {
      header: 'Action Type',
      accessorKey: 'action_type' as keyof AdverseAction,
      cell: (row: AdverseAction) => (
        <div>
          <p>{row.action_type}</p>
          {row.details && (
            <p className="text-xs text-muted-foreground">
              {row.details.account_ending_in &&
                `Account ending in ${row.details.account_ending_in}`}
              {row.details.new_credit_line &&
                ` - New limit: ${formatCurrency(row.details.new_credit_line)}`}
              {row.details.application_number && `App #${row.details.application_number}`}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Credit Report',
      accessorKey: 'credit_report_agency' as keyof AdverseAction,
      cell: (row: AdverseAction) => (
        <div>
          <p>{row.credit_report_agency || 'N/A'}</p>
          {row.credit_score && (
            <Badge variant={getScoreBadgeColor(row.credit_score)}>Score: {row.credit_score}</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Impact',
      accessorKey: 'reasons' as keyof AdverseAction,
      cell: (row: AdverseAction) => (
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="whitespace-nowrap">
            {row.reasons?.length || 0} reasons
          </Badge>
          {linkedDamages.some((d) => d.source_docs.includes(row.document_index)) && (
            <Badge variant="destructive" className="whitespace-nowrap">
              Has Claims
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: '',
      id: 'actions',
      accessorKey: 'document_index' as keyof AdverseAction,
      cell: (row: AdverseAction) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedAction(row)}>
          View Details
        </Button>
      ),
    },
  ];

  const filterOptions = [
    {
      column: 'action_type' as keyof AdverseAction,
      options: [
        { label: 'Credit Limit Changes', value: 'Credit Limit' },
        { label: 'Auto Financing', value: 'Auto' },
        { label: 'Rental Applications', value: 'Rental' },
        { label: 'Loan Applications', value: 'Loan' },
      ],
    },
    {
      column: 'credit_report_agency' as keyof AdverseAction,
      options: [
        { label: 'TransUnion', value: 'TransUnion' },
        { label: 'Experian', value: 'Experian' },
        { label: 'Equifax', value: 'Equifax' },
        { label: 'SageStream', value: 'SageStream' },
      ],
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil((adverseActions?.length || 0) / pageSize);
  const paginatedData = adverseActions
    ? adverseActions.slice((page - 1) * pageSize, page * pageSize)
    : [];

  if (isLoadingActions) {
    return <div className="text-center py-4">Loading adverse actions...</div>;
  }

  if (actionsError) {
    return (
      <div className="flex items-center justify-center py-4 text-destructive">
        <AlertCircle className="h-4 w-4 mr-2" />
        Error loading adverse actions
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {adverseActions?.length || 0} actions
          </div>
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        searchColumn="sender_name"
        filterOptions={filterOptions}
        pagination={false} // We're handling pagination manually
        onRowClick={setSelectedAction}
      />

      {/* Detail Dialog */}
      <Dialog open={!!selectedAction} onOpenChange={(open) => !open && setSelectedAction(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {getActionIcon(selectedAction?.action_type || '')}
              <span>
                {selectedAction?.sender_name} - {selectedAction?.action_type} (Doc{' '}
                {selectedAction?.document_index})
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">DATE</h4>
              <p className="text-sm">{selectedAction && formatDate(selectedAction.date)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">SENDER ADDRESS</h4>
              <p className="text-sm">{selectedAction?.sender_address || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">RECIPIENT</h4>
              <p className="text-sm">{selectedAction?.recipient_name}</p>
              <p className="text-xs text-muted-foreground">{selectedAction?.recipient_address}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">ACCOUNT DETAILS</h4>
              <p className="text-sm">
                {selectedAction?.details?.account_ending_in &&
                  `Account ending in ${selectedAction.details.account_ending_in}`}
                {selectedAction?.details?.new_credit_line &&
                  ` - New limit: ${formatCurrency(selectedAction.details.new_credit_line)}`}
                {selectedAction?.details?.application_number &&
                  `Application #${selectedAction.details.application_number}`}
                {!selectedAction?.details && 'N/A'}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">REASONS CITED</h4>
            <div className="bg-muted rounded-lg p-4">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {selectedAction?.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              CREDIT REPORT INFORMATION
            </h4>
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Agency Used:</p>
                  <p className="text-sm">{selectedAction?.credit_report_agency || 'N/A'}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedAction?.credit_report_agency_details}
                  </p>
                </div>
                {selectedAction?.credit_score && (
                  <div>
                    <p className="text-sm font-medium">Credit Score:</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={getScoreBadgeColor(selectedAction.credit_score)}>
                        {selectedAction.credit_score}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Range: {selectedAction.credit_score_range || 'N/A'}
                      </span>
                    </div>
                    {selectedAction.credit_score_factors && (
                      <div className="mt-2">
                        <p className="text-xs font-medium">Score Factors:</p>
                        <ul className="list-disc pl-4 mt-1 text-xs text-muted-foreground">
                          {selectedAction.credit_score_factors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Tabs defaultValue="reports">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="reports">Linked Credit Reports</TabsTrigger>
              <TabsTrigger value="damages">Linked Damage Claims</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="mt-0">
              <div className="mb-4 bg-muted rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">LINKED REQUIRED CREDIT REPORTS</h4>
                {linkedReports.length > 0 ? (
                  <div className="space-y-2">
                    {linkedReports.map((report) => (
                      <div
                        key={report.report_need_id}
                        className="flex items-center justify-between border-b border-border py-2 last:border-0"
                      >
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center mr-3 h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                            CR
                          </span>
                          <span className="text-sm">
                            {report.report_need_id} ({report.cra} {report.date_range})
                          </span>
                        </div>
                        <StatusBadge status={report.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No specific credit reports linked to this action.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="damages" className="mt-0">
              <div className="mb-4 bg-muted rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">LINKED DAMAGE CLAIMS</h4>
                {linkedDamages.length > 0 ? (
                  <div className="space-y-2">
                    {linkedDamages.map((damage) => (
                      <div
                        key={damage.id}
                        className="flex items-center justify-between border-b border-border py-2 last:border-0"
                      >
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center mr-3 h-6 w-6 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                            {damage.category.split('-')[0]}
                          </span>
                          <div>
                            <span className="text-sm">{damage.title}</span>
                            <p className="text-xs text-muted-foreground">
                              {damage.category}:{' '}
                              {damage.claimed_value ? formatCurrency(damage.claimed_value) : 'TBD'}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={damage.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No specific quantifiable damages linked to this action.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">NOTES</h4>
            <Textarea
              className="mt-1"
              rows={2}
              placeholder="Add notes about this adverse action..."
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAction(null)}>
              Close
            </Button>
            <Button>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
