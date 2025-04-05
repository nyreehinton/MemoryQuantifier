import { ShieldCheck } from 'lucide-react';
import { ReactNode } from 'react';
import SidebarNavigation from './sidebar-navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md z-20">
        <div className="px-6 py-3 flex">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold">Hinton v. Capital One</h1>
              <p className="text-sm text-primary-foreground/80">
                Case: 2:24-cv-03039-CBM-JPR • U.S. District Court, Central District of California
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarNavigation />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">{children}</main>
      </div>
    </div>
  );
}
