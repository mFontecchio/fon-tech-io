# Theme Builder - Dual Theme System

## Overview

The Theme Builder now supports **simultaneous Light and Dark mode editing**, allowing users to build a complete dual-theme solution with separate token values for each mode.

---

## Key Features

### ✅ 1. Light/Dark Mode Toggle

**Location:** Header actions (between Undo/Redo and A11y Check)

**Visual Indicators:**
- **Button State:** Filled (dark blue) when editing Dark mode, Outlined when editing Light mode
- **Icon:** Sun icon for Light mode, Moon icon for Dark mode
- **Badge:** Shows "Editing: Light Mode" or "Editing: Dark Mode" below title
- **Badge Color:** Default (gray) for Light, Info (blue) for Dark

**Keyboard Shortcut:** Click the sun/moon button to toggle

---

## How It Works

### Token Naming Convention

**Light Mode Tokens (Default):**
```css
--semantic-brand-primary: #3b82f6;
--semantic-success-primary: #10b981;
--semantic-surface-background: #ffffff;
```

**Dark Mode Tokens (with `-dark` suffix):**
```css
--semantic-brand-primary-dark: #60a5fa;
--semantic-success-primary-dark: #34d399;
--semantic-surface-background-dark: #0f172a;
```

### Editing Workflow

1. **Start with Light Mode** (default)
   - Edit all tokens for your light theme
   - Tokens are saved with their standard names

2. **Switch to Dark Mode**
   - Click the Light/Dark toggle button
   - Badge changes to "Editing: Dark Mode"
   - Button becomes filled (blue)

3. **Edit Dark Mode Tokens**
   - All the same tokens appear
   - Values you set are saved with `-dark` suffix
   - Changes only affect dark mode

4. **Switch Back and Forth**
   - Toggle anytime without losing changes
   - Each mode maintains its own values
   - Preview shows current mode being edited

---

## Export Formats

All export formats now include **both Light and Dark tokens**.

### 1. CSS Export

```css
/* Light Mode (Default) */
:root {
  /* Brand Colors */
  --semantic-brand-primary: #3b82f6;
  --semantic-brand-secondary: #8b5cf6;
  /* ... all light tokens ... */
}

/* Dark Mode */
:root[data-theme="dark"],
[data-theme="dark"] {
  /* Brand Colors - Dark */
  --semantic-brand-primary: #60a5fa;
  --semantic-brand-secondary: #a78bfa;
  /* ... all dark tokens ... */
}
```

**Usage in Application:**
```html
<!-- Toggle dark mode by adding/removing data-theme attribute -->
<html data-theme="dark">
  <!-- Your app content -->
</html>
```

### 2. JSON Export

```json
{
  "light": {
    "--semantic-brand-primary": "#3b82f6",
    "--semantic-brand-secondary": "#8b5cf6",
    ...
  },
  "dark": {
    "--semantic-brand-primary-dark": "#60a5fa",
    "--semantic-brand-secondary-dark": "#a78bfa",
    ...
  }
}
```

**Usage:**
```typescript
import theme from './theme.json';

// Apply light theme
Object.entries(theme.light).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});

// Apply dark theme
Object.entries(theme.dark).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key.replace('-dark', ''), value);
});
```

### 3. TypeScript Export

```typescript
export const customTheme = {
  light: {
    '--semantic-brand-primary': '#3b82f6',
    '--semantic-brand-secondary': '#8b5cf6',
    ...
  },
  dark: {
    '--semantic-brand-primary-dark': '#60a5fa',
    '--semantic-brand-secondary-dark': '#a78bfa',
    ...
  },
};
```

**Usage:**
```typescript
import { customTheme } from './theme';

type ThemeMode = 'light' | 'dark';

function applyTheme(mode: ThemeMode) {
  const tokens = customTheme[mode];
  Object.entries(tokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
```

---

## Technical Details

### Token Resolution

When editing **Light Mode:**
- Reads from: `--semantic-brand-primary`
- Writes to: `--semantic-brand-primary`

When editing **Dark Mode:**
- Reads from: `--semantic-brand-primary-dark` (fallback to light if not set)
- Writes to: `--semantic-brand-primary-dark`

### History Tracking

Undo/Redo works independently for each mode:
- Light mode changes tracked with standard token names
- Dark mode changes tracked with `-dark` suffix
- Full 50-entry history for each mode

### Accessibility Checker

The Accessibility Checker automatically uses the correct mode:
- When editing Light mode: checks light token combinations
- When editing Dark mode: checks dark token combinations
- Ensures WCAG compliance for both modes

### Save/Load Themes

