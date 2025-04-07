
import React from 'react';
import { 
  AlertCircle, 
  FileText, 
  Calendar, 
  DollarSign, 
  ChevronDown, 
  ChevronRight,
  Briefcase,
  Clock,
  UserCheck,
  Scale,
  BarChart2,
  Download,
  Phone,
  ExternalLink,
  Info,
  CheckCircle2,
  School,
  BriefcaseBusiness
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DamagesStrengthSection from '@/components/dashboard/damages-strength-section';

export default function CaseSummary() {
  const [activeSection, setActiveSection] = React.useState("overview");

  return (
    <div className="pb-8">
      {/* Urgent Banner */}
      <div className="bg-red-600 text-white px-4 py-3 mb-6 rounded-md animate-pulse">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">URGENT: Successor Counsel Needed</p>
          </div>
          <Button size="sm" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-red-600">
            <Phone className="h-4 w-4 mr-2" />
            Contact to Represent
          </Button>
        </div>
      </div>

      {/* Case Header */}
      <header className="mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-b pb-6 mb-6">
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Hinton v. Capital One</h1>
                <p className="mt-1 text-lg text-muted-foreground">Case No. 2:24-cv-03039-CBM-JPR</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1">
                    FCRA (15 USC §1681)
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1">
                    CCRAA (CCP §1785)
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1">
                    UCL (B&P §17200)
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-medium px-2.5 py-1">
                    RFDCPA (CC §1788)
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Complaint
                </Button>
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Case Brief
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Case Overview</TabsTrigger>
          <TabsTrigger id="damages-tab" value="damages">Damages & Case Strength</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Case Overview */}
            <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Scale className="h-5 w-5 mr-2 text-blue-600" />
                Case Overview
              </CardTitle>
              <CardDescription>
                Credit reporting violations involving multiple CRAs and furnishers
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-2">
              <p className="text-sm text-muted-foreground">
                This case centers on Capital One Financial Corporation's alleged retaliatory conduct following Plaintiff Nyree Hinton's initial lawsuit against the company in July 2023. In a direct and punitive response, Capital One restricted Plaintiff's access to his online account and falsely reported his Tesla auto loan as delinquent and subsequently charged-off—despite ongoing disputes and communications. These derogatory credit entries triggered a cascade of financial, professional, and personal consequences that continue to reverberate.
              </p>
            </div>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Key Issues</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Capital One's alleged retaliatory conduct following initial July 2023 lawsuit</li>
                  <li>Restricted plaintiff's online account access and falsely reported auto loan as delinquent</li>
                  <li>43 separate adverse credit actions across 24+ financial institutions</li>
                  <li>Harvard Extension School withdrawal due to loss of educational financing</li>
                  <li>Documented economic loss exceeding $2.57 million with detailed quantification</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-md font-medium mb-2">Case Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 rounded-md p-3">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Current Stage</p>
                    <p className="text-sm">Active litigation against Capital One as sole remaining defendant; urgently seeking successor counsel</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 rounded-md p-3">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Settlements</p>
                    <p className="text-sm">Successfully settled with all three major credit reporting agencies; Capital One remains unresolved</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-md font-medium mb-2">Critical Facts</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Capital One falsely reported Tesla auto loan as delinquent and charged-off despite ongoing disputes</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Events coincided with birth of plaintiff's child in September 2023, magnifying stress and instability</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Current counsel withdrew immediately after failed mediation on April 3, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                Client Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Professional Background</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Harvard University (withdrew due to funding denial)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Business owner (The AI Remedy)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Previously maintained unblemished credit history</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Case Preparation</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>Comprehensive timeline and documentation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>38 adverse action notices collected and organized</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>Quantified financial damages with thorough methodology</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Damages & Case Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Infographic-style Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 rounded-md p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600/10 rounded-full">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">$2.57M</h3>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Total Claimed Damages</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 rounded-md p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600/10 rounded-full">
                        <School className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">$1.14M</h3>
                        <p className="text-xs text-purple-600 dark:text-purple-400">Harvard Withdrawal Impact</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 rounded-md p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-600/10 rounded-full">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-red-700 dark:text-red-300">43</h3>
                        <p className="text-xs text-red-600 dark:text-red-400">Adverse Credit Actions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Settlement Offer */}
                <div className="border-2 border-amber-400 bg-amber-50 dark:bg-amber-950 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 flex items-center">
                        <BriefcaseBusiness className="h-4 w-4 mr-2 text-amber-600" />
                        Settlement Offer (February 2025)
                      </h3>
                      <h4 className="text-lg font-bold text-amber-800 dark:text-amber-300 mt-1">$785,000</h4>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                        Based on documented pecuniary damages; excludes non-economic damages
                      </p>
                    </div>
                    <Badge className="bg-amber-600 text-white">Rejected</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 dark:bg-amber-950 rounded-md p-4">
                    <h4 className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-2">Key Pecuniary Damages</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Harvard Withdrawal</span>
                        <span className="font-medium">$1,142,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Increased costs (interest, fees)</span>
                        <span className="font-medium">$210,425</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Out-of-pocket expenses</span>
                        <span className="font-medium">$23,650</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950 rounded-md p-4">
                    <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">Case Strength Indicators</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        <span>3 of 4 defendants settled (all CRAs)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        <span>43 adverse action notices documented</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        <span>Economic expert report available</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800 dark:text-blue-300">Potential Recovery</AlertTitle>
                  <AlertDescription className="text-blue-700 dark:text-blue-400">
                    FCRA permits actual damages + punitive damages for willful violations, along with attorney fees and costs. Statutory and punitive damages estimated at $1.08M.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => document.getElementById('damages-tab')?.click()}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                View Full Damages & Case Strength Analysis
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Case Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-gray-200 dark:border-gray-700 pl-6 ml-3 space-y-6">
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-red-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 3, 2025</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Mediation Failed & Counsel Withdrawing</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current counsel notified of intent to withdraw after failed mediation</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-green-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Late 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Equifax Settlement</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reached settlement agreement with Equifax</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-green-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 24, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">TransUnion Settlement</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Signed settlement agreement with TransUnion</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-green-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 10, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Experian Settlement</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Signed settlement agreement with Experian</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">June 4, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">First Amended Complaint Filed</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Filed in U.S. District Court (C.D. Cal.) after removal/refiling</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 11, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Initial Lawsuit Filed</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Filed in California Superior Court, Los Angeles County</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-amber-500"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 1, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">CLRA Notice Letter</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sent to Capital One</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-gray-400"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Dec 2023 - Mar 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Multiple Disputes</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sent to CRAs and Capital One</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-red-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 10, 2023</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Account Charged-Off</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Capital One reported account as "Charged-Off"</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Clock className="h-4 w-4 mr-2" />
                View Complete Timeline
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                Case Strength Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Strong Settlement Record</h4>
                <p className="text-xs text-green-600 dark:text-green-400">Successfully settled with all three major CRAs (Experian, TransUnion, Equifax)</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Documented Adverse Actions</h4>
                <p className="text-xs text-green-600 dark:text-green-400">38 adverse action notices showing direct impact of inaccurate reporting</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Detailed Damages Analysis</h4>
                <p className="text-xs text-green-600 dark:text-green-400">Comprehensive framework for assessing both pecuniary and non-pecuniary damages</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md">
                <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Client Preparation</h4>
                <p className="text-xs text-green-600 dark:text-green-400">Well-documented case with organized evidence and timeline ready for successor counsel</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Review Full Case Assessment
              </Button>
            </CardFooter>
          </Card>
          
          
        </div>
      </div>
        </TabsContent>
        
        <TabsContent value="damages">
          <DamagesStrengthSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
