
import React, { useState } from 'react';
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
  BarChart2
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

export default function CaseSummary() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Urgent Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Urgent: Settlement Response Deadline</h3>
            <div className="mt-1 text-sm text-red-700">
              Response to Capital One settlement offer due <strong>October 15, 2024</strong> (18 days remaining)
            </div>
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
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Complaint
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Contact Client
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Client Credibility Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Client Case Support</h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              All case documents have been organized, indexed, and digitized. Comprehensive damages calculations and credit report analyses are ready for review. Two CRAs have already settled.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Filed</p>
                    <p className="text-sm">April 27, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Phase</p>
                    <p className="text-sm">Pre-trial/Settlement</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Settlement Progress</p>
                    <p className="text-sm">2 of 3 CRAs settled</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Deadline</p>
                    <p className="text-sm font-semibold text-red-600">October 15, 2024</p>
                  </div>
                </div>
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
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 24, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Settlement with TransUnion</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Signed settlement agreement including financial compensation and corrections</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-blue-600"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 10, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Settlement with Experian</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reached settlement terms resolving all claims against Experian</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-yellow-500"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">June 4, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Amended Complaint Filed</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Added additional claims based on continued reporting of inaccurate information</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-gray-400"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 27, 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Initial Complaint Filed</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Filed in U.S. District Court for Central District of California</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-gray-400"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2024</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Second Round of Disputes</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Additional disputes filed with all three major CRAs</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-9 mt-1.5 h-4 w-4 rounded-full border border-white bg-gray-400"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 2023</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Initial Disputes Filed</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Formal disputes filed with Experian, TransUnion, and Equifax</p>
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

        {/* Right Column - Damages & Documents */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Damages Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <BarChart2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-400">Comprehensive Damages Analysis</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-500 text-sm">
                  Detailed calculations and documentation provided for all damages categories.
                </AlertDescription>
              </Alert>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm font-medium">
                    Economic Damages
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Increased APR Costs:</span>
                        <span className="font-medium">$12,450</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Denied Credit Opportunities:</span>
                        <span className="font-medium">$8,200</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Additional Fees & Charges:</span>
                        <span className="font-medium">$3,780</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Total Economic:</span>
                        <span className="font-bold">$24,430</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm font-medium">
                    Statutory Damages
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>FCRA ($100-$1,000 per violation):</span>
                        <span className="font-medium">$9,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>CCRAA (up to $5,000 per violation):</span>
                        <span className="font-medium">$15,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Total Statutory:</span>
                        <span className="font-bold">$24,000</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm font-medium">
                    Non-Economic Damages
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Emotional Distress:</span>
                        <span className="font-medium">$10,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Loss of Opportunity:</span>
                        <span className="font-medium">$5,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-medium">Total Non-Economic:</span>
                        <span className="font-bold">$15,000</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total Potential Damages:</span>
                  <span className="text-blue-600">$63,430</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Plus attorney's fees and costs under fee-shifting provisions</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Detailed Damages Report
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Key Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Amended Complaint</p>
                      <p className="text-xs text-muted-foreground">Filed June 4, 2024</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Experian Settlement Agreement</p>
                      <p className="text-xs text-muted-foreground">Signed Sept 10, 2024</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">TransUnion Settlement Agreement</p>
                      <p className="text-xs text-muted-foreground">Signed Sept 24, 2024</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Credit Report Analysis</p>
                      <p className="text-xs text-muted-foreground">Updated Sept 28, 2024</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-2 hover:bg-accent rounded-md transition-colors">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Damages Calculation Methodology</p>
                      <p className="text-xs text-muted-foreground">Updated Sept 30, 2024</p>
                    </div>
                  </a>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Documents
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800 mb-8">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Ready to Represent This Case?</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 max-w-2xl mx-auto">
            All case materials are organized and digitized. Client is prepared to cooperate fully with counsel and has maintained detailed records throughout the process.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg">
              Request Case Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
