import { AlertTriangle, DollarSign, ChartBarStacked, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { formatCurrency } from "@/lib/utils";
import UrgentTasks from "./urgent-tasks";
import ActivityFeed from "./activity-feed";
import { useQuery } from "@tanstack/react-query";
import { AdverseAction } from "@/types";
import { CreditReport } from "@/types";
import { DamageItem } from "@/types";
import { Task } from "@/types";
import { Activity } from "@/types";

export default function DashboardOverview() {
  // Fetch all the necessary data
  const { data: adverseActions, isLoading: isLoadingActions } = useQuery<AdverseAction[]>({
    queryKey: ['/api/adverse-actions'],
  });
  
  const { data: creditReports, isLoading: isLoadingReports } = useQuery<CreditReport[]>({
    queryKey: ['/api/credit-reports'],
  });
  
  const { data: damages, isLoading: isLoadingDamages } = useQuery<DamageItem[]>({
    queryKey: ['/api/damages'],
  });
  
  const { data: tasks, isLoading: isLoadingTasks } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });
  
  const { data: activities, isLoading: isLoadingActivities } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });
  
  // Calculate metrics
  const totalAdverseActions = adverseActions?.length || 0;
  
  const outstandingReports = creditReports?.filter(
    report => report.status === "Outstanding"
  ).length || 0;
  
  const totalReports = creditReports?.length || 0;
  
  const totalDamages = damages?.reduce(
    (sum, item) => sum + (item.claimed_value || 0), 
    0
  ) || 0;
  
  const verifiedDamages = damages?.filter(item => item.status === "Verified")
    .reduce((sum, item) => sum + (item.claimed_value || 0), 0) || 0;
  
  const pendingDamages = damages?.filter(item => item.status === "Pending")
    .reduce((sum, item) => sum + (item.claimed_value || 0), 0) || 0;
  
  // Calculate case progress
  const totalDocuments = damages?.flatMap(d => d.required_documents).length || 0;
  const satisfiedDocuments = damages?.flatMap(d => d.required_documents)
    .filter(doc => doc.status === "Verified" || doc.status === "Received").length || 0;
  
  const satisfiedReports = creditReports?.filter(
    report => report.status === "Satisfied" || report.status === "Partially Satisfied"
  ).length || 0;
  
  // Overall progress is based on documents and reports
  const totalItems = totalDocuments + totalReports;
  const completedItems = satisfiedDocuments + satisfiedReports;
  const caseProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="ADVERSE ACTIONS"
          value={totalAdverseActions}
          subtitle="total documented"
          icon={AlertTriangle}
          iconColor="bg-blue-100 text-blue-600"
          progress={100}
          progressColor="bg-blue-500"
        />
        
        <MetricCard
          title="CREDIT REPORTS NEEDED"
          value={outstandingReports}
          subtitle={`of ${totalReports} outstanding`}
          icon={FileText}
          iconColor="bg-red-100 text-red-600"
          progress={((totalReports - outstandingReports) / totalReports) * 100}
          progressColor="bg-red-500"
        />
        
        <MetricCard
          title="POTENTIAL DAMAGES"
          value={formatCurrency(totalDamages)}
          subtitle="estimated"
          icon={DollarSign}
          iconColor="bg-green-100 text-green-600"
          footer={
            <div className="flex items-center text-xs text-muted-foreground space-x-4">
              <div className="flex items-center">
                <span className="inline-block h-3 w-3 mr-1 bg-green-500 rounded-full"></span>
                <span>Verified: {formatCurrency(verifiedDamages)}</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block h-3 w-3 mr-1 bg-yellow-500 rounded-full"></span>
                <span>Pending: {formatCurrency(pendingDamages)}</span>
              </div>
            </div>
          }
        />
        
        <MetricCard
          title="CASE PROGRESS"
          value={`${caseProgress}%`}
          subtitle="complete"
          icon={ChartBarStacked}
          iconColor="bg-purple-100 text-purple-600"
          footer={
            <div>
              <div className="grid grid-cols-4 gap-1 mt-2">
                <div className={`h-1.5 rounded ${caseProgress >= 25 ? "bg-green-500" : "bg-gray-200"}`}></div>
                <div className={`h-1.5 rounded ${caseProgress >= 50 ? "bg-green-500" : "bg-gray-200"}`}></div>
                <div className={`h-1.5 rounded ${caseProgress >= 75 ? "bg-green-500" : caseProgress >= 50 ? "bg-yellow-500" : "bg-gray-200"}`}></div>
                <div className={`h-1.5 rounded ${caseProgress >= 100 ? "bg-green-500" : "bg-gray-200"}`}></div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                <span>Evidence</span>
                <span>Reports</span>
                <span>Damages</span>
                <span>Complete</span>
              </div>
            </div>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UrgentTasks tasks={tasks?.filter(t => t.status === "To Do").slice(0, 5) || []} isLoading={isLoadingTasks} />
        <ActivityFeed activities={activities?.slice(0, 4) || []} isLoading={isLoadingActivities} />
      </div>
    </div>
  );
}
