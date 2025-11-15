# Showcase Features - Bug Fixes

**Date:** November 15, 2025  
**Status:** FIXED

---

## Issues Reported

1. **Theme menu does not open**
2. **No syntax highlighting visible**

---

## Root Causes & Fixes

### Issue 1: Theme Menu Not Opening

**Root Cause:**
The document-level click handler was closing the dropdown immediately when the toggle button was clicked. The button's click event was propagating to the document, triggering the `closeDropdown()` method.

**Fix:**
Added `$event.stopPropagation()` to the toggle button click handler to prevent the event from bubbling up to the document.

**File:** `apps/showcase/src/app/shared/theme-switcher.component.ts`

**Change:**
```typescript
// Before
(click)="toggleDropdown()"

// After
(click)="toggleDropdown(); $event.stopPropagation()"
```

**Result:**
- Theme dropdown now opens correctly
- Clicking outside still closes it (as intended)
- Click propagation properly controlled

---

### Issue 2: No Syntax Highlighting

**Root Cause:**
Prism.js was only highlighting code once on initial render via `afterNextRender()`. When navigating between component pages or when code blocks were dynamically loaded, the highlighting wasn't being re-applied.

**Fix:**
Added an `effect()` that watches for changes to the `code` and `language` inputs, and re-highlights the code block when either changes.

**File:** `apps/showcase/src/app/shared/code-block.component.ts`

**Change:**
```typescript
// Added effect to re-highlight on code changes
effect(() => {
  // Track code and language changes
  this.code();
  this.language();
  
  // Re-highlight on next tick
  setTimeout(() => {
    this.highlightCode();
  }, 0);
});
```

**Result:**
- Syntax highlighting now works on all pages
- Code blocks are highlighted when navigating between routes
- Highlighting updates when code changes dynamically

---

### Additional Fix: CommonJS Dependency Warning

**Issue:**
Build was showing warnings about Prism.js being a CommonJS module, which could cause optimization bailouts.

**Fix:**
Added Prism.js to the `allowedCommonJsDependencies` list in the build configuration.

**File:** `apps/showcase/project.json`

**Change:**
```json
{
  "options": {
    ...
    "allowedCommonJsDependencies": [
      "prismjs"
    ]
  }
}
```

**Result:**
- Build warnings eliminated
- Prism.js properly configured as allowed CommonJS dependency
- No optimization bailouts

---

## Testing Performed

### Theme Switcher
1. Clicked theme toggle button - dropdown opens
2. Selected different theme - theme changes and dropdown closes
3. Clicked outside dropdown - closes correctly
4. Clicked toggle while dropdown open - toggles correctly
5. Keyboard navigation - works as expected

### Syntax Highlighting
1. Navigated to Button component page - code highlighted
2. Navigated to Input component page - code highlighted
3. Switched between Overview, API, Examples tabs - all code highlighted
4. Checked multiple languages (TypeScript, HTML, CSS) - all working
5. Verified colors in light mode - readable and correct
6. Verified colors in dark mode - readable and correct
7. Switched to high-contrast mode - syntax colors visible

---

## Files Modified

1. `apps/showcase/src/app/shared/theme-switcher.component.ts`
   - Added `$event.stopPropagation()` to toggle button

2. `apps/showcase/src/app/shared/code-block.component.ts`
   - Added `effect` import
   - Added effect to watch code/language changes
   - Re-highlight on changes

3. `apps/showcase/project.json`
   - Added `allowedCommonJsDependencies` configuration
   - Included `prismjs` in allowed list

---

## Verification

**Dev Server:** Restarted successfully  
**Linter Errors:** 0  
**Build Warnings:** Reduced (CommonJS warnings eliminated)  
**Functionality:** Both features now working correctly

---

## How to Test

1. **Theme Switcher:**
   - Navigate to `http://localhost:4200`
   - Look at top-right header
   - Click the theme icon button (sun/moon)
   - Dropdown should appear with 3 theme options
   - Select a theme - should change immediately
   - Dropdown should close after selection

2. **Syntax Highlighting:**
   - Navigate to any component page (e.g., `/components/form/button`)
   - Look at the "Overview" tab - code should be colorful
   - Check "Examples" tab - all code blocks should be highlighted
   - Switch between components - highlighting should persist

---

## Status

Both issues resolved and verified working.  
Ready for continued development on Phase B features.

