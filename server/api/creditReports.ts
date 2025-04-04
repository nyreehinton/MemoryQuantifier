import { CreditReport } from "../../shared/schema";

// Credit report data based on quantifications-requirements-framework-memory-file.txt
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
    report_need_id: "CR-NEED-03",
    cra: "Experian",
    date_range: "Jan 2024",
    reason_needed: "Basis for adverse action by creditor (Chase Doc 3).",
    linked_docs: [3],
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
    report_need_id: "CR-NEED-05",
    cra: "Experian",
    date_range: "Feb 2024",
    reason_needed: "Basis for adverse action by creditor (Ally Doc 5).",
    linked_docs: [5],
    status: "Requested",
    date_requested: "2024-06-01"
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
    report_need_id: "CR-NEED-12",
    cra: "TransUnion",
    date_range: "June 2024",
    reason_needed: "Basis for adverse action by creditor (Essex Doc 10) - Complete version.",
    linked_docs: [10],
    status: "Satisfied",
    date_requested: "2024-06-02",
    date_received: "2024-06-05"
  },
  {
    report_need_id: "CR-NEED-15",
    cra: "TransUnion",
    date_range: "March 2024",
    reason_needed: "Basis for adverse action by creditor (Sallie Mae Doc 15).",
    linked_docs: [15],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-19",
    cra: "Experian",
    date_range: "March/April 2024",
    reason_needed: "Basis for adverse action by creditor (Discover Doc 19).",
    linked_docs: [19],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-26",
    cra: "TransUnion",
    date_range: "September 2024",
    reason_needed: "Basis for unfavorable terms by creditor (Golden1 Doc 26).",
    linked_docs: [26],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-27",
    cra: "Experian",
    date_range: "September 2024",
    reason_needed: "Basis for unfavorable terms by creditor (Golden1 Doc 26).",
    linked_docs: [26],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-36",
    cra: "TransUnion",
    date_range: "July 2024",
    reason_needed: "Basis for adverse action by creditor (SoFi Doc 36).",
    linked_docs: [36],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-37",
    cra: "Experian",
    date_range: "July 2024",
    reason_needed: "Basis for adverse action by creditor (SoFi Doc 36).",
    linked_docs: [36],
    status: "Outstanding"
  },
  {
    report_need_id: "CR-NEED-38",
    cra: "SageStream",
    date_range: "July 2024",
    reason_needed: "Basis for adverse action by creditor (SoFi Doc 36).",
    linked_docs: [36],
    status: "Outstanding"
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
    report_need_id: "BASELINE-02",
    cra: "TransUnion",
    date_range: "June/July 2023",
    reason_needed: "Establish baseline creditworthiness before alleged inaccurate reporting began.",
    linked_docs: [],
    status: "Outstanding"
  },
  {
    report_need_id: "BASELINE-03",
    cra: "Equifax",
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
    report_need_id: "CURRENT-02",
    cra: "TransUnion",
    date_range: "Most Recent",
    reason_needed: "Show current status of reporting and whether errors persist.",
    linked_docs: [],
    status: "Satisfied",
    date_requested: "2024-06-01",
    date_received: "2024-06-05"
  },
  {
    report_need_id: "CURRENT-03",
    cra: "Equifax",
    date_range: "Most Recent",
    reason_needed: "Show current status of reporting and whether errors persist.",
    linked_docs: [],
    status: "Outstanding"
  }
];
