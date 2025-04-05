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
} from 'lucide-react';
import { Link, useLocation } from 'wouter';

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

  return (
    <aside className="bg-sidebar border-r w-64 h-full flex-shrink-0">
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
                          'flex items-center space-x-2 py-2 px-3 rounded-md transition-colors group relative',
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                        {item.description && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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
    </aside>
  );
}
