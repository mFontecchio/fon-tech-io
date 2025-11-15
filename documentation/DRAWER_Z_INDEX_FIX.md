# Drawer Z-Index Fix - Above Showcase Navigation

**Date:** November 15, 2025  
**Issue:** Drawer clipping under showcase header and sidebar navigation

## The Problem

User reported:
> "the drawer appears to be clipping under some elements and the sidenav as well as top nav of the showcase"

### Root Cause

The drawer component was using a CSS variable `var(--primitive-z-modal)` that wasn't defined, causing it to default to `z-index: auto` or a low value. Meanwhile, the showcase app navigation had explicit z-index values:

```
Showcase Header:  z-index: 100
Showcase Sidebar: z-index: 50
Drawer Container: z-index: var(--primitive-z-modal) → undefined → auto
```

**Result:** Drawer appeared behind the navigation elements! ❌

## Z-Index Hierarchy

### Before Fix (Broken)
```
┌─────────────────────────────────┐
│  Header (z: 100)                │ ← On top
├─────────────────────────────────┤
│ Side │                          │
│ (50) │  Drawer (auto) ← Hidden │ ← Behind header/sidebar!
│      │                          │
└─────────────────────────────────┘
```

### After Fix (Correct)
```
┌─────────────────────────────────┐
│  Drawer Backdrop (z: 1000)      │ ← On top
│    ┌──────────────────┐         │
│    │ Drawer (z: 1000) │         │ ← Above everything
│    │                  │         │
│    └──────────────────┘         │
│  Header (z: 100)                │
├─────────────────────────────────┤
│ Side │                          │
│ (50) │  Content                 │
└─────────────────────────────────┘
```

## The Fix

**Added fallback value to z-index:**

```css
/* Before - No fallback */
.ui-drawer-container {
  z-index: var(--primitive-z-modal);
}

/* After - With fallback */
.ui-drawer-container {
  z-index: var(--primitive-z-modal, 1000);
}
```

**CSS Custom Property Fallback Syntax:**
```css
var(--variable-name, fallback-value)
```

- If `--primitive-z-modal` is defined: Use that value
- If `--primitive-z-modal` is NOT defined: Use `1000`

## Z-Index Values Explained

### Typical Stacking Order (Low to High)

| Layer | Z-Index | Elements |
|-------|---------|----------|
| **Base** | 0-10 | Normal content, cards, sections |
| **Navigation** | 50-100 | Sidebars, headers, sticky elements |
| **Overlays** | 100-500 | Dropdowns, tooltips, popovers |
| **Modals** | 500-1000 | Modals, drawers, dialogs |
| **Top Layer** | 1000+ | Critical notifications, emergency alerts |

### Our Specific Values

```
Content:          z-index: auto (0)
Showcase Sidebar: z-index: 50
Showcase Header:  z-index: 100
Drawer/Modal:     z-index: 1000 (fallback)
```

**Why 1000?**
- Well above navigation elements (100)
- Standard convention for modal overlays
- Leaves room for future z-index needs
- Matches common UI library patterns

## Why This Happened

The drawer was designed to use a design token system where z-index values are centrally defined:

```css
/* Expected design tokens (not implemented yet) */
:root {
  --primitive-z-base: 0;
  --primitive-z-dropdown: 100;
  --primitive-z-sticky: 200;
  --primitive-z-modal: 1000;
  --primitive-z-tooltip: 1500;
}
```

**But these tokens don't exist yet**, so `var(--primitive-z-modal)` resolved to nothing.

## CSS Fallback Pattern

This fix follows a defensive CSS pattern:

```css
/* Always provide fallbacks for custom properties */
color: var(--brand-color, #0066cc);
font-size: var(--text-size, 16px);
z-index: var(--z-modal, 1000);
```

**Benefits:**
1. Works even if token system isn't set up
2. Self-documenting (fallback shows intended value)
3. Easy to override with tokens later
4. No JavaScript required

## Component Behavior

### Drawer Stacking

**Container (backdrop + panel holder):**
```css
.ui-drawer-container {
  position: fixed;
  z-index: var(--primitive-z-modal, 1000);
  inset: 0;  /* top: 0, right: 0, bottom: 0, left: 0 */
}
```

**Backdrop:**
```css
.ui-drawer-backdrop {
  position: fixed;
  inset: 0;
  /* Inherits z-index from parent container */
}
```

**Drawer panel:**
```css
.ui-drawer {
  position: fixed;
  z-index: 1;  /* Relative to container */
  /* Positions based on direction (left/right/top/bottom) */
}
```

