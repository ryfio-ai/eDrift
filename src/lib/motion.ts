export const motionTokens = {
  easeEnter: [0.16, 1, 0.3, 1] as const,
  easeExit: [0.4, 0, 1, 1] as const,
  durationFast: 0.18,
  durationBase: 0.32,
  durationMedium: 0.48,
  durationSlow: 0.72,
  staggerFast: 0.04,
  staggerBase: 0.06,
  hoverLift: -2,
  cardLift: -4,
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.48, ease: motionTokens.easeEnter }
  }
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

export const fadeUpMount = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionTokens.easeEnter }
  }
};

export const fadeLeftMount = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: motionTokens.easeEnter }
  }
};

export const fadeRightMount = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: motionTokens.easeEnter }
  }
};

export const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
};

export const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: motionTokens.easeEnter }
  }
};

export const heroVisual = {
  hidden: { opacity: 0, scale: 0.985 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: motionTokens.easeEnter }
  }
};

export const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12
    }
  }
};

export const gridItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: motionTokens.easeEnter }
  }
};

export const filterPanel = {
  hidden: { opacity: 0, scale: 0.985 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: motionTokens.easeEnter }
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    transition: { duration: 0.22, ease: motionTokens.easeExit }
  }
};

export const tabPanel = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 18 : -18
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, ease: motionTokens.easeEnter }
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -18 : 18,
    transition: { duration: 0.22, ease: motionTokens.easeExit }
  })
};
