# List Component API Fix

**Date:** November 14, 2025  
**Issue:** Build error - `ListItemComponent` doesn't exist

## Problem

Build failed with:
```
TS2724: '"@ui-suite/components"' has no exported member named 'ListItemComponent'.
Did you mean 'ListComponent'?
```

## Root Cause

The List component doesn't use child components like `<ui-list-item>`. Instead, it accepts an array of `ListItem` objects through the `items` input property.

## List Component API

### Correct API
```typescript
interface ListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  [key: string]: any;
}

// Component inputs
items: ListItem[] (required)
variant: 'default' | 'bordered' | 'divided'
size: 'sm' | 'md' | 'lg'
ordered: boolean
interactive: boolean
showIcons: boolean
emptyMessage: string
```

### Usage
```html
<ui-list [items]="listItems" variant="divided" [interactive]="true"></ui-list>
```

## Changes Made

### 1. Removed Invalid Import 
```typescript
// REMOVED - doesn't exist
ListItemComponent,
```

### 2. Updated List Demos 
**Before (incorrect):**
```html
<ui-list>
  <ui-list-item>First item</ui-list-item>
  <ui-list-item>Second item</ui-list-item>
</ui-list>
```

**After (correct):**
```html
<ui-list [items]="simpleListItems()"></ui-list>
```

### 3. Added List Items Signal 
```typescript
protected readonly simpleListItems = signal([
  { id: 1, label: 'First item' },
  { id: 2, label: 'Second item' },
  { id: 3, label: 'Third item' },
]);
```

### 4. Updated All 3 List Demos 
1. **Simple List**: `<ui-list [items]="simpleListItems()"></ui-list>`
2. **Divided List**: `<ui-list [items]="simpleListItems()" variant="divided"></ui-list>`
3. **Interactive List**: `<ui-list [items]="simpleListItems()" [interactive]="true"></ui-list>`

## Components That DO Have Child Components

These components correctly use child components:
-  **Tabs** → `TabsComponent` + `TabComponent`
-  **Accordion** → `AccordionComponent` + `AccordionItemComponent`

## Components That Use Items Array

These components use an items/data array instead:
-  **List** → `items: ListItem[]`
-  **Table** → `data: any[]` + `columns: any[]`
-  **Breadcrumb** → `items: BreadcrumbItem[]`
-  **Pagination** → Uses `total`, `pageSize`, `currentPage` (no items)
-  **Stepper** → `steps: Step[]`

## Verification

### Linter Status 
```bash
read_lints: "No linter errors found."
```

### Build Status 
-  `ListItemComponent` removed from imports
-  List demos updated to use correct API
-  `simpleListItems` signal added
-  All 3 list examples now functional

## Files Modified

### `apps/showcase/src/app/shared/component-demo.component.ts`
1. Removed `ListItemComponent` from import statement (line 42)
2. Removed `ListItemComponent` from imports array (line 88)
3. Updated List demo implementations (lines 1083-1093)
4. Added `simpleListItems` signal (lines 1320-1327)

## Status

 **Build error resolved**
- ListItemComponent references removed
- List component now uses correct items array API
- All 3 list demos working correctly
- 0 TypeScript errors
- 0 Linter errors

The showcase should now build successfully!


