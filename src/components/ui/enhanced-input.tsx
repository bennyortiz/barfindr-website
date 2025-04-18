"use client";

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  "flex w-full rounded-md border bg-white px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950",
  {
    variants: {
      variant: {
        default: "border-neutral-300 focus-visible:border-primary-500 focus-visible:ring-1 focus-visible:ring-primary-500/20 dark:border-neutral-700 dark:focus-visible:border-primary-500",
        error: "border-error-500 focus-visible:border-error-500 focus-visible:ring-1 focus-visible:ring-error-500/20 dark:border-error-500",
        success: "border-success-500 focus-visible:border-success-500 focus-visible:ring-1 focus-visible:ring-success-500/20 dark:border-success-500",
        // Apple-inspired variants
        "apple-default": "border-neutral-300 shadow-sm focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 dark:border-neutral-700 dark:focus-visible:border-primary-500",
        "apple-minimal": "border-transparent bg-neutral-100 focus-visible:bg-white focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 dark:bg-neutral-800 dark:focus-visible:bg-neutral-900",
        "apple-search": "border-transparent bg-neutral-100 pl-9 focus-visible:bg-white focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 dark:bg-neutral-800 dark:focus-visible:bg-neutral-900",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-5 py-3 text-base",
        // Apple-inspired sizes
        "apple-sm": "h-8 px-3 py-1.5 text-sm",
        "apple-md": "h-10 px-4 py-2 text-sm",
        "apple-lg": "h-12 px-5 py-3 text-base",
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
      variant: "apple-default",
      size: "apple-md",
      rounded: "apple-md",
    },
  }
);

export interface EnhancedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Icon to display before the input text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display after the input text
   */
  endIcon?: React.ReactNode;
  
  /**
   * Whether to add a subtle animation on focus
   * @default true
   */
  animate?: boolean;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display
   */
  helperText?: string;
  
  /**
   * Label for the input
   */
  label?: string;
  
  /**
   * Whether the input is required
   */
  required?: boolean;
  
  /**
   * Container className
   */
  containerClassName?: string;
}

/**
 * EnhancedInput component with Apple-inspired design
 * 
 * Features:
 * - Subtle animations on focus
 * - Refined typography and spacing
 * - Consistent focus states
 * - Icon support
 * - Error and helper text
 * - Label support
 */
export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({
    className,
    variant,
    size,
    rounded,
    startIcon,
    endIcon,
    animate = true,
    error,
    helperText,
    label,
    required,
    containerClassName,
    ...props
  }, ref) => {
    const inputElement = (
      <div className={cn("relative", containerClassName)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={cn(
              inputVariants({ variant, size, rounded }),
              startIcon && "pl-9",
              endIcon && "pr-9",
              error && "border-error-500 focus-visible:border-error-500 focus-visible:ring-error-500/20",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error 
                ? `${props.id}-error` 
                : helperText 
                  ? `${props.id}-description` 
                  : undefined
            }
            {...props}
          />
          
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {endIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p 
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-error-500"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={`${props.id}-description`}
            className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
    
    if (animate) {
      return (
        <motion.div
          whileFocus={{ scale: 1.01 }}
          transition={{ 
            duration: 0.2,
            ease: designSystem.animation.timingFunctions["apple-standard"]
          }}
        >
          {inputElement}
        </motion.div>
      );
    }
    
    return inputElement;
  }
);

EnhancedInput.displayName = "EnhancedInput";

export default EnhancedInput;
