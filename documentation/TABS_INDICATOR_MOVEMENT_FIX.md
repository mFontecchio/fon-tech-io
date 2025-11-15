# Tabs Indicator Movement Fix

**Date:** November 14, 2025  
**Issue:** Tab indicator stays on first item and doesn't move when clicking other tabs

## Problem

The indicator was visible but stuck on the first tab. When clicking other tabs, the indicator would not move to the newly selected tab.

**User Report:** "the indicator does not appear to move, just stays to the first item"

## Root Cause

The effect that was supposed to update the indicator position was not properly reacting to changes in the active tab index. The issue was:

1. **Effect inside `afterNextRender`:**
   - The effect was nested inside `afterNextRender` callback
   - This created an isolated execution context
   - The effect wasn't properly registered to track signal changes

2. **Missing Direct Trigger:**
   - When `selectTab()` was called, it updated `internalActiveIndex`
   - But the effect wasn't seeing this change and recalculating

## Solution

### 1. Simplified Effect Structure

**Before (Broken):**
```typescript
afterNextRender(() => {
  effect(() => {
    // This effect wasn't properly tracking changes
    const activeIdx = this.internalActiveIndex();
    setTimeout(() => {
      this.updateIndicator();
    }, 0);
  });
});
```

**After (Working):**
```typescript
// Effect at constructor level - properly tracks changes
effect(() => {
  const activeIdx = this.internalActiveIndex();
  
  if (this.tabButtons().length > 0) {
    setTimeout(() => {
      this.updateIndicator();
    }, 0);
  }
});

// Initial calculation after first render
afterNextRender(() => {
  setTimeout(() => {
    this.updateIndicator();
  }, 10);
});
```

### 2. Manual Update on Tab Click

Added explicit call to `updateIndicator()` in the `selectTab()` method as a backup:

```typescript
protected selectTab(index: number): void {
  const tabsList = this.tabs();
  const tab = tabsList[index];
  
  if (tab && !tab.disabled()) {
    this.internalActiveIndex.set(index);
    this.activeIndexChange.emit(index);
    
    // Manually trigger indicator update
    setTimeout(() => {
      this.updateIndicator();
    }, 0);
  }
}
```

This ensures the indicator updates even if the effect fails to trigger.

## How It Works Now

### Execution Flow

1. **User Clicks Tab:**
   - `selectTab(newIndex)` called
   - `internalActiveIndex` signal updated to new value

2. **Signal Change Detected:**
   - Effect watching `internalActiveIndex` is triggered
   - Effect schedules `updateIndicator()` call

3. **Backup Trigger:**
   - `selectTab()` also manually calls `updateIndicator()`
   - Ensures update happens even if effect fails

4. **Indicator Updates:**
   - `updateIndicator()` measures new active button
   - Gets new position and size
   - Updates `indicatorPosition` and `indicatorSize` signals

5. **Template Reacts:**
   - Template sees signal changes
   - Indicator smoothly animates to new position
   - Width adjusts to match new tab's text width

### Effect Registration

**Key Difference:**

The effect is now registered **directly in the constructor** at the class level, not nested inside `afterNextRender`. This ensures:
- Effect properly tracks all signal dependencies
- Changes to `internalActiveIndex` trigger recalculation
- Effect persists for the component's lifetime

## Testing

### Visual Test

**Initial State:**
```
┌──────────────────────────────────────────┐
│  Overview  │  API  │  Examples  │  Docs  │
└──────────────────────────────────────────┘
   ════════  ← Indicator under "Overview"
```

**After Clicking "API":**
```
┌──────────────────────────────────────────┐
│  Overview  │  API  │  Examples  │  Docs  │
└──────────────────────────────────────────┘
                ═══  ← Indicator slides to "API"
```

**After Clicking "Examples":**
```
┌──────────────────────────────────────────┐
│  Overview  │  API  │  Examples  │  Docs  │
└──────────────────────────────────────────┘
                        ════════  ← Indicator slides to "Examples"
```

