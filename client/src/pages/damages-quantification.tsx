import DamagesHub from '@/components/dashboard/damages-hub';
import { Providers } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { Download, FilePlus } from 'lucide-react';

export default function DamagesQuantification() {
  return (
    <Providers>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Damages Quantification Hub</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <FilePlus className="h-4 w-4 mr-2" />
              Add Claim
            </Button>
          </div>
        </div>

        <DamagesHub />
      </section>
    </Providers>
  );
}
