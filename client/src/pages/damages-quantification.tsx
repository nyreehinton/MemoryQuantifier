import DamagesHub from '@/components/dashboard/damages-hub';
import { Providers } from '@/components/providers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DamageItem } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, Clock, Download, FilePlus } from 'lucide-react';

export default function DamagesQuantification() {
  // Fetch damages data
  const { data: damages } = useQuery<DamageItem[]>({
    queryKey: ['/api/damages'],
  });

  // Calculate documentation status
  const documentationStatus = damages
    ? {
        creditLimitClaims: {
          title: 'Credit Limit Claims (PEC-COST-02 to 08)',
          total: 7,
          satisfied: {
            ie: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-0[2-8]$/) &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[IE]') && doc.status === 'Verified'
                )
            ).length,
            c: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-0[2-8]$/) &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[C]') && doc.status === 'Verified'
                )
            ).length,
            a: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-0[2-8]$/) &&
                d.required_documents.every(
                  (doc) => !doc.name.startsWith('[A]') || doc.status === 'Verified'
                )
            ).length,
          },
          details: 'Documentation status for credit limit reduction claims',
        },
        autoLoanClaims: {
          title: 'Auto Loan Claims (PEC-COST-09 to 16)',
          total: 8,
          satisfied: {
            ie: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-(09|1[0-6])$/) &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[IE]') && doc.status === 'Verified'
                )
            ).length,
            c: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-(09|1[0-6])$/) &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[C]') && doc.status === 'Verified'
                )
            ).length,
            a: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-(09|1[0-6])$/) &&
                d.required_documents.every(
                  (doc) => !doc.name.startsWith('[A]') || doc.status === 'Verified'
                )
            ).length,
          },
          details: 'Documentation status for auto loan denial claims',
        },
        personalLoanClaims: {
          title: 'Personal Loan Claims (PEC-COST-17 to 24)',
          total: 8,
          satisfied: {
            ie: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-(1[7-9]|2[0-4])$/) &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[IE]') && doc.status === 'Verified'
                )
            ).length,
            c: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-(1[7-9]|2[0-4])$/) &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[C]') && doc.status === 'Verified'
                )
            ).length,
            a: damages.filter(
              (d) =>
                d.id.match(/^PEC-COST-(1[7-9]|2[0-4])$/) &&
                d.required_documents.every(
                  (doc) => !doc.name.startsWith('[A]') || doc.status === 'Verified'
                )
            ).length,
          },
          details: 'Documentation status for personal loan denial claims',
        },
        creditScoreImpact: {
          title: 'Credit Score Impact (PEC-COST-25)',
          total: 1,
          satisfied: {
            ie: damages.filter(
              (d) =>
                d.id === 'PEC-COST-25' &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[IE]') && doc.status === 'Verified'
                )
            ).length,
            c: damages.filter(
              (d) =>
                d.id === 'PEC-COST-25' &&
                d.required_documents.some(
                  (doc) => doc.name.startsWith('[C]') && doc.status === 'Verified'
                )
            ).length,
            a: damages.filter(
              (d) =>
                d.id === 'PEC-COST-25' &&
                d.required_documents.every(
                  (doc) => !doc.name.startsWith('[A]') || doc.status === 'Verified'
                )
            ).length,
          },
          details: 'Documentation status for credit score impact claim',
        },
      }
    : null;

  return (
    <Providers>
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Damages Quantification Hub</h2>
            <p className="text-sm text-muted-foreground">
              Documentation Status Tracking for PEC-COST Claims
            </p>
          </div>
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

        {/* Documentation Status Cards */}
        {documentationStatus && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {Object.entries(documentationStatus).map(([key, status]) => (
              <Card key={key} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-4">
                  <CardTitle className="text-sm font-medium line-clamp-1">{status.title}</CardTitle>
                  {status.satisfied.ie === status.total &&
                  status.satisfied.c === status.total &&
                  status.satisfied.a === status.total ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : status.satisfied.ie === status.total &&
                    status.satisfied.c === status.total ? (
                    <Clock className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                </CardHeader>
                <CardContent className="px-3 sm:px-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-muted-foreground">[IE]</p>
                        <p className="text-base sm:text-lg font-semibold text-green-600">
                          {status.satisfied.ie}/{status.total}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-muted-foreground">[C]</p>
                        <p className="text-base sm:text-lg font-semibold text-green-600">
                          {status.satisfied.c}/{status.total}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-muted-foreground">[A]</p>
                        <p
                          className={`text-base sm:text-lg font-semibold ${
                            status.satisfied.a === status.total
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {status.satisfied.a}/{status.total}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                      {status.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <DamagesHub />
      </section>
    </Providers>
  );
}
