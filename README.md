# UI Component Suite

Enterprise-grade Angular 20 component library with full theming support, accessibility compliance, and HTML5-first design principles.

## Overview

This monorepo contains a comprehensive suite of Angular components designed for modern web applications. Built with Angular 20+ best practices, the library emphasizes:

- **HTML5-First Architecture**: Components leverage native HTML5 elements to minimize breaking changes across Angular versions
- **Full Theming Support**: Complete design system with customizable tokens at primitive, semantic, and component levels
- **Accessibility**: WCAG 2.1 AA compliance minimum with comprehensive ARIA support
- **TypeScript Strict Mode**: Type-safe APIs for enhanced developer experience
- **Modern Angular**: Standalone components, signals, and latest Angular features

## Project Structure

This is an Nx monorepo with the following structure:

```
ui-component-suite/
├── libs/
│   ├── components/          # Core component library (@mfontecchio/components)
│   ├── theming/            # Design system & theme engine (@mfontecchio/theming)
│   ├── theme-builder/      # Theme builder UI components (@mfontecchio/theme-builder)
│   └── shared/             # Shared utilities & types (@mfontecchio/shared)
├── apps/
│   ├── showcase/           # Documentation & demo site
│   └── theme-builder-app/  # Standalone theme builder application
└── documentation/          # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Build all libraries
pnpm build

# Start the showcase application
pnpm start
```

### Development

```bash
# Run tests
pnpm test

# Run linting
pnpm lint

# Format code
pnpm format:write

# Run E2E tests
pnpm e2e
```

## Features

### Components (30+)

#### Form Components
- Button, Input, Textarea, Select
- Checkbox, Radio, Switch
- Slider, Date Picker, File Upload

#### Layout Components
- Card, Modal, Drawer
- Accordion, Tabs, Divider
- Grid, Stack

#### Data Display
- Table, List, Badge, Chip
- Avatar, Tooltip, Popover
- Pagination

#### Feedback
- Alert, Toast, Progress Bar
- Spinner, Skeleton

#### Navigation
- Breadcrumb, Menu
- Navbar, Stepper

### Theming System

Three-tier design token architecture:

1. **Primitive Tokens**: Base colors, spacing, typography scales
2. **Semantic Tokens**: Purpose-driven design decisions
3. **Component Tokens**: Component-specific customizations

### Theme Builder

Visual theme creation tool with:
- Real-time component preview
- Color palette generator
- Typography editor
- Accessibility contrast checker
- Import/export functionality

## Documentation

Comprehensive documentation is available in the `/documentation` folder:

- [Architecture](./documentation/ARCHITECTURE.md)
- [Design System](./documentation/DESIGN_SYSTEM.md)
- [Contributing](./documentation/CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

## Technology Stack

- **Framework**: Angular 20+
- **Build Tool**: Nx 22+
- **Package Manager**: pnpm
- **Testing**: Jest, Cypress, Angular Testing Library
- **Linting**: ESLint with Angular-specific rules
- **Formatting**: Prettier

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./documentation/CONTRIBUTING.md) for details.

