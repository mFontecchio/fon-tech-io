# Theme Builder - Complete Implementation

## Overview

The Theme Builder is a comprehensive, interactive tool that allows users to customize design tokens in real-time with live preview and multiple export formats. It provides a professional interface for creating custom themes without writing code.

## Features

### ✅ Implemented Features

1. **Tabbed Interface**
   - Colors Tab
   - Typography Tab
   - Spacing Tab

2. **Color Editor**
   - Visual color pickers for all color tokens
   - Text input for precise hex/rgb values
   - Organized categories:
     - Brand Colors (primary, secondary, subtle)
     - Semantic Colors (success, warning, error, info)
     - Surface Colors (background, card, subtle)
     - Text Colors (primary, secondary, tertiary)

3. **Typography Editor**
   - Font family customization
   - Font size scale editing
   - Organized into:
     - Font Families (base, mono)
     - Font Sizes (xs, sm, md, lg, xl)

4. **Spacing Editor**
   - Spacing scale values (1-8)
   - Border radius values (sm, md, lg, full)
   - All values editable with text inputs

5. **Live Preview Panel**
   - Real-time updates as you edit
   - Sample components:
     - Buttons (all sizes and variants)
     - Form controls (inputs)
     - Feedback (alerts)
     - Cards
     - Typography hierarchy
     - Color swatches
   - Split-screen layout for side-by-side editing

6. **Export Functionality**
   - Export as CSS Variables (.css file)
   - Export as JSON (.json file)
   - Export as TypeScript (.ts file)
   - One-click download for each format

7. **Reset Feature**
   - Reset to default theme
   - Reloads the page to restore original values

## Architecture

### Component Structure

```
ThemeBuilderComponent
├── Token Editor (Left Panel)
│   ├── Colors Tab
│   │   ├── Brand Colors Category
│   │   ├── Semantic Colors Category
│   │   ├── Surface Colors Category
│   │   └── Text Colors Category
│   ├── Typography Tab
│   │   ├── Font Families Category
│   │   └── Font Sizes Category
│   └── Spacing Tab
│       ├── Spacing Scale Category
│       └── Border Radius Category
└── Live Preview (Right Panel)
    ├── Buttons
    ├── Form Controls
    ├── Feedback Components
    ├── Cards
    ├── Typography Samples
    └── Color Swatches
```

### Data Model

```typescript
interface ThemeToken {
  name: string;          // CSS variable name (e.g., '--semantic-brand-primary')
  value: string;         // Current value (e.g., '#3b82f6')
  type: 'color' | 'size' | 'font' | 'weight' | 'other';
  category: string;      // Category ID for grouping
  description?: string;  // Optional tooltip description
}

interface ThemeCategory {
  id: string;           // Unique category identifier
  name: string;         // Display name
  description: string;  // Category description
  tokens: ThemeToken[]; // Array of tokens in this category
}
```

### Reactivity

The Theme Builder uses Angular signals for reactive updates:

1. **Token Categories**: Each category (colors, typography, spacing) is a signal
2. **Effect Hook**: Watches all token changes and applies them to `document.documentElement.style`
3. **Live Updates**: Changes propagate immediately to the preview panel
4. **Computed Styles**: Preview automatically recomputes when tokens change

## How It Works

### 1. Token Initialization

On component creation, the builder:
- Reads all CSS custom properties from `:root`
- Uses `getComputedStyle(document.documentElement)` to get current values
- Organizes tokens into categories
- Stores them in signals for reactivity

### 2. Token Editing

When a user edits a token:
1. Input event fires with new value
2. `updateToken()` method updates the signal
3. Effect hook detects change
4. New value applied to `document.documentElement.style.setProperty()`
5. All components using that token update instantly

### 3. Live Preview

The preview panel:
- Contains actual UI components from the library
- Uses the same CSS variables as the main app
- Updates in real-time as tokens change
- Shows a representative sample of common components

### 4. Export

