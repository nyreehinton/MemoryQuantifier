import { DamageItem, RequiredDocument } from '../../shared/schema';

// Helper function to create required documents consistently
function createReqDoc(
  id: string,
  name: string,
  details: string,
  status: 'Needed' | 'Requested' | 'Received' | 'Verified' | 'N/A' = 'Needed'
): RequiredDocument {
  return { doc_id: id, name, details, status };
}

export const damagesData: DamageItem[] = [
  // --- PECUNIARY DAMAGES ---

  // PEC-PAY: Required Additional Payments
  {
    id: 'PEC-PAY-01',
    title: 'Essex Additional Security Deposit',
    category: 'PEC-PAY',
    source_docs: [10],
    claimed_value: 2187,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PREQ-01-Essex-TU',
        '[IE] TransUnion Report used by Essex',
        'Credit report pulled by TU around 2024-06-05 showing adverse credit history.',
        'Verified'
      ),
      createReqDoc(
        'PEC-PAY-01-02',
        '[C] Essex Security Deposit Policy',
        'Documentation showing Essex required increased deposit due to credit report findings.'
      ),
      createReqDoc(
        'PEC-PAY-01-01',
        '[A] Proof of Payment',
        'Receipt, bank statement, lease addendum showing $2,187 paid.'
      ),
    ],
    description: 'Additional $2,187 security deposit required by Essex.',
    date: '2024-06-04',
  },
  {
    id: 'PEC-PAY-02',
    title: 'Required Tesla Repairs & Transportation Costs',
    category: 'PEC-PAY',
    source_docs: [2, 5, 6, 12, 24, 38, 40],
    claimed_value: 14690.66,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-PAY-02-04',
        '[IE] Auto Loan Denial Documentation',
        'Sequence of denials preventing vehicle replacement:\n' +
          '- Huebner Chevrolet (2/13/24)\n' +
          '- Ally/Carmax (3/12/24)\n' +
          '- Ally/St. Charles (3/15/24)\n' +
          '- Capital One/Volvo (3/20/24)\n' +
          '- Global Lending/St. Charles (4/2/24)\n' +
          '- US Bank/Volvo (4/10/24)',
        'Verified'
      ),
      createReqDoc(
        'PEC-PAY-02-05',
        '[C] Credit Impact Documentation',
        'Credit deterioration preventing vehicle replacement:\n' +
          '- Oct 19, 2023: Rating dropped from Good to Fair\n' +
          '- Oct-Jan: 91-point FICO score drop\n' +
          '- Multiple disputes filed Dec 2023-Jan 2024',
        'Verified'
      ),
      createReqDoc(
        'PEC-PAY-02-01',
        '[A] Paid Repair Invoices',
        'Paid repair invoices totaling $699.61:\n' +
          '- Feb 2023: $217.51 (Invoice #3000S0006277027)\n' +
          '- Jun 2023: $482.10 (Invoice #3000S0007380537)',
        'Verified'
      ),
      createReqDoc(
        'PEC-PAY-02-02',
        '[A] Required Future Repairs',
        'Upcoming required repairs totaling $13,991.05:\n' +
          '- Jan 2024: $3,620.65 (Estimate #3000-009-0016233315)\n' +
          '- Oct 2024: $10,370.40 (Estimate #3000-009-0021563621)',
        'Verified'
      ),
      createReqDoc(
        'PEC-PAY-02-03',
        '[A] Alternative Transportation Expenses',
        'Receipts for rentals, ride-sharing, or other transportation needed while Tesla was unusable',
        'Needed'
      ),
    ],
    description:
      'Required additional payments for Tesla repairs ($14,690.66) and alternative transportation due to inability to replace defective vehicle. Credit rating downgrade and 91-point score drop documented as preventing access to replacement financing.',
    date: '2024-02-13',
  },

  // PEC-COST: Increased Cost of Credit (Unfavorable Terms on Specific Loan)
  {
    id: 'PEC-COST-01',
    title: 'Golden1 Credit Union - Increased APR Costs',
    category: 'PEC-COST',
    source_docs: [26],
    claimed_value: 4997.98,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PREQ-01-Golden1-Exp',
        '[IE] Experian Report used by Golden 1',
        'Credit report pulled by Experian around 2024-09-17 showing adverse credit history.',
        'Needed'
      ),
      createReqDoc(
        'PEC-COST-01-02',
        '[C] Proof of "But-For" Terms',
        'Bank of America terms showing baseline rates that would have been offered:\n' +
          '- Finance Charge: $3,500.04\n' +
          '- Fees: $1,061.24 (License/Reg/Title: $710, ERT Fee: $27, Documentary Fee: $324.24)',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-01-01',
        '[A] Final Loan Agreement',
        'Verified documentation showing:\n' +
          '- Interest Paid (Oct-Dec 2024): $572.26\n' +
          '- Finance Charge: $8,819.01\n' +
          '- Fees: $740.25 (Document Processing: $85, Emissions Testing: $50, EVR Fee: $33, DMV & Registration: $564, Emissions Cert: $8.25)',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-01-03',
        '[A] Cost Differential Calculation',
        'Verified calculation showing:\n' +
          '- Actual total cost: $9,559.26 ($8,819.01 finance + $740.25 fees)\n' +
          '- But-for total cost: $4,561.28 ($3,500.04 finance + $1,061.24 fees)\n' +
          '- Total cost differential: $4,997.98',
        'Verified'
      ),
    ],
    description:
      'Verified increased cost of $4,997.98 on Golden 1 loan. Actual total cost $9,559.26 (finance charge $8,819.01 + fees $740.25) vs but-for cost $4,561.28 (finance charge $3,500.04 + fees $1,061.24).',
    date: '2024-09-17',
  },

  // PEC-COST: Increased Cost of Credit (Due to Individual Credit Limit Reductions)
  {
    id: 'PEC-COST-02',
    title: 'Increased Costs post BofA Limit Reduction (1775)',
    category: 'PEC-COST',
    source_docs: [1, 20],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-02-01',
        '[IE] BofA Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-03-07 showing reduction to $2,000',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-02-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from BofA adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization across accounts\n' +
          '- Recent derogatory marks on credit report\n' +
          '- Multiple accounts with high balances relative to limits',
        'Verified'
      ),
      createReqDoc('PEC-COST-02-03', '[A] APR Documentation', 'Proof of APR for BofA 1775'),
      createReqDoc(
        'PEC-COST-02-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Lost credit limit amount\n' + '2. APR cost on lost limit'
      ),
    ],
    description:
      'Potential increased costs from BofA (1775) reduction to $2,000 limit, calculated based on lost credit limit and APR.',
    date: '2024-03-07',
  },
  {
    id: 'PEC-COST-03',
    title: 'Increased Costs post Chase Limit Reduction (0757)',
    category: 'PEC-COST',
    source_docs: [3],
    claimed_value: 5500,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-03-01',
        '[IE] Chase Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-01-18 showing reduction from $5,500',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-03-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Chase adverse action notice:\n' +
          '- Recent delinquency on one or more credit accounts\n' +
          '- High utilization of available credit lines\n' +
          '- Multiple revolving accounts showing high balances\n' +
          '- Recent credit inquiries indicating seeking new credit',
        'Verified'
      ),
      createReqDoc('PEC-COST-03-03', '[A] APR Documentation', 'Proof of APR for Chase 0757'),
      createReqDoc(
        'PEC-COST-03-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Lost credit limit amount\n' + '2. APR cost on lost limit'
      ),
    ],
    description:
      'Potential increased costs from Chase (0757) reduction from $5,500 limit, calculated based on lost credit limit and APR.',
    date: '2024-01-18',
  },
  {
    id: 'PEC-COST-04',
    title: 'Chase Amazon Prime Visa (7293) - Credit Line & APR Changes',
    category: 'PEC-COST',
    source_docs: [4],
    claimed_value: 5500,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-04-01',
        '[IE] Chase Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-01-18 showing reduction from $5,500 and APR increase to 27.49%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-04-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Chase Amazon adverse action notice:\n' +
          '- Recent delinquency reported on credit accounts\n' +
          '- High utilization of existing credit lines\n' +
          '- Multiple revolving accounts with balances\n' +
          '- Recent changes in credit report indicating increased risk',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-04-03',
        '[A] APR Documentation',
        'Documentation of APR increase from 27.24% to 27.49%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-04-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' +
          '1. Lost credit limit amount\n' +
          '2. APR cost on lost limit\n' +
          '3. APR increase on remaining limit'
      ),
    ],
    description:
      'Increased costs from Chase Amazon (7293) reduction from $5,500 limit and APR increase to 27.49%, calculated based on lost limit and APR changes.',
    date: '2024-01-18',
  },
  {
    id: 'PEC-COST-05',
    title: 'Bank of America (4041) - Credit Line & APR Changes',
    category: 'PEC-COST',
    source_docs: [5],
    claimed_value: 3700,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-05-01',
        '[IE] BofA Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-01-18 showing reduction to $2,500 from $6,200',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-05-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from BofA adverse action notice:\n' +
          '- Multiple accounts reported as delinquent\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information on credit report\n' +
          '- Multiple accounts showing high balance-to-limit ratios',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-05-03',
        '[A] APR Documentation',
        'Documentation of APR at 27.74%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-05-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' +
          '1. Lost credit limit amount ($3,700)\n' +
          '2. APR cost on lost limit'
      ),
    ],
    description:
      'Increased costs from BofA (4041) reduction to $2,500 from $6,200 limit, calculated based on lost credit limit and APR.',
    date: '2024-01-18',
  },
  {
    id: 'PEC-COST-06',
    title: 'Apple Card - Credit Line & APR Changes',
    category: 'PEC-COST',
    source_docs: [16],
    claimed_value: 3300,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-06-01',
        '[IE] Apple Card Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-01-16 showing reduction from $3,300 and APR increase to 27.24%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-06-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Apple Card adverse action notice:\n' +
          '- Recent delinquencies reported on credit accounts\n' +
          '- High utilization of available credit\n' +
          '- Multiple accounts with high balances\n' +
          '- Recent negative changes in credit profile',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-06-03',
        '[A] APR Documentation',
        'Documentation of APR increase from 26.99% to 27.24%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-06-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' +
          '1. Lost credit limit amount\n' +
          '2. APR cost on lost limit\n' +
          '3. APR increase on remaining limit'
      ),
    ],
    description:
      'Increased costs from Apple Card reduction from $3,300 limit and APR increase to 27.24%, calculated based on lost limit and APR changes.',
    date: '2024-01-16',
  },
  {
    id: 'PEC-COST-07',
    title: 'Citi Double Cash - Credit Line & APR Changes',
    category: 'PEC-COST',
    source_docs: [18],
    claimed_value: 2500,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-07-01',
        '[IE] Citi Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-02-05 showing reduction from $2,500 and APR changes',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-07-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Citi adverse action notice:\n' +
          '- Multiple accounts showing payment delinquency\n' +
          '- High overall credit utilization\n' +
          '- Recent derogatory marks on credit report\n' +
          '- Pattern of increasing credit balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-07-03',
        '[A] APR Documentation',
        'Documentation of APR changes to 29.24% (standard) and 26.74% (balance transfers)',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-07-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' +
          '1. Lost credit limit amount\n' +
          '2. APR cost on lost limit\n' +
          '3. APR changes on remaining limit'
      ),
    ],
    description:
      'Increased costs from Citi Double Cash reduction from $2,500 limit and APR changes, calculated based on lost limit and APR changes.',
    date: '2024-02-05',
  },
  {
    id: 'PEC-COST-08',
    title: 'American Express - Credit Line & APR Changes',
    category: 'PEC-COST',
    source_docs: [20],
    claimed_value: 94500,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-08-01',
        '[IE] Amex Credit Limit Reduction Notice',
        'Credit limit reduction notice dated 2024-01-18 showing reduction to $5,500 from $100,000 and APR increase to 27.49%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-08-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Amex adverse action notice:\n' +
          '- Multiple accounts reported as delinquent\n' +
          '- Significant increase in credit utilization\n' +
          '- Recent derogatory information added to credit report\n' +
          '- Multiple revolving accounts with high balances\n' +
          '- Substantial change in creditworthiness',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-08-03',
        '[A] APR Documentation',
        'Documentation of APR increase from 23.74% to 27.49%',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-08-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' +
          '1. Lost credit limit amount ($94,500)\n' +
          '2. APR cost on lost limit\n' +
          '3. APR increase on remaining limit'
      ),
    ],
    description:
      'Increased costs from Amex reduction to $5,500 from $100,000 limit and APR increase to 27.49%, calculated based on lost limit and APR changes.',
    date: '2024-01-18',
  },

  // Auto Financing PEC-COST Claims
  {
    id: 'PEC-COST-09',
    title: 'Huebner Chevrolet - First Attempted Vehicle Replacement',
    category: 'PEC-COST',
    source_docs: [2],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-09-01',
        '[IE] Huebner Denial Documentation',
        'Original denial letter dated 2024-02-13 showing denial of auto loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-09-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Huebner adverse action notice:\n' +
          '- Multiple accounts reported as delinquent\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple credit inquiries',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-09-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-09-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'First attempt to replace defective Tesla - denial led to continued repair costs and need for alternative transportation (see PEC-OPP-02)',
    date: '2024-02-13',
  },
  {
    id: 'PEC-COST-10',
    title: 'Ally/Carmax - Second Attempted Vehicle Replacement',
    category: 'PEC-COST',
    source_docs: [5],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-10-01',
        '[IE] Ally Denial Documentation',
        'Original denial letter dated 2024-03-12 showing denial of auto loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-10-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Ally adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization across accounts\n' +
          '- Recent derogatory marks on credit report\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-10-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-10-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Second attempt to replace defective Tesla - denial extended period of repair costs and transportation expenses (see PEC-OPP-02)',
    date: '2024-03-12',
  },
  {
    id: 'PEC-COST-11',
    title: 'Ally/St. Charles - Higher Cost Alternative Financing',
    category: 'PEC-COST',
    source_docs: [6],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-11-01',
        '[IE] Ally Denial Documentation',
        'Original denial letter dated 2024-03-15 showing denial of auto loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-11-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Ally adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple credit inquiries',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-11-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-11-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative financing after Ally/St. Charles denial',
    date: '2024-03-15',
  },
  {
    id: 'PEC-COST-12',
    title: 'Ally/Carbeeco - Modified Terms',
    category: 'PEC-COST',
    source_docs: [7],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-12-01',
        '[IE] Modified Terms Documentation',
        'Documentation showing modified loan terms',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-12-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Ally adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-12-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-12-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description: 'Increased costs due to modified financing terms from Ally/Carbeeco',
    date: '2024-03-18',
  },
  {
    id: 'PEC-COST-13',
    title: 'American Credit Acceptance/Carmax - Modified Terms',
    category: 'PEC-COST',
    source_docs: [17],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-13-01',
        '[IE] Modified Terms Documentation',
        'Documentation showing modified loan terms',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-13-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from ACA adverse action notice:\n' +
          '- Multiple accounts showing payment delinquency\n' +
          '- High credit utilization across accounts\n' +
          '- Recent derogatory marks on credit report\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-13-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-13-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs due to modified financing terms from American Credit Acceptance/Carmax',
    date: '2024-03-25',
  },
  {
    id: 'PEC-COST-14',
    title: 'Capital One/Volvo Palo Alto - Fourth Attempted Vehicle Replacement',
    category: 'PEC-COST',
    source_docs: [12],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-14-01',
        '[IE] Capital One Denial Documentation',
        'Original denial letter dated 2024-03-20 showing denial of auto loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-14-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Capital One adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple credit inquiries',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-14-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-14-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Fourth attempt to replace defective Tesla - denial further extended repair costs and transportation expenses (see PEC-OPP-02)',
    date: '2024-03-20',
  },
  {
    id: 'PEC-COST-15',
    title: 'Global Lending/St. Charles - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [24],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-15-01',
        '[IE] Global Lending Denial Documentation',
        'Original denial letter dated 2024-04-02 showing denial of auto loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-15-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Global Lending adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-15-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-15-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative financing after Global Lending/St. Charles denial',
    date: '2024-04-02',
  },
  {
    id: 'PEC-COST-16',
    title: 'US Bank/Volvo Palo Alto - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [38],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-16-01',
        '[IE] US Bank Denial Documentation',
        'Original denial letter dated 2024-04-10 showing denial of auto loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-16-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from US Bank adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-16-03',
        '[A] APR Documentation',
        'Documentation of offered APR vs standard rates'
      ),
      createReqDoc(
        'PEC-COST-16-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative financing after US Bank/Volvo denial',
    date: '2024-04-10',
  },

  // Student/Personal Loan PEC-COST Claims
  {
    id: 'PEC-COST-17',
    title: 'PA Forward Student Loans - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [15],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-17-01',
        '[IE] PA Forward Denial Documentation',
        'Original denial letter dated 2024-02-08 showing denial of student loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-17-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from PA Forward adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Insufficient credit history length',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-17-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-17-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative student funding after PA Forward denial',
    date: '2024-02-08',
  },
  {
    id: 'PEC-COST-18',
    title: 'Bank of Lake Mills/MPOWER - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [19],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-18-01',
        '[IE] Bank of Lake Mills Denial Documentation',
        'Original denial letter dated 2024-02-15 showing denial of student loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-18-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Bank of Lake Mills adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Insufficient credit history length',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-18-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-18-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative student funding after Bank of Lake Mills/MPOWER denial',
    date: '2024-02-15',
  },
  {
    id: 'PEC-COST-19',
    title: 'Earnest - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [21],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-19-01',
        '[IE] Earnest Denial Documentation',
        'Original denial letter dated 2024-02-20 showing denial of student loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-19-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Earnest adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Insufficient credit history length',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-19-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-19-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative funding after Earnest denial',
    date: '2024-02-20',
  },
  {
    id: 'PEC-COST-20',
    title: 'Monterra Credit Union - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [23],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-20-01',
        '[IE] Monterra Denial Documentation',
        'Original denial letter dated 2024-02-25 showing denial of personal loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-20-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from Monterra adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-20-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-20-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative funding after Monterra Credit Union denial',
    date: '2024-02-25',
  },
  {
    id: 'PEC-COST-21',
    title: 'OneMain Financial - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [27],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-21-01',
        '[IE] OneMain Denial Documentation',
        'Original denial letter dated 2024-03-01 showing denial of personal loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-21-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from OneMain adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-21-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-21-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative funding after OneMain Financial denial',
    date: '2024-03-01',
  },
  {
    id: 'PEC-COST-22',
    title: 'LightStream/Truist - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [29],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-22-01',
        '[IE] LightStream Denial Documentation',
        'Original denial letter dated 2024-03-05 showing denial of personal loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-22-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from LightStream adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-22-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-22-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative funding after LightStream/Truist denial',
    date: '2024-03-05',
  },
  {
    id: 'PEC-COST-23',
    title: 'LendingPoint/FinWise - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [30],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-23-01',
        '[IE] LendingPoint Denial Documentation',
        'Original denial letter dated 2024-03-08 showing denial of personal loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-23-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from LendingPoint adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Multiple accounts with high balances',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-23-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-23-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative funding after LendingPoint/FinWise denial',
    date: '2024-03-08',
  },
  {
    id: 'PEC-COST-24',
    title: 'SoFi Bank - Higher Cost Alternative',
    category: 'PEC-COST',
    source_docs: [36],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-24-01',
        '[IE] SoFi Denial Documentation',
        'Original denial letter dated 2024-03-15 showing denial of personal loan application',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-24-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from SoFi adverse action notice:\n' +
          '- Multiple accounts showing delinquent payments\n' +
          '- High credit utilization ratio\n' +
          '- Recent derogatory information\n' +
          '- Insufficient credit history length',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-24-03',
        '[A] APR Documentation',
        'Documentation of standard rates vs alternative funding costs'
      ),
      createReqDoc(
        'PEC-COST-24-04',
        '[A] Cost Differential Calculation',
        'Calculation based on:\n' + '1. Increased APR costs\n' + '2. Additional fees required'
      ),
    ],
    description:
      'Increased costs from having to obtain higher-cost alternative funding after SoFi Bank denial',
    date: '2024-03-15',
  },

  // PEC-FEE: Non-Refundable Application Fees
  {
    id: 'PEC-FEE-01',
    title: 'Huebner Chevrolet Application Fee',
    category: 'PEC-FEE',
    source_docs: [2],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-FEE-01-01',
        '[IE] Application Terms (Huebner)',
        'Documentation showing fee amount and non-refundable status',
        'Verified'
      ),
      createReqDoc(
        'PEC-FEE-01-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from adverse action notice leading to application denial',
        'Verified'
      ),
      createReqDoc(
        'PEC-FEE-01-03',
        '[A] Proof of Fee Payment',
        'Bank/card statement showing fee payment'
      ),
    ],
    description: 'Non-refundable application fee for denied Huebner Chevrolet application',
    date: '2024-02-13',
  },
  {
    id: 'PEC-FEE-02',
    title: 'Ally/Carmax Application Fee',
    category: 'PEC-FEE',
    source_docs: [5],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-FEE-02-01',
        '[IE] Application Terms (Ally/Carmax)',
        'Documentation showing fee amount and non-refundable status',
        'Verified'
      ),
      createReqDoc(
        'PEC-FEE-02-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from adverse action notice leading to application denial',
        'Verified'
      ),
      createReqDoc(
        'PEC-FEE-02-03',
        '[A] Proof of Fee Payment',
        'Bank/card statement showing fee payment'
      ),
    ],
    description: 'Non-refundable application fee for denied Ally/Carmax application',
    date: '2024-03-12',
  },
  // ... Continue creating PEC-FEE-XX entries for Docs 6, 7, 8, 15, 17, 19, 21, 22, 23, 24, 29, 30, 31, 32, 33, 34, 36, 37, 38 ...

  // PEC-DEP: Lost Deposits
  {
    id: 'PEC-DEP-01',
    title: 'Lost Deposit on Vehicle Purchase',
    category: 'PEC-DEP',
    source_docs: [2, 5, 6, 7, 8, 17, 22, 24, 34, 37, 38],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-DEP-01-01',
        '[IE] Purchase Agreement',
        'Contract showing deposit requirement and forfeiture terms',
        'Verified'
      ),
      createReqDoc(
        'PEC-DEP-01-02',
        '[C] Delinquency-Based Reasons',
        'Documented reasons from adverse action notices leading to financing denials',
        'Verified'
      ),
      createReqDoc(
        'PEC-DEP-01-03',
        '[A] Proof of Deposit Payment',
        'Receipt/statement showing deposit amount paid'
      ),
      createReqDoc(
        'PEC-DEP-01-04',
        '[A] Proof of Forfeiture',
        'Documentation confirming deposit forfeiture due to financing denial'
      ),
    ],
    description: 'Loss of deposit due to financing denial on vehicle purchase',
    date: '2024-02-11',
  },

  // PEC-OPP: Lost Opportunity Costs
  {
    id: 'PEC-OPP-01',
    title: 'Harvard Education Loss (Claimed)',
    category: 'PEC-OPP',
    source_docs: [15, 19, 36],
    claimed_value: 1140000,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-OPP-01-01',
        '[IE] Proof of Enrollment & Withdrawal',
        'Official Harvard docs linking withdrawal to funding denial.'
      ),
      createReqDoc(
        'PREQ-01-STUDENT-LOANS',
        '[C] Credit Reports Used for Student Loan Denials',
        'Reports used by PA Fwd, MPOWER, SoFi showing adverse history leading to denials.'
      ),
      createReqDoc(
        'PEC-OPP-01-02',
        '[A] Opportunity Insights 2024 Harvard Study',
        'The actual Chetty et al. study.'
      ),
      createReqDoc(
        'PEC-OPP-01-03',
        '[A] Validation of Calculation / Expert Report',
        'Expert report validating the $1.14M PV calculation.'
      ),
    ],
    description: 'Claimed lost lifetime earnings premium due to Harvard withdrawal.',
    date: '2024-01-24',
  },
  {
    id: 'PEC-OPP-02',
    title: 'Inability to Replace Defective Vehicle Impact',
    category: 'PEC-OPP',
    source_docs: [2, 5, 6, 7, 8, 17, 22, 24, 29, 34, 37, 38],
    claimed_value: 14690.66,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-OPP-02-01',
        'Tesla Repair Documentation',
        'Verified repair costs from invoices and estimates:\n\n' +
          'Paid Repairs ($699.61):\n' +
          '1. Feb 2023 (Invoice #3000S0006277027):\n' +
          '   - Parts: $165.00\n' +
          '   - Labor: $39.00\n' +
          '   - Tax: $13.51\n' +
          '   - Total: $217.51\n\n' +
          '2. Jun 2023 (Invoice #3000S0007380537):\n' +
          '   - Parts: $374.00\n' +
          '   - Labor: $79.50\n' +
          '   - Tax: $28.60\n' +
          '   - Total: $482.10\n\n' +
          'Required Future Repairs ($13,991.05):\n' +
          '1. Jan 2024 (Estimate #3000-009-0016233315):\n' +
          '   - Parts: $2,171.33\n' +
          '   - Labor: $1,244.00\n' +
          '   - Tax: $205.32\n' +
          '   - Total: $3,620.65\n\n' +
          '2. Oct 2024 (Estimate #3000-009-0021563621):\n' +
          '   - Parts: $6,906.48\n' +
          '   - Labor: $2,809.70\n' +
          '   - Tax: $654.22\n' +
          '   - Total: $10,370.40',
        'Verified'
      ),
      createReqDoc(
        'PEC-OPP-02-02',
        'Alternative Transportation Costs',
        'Receipts for rentals, ride-sharing, or other transportation needed while Tesla was unusable',
        'Needed'
      ),
      createReqDoc(
        'PEC-OPP-02-03',
        'Auto Loan Denial Sequence',
        'Chronological sequence of denials preventing vehicle replacement:\n' +
          '- Huebner Chevrolet (2/13/24)\n' +
          '- Ally/Carmax (3/12/24)\n' +
          '- Ally/St. Charles (3/15/24)\n' +
          '- Capital One/Volvo (3/20/24)\n' +
          '- Global Lending/St. Charles (4/2/24)\n' +
          '- US Bank/Volvo (4/10/24)',
        'Verified'
      ),
      createReqDoc(
        'PEC-OPP-02-04',
        'Cost Impact Analysis',
        'Total documented costs through October 2024:\n' +
          '1. Repair Costs: $14,690.66\n' +
          '   - Paid repairs: $699.61\n' +
          '   - Required future repairs: $13,991.05\n' +
          '2. Alternative Transportation: TBD\n' +
          '3. Lost Time/Wages: TBD\n' +
          '4. Credit Impact: See PEC-COST claims',
        'Verified'
      ),
    ],
    description:
      'Comprehensive damages from inability to replace defective Tesla. Total repair costs of $14,690.66 verified through invoices and estimates, including $699.61 in completed repairs and $13,991.05 in required future repairs. Repairs escalated after loan denials began in February 2024, with the largest repair ($10,370.40) scheduled for October 2024.',
    date: '2024-02-13',
  },
  {
    id: 'PEC-OPP-03',
    title: 'Lost Business Opportunity (The AI Remedy)',
    category: 'PEC-OPP',
    source_docs: [31],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-OPP-03-02',
        '[IE] Evidence of Lost Contracts/Revenue',
        'Concrete proof of deals lost *directly* due to lack of funding.'
      ),
      createReqDoc(
        'PREQ-01-SmartBiz-Exp',
        '[C] Experian Report used by SmartBiz',
        'Report used around 2024-08-08 showing adverse history leading to denial.'
      ),
      createReqDoc(
        'PEC-OPP-03-01',
        '[A] Business Plan',
        'Plan showing use of $150K & projections for The AI Remedy.'
      ),
    ],
    description: 'Lost business revenue/profit due to SmartBiz loan referral denial.',
    date: '2024-08-08',
  },

  // PEC-OOP: Out-of-Pocket Expenses
  {
    id: 'PEC-OOP-01',
    title: 'Out-of-Pocket Remediation Costs',
    category: 'PEC-OOP',
    source_docs: [],
    claimed_value: 323.6,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-OOP-01-03',
        '[IE] Dispute Documentation',
        'Evidence of disputes filed and actions taken.'
      ),
      createReqDoc(
        'PEC-OOP-01-02',
        '[C] Supporting Receipts/Logs/Statements',
        'Documentation linking expenses to remediation efforts.'
      ),
      createReqDoc(
        'PEC-OOP-01-01',
        '[A] Itemized List of Expenses',
        'Detailed list of all costs with amounts.'
      ),
    ],
    description: 'Direct costs for mail, copies, credit reports, calls, etc., related to disputes.',
    date: null,
  },

  // --- NON-PECUNIARY DAMAGES ---
  {
    id: 'NONPEC-ED-01',
    title: 'Emotional Distress',
    category: 'NONPEC-ED',
    source_docs: Array.from({ length: 38 }, (_, i) => i + 1),
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'NONPEC-ED-01-05',
        '[IE] Pattern of Adverse Actions Proof',
        'The compiled JSON/Timeline.',
        'Verified'
      ),
      createReqDoc(
        'NONPEC-ED-01-01',
        "[C] Plaintiff's Detailed Testimony",
        'Testimony linking actions to emotional impact.'
      ),
      createReqDoc(
        'NONPEC-ED-01-02',
        '[C] Corroborating Witness Statements',
        'Statements from others observing distress.'
      ),
      createReqDoc(
        'NONPEC-ED-01-03',
        '[A] Evidence of Time/Effort Spent',
        'Dispute letters, logs.'
      ),
      createReqDoc(
        'NONPEC-ED-01-04',
        '[A] Medical/Therapy Records (If Applicable)',
        'Records if treatment sought.'
      ),
    ],
    description: 'Claim for emotional distress, anxiety, humiliation, etc.',
    date: null,
  },
  {
    id: 'NONPEC-REP-01',
    title: 'Reputational Harm',
    category: 'NONPEC-REP',
    source_docs: Array.from({ length: 38 }, (_, i) => i + 1).concat([40]),
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'NONPEC-REP-01-02',
        '[IE] Pattern of Adverse Actions Proof',
        'The compiled JSON/Timeline.',
        'Verified'
      ),
      createReqDoc(
        'NONPEC-REP-01-01',
        "[C] Plaintiff's Testimony",
        'Testimony on perceived damage to creditworthiness.'
      ),
      createReqDoc(
        'NONPEC-REP-01-03',
        '[A] Credit Score Impact Documentation',
        'Cumulative documented impact on creditworthiness:\n' +
          '1. Baseline (June 11, 2023):\n' +
          '   - FICO Score: 673\n' +
          '   - Rating: Good\n' +
          '   - Perfect payment history\n' +
          '   - 23 accounts in good standing\n' +
          '   - 48% credit utilization\n\n' +
          '2. Initial Impact (Oct 19, 2023):\n' +
          '   - Score drop: -43 points\n' +
          '   - Rating downgraded to Fair\n' +
          '   - First account flagged as past due\n\n' +
          '3. Continued Deterioration:\n' +
          '   - Nov 18, 2023: -26 points\n' +
          '   - Dec 18, 2023: -6 points\n' +
          '   - Dec 21, 2023: -2 points\n' +
          '   - Jan 08, 2024: -14 points\n\n' +
          '4. Cumulative Impact:\n' +
          '   - Total score drop: 91 points\n' +
          '   - Rating change: Good to Fair\n' +
          '   - Multiple disputes filed\n' +
          '   - Resulted in multiple loan denials',
        'Verified'
      ),
      createReqDoc(
        'NONPEC-REP-01-04',
        '[A] Dispute History Documentation',
        'Timeline of attempts to address issues:\n' +
          '- Dec 31, 2023: Initial dispute filed\n' +
          '- Jan 05, 2024: Additional dispute filed\n' +
          '- Jan 05, 2024: Dispute modification submitted',
        'Verified'
      ),
    ],
    description:
      'Severe damage to credit reputation documented through 91-point FICO score drop, rating downgrade from Good to Fair, and resulting pattern of denials. Impact began October 2023 and continued to worsen despite multiple disputes.',
    date: '2023-10-19',
  },
  {
    id: 'PEC-COST-25',
    title: 'Progressive Credit Score Deterioration',
    category: 'PEC-COST',
    source_docs: [40],
    claimed_value: null,
    status: 'Pending',
    required_documents: [
      createReqDoc(
        'PEC-COST-25-02',
        '[IE] Progressive Score Impact Timeline',
        'Documented sequence of FICO score drops:\n' +
          '1. Oct 19, 2023: -43 points\n' +
          '   - Rating downgraded to Fair\n' +
          '   - First account flagged as past due\n\n' +
          '2. Nov 05, 2023: +8 points (temporary improvement)\n' +
          '3. Nov 18, 2023: -26 points\n' +
          '4. Dec 18, 2023: -6 points\n' +
          '5. Dec 21, 2023: -2 points\n' +
          '   - Account flagged as 90 days past due\n' +
          '6. Jan 08, 2024: -14 points\n\n' +
          'Net Impact: -91 points from baseline',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-25-03',
        '[C] Remediation Attempts Documentation',
        'Chronological sequence of dispute actions:\n' +
          '1. Dec 31, 2023: Initial dispute filed\n' +
          '2. Jan 05, 2024: Additional dispute filed\n' +
          '3. Jan 05, 2024: Dispute modification\n\n' +
          'Impact continued despite remediation attempts',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-25-01',
        '[A] Baseline Credit Profile Documentation',
        'June 11, 2023 Experian Report showing:\n' +
          '- FICO Score: 673\n' +
          '- Rating: Good\n' +
          '- Total Credit Limit: $43,150\n' +
          '- Credit Utilization: 48%\n' +
          '- Perfect Payment History\n' +
          '- 23 Accounts in Good Standing',
        'Verified'
      ),
      createReqDoc(
        'PEC-COST-25-04',
        '[A] Consequential Damages Timeline',
        'Sequence of denials following score deterioration:\n' +
          '1. Auto Loan Denials:\n' +
          '   - Huebner Chevrolet (2/13/24)\n' +
          '   - Ally/Carmax (3/12/24)\n' +
          '   - Multiple others through April 2024\n\n' +
          '2. Credit Line Reductions:\n' +
          '   - Multiple cards reduced Jan-Mar 2024\n' +
          '   - AmEx reduced from $100,000 to $5,500\n\n' +
          '3. Student/Personal Loan Denials:\n' +
          '   - Multiple denials Feb-Mar 2024',
        'Verified'
      ),
    ],
    description:
      'Comprehensive documentation of credit score deterioration from Good (673) to Fair rating, with 91-point drop over 3 months. Impact began with 43-point drop in October 2023 and continued to worsen despite dispute attempts, leading to multiple denials and credit line reductions.',
    date: '2023-10-19',
  },
];