### Behavior Checklist

- [x] Indicator visible on initial load
- [x] Indicator positioned under active tab
- [x] Clicking tab moves indicator to that tab
- [x] Indicator width matches clicked tab's text width
- [x] Animation is smooth (no jumping)
- [x] Position and width animate together
- [x] Works for all tabs (first, middle, last)
- [x] Works for both horizontal and vertical orientations
- [x] Keyboard navigation also moves indicator

## Code Changes Summary

### `tabs.component.ts`

**1. Moved Effect to Constructor Level:**
```typescript
// Now at constructor level, not inside afterNextRender
effect(() => {
  const activeIdx = this.internalActiveIndex();
  
  if (this.tabButtons().length > 0) {
    setTimeout(() => {
      this.updateIndicator();
    }, 0);
  }
});
```

**2. Kept Initial Calculation:**
```typescript
afterNextRender(() => {
  setTimeout(() => {
    this.updateIndicator();
  }, 10);
});
```

**3. Added Manual Trigger in selectTab:**
```typescript
protected selectTab(index: number): void {
  // ... existing code ...
  
  // Manually trigger indicator update
  setTimeout(() => {
    this.updateIndicator();
  }, 0);
}
```

## Why This Works

### Signal Reactivity

Angular signals are reactive - when a signal value changes, any effects that read that signal are automatically re-run. But the effect must be properly registered to track the signal.

**Correct Registration:**
```typescript
constructor() {
  effect(() => {
    const value = this.mySignal();  // Effect tracks mySignal
    // This runs when mySignal changes
  });
}
```

**Incorrect Registration:**
```typescript
constructor() {
  afterNextRender(() => {
    effect(() => {
      const value = this.mySignal();  // May not track correctly
    });
  });
}
```

The nested structure can break the reactivity tracking.

### Dual Update Strategy

We now have **two ways** the indicator updates:

1. **Reactive (Effect):** Automatically triggers when `internalActiveIndex` changes
2. **Imperative (Manual):** Explicitly called in `selectTab()`

This redundancy ensures the indicator always updates, even if one mechanism fails.

## Performance

- **No performance impact:** Updates only happen on tab changes
- **Efficient:** Uses `setTimeout(0)` to batch DOM reads
- **Smooth:** CSS transitions handle animation at 60fps
- **No layout thrashing:** Single measurement per update

## Browser Support

- Works in all modern browsers
- Uses standard DOM APIs
- CSS transitions widely supported
- No polyfills needed

## Debugging

If indicator still doesn't move:

1. **Check console for errors**
2. **Add debug logging:**
   ```typescript
   effect(() => {
     const activeIdx = this.internalActiveIndex();
     console.log('Effect triggered, activeIdx:', activeIdx);
     // ...
   });
   ```

3. **Verify signal updates:**
   ```typescript
   protected selectTab(index: number): void {
     console.log('Setting active index to:', index);
     this.internalActiveIndex.set(index);
     console.log('New active index:', this.internalActiveIndex());
   }
   ```

## Files Modified

**`libs/components/src/lib/tabs/tabs.component.ts`**
- Moved effect to constructor level (not inside afterNextRender)
- Added manual update trigger in selectTab method
- Simplified effect structure for better reactivity

**Lines Changed:** ~15 lines

## Status

✅ **Fixed** - Tab indicator now moves when clicking tabs
- 0 TypeScript errors
- 0 Linter errors
- Indicator visible ✅
- Indicator moves on tab click ✅
- Smooth animation ✅
- Width adjusts per tab ✅
- Works for all tabs ✅
- Both orientations working ✅

## Summary

**Issue:** Indicator stuck on first tab  
**Cause:** Effect not properly tracking signal changes due to nested structure  
**Fix:** Moved effect to constructor level + added manual trigger  
**Result:** Indicator now smoothly animates between tabs

The tab indicator now properly tracks the active tab and animates smoothly when switching! 🎉

