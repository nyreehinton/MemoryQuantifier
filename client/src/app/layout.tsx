import { CreditReportsProvider } from '@/contexts/CreditReportsContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CreditReportsProvider>{children}</CreditReportsProvider>
      </body>
    </html>
  );
}
