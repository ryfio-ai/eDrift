"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  decimals?: number;
}

export const Counter = ({
  value,
  duration = 800,
  className = "",
  suffix = "",
  decimals = 0,
}: CounterProps) => {
  const [display, setDisplay] = useState((0).toFixed(decimals));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setDisplay((ease * value).toFixed(decimals));

            if (progress < 1) window.requestAnimationFrame(step);
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
};
