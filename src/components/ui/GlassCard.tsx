import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}

export const GlassCard = ({ children, className, hoverable = true }: GlassCardProps) => {
  return (
    <div className={cn(
      "glass p-6 transition-all duration-300",
      hoverable && "glass-hover",
      className
    )}>
      {children}
    </div>
  )
}
