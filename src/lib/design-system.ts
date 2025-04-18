/**
 * BarFindr Design System
 *
 * This file defines the core design tokens and guidelines for the BarFindr application.
 * It serves as a single source of truth for design decisions and helps maintain
 * consistency across the application.
 *
 * Inspired by Apple's design principles of clarity, deference, and depth.
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

  // Typography system
  typography: {
    // Font families
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    // Font weights
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    // Font sizes
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem',      // 128px
    },
    // Line heights
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    // Letter spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    // Text styles (presets for common text elements)
    textStyles: {
      // Headings
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontSize: '1.875rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.015em',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '-0.005em',
      },
      // Body text
      body: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0em',
      },
      bodyLarge: {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0em',
      },
      bodySmall: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0em',
      },
      // Special text styles
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      link: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0em',
        textDecoration: 'underline',
      },
    },
  },

  // Spacing system
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem',     // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem',    // 12px
    3.5: '0.875rem', // 14px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    9: '2.25rem',    // 36px
    10: '2.5rem',    // 40px
    11: '2.75rem',   // 44px
    12: '3rem',      // 48px
    14: '3.5rem',    // 56px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    28: '7rem',      // 112px
    32: '8rem',      // 128px
    36: '9rem',      // 144px
    40: '10rem',     // 160px
    44: '11rem',     // 176px
    48: '12rem',     // 192px
    52: '13rem',     // 208px
    56: '14rem',     // 224px
    60: '15rem',     // 240px
    64: '16rem',     // 256px
    72: '18rem',     // 288px
    80: '20rem',     // 320px
    96: '24rem',     // 384px
  },

  // Colors system
  colors: {
    // Primary brand colors
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    // Neutral colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    // Semantic colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    // Apple-inspired subtle shadows
    'apple-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)',
    'apple-md': '0 4px 8px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    'apple-lg': '0 12px 20px -3px rgba(0, 0, 0, 0.07), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
    'apple-card': '0 2px 5px -1px rgba(0, 0, 0, 0.03), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
    'apple-dropdown': '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.04)',
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
    // Apple-inspired radii
    'apple-sm': '0.375rem',  // 6px
    'apple-md': '0.5rem',    // 8px
    'apple-lg': '0.75rem',   // 12px
    'apple-xl': '1.25rem',   // 20px
  },

  // Animation and transitions
  animation: {
    durations: {
      fastest: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slowest: '700ms',
    },
    timingFunctions: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Apple-inspired timing functions
      'apple-standard': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      'apple-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
      'apple-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
      'apple-spring': 'cubic-bezier(0.5, 1.25, 0.75, 1.25)',
    },
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
      defaultShadow: 'apple-card',
      defaultRadius: 'apple-md',
      defaultPadding: true,
      hoverEffect: 'subtle-lift',
    },

    // Hero section
    hero: {
      defaultHeight: {
        xs: '40vh',
        sm: '50vh',
        md: '60vh',
      },
      defaultOverlay: true,
      defaultTextPosition: 'bottom',
      imageQuality: 'high',
      animation: 'subtle-zoom',
    },

    // Button styles
    button: {
      variants: {
        primary: {
          background: 'primary.600',
          text: 'white',
          hover: 'primary.700',
          active: 'primary.800',
          radius: 'apple-md',
          shadow: 'apple-sm',
        },
        secondary: {
          background: 'neutral.200',
          text: 'neutral.800',
          hover: 'neutral.300',
          active: 'neutral.400',
          radius: 'apple-md',
          shadow: 'apple-sm',
        },
        outline: {
          background: 'transparent',
          text: 'primary.600',
          border: 'primary.600',
          hover: 'primary.50',
          active: 'primary.100',
          radius: 'apple-md',
        },
        ghost: {
          background: 'transparent',
          text: 'neutral.700',
          hover: 'neutral.100',
          active: 'neutral.200',
          radius: 'apple-md',
        },
      },
      sizes: {
        sm: {
          padding: '0.5rem 1rem',
          fontSize: 'sm',
          height: '2rem',
        },
        md: {
          padding: '0.625rem 1.25rem',
          fontSize: 'base',
          height: '2.5rem',
        },
        lg: {
          padding: '0.75rem 1.5rem',
          fontSize: 'lg',
          height: '3rem',
        },
      },
    },

    // Input styles
    input: {
      defaultRadius: 'apple-md',
      defaultPadding: '0.625rem 0.875rem',
      defaultBorder: '1px solid',
      defaultBorderColor: 'neutral.300',
      focusBorderColor: 'primary.500',
      focusRingColor: 'primary.100',
      focusRingWidth: '3px',
      errorBorderColor: 'error.500',
      errorRingColor: 'error.100',
      disabledOpacity: 0.6,
      placeholderColor: 'neutral.400',
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
