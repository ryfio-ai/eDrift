"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "cyan" | "purple" | "green";
  className?: string;
}

export const Badge = ({ children, variant = "default", className }: BadgeProps) => {
  const variants = {
    default: "bg-slate-100 text-slate-600 border-slate-200",
    outline: "bg-transparent border border-slate-200 text-slate-600",
    cyan: "bg-[#00F0FF]/10 text-royal-blue border-[#00F0FF]/20",
    purple: "bg-[#AD00FF]/10 text-[#AD00FF] border-[#AD00FF]/20",
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };

  return (
    <span className={cn(
      "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] border backdrop-blur-sm inline-flex items-center gap-1.5",
      variants[variant],
      className
    )}>
      {variant === "cyan" && <div className="w-1.5 h-1.5 rounded-full bg-royal-blue animate-pulse" />}
      {children}
    </span>
  );
};
