import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  CreditCard,
  AlertCircle,
  Clock,
  User,
  Mail,
  ExternalLink,
  Shield,
  Lock,
  MessageCircle,
  Building2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    name: string;
    category: string;
    type: string;
    tower: string;
    price: string;
    duration: string;
    capabilities: string[];
    deliveryModel?: string;
  };
}

const ServiceRequestDialog = ({ open, onOpenChange, service }: ServiceRequestDialogProps) => {
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [inputsAcknowledged, setInputsAcknowledged] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"invoice" | "card">("invoice");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const navigate = useNavigate();

  const totalSteps = 3;
  const basePrice = parseInt(service.price.replace(/[^0-9]/g, "")) * 1000;
  const tax = basePrice * 0.1; // 10% tax
  const total = basePrice + tax;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Process order
    console.log("Order completed");
    onOpenChange(false);
    navigate("/dashboard/services");
  };

  const canProceed = () => {
    if (step === 2) return inputsAcknowledged && termsAccepted;
    if (step === 3) {
      if (paymentMethod === "card") {
        return cardNumber && cardExpiry && cardCVC && cardName && billingEmail;
      }
      return billingEmail; // For invoice, just need email
    }
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Request Service</DialogTitle>
          <div className="mt-4 flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-2 w-2 rounded-full ${
                    s <= step ? "bg-primary" : "bg-border"
                  }`}
                ></div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-8 ${
                      s < step ? "bg-primary" : "bg-border"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Service Summary + Required Inputs */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Service Summary</h3>
                
                <div className="rounded-xl border border-border bg-accent/30 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{service.name}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary">{service.category}</Badge>
                        <Badge variant="outline">{service.type}</Badge>
                        {service.deliveryModel && (
                          <Badge className="bg-blue-500/10 text-blue-700">{service.deliveryModel}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-border pt-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tower</p>
                      <p className="text-foreground">{service.tower}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Duration</p>
                      <p className="text-foreground">{service.duration}</p>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-muted-foreground">Capability Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {service.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="rounded-full bg-accent px-3 py-1 text-xs text-foreground"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 font-semibold text-foreground">Price Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium text-foreground">
                        ${(basePrice / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium text-foreground">
                        ${(tax / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3 text-base">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-foreground">
                        ${(total / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </div>

                {/* Required Inputs Section */}
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">Required Inputs</h3>
                  
                  <div className="mb-4 rounded-lg bg-blue-500/10 p-4">
                    <div className="flex gap-3">
                      <FileText size={20} className="mt-0.5 shrink-0 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          To initiate this service, you'll need to provide specific inputs as outlined below.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Business Vision",
                        items: ["Corporate strategy", "Business model", "Value streams"],
                      },
                      {
                        title: "Enterprise Assets",
                        items: ["Business capabilities", "Data architecture", "Application portfolio"],
                      },
                      {
                        title: "Experience Assets",
                        items: ["Customer segments", "Journeys", "Touchpoints"],
                      },
                      {
                        title: "Transformation Portfolio",
                        items: ["Roadmaps", "Active initiatives", "Requirements"],
                      },
                    ].map((category) => (
                      <div key={category.title} className="rounded-lg border border-border bg-card p-4">
                        <h4 className="mb-2 font-semibold text-sm text-foreground">{category.title}</h4>
                        <ul className="space-y-1">
                          {category.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="h-1 w-1 rounded-full bg-primary"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-lg border border-border bg-accent/30 p-4">
                    <div className="flex gap-3">
                      <Clock size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-foreground">
                        <strong>Timeline:</strong> Delivery will commence within 3-5 business days following
                        confirmation that required inputs meet minimum completeness standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Terms, Quality Standards & Refund Policy */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Service Agreement & Quality Standards
                </h3>

                {/* Input Quality & Evaluation - Always Visible */}
                <div className="mb-6 rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-3 font-semibold text-foreground">Input Quality & Evaluation</h4>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    To ensure successful service delivery, DQ will evaluate the completeness and quality of
                    submitted inputs against defined criteria.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg bg-accent/30 p-4">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Minimum Threshold</p>
                        <p className="text-sm text-muted-foreground">
                          Service initiation requires at least 75% completeness against defined criteria.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-accent/30 p-4">
                      <AlertCircle size={20} className="mt-0.5 shrink-0 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Evaluation Process</p>
                        <p className="text-sm text-muted-foreground">
                          Your assigned delivery lead will review submitted inputs within 2 business days and
                          provide feedback if additional information is needed.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-accent/30 p-4">
                      <User size={20} className="mt-0.5 shrink-0 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Collaborative Approach</p>
                        <p className="text-sm text-muted-foreground">
                          If completeness threshold is not met, your delivery lead will work with you to
                          identify and gather the necessary information before engagement commences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refund Policy - Always Visible */}
                <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
                  <h4 className="mb-2 font-semibold text-foreground">Refund Policy</h4>
                  <p className="text-sm leading-relaxed text-foreground">
                    If the engagement does not commence due to insufficient input completeness and you choose
                    not to provide additional information, you may request a refund. The refund will be
                    processed less a 5% administrative fee to cover evaluation and setup costs.
                  </p>
                </div>

                {/* Combined Acknowledgment */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="inputs-acknowledged"
                      checked={inputsAcknowledged}
                      onCheckedChange={(checked) => setInputsAcknowledged(checked as boolean)}
                    />
                    <label
                      htmlFor="inputs-acknowledged"
                      className="text-sm text-foreground cursor-pointer"
                    >
                      I understand the required inputs and quality evaluation process for service delivery.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms-accepted"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label
                      htmlFor="terms-accepted"
                      className="text-sm text-foreground cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link 
                        to="/legal/terms" 
                        target="_blank"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service
                        <ExternalLink size={12} />
                      </Link>
                      {" "}and{" "}
                      <Link 
                        to="/legal/privacy" 
                        target="_blank"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                        <ExternalLink size={12} />
                      </Link>
                      .
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Payment</h3>
                  
                  {/* Trust Signals - Security Badge */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock size={14} className="text-green-600" />
                    <span>Secure checkout powered by</span>
                    <span className="font-semibold text-foreground">Stripe</span>
                  </div>
                </div>

                {/* Social Proof Banner */}
                <div className="mb-6 rounded-lg border border-border bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <Building2 size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Join 50+ organizations transforming with DQ
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        "DQ's strategic guidance helped us accelerate our digital transformation by 6 months." 
                        <span className="font-medium"> — CTO, Fortune 500 Energy Company</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium text-foreground">Select Payment Method</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div
                      onClick={() => setPaymentMethod("invoice")}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        paymentMethod === "invoice"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Invoice (Net 30)</p>
                          <p className="text-xs text-muted-foreground">Pay within 30 days</p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">Credit Card</p>
                          <p className="text-xs text-muted-foreground">Immediate processing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Forms */}
                {paymentMethod === "card" && (
                  <div className="mb-6 space-y-4 rounded-xl border border-border bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">Card Details</h4>
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-green-600" />
                        <span className="text-xs text-muted-foreground">256-bit SSL encrypted</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Card Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                          Expiry Date <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                          CVC <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="123"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Cardholder Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "invoice" && (
                  <div className="mb-6 rounded-xl border border-border bg-card p-6">
                    <h4 className="mb-2 font-semibold text-foreground">Invoice Details</h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      An invoice will be sent to your billing email. Payment is due within 30 days of invoice date.
                    </p>
                    <div className="rounded-lg bg-accent/50 p-3">
                      <div className="flex items-start gap-2">
                        <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-medium text-foreground">Typical approval: 1-2 business days</p>
                          <p className="mt-1">We'll contact you if additional information is needed for credit approval.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Email */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Billing Email <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="billing@company.com"
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {paymentMethod === "invoice" 
                      ? "Invoice and order confirmation will be sent to this email"
                      : "Receipt and order confirmation will be sent to this email"}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h4 className="mb-4 font-semibold text-foreground">Order Summary</h4>
                  
                  <div className="mb-4 space-y-2 border-b border-border pb-4">
                    <p className="text-sm font-medium text-foreground">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.type} • {service.duration}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium text-foreground">
                        ${(basePrice / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium text-foreground">
                        ${(tax / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-xl font-bold text-foreground">
                        ${(total / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="mt-6 rounded-lg border border-border bg-accent/30 p-4">
                  <h5 className="mb-3 text-sm font-semibold text-foreground">What happens next?</h5>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-600" />
                      <span>You'll receive an order confirmation email immediately</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-600" />
                      <span>Your delivery lead will contact you within 24 hours</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-600" />
                      <span>Service delivery begins within 3-5 days after input validation</span>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Questions about your order?</p>
                      <p className="text-xs text-muted-foreground">Our team is here to help</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    Chat with us
                  </Button>
                </div>

                {/* Legal Disclaimer */}
                <div className="mt-6 rounded-lg bg-accent/50 p-4">
                  <p className="text-xs text-muted-foreground">
                    {paymentMethod === "card" 
                      ? "By completing this order, you authorize DQ to charge the amount shown above to your card. Your payment is processed securely through Stripe with bank-level encryption."
                      : "By completing this order, you agree to pay the invoice amount within 30 days. You will receive an invoice at the email address provided."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2 bg-gradient-brand shadow-brand"
            >
              Continue
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="gap-2 bg-gradient-brand shadow-brand"
            >
              Complete Order
              <CheckCircle2 size={16} />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
