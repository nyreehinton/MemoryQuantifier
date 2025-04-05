import Layout from '@/components/layout/layout';
import { Toaster } from '@/components/ui/toaster';
import AdverseActions from '@/pages/adverse-actions';
import CaseNotes from '@/pages/case-notes';
import CaseSummary from '@/pages/case-summary';
import CreditReports from '@/pages/credit-reports';
import DamagesQuantification from '@/pages/damages-quantification';
import Documents from '@/pages/documents';
import NotFound from '@/pages/not-found';
import Reports from '@/pages/reports';
import Tasks from '@/pages/tasks';
import Timeline from '@/pages/timeline';
import { QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';
import { queryClient } from './lib/queryClient';

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={CaseSummary} />
        <Route path="/adverse-actions" component={AdverseActions} />
        <Route path="/damages-quantification" component={DamagesQuantification} />
        <Route path="/credit-reports" component={CreditReports} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/reports" component={Reports} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/case-notes" component={CaseNotes} />
        <Route path="/documents" component={Documents} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
