# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Navigation Issues Fixed**:
  - Component detail page now updates when navigating between different components (using route.params subscription instead of snapshot)
  - Added overview pages for `/components` and `/getting-started` routes
  - Header navigation links now work correctly
  - Sidebar navigation properly updates component detail page on each click
- Slider component handles now visible (removed opacity: 0, added proper -webkit-appearance: none)
- Slider native track properly hidden with transparent background for both webkit and mozilla
- Range slider functionality properly manages both start and end values with reactive state
- Range slider handles can now move freely across full range with automatic constraint enforcement
- Range slider no longer restricts handle movement via min/max attributes (now software-enforced)
- Range slider uses pointer-events CSS to allow only thumb interaction, preventing track interference
- Range slider z-index management via CSS classes (start: 3, end: 4, active: 5)
- Range slider both handles independently clickable and draggable without interference
- Range slider constraints prevent handles from swapping or bypassing each other
- Range slider proper event cleanup on mouseup/touchend to reset active state
- Drawer component properly resets body overflow on close and component destroy
- Modal component includes cleanup in ngOnDestroy to prevent scroll lock issues
- Drawer openChange event properly wired in showcase
- Skeleton component now properly applies CSS classes to inner elements instead of host
- Skeleton component has minimum height and width of 1rem for visibility
- Skeleton component background changed to --semantic-border-default for better visibility

### Added

- **Phase 1 Complete**: Documentation site foundation with routing and navigation
  - Angular Router configuration with lazy-loaded routes
  - Header component with navigation and theme toggle
  - Sidebar component with categorized component links (36 components)
  - Home page with hero section and feature cards
  - Component detail page (shell for API docs)
  - Theme builder page (shell for theme builder UI)
  - Getting started pages (shells for guides)
  - Responsive layout structure with sidebar and main content area
  - Full routing structure: /, /components/:category/:name, /theme-builder, /getting-started/*
- Comprehensive documentation site plan with theme builder specifications
- Technical architecture for API documentation system
- Phased implementation roadmap (6 phases, 5-6 weeks)
- Component metadata structure definition
- Theme builder UI mockups and feature specifications
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
- Date Picker component with native HTML5 input, min/max constraints, and clear functionality
- File Upload component with drag-drop, image preview, file validation, and progress tracking
- Navbar component with responsive design, mobile menu, and sticky/fixed positioning
- Stepper component with linear/non-linear modes, horizontal/vertical orientation, and step states
- Working showcase application with live demos for all 36 components
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

