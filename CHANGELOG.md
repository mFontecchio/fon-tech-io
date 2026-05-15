# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added `fui-fieldset` component — groups related form fields under a titled border frame with an optional collapsible toggle, native `<fieldset>`/`<legend>` semantics, controlled/uncontrolled collapsed state via `linkedSignal`, and `aria-expanded` / `aria-controls` wiring.
- Added `fui-splitter` component — divides a container into two resizable panels with a draggable handle, supporting horizontal and vertical orientations, configurable minimum panel sizes, keyboard navigation (Arrow keys ±1%, Shift+Arrow ±10%, Home/End), full ARIA separator semantics, and pointer-cancel cleanup.
- Added `fui-image-compare` component — a before/after image comparison slider with draggable divider, horizontal/vertical orientations, keyboard navigation (Arrow keys ±1%, Shift+Arrow ±10%, Home/End), full ARIA slider semantics, and `touch-action: none` for reliable mobile drag.

## [20.2.0] - 2026-05-10

### Added

- **Dock component (`fui-dock` + `fui-dock-item`)**: A taskbar-style navigation bar fixed to a viewport edge. Supports `top`, `right`, `bottom`, and `left` positions with automatic horizontal/vertical layout switching. Child items accept projected icon content, a text label, an optional badge bubble (numbers above 99 display as `"99+"`), and an active indicator rendered as a CSS `::after` dot. Full ARIA toolbar keyboard navigation with `ArrowLeft`/`ArrowRight` (horizontal), `ArrowUp`/`ArrowDown` (vertical), `Home`, and `End` support. Exported from `@mfontecchio/components` as `DockComponent`, `DockItemComponent`, and `DockPosition`. All 19 design tokens defined in the theming system under `--component-dock-*`. Icon-only mode supported by omitting the `label` input; frosted-glass floating appearance with spring-easing icon scale on hover.

### Fixed

- **Dock component — animation CSS variable names**: Corrected transition declarations in `dock-item.component.css` from the non-existent `--animation-duration-normal` and `--animation-easing-default` to the correct semantic tier names `--semantic-animation-duration-interactive` and `--semantic-animation-easing-default`. The spring-easing icon scale animation (`--primitive-animation-easing-spring`) already used the correct name and was unchanged.
- **Dock item — box-sizing corrected to `border-box`**: The `.fui-dock-item` button previously used the default `box-sizing: content-box`, causing padding to be added on top of the `--component-dock-item-size` value and making each button significantly larger than the token implied. Setting `box-sizing: border-box` ensures the item occupies exactly the dimensions specified by the size token, with padding contained within it.
- **Dock component — CSS variable fallbacks added**: All layout-critical CSS properties in `dock.component.css` and `dock-item.component.css` now carry hardcoded pixel/rem fallback values. Previously, an unresolved CSS custom property (due to ThemeService initialization timing or a stale build cache) would silently collapse the dock layout to zero gap and zero padding, making items appear crammed together.

## [20.1.0] - 2026-05-10

### Added

- **Chart component (`fui-chart`)**: Zero-dependency chart system supporting line, bar, area, pie, donut, and scatter chart types. Renders line, bar, and area charts via SVG for crisp scaling at any resolution; scatter plots via Canvas 2D with HiDPI support. All geometry is derived through Angular 20 `computed()` signals; theme tokens are resolved at runtime so charts respond to light, dark, and custom themes automatically. Includes `ChartTooltipComponent` (floating data-point overlay, CSP-compliant position via CSS custom properties) and `ChartLegendComponent` (dataset toggle with `aria-pressed` support). WCAG 1.4.1 compliant — each line series carries a distinct SVG `stroke-dasharray` pattern so color is never the sole visual differentiator. A visually hidden `<table>` is always rendered for screen reader data access. Exported from `@mfontecchio/components` as `ChartComponent`, `ChartLegendComponent`, `ChartTooltipComponent`, and full chart type definitions.

- **Accordion component — `bordered`, `highlightExpanded`, `dividers` inputs**: Three new boolean inputs allow mix-and-match composition of the accordion's visual style. `bordered` (default `true`) controls the outer container border and border-radius. `highlightExpanded` (default `true`) controls the expanded-header background tint and brand-coloured chevron. `dividers` (default `true`) controls the separator lines between items. All flags default to `true`, preserving full backward compatibility with existing usage. Setting all three to `false` renders a plain expandable list suitable for nested navigation groups.
- **Accordion showcase documentation updated**: API reference corrected to show the `<fui-accordion-item>` content-children pattern (removing the erroneous `[items]` array example). Three new inputs documented with defaults, descriptions, and usage guidance. Two new code examples added — flush/borderless and expandable navigation list. Best practices and theming token tables updated to reflect modifier-class architecture.

