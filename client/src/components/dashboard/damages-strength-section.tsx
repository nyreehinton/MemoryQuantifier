
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart2, Calendar, DollarSign, FileText, AlertCircle, CheckCircle2, User, School, BriefcaseBusiness } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const DamagesStrengthSection = () => {
  const [selectedExhibit, setSelectedExhibit] = useState<string | null>(null);
  
  const handleViewExhibit = (exhibit: string) => {
    setSelectedExhibit(exhibit === selectedExhibit ? null : exhibit);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Damages & Case Strength</h2>
      
      {/* Infographic-style Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 rounded-full">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300">$2.57M</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Claimed Damages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600/10 rounded-full">
                <School className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-300">$1.14M</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">Harvard Withdrawal Impact</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600/10 rounded-full">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-700 dark:text-red-300">43</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Adverse Credit Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Settlement Offer Callout */}
      <Card className="border-2 border-amber-400 bg-amber-50 dark:bg-amber-950">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-amber-800 dark:text-amber-300">
            <BriefcaseBusiness className="h-5 w-5 mr-2 text-amber-600" />
            Settlement Offer (February 2025)
          </CardTitle>
          <CardDescription className="text-amber-700 dark:text-amber-400">
            Excludes non-economic damages
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-bold text-amber-800 dark:text-amber-300">$785,000</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                Based on documented pecuniary damages and statutory penalties
              </p>
            </div>
            <Badge className="bg-amber-600 text-white">Rejected</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Offer includes confidentiality provisions and waiver of punitive damages claims
          </p>
        </CardFooter>
      </Card>
      
      {/* Interactive Accordions for Exhibits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exhibit A */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Exhibit A: Financial Harm Breakdown
            </CardTitle>
            <CardDescription>
              Itemized calculation of economic damages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">
                  Opportunity Costs (PEC-OPP)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>PEC-OPP-01: Harvard Withdrawal</span>
                      <span className="font-semibold">$1,142,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-OPP-02: Vehicle Replacement</span>
                      <span className="font-semibold">$68,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-OPP-03: Missed Investment</span>
                      <span className="font-semibold">$32,750</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Opportunity Costs</span>
                      <span>$1,243,250</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">
                  Increased Costs (PEC-COST)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>PEC-COST-01 to 08: Credit Limit Claims</span>
                      <span className="font-semibold">$42,875</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-COST-09 to 16: Auto Loan Claims</span>
                      <span className="font-semibold">$28,350</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-COST-17 to 24: Personal Loan Claims</span>
                      <span className="font-semibold">$54,200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-COST-25: Credit Score Impact</span>
                      <span className="font-semibold">$85,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Increased Costs</span>
                      <span>$210,425</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm">
                  Out of Pocket Expenses (PEC-OOP)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>PEC-OOP-01 to 06: Investigation Costs</span>
                      <span className="font-semibold">$12,850</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-OOP-07 to 12: Credit Monitoring</span>
                      <span className="font-semibold">$3,240</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PEC-OOP-13 to 15: Alternative Transportation</span>
                      <span className="font-semibold">$7,560</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Out of Pocket</span>
                      <span>$23,650</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm">
                  Statutory & Punitive Damages
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>FCRA (Willful Violations)</span>
                      <span className="font-semibold">$950,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CCRAA (Statutory per Violation)</span>
                      <span className="font-semibold">$86,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>RFDCPA (Statutory)</span>
                      <span className="font-semibold">$52,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Statutory/Punitive</span>
                      <span>$1,088,000</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleViewExhibit('A')}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Detailed Quantification
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Exhibit B */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Exhibit B: Supporting Documentation
            </CardTitle>
            <CardDescription>
              Key evidence validating damage claims
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">
                  Harvard Withdrawal Evidence
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Harvard Acceptance Letter</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-01-15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Financial Aid Denial (Sallie Mae)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-02-12</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Harvard Withdrawal Confirmation</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-02-28</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Expert Economist Report</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-05-12</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm">
                  Credit Report Evidence
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Pre-Incident Credit Reports (3 CRAs)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2023-11-10</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Post-Incident Credit Reports (3 CRAs)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-01-19</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Credit Score Timeline Analysis</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-03-08</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-sm">
                  Adverse Action Notices
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Loan Denials (16 incidents)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-03-15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Credit Limit Reductions (14 incidents)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-02-20</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Housing Rental Rejections (5 incidents)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-01-25</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Employment Impact (8 incidents)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-04-10</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-sm">
                  Dispute Correspondence
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Dispute Letters to CRAs (12 letters)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2023-12-28</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Capital One Correspondence (9 records)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-01-15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">CRA Investigation Results (6 reports)</p>
                        <p className="text-xs text-muted-foreground">PDF - Verified 2024-02-08</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleViewExhibit('B')}
              >
                <FileText className="h-4 w-4 mr-2" />
                View Supporting Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Document Preview (conditionally rendered) */}
      {selectedExhibit && (
        <Card className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              Exhibit {selectedExhibit}: {selectedExhibit === 'A' ? 'Financial Harm Breakdown' : 'Supporting Documentation'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setSelectedExhibit(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="h-16 w-16 mx-auto text-slate-400" />
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  Document preview would load here, showing {selectedExhibit === 'A' ? 'detailed damage quantification' : 'supporting evidence documentation'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Case Timeline with Personal Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-600" />
            Litigation Timeline & Personal Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-gray-200 dark:border-gray-700 pl-6 ml-3 space-y-6">
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">July 2023</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Initial Legal Filing</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Original complaint filed in California Superior Court</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-red-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 2023</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Account Charged-Off</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Capital One reported account as "Charged-Off" despite ongoing disputes</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-purple-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">January 2024</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center">
                Birth of Child
                <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Personal Impact</Badge>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">First child born amidst financial disruption and credit crisis</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-red-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2024</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Harvard Withdrawal</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Forced withdrawal from Harvard due to financing denial</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">June 2024</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Amended Complaint Filed</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">First Amended Complaint filed in U.S. District Court</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-green-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2024</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">CRA Settlements</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Successful settlements with Experian and TransUnion</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-amber-500"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2025</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Settlement Offer Received</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">$785,000 offer from Capital One (rejected)</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2025</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Tesla Class Action</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Named as lead plaintiff in Tesla class action credit reporting case</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-red-600"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 2025</time>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Mediation Failed & Counsel Withdrawing</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current counsel notified of intent to withdraw after failed mediation</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Documentation Readiness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
            Documentation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Harvard Withdrawal Impact (PEC-OPP-01)</span>
                <span className="text-sm font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Credit Limit Claims (PEC-COST-02 to 08)</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Auto Loan Claims (PEC-COST-09 to 16)</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Personal Loan Claims (PEC-COST-17 to 24)</span>
                <span className="text-sm font-medium">76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Credit Score Impact (PEC-COST-25)</span>
                <span className="text-sm font-medium">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Adverse Action Notices (43 total)</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            
            <Alert className="mt-4 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <AlertTitle className="text-blue-800 dark:text-blue-300">Expert Opinion Available</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Economic expert report available supporting damages calculations and causation analysis.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DamagesStrengthSection;
