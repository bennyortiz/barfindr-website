import React from 'react';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';

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
   * Whether to use a content max-width that's narrower than the full container
   * @default false
   */
  content?: boolean;

  /**
   * The HTML element to render
   * @default 'div'
   */
  as?: React.ElementType;
}

/**
 * Container component that provides consistent max-width and padding
 * based on the design system configuration.
 *
 * This component should be used for all main content areas to ensure
 * consistent layout and spacing throughout the application.
 *
 * @example
 * // Basic usage
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Content goes here...</p>
 * </Container>
 *
 * @example
 * // Full width container with padding
 * <Container maxWidth={false}>
 *   <div>Full width content...</div>
 * </Container>
 */
export function Container({
  children,
  className,
  maxWidth = true,
  padding = true,
  center = true,
  content = false,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        // Base styles
        'w-full',

        // Conditional styles based on design system
        maxWidth && !content && `max-w-[${designSystem.layout.maxWidth}]`,
        maxWidth && content && `max-w-[${designSystem.layout.contentMaxWidth}]`,
        padding && 'px-4 sm:px-6 md:px-8 lg:px-10', // Responsive padding from design system
        center && 'mx-auto', // Center the container

        // Custom className
        className
      )}
      data-component="container"
      {...props}
    >
      {children}
    </Component>
  );
}
