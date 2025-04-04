import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Printer, FileDown, File, Calendar } from "lucide-react";
import { useState } from "react";

export default function Reports() {
  const [reportType, setReportType] = useState("case-summary");

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reporting & Sharing</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={reportType} onValueChange={setReportType}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="case-summary">Case Summary</TabsTrigger>
              <TabsTrigger value="adverse-actions">Adverse Actions</TabsTrigger>
              <TabsTrigger value="damages">Damages</TabsTrigger>
              <TabsTrigger value="credit-reports">Credit Reports</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="case-summary">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Report Options</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="include-metrics" className="mr-2" defaultChecked />
                        <label htmlFor="include-metrics" className="text-sm">Include Overview Metrics</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-actions" className="mr-2" defaultChecked />
                        <label htmlFor="include-actions" className="text-sm">Include Adverse Actions</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-damages" className="mr-2" defaultChecked />
                        <label htmlFor="include-damages" className="text-sm">Include Damages Summary</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-outstanding" className="mr-2" defaultChecked />
                        <label htmlFor="include-outstanding" className="text-sm">Include Outstanding Documents List</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="include-nonpecuniary" className="mr-2" defaultChecked />
                        <label htmlFor="include-nonpecuniary" className="text-sm">Include Non-Pecuniary Evidence Points</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Date Range</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Start Date"
                          className="pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                      <span className="text-sm">to</span>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="End Date"
                          className="pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <FileDown className="h-4 w-4 mr-2" />
                    Generate Case Summary Report
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="adverse-actions">
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                Adverse Actions Report Configuration
              </div>
            </TabsContent>
            
            <TabsContent value="damages">
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                Damages Report Configuration
              </div>
            </TabsContent>
            
            <TabsContent value="credit-reports">
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                Credit Reports Report Configuration
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                Timeline Report Configuration
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <File className="h-5 w-5 mr-2" /> Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm border-b pb-2">
                <div className="font-medium">Case Summary (Full)</div>
                <div className="text-xs text-muted-foreground flex justify-between mt-1">
                  <span>Generated: Jun 5, 2024</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0">Download</Button>
                </div>
              </li>
              <li className="text-sm border-b pb-2">
                <div className="font-medium">Damages Quantification</div>
                <div className="text-xs text-muted-foreground flex justify-between mt-1">
                  <span>Generated: Jun 1, 2024</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0">Download</Button>
                </div>
              </li>
              <li className="text-sm">
                <div className="font-medium">Outstanding Documents</div>
                <div className="text-xs text-muted-foreground flex justify-between mt-1">
                  <span>Generated: May 22, 2024</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0">Download</Button>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" /> Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center py-12 text-muted-foreground text-sm">
              No scheduled reports configured
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Download className="h-5 w-5 mr-2" /> Export Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <File className="h-4 w-4 mr-2" />
                Export Adverse Actions (CSV)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <File className="h-4 w-4 mr-2" />
                Export Credit Reports (CSV)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <File className="h-4 w-4 mr-2" />
                Export Damages (CSV)
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <File className="h-4 w-4 mr-2" />
                Export Tasks (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
