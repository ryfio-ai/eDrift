"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost" | "cyan" | "purple";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const GlowButton = ({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}: GlowButtonProps) => {
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variants = {
    primary: "bg-gradient-to-r from-[#0066FF] to-[#AD00FF] text-white shadow-lg shadow-royal-blue/20",
    outline: "bg-white border-2 border-slate-200 text-slate-900 hover:border-royal-blue hover:text-royal-blue shadow-sm",
    ghost: "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50",
    cyan: "bg-[#00F0FF] text-white shadow-lg shadow-cyan-500/30",
    purple: "bg-gradient-to-r from-[#AD00FF] to-[#0066FF] text-white shadow-lg shadow-purple-500/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-full font-bold transition-all flex items-center justify-center gap-2",
        sizeClasses[size],
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