### Changed

- **Angular-aligned versioning**: Adopted Angular-aligned versioning for all four published packages (`@mfontecchio/components`, `@mfontecchio/theming`, `@mfontecchio/shared`, `@mfontecchio/theme-builder`). The MAJOR version now tracks the Angular major (MAJOR = Angular major, MINOR = features, PATCH = fixes), matching the convention used by Angular Material and CDK. All packages bumped from `1.0.0` to `20.0.0`. Inter-library peer dependency ranges updated from `>=0.1.0` to `>=20.0.0`. Root workspace version updated to `20.0.0`.
- **Compatibility documentation updated**: `documentation/COMPATIBILITY.md` and the showcase `/getting-started/compatibility` page updated to reflect the `20.x` version line, document the versioning scheme, and explain the MAJOR/MINOR/PATCH semantics. The showcase page now includes a visual breakdown of the versioning convention.

### Changed

- Updated root `README.md` with GitHub release, license, Angular, and pnpm badges; added live showcase link (`https://mfontecchio.github.io/fon-tech-io/`); corrected component count to 39; added missing components (Multi-Select, Code Block, Carousel, Context Menu) to their respective categories; renamed "Progress Bar" to "Progress" and updated Node.js prerequisite to 24+; added link to `documentation/COMPATIBILITY.md`.
- Updated `libs/components/README.md` installation command from `npm install` to `pnpm add` for consistency with all other library READMEs.

### Added

- **Angular version compatibility matrix**: Added `documentation/COMPATIBILITY.md` as the canonical reference for which package versions are compatible with which versions of Angular, TypeScript, and Node.js. Added a live compatibility page to the showcase at `/getting-started/compatibility` backed by a single data file (`apps/showcase/src/app/data/compatibility.data.ts`). Added the page to the sidebar navigation and the Getting Started overview card grid.

### Changed

