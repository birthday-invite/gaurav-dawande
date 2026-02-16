import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(differenceInSeconds(targetDate, new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(differenceInSeconds(targetDate, new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft <= 0) return null;

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex gap-4 sm:gap-8 justify-center items-center py-8">
      <TimeUnit value={days} label="Days" color="text-primary" />
      <div className="text-4xl font-light text-muted-foreground pb-6">:</div>
      <TimeUnit value={hours} label="Hours" color="text-secondary" />
      <div className="text-4xl font-light text-muted-foreground pb-6">:</div>
      <TimeUnit value={minutes} label="Mins" color="text-accent" />
      <div className="text-4xl font-light text-muted-foreground pb-6">:</div>
      <TimeUnit value={seconds} label="Secs" color="text-white" />
    </div>
  );
}

function TimeUnit({ value, label, color, className = "" }: { value: number; label: string; color: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        className={`text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight ${color}`}
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mt-2">{label}</span>
    </div>
  );
}
