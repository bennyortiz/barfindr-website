/**
 * Component Documentation System
 * 
 * This file provides a structured way to document components for both humans and AI.
 * Each component should have a corresponding documentation entry that describes its
 * purpose, props, usage patterns, and examples.
 */

export interface ComponentDoc {
  /**
   * The name of the component
   */
  name: string;
  
  /**
   * A brief description of the component's purpose
   */
  description: string;
  
  /**
   * Detailed information about the component's props
   */
  props: PropDoc[];
  
  /**
   * Common usage patterns for the component
   */
  usagePatterns: UsagePattern[];
  
  /**
   * Related components that are often used together
   */
  relatedComponents?: string[];
  
  /**
   * Any special considerations or limitations
   */
  notes?: string[];
}

export interface PropDoc {
  /**
   * The name of the prop
   */
  name: string;
  
  /**
   * The type of the prop
   */
  type: string;
  
  /**
   * Whether the prop is required
   */
  required: boolean;
  
  /**
   * The default value of the prop, if any
   */
  defaultValue?: string;
  
  /**
   * A description of the prop's purpose
   */
  description: string;
}

export interface UsagePattern {
  /**
   * A name for the usage pattern
   */
  name: string;
  
  /**
   * A description of when to use this pattern
   */
  description: string;
  
  /**
   * Example code for this usage pattern
   */
  example: string;
}

/**
 * Example component documentation
 */
export const containerDoc: ComponentDoc = {
  name: 'Container',
  description: 'A layout component that provides consistent max-width and padding based on the design system.',
  props: [
    {
      name: 'maxWidth',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Whether to apply the max-width constraint from the design system.',
    },
    {
      name: 'padding',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Whether to apply horizontal padding based on the design system.',
    },
    {
      name: 'center',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'Whether to center the container horizontally.',
    },
    {
      name: 'as',
      type: 'React.ElementType',
      required: false,
      defaultValue: 'div',
      description: 'The HTML element to render.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply to the container.',
    },
  ],
  usagePatterns: [
    {
      name: 'Standard Page Container',
      description: 'Use as the main container for page content to ensure consistent width and padding.',
      example: `
<Container>
  <h1>Page Title</h1>
  <p>Page content goes here...</p>
</Container>
      `,
    },
    {
      name: 'Full Width Container',
      description: 'Use when you need a container without max-width constraints but still want consistent padding.',
      example: `
<Container maxWidth={false}>
  <div>Full width content...</div>
</Container>
      `,
    },
  ],
  relatedComponents: ['PageLayout', 'Section'],
  notes: [
    'Always use Container for main page content to ensure consistent layout.',
    'For nested containers, consider using padding={false} to avoid double padding.',
  ],
};
