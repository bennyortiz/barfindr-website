/**
 * Animation Utilities
 * 
 * This file contains utility functions and constants for animations
 * throughout the application, inspired by Apple's fluid animations.
 */

import { designSystem } from '@/lib/design-system';

/**
 * Stagger animation variants for lists
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fade up animation for individual items
 */
export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: designSystem.animation.timingFunctions["apple-standard"],
    },
  },
};

/**
 * Fade in animation for individual items
 */
export const fadeInItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: designSystem.animation.timingFunctions["apple-standard"],
    },
  },
};

/**
 * Scale animation for cards and buttons
 */
export const scaleItem = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: designSystem.animation.timingFunctions["apple-spring"],
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: designSystem.animation.timingFunctions["apple-standard"],
    }
  },
};

/**
 * Subtle lift animation for cards
 */
export const subtleLift = {
  initial: { 
    y: 0,
    boxShadow: designSystem.shadows["apple-sm"],
  },
  hover: { 
    y: -4,
    boxShadow: designSystem.shadows["apple-md"],
    transition: {
      duration: 0.3,
      ease: designSystem.animation.timingFunctions["apple-spring"],
    }
  },
};

/**
 * Page transition animation
 */
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: designSystem.animation.timingFunctions["apple-standard"],
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: designSystem.animation.timingFunctions["apple-accelerate"],
    }
  },
};

/**
 * Modal animation
 */
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: designSystem.animation.timingFunctions["apple-decelerate"],
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: designSystem.animation.timingFunctions["apple-accelerate"],
    }
  },
};

/**
 * Drawer animation
 */
export const drawerAnimation = {
  initial: { x: '100%' },
  animate: { 
    x: 0,
    transition: {
      duration: 0.4,
      ease: designSystem.animation.timingFunctions["apple-decelerate"],
    }
  },
  exit: { 
    x: '100%',
    transition: {
      duration: 0.3,
      ease: designSystem.animation.timingFunctions["apple-accelerate"],
    }
  },
};

/**
 * Backdrop animation
 */
export const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'linear',
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
    }
  },
};

/**
 * Subtle zoom animation for images
 */
export const subtleZoom = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.7,
      ease: designSystem.animation.timingFunctions["apple-standard"],
    }
  },
};

/**
 * Scroll-triggered animation
 * @param delay Optional delay in seconds
 */
export const scrollReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: designSystem.animation.timingFunctions["apple-standard"],
    }
  },
});

/**
 * Create a staggered delay for list items
 * @param index Item index
 * @param baseDelay Base delay in seconds
 * @param staggerAmount Amount to stagger each item
 */
export const getStaggeredDelay = (
  index: number, 
  baseDelay = 0.1, 
  staggerAmount = 0.05
) => baseDelay + (index * staggerAmount);
