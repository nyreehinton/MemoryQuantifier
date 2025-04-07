
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
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">URGENT: Successor Counsel Needed</p>
          </div>
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
              <p className="text-sm text-muted-foreground mt-3">
                Between late 2023 and early 2025, Mr. Hinton experienced 43 separate adverse credit actions across more than two dozen financial institutions, all referencing Capital One's delinquency reporting. These included auto loan and education financing denials, drastic credit line reductions, punitive rental terms, and an inability to refinance or secure new credit. Among the most severe outcomes was the forced withdrawal from Harvard Extension School due to the loss of educational financing—an event with lifelong economic and psychological implications.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                But the damages go far beyond credit score points and loan rejections. Mr. Hinton, who had maintained an impeccable credit history for over a decade, was thrust into a costly and emotionally draining process of regaining control over his financial identity. He has been forced to document, dispute, and remediate inaccurate data with banks, lenders, rental agencies, and even prospective employers. These events unfolded in parallel with the birth of his child in September 2023, magnifying the stress and instability during what should have been a time of security and support for his growing family.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Despite settlements with all three major credit bureaus, the case against Capital One remains ongoing. To date, no resolution has been reached for the direct harm their reporting caused. The plaintiff has presented detailed quantification of economic loss exceeding $2.57 million—supported by exhibits, adverse action notices, and a present-value calculation of lost educational opportunity alone amounting to over $1.1 million.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Mr. Hinton's current counsel withdrew immediately after a failed mediation session on April 3, 2025—despite prior inquiries regarding their commitment to litigation if mediation failed. As such, Mr. Hinton now seeks successor counsel who can see the gravity, credibility, and litigation value of this case. He brings to the table not only a strong factual record and a well-organized evidence base but a lived experience of systemic credit harm that continues to affect his life, family, and future every day.
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
              <CardTitle className="text-xl font-semibold flex items-center border-b-2 border-blue-500 pb-1">
                <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                Client Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border-2 border-blue-500">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Professional Background</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Capital Group: Data Product Manager, Enterprise Data Office</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Third Bridge Group: Sector Analyst, Consumer Staples</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Reorg Research: Data Analyst, M&A and Shareholder Activism</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>Bloomberg L.P.: Equity Research Data Analyst, TMT</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border-2 border-blue-500">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Education</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-600"></div>
                      <span>Bachelor's from Pennsylvania State University</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border-2 border-blue-500">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">Case Preparation</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>Comprehensive timeline and documentation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>43 adverse action notices collected and organized</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>Quantified financial damages with thorough methodology</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                      <span>Audio recording of Capital One rep confirming account restriction and advising it won't be removed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="mb-6 border-2 border-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-amber-500" />
                Case Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-3 border border-blue-300 rounded-md bg-blue-50 dark:bg-blue-900/30">
                <p className="text-sm">
                  I'm open to a resolution, a cash settlement to be determined on advice of counsel. My goal isn't endless litigation, or further litigation actually.
                </p>
              </div>
            </CardContent>
          </Card>
          
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
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">California Lawsuit Filed</h3>
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
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-amber-500"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">August 2023</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white border-2 border-amber-500 px-2 py-1 rounded-md inline-block">Portal Access Restricted</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Capital One allegedly restricted online payment portal access</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">July 2023</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Initial Georgia Lawsuit Filed</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Initial lawsuit filed against car dealership & Capital One in Georgia</p>
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
          
          
          
          
        </div>
      </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
