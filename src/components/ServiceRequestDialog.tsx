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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

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

  const totalSteps = 5;
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
    if (step === 2) return inputsAcknowledged;
    if (step === 4) return termsAccepted;
    if (step === 5) {
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
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-2 w-2 rounded-full ${
                    s <= step ? "bg-primary" : "bg-border"
                  }`}
                ></div>
                {s < 5 && (
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
          {/* Step 1: Service Summary */}
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
              </div>
            </motion.div>
          )}

          {/* Additional steps will be added in the next part */}
          
          {/* Step 2: Required Inputs Disclosure */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Required Inputs</h3>
                
                <div className="mb-6 rounded-lg bg-blue-500/10 p-4">
                  <div className="flex gap-3">
                    <FileText size={20} className="mt-0.5 shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        To initiate this service, you will be required to provide specific inputs as outlined below.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
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
                      <h4 className="mb-2 font-semibold text-foreground">{category.title}</h4>
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

                <div className="mt-6 rounded-lg border border-border bg-accent/30 p-4">
                  <div className="flex gap-3">
                    <Clock size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
                    <p className="text-sm text-foreground">
                      <strong>Timeline:</strong> Delivery will commence within 3-5 business days following
                      confirmation that required inputs meet minimum completeness standards.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <Checkbox
                    id="inputs-acknowledged"
                    checked={inputsAcknowledged}
                    onCheckedChange={(checked) => setInputsAcknowledged(checked as boolean)}
                  />
                  <label
                    htmlFor="inputs-acknowledged"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    I understand that I will need to provide the required inputs listed above to initiate
                    service delivery.
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Input Quality & Evaluation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Input Quality & Evaluation
                </h3>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="mb-3 font-semibold text-foreground">Completeness Requirements</h4>
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

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                    <h4 className="mb-2 font-semibold text-foreground">Refund Policy</h4>
                    <p className="text-sm leading-relaxed text-foreground">
                      If the engagement does not commence due to insufficient input completeness and you choose
                      not to provide additional information, you may request a refund. The refund will be
                      processed less a 5% administrative fee to cover evaluation and setup costs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Terms & Conditions */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Terms & Conditions</h3>

                <div className="max-h-96 overflow-y-auto rounded-xl border border-border bg-accent/30 p-6">
                  <div className="space-y-4 text-sm text-foreground">
                    <div>
                      <h4 className="mb-2 font-semibold">1. Service Delivery</h4>
                      <p className="leading-relaxed text-muted-foreground">
                        DQ will deliver the requested service in accordance with the specifications outlined in
                        the service description. Delivery timelines commence upon validation of required inputs.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">2. Client Responsibilities</h4>
                      <p className="leading-relaxed text-muted-foreground">
                        The client agrees to provide required inputs, participate in scheduled workshops and
                        reviews, and designate appropriate stakeholders for engagement activities.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">3. Intellectual Property</h4>
                      <p className="leading-relaxed text-muted-foreground">
                        All deliverables created specifically for the client become the property of the client
                        upon full payment. DQ retains rights to methodologies, frameworks, and reusable
                        components.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">4. Payment Terms</h4>
                      <p className="leading-relaxed text-muted-foreground">
                        Payment is due upon order confirmation. For invoice payments, net 30 terms apply.
                        Services will not commence until payment is received or credit terms are established.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">5. Cancellation & Refunds</h4>
                      <p className="leading-relaxed text-muted-foreground">
                        Cancellations made before service commencement are eligible for refund less 5%
                        administrative fee. Once delivery has commenced, refunds are prorated based on work
                        completed.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-semibold">6. Confidentiality</h4>
                      <p className="leading-relaxed text-muted-foreground">
                        Both parties agree to maintain confidentiality of proprietary information shared during
                        the engagement. Standard NDA terms apply.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <Checkbox
                    id="terms-accepted"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <label
                    htmlFor="terms-accepted"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    I have read and agree to the Terms & Conditions outlined above.
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Payment</h3>

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
                    <h4 className="mb-4 font-semibold text-foreground">Card Details</h4>
                    
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

                <div className="mt-6 rounded-lg bg-accent/50 p-4">
                  <p className="text-xs text-muted-foreground">
                    {paymentMethod === "card" 
                      ? "By completing this order, you authorize DQ to charge the amount shown above to your card. Your payment is processed securely."
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
