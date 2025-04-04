import { Button } from "@/components/ui/button";
import { FilePlus, RefreshCcw, Download } from "lucide-react";
import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function Dashboard() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <FilePlus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
      
      <DashboardOverview />
    </section>
  );
}
