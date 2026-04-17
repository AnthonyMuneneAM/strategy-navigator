// Utility functions for time calculations and countdown

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  total: number; // total milliseconds
  isExpired: boolean;
  isUrgent: boolean; // < 24 hours
}

export const calculateTimeRemaining = (targetDate: string): TimeRemaining => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const total = target - now;

  if (total <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      total: 0,
      isExpired: true,
      isUrgent: false,
    };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
    total,
    isExpired: false,
    isUrgent: total < 24 * 60 * 60 * 1000, // < 24 hours
  };
};

export const formatTimeRemaining = (timeRemaining: TimeRemaining): string => {
  if (timeRemaining.isExpired) {
    return "Expired";
  }

  const { days, hours, minutes } = timeRemaining;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

export const getUrgencyColor = (timeRemaining: TimeRemaining): string => {
  if (timeRemaining.isExpired) {
    return "text-red-600";
  }

  if (timeRemaining.isUrgent) {
    return "text-orange-600";
  }

  return "text-muted-foreground";
};
