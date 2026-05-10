# UI Component Suite - Components Library

A comprehensive collection of 39 themable, accessible Angular components built with Angular 20+ and signals.

## Overview

This library provides production-ready UI components following modern Angular best practices:

- **Standalone components** - No NgModules required
- **Signal-based state** - Reactive and efficient
- **OnPush change detection** - Optimized performance
- **Full accessibility** - WCAG compliant with ARIA support
- **Themable** - Complete design system integration
- **Type-safe** - Full TypeScript support

## Installation

```bash
pnpm add @mfontecchio/components
```

## Component Categories

### Form Components (11)

- **Button** - Multi-variant button with loading states
- **Input** - Text input with validation and slots
- **Textarea** - Auto-resizing textarea with character count
- **Checkbox** - Checkbox with indeterminate state
- **Radio** - Radio button with model-based binding
- **Switch** - Toggle switch for binary states
- **Select** - Native select with option groups
- **Multi-Select** - Multi-selection with tags and search
- **Slider** - Single and dual-handle range slider
- **Date Picker** - Date input with constraints
- **File Upload** - Drag-drop file upload with preview

### Layout Components (8)

- **Card** - Container with multiple variants
- **Modal** - Dialog with backdrop
- **Tabs** - Tabbed interface with keyboard navigation
- **Accordion** - Expandable panels
- **Divider** - Visual separator
- **Drawer** - Slide-out panel (4 positions) using native `<dialog>` element for built-in focus trap and screen reader support
- **Stack** - Flexbox layout helper
- **Grid** - Responsive grid system

### Data Display Components (10)

- **Badge** - Status indicators and counts
- **Avatar** - User avatars with fallbacks
- **Tooltip** - Contextual hover information
- **Chip** - Removable tags
- **Popover** - Rich contextual content
- **Pagination** - Page navigation
- **Table** - Data table with sorting and selection
- **List** - Ordered and unordered lists
- **Code Block** - Syntax-highlighted code display
- **Carousel** - Composition-based carousel with slide and fade transitions

### Feedback Components (5)

- **Alert** - Notification messages
- **Spinner** - Loading indicator
- **Progress** - Progress bar
- **Skeleton** - Loading placeholders
- **Toast** - Transient notifications

### Navigation Components (5)

- **Breadcrumb** - Navigation trail
- **Menu** - Dropdown menus
- **Context Menu** - Right-click context menu with nested submenus
- **Navbar** - Application navigation bar
- **Stepper** - Multi-step process indicator

## Quick Start

### Import Components

Components are standalone and can be imported directly:

```typescript
import { Component, signal } from '@angular/core';
import { ButtonComponent, RadioComponent } from '@mfontecchio/components';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, RadioComponent],
  template: `
    <fui-button (clicked)="handleClick()">Click Me</fui-button>

    <fui-radio name="plan" value="pro" label="Pro Plan" [(selectedValue)]="selectedPlan" />
  `,
})
export class ExampleComponent {
  selectedPlan = signal<string>('pro');

  handleClick() {
    console.log('Button clicked!');
  }
}
```

### Setup Theming

Components consume CSS custom properties from `@mfontecchio/theming`. Use the showcase theming guide as the source of truth for applying a theme family and generated tokens in Angular applications.

```bash
nx serve showcase
```

Then open `/getting-started/theming` in the showcase for the supported Angular 20 setup path.

## Angular Forms Integration

Form-oriented components expose explicit Angular bindings such as `[value]` with `(valueChange)`, `[checked]` with `(checkedChange)`, `[(selectedValue)]` for radio groups, and `[(rangeValue)]` for composite slider ranges.

- `fui-input`, `fui-textarea`, `fui-checkbox`, `fui-switch`, `fui-select`, `fui-date-picker`, and `fui-multi-select` now implement Angular `ControlValueAccessor` and also preserve their explicit input/output bindings.
- `fui-slider` implements `ControlValueAccessor` for single-value mode and now exposes `[(rangeValue)]` as the preferred explicit contract for range mode while preserving `valueEnd` / `valueEndChange` for compatibility.
- `fui-radio` supports Angular `ControlValueAccessor` and now exposes `[(selectedValue)]` as the preferred explicit group contract while keeping `[(modelValue)]` as a backward-compatible alias.
- Refer to the showcase compatibility tables for the current `ControlValueAccessor`, template-driven, and reactive-forms support level of each control.

