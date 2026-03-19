"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  children: React.ReactNode
}

export const GlowButton = ({ 
  variant = 'primary', 
  children, 
  className, 
  ...props 
}: GlowButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-2"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-start to-primary-end text-navy-dark hover:shadow-[0_0_20px_rgba(0,198,255,0.4)]",
    outline: "border-2 border-transparent bg-clip-border [background:linear-gradient(var(--navy-dark),var(--navy-dark))_padding-box,linear-gradient(to_right,var(--primary-gradient-start),var(--primary-gradient-end))_border-box] text-gradient hover:shadow-[0_0_20px_rgba(0,198,255,0.2)]",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props as any}
    >
      {children}
    </motion.button>
  )
}
