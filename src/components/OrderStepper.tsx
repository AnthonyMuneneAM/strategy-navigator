import { Check } from "lucide-react";

interface StepperStage {
  id: number;
  name: string;
  shortName: string;
  status: "completed" | "current" | "upcoming";
  date?: string;
}

interface OrderStepperProps {
  currentStage: string;
}

const OrderStepper = ({ currentStage }: OrderStepperProps) => {
  const getStageStatus = (stageName: string): "completed" | "current" | "upcoming" => {
    const stageOrder = [
      "Payment Pending",
      "Client Input Pending",
      "Input in Review",
      "In Delivery",
      "Deliverables Pending Review",
      "Closed",
    ];
    
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stageName);
    
    if (stageIndex < currentIndex) return "completed";
    if (stageIndex === currentIndex) return "current";
    return "upcoming";
  };

  const stages: StepperStage[] = [
    { id: 1, name: "Payment Pending", shortName: "Payment", status: getStageStatus("Payment Pending") },
    { id: 2, name: "Client Input Pending", shortName: "Input", status: getStageStatus("Client Input Pending") },
    { id: 3, name: "Input in Review", shortName: "Review", status: getStageStatus("Input in Review") },
    { id: 4, name: "In Delivery", shortName: "Delivery", status: getStageStatus("In Delivery") },
    { id: 5, name: "Deliverables Pending Review", shortName: "Approval", status: getStageStatus("Deliverables Pending Review") },
    { id: 6, name: "Closed", shortName: "Complete", status: getStageStatus("Closed") },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  stage.status === "completed"
                    ? "border-green-500 bg-green-500 text-white"
                    : stage.status === "current"
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {stage.status === "completed" ? (
                  <Check size={20} />
                ) : (
                  <span className="text-sm font-semibold">{stage.id}</span>
                )}
              </div>
              
              {/* Label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-medium hidden sm:block ${
                    stage.status === "current"
                      ? "text-foreground"
                      : stage.status === "completed"
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {stage.shortName}
                </p>
                <p
                  className={`text-xs font-medium sm:hidden ${
                    stage.status === "current"
                      ? "text-foreground"
                      : stage.status === "completed"
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {stage.id}
                </p>
              </div>
            </div>

            {/* Connecting Line */}
            {index < stages.length - 1 && (
              <div className="flex-1 mx-2">
                <div
                  className={`h-0.5 ${
                    stage.status === "completed"
                      ? "bg-green-500"
                      : "bg-border"
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStepper;