- Migrated GitHub Pages deployment from a cross-repository push model to a native GitHub Actions Pages deployment. The showcase is now deployed directly from this repository using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`, eliminating the dependency on the `mFontecchio/fon-tech-io` public mirror repository and the `PUBLIC_REPO_DEPLOY_TOKEN` personal access token. The deploy workflow is split into a `build` job and a dedicated `deploy` job with `pages: write` and `id-token: write` permissions scoped to only the deploy job.

- Removed `.github/prompts/` from `.gitignore`. AI-authored planning documents in that directory are now tracked in source control.

### Added

- **Community health files**: Added `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `.github/CODEOWNERS`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/bug_report.md`, and `.github/ISSUE_TEMPLATE/feature_request.md` to establish contribution standards, security reporting procedures, and reviewer assignment for the public repository.

- **Dependabot configuration**: Added `.github/dependabot.yml` to enable weekly automated dependency update pull requests for npm packages (grouped by Angular, Nx, and testing ecosystems) and GitHub Actions, with major version bumps excluded from automated updates.

### Changed

- Renamed all published package scopes from `@ui-suite/*` to `@mfontecchio/*` to align with the npm organization. Affected packages: `@mfontecchio/theming`, `@mfontecchio/shared`, `@mfontecchio/components`, `@mfontecchio/theme-builder`. All internal imports, peer dependencies, tsconfig path aliases, and documentation updated accordingly.

### Added

- **Brand color theme generator**: Added a "Brand" button to the theme builder toolbar that opens a panel for generating a complete light and dark theme family from a single hex brand color. The generator automatically produces a full 11-shade palette, adjusts semantic hover and active states, and selects contrast-optimized text colors meeting WCAG AA minimum requirements. After generation the accessibility checker opens automatically to display contrast compliance.
- **Inline WCAG contrast indicators on color tokens**: Color token inputs in the Design Tokens editor now display compact light/dark mode contrast badges (AAA / AA / Fail) for all meaningful foreground/background pairs. Badges react in real time to both light and dark token edits and are suppressed when either color is not a valid hex value.

### Fixed

- **Dark mode button text not updating without hard refresh**: The theme builder's `colorCategories` signal did not include `--semantic-text-inverse` as a tracked token. This caused two cascading failures: `applyDarkThemeTokens` never stored a `--semantic-text-inverse-dark` value on the document root, and `buildCurrentThemeTokenBundle` therefore omitted the token from the dark variant bundle passed to `convertPresetToThemeFamily`. The converter then fell back to the default `var(--primitive-neutral-900)` reference, which resolves to a light color in dark presets (because `--semantic-text-primary` also overwrites `neutral-900`), producing white button text. Added `--semantic-text-inverse` to `colorCategories` and `getTokenValueFromTheme` so all three pipeline stages correctly propagate the per-mode value. Also added `--semantic-text-inverse` to the `.preview-container[data-preview-theme='dark']` scoped CSS override so the dark-mode preview pane inside the theme builder reflects the correct inverse text color immediately.

- **Theme preset WCAG AA contrast compliance**: Corrected 89 color values across all 17 built-in theme presets (Material, Bootstrap, Dark, Minimal, High Contrast, Ocean, Sunset, Frog, Axolotl, Smith, DuPre, Puckett, Xayavong, Greeff, Simpson, Garrett) to ensure every text/surface combination meets WCAG AA 4.5:1 contrast ratio. Changes include darkened tertiary text colors, adjusted feedback palette values (success, warning, error, info) in light modes, and lightened feedback-error values in select dark modes.
- **Filled button text contrast in dark mode**: Added explicit `--semantic-text-inverse` token to every preset's `darkTokens` block. All 16 presets now set `#000000` as the inverse text color so that filled buttons, which use `--semantic-brand-primary` (a light pastel in dark mode) as their background, render legible dark text. Contrast ratios range from 8.26:1 to 21:1, all well above the WCAG AA 4.5:1 requirement. Light mode presets explicitly set `#ffffff` to maintain consistency.
- **Preset converter text-inverse mapping**: Added a handler for `--semantic-text-inverse` in `preset-converter.ts` `applyPresetTokens`. Previously the token was present in preset definitions but silently ignored during conversion, causing `theme.semantic.text.inverse` to remain as `var(--primitive-neutral-900)` in converted theme families. Because the `--semantic-text-primary` handler also overwrites `primitive.colors.neutral[900]` with a light value in dark-mode presets, this cascaded into white button text. The handler now explicitly assigns the preset value to `theme.semantic.text.inverse`, which the CSS generator outputs as a concrete hex value rather than a CSS variable reference, resolving the issue in the showcase and any application that applies presets via `ThemeService.setCustomThemeFamily()`.
- **Migration repair for localStorage-persisted custom theme families**: Added `repairStoredThemeFamily` in `ThemeService` to patch families deserialized from `localStorage` that were stored before the preset-converter bug was resolved. On load, any dark-mode variant whose `text.inverse` is still the legacy `var(--primitive-neutral-900)` reference and whose `primitive.colors.neutral[900]` has been overridden to a light hex color (relative luminance > 0.18) is patched to `#000000`, eliminating the white-text-on-pastel-background defect without discarding user-saved theme data.

### Added
- **Fuji theme preset**: Added the Fuji built-in preset to the theme builder, a royal purple palette with an elegant serif typographic presence (Cormorant Garamond), refined border radii, and a deep twilight dark-mode surface derived from near-black purple.
- **Custom brand theme families**: Added Smith, DuPre, Puckett, Xayavong, Greeff, Simpson, and Garrett as built-in theme builder presets, each with paired light and dark variants derived from a single brand hue and a distinct visual treatment ranging from rounded to edgy.
- **Expanded direct Angular forms support**: `fui-input`, `fui-textarea`, `fui-checkbox`, `fui-switch`, `fui-select`, `fui-date-picker`, `fui-multi-select`, and `fui-radio` now implement `ControlValueAccessor` while preserving their existing explicit input/output bindings or model-based APIs for signal-based and manual state management. `fui-slider` now supports `ControlValueAccessor` in single-value mode while range mode continues to use explicit `valueEnd` / `valueEndChange` bindings.
- **Radio and slider contract normalization**: `fui-radio` now exposes `selectedValue` / `selectedValueChange` as the preferred explicit group-selection contract while preserving the legacy `modelValue` alias, and `fui-slider` range mode now exposes a tuple-based `rangeValue` / `rangeValueChange` contract while keeping `valueEnd` compatibility.
- **Modal controlled-state alignment**: Added `openChange` to `fui-modal` so its dismiss interactions follow the same controlled overlay pattern as `fui-drawer`, while preserving the existing `closed` event.
- **Overlay focus restoration**: `fui-modal` and `fui-drawer` now restore focus to the previously focused trigger element after closing or teardown, aligning runtime behavior with their accessibility guidance.
- **Menu keyboard focus management**: `fui-menu` now uses roving tabindex, moves focus to the first enabled item on open, keeps submenu focus synchronized, and restores focus to its trigger on close.
- **Table sortable header accessibility**: `fui-table` sortable columns now use keyboard-focusable header buttons, and the showcase docs/examples now match the actual supported sorting and selection interactions.
- **Tooltip and popover associations**: `fui-tooltip` now wires `aria-describedby` to its projected trigger while visible, and `fui-popover` now links its trigger and dialog with stable accessibility IDs and dialog semantics.
- **Expanded component documentation**: Enhanced all 39 documented components with comprehensive setup, passthrough, and theming metadata. Showcase now includes:
  - Installation & Import sections with exact import statements and minimal usage examples for each component
  - Passthroughs documentation listing named content projection slots and native attribute forwarding patterns
  - Design Tokens sections showing all applicable CSS custom properties with descriptions and customization examples
  - Complete three-tier token system reference (primitive, semantic, and component-specific tokens)
- **Angular forms integration guidance**: Added a dedicated Angular Forms section to component API pages describing the supported binding contract, whether `ControlValueAccessor` is built in, and when manual adapters are required for `ngModel` or `formControlName`
- **Runtime and SSR compatibility guidance**: Added a dedicated Runtime & SSR section to showcase API pages with per-component compatibility indicators and caveats for browser-dependent behavior
- **Runtime metadata backfill for all components**: Added `runtime` metadata blocks to every showcase component entry so the Runtime & SSR API section is consistently populated across layout, navigation, data-display, feedback, and form components

### Fixed
- **Showcase initial bundle budget**: Moved the global search modal behind a true dynamic import from the header shell so `fuse.js` and the component metadata registry no longer ship in the initial browser bundle. The showcase initial payload dropped below the 500 kB warning budget.
- **Documentation count alignment**: Updated canonical docs and agent guidance to reflect the current 39 documented showcase components and the broader 43 exported component-class surface that includes helper building blocks.
- **README accuracy for Angular 20 consumers**: Corrected standalone component selectors, removed an unsupported theming stylesheet import path, and aligned package guidance with the showcase as the canonical documentation source
- **Showcase example modernization**: Updated stale toast examples to use `inject()` instead of constructor injection so documentation matches current Angular 20 guidance
- **Context menu README reconciliation**: Updated `libs/components/src/lib/context-menu/README.md` to use `fui-context-menu` examples, removed outdated `::ng-deep` styling guidance, and aligned snippets with token-based customization practices
- **Removed unused Nx starter pages**: Deleted the unreferenced `nx-welcome.ts` files from both showcase applications to reduce dead code and avoid confusion during future maintenance

---

## [1.0.1] - 2026-05-05

### Fixed
- **Showcase mobile navigation links**: Removed a transparent full-screen overlay (`position: fixed; inset: 0; z-index: 99`) in the app shell that was covering the sidebar on mobile viewports and intercepting all pointer events, preventing nav link clicks from reaching their router targets. The `SidebarComponent`'s own backdrop already handles dismissal, making the duplicate overlay redundant.

---

## [1.0.0] - 2026-05-04

### Changed
- **Component selector prefix renamed**: All 43 component selectors, CSS class names, internal CSS custom properties, and template usages have been renamed from the `ui-` prefix to `fui-`. For example, `<ui-button>` is now `<fui-button>`, `.ui-button` is now `.fui-button`, and `--ui-menu-top` is now `--fui-menu-top`. The design token prefix `--ui-suite` and package names `@mfontecchio/*` are unchanged.

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
- **npm publish workflow**: Added `.github/workflows/publish-packages.yml` triggered by GitHub Release tags to build all libraries in dependency order, inject the release version into each package manifest, and publish `@mfontecchio/theming`, `@mfontecchio/shared`, `@mfontecchio/components`, and `@mfontecchio/theme-builder` to npmjs.org with OIDC provenance.
- **Library package manifests**: Added `package.json` to each publishable library (`theming`, `shared`, `components`, `theme-builder`) with package name, description, ESM entry points, peer dependencies, and `publishConfig` for public npm access.
- **GitHub Pages build configuration**: Added `github-pages` build configuration to `apps/showcase/project.json` with `baseHref: /ui-component-suite/` to correctly resolve static assets at the repository sub-path.

### Changed
- **Library build targets**: Added `build` targets to `libs/theming/project.json`, `libs/shared/project.json`, and `libs/theme-builder/project.json` using `ngc` in the same pattern as the `components` library.
- **Library tsconfig outDir**: Updated `outDir` in `tsconfig.lib.json` for `theming`, `shared`, and `theme-builder` from `../../dist/out-tsc` to per-library paths (`dist/libs/theming`, `dist/libs/shared`, `dist/libs/theme-builder`) so distribution artifacts land in predictable, isolated directories.

### Changed
- **Theme Family Model**: Moved theming engine, showcase, and theme builder to family-aware light/dark selection
  - Added first-class `ThemeFamily` support above leaf `Theme` objects in `@mfontecchio/theming`
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
- Four library projects: @mfontecchio/components, @mfontecchio/theming, @mfontecchio/theme-builder, @mfontecchio/shared
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

- **Animation token system** in `@mfontecchio/theming`: New `PrimitiveAnimation` interface with duration tokens (`fast: 150ms`, `normal: 250ms`, `slow: 350ms`) and easing tokens (`default: ease-in-out`, `spring: cubic-bezier(0.34, 1.56, 0.64, 1)`) in `libs/theming/src/lib/tokens/primitive-tokens.ts`
- Semantic animation tokens mapped from primitive animation tokens in `libs/theming/src/lib/tokens/semantic-tokens.ts`
- All three default themes (light, dark, high-contrast) updated with animation token values in `libs/theming/src/lib/themes/default-themes.ts`
- `CssGeneratorService` updated to flatten and emit animation CSS custom properties (e.g., `--animation-duration-normal`, `--animation-easing-default`)
- Context menu component: ArrowUp/ArrowDown item traversal and ArrowRight/ArrowLeft submenu open/close per WAI-ARIA Menu pattern
- Context menu component: Proper `ngOnDestroy` lifecycle cleanup for Renderer2 listeners
- Stepper component: ArrowLeft/Right (horizontal orientation), ArrowUp/Down (vertical orientation), Home/End keyboard navigation
- Theme builder library (`@mfontecchio/theme-builder`): Real 2,900-line theme builder implementation moved from showcase app into reusable library; exports `ThemeBuilderComponent`, `ThemePreset`, `THEME_PRESETS`, `convertPresetToTheme`, and theme utilities

### Changed

- `tsconfig.base.json`: `moduleResolution` changed from `"node"` to `"bundler"` (Angular 20 best practice)
- `tsconfig.base.json`: Removed `emitDecoratorMetadata: true` (unnecessary with signals-based APIs)
- Tabs component: Replaced `setTimeout(..., 0)` and `setTimeout(..., 10)` scheduling with `requestAnimationFrame()` for correct browser paint timing
- Accordion component: Replaced `max-height: 1000px` magic number with `grid-template-rows: 0fr / 1fr` CSS transition (eliminates magic numbers, animates to natural content height)
- All 38 component CSS files: Replaced hardcoded `0.2s ease-in-out` and `0.3s cubic-bezier(...)` values with animation token CSS variables (`var(--animation-duration-normal)`, `var(--animation-easing-default)`, etc.)
- Removed unnecessary `CommonModule` imports from components that exclusively use Angular 20 built-in control flow (`@if`, `@for`, `@switch`)
- Table component CSS: Added `scrollbar-width: thin` and `scrollbar-color` Firefox scrollbar fallback alongside WebKit `::-webkit-scrollbar` rules
- Theme builder utilities (`libs/theme-builder/src/lib/theme-utils.ts`): Eliminated duplicate `getLuminance`, `hexToRgb`, `rgbToHex`, `lightenColor`, `darkenColor`, `getContrastRatio` implementations; now re-exports from `@mfontecchio/shared`
- `ThemeBuilderComponent`: Added `ChangeDetectionStrategy.OnPush`, removed unused `CommonModule` and `FormsModule` imports
- Showcase app route for theme-builder updated to import from `@mfontecchio/theme-builder` library instead of local page file

### Fixed

- Drawer component: Converted from `<div role="dialog">` to native `<dialog>` element, gaining built-in focus trap, native backdrop, `showModal()`/`close()` API, and improved screen reader support
- Drawer component: Verified `document.body` access is guarded by `isPlatformBrowser()` for SSR compatibility

### Removed

- `libs/shared/src/lib/shared/` stub component (unused dead code)
- `libs/components/src/lib/components/components.css` empty file
- `fuse.js`, `prismjs`, and `@types/prismjs` moved from production `dependencies` to `devDependencies` (only used by showcase and development tooling)

