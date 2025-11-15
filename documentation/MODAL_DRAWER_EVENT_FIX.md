# Modal and Drawer - Event Binding Fix

**Date:** November 15, 2025  
**Issue:** Modals and drawers only opening once, not reopening after dismissal

## The Problem

User reported:
> "modals and drawers appear to only be triggering once, after they are dismissed they are not called again."

### Root Cause

The demo component was listening to **incorrect output event names**:

**Modal:**
```html
<!--  Wrong: listening to non-existent event -->
<ui-modal [open]="isOpen()" (closeModal)="isOpen.set(false)">
```

**Drawer:**
```html
<!--  Wrong: listening to non-existent event -->
<ui-drawer [open]="showSettings()" (close)="showSettings.set(false)">
```

### Why This Broke Reopening

```
User clicks "Open Modal"
  ↓
isOpen.set(true)
  ↓
[open]="isOpen()" → Modal opens (isOpen = true)
  ↓
User closes modal (backdrop click or ESC)
  ↓
Modal emits (closed) event
  ↓
 Demo is listening to (closeModal), not (closed)
  ↓
isOpen stays TRUE (never set to false)
  ↓
User clicks "Open Modal" again
  ↓
isOpen.set(true) → But it's already true!
  ↓
No change detected, modal doesn't reopen
```

## Actual Component Outputs

### Modal Component
```typescript
// libs/components/src/lib/modal/modal.component.ts
readonly closed = output<void>();  //  Only this output exists
```

### Drawer Component
```typescript
// libs/components/src/lib/drawer/drawer.component.ts
readonly openChange = output<boolean>();  //  Emits true/false
readonly closed = output<void>();         //  Emits when closed
```

## The Fix

### Modal Demos - Changed Event Name

**Before:**
```html
<ui-modal [open]="isOpen()" (closeModal)="isOpen.set(false)">
```

**After:**
```html
<ui-modal [open]="isOpen()" (closed)="isOpen.set(false)">
```

Changed in 3 examples:
- Basic Modal
- Modal Sizes
- Modal without Backdrop Close

### Drawer Demos - Changed Event Name + Logic

**Before:**
```html
<ui-drawer [open]="showSettings()" (close)="showSettings.set(false)">
```

**After:**
```html
<ui-drawer [open]="showSettings()" (openChange)="showSettings.set($event)">
```

Changed in 3 examples:
- Navigation Drawer
- Right Drawer
- Drawer Sizes

**Why `(openChange)` is better for Drawer:**
- Emits `false` when closed, `true` when opened
- More semantic: directly syncs the state
- Using `$event` captures the boolean value

**Alternative (also works):**
```html
<ui-drawer [open]="showSettings()" (closed)="showSettings.set(false)">
```

But `(openChange)` is preferred because:
- Handles both open and close
- More flexible for two-way binding scenarios
- Standard Angular pattern (like `[(ngModel)]`)

## How It Works Now

### Modal Flow (Fixed)
```
User clicks "Open Modal"
  ↓
isOpen.set(true)
  ↓
[open]="isOpen()" → Modal opens
  ↓
User closes modal
  ↓
Modal emits (closed) event
  ↓
 Demo is listening to (closed)
  ↓
isOpen.set(false)
  ↓
User clicks "Open Modal" again
  ↓
isOpen.set(true) → Change detected (false → true)
  ↓
 Modal opens again!
```

### Drawer Flow (Fixed)
```
User clicks "Open Drawer"
  ↓
showSettings.set(true)
  ↓
[open]="showSettings()" → Drawer opens
  ↓
User closes drawer
  ↓
Drawer emits (openChange) with false
  ↓
 Demo is listening to (openChange)
  ↓
showSettings.set($event) → showSettings.set(false)
  ↓
User clicks "Open Drawer" again
  ↓
showSettings.set(true) → Change detected
  ↓
 Drawer opens again!
```

## Metadata Correction

### Modal Metadata - Removed Incorrect Output

**Before:**
```typescript
outputs: [
  { name: 'openChange', type: 'boolean', ... },  //  Doesn't exist
  { name: 'closed', type: 'void', ... },
]
```

**After:**
```typescript
outputs: [
  { name: 'closed', type: 'void', ... },  //  Only this exists
]
```

### Drawer Metadata - Already Correct

```typescript
outputs: [
  { name: 'openChange', type: 'boolean', ... },  //  Correct
  { name: 'closed', type: 'void', ... },         //  Correct
]
```

## Two-Way Binding Pattern

For components like Modal and Drawer, the typical pattern is:

### Option 1: Manual Two-Way Binding (What we use)
```html
<ui-drawer 
  [open]="showSettings()"           <!-- Input binding -->
  (openChange)="showSettings.set($event)"  <!-- Output binding -->
>
```

### Option 2: Angular Two-Way Binding Shorthand
```html
<!-- If the component supported this syntax -->
<ui-drawer [(open)]="showSettings()">
```

To support Option 2, the component would need:
- Input named `open`
- Output named `openChange` (exactly `{inputName}Change`)

**Drawer already follows this pattern!** 
- Input: `open`
- Output: `openChange`

So technically you could use:
```html
<ui-drawer [(open)]="showSettings()">
```

But since we're using signals, the explicit binding is clearer:
```html
<ui-drawer 
  [open]="showSettings()" 
  (openChange)="showSettings.set($event)"
>
```

## Testing

### Verification Steps

1. **Open modal/drawer** → Click "Open" button
2. **Close it** → Click backdrop or ESC
3. **Open again** → Click "Open" button
4. **Verify it opens** → Should work every time

### Expected Behavior

 **Modal:**
- Opens on button click
- Closes on backdrop click, ESC, or close button
- Can be reopened infinite times

 **Drawer:**
- Opens on button click
- Closes on backdrop click or ESC
- Can be reopened infinite times

## Files Modified

**`apps/showcase/src/app/shared/component-demo.component.ts`**
- Lines 940, 950, 959: Changed `(closeModal)` → `(closed)` for modals
- Lines 1047, 1056, 1065: Changed `(close)` → `(openChange)` for drawers

**`apps/showcase/src/app/data/component-metadata.ts`**
- Line 1173-1175: Removed incorrect `openChange` output from modal metadata

## Key Learnings

### 1. Event Names Must Match Component Outputs
```typescript
// In component
readonly closed = output<void>();

// In template - MUST match exactly
(closed)="handleClose()"
```

### 2. State Management for Open/Close
```typescript
// Signal to track state
protected isOpen = signal(false);

// Open
(click)="isOpen.set(true)"

// Close - listen to component's output
(closed)="isOpen.set(false)"

// Binding
[open]="isOpen()"
```

### 3. Prefer `openChange` for Drawers
- Emits boolean, not void
- More flexible
- Follows Angular two-way binding convention

### 4. Why Incorrect Events Fail Silently
- Angular doesn't error on invalid event bindings
- Event just never fires
- State never updates
- Component appears to only work once

## Status

 **Modal reopening fixed**  
 **Drawer reopening fixed**  
 **Metadata corrected**  
 **0 TypeScript errors**  
 **0 Linter errors**  
 **All 3 modal demos working**  
 **All 3 drawer demos working**

## Summary

**Issue:** Modal and drawer only opening once  
**Root Cause:** Listening to wrong output events (`closeModal`, `close`)  
**Actual Events:** `closed` for modal, `openChange`/`closed` for drawer  
**Fix:** Updated event bindings to match actual component outputs  
**Result:** Components can now be opened, closed, and reopened infinitely 


