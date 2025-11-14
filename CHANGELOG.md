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
- Working showcase application with live demos for all 16 components
- Theme switching functionality verified across all components
- TypeScript 5.8.3 (Angular 20.3 compatibility)
- Updated dependencies (@types/node, @swc/core)
- Comprehensive architecture documentation
- Design system documentation
- Implementation status tracking
- Testing guide for developers

