# Design System Guide

## Overview

The UI Component Suite design system provides a comprehensive set of design tokens, theming capabilities, and typography standards to ensure consistent, accessible, and beautiful user interfaces.

## Design Token System

### Three-Tier Architecture

The design system uses a hierarchical three-tier token architecture that provides flexibility while maintaining consistency.

#### Tier 1: Primitive Tokens

Primitive tokens are the foundational design values. They define raw properties without any semantic meaning.

**Colors**
```typescript
{
  primary: {
    50: '#eff6ff',   // Lightest
    500: '#3b82f6',  // Base
    950: '#172554'   // Darkest
  },
  // Similar structure for:
  // secondary, accent, neutral, success, warning, error, info
}
```

**Spacing Scale** (4px multiplier)
- 0: 0
- 1: 4px (0.25rem)
- 2: 8px (0.5rem)
- 4: 16px (1rem)
- 8: 32px (2rem)
...up to 64: 256px (16rem)

**Typography**
- Font families: sans, serif, mono
- Font sizes: xs (12px) to 9xl (128px)
- Font weights: thin (100) to black (900)
- Line heights: none (1) to loose (2)
- Letter spacing: tighter (-0.05em) to widest (0.1em)

**Border Radius**
- none: 0
- sm: 2px
- md: 4px
- lg: 8px
- full: 9999px

**Shadows**
- none to 2xl
- inner shadow

**Z-Index Scale**
- base: 0
- dropdown: 1000
- modal: 1400
- tooltip: 1600
- notification: 1700

#### Tier 2: Semantic Tokens

Semantic tokens give meaning to primitive tokens based on their usage.

**Surface Colors**
```css
--semantic-surface-background          /* Main app background */
--semantic-surface-background-secondary /* Secondary background */
--semantic-surface-card                /* Card/panel backgrounds */
--semantic-surface-modal               /* Modal backgrounds */
```

**Text Colors**
```css
--semantic-text-primary     /* Primary text */
--semantic-text-secondary   /* Secondary text */
--semantic-text-disabled    /* Disabled text */
--semantic-text-inverse     /* Inverse (light on dark) */
--semantic-text-link        /* Link text */
```

**Border Colors**
```css
--semantic-border-default   /* Default borders */
--semantic-border-focus     /* Focus state */
--semantic-border-error     /* Error state */
```

**State Colors**
```css
--semantic-state-hover       /* Hover overlay */
--semantic-state-active      /* Active/pressed state */
--semantic-state-selected    /* Selected state */
--semantic-state-focus-ring  /* Focus indicator */
```

**Brand Colors**
```css
--semantic-brand-primary        /* Primary brand */
--semantic-brand-primary-hover  /* Hover state */
--semantic-brand-secondary      /* Secondary brand */
--semantic-brand-accent         /* Accent color */
```

**Feedback Colors**
```css
--semantic-feedback-success        /* Success */
--semantic-feedback-success-subtle /* Success background */
--semantic-feedback-error          /* Error */
--semantic-feedback-warning        /* Warning */
--semantic-feedback-info           /* Information */
```

#### Tier 3: Component Tokens

Component-specific tokens that customize individual components.

**Button Tokens**
```css
--component-button-padding-x
--component-button-padding-y
--component-button-font-size
--component-button-border-radius

/* Variants */
--component-button-filled-background
--component-button-outlined-border
--component-button-text-text

/* Sizes */
--component-button-sizes-sm-padding-x
--component-button-sizes-md-padding-x
--component-button-sizes-lg-padding-x
```

**Input Tokens**
```css
--component-input-padding-x
--component-input-border-radius
--component-input-default-background
--component-input-focus-border
--component-input-error-border
```

## Using Design Tokens

### In Components

Components reference tokens via CSS custom properties:

```css
.my-component {
  background-color: var(--semantic-surface-card);
  color: var(--semantic-text-primary);
  border: 1px solid var(--semantic-border-default);
  border-radius: var(--primitive-border-radius-lg);
  padding: var(--primitive-spacing-4);
}
```

### Accessing in TypeScript

```typescript
import { ThemeService } from '@ui-suite/theming';

class MyComponent {
  private themeService = inject(ThemeService);

  // Access current theme
  currentTheme = this.themeService.currentTheme();

  // Access specific tokens
  get primaryColor() {
    return this.currentTheme.primitive.colors.primary[500];
  }
}
```

## Theming

### Built-in Themes

Three default themes are provided:

1. **Light Theme** - Clean, bright interface
2. **Dark Theme** - Reduced eye strain, OLED-friendly
3. **High Contrast** - Enhanced accessibility

### Applying Themes

```typescript
import { ThemeService } from '@ui-suite/theming';

class AppComponent {
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Set theme by ID
    this.themeService.setTheme('dark');

    // Or by mode
    this.themeService.setThemeMode('dark');

    // Toggle dark mode
    this.themeService.toggleDarkMode();
  }
}
```

### Creating Custom Themes

```typescript
import { Theme } from '@ui-suite/theming';

const myCustomTheme: Theme = {
  metadata: {
    id: 'my-theme',
    name: 'My Custom Theme',
    mode: 'light',
  },
  primitive: {
    // Override primitive tokens
    colors: {
      primary: {
        500: '#ff6b6b',
        // ... other shades
      },
      // ... other colors
    },
    // ... other primitives
  },
  semantic: {
    // Override semantic tokens
  },
  component: {
    // Override component tokens
  },
};

// Register and apply
themeService.setCustomTheme(myCustomTheme);
```

### Theme Persistence

Themes are automatically persisted to localStorage:

```typescript
// Clear saved theme
themeService.clearStoredTheme();

// Detect system preference
const systemTheme = themeService.detectSystemTheme();

// Watch for system theme changes
themeService.watchSystemTheme();
```

