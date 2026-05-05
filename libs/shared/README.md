# @ui-suite/shared

Shared utilities and type definitions for the UI Component Suite. Provides color manipulation, typography utilities, and WCAG accessibility helpers.

## Installation

```bash
pnpm add @ui-suite/shared
```

## Color Utilities

Import from `@ui-suite/shared`.

### Types

| Type | Description |
|------|-------------|
| `ColorFormat` | `'hex' \| 'rgb' \| 'hsl'` |
| `RgbColor` | `{ r, g, b: number (0-255), a?: number (0-1) }` |
| `HslColor` | `{ h: number (0-360), s, l: number (0-100), a?: number (0-1) }` |

### Conversion Functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `parseHex` | `(hex: string) => RgbColor` | Parse HEX color to RGB object |
| `rgbToHex` | `(rgb: RgbColor) => string` | Convert RGB to HEX string |
| `rgbToHsl` | `(rgb: RgbColor) => HslColor` | Convert RGB to HSL object |
| `hslToRgb` | `(hsl: HslColor) => RgbColor` | Convert HSL to RGB object |

### Luminance and Contrast

| Function | Signature | Purpose |
|----------|-----------|---------|
| `getLuminance` | `(rgb: RgbColor) => number` | Calculate relative luminance (0-1) |
| `getContrastRatio` | `(color1, color2) => number` | Contrast ratio between two colors (1-21) |
| `checkContrast` | `(fg, bg, level, size) => { ratio, pass, level }` | WCAG AA/AAA compliance check |
| `getContrastTextColor` | `(bg, black?, white?) => string` | Best text color (black or white) for a background |

### Color Manipulation

| Function | Signature | Purpose |
|----------|-----------|---------|
| `darkenColor` | `(color: string, amount: number) => string` | Darken by reducing lightness |
| `lightenColor` | `(color: string, amount: number) => string` | Lighten by increasing lightness |
| `generateHoverColor` | `(color, mode, amount?) => string` | Auto hover color based on theme mode |
| `generateActiveColor` | `(color, mode, amount?) => string` | Auto active/pressed color |
| `generateColorPalette` | `(baseColor: string) => Record<number, string>` | 11-shade palette (50-950) |

### Usage Example

```typescript
import {
  getContrastRatio,
  checkContrast,
  getContrastTextColor,
  darkenColor,
  generateColorPalette,
} from '@ui-suite/shared';

// Check WCAG compliance
const result = checkContrast('#3b82f6', '#ffffff', 'AA', 'normal');
// { ratio: 3.7, pass: false, level: 'AA normal' }

// Get best text color for a background
const textColor = getContrastTextColor('#fef3c7'); // '#000000'

// Generate full color palette from brand color
const palette = generateColorPalette('#3b82f6');
// { 50: '#eff6ff', 100: '#dbeafe', ..., 950: '#172554' }
```

## Typography Utilities

Import from `@ui-suite/shared`.

### Types

| Type | Description |
|------|-------------|
| `TypeScaleConfig` | `{ min, max: number, minVw?, maxVw?: number }` |
| `ResponsiveFontConfig` | `{ mobile, tablet?, desktop?, wide?: string }` |
| `Breakpoint` | `'mobile' \| 'tablet' \| 'desktop' \| 'wide'` |

### Functions

| Function | Signature | Purpose |
|----------|-----------|---------|
| `fluidFontSize` | `(config: TypeScaleConfig) => string` | Generate `clamp()` CSS for responsive font sizes |
| `calculateLineHeight` | `(fontSize: number) => number` | Recommended line-height for a font size |
| `calculateLetterSpacing` | `(fontSize: number) => string` | Recommended letter-spacing for a font size |
| `generateTypographyCss` | `() => string` | Generate full `:root {}` CSS custom properties block |

### Usage Example

```typescript
import { fluidFontSize, calculateLineHeight } from '@ui-suite/shared';

const fontSize = fluidFontSize({ min: 16, max: 24 });
// Returns: "clamp(1rem, 0.8889rem + 0.5556vw, 1.5rem)"

const lineHeight = calculateLineHeight(16); // 1.5
```

### Predefined Type Scales

The `TYPE_SCALES` constant provides pre-configured scale configs for display text (display1-3), headings (h1-h6), body text (body, bodySmall, caption), and UI labels (label, labelSmall).

## Running Unit Tests

```bash
nx test shared
```
