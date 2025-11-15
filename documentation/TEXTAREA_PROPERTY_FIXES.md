# Textarea Component Property Fixes

**Date:** November 14, 2025  
**Issue:** TypeScript error - property name mismatches in Textarea component

## Error Message

```
NG8002: Can't bind to 'showCounter' since it isn't a known property of 'ui-textarea'.
```

## Root Cause

The demos and metadata used incorrect property names that didn't match the actual Textarea component implementation:

|  Used (Incorrect) |  Actual Property |
|---------------------|-------------------|
| `showCounter` | `showCharacterCount` |
| `error` | `errorMessage` |

## Component API (Verified)

From `libs/components/src/lib/textarea/textarea.component.ts`:

```typescript
export class TextareaComponent {
  readonly showCharacterCount = input<boolean>(false); // NOT showCounter
  readonly errorMessage = input<string | undefined>(undefined); // NOT error
  readonly maxLength = input<number | undefined>(undefined);
  // ... other properties
}
```

## Fixes Applied

### 1. Component Demo File
**File:** `apps/showcase/src/app/shared/component-demo.component.ts`

**Character Limit Example:**
```typescript
// BEFORE (wrong)
<ui-textarea 
  [maxLength]="200"
  [showCounter]="true"  //  Wrong property name
/>

// AFTER (correct)
<ui-textarea 
  [maxLength]="200"
  [showCharacterCount]="true"  //  Correct
/>
```

**Error State Example:**
```typescript
// BEFORE (wrong)
<ui-textarea 
  error="Message is required"  //  Wrong property name
/>

// AFTER (correct)
<ui-textarea 
  errorMessage="Message is required"  //  Correct
/>
```

### 2. Component Metadata File
**File:** `apps/showcase/src/app/data/component-metadata.ts`

**Updated Inputs Documentation:**
```typescript
inputs: [
  // ... other inputs
  { name: 'maxLength', type: 'number', description: 'Maximum character count' },
  { name: 'showCharacterCount', type: 'boolean', description: 'Display character counter', defaultValue: 'false' }, //  Added
  { name: 'errorMessage', type: 'string', description: 'Error message to display' }, //  Fixed from 'error'
  { name: 'helperText', type: 'string', description: 'Helper text below input' },
]
```

**Updated Example Templates:**
```typescript
// Character Limit Example
{
  title: 'Textarea with Character Limit',
  description: 'Maximum length with character counter',
  template: `<ui-textarea 
  label="Bio" 
  placeholder="Tell us about yourself..." 
  [maxLength]="200"
  [showCharacterCount]="true"  //  Added correct property
/>`,
}

// Error Example
{
  title: 'Textarea with Error',
  description: 'Error state with validation message',
  template: `<ui-textarea 
  label="Message" 
  placeholder="Enter message..." 
  errorMessage="Message is required"  //  Fixed from 'error'
/>`,
}
```

## Textarea Component Complete API

### All Inputs (Correct Names)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Current textarea value |
| `placeholder` | `string` | `''` | Placeholder text |
| `label` | `string` | `undefined` | Label text above textarea |
| `helperText` | `string` | `undefined` | Helper text below textarea |
| `errorMessage` | `string` | `undefined` | Error message to display |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `readonly` | `boolean` | `false` | Readonly state |
| `fullWidth` | `boolean` | `false` | Full width textarea |
| `autoResize` | `boolean` | `false` | Auto-resize to fit content |
| `showCharacterCount` | `boolean` | `false` | Display character counter |
| `maxLength` | `number` | `undefined` | Maximum character length |
| `minLength` | `number` | `undefined` | Minimum character length |
| `rows` | `number` | `3` | Number of visible text rows |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `string` | Emitted when value changes |

## Testing

### Character Counter Test
1. Navigate to Textarea → "Textarea with Character Limit" example
2. Type in the textarea
3. Should see "0 / 200 characters" counter below textarea
4. Counter should update as you type

### Error State Test
1. Navigate to Textarea → "Textarea with Error" example
2. Should see textarea with red border
3. Should see "Message is required" error message in red text below

## Files Modified

1. **`apps/showcase/src/app/shared/component-demo.component.ts`**
   - Line 211: Fixed `showCounter` → `showCharacterCount`
   - Line 225: Fixed `error` → `errorMessage`

2. **`apps/showcase/src/app/data/component-metadata.ts`**
   - Line 248: Added `showCharacterCount` input to documentation
   - Line 249: Fixed `error` → `errorMessage` in inputs
   - Line 280: Added `showCharacterCount` to Character Limit example template
   - Line 298: Fixed `error` → `errorMessage` in Error example template

## Status

 **Fixed** - All property names now match component implementation
- 0 TypeScript errors
- 0 Linter errors
- Documentation updated
- Examples updated
- Both demos now work correctly

## Summary

**Issue:** Wrong property names used in demos and documentation  
**Properties Fixed:** 2 (`showCounter` → `showCharacterCount`, `error` → `errorMessage`)  
**Files Updated:** 2  
**Lines Changed:** 6  
**Status:**  Resolved

Textarea component now uses correct property names throughout the showcase!


