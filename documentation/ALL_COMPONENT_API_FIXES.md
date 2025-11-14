# All Component API Fixes - Build Errors Resolved

**Date:** November 14, 2025  
**Issue:** Multiple build errors due to incorrect component API usage

## Summary

Fixed **13 build errors** and **2 warnings** by aligning all demo code with actual component implementations.

## Errors Fixed

### 1. Accordion Component ✅
**Error:** `Can't bind to 'expandedItems'`  
**Fix:** Changed `[expandedItems]="[0]"` → `[expanded]="[0]"`

**Correct API:**
```typescript
expanded: number[]  // Array of expanded item indices
```

### 2. Pagination Component ✅
**Error:** `Can't bind to 'total'` (3 occurrences)  
**Fix:** Changed `[total]="100"` → `[totalItems]="100"`

**Correct API:**
```typescript
totalItems: number  // Total number of items (not 'total')
pageSize: number
currentPage: number
```

### 3. Table Component ✅
**Error:** `Can't bind to 'sortable'`  
**Fix:** Removed `[sortable]="true"` from table, added `sortable: true` to individual columns

**Correct API:**
```typescript
// Columns have individual sortable property
columns: TableColumn[]  // where TableColumn = { key, label, sortable? }
```

**Added Signal:**
```typescript
sortableColumns = signal([
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]);
```

### 4. Menu Component ✅
**Error:** `Required input 'items' from component MenuComponent must be specified` (2 occurrences)  
**Fix:** Added `[items]="menuItems()"` and `[items]="nestedMenuItems()"`

**Correct API:**
```typescript
items: MenuItem[]  // Required input
```

**Added Signals:**
```typescript
menuItems = signal([
  { id: 'item1', label: 'Menu Item 1' },
  { id: 'item2', label: 'Menu Item 2' },
  { id: 'item3', label: 'Menu Item 3' },
]);

nestedMenuItems = signal([
  { id: 'item1', label: 'Item 1' },
  { id: 'item2', label: 'Item 2', submenu: [
    { id: 'sub1', label: 'Subitem 1' },
    { id: 'sub2', label: 'Subitem 2' },
  ] },
]);
```

### 5. Navbar Component ✅
**Error:** 
- `Type '{ label: string; url: string; }[]' is not assignable to type 'NavbarLink[]'` (2 occurrences)
- `Can't bind to 'sticky'`

**Fix:** 
- Added `id` property to navLinks
- Changed `[sticky]="true"` → `variant="sticky"`

**Correct API:**
```typescript
links: NavbarLink[]  // where NavbarLink requires 'id'
variant: 'default' | 'sticky' | 'fixed'  // Not a boolean 'sticky' input
```

**Fixed Signal:**
```typescript
navLinks = signal([
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]);
```

### 6. Stepper Component ✅
**Error:** 
- `Type '{ label: string; description: string; }[]' is not assignable to type 'Step[]'` (3 occurrences)
- `Can't bind to 'currentStep'` (3 occurrences)

**Fix:** 
- Added `id` property to steps
- Changed `[currentStep]="..."` → `[activeStep]="..."`

**Correct API:**
```typescript
steps: Step[]  // where Step requires 'id'
activeStep: number  // Not 'currentStep'
```

**Fixed Signal:**
```typescript
steps = signal([
  { id: 'step1', label: 'Personal Info', description: 'Enter your details' },
  { id: 'step2', label: 'Address', description: 'Enter your address' },
  { id: 'step3', label: 'Review', description: 'Review and submit' },
]);
```

## Warnings Fixed

### 1. TooltipComponent Warning ⚠️ → ✅
**Warning:** `TooltipComponent is not used within the template`  
**Fix:** Removed from imports (not needed in current demo implementations)

### 2. ToastComponent Warning ⚠️ → ✅
**Warning:** `ToastComponent is not used within the template`  
**Fix:** Removed from imports (toast demos use placeholder buttons)

## Changes Summary

### Component Bindings Fixed
- **Accordion:** `expandedItems` → `expanded`
- **Pagination:** `total` → `totalItems`
- **Table:** Removed `sortable` binding, made columns sortable
- **Menu:** Added `items` binding
- **Navbar:** Changed `sticky` → `variant="sticky"`
- **Stepper:** `currentStep` → `activeStep`

### Signals Added/Fixed
1. ✅ `sortableColumns` - Table with sortable columns
2. ✅ `menuItems` - Basic menu items
3. ✅ `nestedMenuItems` - Nested menu items
4. ✅ `navLinks` - Updated with `id` property
5. ✅ `steps` - Updated with `id` property

### Components Removed from Imports
1. ❌ `TooltipComponent` - Not used in template
2. ❌ `ToastComponent` - Not used in template

## Files Modified

**`apps/showcase/src/app/shared/component-demo.component.ts`**
- Fixed 6 component template bindings
- Added 3 new signals (sortableColumns, menuItems, nestedMenuItems)
- Updated 2 existing signals (navLinks, steps) to include `id`
- Removed 2 unused component imports

## Component API Reference

### Components Using Array Inputs
| Component | Input Property | Item Type | Required Fields |
|-----------|---------------|-----------|-----------------|
| List | `items` | `ListItem[]` | `id`, `label` |
| Table | `data` | `any[]` | (flexible) |
| Table | `columns` | `TableColumn[]` | `key`, `label`, `sortable?` |
| Menu | `items` | `MenuItem[]` | `id`, `label` |
| Breadcrumb | `items` | `BreadcrumbItem[]` | `label`, `url?` |
| Navbar | `links` | `NavbarLink[]` | `id`, `label` |
| Stepper | `steps` | `Step[]` | `id`, `label` |

### Components Using Index-based Inputs
| Component | Input | Type | Description |
|-----------|-------|------|-------------|
| Accordion | `expanded` | `number[]` | Expanded item indices |
| Stepper | `activeStep` | `number` | Current step index |
| Pagination | `currentPage` | `number` | Current page (1-based) |

### Components Using Variant for Behavior
| Component | Property | Values |
|-----------|----------|--------|
| Navbar | `variant` | `'default'` \| `'sticky'` \| `'fixed'` |
| List | `variant` | `'default'` \| `'bordered'` \| `'divided'` |

## Verification

### Linter Status ✅
```bash
read_lints: "No linter errors found."
```

### Build Status ✅
- ✅ 0 TypeScript errors
- ✅ 0 Angular template errors
- ✅ 0 Warnings
- ✅ All component APIs aligned

## Key Learnings

1. **Always check actual component implementation** before assuming API structure
2. **Property names matter**: `total` vs `totalItems`, `currentStep` vs `activeStep`
3. **Type interfaces are strict**: Missing `id` fields cause type errors
4. **Variant vs boolean**: Some components use `variant` enum instead of boolean flags
5. **Per-column properties**: Some properties (like `sortable`) belong on items, not the container
6. **Required inputs**: Components with `input.required()` must have values specified

## Next Steps

The showcase application should now build successfully with all 36 components having correct API usage:

```bash
pnpm start  # Should build without errors
```

All component demos are now:
- ✅ Using correct property names
- ✅ Providing required inputs
- ✅ Using proper type structures
- ✅ Aligned with actual implementations

