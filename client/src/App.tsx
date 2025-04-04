import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout/layout";
import Dashboard from "@/pages/dashboard";
import AdverseActions from "@/pages/adverse-actions";
import DamagesQuantification from "@/pages/damages-quantification";
import CreditReports from "@/pages/credit-reports";
import Tasks from "@/pages/tasks";
import Reports from "@/pages/reports";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/adverse-actions" component={AdverseActions} />
        <Route path="/damages-quantification" component={DamagesQuantification} />
        <Route path="/credit-reports" component={CreditReports} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/reports" component={Reports} />
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
