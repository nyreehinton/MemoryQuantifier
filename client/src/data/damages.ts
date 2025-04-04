import { DamageItem } from "@/types";

// Sample data based on the requirements
export const damagesData: DamageItem[] = [
  {
    id: "PEC-PAY-01",
    title: "Essex Security Deposit Payment",
    category: "PEC-PAY",
    source_docs: [10],
    claimed_value: 2187,
    status: "Pending",
    required_documents: [
      {
        doc_id: "PEC-PAY-01-01",
        name: "Proof of Payment (Receipt, bank statement, cashed check)",
        details: "Evidence showing the required additional security deposit was actually paid",
        status: "Needed"
      }
    ],
    description: "Additional security deposit required due to credit issues",
    date: "2024-06-04"
  },
  {
    id: "PEC-OPP-01",
    title: "Harvard Education Loss",
    category: "PEC-OPP",
    source_docs: [15, 19, 36],
    claimed_value: 1140000,
    status: "Pending",
    required_documents: [
      {
        doc_id: "PEC-OPP-01-01",
        name: "Proof of Enrollment & Withdrawal",
        details: "Documentation showing acceptance to Harvard and subsequent withdrawal due to funding issues",
        status: "Needed"
      },
      {
        doc_id: "PEC-OPP-01-02",
        name: "Opportunity Insights 2024 Harvard Study",
        details: "Research showing lifetime earnings impact of Harvard education",
        status: "Needed"
      },
      {
        doc_id: "PEC-OPP-01-03",
        name: "Proof of Denied Funding",
        details: "Documentation showing student loan denials directly linked to credit issues",
        status: "Needed"
      }
    ],
    description: "Lost opportunity of Harvard education and associated lifetime earnings premium",
    date: "2024-03-15"
  },
  {
    id: "PEC-COST-01",
    title: "Golden1 Unfavorable Terms",
    category: "PEC-COST",
    source_docs: [26],
    claimed_value: null,
    status: "Pending",
    required_documents: [
      {
        doc_id: "PEC-COST-01-01",
        name: "Final Loan Agreement",
        details: "Golden1 Loan agreement showing unfavorable terms",
        status: "Needed"
      },
      {
        doc_id: "PEC-COST-01-02",
        name: "Proof of 'But-For' Terms",
        details: "Rate sheets or evidence of terms that would have been offered with correct credit information",
        status: "Needed"
      }
    ],
    description: "Increased interest rates and costs due to unfavorable loan terms",
    date: "2024-09-17"
  },
  {
    id: "PEC-FEE-01",
    title: "Ally Auto Application Fee",
    category: "PEC-FEE",
    source_docs: [5],
    claimed_value: 25,
    status: "Verified",
    required_documents: [
      {
        doc_id: "PEC-FEE-01-01",
        name: "Proof of Fee Payment",
        details: "Receipt or bank statement showing application fee payment",
        status: "Verified"
      },
      {
        doc_id: "PEC-FEE-01-02",
        name: "Application Terms",
        details: "Documentation showing fee was non-refundable upon denial",
        status: "Verified"
      }
    ],
    description: "Non-refundable application fee paid for denied auto financing",
    date: "2024-03-12"
  },
  {
    id: "NONPEC-ED-01",
    title: "Emotional Distress",
    category: "NONPEC-ED",
    source_docs: [1, 2, 5, 8, 10],
    claimed_value: null,
    status: "Potential",
    required_documents: [
      {
        doc_id: "NONPEC-ED-01-01",
        name: "Plaintiff's Detailed Testimony",
        details: "Sworn statement describing emotional impact of credit issues and denials",
        status: "Needed"
      },
      {
        doc_id: "NONPEC-ED-01-02",
        name: "Corroborating Witness Statements",
        details: "Statements from family/friends who observed emotional distress",
        status: "Needed"
      }
    ],
    description: "Emotional distress, anxiety, and humiliation from multiple credit denials and adverse actions"
  },
  {
    id: "NONPEC-REP-01",
    title: "Reputational Harm",
    category: "NONPEC-REP",
    source_docs: [1, 2, 5, 8, 10, 11],
    claimed_value: null,
    status: "Potential",
    required_documents: [
      {
        doc_id: "NONPEC-REP-01-01",
        name: "Documentation of Credit Score Drops",
        details: "Evidence showing significant credit score drops linked to the issues",
        status: "Received"
      },
      {
        doc_id: "NONPEC-REP-01-02",
        name: "Pattern of Denials Documentation",
        details: "Complete collection of all adverse actions showing pattern of negative perception",
        status: "Received"
      }
    ],
    description: "Damage to credit reputation and perceived creditworthiness"
  }
];
