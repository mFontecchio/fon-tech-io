# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Strict CSP compliance for `CssGeneratorService`**: Replaced 100+ `element.style.setProperty()` CSSOM calls with a single `<style id="ui-suite-theme">` element injected into `document.head`. The element is reused on subsequent theme changes to avoid DOM churn. Supports Angular's `CSP_NONCE` token — when provided, the nonce is set on the style element so it passes a `style-src 'nonce-...'` policy. Uses `inject(DOCUMENT)` for SSR-compatible DOM access.
- **Strict CSP compliance for `TypographyService`**: Replaced per-scale `root.style.setProperty()` CSSOM calls in `applyTypographyCss()` with a single `<style id="ui-suite-typography">` element. Delegates to the existing `generateCss()` helper and applies `CSP_NONCE` on creation. Uses `inject(DOCUMENT)` for SSR-compatible DOM access.
- **Skeleton last-line width**: Removed the `[style.width]` template binding that set the final skeleton line to 80% width. The effect is now achieved with a pure CSS rule `.ui-skeleton-lines .ui-skeleton:last-child { width: 80%; }`, eliminating the only non-custom-property inline style in the component library.
- **Showcase responsive navigation**: Moved mobile navigation state into the showcase shell, added an accessible header menu toggle, converted the sidebar into an animated off-canvas drawer for smaller screens, and preserved navigation actions with token-based motion and keyboard-dismiss behavior.
- **Canonical token migration**: Migrated the showcase, component library, and theme builder off legacy theme variable names and back onto the rebuilt token model, then removed the temporary compatibility aliases from the theming generator.
- **Showcase home hero title**: Replaced a removed primitive color token in the landing page gradient so the hero heading renders correctly in light and dark themes.
- **Theme preset accessibility compliance**: Darkened the light-mode brand and secondary text tokens in the Material, Ocean, Sunset, Frog, and Axolotl presets so the built-in WCAG audit passes against their surface backgrounds, and aligned the theme builder checker with the inverse text token used by filled buttons.
- **Code block readability**: Switched the code block surface to the card background, increased code text sizing, and darkened the light-mode syntax variable color so Prism-highlighted snippets remain legible across themes.
- **Showcase mode selector contrast**: Kept active mode button text on the inverse token during hover so the Light and Dark buttons remain readable against the brand background.
- **Showcase mobile sidebar motion**: Refined the small-screen navigation drawer so the sidebar panel, its content, and the backdrop animate together with a clear slide-in and slide-out transition.

### Added
- **GitHub Pages deployment workflow**: Added `.github/workflows/deploy-showcase.yml` to build the showcase with a repo-scoped base href (`/ui-component-suite/`) and deploy to GitHub Pages on every push to `main`, using OIDC-based Pages token and a `404.html` redirect for SPA deep-link routing.
- **CI workflow**: Added `.github/workflows/build-and-test.yml` to lint, build all libraries and the showcase application, and run tests on every push and pull request targeting `main`.
- **npm publish workflow**: Added `.github/workflows/publish-packages.yml` triggered by GitHub Release tags to build all libraries in dependency order, inject the release version into each package manifest, and publish `@ui-suite/theming`, `@ui-suite/shared`, `@ui-suite/components`, and `@ui-suite/theme-builder` to npmjs.org with OIDC provenance.
- **Library package manifests**: Added `package.json` to each publishable library (`theming`, `shared`, `components`, `theme-builder`) with package name, description, ESM entry points, peer dependencies, and `publishConfig` for public npm access.
- **GitHub Pages build configuration**: Added `github-pages` build configuration to `apps/showcase/project.json` with `baseHref: /ui-component-suite/` to correctly resolve static assets at the repository sub-path.

### Changed
- **Library build targets**: Added `build` targets to `libs/theming/project.json`, `libs/shared/project.json`, and `libs/theme-builder/project.json` using `ngc` in the same pattern as the `components` library.
- **Library tsconfig outDir**: Updated `outDir` in `tsconfig.lib.json` for `theming`, `shared`, and `theme-builder` from `../../dist/out-tsc` to per-library paths (`dist/libs/theming`, `dist/libs/shared`, `dist/libs/theme-builder`) so distribution artifacts land in predictable, isolated directories.

