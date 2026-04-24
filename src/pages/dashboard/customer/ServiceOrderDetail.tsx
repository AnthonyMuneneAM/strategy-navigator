import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  User,
  AlertCircle,
  FileText,
  Download,
  MessageSquare,
  CheckCircle2,
  CreditCard,
  Upload,
  Link as LinkIcon,
  Loader2,
  TrendingUp,
  Package,
  Activity,
  Send,
  Video,
  DollarSign,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import OrderStepper from "@/components/OrderStepper";
import { mockOrders } from "@/data/mockOrders";
import { useAuth } from "@/contexts/AuthContext";
import { useCountdown } from "@/hooks/useCountdown";
import { formatTimeRemaining, getUrgencyColor } from "@/utils/timeUtils";

const CustomerServiceOrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [raidView, setRaidView] = useState<"risks" | "assumptions" | "issues" | "dependencies">("risks");
  
  // Confirmation dialog states
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRevisionDialog, setShowRevisionDialog] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);
  
  // Bulk accept states
  const [selectedDeliverables, setSelectedDeliverables] = useState<Set<string>>(new Set());
  const [showBulkAcceptDialog, setShowBulkAcceptDialog] = useState(false);
  
  // Find the order and verify it belongs to the customer's organization
  const order = mockOrders.find(
    (o) => o.id === id && o.clientOrganisation === user.organization
  );
  
  // Check permissions
  const canAcceptDeliverables = order?.permissions?.canAcceptDeliverables ?? true;
  const canSubmitInputs = order?.permissions?.canSubmitInputs ?? true;
  const canRequestSessions = order?.permissions?.canRequestSessions ?? true;
  
  // Handle accept deliverable
  const handleAcceptDeliverable = () => {
    if (selectedDeliverable) {
      toast.success("Deliverable accepted successfully", {
        description: selectedDeliverable.name,
      });
      setShowAcceptDialog(false);
      setSelectedDeliverable(null);
    }
  };
  
  // Handle request revision
  const handleRequestRevision = () => {
    if (selectedDeliverable) {
      toast.success("Revision request sent", {
        description: `Your feedback for "${selectedDeliverable.name}" has been sent to the delivery team`,
      });
      setShowRevisionDialog(false);
      setSelectedDeliverable(null);
    }
  };
  
  // Handle bulk accept
  const handleBulkAccept = () => {
    const count = selectedDeliverables.size;
    toast.success(`${count} deliverable${count > 1 ? 's' : ''} accepted`, {
      description: "All selected deliverables have been accepted",
    });
    setSelectedDeliverables(new Set());
    setShowBulkAcceptDialog(false);
  };
  
  // Toggle deliverable selection
  const toggleDeliverableSelection = (deliverableId: string) => {
    const newSelection = new Set(selectedDeliverables);
    if (newSelection.has(deliverableId)) {
      newSelection.delete(deliverableId);
    } else {
      newSelection.add(deliverableId);
    }
    setSelectedDeliverables(newSelection);
  };

  if (!order) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The service order you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link to="/dashboard/customer/orders">
              <Button>Back to Service Orders</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Back Navigation */}
        <Link to="/dashboard/customer/orders">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} />
            Back to Service Orders
          </Button>
        </Link>

        {/* Order Header */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{order.serviceName}</h1>
                <Badge variant="secondary" className="text-xs">
                  {order.stage}
                </Badge>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {order.serviceType}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{order.serviceOrderNumber}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                  <Clock size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{order.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-medium text-foreground">
                      {order.currency} {order.price.toLocaleString()}
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
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="border-t border-border pt-6">
            <OrderStepper currentStage={order.stage} />
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {order.stage !== "Payment Pending" && (
              <>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="inbox">
                  Inbox
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">3</Badge>
                </TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="raid">RAID</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </>
            )}
            <TabsTrigger value="commercials">Commercials</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Messaging Card - Available for all post-payment stages */}
            {order.stage !== "Payment Pending" && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {order.deliveryLead
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{order.deliveryLead}</p>
                          <p className="text-xs text-muted-foreground">Delivery Lead</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => setActiveTab("inbox")}
                          className="gap-2"
                        >
                          <MessageSquare size={16} />
                          Send Message
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => setActiveTab("sessions")}
                        >
                          <Calendar size={16} />
                          Request Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stage-Specific Content */}
            {order.stage === "Payment Pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Status Banner */}
            <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={24} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-1">
                    Payment Required to Start Service Delivery
                  </h3>
                  <p className="text-sm text-yellow-800">
                    Complete payment to begin your engagement. Service delivery will commence within 3-5 business days after payment confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Order Summary</CardTitle>
                  <CardDescription>Service details and pricing breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Service Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Type</span>
                        <span className="font-medium text-foreground">{order.serviceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium text-foreground">{order.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span className="font-medium text-foreground">
                          {new Date(order.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Price Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span className="font-medium text-foreground">
                          {order.currency} {(order.price / 1.1).toFixed(2).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium text-foreground">
                          {order.currency} {(order.price * 0.1 / 1.1).toFixed(2).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 text-base">
                        <span className="font-semibold text-foreground">Total Amount</span>
                        <span className="font-bold text-foreground">
                          {order.currency} {order.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Instructions</CardTitle>
                  <CardDescription>Complete payment to begin service delivery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-accent/50 p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <FileText size={20} className="text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Invoice Details</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Invoice Number: INV-{order.serviceOrderNumber}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Terms</span>
                        <span className="font-medium text-foreground">Net 30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date</span>
                        <span className="font-medium text-foreground">
                          {new Date(new Date(order.startDate).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full gap-2">
                      <Download size={16} />
                      Download Invoice
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <CheckCircle2 size={16} />
                      Payment Completed
                    </Button>
                  </div>

                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                    <p className="text-xs text-blue-900">
                      <strong>Note:</strong> Once payment is confirmed, your delivery lead will contact you within 24 hours to begin the engagement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What Happens Next?</CardTitle>
                <CardDescription>Timeline and next steps after payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Payment Confirmation</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll confirm receipt of payment within 1-2 business days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Delivery Lead Assignment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your delivery lead will initiate contact within 24 hours to begin the engagement
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Input Requirements</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        You'll receive a request to submit required inputs to begin delivery
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Service Delivery Begins</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Delivery commences within 3-5 business days after input validation
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Questions about payment?</p>
                      <p className="text-xs text-muted-foreground">Our support team is here to help</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {order.stage === "Client Input Pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Status Banner */}
            <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Upload size={24} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-900 mb-1">
                    Action Required: Submit Required Inputs
                  </h3>
                  <p className="text-sm text-orange-800">
                    {order.inputs.filter((i) => i.status === "Submitted" || i.status === "Accepted").length} of {order.inputs.length} inputs submitted • Service delivery begins after input review
                  </p>
                </div>
              </div>
            </div>

            {/* Input Requirements Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Input Requirements Overview</CardTitle>
                <CardDescription>Provide the following information to begin service delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-accent/50 p-4">
                    <p className="text-2xl font-bold text-foreground">
                      {order.inputs.filter((i) => i.status === "Submitted" || i.status === "Accepted").length}/{order.inputs.length}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Inputs Submitted</p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-4">
                    <p className="text-2xl font-bold text-foreground">75%</p>
                    <p className="text-xs text-muted-foreground mt-1">Minimum Required</p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-4">
                    <p className="text-2xl font-bold text-foreground">~2-3h</p>
                    <p className="text-xs text-muted-foreground mt-1">Est. Time to Complete</p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <p className="text-xs text-blue-900">
                    <strong>Note:</strong> Service delivery requires at least 75% input completeness. Your delivery lead will review submissions within 2 business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pending Inputs */}
            {order.inputs.filter((i) => i.status === "Pending").length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Pending Inputs</h3>
                {order.inputs
                  .filter((i) => i.status === "Pending")
                  .map((input) => (
                    <Card key={input.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-base">{input.name}</CardTitle>
                            <CardDescription className="mt-1">{input.description}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="ml-4">Pending</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* File Upload Area */}
                        <div className="rounded-lg border-2 border-dashed border-border bg-accent/30 p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                          <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                          <p className="text-sm font-medium text-foreground mb-1">
                            Drop files here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF, DOC, DOCX, XLS, XLSX (Max 10MB per file)
                          </p>
                        </div>

                        {/* Add Link Option */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-px bg-border"></div>
                          <span className="text-xs text-muted-foreground">OR</span>
                          <div className="flex-1 h-px bg-border"></div>
                        </div>

                        <Button variant="outline" className="w-full gap-2">
                          <LinkIcon size={16} />
                          Add Link
                        </Button>

                        <Button className="w-full gap-2" disabled>
                          <CheckCircle2 size={16} />
                          Submit Input
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}

            {/* Submitted Inputs */}
            {order.inputs.filter((i) => i.status === "Submitted" || i.status === "Accepted").length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Submitted Inputs</h3>
                {order.inputs
                  .filter((i) => i.status === "Submitted" || i.status === "Accepted")
                  .map((input) => (
                    <Card key={input.id} className="border-green-200 bg-green-50/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{input.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Submitted on {input.submittedDate && new Date(input.submittedDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                              {input.submittedFiles && input.submittedFiles.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {input.submittedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <FileText size={12} />
                                      <span>{file.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            {input.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
                <CardDescription>Resources to help you gather required inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full gap-2 justify-start">
                  <Download size={16} />
                  Download Input Checklist
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {order.stage === "In Delivery" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Status Banner */}
            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Activity size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    Service Delivery in Progress
                  </h3>
                  <p className="text-sm text-green-800">
                    Your delivery team is actively working on your engagement • Expected completion: {new Date(order.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables Awaiting Review Alert */}
            {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length > 0 && (
              <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-900">
                      {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length} deliverable(s) ready for your review
                    </p>
                    <p className="text-xs text-purple-800 mt-1">
                      Auto-accepted in 5 days if no feedback provided
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-4 lg:grid-cols-3">
              {/* Deliverables Progress */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Deliverables Progress</CardTitle>
                  <CardDescription>Track the status of all deliverables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Summary */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                      <p className="text-2xl font-bold text-green-700">
                        {order.deliverables.filter((d) => d.status === "Accepted").length}
                      </p>
                      <p className="text-xs text-green-600 mt-1">Accepted</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 border border-purple-200 p-3">
                      <p className="text-2xl font-bold text-purple-700">
                        {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">Review</p>
                    </div>
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                      <p className="text-2xl font-bold text-blue-700">
                        {order.deliverables.filter((d) => d.status === "In Progress").length}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">In Progress</p>
                    </div>
                    <div className="rounded-lg bg-accent/50 border border-border p-3">
                      <p className="text-2xl font-bold text-foreground">
                        {order.deliverables.length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Total</p>
                    </div>
                  </div>

                  {/* Deliverables Awaiting Review */}
                  {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-foreground">Awaiting Your Review</h4>
                        {selectedDeliverables.size > 0 && canAcceptDeliverables && (
                          <Button 
                            size="sm" 
                            onClick={() => setShowBulkAcceptDialog(true)}
                            className="gap-2"
                          >
                            <CheckCircle2 size={14} />
                            Accept Selected ({selectedDeliverables.size})
                          </Button>
                        )}
                      </div>
                      {order.deliverables
                        .filter((d) => d.status === "Submitted" || d.status === "Under Review")
                        .map((deliverable) => {
                          const countdown = useCountdown(deliverable.reviewDeadline);
                          return (
                            <div key={deliverable.id} className="rounded-lg border-2 border-purple-200 bg-purple-50/50 p-4">
                              <div className="flex items-start gap-3 mb-3">
                                {canAcceptDeliverables && (
                                  <Checkbox
                                    checked={selectedDeliverables.has(deliverable.id)}
                                    onCheckedChange={() => toggleDeliverableSelection(deliverable.id)}
                                    className="mt-1"
                                  />
                                )}
                                <div className="flex items-start justify-between flex-1">
                                  <div className="flex items-start gap-3 flex-1">
                                    <FileText size={20} className="text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-foreground">{deliverable.name}</p>
                                      <p className="text-xs text-muted-foreground mt-1">{deliverable.description}</p>
                                      {deliverable.submissionDate && deliverable.reviewDeadline && (
                                        <div className="flex items-center gap-4 mt-2 text-xs">
                                          <div className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar size={12} />
                                            <span>
                                              Submitted {new Date(deliverable.submissionDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </span>
                                          </div>
                                          {countdown && !countdown.isExpired && (
                                            <div className={`flex items-center gap-1 ${getUrgencyColor(countdown)}`}>
                                              <Clock size={12} />
                                              <span>
                                                Auto-accept in {formatTimeRemaining(countdown)}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      {countdown?.isUrgent && (
                                        <div className="mt-2 rounded bg-orange-100 border border-orange-200 p-2">
                                          <p className="text-xs text-orange-900 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            <strong>Urgent:</strong> Auto-accept in {formatTimeRemaining(countdown)}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 ml-4">
                                    {deliverable.status}
                                  </Badge>
                                </div>
                              </div>

                              {/* Attachments */}
                              {deliverable.attachments && deliverable.attachments.length > 0 && (
                                <div className="mb-3 space-y-2 ml-9">
                                  {deliverable.attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex items-center justify-between rounded bg-white border border-purple-200 p-2"
                                    >
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        {attachment.type === "file" ? (
                                          <FileText size={14} className="text-muted-foreground flex-shrink-0" />
                                        ) : (
                                          <LinkIcon size={14} className="text-muted-foreground flex-shrink-0" />
                                        )}
                                        <span className="text-xs font-medium text-foreground truncate">
                                          {attachment.name}
                                        </span>
                                        {attachment.size && (
                                          <span className="text-xs text-muted-foreground">({attachment.size})</span>
                                        )}
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-6 px-2">
                                        <Download size={12} />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Review Actions */}
                              <div className="flex gap-2 ml-9">
                                <Button 
                                  size="sm" 
                                  className="gap-2"
                                  disabled={!canAcceptDeliverables}
                                  onClick={() => {
                                    setSelectedDeliverable(deliverable);
                                    setShowAcceptDialog(true);
                                  }}
                                >
                                  <CheckCircle2 size={14} />
                                  Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="gap-2"
                                  onClick={() => {
                                    setSelectedDeliverable(deliverable);
                                    setShowRevisionDialog(true);
                                  }}
                                >
                                  <MessageSquare size={14} />
                                  Request Revision
                                </Button>
                              </div>
                              {!canAcceptDeliverables && (
                                <p className="text-xs text-muted-foreground mt-2 ml-9">
                                  You don't have permission to accept deliverables
                                </p>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* Other Deliverables */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">All Deliverables</h4>
                    {order.deliverables.map((deliverable) => (
                      <div
                        key={deliverable.id}
                        className={`rounded-lg border p-3 ${
                          deliverable.status === "Accepted"
                            ? "border-green-200 bg-green-50/50"
                            : deliverable.status === "Submitted" || deliverable.status === "Under Review"
                            ? "border-purple-200 bg-purple-50/30"
                            : deliverable.status === "In Progress"
                            ? "border-blue-200 bg-blue-50/50"
                            : "border-border bg-accent/30"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2 flex-1">
                            {deliverable.status === "Accepted" ? (
                              <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            ) : deliverable.status === "Submitted" || deliverable.status === "Under Review" ? (
                              <FileText size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            ) : deliverable.status === "In Progress" ? (
                              <Loader2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0 animate-spin" />
                            ) : (
                              <Clock size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-xs font-medium text-foreground">{deliverable.name}</p>
                              {deliverable.attachments && deliverable.attachments.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {deliverable.attachments.length} attachment{deliverable.attachments.length > 1 ? "s" : ""}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              deliverable.status === "Accepted"
                                ? "bg-green-100 text-green-800 border-green-300"
                                : deliverable.status === "Submitted" || deliverable.status === "Under Review"
                                ? "bg-purple-100 text-purple-800 border-purple-300"
                                : deliverable.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : "bg-accent text-muted-foreground border-border"
                            }`}
                          >
                            {deliverable.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline & Updates */}
              <div className="space-y-4">
                {/* Engagement Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Timeline</CardTitle>
                    <CardDescription>Key milestones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 size={14} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">Kickoff</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Activity size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">In Progress</p>
                          <p className="text-xs text-muted-foreground">Current</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Clock size={14} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">Completion</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Team */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Delivery Team</CardTitle>
                    <CardDescription>Your engagement team</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {order.deliveryLead
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{order.deliveryLead}</p>
                        <p className="text-xs text-muted-foreground">Delivery Lead</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use the messaging card above to contact the team
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Updates</CardTitle>
                <CardDescription>Latest activity on your engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">Deliverable Submitted</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Practice Strategy Summary Report has been submitted for your review
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">Progress Update</p>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Practice Playbook Report is 75% complete and on track
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">Delivery Started</p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Service delivery has commenced following input approval
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upcoming Activities</CardTitle>
                <CardDescription>Scheduled milestones and checkpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Mid-Engagement Review</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Review progress and align on next steps
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">In 3 days</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Final Deliverables Due</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            All deliverables scheduled for submission
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">In 2 weeks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {order.stage === "Closed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Status Banner */}
            <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={24} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Engagement Completed
                  </h3>
                  <p className="text-sm text-gray-800">
                    Service delivery completed on {new Date(order.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })} • All deliverables accepted
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Engagement Summary</CardTitle>
                <CardDescription>Overview of completed service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-lg bg-accent/50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Service</p>
                    <p className="text-sm font-semibold text-foreground">{order.serviceName}</p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="text-sm font-semibold text-foreground">{order.duration}</p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Deliverables</p>
                    <p className="text-sm font-semibold text-foreground">
                      {order.deliverables.length} Completed
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-3">
                    <p className="text-xs text-muted-foreground mb-1">Delivery Lead</p>
                    <p className="text-sm font-semibold text-foreground">{order.deliveryLead}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deliverables Archive */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deliverables Archive</CardTitle>
                <CardDescription>All completed deliverables and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.deliverables.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className="rounded-lg border border-green-200 bg-green-50/30 p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{deliverable.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{deliverable.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          Accepted
                        </Badge>
                      </div>

                      {/* Attachments */}
                      {deliverable.attachments && deliverable.attachments.length > 0 && (
                        <div className="space-y-2">
                          {deliverable.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center justify-between rounded bg-white border border-green-200 p-2"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {attachment.type === "file" ? (
                                  <FileText size={14} className="text-muted-foreground flex-shrink-0" />
                                ) : (
                                  <LinkIcon size={14} className="text-muted-foreground flex-shrink-0" />
                                )}
                                <span className="text-xs font-medium text-foreground truncate">
                                  {attachment.name}
                                </span>
                                {attachment.size && (
                                  <span className="text-xs text-muted-foreground">({attachment.size})</span>
                                )}
                              </div>
                              <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
                                <Download size={12} />
                                <span className="text-xs">Download</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Download All */}
                  <div className="pt-2">
                    <Button variant="outline" className="w-full gap-2">
                      <Download size={16} />
                      Download All Deliverables
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentation & Invoices */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Documentation & Invoices</CardTitle>
                <CardDescription>Financial and legal documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Final Invoice
                        </p>
                        <p className="text-xs text-muted-foreground">
                          INV-{order.serviceOrderNumber}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>

                  <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Payment Receipt
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>

                  <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Engagement Summary Report
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Complete engagement overview
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      Ready for the Next Step?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Continue your digital transformation journey with our follow-up services
                    </p>
                    <div className="flex gap-2">
                      <Button className="gap-2">
                        <Package size={16} />
                        Browse Services
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare size={16} />
                        Contact Delivery Lead
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

            {/* Placeholder for other stages */}
            {!["Payment Pending", "Client Input Pending", "Input in Review", "In Delivery", "Closed"].includes(order.stage) && (
              <Card>
                <CardContent className="p-16 text-center">
                  <p className="text-muted-foreground">
                    View for "{order.stage}" stage coming soon...
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-4">
            {order.stage === "Payment Pending" ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Package size={48} className="text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground text-center">
                    Delivery tracking will be available after payment confirmation
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {/* Inputs Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Required Inputs</CardTitle>
                    <CardDescription>
                      Information and documents needed from you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {order.inputs.length > 0 ? (
                      <div className="space-y-3">
                        {order.inputs.map((input) => (
                          <div
                            key={input.id}
                            className={`rounded-lg border p-4 ${
                              input.status === "Accepted"
                                ? "border-green-200 bg-green-50/50"
                                : input.status === "Submitted" || input.status === "In Review"
                                ? "border-blue-200 bg-blue-50/50"
                                : "border-orange-200 bg-orange-50/50"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start gap-3 flex-1">
                                {input.status === "Accepted" ? (
                                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                                ) : input.status === "Submitted" || input.status === "In Review" ? (
                                  <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <AlertCircle size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{input.name}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{input.description}</p>
                                  {input.submittedDate && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Submitted on {new Date(input.submittedDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  input.status === "Accepted"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : input.status === "Submitted" || input.status === "In Review"
                                    ? "bg-blue-100 text-blue-800 border-blue-300"
                                    : "bg-orange-100 text-orange-800 border-orange-300"
                                }
                              >
                                {input.status}
                              </Badge>
                            </div>

                            {/* Upload Area for Pending Inputs */}
                            {input.status === "Pending" && (
                              <div className="mt-3 space-y-3">
                                <div className="rounded-lg border-2 border-dashed border-border bg-accent/30 p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                  <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                                  <p className="text-xs font-medium text-foreground mb-1">
                                    Drop files here or click to browse
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-px bg-border"></div>
                                  <span className="text-xs text-muted-foreground">OR</span>
                                  <div className="flex-1 h-px bg-border"></div>
                                </div>
                                <Button variant="outline" size="sm" className="w-full gap-2">
                                  <LinkIcon size={14} />
                                  Add Link
                                </Button>
                              </div>
                            )}

                            {/* Submitted Files */}
                            {input.submittedFiles && input.submittedFiles.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {input.submittedFiles.map((file, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-xs bg-white rounded p-2">
                                    <div className="flex items-center gap-2">
                                      <FileText size={14} className="text-muted-foreground" />
                                      <span className="text-foreground">{file.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                      <Download size={12} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Review Feedback */}
                            {input.reviewFeedback && (
                              <div className="mt-3 rounded bg-green-100 p-3">
                                <p className="text-xs font-medium text-green-900 mb-1">Review Feedback</p>
                                <p className="text-xs text-green-800">{input.reviewFeedback}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No inputs required for this service
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Deliverables Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                    <CardDescription>
                      Outputs and artifacts from the engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {order.deliverables.length > 0 ? (
                      <div className="space-y-3">
                        {order.deliverables.map((deliverable) => (
                          <div
                            key={deliverable.id}
                            className={`rounded-lg border p-4 ${
                              deliverable.status === "Accepted"
                                ? "border-green-200 bg-green-50/50"
                                : deliverable.status === "Submitted" || deliverable.status === "Under Review"
                                ? "border-blue-200 bg-blue-50/50"
                                : deliverable.status === "In Progress"
                                ? "border-primary/20 bg-primary/5"
                                : "border-border bg-accent/30"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start gap-3 flex-1">
                                {deliverable.status === "Accepted" ? (
                                  <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                                ) : deliverable.status === "Submitted" || deliverable.status === "Under Review" ? (
                                  <FileText size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                ) : deliverable.status === "In Progress" ? (
                                  <Loader2 size={20} className="text-primary mt-0.5 flex-shrink-0 animate-spin" />
                                ) : (
                                  <Clock size={20} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{deliverable.name}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{deliverable.description}</p>
                                  {deliverable.submissionDate && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Submitted on {new Date(deliverable.submissionDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </p>
                                  )}
                                  {deliverable.status === "Not Started" && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Delivery will begin after input approval
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  deliverable.status === "Accepted"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : deliverable.status === "Submitted" || deliverable.status === "Under Review"
                                    ? "bg-blue-100 text-blue-800 border-blue-300"
                                    : deliverable.status === "In Progress"
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : "bg-accent text-muted-foreground border-border"
                                }
                              >
                                {deliverable.status}
                              </Badge>
                            </div>

                            {/* Attachments */}
                            {deliverable.attachments && deliverable.attachments.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {deliverable.attachments.map((attachment) => (
                                  <div key={attachment.id} className="flex items-center justify-between text-xs bg-white rounded p-2">
                                    <div className="flex items-center gap-2">
                                      {attachment.type === "file" ? (
                                        <FileText size={14} className="text-muted-foreground" />
                                      ) : (
                                        <LinkIcon size={14} className="text-muted-foreground" />
                                      )}
                                      <div>
                                        <p className="text-foreground">{attachment.name}</p>
                                        {attachment.size && (
                                          <p className="text-muted-foreground">{attachment.size}</p>
                                        )}
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-6 px-2">
                                      <Download size={12} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Review Actions for Submitted/Under Review deliverables */}
                            {(deliverable.status === "Submitted" || deliverable.status === "Under Review") && (
                              <div className="mt-3 pt-3 border-t border-border space-y-2">
                                {deliverable.reviewDeadline && (() => {
                                  const countdown = useCountdown(deliverable.reviewDeadline);
                                  return countdown && !countdown.isExpired ? (
                                    <>
                                      <div className={`flex items-center gap-2 text-xs mb-2 ${getUrgencyColor(countdown)}`}>
                                        <Clock size={12} />
                                        <span>
                                          Auto-accept in {formatTimeRemaining(countdown)}
                                        </span>
                                      </div>
                                      {countdown.isUrgent && (
                                        <div className="rounded bg-orange-100 border border-orange-200 p-2 mb-2">
                                          <p className="text-xs text-orange-900 flex items-center gap-1">
                                            <AlertCircle size={12} />
                                            <strong>Urgent:</strong> This deliverable will be auto-accepted soon
                                          </p>
                                        </div>
                                      )}
                                    </>
                                  ) : null;
                                })()}
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="flex-1 gap-2"
                                    disabled={!canAcceptDeliverables}
                                    onClick={() => {
                                      setSelectedDeliverable(deliverable);
                                      setShowAcceptDialog(true);
                                    }}
                                  >
                                    <CheckCircle2 size={14} />
                                    Accept
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex-1 gap-2"
                                    onClick={() => {
                                      setSelectedDeliverable(deliverable);
                                      setShowRevisionDialog(true);
                                    }}
                                  >
                                    <MessageSquare size={14} />
                                    Request Revision
                                  </Button>
                                </div>
                                {!canAcceptDeliverables && (
                                  <p className="text-xs text-muted-foreground">
                                    You don't have permission to accept deliverables
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Client Feedback */}
                            {deliverable.clientFeedback && (
                              <div className="mt-3 rounded bg-green-100 p-3">
                                <p className="text-xs font-medium text-green-900 mb-1">Your Feedback</p>
                                <p className="text-xs text-green-800">{deliverable.clientFeedback}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No deliverables yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with your delivery team</CardDescription>
              </CardHeader>
              <CardContent>
                {order.stage === "Payment Pending" ? (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Messaging will be available after payment confirmation
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Message Thread */}
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {/* Delivery Lead Message */}
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {order.deliveryLead.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-foreground">{order.deliveryLead}</p>
                            <p className="text-xs text-muted-foreground">2 hours ago</p>
                          </div>
                          <div className="rounded-lg bg-accent p-3">
                            <p className="text-sm text-foreground">
                              Hi! I've reviewed your inputs and everything looks great. We're moving forward with the delivery phase. Let me know if you have any questions.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Customer Message */}
                      <div className="flex gap-3 flex-row-reverse">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex flex-col items-end">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                            <p className="text-sm font-medium text-foreground">You</p>
                          </div>
                          <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[80%]">
                            <p className="text-sm">
                              Thank you! Looking forward to seeing the deliverables.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* System Message */}
                      <div className="flex justify-center">
                        <div className="rounded-full bg-accent px-3 py-1">
                          <p className="text-xs text-muted-foreground">
                            {order.deliveryLead} is typing...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-border pt-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button size="sm" className="gap-2">
                          <Send size={16} />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sessions & Meetings</CardTitle>
                <CardDescription>Request and manage calls with your delivery team</CardDescription>
              </CardHeader>
              <CardContent>
                {order.stage === "Payment Pending" ? (
                  <div className="text-center py-12">
                    <Video size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Session requests will be available after payment confirmation
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Upcoming Sessions */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Upcoming Sessions</h4>
                      <div className="space-y-3">
                        <div className="rounded-lg border border-border p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Video size={20} className="text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Mid-Engagement Review</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Review progress and align on next steps
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span>Apr 17, 2026 • 2:00 PM</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>60 min</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary">Confirmed</Badge>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Video size={14} />
                              Join Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pending Requests */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Pending Requests</h4>
                      <div className="space-y-3">
                        <div className="rounded-lg border border-yellow-200 bg-yellow-50/50 p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                <Clock size={20} className="text-yellow-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Clarification Session</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Requested on Apr 10, 2026
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Awaiting delivery team confirmation
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                              Pending
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Past Sessions */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Past Sessions</h4>
                      <div className="space-y-3">
                        {order.sessions?.filter((s) => s.status === "Completed").map((session) => (
                          <div key={session.id} className="rounded-lg border border-border bg-accent/30 p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded bg-accent flex items-center justify-center flex-shrink-0">
                                  <Video size={20} className="text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{session.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {session.description}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      <span>
                                        {new Date(session.date).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })} • {new Date(session.date).toLocaleTimeString("en-US", {
                                          hour: "numeric",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock size={12} />
                                      <span>{session.duration} min</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                            
                            {/* Attendees */}
                            {session.attendees && session.attendees.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-border">
                                <p className="text-xs font-semibold text-foreground mb-2">Attendees</p>
                                <div className="space-y-2">
                                  {session.attendees.map((attendee, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                          {attendee.name.split(" ").map((n) => n[0]).join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-xs font-medium text-foreground">{attendee.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {attendee.role} • {attendee.organization}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Notes */}
                            {session.notes && (
                              <div className="mt-3 pt-3 border-t border-border">
                                <p className="text-xs font-semibold text-foreground mb-2">Session Notes</p>
                                <p className="text-xs text-muted-foreground">{session.notes}</p>
                              </div>
                            )}
                          </div>
                        ))}
                        {(!order.sessions || order.sessions.filter((s) => s.status === "Completed").length === 0) && (
                          <div className="rounded-lg border border-border bg-accent/30 p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded bg-accent flex items-center justify-center flex-shrink-0">
                                <Video size={20} className="text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Kickoff Meeting</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Initial project kickoff and requirements review
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span>Feb 5, 2026 • 10:00 AM</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>45 min</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="mt-3">Completed</Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Request New Session */}
                    <div className="border-t border-border pt-4">
                      <Button 
                        className="w-full gap-2"
                        disabled={!canRequestSessions}
                        onClick={() => {
                          toast.success("Session request sent", {
                            description: "Your delivery team will confirm the session shortly",
                          });
                        }}
                      >
                        <Calendar size={16} />
                        Request New Session
                      </Button>
                      {!canRequestSessions && (
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          You don't have permission to request sessions
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* RAID Tab */}
          <TabsContent value="raid" className="space-y-4">
            {order.stage === "Payment Pending" ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <AlertCircle size={32} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">RAID Log Unavailable</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    RAID tracking will be available once payment is confirmed and delivery begins.
                  </p>
                  <div className="text-xs text-muted-foreground text-center max-w-md">
                    You'll be able to view Risks, Assumptions, Issues, and Dependencies during active delivery.
                  </div>
                </CardContent>
              </Card>
            ) : !order.raid ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <AlertCircle size={48} className="text-muted-foreground/20 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No RAID Items</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Your delivery lead will share relevant risks, assumptions, issues, and dependencies as they arise.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Info Banner */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Showing items relevant to your engagement
                      </p>
                      <p className="text-xs text-blue-800 mt-1">
                        Your delivery lead manages additional internal tracking to ensure smooth delivery.
                      </p>
                    </div>
                  </div>
                </div>

                {/* RAID Type Selector */}
                <div className="flex gap-2">
                  <Button
                    variant={raidView === "risks" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRaidView("risks")}
                    className="gap-2"
                  >
                    <AlertCircle size={14} />
                    Risks ({order.raid.risks.filter(r => r.visibility === "External").length})
                  </Button>
                  <Button
                    variant={raidView === "issues" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRaidView("issues")}
                    className="gap-2"
                  >
                    <AlertCircle size={14} />
                    Issues ({order.raid.issues.filter(i => i.visibility === "External").length})
                  </Button>
                  <Button
                    variant={raidView === "assumptions" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRaidView("assumptions")}
                    className="gap-2"
                  >
                    <CheckCircle2 size={14} />
                    Assumptions ({order.raid.assumptions.filter(a => a.visibility === "External").length})
                  </Button>
                  <Button
                    variant={raidView === "dependencies" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRaidView("dependencies")}
                    className="gap-2"
                  >
                    <Activity size={14} />
                    Dependencies ({order.raid.dependencies.filter(d => d.visibility === "External").length})
                  </Button>
                </div>

                {/* RAID Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base capitalize">{raidView}</CardTitle>
                    <CardDescription>
                      {raidView === "risks" && "Potential issues that may impact delivery timeline or scope"}
                      {raidView === "issues" && "Current blockers or problems requiring attention"}
                      {raidView === "assumptions" && "Key assumptions about resources, timelines, or requirements"}
                      {raidView === "dependencies" && "External dependencies that may affect delivery"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Risks Table */}
                    {raidView === "risks" && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Risk</TableHead>
                            <TableHead className="w-24">Severity</TableHead>
                            <TableHead className="w-24">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-32">Due Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.risks
                            .filter(risk => risk.visibility === "External")
                            .map((risk) => (
                              <TableRow key={risk.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{risk.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{risk.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      <span className="font-medium">Mitigation:</span> {risk.mitigationPlan}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    risk.severity === "Critical" ? "destructive" :
                                    risk.severity === "High" ? "default" :
                                    "secondary"
                                  } className="text-xs">
                                    {risk.severity}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {risk.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{risk.owner}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(risk.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.risks.filter(risk => risk.visibility === "External").length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
                                <p>No risks identified at this time</p>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}

                    {/* Issues Table */}
                    {raidView === "issues" && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Issue</TableHead>
                            <TableHead className="w-24">Severity</TableHead>
                            <TableHead className="w-32">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-32">Due Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.issues
                            .filter(issue => issue.visibility === "External")
                            .map((issue) => (
                              <TableRow key={issue.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{issue.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      <span className="font-medium">Resolution:</span> {issue.resolution}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    issue.severity === "Critical" ? "destructive" :
                                    issue.severity === "High" ? "default" :
                                    "secondary"
                                  } className="text-xs">
                                    {issue.severity}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    issue.status === "Blocked" ? "destructive" :
                                    issue.status === "In Progress" ? "default" :
                                    "outline"
                                  } className="text-xs">
                                    {issue.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{issue.owner}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(issue.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.issues.filter(issue => issue.visibility === "External").length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
                                <p>No issues at this time</p>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}

                    {/* Assumptions Table */}
                    {raidView === "assumptions" && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assumption</TableHead>
                            <TableHead className="w-32">Category</TableHead>
                            <TableHead className="w-32">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-32">Validated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.assumptions
                            .filter(assumption => assumption.visibility === "External")
                            .map((assumption) => (
                              <TableRow key={assumption.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{assumption.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{assumption.description}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {assumption.category}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    assumption.status === "Valid" ? "default" :
                                    assumption.status === "Invalid" ? "destructive" :
                                    "secondary"
                                  } className="text-xs">
                                    {assumption.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{assumption.owner}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {assumption.validatedDate 
                                    ? new Date(assumption.validatedDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                    : "Pending"
                                  }
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.assumptions.filter(assumption => assumption.visibility === "External").length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
                                <p>No assumptions documented</p>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}

                    {/* Dependencies Table */}
                    {raidView === "dependencies" && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dependency</TableHead>
                            <TableHead className="w-32">Type</TableHead>
                            <TableHead className="w-32">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-32">Required By</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.dependencies
                            .filter(dependency => dependency.visibility === "External")
                            .map((dependency) => (
                              <TableRow key={dependency.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{dependency.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{dependency.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      <span className="font-medium">Dependent on:</span> {dependency.dependentOn}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {dependency.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={
                                    dependency.status === "Received" ? "default" :
                                    dependency.status === "Blocked" ? "destructive" :
                                    "secondary"
                                  } className="text-xs">
                                    {dependency.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{dependency.owner}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(dependency.requiredDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.dependencies.filter(dependency => dependency.visibility === "External").length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500" />
                                <p>No external dependencies</p>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Complete history of actions and events</CardDescription>
              </CardHeader>
              <CardContent>
                {order.stage === "Payment Pending" ? (
                  <div className="text-center py-12">
                    <Activity size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Activity tracking will be available after payment confirmation
                    </p>
                  </div>
                ) : order.auditLog && order.auditLog.length > 0 ? (
                  <div className="space-y-4">
                    {order.auditLog.map((entry) => (
                      <div key={entry.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          entry.type === "deliverable" ? "bg-purple-100" :
                          entry.type === "input" ? "bg-blue-100" :
                          entry.type === "payment" ? "bg-green-100" :
                          entry.type === "session" ? "bg-orange-100" :
                          "bg-gray-100"
                        }`}>
                          {entry.type === "deliverable" ? <FileText size={16} className="text-purple-600" /> :
                           entry.type === "input" ? <Upload size={16} className="text-blue-600" /> :
                           entry.type === "payment" ? <DollarSign size={16} className="text-green-600" /> :
                           entry.type === "session" ? <Video size={16} className="text-orange-600" /> :
                           <MessageSquare size={16} className="text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <p className="text-sm font-medium text-foreground">{entry.action}</p>
                              <p className="text-xs text-muted-foreground mt-1">{entry.details}</p>
                              <p className="text-xs text-muted-foreground mt-1">by {entry.user}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(entry.timestamp).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })} • {new Date(entry.timestamp).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              entry.type === "deliverable" ? "bg-purple-50 text-purple-700 border-purple-200" :
                              entry.type === "input" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              entry.type === "payment" ? "bg-green-50 text-green-700 border-green-200" :
                              entry.type === "session" ? "bg-orange-50 text-orange-700 border-orange-200" :
                              "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            {entry.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Activity size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No activity recorded yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commercials Tab */}
          <TabsContent value="commercials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Commercial Details</CardTitle>
                <CardDescription>Invoices, payments, and financial information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Summary */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Order Summary</h4>
                    <div className="rounded-lg border border-border p-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service</span>
                        <span className="font-medium text-foreground">{order.serviceName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Order Number</span>
                        <span className="font-medium text-foreground">{order.serviceOrderNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium text-foreground">{order.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t border-border pt-3">
                        <span className="font-semibold text-foreground">Total Amount</span>
                        <span className="font-bold text-foreground">
                          {order.currency} {order.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Payment Status</h4>
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded flex items-center justify-center ${
                            order.stage === "Payment Pending" 
                              ? "bg-yellow-100" 
                              : "bg-green-100"
                          }`}>
                            <DollarSign size={20} className={
                              order.stage === "Payment Pending" 
                                ? "text-yellow-600" 
                                : "text-green-600"
                            } />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {order.stage === "Payment Pending" ? "Payment Pending" : "Payment Received"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.stage === "Payment Pending" 
                                ? "Awaiting payment confirmation" 
                                : `Paid on ${new Date(order.startDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}`
                              }
                            </p>
                          </div>
                        </div>
                        <Badge variant={order.stage === "Payment Pending" ? "secondary" : "outline"} 
                          className={order.stage === "Payment Pending" ? "" : "bg-green-100 text-green-800 border-green-300"}>
                          {order.stage === "Payment Pending" ? "Pending" : "Paid"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Invoices */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Invoices & Documents</h4>
                    <div className="space-y-2">
                      <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Invoice INV-{order.serviceOrderNumber}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Issued {new Date(order.startDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download size={14} />
                          Download
                        </Button>
                      </div>

                      {order.stage !== "Payment Pending" && (
                        <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Payment Receipt
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(order.startDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download size={14} />
                            Download
                          </Button>
                        </div>
                      )}

                      <div className="rounded-lg border border-border p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Terms of Service
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Service agreement and terms
                            </p>
                          </div>
                        </div>
                        <a href="/legal/terms" target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <LinkIcon size={14} />
                            View
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {order.stage === "Input in Review" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Status Banner */}
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">
                    Inputs Under Review
                  </h3>
                  <p className="text-sm text-blue-800">
                    Your delivery lead is reviewing submitted inputs • Typically takes 5 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Review Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Review Status</CardTitle>
                <CardDescription>Your inputs are being evaluated for completeness and quality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-accent/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Submitted On</p>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {order.inputs.find((i) => i.submittedDate)?.submittedDate && 
                        new Date(order.inputs.find((i) => i.submittedDate)!.submittedDate!).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Expected Completion</p>
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {order.inputs.find((i) => i.submittedDate)?.submittedDate && 
                        new Date(new Date(order.inputs.find((i) => i.submittedDate)!.submittedDate!).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Review in Progress</p>
                      <p className="text-xs text-muted-foreground">Your delivery lead is evaluating your submissions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submitted Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Submitted Inputs</CardTitle>
                <CardDescription>All inputs submitted for review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.inputs
                  .filter((i) => i.status === "Submitted" || i.status === "In Review" || i.status === "Accepted")
                  .map((input) => (
                    <div
                      key={input.id}
                      className={`rounded-lg border p-4 ${
                        input.status === "Accepted"
                          ? "border-green-200 bg-green-50/50"
                          : "border-blue-200 bg-blue-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3 flex-1">
                          {input.status === "Accepted" ? (
                            <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{input.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {input.submittedDate && `Submitted on ${new Date(input.submittedDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}`}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={
                            input.status === "Accepted"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-blue-100 text-blue-800 border-blue-300"
                          }
                        >
                          {input.status}
                        </Badge>
                      </div>

                      {/* Submitted Files */}
                      {input.submittedFiles && input.submittedFiles.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {input.submittedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs bg-white rounded p-2">
                              <div className="flex items-center gap-2">
                                <FileText size={14} className="text-muted-foreground" />
                                <span className="text-foreground">{file.name}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Download size={12} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Review Feedback (if accepted) */}
                      {input.status === "Accepted" && input.reviewFeedback && (
                        <div className="mt-3 rounded bg-green-100 p-3">
                          <p className="text-xs font-medium text-green-900 mb-1">Review Feedback</p>
                          <p className="text-xs text-green-800">{input.reviewFeedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* What's Being Reviewed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What's Being Reviewed</CardTitle>
                <CardDescription>Quality criteria for input evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Completeness Check</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Verifying all required information and files are provided (75% threshold)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Quality Assessment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reviewing file formats, data accuracy, and documentation clarity
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare size={14} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Clarification Needs</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Identifying any additional information required to proceed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What Happens Next?</CardTitle>
                <CardDescription>Next steps after review completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Review Completion</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your delivery lead will complete the review within 5 business days
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Feedback or Clarifications</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        If additional information is needed, you'll receive specific requests
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Service Delivery Begins</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Once inputs are approved, delivery commences within 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Questions about the review?</p>
                      <p className="text-xs text-muted-foreground">Use the messaging card above to contact your delivery lead</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
      
      {/* Confirmation Dialogs */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Deliverable?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to accept "{selectedDeliverable?.name}". This action confirms that the deliverable meets your requirements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptDeliverable}>Accept</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRevisionDialog} onOpenChange={setShowRevisionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Revision?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to request revisions for "{selectedDeliverable?.name}". The delivery team will be notified and will address your feedback.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRequestRevision}>Request Revision</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showBulkAcceptDialog} onOpenChange={setShowBulkAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept {selectedDeliverables.size} Deliverable{selectedDeliverables.size > 1 ? 's' : ''}?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to accept {selectedDeliverables.size} deliverable{selectedDeliverables.size > 1 ? 's' : ''}. This action confirms that all selected deliverables meet your requirements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkAccept}>Accept All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default CustomerServiceOrderDetail;
