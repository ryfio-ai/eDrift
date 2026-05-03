"use client";

import React, { useEffect, useState, useRef } from "react";

interface VanillaCounterProps {
  value: number;
  suffix?: string;
  duration?: number; // Duration in ms
}

export function VanillaCounter({ value, suffix = "", duration = 800 }: VanillaCounterProps) {
  const [currentValue, setCurrentValue] = useState("0" + suffix);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion) {
      setCurrentValue(value.toString() + suffix);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const startValue = 0;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // easeOutExpo curve
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const current = Math.floor(easeProgress * (value - startValue) + startValue);
            setCurrentValue(current.toString() + suffix);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value, suffix, duration]);

  return <span ref={ref} className="tech-value">{currentValue}</span>;
}
