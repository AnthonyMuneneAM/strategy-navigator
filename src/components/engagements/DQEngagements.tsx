import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Search, Filter, Activity, Building2, User, MoreHorizontal, Plus 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockMarketplaceOrders = [
  {
    id: "M-2026-001",
    serviceName: "Digital Experience Strategy",
    organization: "STC Bank",
    type: "Design",
    status: "Ready for Delivery",
    assignedLead: "Alex Johnson",
    createdDate: "Mar 1, 2026",
    lastUpdated: "Mar 10, 2026"
  },
  {
    id: "M-2026-002",
    serviceName: "DIgital Worspace Strategy",
    organization: "STC Insurance",
    type: "Deploy",
    status: "In Delivery",
    assignedLead: "Sarah Woods",
    createdDate: "Feb 15, 2026",
    lastUpdated: "Mar 12, 2026"
  },
  {
    id: "M-2026-003",
    serviceName: "Digital Intelligence & Analytics Strategy",
    organization: "STC Bank",
    type: "Design",
    status: "Awaiting Client Input",
    assignedLead: "Unassigned",
    createdDate: "Mar 14, 2026",
    lastUpdated: "Mar 14, 2026"
  },
  {
    id: "M-2026-004",
    serviceName: "SecDevOps Strategy",
    organization: "Ooredoo",
    type: "Deploy",
    status: "Awaiting Payment",
    assignedLead: "Alex Johnson",
    createdDate: "Mar 16, 2026",
    lastUpdated: "Mar 16, 2026"
  }
];

const mockLegacyProjects = [
  {
    id: "L-2025-081",
    projectName: "IT.GPRC",
    organization: "STC Bank",
    country: "Saudi Arabia",
    status: "Paused",
    assignedLead: "Rayyan Basha",
    startDate: "Oct 1, 2025",
    endDate: "Jun 30, 2026",
    lastUpdated: "Mar 15, 2026"
  },
  {
    id: "L-2025-092",
    projectName: "EJP Enterprise Hub Deploy",
    organization: "Khalifa Fund",
    country: "UAE",
    status: "Paused",
    assignedLead: "Kenzie Sharon",
    startDate: "Aug 15, 2025",
    endDate: "Feb 28, 2026",
    lastUpdated: "Mar 1, 2026"
  }
];

const getStatusVariant = (status: string) => {
  switch(status) {
    case "In Delivery":
    case "Active": return "default";
    case "Awaiting Client Input":
    case "Inputs Under Review":
    case "Awaiting Payment":
    case "Paused": return "secondary";
    case "Ready for Delivery": return "default";
    case "Delivered":
    case "Completed": return "outline";
    case "Cancelled": return "destructive";
    default: return "default";
  }
};

