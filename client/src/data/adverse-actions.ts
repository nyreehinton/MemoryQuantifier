import { AdverseAction } from "@/types";

// Sample data based on the provided JSON
export const adverseActionsData: AdverseAction[] = [
  {
    document_index: 1,
    document_source: "Bank of America (Letter - Credit Limit Change)",
    sender_name: "Bank of America",
    sender_address: "PO Box 660441, Dallas, TX 75266-0441",
    recipient_name: "Nyree Hinton",
    recipient_address: "4254 CHURCH RD, EASTON PA 18045-2971",
    date: "2024-03-07",
    action_type: "Credit Limit Reduction",
    details: {
      account_ending_in: "1775",
      new_total_credit_line: "2000.00",
      new_cash_credit_line: "200.00"
    },
    reasons: [
      "Utilization of your credit is too high",
      "Number of revolving accounts with balances",
      "Current or past delinquency, derogatory public record(s), and/or collection account(s)",
      "Balance is too high relative to the credit limit on one or more of your revolving accounts on your credit file"
    ],
    credit_report_agency: "TransUnion",
    credit_report_agency_details: "PO Box 1000, Chester, PA 19016-1000, 1-800-888-4213",
    credit_score: null,
    credit_score_date: null,
    credit_score_range: null,
    credit_score_factors: null
  },
  {
    document_index: 2,
    document_source: "Huebner Chevrolet Subaru (Letter - Financing Denial)",
    sender_name: "Huebner Chevrolet Subaru",
    sender_address: "1155 CANTON ROAD, CARROLLTON, OH 44615",
    recipient_name: "Nyree Hinton",
    recipient_address: "5901 Center Dr Apt 456-2, Los Angeles, CA 90045",
    date: "2024-02-13",
    action_type: "Vehicle Financing Application Denial",
    details: "Dealer could not secure third-party financing terms acceptable to them.",
    reasons: [
      "Inability to find a finance company to buy the contract on acceptable terms"
    ],
    credit_report_agency: "Multiple",
    credit_report_agency_details: "Equifax, Experian, TransUnion listed as possibilities",
    credit_score: null,
    credit_score_date: null,
    credit_score_range: null,
    credit_score_factors: null
  },
  {
    document_index: 5,
    document_source: "Ally Bank (Letter - Auto Financing Denial)",
    sender_name: "Ally Bank",
    sender_address: "PO BOX 1048, HARTFORD CT 06143",
    recipient_name: "Nyree Hinton",
    recipient_address: "5901 CENTER DR APT 456-2, LOS ANGELES, CA 90045",
    date: "2024-03-12",
    action_type: "Auto Financing Application Denial",
    initiated_by: "Carmax Auto Superstores California, Llc",
    details: {
      application_number: "1142194213"
    },
    reasons: [
      "Decision based on credit report(s)"
    ],
    credit_report_agency: "Experian; SageStream, LLC",
    credit_report_agency_details: "Experian: PO Box 2002 Allen TX 75013 888-397-3742; SageStream: PO Box 105108 Atlanta GA 30348-5108 888-395-0277",
    credit_score: null,
    credit_score_date: "2024-02-26",
    credit_score_range: null,
    credit_score_factors: [
      "Insufficient information about credit history to calculate a score"
    ]
  },
  {
    document_index: 8,
    document_source: "Chase Auto (Letter - Auto Loan Denial)",
    sender_name: "Chase Auto (JPMorgan Chase Bank, N.A.)",
    sender_address: "1111 Polaris Parkway, Columbus, Ohio 43240",
    recipient_name: "Nyree D Hinton",
    recipient_address: "4254 CHURCH RD, EASTON PA 18045",
    date: "2024-02-11",
    action_type: "Auto Loan Denial",
    initiated_by: "Self/Unknown Dealer (20 JAGUAR F-TYPE)",
    details: null,
    reasons: [
      "FORECLOSURE, REPOSSESSION, COLLECTION AND/OR CHARGE-OFF"
    ],
    credit_report_agency: "Experian",
    credit_report_agency_details: null,
    credit_score: 542,
    credit_score_date: "2024-01-31",
    credit_score_range: "250-900",
    credit_score_factors: [
      "Serious delinquency",
      "Time since delinquency is too recent or unknown",
      "Ratio of balances to limits on bankcards or revolving accounts too high",
      "Length of time accounts have been established"
    ]
  },
  {
    document_index: 10,
    document_source: "Essex Property Trust (Implied) (Letter - Rental Application Decision)",
    sender_name: "Essex Property Trust",
    sender_address: null,
    recipient_name: "Nyree Hinton",
    recipient_address: "Related to 616 Masselin Avenue, 210 application",
    date: "2024-06-04",
    action_type: "Rental Application Conditional Approval",
    details: {
      property: "Tiffany Court - 616 Masselin Avenue, 210",
      condition: "Requires additional security deposit of $2,187 prior to move-in"
    },
    reasons: [
      "Balance of non-mortgage accounts is too high",
      "Too many inquiries",
      "Revolving account balances are too high in proportion to credit limits",
      "Length of time since most recent auto delinquency is too short"
    ],
    credit_report_agency: "TransUnion",
    credit_report_agency_details: "TransUnion Consumer Solutions: PO Box 2000 Chester, PA 19022-2000 1-800-916-8800; TransUnion Rental Screening: Box 800 Woodlyn, PA 19094 1-800-230-9376 TURSSDispute@transunion.com; Background Data Solutions: 1-800-568-5665; Funnel Leasing: 150 W. 22nd St. - 8th Fl. New York, NY 10011 (833) 979-3074 consumer@funnelleasing.com",
    credit_score: 605,
    credit_score_date: "2024-06-05",
    credit_score_range: "350-850",
    credit_score_factors: [
      "Balance of non-mortgage accounts is too high",
      "Too many inquiries",
      "Revolving account balances are too high in proportion to credit limits",
      "Length of time since most recent auto delinquency is too short"
    ]
  }
];
