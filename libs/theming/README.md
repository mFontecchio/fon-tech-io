# @mfontecchio/theming

Design token system and theme engine for the UI Component Suite. Implements a three-tier token hierarchy (Primitive → Semantic → Component) with full light, dark, and high-contrast theme support.

## Installation

```bash
pnpm add @mfontecchio/theming
```

## Three-Tier Token System

| Tier      | Prefix          | Purpose                             | Example                                |
| --------- | --------------- | ----------------------------------- | -------------------------------------- |
| Primitive | `--primitive-*` | Raw values — colors, spacing, scale | `--primitive-primary-500: #3b82f6`     |
| Semantic  | `--semantic-*`  | Purpose-driven mappings             | `--semantic-text-primary`              |
| Component | `--component-*` | Component-specific overrides        | `--component-button-filled-background` |

Always reference tokens in component CSS — never hardcode values:

```css
.ui-button {
  padding: var(--component-button-sizes-md-padding-y) var(--component-button-sizes-md-padding-x);
  background-color: var(--component-button-filled-background);
  border-radius: var(--component-button-border-radius);
}
```

## Animation Tokens

The library includes a full animation token system following the three-tier hierarchy.

**Primitive tokens** (`--primitive-animation-*`):

| Token                                   | Value                               |
| --------------------------------------- | ----------------------------------- |
| `--primitive-animation-duration-fast`   | `150ms`                             |
| `--primitive-animation-duration-normal` | `250ms`                             |
| `--primitive-animation-duration-slow`   | `350ms`                             |
| `--primitive-animation-easing-default`  | `ease-in-out`                       |
| `--primitive-animation-easing-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

**Semantic tokens** (use these in component CSS):

```css
/* Duration */
var(--animation-duration-fast)    /* 150ms */
var(--animation-duration-normal)  /* 250ms */
var(--animation-duration-slow)    /* 350ms */

/* Easing */
var(--animation-easing-default)   /* ease-in-out */
var(--animation-easing-spring)    /* cubic-bezier spring */
```

**Usage in component CSS:**

```css
/* Correct */
.ui-button {
  transition: background-color var(--animation-duration-normal) var(--animation-easing-default);
}

/* Wrong - hardcoded values */
.ui-button {
  transition: background-color 0.2s ease-in-out;
}
```

## ThemeService

The `ThemeService` uses Angular signals for reactive theme state and is SSR-compatible.

```typescript
import { ThemeService } from '@mfontecchio/theming';

@Component({ ... })
export class MyComponent {
  private themeService = inject(ThemeService);

  // Reactive signals
  readonly currentTheme = this.themeService.currentTheme;  // Signal<Theme>
  readonly isDarkMode = this.themeService.isDarkMode;      // Signal<boolean>

  // Imperative API
  setTheme(id: string): void
  setThemeMode(mode: 'light' | 'dark' | 'high-contrast'): void
  registerCustomTheme(theme: Theme): void
}
```

## CssGeneratorService

Converts theme token objects to CSS custom properties.

```typescript
import { CssGeneratorService } from '@mfontecchio/theming';

const cssGen = inject(CssGeneratorService);

// Generate CSS string
const css = cssGen.generateCssVariables(theme);
// Returns: ":root { --primitive-primary-500: #3b82f6; ... }"

// Apply to document root
cssGen.applyTheme(theme);

// Apply to specific element
cssGen.applyThemeToElement(theme, elementRef.nativeElement);
```

## ThemeGeneratorService

Auto-generates hover states, contrast text colors, and full themes from a single brand color.

```typescript
import { ThemeGeneratorService } from '@mfontecchio/theming';

const themeGen = inject(ThemeGeneratorService);

// Enhance existing theme with auto hover states and contrast text
const enhanced = themeGen.enhanceTheme(baseTheme, {
  autoGenerateHoverStates: true,
  autoContrastText: true,
  hoverAmount: 10,
});

// Create complete theme from a single brand color
const theme = themeGen.createThemeFromBrandColor('#0066cc', 'light', 'Corporate Blue', lightTheme);

// Generate 11-shade palette (50-950) from a single color
const palette = themeGen.generatePalette('#3b82f6');
```

## Creating a Custom Theme

```typescript
import { Theme } from '@mfontecchio/theming';

const myTheme: Theme = {
  metadata: {
    id: 'my-brand-theme',
    name: 'My Brand Theme',
    mode: 'light',
    description: 'Corporate brand theme',
    version: '1.0.0',
  },
  primitive: {
    colors: {
      primary: { 500: '#0066cc' /* ... other shades */ },
    },
  },
  semantic: {
    brand: { primary: 'var(--primitive-primary-500)' },
  },
  component: {
    button: { borderRadius: '8px' },
  },
};

// Register and activate
themeService.registerCustomTheme(myTheme);
themeService.setTheme('my-brand-theme');
```

## Running Unit Tests

```bash
nx test theming
```
