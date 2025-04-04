import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  Clipboard, 
  FileChartColumn, 
  Edit, 
  Calendar, 
  Briefcase 
} from "lucide-react";

const navigation = [
  {
    title: "NAVIGATION",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Adverse Actions",
        href: "/adverse-actions",
        icon: AlertTriangle,
      },
      {
        title: "Damages Quantification",
        href: "/damages-quantification",
        icon: DollarSign,
      },
      {
        title: "Credit Reports",
        href: "/credit-reports",
        icon: FileText,
      },
      {
        title: "Tasks",
        href: "/tasks",
        icon: Clipboard,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: FileChartColumn,
      },
    ],
  },
  {
    title: "CASE SHORTCUTS",
    items: [
      {
        title: "Case Notes",
        href: "/case-notes",
        icon: Edit,
      },
      {
        title: "Timeline",
        href: "/timeline",
        icon: Calendar,
      },
      {
        title: "Document Repository",
        href: "/documents",
        icon: Briefcase,
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
                          "flex items-center space-x-2 py-2 px-3 rounded-md transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
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
