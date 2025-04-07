import { Button } from '@/components/ui/button';
import { Calendar, Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react';

const Timeline = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const timelineEvents = [
    // 2025 Events
    {
      date: 'Apr 3, 2025',
      category: 'legal',
      title: 'Counsel Withdrawing',
      description:
        'Current Counsel (Law Offices of Todd M. Friedman, P.C.) Notifies Plaintiff of Intent to Withdraw',
      icon: '🚪',
      documents: ['withdrawal_notice.pdf'],
      ref: 'Email snippet from Meghan George',
    },
    {
      date: 'Apr 3, 2025',
      category: 'mediation',
      title: 'Mediation Failed',
      description: 'Mediation with Capital One failed - Offer deemed nuisance value',
      icon: '❌',
      documents: ['mediation_summary.pdf'],
      ref: 'User context',
    },
    // 2024 Events - Settlements & Legal Actions
    {
      date: 'Dec 2024',
      category: 'settlement',
      title: 'Equifax Settlement',
      description: 'Settlement Agreement with Equifax',
      icon: '✅',
      documents: ['settlement_equifax.pdf'],
      ref: 'Note: Document dates appear incorrect/future; actual settlement likely occurred late 2024',
    },
    {
      date: 'Sep 24, 2024',
      category: 'settlement',
      title: 'TransUnion Settlement',
      description: 'Settlement agreement signed with TransUnion',
      icon: '✅',
      documents: ['transunion_settlement.pdf', 'notice_of_settlement_transunion.pdf'],
    },
    {
      date: 'Sep 10, 2024',
      category: 'settlement',
      title: 'Experian Settlement',
      description: 'Settlement agreement signed with Experian',
      icon: '✅',
      documents: ['experian_settlement.pdf', 'notice_of_settlement_experian.pdf'],
    },
    {
      date: 'Jun 4, 2024',
      category: 'legal',
      title: 'FAC Filed',
      description:
        'First Amended Complaint (FAC) Filed in U.S. District Court (C.D. Cal.) after removal/refiling',
      icon: '⚖️',
      documents: ['Doc 20'],
    },
    // 2024 Events - Adverse Actions (Mar-Apr)
    {
      date: 'Mar 26, 2024',
      category: 'adverse-action',
      title: 'Multiple Denials',
      description:
        'OneMain Financial Loan Denial, Westlake Financial Credit Denied (Frozen File Claim), Global Lending Services Auto Denial',
      icon: '📉',
      documents: ['Doc 27', 'Doc 37', 'Doc 24'],
    },
    {
      date: 'Mar 17, 2024',
      category: 'adverse-action',
      title: 'Exeter Finance Denial',
      description: 'Exeter Finance Auto Loan Denial',
      icon: '📉',
      documents: ['Doc 22'],
    },
    {
      date: 'Mar 12, 2024',
      category: 'adverse-action',
      title: 'Ally Auto Denial',
      description: 'Ally Auto Financing Denial (St. Charles)',
      icon: '📉',
      documents: ['Doc 6'],
    },
    {
      date: 'Mar 11, 2024',
      category: 'legal',
      title: 'Initial Lawsuit Filed',
      description: 'Initial Lawsuit Filed in California Superior Court, Los Angeles County',
      icon: '⚖️',
      documents: ['Hinton_v_Capital_One_initial_complaint.pdf'],
    },
    {
      date: 'Mar 7, 2024',
      category: 'adverse-action',
      title: 'BoA Credit Limit Reduction',
      description: 'Bank of America Credit Limit Reduction',
      icon: '📉',
      documents: ['Doc 1'],
    },
    {
      date: 'Mar 6, 2024',
      category: 'adverse-action',
      title: 'Multiple Auto Loan Denials',
      description:
        'Capital One Auto Finance Denial and Chase Auto Loan Denial (Land Rover Naperville)',
      icon: '📉',
      documents: ['Doc 13', 'Doc 34'],
    },
    {
      date: 'Mar 3, 2024',
      category: 'adverse-action',
      title: 'ACC Modified Offer',
      description: 'American Credit Acceptance Denial/Modified Offer',
      icon: '📉',
      documents: ['Doc 17'],
    },
    {
      date: 'Mar 1, 2024',
      category: 'legal',
      title: 'CLRA Notice',
      description: 'CLRA Notice Letter Sent to Capital One',
      icon: '📤',
      documents: ['Doc 20 Exh A p.22'],
      ref: 'FAC Para 83',
    },
    // 2024 Events - Adverse Actions (Feb)
    {
      date: 'Feb 26, 2024',
      category: 'adverse-action',
      title: 'Multiple Denials',
      description: 'Ally Auto Financing Denial (Carmax) and LightStream/Truist Loan Denial',
      icon: '📉',
      documents: ['Doc 5', 'Doc 29'],
    },
    {
      date: 'Feb 13, 2024',
      category: 'adverse-action',
      title: 'Auto Financing Denial',
      description: 'Huebner Chevrolet Financing Denial',
      icon: '📉',
      documents: ['Doc 2'],
    },
    {
      date: 'Feb 8, 2024',
      category: 'adverse-action',
      title: 'Student Loan Denial',
      description: 'PA Forward Student Loan Denial',
      icon: '📉',
      documents: ['Doc 15'],
    },
    {
      date: 'Feb 5, 2024',
      category: 'adverse-action',
      title: 'Credit Limit Reduction',
      description: 'Citi Credit Limit Reduction',
      icon: '📉',
      documents: ['Doc 18'],
    },
    {
      date: 'Feb 1, 2024',
      category: 'dispute',
      title: 'Second Equifax Dispute',
      description: 'Second Dispute Sent to Equifax',
      icon: '📤',
      ref: 'FAC Para 27',
    },
    // 2024 Events - Adverse Actions (Jan)
    {
      date: 'Jan 31, 2024',
      category: 'adverse-action',
      title: 'Chase Auto Denial',
      description: 'Chase Auto Loan Denial',
      icon: '📉',
      documents: ['Docs 8, 9'],
    },
    {
      date: 'Jan 30, 2024',
      category: 'adverse-action',
      title: 'OneMain Denial',
      description: 'OneMain Financial Loan Denial',
      icon: '📉',
      documents: ['Doc 33'],
    },
    {
      date: 'Jan 25, 2024',
      category: 'dispute',
      title: 'Capital One Dispute',
      description: 'Faxed Dispute to Capital One (Requesting Charge-Off Removal)',
      icon: '📤',
      ref: 'FAC Para 29',
    },
    {
      date: 'Jan 24, 2024',
      category: 'adverse-action',
      title: 'Student Loan Denial',
      description: 'MPOWER/Bank of Lake Mills Student Loan Denial',
      icon: '📉',
      documents: ['Doc 19'],
    },
    {
      date: 'Jan 23, 2024',
      category: 'adverse-action',
      title: 'Multiple Financial Actions',
      description: 'Earnest Loan Denial and American Express Preset Spending Limit Assigned',
      icon: '📉',
      documents: ['Doc 21', 'Doc 25, 35'],
    },
    {
      date: 'Jan 19, 2024',
      category: 'credit-alert',
      title: 'Credit Score Drop',
      description: 'Credit Score Drop Alert (-75 points since Oct 2023)',
      icon: '📉',
      documents: ['Doc 11'],
    },
    {
      date: 'Jan 19, 2024',
      category: 'dispute',
      title: 'Capital One Dispute',
      description: 'Direct Dispute Notice to Capital One',
      icon: '📤',
      ref: 'FAC Para 28',
    },
    {
      date: 'Jan 18, 2024',
      category: 'adverse-action',
      title: 'Chase Limit Reductions',
      description: 'Chase Credit Limit Reductions',
      icon: '📉',
      documents: ['Docs 3, 4'],
    },
    {
      date: 'Jan 16, 2024',
      category: 'adverse-action',
      title: 'Apple Card Reduction',
      description: 'Apple Card/Goldman Sachs Credit Limit Reduction',
      icon: '📉',
      documents: ['Doc 16'],
    },
    {
      date: 'Jan 10, 2024',
      category: 'dispute',
      title: 'Capital One Dispute',
      description: 'Direct Dispute Notice to Capital One',
      icon: '📤',
      ref: 'FAC Para 28',
    },
    {
      date: 'Jan 3, 2024',
      category: 'adverse-action',
      title: 'BoA Limit Reduction',
      description: 'Bank of America Credit Limit Reduction',
      icon: '📉',
      documents: ['Doc 14'],
    },
    // 2023 Events
    {
      date: 'Dec 31, 2023',
      category: 'dispute',
      title: 'Initial CRA Disputes',
      description: 'First Dispute Sent to CRAs (Experian, TransUnion, Equifax)',
      icon: '📤',
      ref: 'FAC Para 24',
    },
    {
      date: 'Dec 10, 2023',
      category: 'credit-report',
      title: 'Account Charged-Off',
      description: 'Capital One reports account as "Charged-Off"',
      icon: '📉',
      ref: 'FAC Para 21',
    },
    {
      date: 'Nov 20, 2023',
      category: 'credit-report',
      title: '90 Days Past Due',
      description: 'Capital One Reports Past Due (90 Days)',
      icon: '📉',
      ref: 'FAC Para 20',
    },
    {
      date: 'Oct 19, 2023',
      category: 'credit-report',
      title: '60 Days Past Due',
      description: 'Capital One Reports Past Due (60 Days)',
      icon: '📉',
      ref: 'FAC Para 20',
    },
    {
      date: 'Sep 18, 2023',
      category: 'credit-report',
      title: '30 Days Past Due',
      description: 'Capital One Reports Past Due (30 Days)',
      icon: '📉',
      ref: 'FAC Para 20',
    },
    {
      date: 'Aug 2023',
      category: 'retaliation',
      title: 'Portal Access Restricted',
      description: 'Capital One allegedly restricted online payment portal access',
      icon: '🔒',
      ref: 'FAC Para 19',
    },
    {
      date: 'Jul 2023',
      category: 'legal',
      title: 'Initial Georgia Lawsuit',
      description:
        'Initial Lawsuit Filed (Georgia) - Against car dealership & Capital One Auto Financing',
      icon: '⚖️',
      ref: 'FAC Para 18',
    },
    {
      date: 'Nov 2022 - May 2023',
      category: 'vehicle',
      title: 'Vehicle Issues',
      description: 'Tesla experienced unresolved service issues',
      icon: '🚗',
      ref: 'FAC Para 18',
    },
    {
      date: 'Nov 9, 2022',
      category: 'transaction',
      title: 'Initial Transaction',
      description: 'Plaintiff purchased Tesla, financed via Capital One',
      icon: '📄',
      ref: 'FAC Para 17',
    },
  ];

  // Sort timeline events by date in chronological order
  const sortedTimelineEvents = [...timelineEvents].sort((a, b) => {
    // Convert date strings to Date objects for proper comparison
    const dateA = new Date(a.date.includes('-') ? a.date : `${a.date.split(' ')[0]} 1, ${a.date.split(' ')[1]}`);
    const dateB = new Date(b.date.includes('-') ? b.date : `${b.date.split(' ')[0]} 1, ${b.date.split(' ')[1]}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hinton v. Capital One (2:24-cv-03039-CBM-JPR)</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive timeline of case events and milestones
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 border rounded-md bg-background w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="default" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {sortedTimelineEvents.map((event, index) => (
              <div key={index} className="mb-8 flex gap-8">
                {/* Date Column */}
                <div className="w-32 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                </div>

                {/* Event Content */}
                <div className="flex-1">
                  <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{event.icon}</span>
                          <h3 className="text-lg font-medium">{event.title}</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                        {event.ref && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            Reference: {event.ref}
                          </p>
                        )}
                        {event.documents && event.documents.length > 0 && (
                          <div className="mt-4">
                            <div className="text-xs text-muted-foreground mb-2">
                              Related Documents:
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {event.documents.map((doc, idx) => (
                                <Button key={idx} variant="outline" size="sm" className="text-xs">
                                  {doc}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground capitalize">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
