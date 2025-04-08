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
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
//import { useSidebar } from '../ui/sidebar'; //Removed as per instructions
import { Button } from '../ui/button';

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
  //const { isMobile, openMobile, setOpenMobile } = useSidebar(); //Removed as per instructions
  const isMobile = false; // Setting to false as useSidebar is removed. Adjust as needed.
  const openMobile = false; // Setting to false as useSidebar is removed. Adjust as needed.

  //const toggleMobileMenu = () => {
  //  setOpenMobile(!openMobile);
  //}; //Removed as per instructions

  return (
    <aside className="bg-sidebar border-r w-64 h-full flex-shrink-0">
      {/* Removed mobile toggle section as per instructions */}
      <nav className={cn("p-4 h-full overflow-y-auto", isMobile && !openMobile && "hidden")}>
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
                      <span
                        className={cn(
                          'flex items-center space-x-2 py-2 px-3 rounded-md transition-colors group relative cursor-pointer',
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                        {item.description && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {item.description}
                          </div>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}