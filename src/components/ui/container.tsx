import React from 'react';
import { cn } from '@/lib/utils';
import { container } from '@/lib/theme-config';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to use the max width constraint
   * @default true
   */
  maxWidth?: boolean;
  
  /**
   * Whether to add horizontal padding
   * @default true
   */
  padding?: boolean;
  
  /**
   * Whether to center the container
   * @default true
   */
  center?: boolean;
  
  /**
   * The HTML element to render
   * @default 'div'
   */
  as?: React.ElementType;
}

/**
 * Container component that provides consistent max-width and padding
 * based on the theme configuration
 */
export function Container({
  children,
  className,
  maxWidth = true,
  padding = true,
  center = true,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        // Base styles
        'w-full',
        
        // Conditional styles
        maxWidth && 'max-w-[1536px]', // Max width from theme config
        padding && 'px-4 sm:px-6 md:px-8 lg:px-10', // Responsive padding
        center && 'mx-auto', // Center the container
        
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
