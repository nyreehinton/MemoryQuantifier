import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { useState } from 'react';

const CaseSummary = () => {
  const [selectedEvidence, setSelectedEvidence] = useState('PREQ-01');
  const [selectedAction, setSelectedAction] = useState('action-1');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Case Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold">Hinton v. Capital One</h1>
              <p className="mt-1 text-sm text-muted-foreground">Case No. 2:24-cv-03039-CBM-JPR</p>
              <div className="mt-3 flex gap-2 flex-wrap text-xs text-muted-foreground">
                <span className="px-2 py-1 rounded-md bg-accent/30 border border-border">
                  UCL (B&P §17200)
                </span>
                <span className="px-2 py-1 rounded-md bg-accent/30 border border-border">
                  CCRAA (CCP §1785)
                </span>
                <span className="px-2 py-1 rounded-md bg-accent/30 border border-border">
                  FCRA (15 USC §1681)
                </span>
                <span className="px-2 py-1 rounded-md bg-accent/30 border border-border">
                  RFDCPA (CC §1788)
                </span>
                <span className="px-2 py-1 rounded-md bg-accent/30 border border-border">
                  Good Faith & Fair Dealing
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Share
              </Button>
              <Button variant="default" size="sm">
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="card-concrete relative before:absolute before:-inset-[1px] before:rounded-lg before:border-2 before:border-yellow-500/50 before:pointer-events-none">
            <CardHeader>
              <CardTitle>Case Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-4">
                <p>
                  This case arose when Capital One allegedly retaliated against Plaintiff Nyree
                  Hinton by restricting online portal access and reporting his Tesla auto loan as
                  delinquent and later charged-off after he filed an initial lawsuit in Georgia
                  (July 2023).
                </p>
                <p>
                  These inaccurate credit reports subsequently triggered at least 38 documented
                  adverse actions from multiple creditors between January-April 2024, including
                  credit limit reductions, loan denials, and financing rejections. The resulting
                  damages include additional security deposits, increased interest rates, lost
                  deposits, and claimed educational opportunity costs related to Harvard withdrawal.
                </p>
                <p>
                  While settlements have been reached with all three major credit reporting
                  agencies, the case continues against Capital One, with urgent need for successor
                  counsel. The withdrawal notice from current representation after failed mediation
                  blindsided Mr. Hinton, despite his inquiry prior to mediation about counsel's
                  appetite for continued litigation should mediation fail.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-concrete">
            <CardHeader>
              <CardTitle>Key Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                <div className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Nyree Hinton</p>
                      <p className="text-xs text-muted-foreground">Plaintiff</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-md bg-blue-900/50 text-blue-200 border border-blue-700">
                      Active
                    </span>
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Capital One Financial Corporation</p>
                      <p className="text-xs text-muted-foreground">Primary Defendant</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-md bg-red-900/50 text-red-200 border border-red-700">
                      Active
                    </span>
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Experian Information Solutions, Inc.</p>
                      <p className="text-xs text-muted-foreground">Defendant</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-md bg-green-900/50 text-green-200 border border-green-700">
                      Settled
                    </span>
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Trans Union LLC</p>
                      <p className="text-xs text-muted-foreground">Defendant</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-md bg-green-900/50 text-green-200 border border-green-700">
                      Settled
                    </span>
                  </div>
                </div>
                <div className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Equifax Information Services LLC</p>
                      <p className="text-xs text-muted-foreground">Defendant</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-md bg-green-900/50 text-green-200 border border-green-700">
                      Settled
                    </span>
                  </div>
                </div>
                <div className="pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Todd M. Friedman, P.C.</p>
                      <p className="text-xs text-muted-foreground">Withdrawing Counsel</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-md bg-yellow-900/50 text-yellow-200 border border-yellow-700">
                      Withdrawing
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CRAs Status */}
        <div className="mt-4 mb-8">
          <Card className="card-concrete">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Credit Reporting Agencies</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-accent/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Experian</div>
                  <div className="text-sm font-medium text-green-400">Settled</div>
                  <div className="text-xs text-muted-foreground mt-1">Sep 10, 2024</div>
                </div>
                <div className="bg-accent/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">TransUnion</div>
                  <div className="text-sm font-medium text-green-400">Settled</div>
                  <div className="text-xs text-muted-foreground mt-1">Sep 24, 2024</div>
                </div>
                <div className="bg-accent/30 rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Equifax</div>
                  <div className="text-sm font-medium text-green-400">Settled</div>
                  <div className="text-xs text-muted-foreground mt-1">Dec 2024</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Widget */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="px-4 py-5 border-b sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium">Case Timeline</h3>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              View all
            </button>
          </div>

          <div
            className="flow-root p-4 overflow-hidden overflow-y-auto scrollbar-hide"
            style={{ maxHeight: '440px' }}
          >
            <ul className="-mb-8">
              {[
                {
                  emoji: '🚪',
                  title: 'Counsel Withdrawing',
                  description: 'Todd M. Friedman, P.C. notifies intent to withdraw',
                  date: 'Apr 3, 2025',
                },
                {
                  emoji: '❌',
                  title: 'Mediation Failed',
                  description: 'Mediation with Capital One deemed nuisance value',
                  date: 'Apr 3, 2025',
                },
                {
                  emoji: '✅',
                  title: 'Equifax Settlement',
                  description: 'Settlement agreement signed with Equifax',
                  date: 'Dec 2024',
                },
                {
                  emoji: '✅',
                  title: 'TransUnion Settlement',
                  description: 'Settlement agreement signed with TransUnion',
                  date: 'Sep 24, 2024',
                },
                {
                  emoji: '✅',
                  title: 'Experian Settlement',
                  description: 'Settlement agreement signed with Experian',
                  date: 'Sep 10, 2024',
                },
                {
                  emoji: '⚖️',
                  title: 'FAC Filed',
                  description: 'First Amended Complaint filed in U.S. District Court',
                  date: 'Jun 4, 2024',
                },
                {
                  emoji: '⚖️',
                  title: 'Initial Lawsuit Filed',
                  description: 'Filed in California Superior Court, Los Angeles',
                  date: 'Mar 11, 2024',
                },
                {
                  emoji: '📤',
                  title: 'CLRA Notice Sent',
                  description: 'CLRA Notice Letter Sent to Capital One',
                  date: 'Mar 1, 2024',
                },
                {
                  emoji: '📤',
                  title: 'Second Dispute to Equifax',
                  description: 'Follow-up dispute sent to Equifax',
                  date: 'Feb 1, 2024',
                },
                {
                  emoji: '📤',
                  title: 'Disputes to Capital One',
                  description: 'Multiple direct disputes sent to Capital One',
                  date: 'Jan 10-25, 2024',
                },
                {
                  emoji: '📉',
                  title: 'Charged-Off Account',
                  description: 'Capital One reports account as "Charged-Off"',
                  date: 'Dec 10, 2023',
                },
                {
                  emoji: '🔒',
                  title: 'Portal Access Restricted',
                  description:
                    'Capital One cuts off online portal access for loan management & payments',
                  date: 'Aug 2023',
                },
                {
                  emoji: '📄',
                  title: 'Initial Georgia Lawsuit',
                  description: 'Filed against car dealership & Capital One Auto Financing',
                  date: 'Jul 2023',
                },
                {
                  emoji: '📄',
                  title: 'Initial Transaction',
                  description: 'Plaintiff purchased Tesla, financed via Capital One',
                  date: 'Nov 9, 2022',
                },
              ].map((event, index) => (
                <li key={index} className="relative pb-8">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-border" />
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-background bg-muted">
                        {event.emoji}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">{event.date}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-3 bg-yellow-900/20 text-sm text-yellow-200 border-t border-yellow-800 rounded-b-lg">
            <span className="font-semibold">URGENT:</span> Successor counsel needed. Previous
            counsel blindsided plaintiff with withdrawal notice on April 3, 2025.
          </div>
        </div>

        {/* Document Repository Section */}
        <div className="mt-8">
          <Card className="card-concrete">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Case Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Complaint.pdf',
                    size: '3.6MB',
                    date: 'Apr 07, 2024',
                    description: 'Original complaint filing',
                    path: '/documents/doc-repo/Complaint.pdf',
                  },
                  {
                    name: 'Amended Complaint.pdf',
                    size: '604KB',
                    date: 'Apr 07, 2024',
                    description: 'Amended complaint with updated claims',
                    path: '/documents/doc-repo/Amended%20Complaint.pdf',
                  },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-start p-3 rounded-lg border bg-card/50">
                    <div className="bg-muted p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{doc.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="mr-3">{doc.size}</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="shrink-0 h-8" asChild>
                        <a href={doc.path} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" className="shrink-0 h-8" asChild>
                        <a href={doc.path} download={doc.name}>
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Footer */}
        <div className="mt-8 bg-card rounded-lg shadow-lg border p-4 text-center text-muted-foreground text-sm">
          <span>
            Case: 2:24-cv-03039-CBM-JPR • U.S. District Court, Central District of California •
            Hinton v. Capital One
          </span>
          <div className="mt-2 text-xs text-muted-foreground">
            Memory Quantifier Dashboard • Version 1.0.0
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseSummary;
