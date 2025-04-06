import CreditReportsTable from '@/components/dashboard/credit-reports-table';
import { Button } from '@/components/ui/button';
import { FilePlus, Filter } from 'lucide-react';

export default function CreditReports() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Credit Reports Tracker</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <FilePlus className="h-4 w-4 mr-2" />
            Add Report
          </Button>
        </div>
      </div>

      <CreditReportsTable />
    </section>
  );
}
