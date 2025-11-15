# Component Preview Implementation

## Overview

Implemented a clean, focused component preview system that displays live interactive examples alongside their HTML code.

## Implementation Date

November 14, 2025

## Design Philosophy

**Focus on Simplicity:**
- Show the component in action without distracting visual elements
- Display only the HTML code (no TypeScript unless specifically included in example)
- Provide ample spacing for components to breathe
- Clean, minimal styling that doesn't compete with the component itself

## Implementation Details

### 1. Component Demo Component (`component-demo.component.ts`)

**Purpose:**
Renders live, interactive component examples based on component ID and example title.

**Features:**
- Displays actual working components from `@ui-suite/components`
- Matches demos to specific examples from metadata
- Provides interactive functionality (e.g., button loading states)
- Clean, minimal styling with proper spacing
- Responsive component sizing with max-widths

**Styling Approach:**
```css
- No background patterns or distracting visuals
- Centered display for components
- Appropriate max-widths per component type
  - Form components: 400px
  - Cards: 500px
  - Alerts: 600px
  - Layout components (Stack/Grid): 600px
```

### 2. Component Detail Page Updates

#### Overview Tab
- **Single Example Preview**
  - Shows the first example as a quick preview
  - Displays the live component in a preview container
  - Shows only the HTML code below
  - Clean separation between sections

**Layout:**
```
┌─────────────────────────────────────────┐
│ About                                   │
│ [Description text]                      │
│                                         │
│ Quick Example                           │
│ ┌───────────────────────────────────┐  │
│ │   [Live Component Preview]        │  │
│ └───────────────────────────────────┘  │
│ [HTML Code Block]                       │
│                                         │
│ Selector                                │
│ [Selector Code]                         │
│                                         │
│ Best Practices                          │
│ ...                                     │
└─────────────────────────────────────────┘
```

#### Examples Tab
- **Multiple Example Previews**
  - Each example shows its live component
  - HTML code displayed immediately below preview
  - TypeScript code shown only if included in example
  - Clear separation between examples

**Layout Per Example:**
```
┌─────────────────────────────────────────┐
│ Example Title                           │
│ Description text                        │
│                                         │
│ ┌───────────────────────────────────┐  │
│ │   [Live Component Preview]        │  │
│ └───────────────────────────────────┘  │
│ [HTML Code Block]                       │
│                                         │
│ [TypeScript Code Block] (if present)   │
└─────────────────────────────────────────┘
```

### 3. Preview Container Styling

**Container Properties:**
```css
.example-preview {
  margin-bottom: var(--primitive-spacing-4);  /* 16px */
  padding: var(--primitive-spacing-10);        /* 40px */
  background: var(--semantic-surface-card);
  border: 1px solid var(--semantic-border-default);
  border-radius: var(--primitive-border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
}
```

**Design Rationale:**
- **Large padding (40px)**: Gives components breathing room
- **Min-height (200px)**: Ensures consistent container size
- **Centered alignment**: Focuses attention on the component
- **Clean border**: Subtle visual separation
- **Card background**: Distinguishes preview from documentation

## Supported Components

Current demo implementations:

### Form Components
-  Button (all variants, sizes, loading state)
-  Input (basic and with icons)
-  Textarea
-  Checkbox
-  Radio (grouped)
-  Switch
-  Select (with sample data)
-  Multi-Select (with sample data)
-  Slider

### Layout Components
-  Card
-  Divider
-  Stack
-  Grid

### Display Components
-  Badge
-  Avatar
-  Chip (removable)

### Feedback Components
-  Alert
-  Spinner
-  Progress
-  Skeleton

## Component-Specific Features

### Button Loading Demo
Interactive loading state demonstration:
```typescript
protected handleLoadingDemo(): void {
  this.isLoading.set(true);
  setTimeout(() => {
    this.isLoading.set(false);
  }, 2000);
}
```
When clicked, button shows loading state for 2 seconds.

### Select Components
Includes sample data for realistic demonstrations:
```typescript
// Country options for basic select
sampleOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' }
];

// Skill options for multi-select
skillOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' }
];
```

## File Structure

```
apps/showcase/src/app/
├── shared/
│   └── component-demo.component.ts
└── pages/components/
    └── component-detail.component.ts
```

## User Experience Benefits

### For Component Library Users:
1. **Visual Understanding**: See components before implementing
2. **Interactive Exploration**: Click, type, and interact with components
3. **Code Reference**: HTML code directly below each example
4. **Quick Validation**: Verify component appearance and behavior

### For Documentation:
1. **Living Documentation**: Examples are always up-to-date
2. **Visual Verification**: Catch rendering issues immediately
3. **Reduced Questions**: Users see exactly how components work
4. **Faster Adoption**: Lower barrier to using components

## Spacing System Used

All spacing uses design system tokens:
- `--primitive-spacing-3`: 12px (small gaps)
- `--primitive-spacing-4`: 16px (component spacing)
- `--primitive-spacing-6`: 24px (section spacing)
- `--primitive-spacing-8`: 32px (large spacing)
- `--primitive-spacing-10`: 40px (container padding)

## Future Enhancements

### Potential Additions:
1. **More Component Demos**:
   - Date Picker, File Upload
   - Modal, Drawer, Tabs (with triggers)
   - Tooltip, Popover
   - Pagination, Table, List
   - Toast, Breadcrumb, Menu, Navbar, Stepper

2. **Interactive Controls**:
   - Live prop editing sidebar
   - Size/variant toggle buttons
   - Theme switcher for demos

3. **Advanced Features**:
   - Copy entire example to clipboard
   - Open demo in isolated view
   - Export as standalone component
   - Stackblitz/CodeSandbox integration

4. **Accessibility**:
   - Screen reader announcements for demos
   - Keyboard navigation highlights
   - Focus trap demonstrations

## Technical Notes

### Component Sizing Strategy
Components use responsive max-widths to prevent them from being too large in the preview:
- Form components stay readable (max 400px)
- Content components have room (max 500-600px)
- Layout components show their flexibility (max 600px)

### Template Strategy
Uses Angular 20's new control flow:
```typescript
@switch (componentId()) {
  @case ('button') {
    @if (exampleTitle() === 'Basic Usage') {
      <ui-button>Click Me</ui-button>
    }
  }
}
```

### State Management
- Signals for reactive state
- Computed values where appropriate
- Minimal component state

## Related Documentation

- See `component-metadata.ts` for example definitions
- See `DESIGN_SYSTEM.md` for spacing tokens
- See individual component documentation for API details