const getCategoryColor = (category: string) => {
  switch(category) {
    case "Digital Experience": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Digital Workspace": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "SecDevOps": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
    case "Digital Intelligence & Analytics": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getTypeColor = (type: string) => {
  if (type === "Design") return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300";
  if (type === "Deploy") return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
  return "bg-gray-100 text-gray-800";
};

const DQEngagements = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState("All");
  const [leadFilter, setLeadFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");

  const handleRowClick = (id: string) => {
    navigate(`/dashboard/services/${id}`);
  };

  const filteredMarketplace = mockMarketplaceOrders.filter(order => {
    const searchMatch = 
      order.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.assignedLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const orgMatch = orgFilter === "All" || order.organization === orgFilter;
    const leadMatch = leadFilter === "All" || order.assignedLead === leadFilter;
    const statusMatch = statusFilter === "All" || order.status === statusFilter;
    const typeMatch = typeFilter === "All" || order.type === typeFilter;

    return searchMatch && orgMatch && leadMatch && statusMatch && typeMatch;
  });

  const filteredLegacy = mockLegacyProjects.filter(project => {
    const searchMatch = 
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.assignedLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase());

    const orgMatch = orgFilter === "All" || project.organization === orgFilter;
    const leadMatch = leadFilter === "All" || project.assignedLead === leadFilter;
    const statusMatch = statusFilter === "All" || project.status === statusFilter;
    const countryMatch = countryFilter === "All" || project.country === countryFilter;

    return searchMatch && orgMatch && leadMatch && statusMatch && countryMatch;
  });

  // Extract unique filter options
  const allOrgs = Array.from(new Set([...mockMarketplaceOrders, ...mockLegacyProjects].map(item => item.organization)));
  const allLeads = Array.from(new Set([...mockMarketplaceOrders, ...mockLegacyProjects].map(item => item.assignedLead)));
  const allStatuses = Array.from(new Set(activeTab === "marketplace" ? mockMarketplaceOrders.map(i => i.status) : mockLegacyProjects.map(i => i.status)));
  const allCountries = Array.from(new Set(mockLegacyProjects.map(i => i.country)));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Engagements</h1>
            <p className="mt-1 text-muted-foreground">
              Manage all client transformation engagements across TMaaS
            </p>
          </div>
          <Button className="shrink-0 gap-2">
            <Plus size={16} />
            Add Legacy Project
          </Button>
        </div>

        <Tabs defaultValue="marketplace" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs header */}
          <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="marketplace" className="px-6">Marketplace Orders</TabsTrigger>
              <TabsTrigger value="legacy" className="px-6">Legacy Projects</TabsTrigger>
            </TabsList>
            
            {/* Global Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Search engagements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-4 pb-2">
            <div className="flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1 shadow-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <select 
                value={orgFilter} 
                onChange={(e) => setOrgFilter(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none text-foreground"
              >
                <option value="All">All Organizations</option>
                {allOrgs.map(org => <option key={org} value={org}>{org}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1 shadow-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <select 
                value={leadFilter} 
                onChange={(e) => setLeadFilter(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none text-foreground"
              >
                <option value="All">All Leads</option>
                {allLeads.map(lead => <option key={lead} value={lead}>{lead}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1 shadow-sm">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none text-foreground"
              >
                <option value="All">All Statuses</option>
                {allStatuses.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>

            {activeTab === "marketplace" && (
              <>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1 shadow-sm">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select 
                    value={typeFilter} 
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-transparent text-sm font-medium outline-none text-foreground"
                  >
                    <option value="All">All Types</option>
                    <option value="Design">Design</option>
                    <option value="Deploy">Deploy</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === "legacy" && (
              <>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background/50 px-3 py-1 shadow-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <select 
                    value={countryFilter} 
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="bg-transparent text-sm font-medium outline-none text-foreground"
                  >
                    <option value="All">All Countries</option>
                    {allCountries.map(country => <option key={country} value={country}>{country}</option>)}
                  </select>
                </div>
              </>
            )}
            
            {(orgFilter !== "All" || leadFilter !== "All" || statusFilter !== "All" || countryFilter !== "All" || typeFilter !== "All") && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setOrgFilter("All");
                  setLeadFilter("All");
                  setStatusFilter("All");
                  setCountryFilter("All");
                  setTypeFilter("All");
                }}
                className="text-xs h-8 text-muted-foreground hover:text-foreground"
              >
                Clear Filters
              </Button>
            )}
          </div>

          <TabsContent value="marketplace" className="mt-4">
            <div className="rounded-md border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[250px]">Service Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Lead</TableHead>
                    <TableHead className="hidden md:table-cell">Requested</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarketplace.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                        No marketplace orders found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMarketplace.map((order) => (
                      <TableRow 
                        key={order.id} 
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => handleRowClick(order.id)}
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{order.serviceName}</span>
                            <span className="text-xs text-muted-foreground">{order.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.organization}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${getTypeColor(order.type)}`}>
                            {order.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status) as any} className="whitespace-nowrap">{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{order.assignedLead}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{order.createdDate}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{order.lastUpdated}</TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleRowClick(order.id)}>
                                View Engagement
                              </DropdownMenuItem>
                              <DropdownMenuItem>Assign Delivery Lead</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                                Archive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {filteredMarketplace.length > 0 && (
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                  Showing 1 to {filteredMarketplace.length} of {filteredMarketplace.length} entries
                </div>
                <Pagination className="w-auto mx-0">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>

          <TabsContent value="legacy" className="mt-4">
            <div className="rounded-md border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[250px]">Project Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Lead</TableHead>
                    <TableHead className="hidden md:table-cell">Start Date</TableHead>
                    <TableHead className="hidden md:table-cell">Forecast End Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLegacy.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                        No legacy projects found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLegacy.map((project) => (
                      <TableRow 
                        key={project.id} 
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => handleRowClick(project.id)}
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{project.projectName}</span>
                            <span className="text-xs text-muted-foreground">{project.id}</span>
                          </div>
                        </TableCell>
                        <TableCell>{project.organization}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(project.status) as any} className="whitespace-nowrap">{project.status}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{project.assignedLead}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{project.startDate}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{project.endDate}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{project.lastUpdated}</TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleRowClick(project.id)}>
                                View Engagement
                              </DropdownMenuItem>
                              <DropdownMenuItem>Assign Delivery Lead</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
                                Archive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {filteredLegacy.length > 0 && (
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                  Showing 1 to {filteredLegacy.length} of {filteredLegacy.length} entries
                </div>
                <Pagination className="w-auto mx-0">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" className="pointer-events-none opacity-50" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DQEngagements;
