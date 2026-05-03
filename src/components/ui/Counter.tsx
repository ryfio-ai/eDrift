"use client";

import React, { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, animate, motion } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  decimals?: number;
}

export const Counter = ({ 
  value, 
  duration = 0.8, 
  className = "", 
  suffix = "", 
  decimals = 0 
}: CounterProps) => {
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  useEffect(() => {
    // Only animate on mount if we haven't already
    if (!hasAnimated) {
      count.set(0);
      const controls = animate(count, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => setHasAnimated(true)
      });
      return controls.stop;
    }
  }, [value, duration, count, hasAnimated]);

  return (
    <span className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};
