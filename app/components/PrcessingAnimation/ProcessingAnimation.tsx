import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingAnimationProps {
  message?: string;
  subMessage?: string;
  doneMessage?: string;
  spinnerSize?: string;
  spinnerColor?: string;
  bgColor?: string;
  textColor?: string;
  transitionDuration?: number;
  doneDelay?: number;
  onComplete?: () => void;
}

export const ProcessingAnimation = ({
  message = "Please wait...",
  subMessage = "Your request is being processed.",
  doneMessage = "Done!",
  spinnerSize = "h-12 w-12",
  spinnerColor = "border-blue-500",
  bgColor = "bg-white",
  textColor = "text-black",
  transitionDuration = 0.5,
  doneDelay = 2, // Delay before showing "Done" animation
  onComplete, // Callback function for when animation is complete
}: ProcessingAnimationProps) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500); // Delay before calling onComplete
    }, doneDelay * 1000);

    return () => clearTimeout(timer);
  }, [doneDelay, onComplete]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <AnimatePresence mode="wait">
        {!isDone ? (
          // Processing Animation
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: transitionDuration }}
            className={`${bgColor} p-6 rounded-lg shadow-lg flex flex-col items-center`}
          >
            <div className={`animate-spin ${spinnerSize} border-t-4 ${spinnerColor} rounded-full`}></div>
            <p className={`mt-4 text-lg font-semibold ${textColor}`}>{message}</p>
            {subMessage && <p className={`text-sm ${textColor}`}>{subMessage}</p>}
          </motion.div>
        ) : (
          // Done Animation
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionDuration }}
            className={`${bgColor} p-6 rounded-lg shadow-lg flex flex-col items-center`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center h-12 w-12 bg-green-500 rounded-full"
            >
              ✅
            </motion.div>
            <p className={`mt-4 text-lg font-semibold ${textColor}`}>{doneMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