### Exporting/Importing Themes

```typescript
// Export current theme as JSON
const themeJson = themeService.exportTheme();

// Save to file
const blob = new Blob([themeJson], { type: 'application/json' });
// ... download logic

// Import theme from JSON
themeService.importTheme(themeJson);
```

## Typography System

### Type Scales

Predefined type scales with fluid sizing:

```typescript
const typeScales = {
  display1: { min: 48, max: 96 },   // Hero text
  display2: { min: 40, max: 72 },
  h1: { min: 32, max: 48 },         // Main heading
  h2: { min: 28, max: 40 },
  h3: { min: 24, max: 32 },
  h4: { min: 20, max: 24 },
  h5: { min: 18, max: 20 },
  h6: { min: 16, max: 18 },
  body: { min: 16, max: 18 },       // Body text
  bodySmall: { min: 14, max: 16 },
  caption: { min: 12, max: 14 },
  label: { min: 14, max: 16 },      // Form labels
};
```

### Using Typography CSS Classes

```html
<!-- Display text -->
<h1 class="typography-display1">Hero Headline</h1>

<!-- Headings -->
<h2 class="typography-h2">Section Heading</h2>

<!-- Body text -->
<p class="typography-body">Regular paragraph text with optimal readability.</p>

<!-- Readable container -->
<div class="typography-container">
  <p>Content is constrained to ~65 characters per line for optimal readability.</p>
</div>
```

### Fluid Typography

All typography uses CSS `clamp()` for smooth scaling:

```css
font-size: clamp(1rem, 0.9444rem + 0.2778vw, 1.125rem);
```

This creates responsive text that scales smoothly between breakpoints without media queries.

### Typography in TypeScript

```typescript
import { TypographyService, fluidFontSize } from '@ui-suite/theming';

class MyComponent {
  private typography = inject(TypographyService);

  // Get current breakpoint
  breakpoint = this.typography.currentBreakpoint();

  // Check breakpoint
  isMobile = this.typography.isMobile();

  // Get fluid font size
  fontSize = fluidFontSize({ min: 16, max: 24 });

  // Get type scale
  headingScale = this.typography.getTypeScale('h1');
}
```

## Color System

### Color Palette Structure

Each color has 11 shades (50-950):
- **50-200**: Very light tints
- **300-400**: Light shades
- **500**: Base color (primary brand color)
- **600-700**: Dark shades
- **800-900**: Very dark shades
- **950**: Darkest shade

### Color Usage Guidelines

**Primary Colors**
- Use for main actions, links, and brand elements
- Primary 500 for light theme
- Primary 400 for dark theme

**Semantic Colors**
- Success (green): Confirmations, success states
- Warning (orange): Warnings, cautions
- Error (red): Errors, destructive actions
- Info (blue): Information, tips

**Neutral Colors**
- Use for text, borders, backgrounds
- Ensure proper contrast ratios

### Accessibility

All color combinations must meet WCAG contrast requirements:
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components: 3:1 minimum

## Spacing System

### Spacing Scale

Based on 4px base unit (0.25rem):

```
0:  0px
1:  4px    (0.25rem)
2:  8px    (0.5rem)
3:  12px   (0.75rem)
4:  16px   (1rem)     ← Base unit
5:  20px   (1.25rem)
6:  24px   (1.5rem)
8:  32px   (2rem)
10: 40px   (2.5rem)
12: 48px   (3rem)
16: 64px   (4rem)
...
```

### Using Spacing

```css
.component {
  /* Use spacing tokens */
  padding: var(--primitive-spacing-4);
  margin: var(--primitive-spacing-6);
  gap: var(--primitive-spacing-2);
}
```

### Spacing Guidelines

- **Related content**: 2-4 (8-16px)
- **Component padding**: 4-6 (16-24px)
- **Section spacing**: 8-12 (32-48px)
- **Layout spacing**: 16-24 (64-96px)

## Component Patterns

### Variants

Most components support variants:
- **Filled**: Solid background, high emphasis
- **Outlined**: Border only, medium emphasis
- **Text**: No background or border, low emphasis

### Sizes

Standard size scale:
- **Small (sm)**: Compact interfaces, dense data
- **Medium (md)**: Default size, most common
- **Large (lg)**: Prominent actions, touch-friendly

### States

All interactive components support:
- **Default**: Resting state
- **Hover**: Mouse over
- **Active**: Pressed/clicked
- **Focus**: Keyboard focus
- **Disabled**: Non-interactive
- **Loading**: Processing state

## Responsive Design

### Breakpoints

```typescript
const BREAKPOINTS = {
  mobile: 320px,
  tablet: 768px,
  desktop: 1024px,
  wide: 1440px,
};
```

### Mobile-First Approach

Design for mobile first, enhance for larger screens:

```css
/* Mobile first (base) */
.component {
  padding: var(--primitive-spacing-4);
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: var(--primitive-spacing-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: var(--primitive-spacing-8);
  }
}
```

## Best Practices

### DO
 Use design tokens for all styling
 Follow the three-tier token hierarchy
 Maintain consistent spacing with the scale
 Ensure proper color contrast
 Use semantic HTML elements
 Support keyboard navigation
 Include ARIA attributes
 Test with screen readers
 Support reduced motion preferences
 Use fluid typography

### DON'T
 Hardcode colors or spacing values
 Use arbitrary values outside the system
 Sacrifice accessibility for aesthetics
 Ignore semantic meaning of tokens
 Create components without keyboard support
 Use divs when semantic elements exist
 Skip focus indicators
 Assume mouse-only interaction

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Angular Documentation](https://angular.dev/)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)


