import { CreditReportsProvider } from '@/contexts/CreditReportsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CreditReportsProvider>{children}</CreditReportsProvider>
    </QueryClientProvider>
  );
}
