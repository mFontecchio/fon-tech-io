# UI Component Suite - Components Library

A comprehensive collection of 36+ themable, accessible Angular components built with Angular 20+ and signals.

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
npm install @ui-suite/components
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
- **Drawer** - Slide-out panel (4 positions)
- **Stack** - Flexbox layout helper
- **Grid** - Responsive grid system

### Data Display Components (8)

- **Badge** - Status indicators and counts
- **Avatar** - User avatars with fallbacks
- **Tooltip** - Contextual hover information
- **Chip** - Removable tags
- **Popover** - Rich contextual content
- **Pagination** - Page navigation
- **Table** - Data table with sorting and selection
- **List** - Ordered and unordered lists

### Feedback Components (5)

- **Alert** - Notification messages
- **Spinner** - Loading indicator
- **Progress** - Progress bar
- **Skeleton** - Loading placeholders
- **Toast** - Transient notifications

### Navigation Components (4)

- **Breadcrumb** - Navigation trail
- **Menu** - Dropdown and context menus
- **Navbar** - Application navigation bar
- **Stepper** - Multi-step process indicator

## Quick Start

### Import Components

Components are standalone and can be imported directly:

```typescript
import { Component, signal } from '@angular/core';
import { ButtonComponent, RadioComponent } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, RadioComponent],
  template: `
    <ui-button (clicked)="handleClick()">Click Me</ui-button>
    
    <ui-radio 
      name="plan" 
      value="pro" 
      label="Pro Plan"
      [(modelValue)]="selectedPlan"
    />
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

Import the theme CSS in your application:

```typescript
// main.ts or styles.css
import '@ui-suite/theming/styles.css';
```

## Component Documentation

Each component has detailed documentation:

- **API Reference** - Complete input/output documentation
- **Usage Examples** - Common use cases with code
- **Accessibility** - ARIA, keyboard navigation, screen reader support
- **Best Practices** - When and how to use each component

View component documentation:

- Online: [Component Documentation Site](https://your-docs-site.com)
- Local: `/libs/components/src/lib/[component-name]/README.md`
- Showcase: Run `nx serve showcase` to view live examples

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

- **Documentation**: See `/documentation/components/` for detailed guides
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join the community discussions

## Related Libraries

- `@ui-suite/theming` - Design system and theming
- `@ui-suite/theme-builder` - Interactive theme builder
- `@ui-suite/shared` - Shared utilities and services
