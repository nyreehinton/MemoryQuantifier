import { Task } from "@/types";

// Sample data based on the requirements
export const tasksData: Task[] = [
  {
    id: "task-1",
    title: "Request SageStream reports",
    description: "For CR-NEED-04, CR-NEED-07, CR-NEED-10, CR-NEED-23",
    priority: "High",
    status: "To Do",
    due_date: "2024-06-15",
    related_item: "CR-NEED-04",
    date_created: "2024-06-01"
  },
  {
    id: "task-2",
    title: "Send records request to Harvard",
    description: "For PEC-OPP-01 (Enrollment & Withdrawal Records)",
    priority: "High",
    status: "To Do",
    due_date: "2024-06-18",
    related_item: "PEC-OPP-01",
    date_created: "2024-06-01"
  },
  {
    id: "task-3",
    title: "Obtain proof of Essex deposit payment",
    description: "For PEC-PAY-01 (Security Deposit Receipt)",
    priority: "High",
    status: "To Do",
    due_date: "2024-06-16",
    related_item: "PEC-PAY-01",
    date_created: "2024-06-01"
  },
  {
    id: "task-4",
    title: "Request baseline credit reports",
    description: "Need BASELINE-01/02/03 (Pre-Capital One credit reports)",
    priority: "High",
    status: "To Do",
    due_date: "2024-06-20",
    related_item: "BASELINE-01",
    date_created: "2024-06-02"
  },
  {
    id: "task-5",
    title: "Obtain Golden1 loan agreement",
    description: "Required for determining unfavorable terms in Doc 26",
    priority: "High",
    status: "To Do",
    due_date: "2024-06-25",
    related_item: "PEC-COST-01",
    date_created: "2024-06-02"
  },
  {
    id: "task-6",
    title: "Awaiting Essex deposit receipt",
    description: "Client contacted 6/2/24 - Following up",
    priority: "Medium",
    status: "In Progress",
    due_date: "2024-06-16",
    related_item: "PEC-PAY-01",
    date_created: "2024-06-02"
  },
  {
    id: "task-7",
    title: "Annual credit reports request",
    description: "Requested 6/1/24 from annualcreditreport.com",
    priority: "Medium",
    status: "In Progress",
    due_date: "2024-06-22",
    date_created: "2024-06-01"
  },
  {
    id: "task-8",
    title: "Follow-up with TransUnion for FCRA violations",
    description: "Need to document potential FCRA violations related to dispute process",
    priority: "Medium",
    status: "In Progress",
    due_date: "2024-06-28",
    date_created: "2024-06-03"
  },
  {
    id: "task-9",
    title: "Analyze current Experian report",
    description: "Compare with historical reports to identify ongoing issues",
    priority: "Medium",
    status: "In Progress",
    due_date: "2024-06-15",
    related_item: "CURRENT-01",
    date_created: "2024-06-01"
  },
  {
    id: "task-10",
    title: "Prepare client affidavit",
    description: "Document emotional distress for non-pecuniary damages claim",
    priority: "Low",
    status: "In Progress",
    due_date: "2024-07-01",
    related_item: "NONPEC-ED-01",
    date_created: "2024-06-05"
  },
  {
    id: "task-11",
    title: "Obtain current Experian report",
    description: "May 7, 2024 report received",
    priority: "High",
    status: "Complete",
    due_date: "2024-05-15",
    date_created: "2024-05-01",
    date_completed: "2024-05-08"
  },
  {
    id: "task-12",
    title: "Obtain current TransUnion report",
    description: "June 4, 2024 report received",
    priority: "High",
    status: "Complete",
    due_date: "2024-06-07",
    date_created: "2024-06-01",
    date_completed: "2024-06-05"
  }
];

// Sample activities for the activity feed
export const activitiesData = [
  {
    id: "activity-1",
    type: "Added",
    description: "TransUnion Report (June 4, 2024)",
    details: "Report satisfies CR-NEED-25 (marked as Satisfied)",
    timestamp: "2024-06-07T14:34:00",
    related_item: "CR-NEED-25"
  },
  {
    id: "activity-2",
    type: "Added",
    description: "New Adverse Action (Doc 38)",
    details: "US Bank denial dated Jun 3, 2024 added to system",
    timestamp: "2024-06-05T10:21:00"
  },
  {
    id: "activity-3",
    type: "Created",
    description: "Document Request for Harvard Records",
    details: "Requesting PEC-OPP-01 documents from client",
    timestamp: "2024-06-03T09:45:00",
    related_item: "PEC-OPP-01"
  },
  {
    id: "activity-4",
    type: "Updated",
    description: "Essex Property Trust (Doc 10)",
    details: "Added $2,187 additional security deposit requirement",
    timestamp: "2024-06-01T15:12:00",
    related_item: "Doc 10"
  }
];
