import { DamageItem } from '../../shared/schema';

// Damages data based on quantifications-requirements-framework-memory-file.txt
export const damagesData: DamageItem[] = [
  {
    id: 'PEC-PAY-01',
    title: 'Essex Security Deposit Payment',
    category: 'PEC-PAY',
    source_docs: [10],
    claimed_value: 2187,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-PAY-01-01',
        name: 'Proof of Payment (Receipt, bank statement, cashed check)',
        details: 'Evidence showing the required additional security deposit was actually paid',
        status: 'Needed',
      },
    ],
    description: 'Additional security deposit required due to credit issues',
    date: '2024-06-04',
  },
  {
    id: 'PEC-COST-01',
    title: 'Golden1 Unfavorable Terms',
    category: 'PEC-COST',
    source_docs: [26],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-01-01',
        name: 'Final Loan Agreement',
        details: 'Golden1 Loan agreement showing unfavorable terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-01-02',
        name: "Proof of 'But-For' Terms",
        details:
          'Rate sheets or evidence of terms that would have been offered with correct credit information',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-01-03',
        name: 'Amortization Schedule',
        details:
          "Calculation showing the total dollar difference in interest/fees between actual and 'but-for' terms",
        status: 'Needed',
      },
    ],
    description: 'Increased interest rates and costs due to unfavorable loan terms',
    date: '2024-09-17',
  },
  {
    id: 'PEC-COST-02',
    title: 'Bank of America Credit Limit Reduction (1775)',
    category: 'PEC-COST',
    source_docs: [1],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-02-01',
        name: 'Alternative Credit Evidence',
        details: 'Documentation of higher-cost credit used after limit reduction',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-02-02',
        name: 'Previous Credit Terms',
        details: 'Statement showing previous credit limit and terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-02-03',
        name: 'Cost Differential Analysis',
        details: 'Calculation of increased costs from using alternative credit sources',
        status: 'Needed',
      },
    ],
    description: 'Increased credit costs due to reduction of credit limit to $2,000',
    date: '2024-03-07',
  },
  {
    id: 'PEC-COST-03',
    title: 'Chase Credit Limit Reduction (0757)',
    category: 'PEC-COST',
    source_docs: [3],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-03-01',
        name: 'Alternative Credit Evidence',
        details: 'Documentation of higher-cost credit used after limit reduction',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-03-02',
        name: 'Previous Credit Terms',
        details: 'Statement showing previous credit limit and terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-03-03',
        name: 'Cost Differential Analysis',
        details: 'Calculation of increased costs from using alternative credit sources',
        status: 'Needed',
      },
    ],
    description: 'Increased credit costs due to reduction of credit limit to $4,600',
    date: '2024-01-18',
  },
  {
    id: 'PEC-COST-04',
    title: 'Chase Amazon Card Credit Limit Reduction (7293)',
    category: 'PEC-COST',
    source_docs: [4],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-04-01',
        name: 'Alternative Credit Evidence',
        details: 'Documentation of higher-cost credit used after limit reduction',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-04-02',
        name: 'Previous Credit Terms',
        details: 'Statement showing previous credit limit and terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-04-03',
        name: 'Cost Differential Analysis',
        details: 'Calculation of increased costs from using alternative credit sources',
        status: 'Needed',
      },
    ],
    description: 'Increased credit costs due to reduction of credit limit to $4,600',
    date: '2024-01-18',
  },
  {
    id: 'PEC-COST-05',
    title: 'Bank of America Credit Limit Reduction (4041)',
    category: 'PEC-COST',
    source_docs: [14],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-05-01',
        name: 'Alternative Credit Evidence',
        details: 'Documentation of higher-cost credit used after limit reduction',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-05-02',
        name: 'Previous Credit Terms',
        details: 'Statement showing previous credit limit and terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-05-03',
        name: 'Cost Differential Analysis',
        details: 'Calculation of increased costs from using alternative credit sources',
        status: 'Needed',
      },
    ],
    description: 'Increased credit costs due to reduction of credit limit to $1,900',
    date: '2024-01-03',
  },
  {
    id: 'PEC-COST-06',
    title: 'Apple Card Credit Limit Reduction',
    category: 'PEC-COST',
    source_docs: [16],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-06-01',
        name: 'Alternative Credit Evidence',
        details: 'Documentation of higher-cost credit used after limit reduction',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-06-02',
        name: 'Previous Credit Terms',
        details: 'Statement showing previous credit limit and terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-06-03',
        name: 'Cost Differential Analysis',
        details: 'Calculation of increased costs from using alternative credit sources',
        status: 'Needed',
      },
    ],
    description: 'Increased credit costs due to reduction of credit limit to $2,200',
    date: '2024-01-16',
  },
  {
    id: 'PEC-COST-07',
    title: 'Citi Double Cash Credit Limit Reduction (1752)',
    category: 'PEC-COST',
    source_docs: [18],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-COST-07-01',
        name: 'Alternative Credit Evidence',
        details: 'Documentation of higher-cost credit used after limit reduction',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-07-02',
        name: 'Previous Credit Terms',
        details: 'Statement showing previous credit limit and terms',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-COST-07-03',
        name: 'Cost Differential Analysis',
        details: 'Calculation of increased costs from using alternative credit sources',
        status: 'Needed',
      },
    ],
    description: 'Increased credit costs due to reduction of credit limit to $1,510',
    date: '2024-02-05',
  },
  {
    id: 'PEC-FEE-01',
    title: 'Ally Auto Application Fee',
    category: 'PEC-FEE',
    source_docs: [5],
    claimed_value: 25,
    status: 'Verified',
    required_documents: [
      {
        doc_id: 'PEC-FEE-01-01',
        name: 'Proof of Fee Payment',
        details: 'Receipt or bank statement showing application fee payment',
        status: 'Verified',
      },
      {
        doc_id: 'PEC-FEE-01-02',
        name: 'Application Terms',
        details: 'Documentation showing fee was non-refundable upon denial',
        status: 'Verified',
      },
    ],
    description: 'Non-refundable application fee paid for denied auto financing',
    date: '2024-03-12',
  },
  {
    id: 'PEC-FEE-02',
    title: 'Chase Auto Application Fee',
    category: 'PEC-FEE',
    source_docs: [8],
    claimed_value: 30,
    status: 'Verified',
    required_documents: [
      {
        doc_id: 'PEC-FEE-02-01',
        name: 'Proof of Fee Payment',
        details: 'Receipt or bank statement showing application fee payment',
        status: 'Verified',
      },
      {
        doc_id: 'PEC-FEE-02-02',
        name: 'Application Terms',
        details: 'Documentation showing fee was non-refundable upon denial',
        status: 'Verified',
      },
    ],
    description: 'Non-refundable application fee paid for denied auto loan',
    date: '2024-02-11',
  },
  {
    id: 'PEC-OPP-01',
    title: 'Harvard Education Loss',
    category: 'PEC-OPP',
    source_docs: [15, 19, 36],
    claimed_value: 1140000,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-OPP-01-01',
        name: 'Proof of Enrollment & Withdrawal',
        details:
          'Documentation showing acceptance to Harvard and subsequent withdrawal due to funding issues',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-OPP-01-02',
        name: 'Opportunity Insights 2024 Harvard Study',
        details: 'Research showing lifetime earnings impact of Harvard education',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-OPP-01-03',
        name: 'Proof of Denied Funding',
        details: 'Documentation showing student loan denials directly linked to credit issues',
        status: 'Needed',
      },
    ],
    description: 'Lost opportunity of Harvard education and associated lifetime earnings premium',
    date: '2024-03-15',
  },
  {
    id: 'PEC-OOP-01',
    title: 'Credit Report Purchases & Monitoring',
    category: 'PEC-OOP',
    source_docs: [],
    claimed_value: 210.75,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-OOP-01-01',
        name: 'Receipts for Credit Reports',
        details: 'Paid receipts for credit reports purchased specifically to monitor issues',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-OOP-01-02',
        name: 'Credit Monitoring Service Subscription',
        details: 'Evidence of credit monitoring service initiated because of these issues',
        status: 'Needed',
      },
    ],
    description: 'Direct out-of-pocket costs for credit reports and monitoring services',
    date: '2024-01-15',
  },
  {
    id: 'PEC-OOP-02',
    title: 'Dispute Correspondence Costs',
    category: 'PEC-OOP',
    source_docs: [],
    claimed_value: 112.85,
    status: 'Pending',
    required_documents: [
      {
        doc_id: 'PEC-OOP-02-01',
        name: 'Certified Mail Receipts',
        details: 'Receipts for certified/registered mail used for disputes',
        status: 'Needed',
      },
      {
        doc_id: 'PEC-OOP-02-02',
        name: 'Phone Records',
        details: 'Detailed phone records showing calls to CRAs and furnishers',
        status: 'Needed',
      },
    ],
    description: 'Direct costs incurred in attempting to resolve credit reporting issues',
    date: null,
  },
  {
    id: 'NONPEC-ED-01',
    title: 'Emotional Distress',
    category: 'NONPEC-ED',
    source_docs: [1, 2, 5, 8, 10],
    claimed_value: null,
    status: 'Potential',
    required_documents: [
      {
        doc_id: 'NONPEC-ED-01-01',
        name: "Plaintiff's Detailed Testimony",
        details: 'Sworn statement describing emotional impact of credit issues and denials',
        status: 'Needed',
      },
      {
        doc_id: 'NONPEC-ED-01-02',
        name: 'Corroborating Witness Statements',
        details: 'Statements from family/friends who observed emotional distress',
        status: 'Needed',
      },
      {
        doc_id: 'NONPEC-ED-01-03',
        name: 'Evidence of Time/Effort Spent',
        details: 'Copies of dispute letters, communication logs, time spent on remediation',
        status: 'Received',
      },
    ],
    description:
      'Emotional distress, anxiety, and humiliation from multiple credit denials and adverse actions',
  },
  {
    id: 'NONPEC-REP-01',
    title: 'Reputational Harm',
    category: 'NONPEC-REP',
    source_docs: [1, 2, 5, 8, 10, 11],
    claimed_value: null,
    status: 'Potential',
    required_documents: [
      {
        doc_id: 'NONPEC-REP-01-01',
        name: 'Documentation of Credit Score Drops',
        details: 'Evidence showing significant credit score drops linked to the issues',
        status: 'Received',
      },
      {
        doc_id: 'NONPEC-REP-01-02',
        name: 'Pattern of Denials Documentation',
        details:
          'Complete collection of all adverse actions showing pattern of negative perception',
        status: 'Received',
      },
    ],
    description: 'Damage to credit reputation and perceived creditworthiness',
  },
];
