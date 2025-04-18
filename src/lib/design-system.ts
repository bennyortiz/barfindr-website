/**
 * BarFindr Design System
 * 
 * This file defines the core design tokens and guidelines for the BarFindr application.
 * It serves as a single source of truth for design decisions and helps maintain
 * consistency across the application.
 */

export const designSystem = {
  // Layout constraints
  layout: {
    maxWidth: '1536px',
    contentMaxWidth: '1200px',
    padding: {
      container: {
        xs: '1rem', // 16px
        sm: '1.5rem', // 24px
        md: '2rem', // 32px
        lg: '2.5rem', // 40px
      },
      section: {
        xs: '2rem', // 32px
        sm: '3rem', // 48px
        md: '4rem', // 64px
        lg: '5rem', // 80px
      },
      card: {
        xs: '1rem', // 16px
        sm: '1.25rem', // 20px
        md: '1.5rem', // 24px
      },
    },
    gap: {
      xs: '0.5rem', // 8px
      sm: '1rem', // 16px
      md: '1.5rem', // 24px
      lg: '2rem', // 32px
      xl: '2.5rem', // 40px
    },
  },

  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component specific guidelines
  components: {
    // Page structure
    page: {
      defaultPadding: true,
      defaultMaxWidth: true,
    },
    
    // Section structure
    section: {
      defaultPadding: true,
      defaultMaxWidth: true,
    },
    
    // Card structure
    card: {
      defaultBorder: true,
      defaultShadow: 'sm',
      defaultRadius: 'md',
      defaultPadding: true,
    },
    
    // Hero section
    hero: {
      defaultHeight: {
        xs: '30vh',
        sm: '40vh',
        md: '50vh',
      },
      defaultOverlay: true,
      defaultTextPosition: 'bottom',
    },
  },
  
  // Naming conventions
  naming: {
    pages: 'PascalCase with Page suffix (e.g., BarDetailPage)',
    components: 'PascalCase (e.g., BarCard)',
    hooks: 'camelCase with use prefix (e.g., useBarData)',
    utils: 'camelCase (e.g., formatDate)',
    constants: 'UPPER_SNAKE_CASE (e.g., MAX_BARS_PER_PAGE)',
  },
};

/**
 * Helper function to get responsive values based on breakpoints
 */
export function responsive<T>(values: {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): string {
  return Object.entries(values)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'base') {
        return value;
      }
      return `@media (min-width: ${designSystem.breakpoints[breakpoint as keyof typeof designSystem.breakpoints]}) { ${value} }`;
    })
    .join(' ');
}
