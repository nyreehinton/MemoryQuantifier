import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  Clipboard,
  DollarSign,
  Edit,
  FileChartColumn,
  FileSearch,
  FileText,
  LucideIcon,
  Menu,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';

interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const navigation: NavigationSection[] = [
  {
    title: 'NAVIGATION',
    items: [
      {
        title: 'Case Summary',
        href: '/',
        icon: FileSearch,
      },
      {
        title: 'Adverse Actions',
        href: '/adverse-actions',
        icon: AlertTriangle,
      },
      {
        title: 'Damages Quantification',
        href: '/damages-quantification',
        icon: DollarSign,
      },
      {
        title: 'Credit Reports',
        href: '/credit-reports',
        icon: FileText,
      },
      {
        title: 'Tasks',
        href: '/tasks',
        icon: Clipboard,
      },
      {
        title: 'Reports',
        href: '/reports',
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: 'CASE MANAGEMENT',
    items: [
      {
        title: 'Case Notes',
        href: '/case-notes',
        icon: Edit,
        description: 'Attorney notes and case observations',
      },
      {
        title: 'Timeline',
        href: '/timeline',
        icon: Calendar,
        description: 'Comprehensive case timeline',
      },
      {
        title: 'Document Repository',
        href: '/documents',
        icon: Briefcase,
        description: 'All case-related documents and evidence',
      },
    ],
  },
];

export default function SidebarNavigation() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // Close mobile menu when changing location
  useEffect(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [location, isMobile]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    if (!isMobile) {
      setOpenMobile(true);
    }
  }, [isMobile]);

  return (
    <aside className={cn(
      "bg-sidebar border-r h-full", 
      isMobile ? (openMobile ? "fixed inset-0 z-50" : "w-0") : "w-64 flex-shrink-0"
    )}>
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <span className="font-semibold">Hinton v. Capital One</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setOpenMobile(!openMobile)}
            className="text-sidebar-foreground"
          >
            {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}
      
      {(!isMobile || openMobile) && (
        <nav className="p-4 h-full overflow-y-auto">
          {navigation.map((section, i) => (
            <div key={i} className="mb-8">
              <div className="text-sm font-semibold text-sidebar-foreground/60 mb-2">
                {section.title}
              </div>
              <ul className="space-y-1">
                {section.items.map((item, j) => {
                  const isActive = item.href === location;
                  return (
                    <li key={j}>
                      <Link href={item.href}>
                        <a
                          className={cn(
                            'flex items-center space-x-2 py-2 px-3 rounded-md transition-colors group relative cursor-pointer',
                            isActive
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                              : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.title}</span>
                          {item.description && !isMobile && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {item.description}
                            </div>
                          )}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      )}
      
      {isMobile && !openMobile && (
        <Button 
          variant="secondary"
          size="icon"
          onClick={() => setOpenMobile(true)}
          className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </aside>
  );
}