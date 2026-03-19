import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'available' | 'coming-soon' | 'tech'
}

export const Badge = ({ children, className, variant = 'tech' }: BadgeProps) => {
  const variants = {
    available: "bg-accent-green/20 text-accent-green border-accent-green/30",
    'coming-soon': "bg-text-secondary/20 text-text-secondary border-text-secondary/30",
    tech: "bg-accent-teal/20 text-accent-teal border-accent-teal/30"
  }

  return (
    <span className={cn(
      "px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
