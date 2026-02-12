import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Globe,
  Users,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/DashboardLayout";

// Mock data
const stats = [
  {
    label: "Active Services",
    value: "3",
    change: "+1 this month",
    icon: Package,
    color: "text-blue-500",
  },
  {
    label: "Pending Actions",
    value: "2",
    change: "Requires attention",
    icon: AlertCircle,
    color: "text-orange-500",
  },
  {
    label: "Unread Messages",
    value: "5",
    change: "From delivery leads",
    icon: MessageSquare,
    color: "text-purple-500",
  },
  {
    label: "Digital Maturity",
    value: "68%",
    change: "+12% vs last quarter",
    icon: TrendingUp,
    color: "text-green-500",
  },
];

const activeServices = [
  {
    id: 1,
    name: "Digital Workspace Strategy",
    type: "Design",
    tower: "Digital Workspace",
    towerIcon: Users,
    status: "In Progress",
    progress: 65,
    deliveryLead: "James Chen",
    nextMilestone: "Architecture Review",
    dueDate: "Feb 20, 2026",
    unreadMessages: 2,
  },
  {
    id: 2,
    name: "CRM & Service Platform",
    type: "Deploy (SaaS)",
    tower: "Digital Experience",
    towerIcon: Globe,
    status: "Pending Review",
    progress: 45,
    deliveryLead: "Maria Santos",
    nextMilestone: "Design Approval",
    dueDate: "Feb 18, 2026",
    unreadMessages: 3,
  },
  {
    id: 3,
    name: "Data Governance Platform",
    type: "Deploy (SaaS)",
    tower: "Data & Intelligence",
    towerIcon: Database,
    status: "In Progress",
    progress: 30,
    deliveryLead: "David Kumar",
    nextMilestone: "Requirements Workshop",
    dueDate: "Feb 25, 2026",
    unreadMessages: 0,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "milestone",
    title: "Design Report delivered",
    service: "Digital Workspace Strategy",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "message",
    title: "New message from Maria Santos",
    service: "CRM & Service Platform",
    time: "5 hours ago",
    icon: MessageSquare,
    color: "text-purple-500",
  },
  {
    id: 3,
    type: "action",
    title: "Action required: Review architecture",
    service: "Digital Workspace Strategy",
    time: "1 day ago",
    icon: AlertCircle,
    color: "text-orange-500",
  },
  {
    id: 4,
    type: "milestone",
    title: "Kickoff meeting completed",
    service: "Data Governance Platform",
    time: "2 days ago",
    icon: CheckCircle2,
    color: "text-green-500",
  },
];

const Overview = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah</h1>
          <p className="mt-1 text-muted-foreground">
            Here's what's happening with your transformation services
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
                      </div>
                      <div className={`rounded-lg bg-accent p-3 ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Services */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Services</CardTitle>
                    <CardDescription>Track progress and upcoming milestones</CardDescription>
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
                {activeServices.map((service) => {
                  const TowerIcon = service.towerIcon;
                  return (
                    <div
                      key={service.id}
                      className="rounded-lg border border-border bg-accent/30 p-4 transition-colors hover:bg-accent/50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="rounded-lg border border-border bg-card p-2">
                            <TowerIcon size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{service.name}</h4>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{service.type}</span>
                              <span>•</span>
                              <span>{service.tower}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={service.status === "Pending Review" ? "secondary" : "default"}
                        >
                          {service.status}
                        </Badge>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{service.progress}%</span>
                        </div>
                        <Progress value={service.progress} className="h-2" />
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock size={14} />
                          <span>Next: {service.nextMilestone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{service.dueDate}</span>
                          {service.unreadMessages > 0 && (
                            <Link to={`/dashboard/messages/${service.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 gap-2">
                                <MessageSquare size={14} />
                                <Badge variant="destructive" className="h-5 min-w-5 px-1.5">
                                  {service.unreadMessages}
                                </Badge>
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex gap-3">
                        <div className={`mt-0.5 rounded-full bg-accent p-1.5 ${activity.color}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.service}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/marketplace">
                  <Button variant="outline" className="w-full justify-start">
                    Browse Services
                  </Button>
                </Link>
                <Link to="/dashboard/help">
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                </Link>
                <Link to="/dashboard/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
