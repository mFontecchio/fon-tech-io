# @ui-suite/theme-builder

Interactive visual theme builder and theme utilities for the UI Component Suite. Includes the full `ThemeBuilderComponent` UI, color utilities, theme presets, and storage helpers.

## Installation

```bash
pnpm add @ui-suite/theme-builder
```

Dependencies: `@ui-suite/theming`, `@ui-suite/components`, `@ui-suite/shared`

## ThemeBuilderComponent

A standalone Angular component providing a full interactive theme editor with live preview, dual light/dark mode editing, undo/redo, WCAG contrast checking, and JSON export.

**Integration via lazy-loaded route (recommended):**

```typescript
// app.routes.ts
{
  path: 'theme-builder',
  loadComponent: () => import('@ui-suite/theme-builder').then(m => m.ThemeBuilderComponent),
}
```

**Direct import:**

```typescript
import { ThemeBuilderComponent } from '@ui-suite/theme-builder';

@Component({
  imports: [ThemeBuilderComponent],
  template: `<app-theme-builder />`,
})
export class MyPage {}
```

## Theme Presets

```typescript
import { THEME_PRESETS, ThemePreset, convertPresetToTheme } from '@ui-suite/theme-builder';
import { Theme } from '@ui-suite/theming';

// Pre-configured theme presets (Material, Bootstrap, Dark, Minimal, Ocean, Sunset, etc.)
const presets: ThemePreset[] = THEME_PRESETS;

// Convert a flat preset to a proper Theme object
const theme: Theme = convertPresetToTheme(presets[0]);
```

## Color Utilities

All color utilities from `@ui-suite/shared` are re-exported for convenience, plus theme-builder-specific helpers:

```typescript
import {
  // Re-exported from @ui-suite/shared
  getContrastRatio,
  lightenColor,
  darkenColor,

  // Theme-builder-specific
  meetsWCAG,
  getWCAGLevel,
  getComplementaryColor,
  getAnalogousColors,
  isValidHexColor,
  generateShades,
} from '@ui-suite/theme-builder';

// WCAG compliance
const ratio = getContrastRatio('#3b82f6', '#ffffff'); // 3.7
const level = getWCAGLevel(ratio); // 'Fail'
const passes = meetsWCAG(ratio, 'AA', 'normal'); // false

// Color generation
const complement = getComplementaryColor('#3b82f6'); // complementary hex
const analogous = getAnalogousColors('#3b82f6'); // [hex, hex, hex]
const shades = generateShades('#3b82f6', 5); // 5 shades lighter → darker
```

## Storage Utilities

```typescript
import { saveTheme, getSavedThemes, deleteTheme } from '@ui-suite/theme-builder';

// Save theme tokens to localStorage
saveTheme('my-theme', { '--primitive-primary-500': '#0066cc' });

// Retrieve all saved themes
const themes = getSavedThemes();
// { 'my-theme': { name, tokens, createdAt } }

// Delete a saved theme
deleteTheme('my-theme');
```

## CSS Utilities

```typescript
import { parseCSSVariables } from '@ui-suite/theme-builder';

// Parse CSS custom properties from a CSS string
const tokens = parseCSSVariables(`:root { --color-primary: #3b82f6; --spacing-4: 1rem; }`);
// { '--color-primary': '#3b82f6', '--spacing-4': '1rem' }
```

## Running Unit Tests

```bash
nx test theme-builder
```
