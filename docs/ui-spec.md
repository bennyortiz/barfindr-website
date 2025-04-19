# BarFindr UI Design Specification

## 1. Color Palette

BarFindr uses a dark theme with pink accent colors for a modern and vibrant look.

| Name       | Description                  | OKLCH Value         | HEX Equivalent  |
|------------|------------------------------|---------------------|-----------------|
| Background | Dark mode background         | oklch(0.145 0 0)    | #252525         |
| Foreground | Light text on dark background| oklch(0.985 0 0)    | #FAFAFA         |
| Primary    | Pink accent color            | oklch(0.7 0.25 330) | #D45CA0         |
| Secondary  | Slightly lighter background  | oklch(0.269 0 0)    | #444444         |
| Muted      | Subdued background           | oklch(0.269 0 0)    | #444444         |
| Accent     | Brighter pink for highlights | oklch(0.65 0.28 330)| #E06CB3         |

## 2. Typography Scale

- **Font Families**
  - Body: Geist Sans, sans-serif
  - Code: Geist Mono, monospace

- **Headings**
  - H1: 2.5rem (40px), font-weight 700, letter-spacing -0.03em, line-height 1.2
  - H2: 2rem (32px), font-weight 600, letter-spacing -0.025em, line-height 1.3
  - H3: 1.5rem (24px), font-weight 600, letter-spacing -0.025em, line-height 1.4

- **Body Text**
  - Font size: 1rem (16px), font-weight 400, line-height 1.6, letter-spacing normal

- **Font Smoothing**
  - Use antialiased rendering for crisp text

## 3. Spacing System

Based on Tailwind CSS scale for consistent spacing:

| Scale | Size  | Description          |
|-------|-------|----------------------|
| 4     | 1rem  | Standard spacing     |
| 6     | 1.5rem| Medium spacing       |
| 8     | 2rem  | Large spacing        |
| 12    | 3rem  | Extra large spacing  |

Use spacing consistently for margins, paddings, and gaps to create a balanced layout.

## 4. Components

### Buttons

- **Default**
  - Background: Primary color (#D45CA0)
  - Text: Foreground (#FAFAFA)
  - Border-radius: 6px
  - Padding: 0.75rem 1.5rem (12px 24px)
  - Font-weight: 600
  - Transition: background-color 0.3s ease

- **Hover**
  - Background: Accent color (#E06CB3)
  - Cursor: pointer

- **Active**
  - Background: Slightly darker pink (#B04E8A)

- **Disabled**
  - Background: Muted (#444444)
  - Text: #888888
  - Cursor: not-allowed

- **Error**
  - Background: #FF4C4C (red)
  - Text: #FFFFFF

### Cards (e.g., Bar Detail Card)

- Background: Secondary (#444444)
- Border-radius: 12px
- Padding: 1.5rem (24px)
- Box-shadow: 0 4px 12px rgba(0,0,0,0.3)
- Margin-bottom: 2rem
- Text color: Foreground (#FAFAFA)

### Tabs

- Background: Secondary (#444444)
- Active tab underline: Primary (#D45CA0)
- Text color: Foreground (#FAFAFA)
- Hover text color: Accent (#E06CB3)
- Padding: 0.75rem 1.25rem

## 5. Annotated Mockup: Bar Detail Page

- **Header**
  - Large H1 with bar name, letter-spacing -0.03em, margin-bottom 1.5rem
  - Subheading with location and category in smaller font, muted color (#888888)

- **Main Content**
  - Bar image or hero card at top with rounded corners and shadow
  - Description text with comfortable line height and spacing
  - Ratings and reviews section with star icons in primary color
  - Tabs for details, menu, and reviews with clear active state and spacing

- **Layout and Spacing**
  - Use consistent vertical rhythm with spacing scale (mostly 1.5rem and 2rem gaps)
  - Content centered with max-width 900px and horizontal padding 1rem on mobile
  - Responsive adjustments: stacked layout on mobile, grid or flex layout on desktop

- **Visual Hierarchy**
  - Clear distinction between headings, subheadings, and body text using size, weight, and color
  - Accent colors used sparingly for calls to action and highlights
  - Ample whitespace around elements to avoid clutter

This design approach ensures a polished, cohesive, and visually appealing UI that maintains usability and responsiveness across devices.