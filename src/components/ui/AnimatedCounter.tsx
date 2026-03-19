"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  from: number
  to: number
  suffix?: string
  duration?: number
}

export const AnimatedCounter = ({ from, to, suffix = "" }: AnimatedCounterProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const spring = useSpring(from, {
    mass: 1,
    stiffness: 70,
    damping: 30,
  })

  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString() + suffix
  )

  useEffect(() => {
    if (isInView) {
      spring.set(to)
    }
  }, [isInView, spring, to])

  return (
    <motion.span ref={ref} className="font-bold tabular-nums">
      {display}
    </motion.span>
  )
}
