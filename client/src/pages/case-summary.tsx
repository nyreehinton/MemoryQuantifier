
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
  Info
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
          <TabsTrigger value="damages">Damages & Case Strength</TabsTrigger>
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
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Key Issues</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Failure to correct inaccurate information after disputes (FCRA violations)</li>
                  <li>Continued reporting of inaccurate accounts despite consumer disputes</li>
                  <li>Improper investigation procedures by credit reporting agencies</li>
                  <li>Negligent and willful noncompliance with federal and state laws</li>
                  <li>Substantial damages from lost credit opportunities and increased costs</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-md font-medium mb-2">Case Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 rounded-md p-3">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Current Stage</p>
                    <p className="text-sm">Active litigation against Capital One; seeking successor counsel following mediation failure</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 rounded-md p-3">
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Settlements</p>
                    <p className="text-sm">Successfully settled with all three major credit reporting agencies (Experian, TransUnion, Equifax)</p>
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
                    <p className="text-sm">Capital One allegedly reported account as "charged-off" on Dec 10, 2023 despite ongoing disputes</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Multiple documented adverse actions affecting credit lines, loan applications from Jan-Apr 2024</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Mediation with Capital One failed on April 3, 2025; current counsel withdrawing</p>
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
                Damages Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 dark:bg-amber-950 rounded-md p-4">
                    <h4 className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-2">Pecuniary Damages</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Increased costs (interest, fees)</span>
                        <span className="font-medium">PEC-COST</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Denied opportunities</span>
                        <span className="font-medium">PEC-OPP</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Out-of-pocket expenses</span>
                        <span className="font-medium">PEC-OOP</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950 rounded-md p-4">
                    <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">Non-Pecuniary Damages</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>Emotional distress</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Reputational harm</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Lost time/productivity</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800 dark:text-blue-300">Potential Recovery</AlertTitle>
                  <AlertDescription className="text-blue-700 dark:text-blue-400">
                    FCRA permits actual damages + punitive damages for willful violations, along with attorney fees and costs. Statutory damages under CCRAA and RFDCPA may also apply.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <BarChart2 className="h-4 w-4 mr-2" />
                View Detailed Damages Analysis
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
          
          <Card className="bg-slate-900 text-white shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Take Action Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">This case requires immediate successor counsel. Current counsel is withdrawing following failed mediation on April 3, 2025.</p>
              <p className="text-sm font-semibold">Benefits for successor counsel:</p>
              <ul className="text-sm space-y-1.5 list-disc ml-5">
                <li>Well-documented FCRA violations</li>
                <li>Quantifiable damages framework</li>
                <li>Prior successful settlements with CRAs</li>
                <li>Statutory attorney fees</li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full bg-white text-slate-900 hover:bg-gray-100">
                <Phone className="h-4 w-4 mr-2" />
                Contact to Discuss Representation
              </Button>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-slate-900">
                <Download className="h-4 w-4 mr-2" />
                Download Case Files
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
