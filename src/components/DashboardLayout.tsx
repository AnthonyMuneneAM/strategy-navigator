import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
  Bell,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    group: "Main",
    items: [
      { name: "Overview", icon: LayoutDashboard, path: "/dashboard/overview", badge: null },
      { name: "Active Services", icon: Package, path: "/dashboard/services", badge: 3 },
      { name: "Messages", icon: MessageSquare, path: "/dashboard/messages", badge: 5 },
    ],
  },
  {
    group: "Insights",
    items: [
      { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics", badge: null },
    ],
  },
  {
    group: "Account",
    items: [
      { name: "Billing", icon: CreditCard, path: "/dashboard/billing", badge: null },
      { name: "Settings", icon: Settings, path: "/dashboard/settings", badge: null },
      { name: "Help Centre", icon: HelpCircle, path: "/dashboard/help", badge: null },
    ],
  },
];

// Mock user data
const mockUser = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@stcbank.com",
  role: "Chief Digital Officer",
  organization: "STC Bank",
  avatar: "SM",
};

const mockOrganizations = [
  { id: "stc-bank", name: "STC Bank" },
  { id: "stc-insurance", name: "STC Insurance" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("stc-bank");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full border-r border-border bg-card transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-72"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Collapse Button */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            {!sidebarCollapsed && (
              <Link to="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-gradient-brand">TMaaS</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          {/* Organization Selector */}
          <div className="border-b border-border p-4">
            {sidebarCollapsed ? (
              <div className="flex justify-center">
                <Building2 size={20} className="text-muted-foreground" />
              </div>
            ) : (
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  Organization
                </label>
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockOrganizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {navigationItems.map((group) => (
                <div key={group.group}>
                  {!sidebarCollapsed && (
                    <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.group}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      
                      return (
                        <Link key={item.path} to={item.path}>
                          <motion.div
                            whileHover={{ x: 2 }}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                              active
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            } ${sidebarCollapsed ? "justify-center" : ""}`}
                          >
                            <Icon size={20} />
                            {!sidebarCollapsed && (
                              <>
                                <span className="flex-1 text-sm font-medium">{item.name}</span>
                                {item.badge && (
                                  <Badge variant="secondary" className="h-5 min-w-5 px-1.5 text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </>
                            )}
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t border-border p-4">
            {sidebarCollapsed ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {mockUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{mockUser.name}</span>
                      <span className="text-xs text-muted-foreground">{mockUser.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start gap-3 px-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {mockUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col items-start text-left">
                      <span className="text-sm font-medium">{mockUser.name}</span>
                      <span className="text-xs text-muted-foreground">{mockUser.role}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{mockUser.name}</span>
                      <span className="text-xs text-muted-foreground">{mockUser.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="h-[calc(100vh-4rem)] overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