Each export format:
- Collects all tokens from all categories
- Formats them appropriately:
  - **CSS**: `:root { --token: value; }`
  - **JSON**: `{ "--token": "value" }`
  - **TypeScript**: `export const customTheme = { ... }`
- Creates a Blob and triggers browser download
- Cleans up resources (revokes object URL)

## Usage Guide

### For End Users

1. **Navigate to Theme Builder**
   - From sidebar: Tools → Theme Builder
   - Or directly: `/theme-builder`

2. **Edit Tokens**
   - Select a tab (Colors, Typography, Spacing)
   - Use color pickers or text inputs to edit values
   - See changes instantly in the preview panel

3. **Review Changes**
   - Check all component variants in the preview
   - Ensure text is readable
   - Verify color contrast

4. **Export Theme**
   - Click "Export Theme" button
   - Choose export format:
     - CSS Variables: For direct CSS usage
     - JSON: For configuration files
     - TypeScript: For Angular/React projects
   - File downloads automatically

5. **Reset Theme**
   - Click "Reset to Default" to restore original theme
   - Page reloads to apply default values

### For Developers

#### Integrating Exported Theme

**CSS Variables:**
```css
/* Import the downloaded theme.css */
@import 'theme.css';

/* Or copy tokens into your styles.css */
:root {
  --semantic-brand-primary: #3b82f6;
  /* ... other tokens */
}
```

**JSON:**
```typescript
import customTheme from './theme.json';

// Apply programmatically
Object.entries(customTheme).forEach(([token, value]) => {
  document.documentElement.style.setProperty(token, value);
});
```

**TypeScript:**
```typescript
import { customTheme } from './theme';

// Use in Angular service
@Injectable({ providedIn: 'root' })
export class ThemeService {
  applyCustomTheme() {
    Object.entries(customTheme).forEach(([token, value]) => {
      document.documentElement.style.setProperty(token, value);
    });
  }
}
```

## Token Reference

### Colors (14 tokens)

| Token | Category | Description |
|-------|----------|-------------|
| `--semantic-brand-primary` | Brand | Primary brand color |
| `--semantic-brand-secondary` | Brand | Secondary brand color |
| `--semantic-brand-subtle` | Brand | Subtle brand tint |
| `--semantic-success-primary` | Semantic | Success state color |
| `--semantic-warning-primary` | Semantic | Warning state color |
| `--semantic-error-primary` | Semantic | Error state color |
| `--semantic-info-primary` | Semantic | Info state color |
| `--semantic-surface-background` | Surfaces | Main background |
| `--semantic-surface-card` | Surfaces | Card background |
| `--semantic-surface-subtle` | Surfaces | Subtle surface tint |
| `--semantic-text-primary` | Text | Primary text color |
| `--semantic-text-secondary` | Text | Secondary text color |
| `--semantic-text-tertiary` | Text | Tertiary text color |

### Typography (7 tokens)

| Token | Category | Description |
|-------|----------|-------------|
| `--primitive-font-family-base` | Fonts | Base font stack |
| `--primitive-font-family-mono` | Fonts | Monospace font stack |
| `--primitive-font-size-xs` | Sizes | Extra small text |
| `--primitive-font-size-sm` | Sizes | Small text |
| `--primitive-font-size-md` | Sizes | Medium text (base) |
| `--primitive-font-size-lg` | Sizes | Large text |
| `--primitive-font-size-xl` | Sizes | Extra large text |

### Spacing (10 tokens)

| Token | Category | Description |
|-------|----------|-------------|
| `--primitive-spacing-1` | Spacing | 4px |
| `--primitive-spacing-2` | Spacing | 8px |
| `--primitive-spacing-3` | Spacing | 12px |
| `--primitive-spacing-4` | Spacing | 16px |
| `--primitive-spacing-6` | Spacing | 24px |
| `--primitive-spacing-8` | Spacing | 32px |
| `--primitive-border-radius-sm` | Radius | Small corners |
| `--primitive-border-radius-md` | Radius | Medium corners |
| `--primitive-border-radius-lg` | Radius | Large corners |
| `--primitive-border-radius-full` | Radius | Fully rounded |

