import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  Download,
  MessageSquare,
  Plus,
  Link as LinkIcon,
  Activity,
  Eye,
  EyeOff,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/DashboardLayout";
import { mockOrders } from "@/data/mockOrders";

const ServiceOrderDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [raidView, setRaidView] = useState<"risks" | "assumptions" | "issues" | "dependencies">("risks");
  const [raidVisibility, setRaidVisibility] = useState<"all" | "internal" | "external">("all");
  
  // Find the order
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">The service order you're looking for doesn't exist.</p>
            <Link to="/dashboard/orders">
              <Button>Back to Orders</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Payment Pending":
        return "bg-yellow-500";
      case "Client Input Pending":
        return "bg-orange-500";
      case "Input in Review":
        return "bg-blue-500";
      case "In Delivery":
        return "bg-purple-500";
      case "Deliverables Pending Review":
        return "bg-cyan-500";
      case "Closed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStageVariant = (stage: string) => {
    switch (stage) {
      case "Closed":
        return "default";
      case "In Delivery":
        return "default";
      default:
        return "secondary";
    }
  };

  const getInputStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "text-green-600";
      case "In Review":
        return "text-blue-600";
      case "Submitted":
        return "text-purple-600";
      case "Pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getDeliverableStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "text-green-600";
      case "Under Review":
        return "text-cyan-600";
      case "Submitted":
        return "text-blue-600";
      case "In Progress":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const calculateProgress = () => {
    const totalInputs = order.inputs.length;
    const acceptedInputs = order.inputs.filter((i) => i.status === "Accepted").length;
    const totalDeliverables = order.deliverables.length;
    const completedDeliverables = order.deliverables.filter(
      (d) => d.status === "Accepted" || d.status === "Submitted"
    ).length;

    const inputProgress = totalInputs > 0 ? (acceptedInputs / totalInputs) * 50 : 0;
    const deliverableProgress = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 50 : 0;

    return Math.round(inputProgress + deliverableProgress);
  };

  const progress = calculateProgress();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Back Navigation */}
        <Link to="/dashboard/orders">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} />
            Back to Orders
          </Button>
        </Link>

        {/* Order Header */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{order.serviceName}</h1>
                <Badge variant={getStageVariant(order.stage)} className="text-xs">
                  {order.stage}
                </Badge>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {order.serviceType}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <FileText size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Order Number</p>
                    <p className="font-medium text-foreground">{order.serviceOrderNumber}</p>
                  </div>
                </div>
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
                  <Clock size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{order.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-medium text-foreground">
                      {order.currency} {order.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted p-1 h-auto gap-0.5">
            <TabsTrigger value="overview" className="px-4 py-1.5 text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="delivery" className="px-4 py-1.5 text-sm">
              Delivery
            </TabsTrigger>
            <TabsTrigger value="raid" className="px-4 py-1.5 text-sm">
              RAID
            </TabsTrigger>
            <TabsTrigger value="sessions" className="px-4 py-1.5 text-sm">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="inbox" className="px-4 py-1.5 text-sm">
              Inbox
            </TabsTrigger>
            <TabsTrigger value="commercial" className="px-4 py-1.5 text-sm">
              Commercial & Terms
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Payment Pending Banner */}
            {order.stage === "Payment Pending" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={24} className="text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-1">
                      Awaiting Payment Confirmation
                    </h3>
                    <p className="text-sm text-yellow-800 mb-4">
                      This service order is pending payment confirmation from the client. Once payment is confirmed, you'll be able to request inputs and begin delivery.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="outline" className="bg-white hover:bg-yellow-50 border-yellow-300">
                        <MessageSquare size={16} className="mr-2" />
                        Notify Client
                      </Button>
                      <Button size="sm" variant="ghost" className="text-yellow-900 hover:bg-yellow-100">
                        View Payment Details
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Client Input Pending Banner */}
            {order.stage === "Client Input Pending" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-orange-900 mb-1">
                      Waiting for Client Inputs
                    </h3>
                    <p className="text-sm text-orange-800 mb-4">
                      {order.inputs.filter((i) => i.status === "Pending").length} input(s) are pending submission from {order.clientOrganisation}. Delivery will begin once all required inputs are received and reviewed.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" variant="outline" className="bg-white hover:bg-orange-50 border-orange-300">
                        <MessageSquare size={16} className="mr-2" />
                        Send Reminder to Client
                      </Button>
                      <Button size="sm" variant="ghost" className="text-orange-900 hover:bg-orange-100">
                        View All Inputs
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Input in Review Banner */}
            {order.stage === "Input in Review" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">
                      Review Client Inputs
                    </h3>
                    <p className="text-sm text-blue-800 mb-4">
                      {order.inputs.filter((i) => i.status === "Submitted" || i.status === "In Review").length} input(s) need your review. Verify quality and completeness before proceeding to delivery.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <CheckCircle2 size={16} className="mr-2" />
                        Review Inputs
                      </Button>
                      <Button size="sm" variant="ghost" className="text-blue-900 hover:bg-blue-100">
                        View Guidelines
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* In Delivery Banner */}
            {order.stage === "In Delivery" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-purple-200 bg-purple-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-900 mb-1">
                      Delivery in Progress
                    </h3>
                    <p className="text-sm text-purple-800 mb-4">
                      {order.deliverables.filter((d) => d.status === "In Progress").length} deliverable(s) in progress. Track your work and submit completed deliverables for client review.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Upload size={16} className="mr-2" />
                        Submit Deliverable
                      </Button>
                      <Button size="sm" variant="ghost" className="text-purple-900 hover:bg-purple-100">
                        View Timeline
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Deliverables Pending Review Banner */}
            {order.stage === "Deliverables Pending Review" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-cyan-200 bg-cyan-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-cyan-900 mb-1">
                      Awaiting Client Review
                    </h3>
                    <p className="text-sm text-cyan-800 mb-4">
                      {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length} deliverable(s) submitted for client review. Deliverables are auto-accepted after 5 days if no feedback is provided.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                        <MessageSquare size={16} className="mr-2" />
                        Follow Up with Client
                      </Button>
                      <Button size="sm" variant="ghost" className="text-cyan-900 hover:bg-cyan-100">
                        View All Deliverables
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Closed Banner */}
            {order.stage === "Closed" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-2 border-green-200 bg-green-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={24} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-900 mb-1">
                      Engagement Completed Successfully
                    </h3>
                    <p className="text-sm text-green-800 mb-4">
                      All deliverables have been accepted by {order.clientOrganisation}. This service order is now closed.
                    </p>
                    <div className="flex items-center gap-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Download size={16} className="mr-2" />
                        Download Summary Report
                      </Button>
                      <Button size="sm" variant="ghost" className="text-green-900 hover:bg-green-100">
                        View All Deliverables
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid gap-4 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4">
                {/* Input Review Cards - Input in Review Specific */}
                {order.stage === "Input in Review" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Review Client Inputs</CardTitle>
                      <CardDescription>Verify quality and completeness of submitted inputs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {order.inputs
                        .filter((input) => input.status === "Submitted" || input.status === "In Review")
                        .map((input) => (
                          <div
                            key={input.id}
                            className="p-4 rounded-lg border-2 border-blue-200 bg-blue-50"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-foreground">{input.name}</p>
                                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                                    {input.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{input.description}</p>
                              </div>
                            </div>

                            {/* Submitted Files */}
                            {input.submittedFiles && input.submittedFiles.length > 0 && (
                              <div className="mb-3 p-3 rounded-lg bg-white border border-blue-200">
                                <p className="text-xs font-medium text-muted-foreground mb-2">Submitted Files</p>
                                <div className="space-y-2">
                                  {input.submittedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                      <div className="flex items-center gap-2">
                                        <FileText size={14} className="text-blue-600" />
                                        <span className="text-foreground">{file.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(file.uploadDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </span>
                                        <Button variant="ghost" size="sm" className="h-7 px-2">
                                          <Download size={14} />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Submitted Date */}
                            {input.submittedDate && (
                              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={14} />
                                <span>
                                  Submitted on{" "}
                                  {new Date(input.submittedDate).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}

                            {/* Review Actions */}
                            <div className="flex items-center gap-2 pt-3 border-t border-blue-200">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle2 size={14} className="mr-1" />
                                Accept Input
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-amber-300 text-amber-900 hover:bg-amber-50"
                              >
                                <MessageSquare size={14} className="mr-1" />
                                Request Clarification
                              </Button>
                            </div>
                          </div>
                        ))}

                      {/* Already Accepted Inputs */}
                      {order.inputs.filter((input) => input.status === "Accepted").length > 0 && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-medium text-muted-foreground mb-3">Accepted Inputs</p>
                          <div className="space-y-2">
                            {order.inputs
                              .filter((input) => input.status === "Accepted")
                              .map((input) => (
                                <div
                                  key={input.id}
                                  className="p-3 rounded-lg border border-green-200 bg-green-50"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle2 size={16} className="text-green-600" />
                                      <p className="text-sm font-medium text-foreground">{input.name}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-xs">
                                      Accepted
                                    </Badge>
                                  </div>
                                  {input.reviewFeedback && (
                                    <p className="text-xs text-muted-foreground mt-2 ml-6">{input.reviewFeedback}</p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Review Guidelines - Input in Review Specific */}
                {order.stage === "Input in Review" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Review Guidelines</CardTitle>
                      <CardDescription>Best practices for input review</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Verify Completeness</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Ensure all required information and files are provided
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Check Quality</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Review file formats, data accuracy, and documentation clarity
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MessageSquare size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Provide Clear Feedback</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              When requesting clarification, be specific about what's needed
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Clock size={14} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Timely Review</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Review inputs promptly to avoid delays in delivery timeline
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Deliverables Progress - In Delivery Specific */}
                {order.stage === "In Delivery" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Deliverables Progress</CardTitle>
                      <CardDescription>Track status of all deliverables</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {order.deliverables.map((deliverable) => (
                        <div
                          key={deliverable.id}
                          className={`p-4 rounded-lg border-2 ${
                            deliverable.status === "In Progress"
                              ? "border-purple-200 bg-purple-50"
                              : deliverable.status === "Submitted"
                              ? "border-cyan-200 bg-cyan-50"
                              : "border-green-200 bg-green-50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm text-foreground">{deliverable.name}</p>
                                <Badge
                                  variant="outline"
                                  className={
                                    deliverable.status === "In Progress"
                                      ? "bg-purple-100 text-purple-800 border-purple-300"
                                      : deliverable.status === "Submitted"
                                      ? "bg-cyan-100 text-cyan-800 border-cyan-300"
                                      : "bg-green-100 text-green-800 border-green-300"
                                  }
                                >
                                  {deliverable.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{deliverable.description}</p>
                            </div>
                          </div>

                          {/* Attachments */}
                          {deliverable.attachments && deliverable.attachments.length > 0 && (
                            <div className="mb-3 p-3 rounded-lg bg-white border border-border">
                              <p className="text-xs font-medium text-muted-foreground mb-2">
                                Attachments ({deliverable.attachments.length})
                              </p>
                              <div className="space-y-2">
                                {deliverable.attachments.map((attachment) => (
                                  <div key={attachment.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      {attachment.type === "file" ? (
                                        <FileText size={14} className="text-purple-600 flex-shrink-0" />
                                      ) : (
                                        <LinkIcon size={14} className="text-blue-600 flex-shrink-0" />
                                      )}
                                      <span className="text-foreground truncate">{attachment.name}</span>
                                      {attachment.size && (
                                        <span className="text-xs text-muted-foreground flex-shrink-0">
                                          ({attachment.size})
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(attachment.uploadDate).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </span>
                                      <Button variant="ghost" size="sm" className="h-7 px-2">
                                        {attachment.type === "file" ? (
                                          <Download size={14} />
                                        ) : (
                                          <LinkIcon size={14} />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Submission Info */}
                          {deliverable.submissionDate && (
                            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar size={14} />
                              <span>
                                Submitted on{" "}
                                {new Date(deliverable.submissionDate).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-3 border-t border-border">
                            {deliverable.status === "In Progress" && (
                              <>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                  <Upload size={14} className="mr-1" />
                                  Add Attachment
                                </Button>
                                <Button size="sm" variant="outline">
                                  <FileText size={14} className="mr-1" />
                                  Submit for Review
                                </Button>
                              </>
                            )}
                            {deliverable.status === "Submitted" && (
                              <div className="flex items-center gap-2 text-sm text-cyan-700">
                                <Clock size={14} />
                                <span>Awaiting client review</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Client Inputs Summary - In Delivery Specific */}
                {order.stage === "In Delivery" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Client Inputs</CardTitle>
                      <CardDescription>Reference materials from client</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.inputs
                          .filter((input) => input.status === "Accepted")
                          .map((input) => (
                            <div
                              key={input.id}
                              className="flex items-start gap-3 p-3 rounded-lg border border-green-200 bg-green-50"
                            >
                              <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{input.name}</p>
                                {input.submittedFiles && input.submittedFiles.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {input.submittedFiles.map((file, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-xs">
                                        <FileText size={12} className="text-green-600" />
                                        <span className="text-muted-foreground">{file.name}</span>
                                        <Button variant="ghost" size="sm" className="h-6 px-2 ml-auto">
                                          <Download size={12} />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Deliverables Review Status - Deliverables Pending Review Specific */}
                {order.stage === "Deliverables Pending Review" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Deliverables Review Status</CardTitle>
                      <CardDescription>Track client review progress and deadlines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {order.deliverables
                        .filter((d) => d.status === "Submitted" || d.status === "Under Review")
                        .map((deliverable) => {
                          const daysRemaining = deliverable.reviewDeadline
                            ? Math.ceil(
                                (new Date(deliverable.reviewDeadline).getTime() - new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )
                            : 0;
                          const isUrgent = daysRemaining <= 2;

                          return (
                            <div
                              key={deliverable.id}
                              className={`p-4 rounded-lg border-2 ${
                                deliverable.status === "Under Review"
                                  ? "border-blue-200 bg-blue-50"
                                  : "border-cyan-200 bg-cyan-50"
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold text-sm text-foreground">{deliverable.name}</p>
                                    <Badge
                                      variant="outline"
                                      className={
                                        deliverable.status === "Under Review"
                                          ? "bg-blue-100 text-blue-800 border-blue-300"
                                          : "bg-cyan-100 text-cyan-800 border-cyan-300"
                                      }
                                    >
                                      {deliverable.status}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{deliverable.description}</p>
                                </div>
                              </div>

                              {/* Review Timeline */}
                              <div
                                className={`mb-3 p-3 rounded-lg border ${
                                  isUrgent
                                    ? "bg-amber-50 border-amber-200"
                                    : "bg-white border-border"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-xs font-medium text-muted-foreground">Review Timeline</p>
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} className={isUrgent ? "text-amber-600" : "text-muted-foreground"} />
                                    <span
                                      className={`text-xs font-medium ${
                                        isUrgent ? "text-amber-900" : "text-foreground"
                                      }`}
                                    >
                                      {daysRemaining > 0
                                        ? `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`
                                        : "Auto-accepting today"}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>
                                    Submitted:{" "}
                                    {deliverable.submissionDate &&
                                      new Date(deliverable.submissionDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                  </span>
                                  <span>•</span>
                                  <span>
                                    Auto-accept:{" "}
                                    {deliverable.reviewDeadline &&
                                      new Date(deliverable.reviewDeadline).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })}
                                  </span>
                                </div>
                                {isUrgent && (
                                  <p className="text-xs text-amber-700 mt-2">
                                    ⚠️ Will be auto-accepted soon if no client feedback is received
                                  </p>
                                )}
                              </div>

                              {/* Attachments */}
                              {deliverable.attachments && deliverable.attachments.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-xs font-medium text-muted-foreground mb-2">
                                    Submitted Attachments ({deliverable.attachments.length})
                                  </p>
                                  <div className="space-y-1">
                                    {deliverable.attachments.map((attachment) => (
                                      <div
                                        key={attachment.id}
                                        className="flex items-center gap-2 text-xs text-muted-foreground"
                                      >
                                        {attachment.type === "file" ? (
                                          <FileText size={12} className="text-cyan-600" />
                                        ) : (
                                          <LinkIcon size={12} className="text-blue-600" />
                                        )}
                                        <span className="flex-1 truncate">{attachment.name}</span>
                                        {attachment.size && <span>({attachment.size})</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center gap-2 pt-3 border-t border-border">
                                <Button size="sm" variant="outline">
                                  <MessageSquare size={14} className="mr-1" />
                                  Send Reminder
                                </Button>
                                <Button size="sm" variant="ghost">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          );
                        })}

                      {/* Accepted Deliverables */}
                      {order.deliverables.filter((d) => d.status === "Accepted").length > 0 && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm font-medium text-muted-foreground mb-3">Accepted Deliverables</p>
                          <div className="space-y-2">
                            {order.deliverables
                              .filter((d) => d.status === "Accepted")
                              .map((deliverable) => (
                                <div
                                  key={deliverable.id}
                                  className="p-3 rounded-lg border border-green-200 bg-green-50"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle2 size={16} className="text-green-600" />
                                      <p className="text-sm font-medium text-foreground">{deliverable.name}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-xs">
                                      Accepted
                                    </Badge>
                                  </div>
                                  {deliverable.clientFeedback && (
                                    <p className="text-xs text-muted-foreground mt-2 ml-6">{deliverable.clientFeedback}</p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Review Guidelines - Deliverables Pending Review Specific */}
                {order.stage === "Deliverables Pending Review" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">What Happens Next</CardTitle>
                      <CardDescription>Understanding the review process</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Clock size={14} className="text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">5-Day Review Window</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Client has 5 business days to review and provide feedback on deliverables
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 size={14} className="text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Auto-Acceptance</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Deliverables are automatically accepted if no feedback is received within the review period
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MessageSquare size={14} className="text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Proactive Communication</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Send reminders to clients approaching their review deadline
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FileText size={14} className="text-cyan-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Revision Requests</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              If client requests changes, deliverable status will update and you'll be notified
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Engagement Summary - Closed Specific */}
                {order.stage === "Closed" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Engagement Summary</CardTitle>
                      <CardDescription>Overview of completed service delivery</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 size={16} className="text-green-600" />
                            <p className="text-sm font-medium text-foreground">Deliverables</p>
                          </div>
                          <p className="text-2xl font-bold text-green-900">{order.deliverables.length}</p>
                          <p className="text-xs text-muted-foreground mt-1">All accepted by client</p>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText size={16} className="text-blue-600" />
                            <p className="text-sm font-medium text-foreground">Client Inputs</p>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">{order.inputs.length}</p>
                          <p className="text-xs text-muted-foreground mt-1">Processed successfully</p>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar size={16} className="text-purple-600" />
                            <p className="text-sm font-medium text-foreground">Duration</p>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">{order.duration}</p>
                          <p className="text-xs text-muted-foreground mt-1">Completed on schedule</p>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign size={16} className="text-amber-600" />
                            <p className="text-sm font-medium text-foreground">Contract Value</p>
                          </div>
                          <p className="text-2xl font-bold text-amber-900">
                            {order.currency} {(order.price / 1000).toFixed(0)}K
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Fully delivered</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Accepted Deliverables - Closed Specific */}
                {order.stage === "Closed" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Accepted Deliverables</CardTitle>
                      <CardDescription>All deliverables approved by client</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {order.deliverables.map((deliverable) => (
                        <div
                          key={deliverable.id}
                          className="p-4 rounded-lg border-2 border-green-200 bg-green-50"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle2 size={16} className="text-green-600" />
                                <p className="font-semibold text-sm text-foreground">{deliverable.name}</p>
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Accepted
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{deliverable.description}</p>
                            </div>
                          </div>

                          {/* Client Feedback */}
                          {deliverable.clientFeedback && (
                            <div className="mb-3 p-3 rounded-lg bg-white border border-green-200">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Client Feedback</p>
                              <p className="text-sm text-foreground italic">"{deliverable.clientFeedback}"</p>
                            </div>
                          )}

                          {/* Attachments */}
                          {deliverable.attachments && deliverable.attachments.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-medium text-muted-foreground mb-2">
                                Attachments ({deliverable.attachments.length})
                              </p>
                              <div className="space-y-1">
                                {deliverable.attachments.map((attachment) => (
                                  <div
                                    key={attachment.id}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                      {attachment.type === "file" ? (
                                        <FileText size={14} className="text-green-600 flex-shrink-0" />
                                      ) : (
                                        <LinkIcon size={14} className="text-blue-600 flex-shrink-0" />
                                      )}
                                      <span className="text-foreground truncate">{attachment.name}</span>
                                      {attachment.size && (
                                        <span className="text-xs text-muted-foreground flex-shrink-0">
                                          ({attachment.size})
                                        </span>
                                      )}
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-7 px-2 flex-shrink-0">
                                      {attachment.type === "file" ? (
                                        <Download size={14} />
                                      ) : (
                                        <LinkIcon size={14} />
                                      )}
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Submission Date */}
                          {deliverable.submissionDate && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-green-200">
                              <Calendar size={12} />
                              <span>
                                Submitted on{" "}
                                {new Date(deliverable.submissionDate).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Client Inputs Archive - Closed Specific */}
                {order.stage === "Closed" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Client Inputs Archive</CardTitle>
                      <CardDescription>Reference materials used for delivery</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.inputs.map((input) => (
                          <div
                            key={input.id}
                            className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30"
                          >
                            <FileText size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{input.name}</p>
                              {input.submittedFiles && input.submittedFiles.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {input.submittedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs">
                                      <FileText size={12} className="text-muted-foreground" />
                                      <span className="text-muted-foreground">{file.name}</span>
                                      <Button variant="ghost" size="sm" className="h-6 px-2 ml-auto">
                                        <Download size={12} />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Input Status Tracking - Client Input Pending Specific */}
                {order.stage === "Client Input Pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Input Status Tracking</CardTitle>
                      <CardDescription>Monitor client input submissions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {order.inputs.map((input) => (
                        <div
                          key={input.id}
                          className={`p-4 rounded-lg border ${
                            input.status === "Pending"
                              ? "border-orange-200 bg-orange-50"
                              : input.status === "Submitted"
                              ? "border-blue-200 bg-blue-50"
                              : "border-green-200 bg-green-50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-sm text-foreground">{input.name}</p>
                                <Badge
                                  variant="outline"
                                  className={
                                    input.status === "Pending"
                                      ? "bg-orange-100 text-orange-800 border-orange-300"
                                      : input.status === "Submitted"
                                      ? "bg-blue-100 text-blue-800 border-blue-300"
                                      : "bg-green-100 text-green-800 border-green-300"
                                  }
                                >
                                  {input.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{input.description}</p>
                            </div>
                          </div>
                          {input.status === "Pending" && (
                            <div className="flex items-center gap-2 mt-3">
                              <Button size="sm" variant="outline" className="text-xs h-7">
                                <MessageSquare size={14} className="mr-1" />
                                Send Reminder
                              </Button>
                              <Button size="sm" variant="ghost" className="text-xs h-7">
                                View Details
                              </Button>
                            </div>
                          )}
                          {input.status === "Submitted" && (
                            <div className="mt-3 flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-blue-600" />
                              <p className="text-xs text-blue-800">
                                Submitted on {new Date(input.submittedDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </p>
                              <Button size="sm" variant="outline" className="text-xs h-7 ml-auto">
                                Review Input
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Next Steps - Client Input Pending Specific */}
                {order.stage === "Client Input Pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Next Steps</CardTitle>
                      <CardDescription>Actions you can take while waiting for inputs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Follow up with client</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Send reminders for pending inputs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Prepare delivery approach</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Plan methodology and timeline for deliverables
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar size={16} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Schedule kickoff session</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Plan initial meeting once inputs are received
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Service Scope Overview - Payment Pending Specific */}
                {order.stage === "Payment Pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Service Scope</CardTitle>
                      <CardDescription>Review what will be delivered once payment is confirmed</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Service Type</h4>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {order.serviceType}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Duration</h4>
                        <p className="text-sm text-muted-foreground">{order.duration}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">Expected Deliverables</h4>
                        <ul className="space-y-2">
                          {order.deliverables.map((deliverable) => (
                            <li key={deliverable.id} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-foreground">{deliverable.name}</p>
                                <p className="text-xs text-muted-foreground">{deliverable.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Required Inputs Preview - Payment Pending Specific */}
                {order.stage === "Payment Pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Required Client Inputs</CardTitle>
                      <CardDescription>Inputs you'll need to request once payment is confirmed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {order.inputs.map((input) => (
                          <div
                            key={input.id}
                            className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30"
                          >
                            <FileText size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-medium text-sm text-foreground">{input.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{input.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-xs text-blue-800">
                          <strong>Note:</strong> You'll be able to formally request these inputs from the client once payment is confirmed.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Preparation Checklist - Payment Pending Specific */}
                {order.stage === "Payment Pending" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Preparation Checklist</CardTitle>
                      <CardDescription>Get ready for delivery while waiting for payment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 size={14} className="text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Review service scope and deliverables</p>
                            <p className="text-xs text-muted-foreground mt-1">Understand what needs to be delivered</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center flex-shrink-0 mt-0.5"></div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Prepare input request templates</p>
                            <p className="text-xs text-muted-foreground mt-1">Draft clear instructions for client inputs</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center flex-shrink-0 mt-0.5"></div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Review commercial terms</p>
                            <p className="text-xs text-muted-foreground mt-1">Familiarize yourself with contract details</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded border-2 border-muted-foreground flex items-center justify-center flex-shrink-0 mt-0.5"></div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Plan delivery approach</p>
                            <p className="text-xs text-muted-foreground mt-1">Outline methodology and timeline</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Current Stage - For other stages */}
                {order.stage !== "Payment Pending" && order.stage !== "Client Input Pending" && order.stage !== "Input in Review" && order.stage !== "In Delivery" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Current Stage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${getStageColor(order.stage)}`}></div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{order.stage}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {order.stage === "Deliverables Pending Review" && "Outputs shared for client validation"}
                            {order.stage === "Closed" && "Engagement completed and accepted"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Pending Actions - For other stages */}
                {order.stage !== "Payment Pending" && order.stage !== "Client Input Pending" && order.stage !== "Input in Review" && order.stage !== "In Delivery" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Pending Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {order.stage === "Deliverables Pending Review" && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-50 border border-cyan-200">
                          <AlertCircle size={18} className="text-cyan-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-cyan-900">Client Review Required</p>
                            <p className="text-xs text-cyan-700 mt-1">
                              {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length} deliverable(s) awaiting review
                            </p>
                          </div>
                        </div>
                      )}
                      {order.stage === "Closed" && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 size={18} className="text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-900">Engagement Completed</p>
                            <p className="text-xs text-green-700 mt-1">All deliverables accepted and engagement closed</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Recent Activity - For other stages */}
                {order.stage !== "Payment Pending" && order.stage !== "Client Input Pending" && order.stage !== "Input in Review" && order.stage !== "In Delivery" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {order.deliverables
                          .filter((d) => d.submissionDate)
                          .slice(0, 3)
                          .map((deliverable) => (
                            <div key={deliverable.id} className="flex items-start gap-3 text-sm">
                              <FileText size={16} className="text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <p className="text-foreground">
                                  <span className="font-medium">{deliverable.name}</span> submitted
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(deliverable.submissionDate!).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}
                        {order.inputs
                          .filter((i) => i.submittedDate)
                          .slice(0, 2)
                          .map((input) => (
                            <div key={input.id} className="flex items-start gap-3 text-sm">
                              <Upload size={16} className="text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <p className="text-foreground">
                                  <span className="font-medium">{input.name}</span> submitted by client
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(input.submittedDate!).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Delivery Lead */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Delivery Lead</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{order.deliveryLead}</p>
                        <p className="text-xs text-muted-foreground">DQ Delivery Lead</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Inputs</span>
                      <span className="font-medium text-foreground">{order.inputs.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Accepted Inputs</span>
                      <span className="font-medium text-green-600">
                        {order.inputs.filter((i) => i.status === "Accepted").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Deliverables</span>
                      <span className="font-medium text-foreground">{order.deliverables.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium text-green-600">
                        {order.deliverables.filter((d) => d.status === "Accepted").length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery" className="space-y-4">
            {/* In Delivery State */}
            {order.stage === "In Delivery" && (
              <>
                <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">
                        Active delivery: {order.deliverables.filter((d) => d.status === "In Progress").length} deliverable(s) in progress
                      </p>
                      <p className="text-xs text-purple-700 mt-1">
                        All inputs have been accepted. Focus on producing high-quality deliverables for client review.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active: Deliverables Management */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Deliverables</CardTitle>
                        <CardDescription className="mt-1">
                          Manage and submit deliverables for client review
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus size={16} />
                        Add Deliverable
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deliverable Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Attachments</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.deliverables.map((deliverable) => (
                          <TableRow key={deliverable.id}>
                            <TableCell className="font-medium">{deliverable.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {deliverable.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getDeliverableStatusColor(deliverable.status)}>
                                {deliverable.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {deliverable.attachments && deliverable.attachments.length > 0 ? (
                                <div className="flex items-center gap-1">
                                  <span>{deliverable.attachments.length}</span>
                                  <span className="text-muted-foreground">
                                    ({deliverable.attachments.filter((a) => a.type === "file").length} files,{" "}
                                    {deliverable.attachments.filter((a) => a.type === "link").length} links)
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">None</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {deliverable.status === "In Progress" && (
                                  <>
                                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                                      <Upload size={14} className="mr-1" />
                                      Add
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <FileText size={14} className="mr-1" />
                                      Submit
                                    </Button>
                                  </>
                                )}
                                {deliverable.status === "Submitted" && (
                                  <Button variant="ghost" size="sm">
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Reference: Client Inputs */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Inputs (Reference)</CardTitle>
                        <CardDescription className="mt-1">
                          Accepted inputs available for reference during delivery
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Files</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {input.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getInputStatusColor(input.status)}>
                                {input.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {input.submittedFiles ? input.submittedFiles.length : 0} file(s)
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download size={14} className="mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Input in Review State */}
            {order.stage === "Input in Review" && (
              <>
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Reviewing {order.inputs.filter((i) => i.status === "Submitted" || i.status === "In Review").length} client input(s)
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Verify quality and completeness before proceeding to delivery. Deliverables will be unlocked once all inputs are accepted.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active: Client Inputs with Review Interface */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Inputs - Review Mode</CardTitle>
                        <CardDescription className="mt-1">
                          Review submitted inputs and provide feedback
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus size={16} />
                        Request Additional Input
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {input.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getInputStatusColor(input.status)}>
                                {input.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {input.submittedDate
                                ? new Date(input.submittedDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {(input.status === "Submitted" || input.status === "In Review") && (
                                  <>
                                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                      <CheckCircle2 size={14} className="mr-1" />
                                      Accept
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700">
                                      <MessageSquare size={14} className="mr-1" />
                                      Clarify
                                    </Button>
                                  </>
                                )}
                                {input.status === "Accepted" && (
                                  <Button variant="ghost" size="sm">
                                    View Details
                                  </Button>
                                )}
                                {input.status === "Pending" && (
                                  <Button variant="ghost" size="sm" disabled>
                                    Not Submitted
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Locked: Deliverables */}
                <Card className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Deliverables
                          <Badge variant="secondary" className="text-xs">Locked</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Will be available once all inputs are accepted
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2" disabled>
                        <Plus size={16} />
                        Add Deliverable
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                      <AlertCircle size={20} className="text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Deliverables Locked</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Complete input review and accept all required inputs to unlock deliverables and begin delivery.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Client Input Pending State */}
            {order.stage === "Client Input Pending" && (
              <>
                <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">
                        Waiting for {order.inputs.filter((i) => i.status === "Pending").length} client input(s)
                      </p>
                      <p className="text-xs text-orange-700 mt-1">
                        You can manage input requests and send reminders. Deliverables will be unlocked once inputs are reviewed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active: Client Inputs */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Inputs</CardTitle>
                        <CardDescription className="mt-1">
                          Track and manage required inputs from the client
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus size={16} />
                        Request Additional Input
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {input.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getInputStatusColor(input.status)}>
                                {input.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {input.submittedDate
                                ? new Date(input.submittedDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {input.status === "Pending" && (
                                  <Button variant="ghost" size="sm">
                                    <MessageSquare size={14} className="mr-1" />
                                    Remind
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Locked: Deliverables */}
                <Card className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Deliverables
                          <Badge variant="secondary" className="text-xs">Locked</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Will be available once client inputs are reviewed
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2" disabled>
                        <Plus size={16} />
                        Add Deliverable
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                      <AlertCircle size={20} className="text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Deliverables Locked</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          You'll be able to start working on deliverables once all required inputs are received and reviewed.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Payment Pending State */}
            {order.stage === "Payment Pending" && (
              <>
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">
                        Delivery workspace will be available after payment confirmation
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        You can preview the expected inputs and deliverables below
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview: Client Inputs */}
                <Card className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Client Inputs
                          <Badge variant="secondary" className="text-xs">Preview</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">Inputs you'll request from the client</CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2" disabled>
                        <Plus size={16} />
                        Request Input
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id} className="opacity-60">
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-md">
                              {input.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-gray-600">
                                Not Requested
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Preview: Deliverables */}
                <Card className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Deliverables
                          <Badge variant="secondary" className="text-xs">Preview</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">Outputs you'll produce for the client</CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2" disabled>
                        <Plus size={16} />
                        Add Deliverable
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deliverable Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.deliverables.map((deliverable) => (
                          <TableRow key={deliverable.id} className="opacity-60">
                            <TableCell className="font-medium">{deliverable.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-md">
                              {deliverable.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-gray-600">
                                Not Started
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Deliverables Pending Review State */}
            {order.stage === "Deliverables Pending Review" && (
              <>
                <div className="rounded-lg border-2 border-cyan-200 bg-cyan-50 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-cyan-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-cyan-900">
                        {order.deliverables.filter((d) => d.status === "Submitted" || d.status === "Under Review").length} deliverable(s) awaiting client review
                      </p>
                      <p className="text-xs text-cyan-700 mt-1">
                        Monitor review progress and follow up with client as needed. Auto-acceptance occurs after 5 days.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deliverables Under Review */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Deliverables - Client Review</CardTitle>
                        <CardDescription className="mt-1">
                          Track review status and deadlines
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deliverable Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Attachments</TableHead>
                          <TableHead>Review Deadline</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.deliverables.map((deliverable) => {
                          const daysRemaining = deliverable.reviewDeadline
                            ? Math.ceil(
                                (new Date(deliverable.reviewDeadline).getTime() - new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )
                            : 0;
                          const isUrgent = daysRemaining <= 2 && daysRemaining > 0;

                          return (
                            <TableRow key={deliverable.id}>
                              <TableCell className="font-medium">{deliverable.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getDeliverableStatusColor(deliverable.status)}>
                                  {deliverable.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">
                                {deliverable.attachments && deliverable.attachments.length > 0 ? (
                                  <div className="flex items-center gap-1">
                                    <span>{deliverable.attachments.length}</span>
                                    <span className="text-muted-foreground text-xs">
                                      ({deliverable.attachments.filter((a) => a.type === "file").length}f,{" "}
                                      {deliverable.attachments.filter((a) => a.type === "link").length}l)
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell className="text-sm">
                                {deliverable.reviewDeadline ? (
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={
                                        isUrgent
                                          ? "text-amber-700 font-medium"
                                          : daysRemaining <= 0
                                          ? "text-green-700 font-medium"
                                          : ""
                                      }
                                    >
                                      {daysRemaining > 0
                                        ? `${daysRemaining}d remaining`
                                        : daysRemaining === 0
                                        ? "Today"
                                        : "Auto-accepted"}
                                    </span>
                                    {isUrgent && <AlertCircle size={14} className="text-amber-600" />}
                                  </div>
                                ) : (
                                  "-"
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {(deliverable.status === "Submitted" || deliverable.status === "Under Review") && (
                                    <>
                                      <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                                        <MessageSquare size={14} className="mr-1" />
                                        Remind
                                      </Button>
                                      <Button variant="ghost" size="sm">
                                        View
                                      </Button>
                                    </>
                                  )}
                                  {deliverable.status === "Accepted" && (
                                    <Button variant="ghost" size="sm">
                                      View Details
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Reference: Client Inputs */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Inputs (Reference)</CardTitle>
                        <CardDescription className="mt-1">
                          Original inputs used for delivery
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Files</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {input.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getInputStatusColor(input.status)}>
                                {input.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {input.submittedFiles ? input.submittedFiles.length : 0} file(s)
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download size={14} className="mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Closed State */}
            {order.stage === "Closed" && (
              <>
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Engagement completed successfully
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        All {order.deliverables.length} deliverables have been accepted by the client. This service order is archived.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Final Deliverables */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Final Deliverables</CardTitle>
                        <CardDescription className="mt-1">
                          All deliverables accepted by client
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download size={16} />
                        Download All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deliverable Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Attachments</TableHead>
                          <TableHead>Client Feedback</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.deliverables.map((deliverable) => (
                          <TableRow key={deliverable.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-green-600" />
                                {deliverable.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                Accepted
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {deliverable.attachments && deliverable.attachments.length > 0 ? (
                                <div className="flex items-center gap-1">
                                  <span>{deliverable.attachments.length}</span>
                                  <span className="text-muted-foreground text-xs">
                                    ({deliverable.attachments.filter((a) => a.type === "file").length}f,{" "}
                                    {deliverable.attachments.filter((a) => a.type === "link").length}l)
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-sm max-w-xs">
                              {deliverable.clientFeedback ? (
                                <span className="text-muted-foreground truncate block">
                                  {deliverable.clientFeedback}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download size={14} className="mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Client Inputs Archive */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Inputs (Archive)</CardTitle>
                        <CardDescription className="mt-1">
                          Reference materials used for delivery
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Files</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {input.description}
                            </TableCell>
                            <TableCell className="text-sm">
                              {input.submittedFiles ? input.submittedFiles.length : 0} file(s)
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download size={14} className="mr-1" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Active State - For other stages */}
            {order.stage !== "Payment Pending" && order.stage !== "Client Input Pending" && order.stage !== "Input in Review" && order.stage !== "In Delivery" && order.stage !== "Deliverables Pending Review" && order.stage !== "Closed" && (
              <>
                {/* Client Inputs */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Inputs</CardTitle>
                        <CardDescription className="mt-1">Required inputs from the client</CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus size={16} />
                        Request Input
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Input Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.inputs.map((input) => (
                          <TableRow key={input.id}>
                            <TableCell className="font-medium">{input.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {input.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getInputStatusColor(input.status)}>
                                {input.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {input.submittedDate
                                ? new Date(input.submittedDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "-"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Deliverables */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Deliverables</CardTitle>
                        <CardDescription className="mt-1">Outputs produced by the delivery team</CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Plus size={16} />
                        Add Deliverable
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deliverable Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Attachments</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.deliverables.map((deliverable) => (
                          <TableRow key={deliverable.id}>
                            <TableCell className="font-medium">{deliverable.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                              {deliverable.description}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getDeliverableStatusColor(deliverable.status)}>
                                {deliverable.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {deliverable.attachments && deliverable.attachments.length > 0 ? (
                                <div className="flex items-center gap-1">
                                  <span>{deliverable.attachments.length}</span>
                                  <span className="text-muted-foreground text-xs">
                                    ({deliverable.attachments.filter((a) => a.type === "file").length}f,{" "}
                                    {deliverable.attachments.filter((a) => a.type === "link").length}l)
                                  </span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
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
                    You'll be able to track Risks, Assumptions, Issues, and Dependencies during active delivery.
                  </div>
                </CardContent>
              </Card>
            ) : !order.raid ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <AlertCircle size={48} className="text-muted-foreground/20 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">RAID Log</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Track Risks, Assumptions, Issues, and Dependencies for this service order.
                  </p>
                  <Button className="mt-6" variant="outline">
                    <Plus size={16} className="mr-2" />
                    Add RAID Item
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* RAID Controls */}
                <div className="flex items-center justify-between gap-4">
                  {/* RAID Type Selector */}
                  <div className="flex gap-2">
                    <Button
                      variant={raidView === "risks" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRaidView("risks")}
                      className="gap-2"
                    >
                      <AlertCircle size={14} />
                      Risks ({order.raid.risks.filter(r => raidVisibility === "all" || r.visibility.toLowerCase() === raidVisibility).length})
                    </Button>
                    <Button
                      variant={raidView === "issues" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRaidView("issues")}
                      className="gap-2"
                    >
                      <AlertCircle size={14} />
                      Issues ({order.raid.issues.filter(i => raidVisibility === "all" || i.visibility.toLowerCase() === raidVisibility).length})
                    </Button>
                    <Button
                      variant={raidView === "assumptions" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRaidView("assumptions")}
                      className="gap-2"
                    >
                      <CheckCircle2 size={14} />
                      Assumptions ({order.raid.assumptions.filter(a => raidVisibility === "all" || a.visibility.toLowerCase() === raidVisibility).length})
                    </Button>
                    <Button
                      variant={raidView === "dependencies" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRaidView("dependencies")}
                      className="gap-2"
                    >
                      <Activity size={14} />
                      Dependencies ({order.raid.dependencies.filter(d => raidVisibility === "all" || d.visibility.toLowerCase() === raidVisibility).length})
                    </Button>
                  </div>

                  {/* Visibility Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">View:</span>
                    <div className="flex gap-1 border border-border rounded-md p-1">
                      <Button
                        variant={raidVisibility === "all" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setRaidVisibility("all")}
                        className="h-7 px-3 text-xs"
                      >
                        All
                      </Button>
                      <Button
                        variant={raidVisibility === "internal" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setRaidVisibility("internal")}
                        className="h-7 px-3 text-xs gap-1.5"
                      >
                        <Shield size={12} />
                        Internal
                      </Button>
                      <Button
                        variant={raidVisibility === "external" ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setRaidVisibility("external")}
                        className="h-7 px-3 text-xs gap-1.5"
                      >
                        <Users size={12} />
                        External
                      </Button>
                    </div>
                  </div>
                </div>

                {/* RAID Content */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base capitalize">{raidView}</CardTitle>
                        <CardDescription>
                          {raidVisibility === "all" && "Showing all items"}
                          {raidVisibility === "internal" && "Internal items (visible to DQ team only)"}
                          {raidVisibility === "external" && "External items (shared with client)"}
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus size={14} className="mr-2" />
                        Add {raidView.slice(0, -1)}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Risks Table */}
                    {raidView === "risks" && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-24">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-24">Severity</TableHead>
                            <TableHead className="w-24">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-24">Visibility</TableHead>
                            <TableHead className="w-32">Due Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.risks
                            .filter(risk => raidVisibility === "all" || risk.visibility.toLowerCase() === raidVisibility)
                            .map((risk) => (
                              <TableRow key={risk.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{risk.id}</TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{risk.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{risk.description}</p>
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
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      risk.visibility === "Internal" 
                                        ? "bg-blue-50 text-blue-700 border-blue-200" 
                                        : "bg-green-50 text-green-700 border-green-200"
                                    }`}
                                  >
                                    {risk.visibility === "Internal" ? (
                                      <><Shield size={10} className="mr-1" /> Internal</>
                                    ) : (
                                      <><Users size={10} className="mr-1" /> External</>
                                    )}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(risk.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.risks.filter(risk => raidVisibility === "all" || risk.visibility.toLowerCase() === raidVisibility).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No {raidVisibility !== "all" ? raidVisibility : ""} risks found
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
                            <TableHead className="w-24">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-24">Severity</TableHead>
                            <TableHead className="w-32">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-24">Visibility</TableHead>
                            <TableHead className="w-32">Due Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.issues
                            .filter(issue => raidVisibility === "all" || issue.visibility.toLowerCase() === raidVisibility)
                            .map((issue) => (
                              <TableRow key={issue.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{issue.id}</TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{issue.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{issue.description}</p>
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
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      issue.visibility === "Internal" 
                                        ? "bg-blue-50 text-blue-700 border-blue-200" 
                                        : "bg-green-50 text-green-700 border-green-200"
                                    }`}
                                  >
                                    {issue.visibility === "Internal" ? (
                                      <><Shield size={10} className="mr-1" /> Internal</>
                                    ) : (
                                      <><Users size={10} className="mr-1" /> External</>
                                    )}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(issue.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.issues.filter(issue => raidVisibility === "all" || issue.visibility.toLowerCase() === raidVisibility).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No {raidVisibility !== "all" ? raidVisibility : ""} issues found
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
                            <TableHead className="w-24">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-32">Category</TableHead>
                            <TableHead className="w-32">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-24">Visibility</TableHead>
                            <TableHead className="w-32">Validated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.assumptions
                            .filter(assumption => raidVisibility === "all" || assumption.visibility.toLowerCase() === raidVisibility)
                            .map((assumption) => (
                              <TableRow key={assumption.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{assumption.id}</TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{assumption.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{assumption.description}</p>
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
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      assumption.visibility === "Internal" 
                                        ? "bg-blue-50 text-blue-700 border-blue-200" 
                                        : "bg-green-50 text-green-700 border-green-200"
                                    }`}
                                  >
                                    {assumption.visibility === "Internal" ? (
                                      <><Shield size={10} className="mr-1" /> Internal</>
                                    ) : (
                                      <><Users size={10} className="mr-1" /> External</>
                                    )}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {assumption.validatedDate 
                                    ? new Date(assumption.validatedDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })
                                    : "Pending"
                                  }
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.assumptions.filter(assumption => raidVisibility === "all" || assumption.visibility.toLowerCase() === raidVisibility).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No {raidVisibility !== "all" ? raidVisibility : ""} assumptions found
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
                            <TableHead className="w-24">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="w-32">Type</TableHead>
                            <TableHead className="w-32">Status</TableHead>
                            <TableHead className="w-32">Owner</TableHead>
                            <TableHead className="w-24">Visibility</TableHead>
                            <TableHead className="w-32">Required By</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.raid.dependencies
                            .filter(dependency => raidVisibility === "all" || dependency.visibility.toLowerCase() === raidVisibility)
                            .map((dependency) => (
                              <TableRow key={dependency.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{dependency.id}</TableCell>
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{dependency.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{dependency.description}</p>
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
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      dependency.visibility === "Internal" 
                                        ? "bg-blue-50 text-blue-700 border-blue-200" 
                                        : "bg-green-50 text-green-700 border-green-200"
                                    }`}
                                  >
                                    {dependency.visibility === "Internal" ? (
                                      <><Shield size={10} className="mr-1" /> Internal</>
                                    ) : (
                                      <><Users size={10} className="mr-1" /> External</>
                                    )}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {new Date(dependency.requiredDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          {order.raid.dependencies.filter(dependency => raidVisibility === "all" || dependency.visibility.toLowerCase() === raidVisibility).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No {raidVisibility !== "all" ? raidVisibility : ""} dependencies found
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

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            {order.stage === "Payment Pending" ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <Calendar size={32} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Sessions Unavailable</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Working sessions can be scheduled once payment is confirmed.
                  </p>
                  <div className="text-xs text-muted-foreground text-center max-w-md">
                    You'll be able to schedule kickoff meetings and working sessions with the client team.
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Calendar size={48} className="text-muted-foreground/20 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Working Sessions</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Schedule and manage working sessions with the client team.
                  </p>
                  <Button className="mt-6" variant="outline">
                    Schedule Session
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4">
            {order.stage === "Payment Pending" ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <MessageSquare size={32} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Limited Communication</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Full inbox functionality will be available after payment confirmation.
                  </p>
                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare size={16} className="mr-2" />
                      Send Payment Reminder
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Client
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <MessageSquare size={48} className="text-muted-foreground/20 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Inbox</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Communicate with the client team about this service order.
                  </p>
                  <Button className="mt-6" variant="outline">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Commercial & Terms Tab */}
          <TabsContent value="commercial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Commercial Information</CardTitle>
                <CardDescription>Contract and payment details for this service order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Service Code</p>
                    <p className="font-medium text-foreground">{order.serviceCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-medium text-foreground">{order.serviceOrderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service Type</p>
                    <p className="font-medium text-foreground">{order.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{order.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contract Value</p>
                    <p className="font-medium text-foreground">
                      {order.currency} {order.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(order.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {order.stage === "Payment Pending" && (
                  <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Payment Status: Pending</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Awaiting payment confirmation from {order.clientOrganisation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Terms of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Review the terms and conditions for this service engagement.
                </p>
                <Button variant="outline" className="gap-2">
                  <Download size={16} />
                  Download Terms
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ServiceOrderDetail;