**Stacking within drawer container:**
```
Container (z: 1000)
  ├── Backdrop (z: auto, below panel)
  └── Panel (z: 1, above backdrop)
```

## Testing

### Verification Steps

1. **Open any drawer** (left, right, top, bottom)
2. **Verify drawer appears above:**
   - Showcase header (top navigation)
   - Showcase sidebar (left navigation)
   - Any page content
   - Any other components

3. **Test all positions:**
   - Left drawer should cover sidebar
   - Right drawer should cover content
   - Top drawer should cover header
   - Bottom drawer should cover footer

4. **Check backdrop:**
   - Should darken all content
   - Should be behind drawer panel
   - Should be above all page content

### DevTools Check

**Inspect `.ui-drawer-container` in DevTools:**

**Computed tab should show:**
```
z-index: 1000
position: fixed
```

**If token is defined later:**
```css
:root {
  --primitive-z-modal: 999;
}
```

Then it would show:
```
z-index: 999  /* Uses token value */
```

## Modal Component

The modal component uses the native `<dialog>` element, which has different behavior:

```html
<dialog class="ui-modal">
  Modal content
</dialog>
```

**Key differences:**
- `<dialog>` creates its own "top layer" stacking context
- Automatically appears above all other content
- Doesn't need explicit z-index
- Browser handles stacking order

**Native dialog stacking:**
```
Top Layer (browser-managed)
  └── <dialog> elements
──────────────────────────
Document Layer (z-index)
  └── Everything else
```

This is why only the drawer needed a fix - modals already work correctly using the native `<dialog>` API.

## Future Improvements

### Option 1: Implement Design Token System

Create a comprehensive z-index token system:

```css
/* libs/components/src/styles/tokens/z-index.css */
:root {
  /* Base layers */
  --primitive-z-base: 0;
  --primitive-z-below: -1;
  
  /* Elevated content */
  --primitive-z-dropdown: 100;
  --primitive-z-sticky: 200;
  --primitive-z-fixed: 300;
  
  /* Overlays */
  --primitive-z-overlay: 400;
  --primitive-z-modal: 1000;
  --primitive-z-popover: 1100;
  --primitive-z-tooltip: 1200;
  
  /* Critical */
  --primitive-z-notification: 1500;
  --primitive-z-max: 9999;
}
```

### Option 2: Use Direct Values

Remove the custom property and use direct values:

```css
.ui-drawer-container {
  z-index: 1000;  /* Modals/drawers layer */
}
```

**Pros:** Simple, explicit, no dependencies  
**Cons:** Less flexible, harder to theme

### Option 3: CSS Layers (Modern Approach)

Use CSS `@layer` for modern stacking:

```css
@layer base, components, overlays, modals;

@layer modals {
  .ui-drawer-container {
    /* Automatically stacks above lower layers */
  }
}
```

**Pros:** Modern, semantic, future-proof  
**Cons:** Requires CSS Layers support (2023+)

## Files Modified

**`libs/components/src/lib/drawer/drawer.component.css`**
- Line 15: Added fallback value `1000` to `var(--primitive-z-modal)`
- Changed: `z-index: var(--primitive-z-modal);`
- To: `z-index: var(--primitive-z-modal, 1000);`

## Related Components

### Other Components Using Z-Index

**Should verify/fix these similarly:**

1. **Popover** - Should be above content but below modals
2. **Tooltip** - Should be above most content
3. **Dropdown/Menu** - Should be above nearby content
4. **Navbar (sticky)** - Should be below modals

**Recommended z-index hierarchy:**
```css
.ui-navbar     { z-index: 100; }    /* Sticky navigation */
.ui-dropdown   { z-index: 200; }    /* Dropdowns */
.ui-popover    { z-index: 300; }    /* Popovers */
.ui-tooltip    { z-index: 400; }    /* Tooltips */
.ui-drawer     { z-index: 1000; }   /* Drawers/Modals */
.ui-toast      { z-index: 1500; }   /* Notifications */
```

## Status

✅ **Drawer z-index fixed** (1000 with fallback)  
✅ **Drawer appears above showcase navigation**  
✅ **Backdrop properly covers all content**  
✅ **All 4 drawer positions work**  
✅ **0 TypeScript errors**  
✅ **0 Linter errors**  
✅ **Modal component unchanged** (uses native dialog stacking)

## Summary

**Issue:** Drawer clipping under navigation  
**Root Cause:** Undefined CSS custom property `--primitive-z-modal`  
**Fix:** Added fallback value of `1000`  
**Result:** Drawer now properly appears above all showcase navigation ✅

**Key learning:** Always provide fallback values for CSS custom properties, especially for critical layout properties like `z-index`.