**Saved Theme Structure:**
```typescript
{
  name: "My Custom Theme",
  tokens: {
    // Includes BOTH light and dark tokens
    "--semantic-brand-primary": "#3b82f6",       // Light
    "--semantic-brand-primary-dark": "#60a5fa",  // Dark
    ...
  },
  createdAt: "2025-11-15T03:00:00.000Z"
}
```

**When loading a saved theme:**
- All light tokens are applied
- All dark tokens (with `-dark` suffix) are applied
- Toggle between modes to see/edit each

---

## Best Practices

### 1. Start with a Preset

Apply a preset for one mode, then toggle and customize the other:

```
1. Click "Dark" preset → Sets good dark defaults
2. Toggle to Light mode
3. Click "Minimal" preset → Sets light defaults
4. Fine-tune both modes
```

### 2. Maintain Consistency

Keep the same **semantic meaning** across modes:
- If light `--semantic-brand-primary` is your main CTA color
- Dark `--semantic-brand-primary-dark` should also be your main CTA color
- Just adjusted for dark backgrounds

### 3. Test Contrast in Both Modes

1. Edit Light mode
2. Open A11y Checker → verify all AA/AAA
3. Toggle to Dark mode
4. Open A11y Checker → verify all AA/AAA
5. Adjust as needed

### 4. Use Color Generator

Generate harmonious palettes for each mode:

**Light Mode:**
```
Base: #3b82f6 (bright blue)
Generate: Analogous colors
Result: Light, vibrant palette
```

**Dark Mode:**
```
Base: #60a5fa (lighter blue)
Generate: Analogous colors
Result: Dark, less saturated palette
```

### 5. Export Both Modes

Always export with both modes included:
- CSS: Includes `:root` and `:root[data-theme="dark"]`
- JSON: Includes `light` and `dark` objects
- TypeScript: Includes typed `light` and `dark` objects

---

## Integration Guide

### Angular Integration

```typescript
// theme.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly mode = signal<'light' | 'dark'>('light');
  
  toggleTheme() {
    const newMode = this.mode() === 'light' ? 'dark' : 'light';
    this.mode.set(newMode);
    document.documentElement.setAttribute('data-theme', newMode);
  }
  
  initTheme() {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.mode.set(prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', this.mode());
  }
}
```

### React Integration

```typescript
// useTheme.ts
import { useState, useEffect } from 'react';

export function useTheme() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode);
  };
  
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', mode);
  }, []);
  
  return { mode, toggleTheme };
}
```

### Vanilla JavaScript

```javascript
// theme.js
let currentTheme = 'light';

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
}

// Initialize on page load
initTheme();
```

---

## Informational Alert

The Theme Builder displays this info at the top:

> **Dual Theme System:** This theme builder supports both Light and Dark modes. Use the Light/Dark toggle button to switch between editing modes. All tokens are saved separately for each mode (e.g., `--semantic-brand-primary` for light, `--semantic-brand-primary-dark` for dark). When you export, both sets of tokens will be included for a complete theme solution.

---

## UI Components

### Mode Indicator

**Location:** Below subtitle in header  
**Format:** `Editing: [Light Mode | Dark Mode]`  
**Badge Variant:** Default (gray) for Light, Info (blue) for Dark

### Toggle Button

**Location:** Header actions bar  
**Size:** Small (`size="sm"`)  
**Variant:** Outlined (Light mode), Filled (Dark mode)  
**Icon:** Dynamic (sun for light, moon for dark)  
**Label:** "Light" or "Dark"

---

## Troubleshooting

### Issue: Dark tokens not saving

**Cause:** Not in Dark mode editing  
**Fix:** Click the Light/Dark toggle button (should show moon icon and be filled)

### Issue: Same values in both modes

**Cause:** Forgot to edit dark mode separately  
**Fix:** Toggle to Dark mode, make changes, then export

### Issue: Export only shows light tokens

**Cause:** Old browser cache  
**Fix:** Hard refresh (Ctrl+Shift+R) and re-export

### Issue: Dark mode looks identical to light

**Cause:** Dark tokens not defined, falling back to light  
**Fix:** Toggle to Dark mode, edit all relevant tokens

---

## Summary

The Theme Builder's **Dual Theme System** provides:

✅ **Separate editing** for Light and Dark modes  
✅ **Visual indicators** showing current editing mode  
✅ **Automatic export** of both token sets  
✅ **Independent history** for undo/redo  
✅ **Mode-specific accessibility checks**  
✅ **Complete theme solution** ready for production  

**Total Token Count:** 31 × 2 = **62 tokens** (31 light + 31 dark)

**Supported Formats:** CSS, JSON, TypeScript  
**Integration:** Angular, React, Vue, Vanilla JS  
**Standards:** HTML5 `data-*` attributes, CSS Custom Properties  

---

**Last Updated:** 2025-11-15  
**Status:** Production Ready ✅

