import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AdverseAction, CreditReport, DamageItem, ReportStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function AdverseActionsTable({ limit }: { limit?: number }) {
  const [selectedAction, setSelectedAction] = useState<AdverseAction | null>(null);

  const { data: adverseActions, isLoading: isLoadingActions } = useQuery<AdverseAction[]>({
    queryKey: ['/api/adverse-actions'],
  });

  const { data: creditReports } = useQuery<CreditReport[]>({
    queryKey: ['/api/credit-reports'],
  });

  const { data: damages } = useQuery<DamageItem[]>({
    queryKey: ['/api/damages'],
  });

  // Get credit reports linked to selected action
  const linkedReports = creditReports?.filter(report => 
    report.linked_docs.includes(selectedAction?.document_index || 0)
  ) || [];

  // Get damage claims linked to selected action
  const linkedDamages = damages?.filter(damage => 
    damage.source_docs.includes(selectedAction?.document_index || 0)
  ) || [];

  const columns = [
    {
      header: "Doc #",
      accessorKey: "document_index",
      cell: (row: AdverseAction) => <span className="font-medium">{row.document_index}</span>
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (row: AdverseAction) => formatDate(row.date)
    },
    {
      header: "Source",
      accessorKey: "sender_name"
    },
    {
      header: "Action Type",
      accessorKey: "action_type"
    },
    {
      header: "CRA Used",
      accessorKey: "credit_report_agency",
      cell: (row: AdverseAction) => row.credit_report_agency || "N/A"
    },
    {
      header: "Score",
      accessorKey: "credit_score",
      cell: (row: AdverseAction) => row.credit_score || "N/A"
    },
    {
      header: "Details",
      accessorKey: (row: AdverseAction) => (
        <Button 
          variant="link" 
          className="px-0 text-primary" 
          onClick={() => {}}
        >
          View
        </Button>
      )
    }
  ];

  const filterOptions = [
    {
      column: "action_type" as keyof AdverseAction,
      options: [
        { label: "Credit Limit Reduction", value: "Credit Limit Reduction" },
        { label: "Auto Financing Denial", value: "Auto Financing Application Denial" },
        { label: "Auto Loan Denial", value: "Auto Loan Denial" },
        { label: "Rental Application", value: "Rental Application Conditional Approval" },
        { label: "Loan Denial", value: "Loan Denial" }
      ]
    },
    {
      column: "credit_report_agency" as keyof AdverseAction,
      options: [
        { label: "TransUnion", value: "TransUnion" },
        { label: "Experian", value: "Experian" },
        { label: "Equifax", value: "Equifax" },
        { label: "SageStream", value: "SageStream" },
      ]
    }
  ];

  const data = limit 
    ? (adverseActions || []).slice(0, limit)
    : (adverseActions || []);

  return (
    <div>
      <DataTable 
        data={data}
        columns={columns}
        searchColumn="sender_name"
        filterOptions={filterOptions}
        pagination={!limit}
        pageSize={10}
        onRowClick={setSelectedAction}
      />

      {/* Detail Dialog */}
      <Dialog open={!!selectedAction} onOpenChange={(open) => !open && setSelectedAction(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAction?.sender_name} - {selectedAction?.action_type} (Doc {selectedAction?.document_index})
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">DATE</h4>
              <p className="text-sm">{selectedAction && formatDate(selectedAction.date)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">ACTION TYPE</h4>
              <p className="text-sm">{selectedAction?.action_type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">ACCOUNT</h4>
              <p className="text-sm">
                {selectedAction?.details?.account_ending_in 
                  ? `Ending in ${selectedAction.details.account_ending_in}` 
                  : (selectedAction?.details?.application_number 
                    ? `App #${selectedAction.details.application_number}` 
                    : "N/A")}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                {selectedAction?.action_type.includes("Reduction") ? "NEW CREDIT LINE" : "CREDITOR DETAILS"}
              </h4>
              <p className="text-sm">
                {selectedAction?.details?.new_credit_line || selectedAction?.details?.new_total_credit_line 
                  ? `$${selectedAction.details.new_credit_line || selectedAction.details.new_total_credit_line}` 
                  : (selectedAction?.initiated_by || "N/A")}
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground">REASONS CITED</h4>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {selectedAction?.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground">CREDIT REPORT USED</h4>
            <p className="text-sm">
              {selectedAction?.credit_report_agency} 
              {selectedAction?.credit_report_agency_details 
                ? ` (${selectedAction.credit_report_agency_details})` 
                : ""}
            </p>
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
                      <div key={report.report_need_id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center mr-3 h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">CR</span>
                          <span className="text-sm">{report.report_need_id} ({report.cra} {report.date_range})</span>
                        </div>
                        <StatusBadge status={report.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No specific credit reports linked to this action.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="damages" className="mt-0">
              <div className="mb-4 bg-muted rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">LINKED DAMAGE CLAIMS</h4>
                {linkedDamages.length > 0 ? (
                  <div className="space-y-2">
                    {linkedDamages.map((damage) => (
                      <div key={damage.id} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center mr-3 h-6 w-6 rounded-full bg-green-100 text-green-800 text-xs font-medium">{damage.category.split('-')[0]}</span>
                          <div>
                            <span className="text-sm">{damage.title}</span>
                            <p className="text-xs text-muted-foreground">{damage.category}: {damage.claimed_value ? `$${damage.claimed_value}` : "TBD"}</p>
                          </div>
                        </div>
                        <StatusBadge status={damage.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No specific quantifiable damages linked to this action.</p>
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
            <Button>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
