/**
 * Custom Tailwind CSS plugins for BarFindr
 * 
 * This file contains custom Tailwind plugins that extend the default functionality
 * with BarFindr-specific utilities and components.
 */

const plugin = require('tailwindcss/plugin');

/**
 * Interactive elements plugin
 * 
 * Adds utilities for interactive elements like cards, buttons, and links
 */
const interactiveElements = plugin(function({ addComponents, theme }) {
  addComponents({
    // Card hover effect
    '.card-hover': {
      transition: `transform 0.3s ${theme('transitionTimingFunction.apple')}, box-shadow 0.3s ${theme('transitionTimingFunction.apple')}`,
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme('boxShadow.apple-lg'),
      },
    },
    
    // Button press effect
    '.button-press': {
      transition: `transform 0.2s ${theme('transitionTimingFunction.apple')}`,
      '&:active': {
        transform: 'scale(0.97)',
      },
    },
    
    // Image zoom effect
    '.image-zoom': {
      overflow: 'hidden',
      '& img': {
        transition: `transform 0.7s ${theme('transitionTimingFunction.apple')}`,
      },
      '&:hover img': {
        transform: 'scale(1.05)',
      },
    },
    
    // Link underline animation
    '.link-underline': {
      position: 'relative',
      textDecoration: 'none',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '1px',
        bottom: '-2px',
        left: '0',
        backgroundColor: 'currentColor',
        transform: 'scaleX(0)',
        transformOrigin: 'right',
        transition: `transform 0.3s ${theme('transitionTimingFunction.apple')}`,
      },
      '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      },
    },
    
    // Glassmorphism effects
    '.glass': {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: theme('backdropBlur.apple'),
      WebkitBackdropFilter: theme('backdropBlur.apple'),
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    '.glass-dark': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: theme('backdropBlur.apple'),
      WebkitBackdropFilter: theme('backdropBlur.apple'),
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    
    // Focus rings
    '.focus-ring': {
      outline: 'none',
      '&:focus-visible': {
        outline: 'none',
        boxShadow: '0 0 0 2px var(--primary), 0 0 0 4px white',
      },
    },
    '.focus-ring-inset': {
      outline: 'none',
      '&:focus-visible': {
        outline: 'none',
        boxShadow: '0 0 0 2px var(--primary)',
      },
    },
  });
});

/**
 * Typography enhancements plugin
 * 
 * Adds utilities for improved typography
 */
const typographyEnhancements = plugin(function({ addBase, theme }) {
  addBase({
    'html': {
      scrollBehavior: 'smooth',
    },
    'body': {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      textShadow: '0 0 1px rgba(0, 0, 0, 0.01)',
      overflowY: 'scroll',
    },
    ':focus-visible': {
      outline: '2px solid var(--primary)',
      outlineOffset: '2px',
    },
    '::selection': {
      backgroundColor: 'rgba(236, 72, 153, 0.2)',
      color: '#831843',
    },
    'h1, h2, h3, h4, h5, h6': {
      letterSpacing: theme('letterSpacing.tight'),
      fontWeight: '600',
    },
    'h1': {
      letterSpacing: theme('letterSpacing.tighter'),
    },
    'p': {
      lineHeight: '1.6',
    },
    'a, button, input, select, textarea': {
      transition: `all 0.2s ${theme('transitionTimingFunction.apple')}`,
    },
  });
});

module.exports = {
  interactiveElements,
  typographyEnhancements,
};
