import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Globe, Users, Database, Clock, MessageSquare, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const activeServices = [
  {
    id: 1,
    name: "Digital Workspace Strategy",
    type: "Design",
    tower: "Digital Workspace",
    towerIcon: Users,
    towerColor: "text-purple-500",
    status: "In Progress",
    progress: 65,
    deliveryLead: "James Chen",
    leadEmail: "james.chen@dqglobal.com",
    startDate: "Jan 15, 2026",
    endDate: "Mar 15, 2026",
    nextMilestone: "Architecture Review",
    milestoneDate: "Feb 20, 2026",
    unreadMessages: 2,
    deliverables: [
      { name: "Design Report", status: "completed" },
      { name: "Design Infographic", status: "in-progress" },
      { name: "Design Specifications", status: "pending" },
      { name: "Design Prototypes", status: "pending" },
    ],
  },
  {
    id: 2,
    name: "CRM & Service Platform",
    type: "Deploy (SaaS)",
    tower: "Digital Experience",
    towerIcon: Globe,
    towerColor: "text-blue-500",
    status: "Pending Review",
    progress: 45,
    deliveryLead: "Maria Santos",
    leadEmail: "maria.santos@dqglobal.com",
    startDate: "Jan 22, 2026",
    endDate: "Apr 10, 2026",
    nextMilestone: "Design Approval",
    milestoneDate: "Feb 18, 2026",
    unreadMessages: 3,
    deliverables: [
      { name: "Platform Setup", status: "completed" },
      { name: "Configuration", status: "in-progress" },
      { name: "Integration", status: "pending" },
      { name: "Testing & Training", status: "pending" },
    ],
  },
  {
    id: 3,
    name: "Data Governance Platform",
    type: "Deploy (SaaS)",
    tower: "Data & Intelligence",
    towerIcon: Database,
    towerColor: "text-green-500",
    status: "In Progress",
    progress: 30,
    deliveryLead: "David Kumar",
    leadEmail: "david.kumar@dqglobal.com",
    startDate: "Feb 1, 2026",
    endDate: "Apr 20, 2026",
    nextMilestone: "Requirements Workshop",
    milestoneDate: "Feb 25, 2026",
    unreadMessages: 0,
    deliverables: [
      { name: "Platform Setup", status: "completed" },
      { name: "Configuration", status: "in-progress" },
      { name: "Integration", status: "pending" },
      { name: "Testing & Training", status: "pending" },
    ],
  },
];

const ActiveServices = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Active Services</h1>
          <p className="mt-1 text-muted-foreground">
            Track progress, deliverables, and communicate with delivery leads
          </p>
        </div>

        <div className="space-y-6">
          {activeServices.map((service) => {
            const TowerIcon = service.towerIcon;
            const completedDeliverables = service.deliverables.filter(
              (d) => d.status === "completed"
            ).length;

            return (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={`rounded-lg border border-border bg-accent p-3 ${service.towerColor}`}>
                        <TowerIcon size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {service.type} • {service.tower}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={service.status === "Pending Review" ? "secondary" : "default"}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">Overall Progress</span>
                      <span className="text-muted-foreground">{service.progress}%</span>
                    </div>
                    <Progress value={service.progress} className="h-2" />
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-border bg-accent/30 p-4">
                      <p className="text-xs text-muted-foreground">Delivery Lead</p>
                      <p className="mt-1 font-medium text-foreground">{service.deliveryLead}</p>
                      <p className="text-xs text-muted-foreground">{service.leadEmail}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-accent/30 p-4">
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="mt-1 font-medium text-foreground">
                        {service.startDate} - {service.endDate}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border bg-accent/30 p-4">
                      <p className="text-xs text-muted-foreground">Next Milestone</p>
                      <p className="mt-1 font-medium text-foreground">{service.nextMilestone}</p>
                      <p className="text-xs text-muted-foreground">{service.milestoneDate}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-accent/30 p-4">
                      <p className="text-xs text-muted-foreground">Deliverables</p>
                      <p className="mt-1 font-medium text-foreground">
                        {completedDeliverables} of {service.deliverables.length} completed
                      </p>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-foreground">Deliverables</h4>
                    <div className="space-y-2">
                      {service.deliverables.map((deliverable, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-border bg-accent/30 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                deliverable.status === "completed"
                                  ? "bg-green-500"
                                  : deliverable.status === "in-progress"
                                  ? "bg-orange-500"
                                  : "bg-muted-foreground/30"
                              }`}
                            />
                            <span className="text-sm text-foreground">{deliverable.name}</span>
                          </div>
                          <Badge
                            variant={
                              deliverable.status === "completed"
                                ? "default"
                                : deliverable.status === "in-progress"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {deliverable.status === "completed"
                              ? "Completed"
                              : deliverable.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link to={`/dashboard/messages/${service.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <MessageSquare size={16} />
                        Message Lead
                        {service.unreadMessages > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {service.unreadMessages}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    <Button variant="outline" className="gap-2">
                      <FileText size={16} />
                      View Documents
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Calendar size={16} />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActiveServices;
