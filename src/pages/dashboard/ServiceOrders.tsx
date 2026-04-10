import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Search,
  User,
  X,
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

const ServiceOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deliveryLeadFilter, setDeliveryLeadFilter] = useState("all");

  // Get unique values for filters
  const uniqueClients = useMemo(() => {
    return Array.from(new Set(mockOrders.map((o) => o.clientOrganisation)));
  }, []);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(mockOrders.map((o) => o.serviceType)));
  }, []);

  const uniqueDeliveryLeads = useMemo(() => {
    return Array.from(new Set(mockOrders.map((o) => o.deliveryLead)));
  }, []);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientOrganisation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStage = stageFilter === "all" || order.stage === stageFilter;
    const matchesClient = clientFilter === "all" || order.clientOrganisation === clientFilter;
    const matchesType = typeFilter === "all" || order.serviceType === typeFilter;
    const matchesDeliveryLead = deliveryLeadFilter === "all" || order.deliveryLead === deliveryLeadFilter;

    return matchesSearch && matchesStage && matchesClient && matchesType && matchesDeliveryLead;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Design":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Deploy":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Drive":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const hasActiveFilters = stageFilter !== "all" || clientFilter !== "all" || typeFilter !== "all" || deliveryLeadFilter !== "all" || searchQuery !== "";

  const clearAllFilters = () => {
    setSearchQuery("");
    setStageFilter("all");
    setClientFilter("all");
    setTypeFilter("all");
    setDeliveryLeadFilter("all");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Service Orders</h1>
            <p className="text-muted-foreground mt-2">
              {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
              {hasActiveFilters && ` (filtered from ${mockOrders.length} total)`}
            </p>
          </div>
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
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Stage" />
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
            <Select value={clientFilter} onValueChange={setClientFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {uniqueClients.map((client) => (
                  <SelectItem key={client} value={client}>
                    {client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={deliveryLeadFilter} onValueChange={setDeliveryLeadFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Delivery Lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Delivery Leads</SelectItem>
                {uniqueDeliveryLeads.map((lead) => (
                  <SelectItem key={lead} value={lead}>
                    {lead}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters & Clear Button */}
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
              {clientFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Client: {clientFilter}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => setClientFilter("all")}
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
              {deliveryLeadFilter !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Lead: {deliveryLeadFilter}
                  <X
                    size={14}
                    className="cursor-pointer hover:text-foreground"
                    onClick={() => setDeliveryLeadFilter("all")}
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
                <Link to={`/dashboard/orders/${order.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {order.serviceName}
                            </h3>
                            <Badge className={`text-xs border ${getTypeColor(order.serviceType)}`}>
                              {order.serviceType}
                            </Badge>
                            <Badge className={`text-xs border ${getStageColor(order.stage)}`}>
                              {order.stage}
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
                          <Building2 size={16} className="text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Client</p>
                            <p className="font-medium text-foreground">{order.clientOrganisation}</p>
                          </div>
                        </div>
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

export default ServiceOrders;
