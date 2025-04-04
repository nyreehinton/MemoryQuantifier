import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { CreditReport, ReportStatus, AdverseAction } from "@/types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function CreditReportsTable({ limit }: { limit?: number }) {
  const [selectedReport, setSelectedReport] = useState<CreditReport | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | "">("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { data: creditReports, isLoading: isLoadingReports } = useQuery<CreditReport[]>({
    queryKey: ['/api/credit-reports'],
  });

  const { data: adverseActions } = useQuery<AdverseAction[]>({
    queryKey: ['/api/adverse-actions'],
  });

  const columns = [
    {
      header: "ID",
      accessorKey: "report_need_id",
      cell: (row: CreditReport) => <span className="font-medium">{row.report_need_id}</span>,
    },
    {
      header: "Agency",
      accessorKey: "cra",
    },
    {
      header: "Date Range",
      accessorKey: "date_range",
    },
    {
      header: "Reason Needed",
      accessorKey: "reason_needed",
      cell: (row: CreditReport) => (
        <span className="truncate block max-w-xs">{row.reason_needed}</span>
      ),
    },
    {
      header: "Linked Docs",
      accessorKey: (row: CreditReport) => (
        <div className="flex flex-wrap gap-1">
          {row.linked_docs.map((docId) => (
            <Badge key={docId} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
              Doc {docId}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: CreditReport) => <StatusBadge status={row.status} />,
    },
    {
      header: "Action",
      accessorKey: (row: CreditReport) => (
        <Button variant="link" className="px-0 text-primary" onClick={() => {}}>
          Update
        </Button>
      ),
    },
  ];

  const filterOptions = [
    {
      column: "cra" as keyof CreditReport,
      options: [
        { label: "TransUnion", value: "TransUnion" },
        { label: "Experian", value: "Experian" },
        { label: "Equifax", value: "Equifax" },
        { label: "SageStream", value: "SageStream" },
      ],
    },
    {
      column: "status" as keyof CreditReport,
      options: [
        { label: "Outstanding", value: "Outstanding" },
        { label: "Requested", value: "Requested" },
        { label: "Partially Satisfied", value: "Partially Satisfied" },
        { label: "Satisfied", value: "Satisfied" },
      ],
    },
  ];

  const data = limit
    ? (creditReports || []).slice(0, limit)
    : (creditReports || []);

  // Find linked adverse actions for the selected report
  const linkedActions = adverseActions?.filter((action) =>
    selectedReport?.linked_docs.includes(action.document_index)
  ) || [];

  const handleUpdateStatus = () => {
    if (!selectedReport || !selectedStatus) return;
    
    // In a real application, this would make an API call to update the status
    console.log(`Updating report ${selectedReport.report_need_id} status to ${selectedStatus}`);
    console.log(`Date: ${selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'Not set'}`);
    
    setSelectedReport(null);
    setSelectedStatus("");
    setSelectedDate(undefined);
  };

  return (
    <div>
      <DataTable
        data={data}
        columns={columns}
        searchColumn="report_need_id"
        filterOptions={filterOptions}
        pagination={!limit}
        pageSize={10}
        onRowClick={setSelectedReport}
      />

      {/* Update Status Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Update Credit Report Status
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Report Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-medium">{selectedReport?.report_need_id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Agency:</span>{" "}
                  <span>{selectedReport?.cra}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date Range:</span>{" "}
                  <span>{selectedReport?.date_range}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Current Status:</span>{" "}
                  <StatusBadge status={selectedReport?.status || "Outstanding"} size="sm" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Linked to Adverse Actions</h4>
              {linkedActions.length > 0 ? (
                <div className="grid grid-cols-1 gap-1">
                  {linkedActions.map((action) => (
                    <div key={action.document_index} className="text-sm p-2 rounded bg-muted">
                      <div className="font-medium">Doc {action.document_index}: {action.sender_name}</div>
                      <div className="text-xs text-muted-foreground">{action.action_type} - {format(new Date(action.date), 'MMM d, yyyy')}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No linked actions found.</p>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Update Status</label>
                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as ReportStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Outstanding">Outstanding</SelectItem>
                    <SelectItem value="Requested">Requested</SelectItem>
                    <SelectItem value="Partially Satisfied">Partially Satisfied</SelectItem>
                    <SelectItem value="Satisfied">Satisfied</SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Update Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea 
                  placeholder="Add notes about this report status update..." 
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={!selectedStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
