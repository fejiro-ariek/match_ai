import { motion } from "framer-motion";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <motion.div
              className={`h-2 rounded-full ${i <= currentStep ? "bg-primary" : "bg-border"}`}
              initial={{ width: 24 }}
              animate={{ width: i === currentStep ? 48 : 24 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      ))}
      <span className="ml-3 text-sm text-muted-foreground">
        {labels[currentStep]}
      </span>
    </div>
  );
};

export default StepIndicator;
