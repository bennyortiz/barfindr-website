"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { motion } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
        secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 active:bg-neutral-400 shadow-sm",
        outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100",
        ghost: "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",
        link: "text-primary-600 underline-offset-4 hover:underline",
        destructive: "bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm",
        // Apple-inspired variants
        "apple-primary": "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-apple-sm",
        "apple-secondary": "bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 active:bg-neutral-100 shadow-apple-sm",
        "apple-outline": "border border-neutral-300 text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100",
        "apple-ghost": "text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100",
        "apple-dark": "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700 shadow-apple-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10 p-0",
        // Apple-inspired sizes
        "apple-sm": "h-8 px-3.5 py-1.5 text-sm rounded-md",
        "apple-md": "h-10 px-5 py-2.5 text-sm rounded-md",
        "apple-lg": "h-12 px-6 py-3 text-base rounded-md",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded",
        lg: "rounded-lg",
        full: "rounded-full",
        // Apple-inspired roundness
        "apple-sm": "rounded-md",
        "apple-md": "rounded-lg",
        "apple-lg": "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "apple-primary",
      size: "apple-md",
      rounded: "apple-md",
    },
  }
);

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether to render the button as a child component
   * @default false
   */
  asChild?: boolean;
  
  /**
   * Whether to add a subtle hover animation
   * @default true
   */
  animate?: boolean;
  
  /**
   * Whether to add a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Icon to display before the button text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display after the button text
   */
  endIcon?: React.ReactNode;
}

/**
 * EnhancedButton component with Apple-inspired design
 * 
 * Features:
 * - Subtle animations on hover and press
 * - Refined typography and spacing
 * - Consistent focus states
 * - Loading state
 * - Icon support
 */
export function EnhancedButton({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  animate = true,
  loading = false,
  startIcon,
  endIcon,
  children,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;
  
  const buttonContent = (
    <>
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </>
  );
  
  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          duration: 0.2,
          ease: designSystem.animation.timingFunctions["apple-standard"]
        }}
      >
        <Comp
          className={cn(buttonVariants({ variant, size, rounded, className }))}
          disabled={isDisabled}
          {...props}
        >
          {buttonContent}
        </Comp>
      </motion.div>
    );
  }
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      disabled={isDisabled}
      {...props}
    >
      {buttonContent}
    </Comp>
  );
}

export default EnhancedButton;