Controls that do not yet implement `ControlValueAccessor` still require a thin adapter directive or wrapper component when used with `formControlName` or `ngModel`.

## Keyboard Navigation

All interactive components support full keyboard navigation per WAI-ARIA patterns:

| Component                 | Keys                   | Behavior                                                                          |
| ------------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| **Tabs**                  | Arrow keys             | Navigate between tabs                                                             |
| **Accordion**             | Enter / Space          | Toggle panel                                                                      |
| **Drawer**                | Escape                 | Close; focus trapped inside while open (native `<dialog>`)                        |
| **Modal**                 | Escape                 | Close; focus trapped inside                                                       |
| **Context Menu**          | ArrowUp / ArrowDown    | Navigate items; ArrowRight opens submenu; ArrowLeft closes submenu; Escape closes |
| **Stepper (horizontal)**  | ArrowLeft / ArrowRight | Navigate steps; Home = first; End = last                                          |
| **Stepper (vertical)**    | ArrowUp / ArrowDown    | Navigate steps; Home = first; End = last                                          |
| **Select / Multi-Select** | ArrowUp / ArrowDown    | Navigate options; Enter to select                                                 |
| **Date Picker**           | Arrow keys             | Navigate calendar; Enter to select                                                |
| **Slider**                | ArrowLeft / ArrowRight | Adjust value; Home / End = min / max                                              |

## Component Documentation

Comprehensive documentation for all 39 documented components is available in the **Showcase Application** including:

- **Setup & Installation** - Import statements and minimal usage examples for each component
- **API Reference** - Complete inputs, outputs, and method documentation
- **Content Projection & Passthroughs** - Slot names and native attribute forwarding patterns
- **Design Tokens & Theming** - Complete token reference with customization examples
- **Accessibility** - ARIA attributes, keyboard navigation, screen reader support
- **Best Practices** - When and how to use each component effectively

### Three-Tier Design Token System

All components are styled exclusively through CSS custom properties organized in three tiers:

1. **Primitive Tokens** (`--primitive-*`) - Raw values: colors, spacing, typography, shadows, animations
2. **Semantic Tokens** (`--semantic-*`) - Purpose-driven: brand colors, surface backgrounds, text colors, states
3. **Component Tokens** (`--component-*`) - Component-specific: padding, border-radius, shadows

Override tokens at any ancestor scope to customize components without modifying source code.

### View Documentation

Run the showcase application to browse all component documentation with live examples:

```bash
nx serve showcase
# Opens http://localhost:4200/components
```

Browse component pages to view:

- Full API with inputs, outputs, and methods
- Passthroughs for content projection
- Design tokens and theming examples
- Accessibility details and best practices

## Development

### Running Unit Tests

```bash
nx test components
```

### Running E2E Tests

```bash
nx e2e showcase-e2e
```

### Building the Library

```bash
nx build components
```

## Architecture

### Design Principles

1. **Simplicity** - Components are easy to use and understand
2. **Flexibility** - Extensive customization through inputs and theming
3. **Accessibility** - WCAG 2.1 Level AA compliance
4. **Performance** - OnPush detection and signal-based reactivity
5. **Type Safety** - Full TypeScript support with strict mode

### Technologies

- **Angular 20+** - Latest framework features
- **TypeScript 5.8+** - Type-safe development
- **CSS Custom Properties** - Dynamic theming
- **Signals** - Reactive state management
- **Nx** - Monorepo tooling

## Contributing

Contributions are welcome! Please see the main repository README for guidelines.

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: Run `nx serve showcase` and browse the component pages and getting-started guides
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join the community discussions

## Related Libraries

- `@mfontecchio/theming` - Design system and theming
- `@mfontecchio/theme-builder` - Interactive theme builder
- `@mfontecchio/shared` - Shared utilities and services