### Changed
- **Theme Family Model**: Moved theming engine, showcase, and theme builder to family-aware light/dark selection
  - Added first-class `ThemeFamily` support above leaf `Theme` objects in `@ui-suite/theming`
  - ThemeService now persists selected family and mode separately and switches light/dark within active family
  - Showcase theme switcher now selects families independently from mode, with high-contrast preserved as a special mode
  - Theme builder presets, saved themes, and import/export now use explicit light and dark variants instead of flat token maps
  - Showcase now preserves the active family when users switch into high-contrast and return after a reload
  - Getting Started content is now split into dedicated Installation, Usage, and Theming guides instead of a shared placeholder page
  - Home page component counts now derive from the showcase metadata registry so feature copy stays aligned with the documented surface

### Fixed
- **Theme Builder Header Switchback**: Prevented the builder sync effect from reactivating the edited family when users switch away from presets such as Axolotl through the showcase header picker

### Added
- **Carousel Component**: Added a composition-based carousel for projected slide content
  - Supports slide and fade transitions with keyboard navigation, swipe gestures, indicators, thumbnails, and optional autoplay
  - Uses native button controls, live status announcements, pause/resume controls, and reduced-motion handling for WCAG-aligned interaction
  - Added showcase documentation, live demos, and component token definitions for carousel surfaces
  - Added focused Cypress accessibility coverage for the carousel documentation page and an Nx build target for the components library

- **Theme Family Import/Export Schema**: Added engine-native `ThemeFamily` JSON and TypeScript export support
  - Builder exports now round-trip paired light and dark variants with shared family metadata
  - Legacy flat saved themes and imports migrate deterministically by seeding missing dark tokens from light variants and flagging incomplete bundles

