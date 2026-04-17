import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Globe,
  Users,
  Database,
  Calendar,
  FileText,
  HelpCircle,
  Sparkles,
  ShoppingBag,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

// Mock data
const stats = [
  {
    label: "Active Engagements",
    value: "3",
    description: "Currently active",
    icon: Package,
    color: "text-blue-500",
    link: "/dashboard/services",
  },
  {
    label: "Services Completed",
    value: "2",
    description: "Successfully delivered",
    icon: CheckCircle2,
    color: "text-green-500",
    link: "/dashboard/services",
  },
  {
    label: "Upcoming Sessions",
    value: "4",
    description: "Next 30 days",
    icon: Calendar,
    color: "text-purple-500",
    link: "/dashboard/calendar",
  },
  {
    label: "Pending Inputs",
    value: "1",
    description: "Action required",
    icon: AlertCircle,
    color: "text-orange-500",
    link: "/dashboard/services",
  },
];

const notifications = [
  {
    id: 1,
    type: "document",
    title: "Your delivery lead has requested additional documents",
    engagement: "Digital Workspace Strategy",
    time: "2 hours ago",
    icon: FileText,
    color: "text-orange-500",
    unread: true,
    link: "/dashboard/services/1",
  },
  {
    id: 2,
    type: "session",
    title: "Working session scheduled for Thursday at 10:00 AM",
    engagement: "CRM & Service Platform",
    time: "5 hours ago",
    icon: Calendar,
    color: "text-purple-500",
    unread: true,
    link: "/dashboard/calendar",
  },
  {
    id: 3,
    type: "approval",
    title: "Your submitted inputs have been approved",
    engagement: "Digital Workspace Strategy",
    time: "1 day ago",
    icon: CheckCircle2,
    color: "text-green-500",
    unread: false,
    link: "/dashboard/services/1",
  },
  {
    id: 4,
    type: "milestone",
    title: "Engagement milestone completed",
    engagement: "Data Governance Platform",
    time: "2 days ago",
    icon: CheckCircle2,
    color: "text-green-500",
    unread: false,
    link: "/dashboard/services/3",
  },
];

const activeEngagements = [
  {
    id: 1,
    name: "Customer Experience Strategy",
    service: "Digital Experience Strategy",
    tower: "Digital Experience",
    towerIcon: Globe,
    status: "In Progress",
    progress: 35,
    nextSession: "Architecture Workshop",
    sessionDate: "Mar 20, 2026",
  },
  {
    id: 2,
    name: "Collaboration Platform Implementation",
    service: "Digital Workspace Strategy",
    tower: "Digital Workspace",
    towerIcon: Users,
    status: "Awaiting Inputs",
    progress: 65,
    nextSession: "Design Review",
    sessionDate: "Mar 18, 2026",
  },
  {
    id: 3,
    name: "Data Platform Modernisation",
    service: "Data Governance Platform",
    tower: "Data & Intelligence",
    towerIcon: Database,
    status: "In Progress",
    progress: 30,
    nextSession: "Requirements Workshop",
    sessionDate: "Mar 25, 2026",
  },
];

const upcomingSessions = [
  {
    id: 1,
    title: "Architecture Blueprint Review",
    engagement: "CRM Platform Implementation",
    date: "March 18, 2026",
    time: "10:00 AM",
    type: "Virtual Workshop",
  },
  {
    id: 2,
    title: "Customer Journey Mapping",
    engagement: "Customer Experience Strategy",
    date: "March 20, 2026",
    time: "2:00 PM",
    type: "Collaborative Session",
  },
  {
    id: 3,
    title: "Data Governance Framework Review",
    engagement: "Data Platform Modernisation",
    date: "March 25, 2026",
    time: "11:00 AM",
    type: "Virtual Workshop",
  },
  {
    id: 4,
    title: "Technology Stack Assessment",
    engagement: "Collaboration Platform Implementation",
    date: "March 27, 2026",
    time: "3:00 PM",
    type: "Technical Review",
  },
];

