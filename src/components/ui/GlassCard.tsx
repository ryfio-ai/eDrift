"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <div className={cn(
      "glass transition-all duration-500",
      hover && "hover:border-white/20 hover:shadow-2xl hover:shadow-[#00F0FF]/5",
      className
    )}>
      {children}
    </div>
  );
};
