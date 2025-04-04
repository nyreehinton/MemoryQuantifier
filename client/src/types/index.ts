// Adverse Action Types
export type CreditReportAgency = "Experian" | "TransUnion" | "Equifax" | "SageStream" | "LexisNexis" | "Multiple" | string;

export type ActionType = 
  | "Credit Limit Reduction" 
  | "Vehicle Financing Application Denial" 
  | "Auto Financing Application Denial" 
  | "Auto Loan Denial" 
  | "Rental Application Conditional Approval" 
  | "Credit Score Change Alert" 
  | "Loan Denial"
  | string;

export interface AdverseAction {
  document_index: number;
  document_source: string;
  sender_name: string;
  sender_address?: string;
  recipient_name: string;
  recipient_address?: string;
  recipient_email?: string;
  date: string;
  action_type: ActionType;
  initiated_by?: string;
  details?: any;
  reasons: string[];
  credit_report_agency: CreditReportAgency | null;
  credit_report_agency_details?: string | null;
  credit_score?: number | null;
  credit_score_date?: string | null;
  credit_score_range?: string | null;
  credit_score_factors?: string[] | null;
}

// Credit Reports Types
export type ReportStatus = "Outstanding" | "Requested" | "Partially Satisfied" | "Satisfied" | "N/A";

export interface CreditReport {
  report_need_id: string;
  cra: CreditReportAgency;
  date_range: string;
  reason_needed: string;
  linked_docs: number[];
  status: ReportStatus;
  date_requested?: string;
  date_received?: string;
  notes?: string;
}

// Damages Types
export type DamageCategory = 
  | "PEC-PAY"   // Required Payments
  | "PEC-COST"  // Increased Credit Costs
  | "PEC-FEE"   // Application Fees
  | "PEC-DEP"   // Lost Deposits
  | "PEC-OOP"   // Out-of-Pocket Expenses
  | "PEC-OPP"   // Lost Opportunities
  | "NONPEC-ED" // Emotional Distress
  | "NONPEC-REP"; // Reputational Harm

export type DocumentStatus = "Needed" | "Requested" | "Received" | "Verified" | "N/A";

export interface RequiredDocument {
  doc_id: string;
  name: string;
  details: string;
  status: DocumentStatus;
  date_updated?: string;
}

export interface DamageItem {
  id: string;
  title: string;
  category: DamageCategory;
  source_docs: number[];
  claimed_value: number | null;
  status: "Verified" | "Pending" | "Potential";
  required_documents: RequiredDocument[];
  description: string;
  date?: string;
}

// Task Types
export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Complete";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string;
  related_item?: string;
  date_created: string;
  date_completed?: string;
}

// Activity Types
export type ActivityType = "Added" | "Updated" | "Created" | "Completed" | "Requested";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  details: string;
  timestamp: string;
  related_item?: string;
}
