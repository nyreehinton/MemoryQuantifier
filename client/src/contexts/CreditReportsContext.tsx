import { createContext, useContext, useEffect, useState } from 'react';

export interface CreditReport {
  id: string; // e.g., 'PREQ-01-Ally-TU'
  agency: 'TransUnion' | 'Experian' | 'Equifax' | 'SageStream' | 'NCTUE' | 'NOWCOM';
  date: string;
  status: 'Needed' | 'Requested' | 'Received' | 'Verified' | 'N/A';
  institution: string;
  details: string;
}

export interface CreditReportNeed {
  id: string; // e.g., 'CR-NEED-01'
  agency: string;
  dateRange: string;
  reasonNeeded: string;
  documentIndices: (number | string)[]; // Can be numbers or "Context"/"ALL"
  status: string;
  contextProvidedBy?: string[];
  relatedDocuments: string[]; // PREQ-01-* IDs that satisfy this need
}

interface CreditReportState {
  needs: Record<string, CreditReportNeed>;
  documents: Record<string, CreditReport>;
  contextRelationships: Record<string, string[]>; // Maps report IDs to reports that provide context
}

interface CreditReportsContextType {
  creditReports: Record<string, CreditReport>;
  creditReportNeeds: Record<string, CreditReportNeed>;
  contextRelationships: Record<string, string[]>;
  updateCreditReport: (reportId: string, updates: Partial<CreditReport>) => void;
  updateCreditReportNeed: (needId: string, updates: Partial<CreditReportNeed>) => void;
  getCreditReportStatus: (reportId: string) => CreditReport['status'];
  getRelatedNeeds: (reportId: string) => CreditReportNeed[];
  getContextReports: (reportId: string) => string[];
}

const CreditReportsContext = createContext<CreditReportsContextType | null>(null);

export function CreditReportsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CreditReportState>({
    needs: {},
    documents: {},
    contextRelationships: {},
  });

  // Load initial credit reports and needs from data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch damages data for documents
      const damagesResponse = await fetch('/api/damages');
      const damages = await damagesResponse.json();

      // Fetch credit report needs data
      const needsResponse = await fetch('/api/credit-report-needs');
      const needs = await needsResponse.json();

      const documents: Record<string, CreditReport> = {};
      const contextRelationships: Record<string, string[]> = {};

      // Process damages data for credit report documents
      damages.forEach((damage: any) => {
        damage.required_documents
          .filter((doc: any) => doc.doc_id.startsWith('PREQ-01-'))
          .forEach((doc: any) => {
            if (!documents[doc.doc_id]) {
              documents[doc.doc_id] = {
                id: doc.doc_id,
                agency: extractAgency(doc.name),
                date: extractDate(doc.details),
                status: doc.status,
                institution: extractInstitution(doc.doc_id),
                details: doc.details,
              };
            }
          });
      });

      // Process needs data
      const processedNeeds: Record<string, CreditReportNeed> = {};
      needs.forEach((need: any) => {
        processedNeeds[need.report_need_id] = {
          id: need.report_need_id,
          agency: need.credit_reporting_agency,
          dateRange: need.report_date_range,
          reasonNeeded: need.reason_needed,
          documentIndices: need.document_index,
          status: need.status,
          contextProvidedBy: extractContextReports(need.status),
          relatedDocuments: [], // Will be populated based on document relationships
        };

        // Update context relationships
        if (need.status.includes('Context provided by')) {
          const contextReports = extractContextReports(need.status);
          contextReports.forEach((reportId) => {
            if (!contextRelationships[need.report_need_id]) {
              contextRelationships[need.report_need_id] = [];
            }
            contextRelationships[need.report_need_id].push(reportId);
          });
        }
      });

      setState({
        needs: processedNeeds,
        documents,
        contextRelationships,
      });
    };

    fetchData();
  }, []);

  const updateCreditReport = (reportId: string, updates: Partial<CreditReport>) => {
    setState((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [reportId]: {
          ...prev.documents[reportId],
          ...updates,
        },
      },
    }));
  };

  const updateCreditReportNeed = (needId: string, updates: Partial<CreditReportNeed>) => {
    setState((prev) => ({
      ...prev,
      needs: {
        ...prev.needs,
        [needId]: {
          ...prev.needs[needId],
          ...updates,
        },
      },
    }));
  };

  const getCreditReportStatus = (reportId: string) => {
    return state.documents[reportId]?.status || 'Needed';
  };

  const getRelatedNeeds = (reportId: string) => {
    return Object.values(state.needs).filter((need) => need.relatedDocuments.includes(reportId));
  };

  const getContextReports = (reportId: string) => {
    return state.contextRelationships[reportId] || [];
  };

  return (
    <CreditReportsContext.Provider
      value={{
        creditReports: state.documents,
        creditReportNeeds: state.needs,
        contextRelationships: state.contextRelationships,
        updateCreditReport,
        updateCreditReportNeed,
        getCreditReportStatus,
        getRelatedNeeds,
        getContextReports,
      }}
    >
      {children}
    </CreditReportsContext.Provider>
  );
}

export function useCreditReports() {
  const context = useContext(CreditReportsContext);
  if (!context) {
    throw new Error('useCreditReports must be used within a CreditReportsProvider');
  }
  return context;
}

// Helper functions
function extractAgency(name: string): CreditReport['agency'] {
  if (name.includes('TransUnion')) return 'TransUnion';
  if (name.includes('Experian')) return 'Experian';
  if (name.includes('Equifax')) return 'Equifax';
  if (name.includes('SageStream')) return 'SageStream';
  if (name.includes('NCTUE')) return 'NCTUE';
  if (name.includes('NOWCOM')) return 'NOWCOM';
  return 'TransUnion'; // Default case
}

function extractDate(details: string): string {
  const dateMatch = details.match(/around (\d{4}-\d{2}-\d{2})/);
  return dateMatch ? dateMatch[1] : '';
}

function extractInstitution(docId: string): string {
  const match = docId.match(/PREQ-01-(.+?)-(TU|EX|EQ|SS|NC|NW)/);
  return match ? match[1] : '';
}

function extractContextReports(status: string): string[] {
  const match = status.match(/Context provided by (.+?)(?:\)|$)/);
  if (!match) return [];

  return match[1].split('/').map((s) => s.trim());
}
