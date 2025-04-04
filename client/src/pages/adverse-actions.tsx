import { Button } from "@/components/ui/button";
import { Search, Filter, FilePlus } from "lucide-react";
import AdverseActionsTable from "@/components/dashboard/adverse-actions-table";

export default function AdverseActions() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Adverse Actions Center</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <FilePlus className="h-4 w-4 mr-2" />
            Add Action
          </Button>
        </div>
      </div>
      
      <AdverseActionsTable />
    </section>
  );
}
