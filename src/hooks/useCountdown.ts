import { useState, useEffect } from "react";
import { calculateTimeRemaining, TimeRemaining } from "@/utils/timeUtils";

export const useCountdown = (targetDate: string | undefined): TimeRemaining | null => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(() =>
    targetDate ? calculateTimeRemaining(targetDate) : null
  );

  useEffect(() => {
    if (!targetDate) {
      setTimeRemaining(null);
      return;
    }

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining(targetDate));

    // Update every minute
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeRemaining;
};