### Added
- **Whimsical Theme Presets**: Added playful themed color schemes to theme builder
  - Frog theme with vibrant lily pad greens and wetland tones (#22c55e primary, fresh green palette)
  - Axolotl theme with cute pink coral tones and aquatic vibes (#f472b6 primary, playful pink palette)
  - Both themes feature rounded borders and playful typography
  - Available in theme builder preset selector alongside Material, Bootstrap, Dark, Minimal, Ocean, and Sunset
- **Context Menu Component**: New right-click context menu component
  - Right-click activation with automatic positioning at cursor
  - Nested submenus with smooth animations
  - Icons and keyboard shortcuts display
  - Dividers for menu item grouping
  - Automatic viewport boundary detection and adjustment
  - Full keyboard navigation (Arrow keys, Enter, Escape)
  - Comprehensive accessibility support (ARIA attributes, screen reader friendly)
  - Material Design animations with reduced motion support
  - OnPush change detection for optimal performance
- **Theme Switcher Animations**: Enhanced theme selection dropdown with micro-interactions
  - Sun icon: Core pulse animation (scale 1→1.1 over 2s), rays rotate 360° over 8s
  - Moon icon: Floating animation (vertical movement 3px over 3s)
  - Contrast icon: Circle pulse with opacity changes, split line shift
  - Toggle button: Scale feedback on hover (1.05) and click (0.95)
  - Dropdown: Slide-in with bounce effect (scale 0.95→1.02→1)
  - Theme options: Staggered slide-in with delays (0.05s, 0.1s, 0.15s)
  - Selected icon: Rotation (15°) and scale (1.1) on hover, bounce when selected
  - Check mark: Scale-in with rotation animation
  - All animations respect prefers-reduced-motion accessibility preference
- **Theme Builder Enhancement**: Added native HTML5 color picker alongside text input for color palette generator
  - Visual color selection with synchronized hex value input
  - Improved user experience for theme customization
- **Smooth Animations**: Enhanced interactive components with Material Design easing
  - Accordion: Smooth expand/collapse with max-height transitions, icon rotation, and content slide-down
  - Menu: Scale and translateY animations for menu open/close with visibility control
  - Menu: Staggered fade-in for menu items (first 10 items with incremental delays)
  - Submenu: Slide-in animations with visibility-based transitions
  - All animations use cubic-bezier(0.4, 0, 0.2, 1) timing function
  - Full support for prefers-reduced-motion accessibility preference

### Fixed
- **Showcase Alignment Review**: Brought showcase content, metadata, and browser coverage back in line with the current shared libraries
  - Updated Input, Select, Radio, and Date Picker metadata to match current component inputs, methods, and runtime behavior
  - Fixed the Select showcase demo and API example to use the current `errorMessage` input instead of the removed `error` input
  - Repaired showcase Cypress project discovery so support files and spec files resolve correctly from the workspace root
  - Added Cypress coverage for theme persistence through high-contrast reloads and for the dedicated getting-started guide pages
- **Component Visual Regressions**: Corrected dark-mode and interaction defects across multiple UI components
  - Tooltip now relies on theme tokens for dark-mode background and text colors without OS-level override flashes
  - Accordion panels now fully collapse without leaving a residual padding gap
  - Input prefix and suffix slots now use scoped wrapper elements instead of `::ng-deep`, preserving icon color in light and dark themes
  - Empty input prefix and suffix wrappers now collapse completely when no projected content is present
  - Toast notifications now play a dismiss animation before removal and respect reduced-motion preferences
  - Spinner animation now avoids compositor jitter during continuous rotation
- **Input, Toast, and Date Picker Regressions**: Restored expected behavior for form feedback and themed controls
  - Input now renders `prefixIcon` and `suffixIcon` inputs, preserves projected prefix/suffix content, and surfaces built-in native validation messages after interaction
  - Input affixes now support richer projected prefix/suffix content and offer an opt-in built-in password reveal control
  - Showcase input demos now use the correct `errorMessage` API and render icon examples consistently
  - Toast timeout dismissal now follows the same animated exit path as manual close actions
  - Date picker now uses a themed custom calendar trigger so icon contrast stays correct in dark mode
- **Accordion Animation**: Removed hidden attribute that prevented CSS transitions from working, replaced with aria-hidden for accessibility while maintaining smooth animations
- **Menu Positioning**: Added scroll and resize listeners to keep menu attached to trigger button during page scroll, preventing menu from detaching from its initiator

### Changed
- **Theme Builder Presets UI**: Condensed theme preset display from large card grid to compact dropdown selector
  - Replaced full-width card grid (8 cards) with single dropdown menu for all presets
  - Added quick-access buttons showing first 6 presets with gradient color swatches
  - Reduced vertical space usage by approximately 60 percent
  - Maintained full accessibility with ARIA labels and keyboard navigation
  - Dropdown includes preset name and description for easy identification
- **Radio Component API Documentation**: Updated metadata with complete API surface
  - Added missing inputs: `helperText`, `errorMessage`, `required`, `ariaLabel`, `id`
  - Added public method: `focus()`
  - Enhanced descriptions for better clarity
  - Marked required inputs properly (`name`, `value`)

### Added
- **API Documentation System - 100% COMPLETE!**: Full API documentation for all 36 components
  - Component metadata type definitions with full TypeScript support
  - PropTable component for displaying inputs/outputs in formatted tables
  - CodeBlock component with syntax highlighting and copy-to-clipboard functionality
  - Metadata registry with helper functions for component lookup
  - **ALL 36 components fully documented** with:
    - Complete input/output API reference
    - Code examples with TypeScript and HTML templates
    - Comprehensive accessibility documentation (ARIA, keyboard nav, screen reader notes)
    - Best practices and related components
  - **Form Components** (11): Button, Input, Textarea, Checkbox, Radio, Switch, Select, Multi-Select, Slider, Date Picker, File Upload
  - **Layout Components** (8): Card, Modal, Tabs, Accordion, Divider, Drawer, Stack, Grid
  - **Data Display Components** (8): Badge, Avatar, Tooltip, Chip, Popover, Pagination, Table, List
  - **Feedback Components** (5): Alert, Spinner, Progress, Skeleton, Toast
  - **Navigation Components** (4): Breadcrumb, Menu, Navbar, Stepper
- **Documentation Tabs**: Four-tab layout (Overview, API, Examples, Accessibility) for component details

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

## [0.2.0] - 2026-04-30

### Added

- **Animation token system** in `@ui-suite/theming`: New `PrimitiveAnimation` interface with duration tokens (`fast: 150ms`, `normal: 250ms`, `slow: 350ms`) and easing tokens (`default: ease-in-out`, `spring: cubic-bezier(0.34, 1.56, 0.64, 1)`) in `libs/theming/src/lib/tokens/primitive-tokens.ts`
- Semantic animation tokens mapped from primitive animation tokens in `libs/theming/src/lib/tokens/semantic-tokens.ts`
- All three default themes (light, dark, high-contrast) updated with animation token values in `libs/theming/src/lib/themes/default-themes.ts`
- `CssGeneratorService` updated to flatten and emit animation CSS custom properties (e.g., `--animation-duration-normal`, `--animation-easing-default`)
- Context menu component: ArrowUp/ArrowDown item traversal and ArrowRight/ArrowLeft submenu open/close per WAI-ARIA Menu pattern
- Context menu component: Proper `ngOnDestroy` lifecycle cleanup for Renderer2 listeners
- Stepper component: ArrowLeft/Right (horizontal orientation), ArrowUp/Down (vertical orientation), Home/End keyboard navigation
- Theme builder library (`@ui-suite/theme-builder`): Real 2,900-line theme builder implementation moved from showcase app into reusable library; exports `ThemeBuilderComponent`, `ThemePreset`, `THEME_PRESETS`, `convertPresetToTheme`, and theme utilities

### Changed

- `tsconfig.base.json`: `moduleResolution` changed from `"node"` to `"bundler"` (Angular 20 best practice)
- `tsconfig.base.json`: Removed `emitDecoratorMetadata: true` (unnecessary with signals-based APIs)
- Tabs component: Replaced `setTimeout(..., 0)` and `setTimeout(..., 10)` scheduling with `requestAnimationFrame()` for correct browser paint timing
- Accordion component: Replaced `max-height: 1000px` magic number with `grid-template-rows: 0fr / 1fr` CSS transition (eliminates magic numbers, animates to natural content height)
- All 38 component CSS files: Replaced hardcoded `0.2s ease-in-out` and `0.3s cubic-bezier(...)` values with animation token CSS variables (`var(--animation-duration-normal)`, `var(--animation-easing-default)`, etc.)
- Removed unnecessary `CommonModule` imports from components that exclusively use Angular 20 built-in control flow (`@if`, `@for`, `@switch`)
- Table component CSS: Added `scrollbar-width: thin` and `scrollbar-color` Firefox scrollbar fallback alongside WebKit `::-webkit-scrollbar` rules
- Theme builder utilities (`libs/theme-builder/src/lib/theme-utils.ts`): Eliminated duplicate `getLuminance`, `hexToRgb`, `rgbToHex`, `lightenColor`, `darkenColor`, `getContrastRatio` implementations; now re-exports from `@ui-suite/shared`
- `ThemeBuilderComponent`: Added `ChangeDetectionStrategy.OnPush`, removed unused `CommonModule` and `FormsModule` imports
- Showcase app route for theme-builder updated to import from `@ui-suite/theme-builder` library instead of local page file

### Fixed

- Drawer component: Converted from `<div role="dialog">` to native `<dialog>` element, gaining built-in focus trap, native backdrop, `showModal()`/`close()` API, and improved screen reader support
- Drawer component: Verified `document.body` access is guarded by `isPlatformBrowser()` for SSR compatibility

### Removed

- `libs/shared/src/lib/shared/` stub component (unused dead code)
- `libs/components/src/lib/components/components.css` empty file
- `fuse.js`, `prismjs`, and `@types/prismjs` moved from production `dependencies` to `devDependencies` (only used by showcase and development tooling)

