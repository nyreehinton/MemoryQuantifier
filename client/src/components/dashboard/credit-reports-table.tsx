import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CreditReport } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface CreditReportStatus {
  id: string;
  agency: string;
  dateRange: string;
  reasonNeeded: string;
  status: string;
  documentIndices: (number | string)[];
  hasReport: boolean;
  reportDates?: string[];
}

// This data reflects what we actually have in the documents/credit-reports directory
const creditReportData: CreditReportStatus[] = [
  {
    id: 'BASELINE-01',
    agency: 'Experian',
    dateRange: 'June/July 2023',
    reasonNeeded: 'Establish baseline creditworthiness before alleged inaccurate reporting began.',
    status: 'Verified',
    documentIndices: ['Context'],
    hasReport: true,
    reportDates: ['June 11, 2023', 'June 28, 2023', 'July 6, 2023'],
  },
  {
    id: 'CR-NEED-02',
    agency: 'Experian',
    dateRange: 'January 2024',
    reasonNeeded:
      'Basis for adverse action by creditor (Chase Cards Doc 3/4, Chase Auto Doc 8, Earnest Doc 21, AmEx Doc 25, OneMain Doc 33).',
    status: 'Verified',
    documentIndices: [3, 4, 8, 21, 25, 33],
    hasReport: true,
    reportDates: ['Jan 2, 2024', 'Jan 8, 2024'],
  },
  {
    id: 'CR-NEED-06',
    agency: 'Experian',
    dateRange: 'February 2024',
    reasonNeeded:
      'Basis for adverse action by creditor (Ally Doc 6, Exeter Doc 22, Global Doc 24, Chase Auto Doc 34, Westlake Doc 37, OneMain Doc 27).',
    status: 'Verified',
    documentIndices: [6, 22, 24, 34, 37, 27],
    hasReport: true,
    reportDates: ['Feb 12, 2024'],
  },
];

export default function CreditReportsTable() {
  const { data: creditReports, isLoading } = useQuery<CreditReport[]>({
    queryKey: ['/api/credit-reports'],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead className="w-[400px]">Reason Needed</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Linked Docs</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creditReports?.map((report) => (
            <TableRow key={report.report_need_id}>
              <TableCell className="font-medium">{report.report_need_id}</TableCell>
              <TableCell>{report.cra}</TableCell>
              <TableCell>{report.date_range}</TableCell>
              <TableCell className="max-w-[400px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="truncate cursor-help">{report.reason_needed}</div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[600px] p-4">
                      <p className="text-sm">{report.reason_needed}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <StatusBadge status={report.status} size="sm" />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {report.linked_docs.map((docId) => (
                    <Badge
                      key={docId}
                      variant="outline"
                      className="bg-blue-50 text-blue-800 border-blue-200"
                    >
                      {docId === -1 ? 'ALL' : `Doc ${docId}`}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-sm text-muted-foreground truncate cursor-help max-w-[200px]">
                        {report.notes ||
                          (report.date_received
                            ? `Received ${report.date_received}`
                            : report.date_requested
                            ? `Requested ${report.date_requested}`
                            : 'No notes')}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[400px] p-4">
                      <p className="text-sm">
                        {report.notes ||
                          (report.date_received
                            ? `Received ${report.date_received}`
                            : report.date_requested
                            ? `Requested ${report.date_requested}`
                            : 'No notes')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