const quickActions = [
  {
    label: "Transact.AI",
    description: "Get personalized recommendations",
    icon: Sparkles,
    link: "#",
    onClick: () => {
      window.dispatchEvent(new CustomEvent("openTransactAI"));
    },
  },
  {
    label: "FAQs",
    description: "Find answers to common questions",
    icon: HelpCircle,
    link: "/#faq",
  },
  {
    label: "Explore Services",
    description: "Browse our service catalog",
    icon: ShoppingBag,
    link: "/marketplace",
  },
  {
    label: "Contact Delivery Lead",
    description: "Message your delivery team",
    icon: Mail,
    link: "/dashboard/messages",
  },
];

const Overview = () => {
  const { user } = useAuth();
  
  const handleQuickAction = (action: typeof quickActions[0]) => {
    if (action.onClick) {
      action.onClick();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your transformation initiatives
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content Area (Left col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Grid - Clickable */}
            <div className="grid gap-6 sm:grid-cols-2">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={stat.link} className="block">
                      <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{stat.label}</p>
                              <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                            </div>
                            <div className={`rounded-lg bg-accent p-3 ${stat.color}`}>
                              <Icon size={24} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Engagements */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Engagements</CardTitle>
                    <CardDescription>Ongoing transformation initiatives</CardDescription>
                  </div>
                  <Link to="/dashboard/services">
                    <Button variant="ghost" size="sm" className="gap-2">
                      View All
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeEngagements.map((engagement) => {
                  const TowerIcon = engagement.towerIcon;
                  return (
                    <Link key={engagement.id} to={`/dashboard/services/${engagement.id}`} className="block">
                      <div className="rounded-lg border border-border bg-accent/30 p-4 transition-all hover:bg-accent/50 hover:shadow-md">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="rounded-lg border border-border bg-card p-2">
                              <TowerIcon size={20} className="text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{engagement.name}</h4>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{engagement.service}</span>
                                <span>•</span>
                                <span>{engagement.tower}</span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              engagement.status === "Awaiting Inputs" ? "secondary" : "default"
                            }
                          >
                            {engagement.status}
                          </Badge>
                        </div>

                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-foreground">{engagement.progress}%</span>
                          </div>
                          <Progress value={engagement.progress} className="h-2" />
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar size={14} />
                            <span>Next: {engagement.nextSession}</span>
                          </div>
                          <span className="text-muted-foreground">{engagement.sessionDate}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Sessions</CardTitle>
                  </div>
                  <Link to="/dashboard/calendar">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                      All <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <Link key={session.id} to={`/dashboard/calendar/${session.id}`} className="block">
                      <div className="rounded-lg border border-border bg-accent/30 p-3 transition-colors hover:bg-accent/50">
                        <h4 className="text-sm font-semibold text-foreground">{session.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{session.engagement}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar size={12} />
                            <span>
                              {session.date} — {session.time}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {session.type}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column Area */}
          <div className="space-y-6">
            {/* Quick Actions - Top Right */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const content = (
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-auto py-3 transition-all hover:border-primary/50"
                      onClick={() => handleQuickAction(action)}
                    >
                      <Icon size={18} className="text-primary" />
                      <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-medium">{action.label}</span>
                        <span className="text-xs text-muted-foreground">{action.description}</span>
                      </div>
                    </Button>
                  );

                  return action.onClick ? (
                    <div key={action.label} className="w-full">{content}</div>
                  ) : (
                    <Link key={action.label} to={action.link} className="block w-full">
                      {content}
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            {/* Notifications & Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                  </div>
                  <Badge variant="destructive" className="h-6 min-w-6 px-2">
                    {notifications.filter((n) => n.unread).length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Link key={notification.id} to={notification.link} className="block">
                        <div
                          className={`flex gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 ${
                            notification.unread
                              ? "border-primary/30 bg-primary/5"
                              : "border-border bg-accent/30"
                          }`}
                        >
                          <div className={`mt-0.5 rounded-full bg-accent p-2 ${notification.color}`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-sm ${
                                  notification.unread ? "font-semibold" : "font-medium"
                                } text-foreground leading-tight`}
                              >
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <div className="mt-1 h-2 w-2 min-w-[0.5rem] rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{notification.engagement}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
