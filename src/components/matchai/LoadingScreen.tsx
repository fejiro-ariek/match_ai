import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "Understanding your creator positioning",
  "Building your pricing guidance",
  "Finding your best brand-fit opportunities",
  "Preparing personalized outreach directions",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev >= messages.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center justify-center py-24 space-y-8"
    >
      <div className="relative w-14 h-14">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-foreground/15"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-foreground"
          style={{ borderRightColor: "transparent", borderBottomColor: "transparent" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="h-7 relative w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-base font-medium text-foreground absolute"
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="text-micro text-foreground-secondary">
        Your AI agent is preparing brand-fit opportunities, pricing, and outreach
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
