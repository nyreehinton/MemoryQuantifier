import { CreditReport } from "@/types";

// Sample data based on the requirements
export const creditReportsData: CreditReport[] = [
  {
    report_need_id: "CR-NEED-01",
    cra: "TransUnion",
    date_range: "Feb/Mar 2024",
    reason_needed: "Basis for adverse action by creditor (BoA Doc 1).",
    linked_docs: [1],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-04",
    cra: "SageStream",
    date_range: "Feb 2024",
    reason_needed: "Basis for adverse action by creditor (Ally Doc 5).",
    linked_docs: [5],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-11",
    cra: "TransUnion",
    date_range: "June 2024",
    reason_needed: "Basis for adverse action by creditor (Essex Doc 10).",
    linked_docs: [10],
    status: "Partially Satisfied",
    date_requested: "2024-06-02",
    date_received: "2024-06-05",
    notes: "Received report but missing some information"
  },
  {
    report_need_id: "BASELINE-01",
    cra: "Experian",
    date_range: "June/July 2023",
    reason_needed: "Establish baseline creditworthiness before alleged inaccurate reporting began.",
    linked_docs: [],
    status: "Outstanding"
  },
  {
    report_need_id: "CURRENT-01",
    cra: "Experian",
    date_range: "Most Recent",
    reason_needed: "Show current status of reporting and whether errors persist.",
    linked_docs: [],
    status: "Satisfied",
    date_requested: "2024-05-01",
    date_received: "2024-05-07"
  },
  {
    report_need_id: "CR-NEED-08",
    cra: "Experian",
    date_range: "Jan 2024",
    reason_needed: "Basis for adverse action by creditor (Chase Doc 8).",
    linked_docs: [8],
    status: "Requested",
    date_requested: "2024-06-01"
  },
  {
    report_need_id: "CR-NEED-12",
    cra: "TransUnion",
    date_range: "June 2024",
    reason_needed: "Basis for adverse action by creditor (Essex Doc 10).",
    linked_docs: [10],
    status: "Satisfied",
    date_requested: "2024-06-02",
    date_received: "2024-06-05"
  }
];