**Total: 31 editable tokens**

## Technical Details

### Performance

- **Reactivity**: Angular signals ensure minimal re-renders
- **Effects**: Single effect hook applies all changes at once
- **DOM Updates**: Direct CSS variable updates (no component re-renders needed)
- **Export**: Client-side only, no server requests

### Browser Compatibility

- Modern browsers with CSS Custom Properties support
- Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+
- Color input type supported in all modern browsers

### Accessibility

- ✅ All inputs have associated labels
- ✅ Color pickers have accessible controls
- ✅ Keyboard navigable (Tab, Enter, Arrow keys)
- ✅ Screen reader friendly descriptions
- ✅ High contrast mode compatible

### Responsive Design

- Desktop: Side-by-side editor and preview (2 columns)
- Tablet: Single column layout (1200px breakpoint)
- Mobile: Stacked layout with full-width controls (768px breakpoint)

## Limitations & Future Enhancements

### Current Limitations

1. Only 31 core tokens are editable (subset of full design system)
2. No undo/redo functionality
3. No theme library or presets
4. No sharing or cloud storage
5. Reset requires page reload

### Planned Enhancements

1. **Undo/Redo**: History management for token edits
2. **Theme Presets**: Pre-made themes (Material, Bootstrap-like, etc.)
3. **Import Themes**: Upload and load existing theme files
4. **Color Palette Generator**: Generate harmonious color schemes
5. **Accessibility Checker**: Real-time contrast ratio validation
6. **Theme Library**: Save multiple themes locally
7. **Share Themes**: Generate shareable links
8. **Component-Specific Tokens**: Override tokens per component
9. **Animation Previews**: See transitions and animations
10. **Dark Mode Toggle**: Edit light and dark theme variants

## Code Examples

### Adding New Token Category

```typescript
protected readonly shadowCategories = signal<ThemeCategory[]>([
  {
    id: 'shadows',
    name: 'Box Shadows',
    description: 'Elevation and depth shadows',
    tokens: [
      { 
        name: '--primitive-shadow-sm', 
        value: this.getComputedToken('--primitive-shadow-sm'),
        type: 'other', 
        category: 'shadows' 
      },
      // ... more shadow tokens
    ],
  },
]);
```

### Custom Export Format

```typescript
protected exportAsSCSS(): void {
  const allCategories = [...this.colorCategories(), ...this.typographyCategories()];
  
  let scss = '// Custom Theme\n';
  allCategories.forEach(category => {
    scss += `\n// ${category.name}\n`;
    category.tokens.forEach(token => {
      const varName = token.name.replace(/^--/, '').replace(/-/g, '_');
      scss += `$${varName}: ${token.value};\n`;
    });
  });
  
  this.downloadFile('theme.scss', scss, 'text/x-scss');
}
```

## Best Practices

### For Theme Creators

1. **Maintain Contrast**: Ensure text/background contrast meets WCAG standards
2. **Test Thoroughly**: Check all component examples in preview
3. **Stay Consistent**: Use cohesive color palettes
4. **Consider Accessibility**: Test in high-contrast mode
5. **Document Changes**: Note which tokens were modified

### For Developers

1. **Version Control**: Track theme files in git
2. **Organize Themes**: Create a themes directory
3. **Test Integration**: Verify exported theme works in target environment
4. **Fallback Values**: Provide defaults if custom properties fail
5. **Performance**: Avoid changing themes frequently at runtime

## Conclusion

The Theme Builder is a powerful, user-friendly tool for creating custom themes without code. It provides real-time feedback, multiple export formats, and a comprehensive set of design tokens covering colors, typography, and spacing.

**Status: Production Ready** ✅

All core features are implemented and tested. The tool is ready for end users to create and export custom themes for the UI Component Suite.

