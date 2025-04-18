// Theme configuration for BarFindr
// This file centralizes all theme-related constants and configurations

export const themeConfig = {
  // Site metadata
  siteName: 'BarFindr',
  siteDescription: 'Discover Austin\'s Best Bars',
  
  // Layout
  container: {
    maxWidth: '1536px', // Maximum width for the largest screens
    padding: {
      xs: '1rem',    // Mobile
      sm: '1.5rem',  // Small screens
      md: '2rem',    // Medium screens
      lg: '2.5rem',  // Large screens
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  
  // Typography
  typography: {
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  
  // Colors - using the existing color scheme
  colors: {
    primary: 'oklch(0.7 0.25 330)', // Pink primary
    primaryForeground: 'oklch(0.985 0 0)',
    accent: 'oklch(0.65 0.28 330)', // Pink accent
    background: {
      light: 'oklch(1 0 0)',
      dark: 'oklch(0.145 0 0)',
    },
    foreground: {
      light: 'oklch(0.145 0 0)',
      dark: 'oklch(0.985 0 0)',
    },
    muted: {
      light: 'oklch(0.97 0 0)',
      dark: 'oklch(0.269 0 0)',
    },
    mutedForeground: {
      light: 'oklch(0.556 0 0)',
      dark: 'oklch(0.708 0 0)',
    },
    border: {
      light: 'oklch(0.922 0 0)',
      dark: 'oklch(1 0 0 / 10%)',
    },
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  
  // Z-index
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
  
  // Transitions
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

// Export specific configurations for easier access
export const { container, colors, typography, spacing, borderRadius, shadows, transitions } = themeConfig;
