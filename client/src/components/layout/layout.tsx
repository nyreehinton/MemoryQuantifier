import { ReactNode } from "react";
import SidebarNavigation from "./sidebar-navigation";
import { ShieldCheck, Search, Bell, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <h1 className="text-xl font-semibold">Credit Damages Case Management Platform</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Case: Hinton v. Capital One</span>
            <div className="relative">
              <Button variant="ghost" size="sm" className="flex items-center">
                <span>User</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarNavigation />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
