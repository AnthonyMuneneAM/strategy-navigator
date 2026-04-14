import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Search,
  X,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";
import { mockOrders } from "@/data/mockOrders";
import { useAuth } from "@/contexts/AuthContext";

const CustomerServiceOrders = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter orders by customer organization
  const customerOrders = mockOrders.filter(
    (order) => order.clientOrganisation === user.organization
  );

  // Define stage order for sorting
  const stageOrder = {
    "Payment Pending": 1,
    "Client Input Pending": 2,
    "Input in Review": 3,
    "In Delivery": 4,
    "Deliverables Pending Review": 5,
    "Closed": 6,
  };

  const filteredOrders = customerOrders
    .filter((order) => {
      const matchesSearch =
        searchQuery === "" ||
        order.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.serviceOrderNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage = stageFilter === "all" || order.stage === stageFilter;
      
      const matchesType = typeFilter === "all" || order.serviceType === typeFilter;

      return matchesSearch && matchesStage && matchesType;
    })
    .sort((a, b) => {
      // Sort by stage order first
      const stageComparison = stageOrder[a.stage] - stageOrder[b.stage];
      if (stageComparison !== 0) return stageComparison;
      
      // If same stage, sort by start date (newest first)
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Payment Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Client Input Pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Input in Review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Delivery":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Deliverables Pending Review":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Closed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "Payment Pending":
        return <AlertCircle size={16} className="text-yellow-600" />;
      case "Client Input Pending":
        return <Clock size={16} className="text-orange-600" />;
      case "Input in Review":
        return <FileText size={16} className="text-blue-600" />;
      case "In Delivery":
        return <Clock size={16} className="text-purple-600" />;
      case "Deliverables Pending Review":
        return <FileText size={16} className="text-cyan-600" />;
      case "Closed":
        return <CheckCircle2 size={16} className="text-green-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const stages = [
    "Payment Pending",
    "Client Input Pending",
    "Input in Review",
    "In Delivery",
    "Deliverables Pending Review",
    "Closed",
  ];

  const hasActiveFilters = stageFilter !== "all" || typeFilter !== "all" || searchQuery !== "";

  const clearAllFilters = () => {
    setSearchQuery("");
    setStageFilter("all");
    setTypeFilter("all");
  };

  // Calculate summary stats
  const stats = useMemo(() => {
    return {
      total: customerOrders.length,
      active: customerOrders.filter(
        (o) => !["Closed", "Payment Pending"].includes(o.stage)
      ).length,
      pendingAction: customerOrders.filter((o) =>
        ["Client Input Pending", "Deliverables Pending Review"].includes(o.stage)
      ).length,
      completed: customerOrders.filter((o) => o.stage === "Closed").length,
    };
  }, [customerOrders]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your service engagements with DQ
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Action</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingAction}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <AlertCircle size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Deploy (SaaS)">Deploy (SaaS)</SelectItem>
                <SelectItem value="Deploy (OnPrem)">Deploy (OnPrem)</SelectItem>
                <SelectItem value="Drive">Drive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => setSearchQuery("")}
                  />
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Type: {typeFilter}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => setTypeFilter("all")}
                  />
                </Badge>
              )}
              {stageFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Stage: {stageFilter}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => setStageFilter("all")}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="ml-auto">
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText size={48} className="text-muted-foreground/20 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  {hasActiveFilters
                    ? "Try adjusting your filters"
                    : "You don't have any service orders yet"}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link to={`/dashboard/customer/orders/${order.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {order.serviceName}
                            </h3>
                            <Badge className={`text-xs border ${getStageColor(order.stage)}`}>
                              <span className="flex items-center gap-1">
                                {getStageIcon(order.stage)}
                                {order.stage}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{order.serviceOrderNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {order.currency} {order.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{order.duration}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Start Date</p>
                            <p className="font-medium text-foreground">
                              {new Date(order.startDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} className="text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">End Date</p>
                            <p className="font-medium text-foreground">
                              {new Date(order.endDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {order.deliveryLead
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs text-muted-foreground">Delivery Lead</p>
                            <p className="font-medium text-foreground">{order.deliveryLead}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText size={16} className="text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Progress</p>
                            <p className="font-medium text-foreground">
                              {order.deliverables.filter((d) => d.status === "Accepted").length} /{" "}
                              {order.deliverables.length} deliverables
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerServiceOrders;
