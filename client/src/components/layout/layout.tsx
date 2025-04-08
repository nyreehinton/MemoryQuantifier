import { ShieldCheck } from 'lucide-react';
import { ReactNode } from 'react';
import SidebarNavigation from './sidebar-navigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md z-20">
        <div className={`${isMobile ? 'px-3' : 'px-6'} py-3 flex flex-wrap`}>
          <div className="flex items-center space-x-2 w-full">
            <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-accent flex-shrink-0" />
            <div className="flex flex-col overflow-hidden max-w-[calc(100%-40px)]">
              <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold whitespace-nowrap overflow-hidden text-ellipsis`}>
                Hinton v. Capital One
              </h1>
              <p className={`text-sm text-primary-foreground/80 whitespace-nowrap overflow-hidden text-ellipsis ${isMobile ? 'text-xs' : ''}`}>
                {isMobile ? 'Case: 2:24-cv-03039-CBM-JPR' : 'Case: 2:24-cv-03039-CBM-JPR • U.S. District Court, C.D. Cal.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarNavigation />

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto ${isMobile ? 'p-3' : 'p-6'} bg-muted/20`}>
          {/* Urgent notification on mobile */}
          {isMobile && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 text-sm overflow-hidden">
              <div className="font-bold text-ellipsis overflow-hidden">URGENT: Successor Counsel Needed</div>
              <div className="text-ellipsis overflow-hidden">Hinton v. Capital One</div>
              <div className="text-ellipsis overflow-hidden">FCRA (15 USC §1681) & CCRAA Litigation</div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
