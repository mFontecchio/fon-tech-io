# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Nx workspace setup with Angular 20+ support
- TypeScript strict mode configuration
- ESLint with Angular-specific rules
- Prettier code formatting
- Jest testing framework with Angular Testing Library
- Cypress E2E testing with accessibility support (cypress-axe)
- Project structure for component libraries and applications
- Core configuration files (nx.json, tsconfig.base.json, .eslintrc.json)
- Package manager configured for pnpm
- Artifactory registry configuration for private packages
- Four library projects: @ui-suite/components, @ui-suite/theming, @ui-suite/theme-builder, @ui-suite/shared
- Two application projects: showcase (documentation site) and theme-builder-app (standalone theme builder)
- Complete Nx monorepo structure with proper module boundaries
- Three-tier design token system (primitive, semantic, component tokens)
- Default themes: light, dark, and high-contrast
- Theme engine with CSS custom properties generator
- Reactive theme service using Angular signals
- Theme persistence with localStorage
- SSR-compatible theme management
- System theme preference detection
- Responsive typography system with fluid scaling using clamp()
- Predefined type scales for display, headings, body, and UI text
- Typography utilities for calculating font sizes, line heights, and letter spacing
- Breakpoint-based responsive typography
- Typography service for managing responsive text across breakpoints
- Button component with filled, outlined, and text variants
- Button sizes (sm, md, lg) and states (disabled, loading)
- Full ARIA support and keyboard navigation for Button
- Input component with validation states, prefix/suffix slots
- Textarea component with auto-resize and character count
- Checkbox component with indeterminate state support
- Radio component with proper group behavior  
- Switch/Toggle component with ON/OFF labels
- Select component with native HTML select, option groups, and validation
- Badge component with variants, dots, and count display
- Alert component with dismissible support and 4 variants (info, success, warning, error)
- Spinner/Loader component with 5 sizes and loading labels
- Progress Bar component with determinate/indeterminate modes, striped patterns
- Modal/Dialog component using HTML dialog element with backdrop
- Tabs component with keyboard navigation, horizontal/vertical orientation
- Tooltip component with 4 positions, hover/focus triggers
- Avatar component with image/initials/icon modes, status indicators, 6 sizes
- Card component with elevated, outlined, and filled variants
- MultiSelect component with search, filtering, tag creation, and max selections
- Chip component with removable tags, avatars, and clickable variants
- Accordion component with single/multiple expand modes
- Skeleton component with shimmer effect for loading states (text, circular, rectangular, rounded)
- Breadcrumb component with overflow handling and custom separators
- Divider component with horizontal/vertical orientation and labels
- Slider component with single/dual handle, range selection, and custom steps
- Drawer component with 4 positions (left, right, top, bottom) and 5 sizes
- Popover component with click/hover triggers, positioning, and rich content
- Pagination component with ellipsis, page size selector, and first/last navigation
- Toast/Snackbar component with service-based notifications and auto-dismiss
- Table component with sorting, row selection, striped/bordered variants, and loading states
- List component with ordered/unordered, interactive, bordered/divided variants
- Menu component with dropdown, nested submenus, keyboard navigation, and dynamic positioning
- Stack layout component with vertical/horizontal direction, flexible spacing and alignment
- Grid layout component with responsive columns, auto-fit, and customizable gaps
- Working showcase application with live demos for all 32 components
- Theme switching functionality verified across all components
- TypeScript 5.8.3 (Angular 20.3 compatibility)
- Updated dependencies (@types/node, @swc/core)
- Comprehensive architecture documentation
- Design system documentation
- Implementation status tracking
- Testing guide for developers

### Fixed

- Tooltip positioning now uses fixed positioning to prevent container clipping
- Tooltip always visible on top with z-index 9999
- Input and Textarea components use correct attribute bindings for HTML validation

