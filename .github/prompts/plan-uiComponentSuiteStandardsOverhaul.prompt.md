# Plan: UI Component Suite Standards Overhaul

The `libs/` directory contains a mature Angular 20 component library (~85% best-practice aligned). This plan addresses the remaining gaps across accessibility, semantic HTML, theming, animations, and code hygiene.

---

## Phase 1: Cleanup & Foundation (shared + theming) — *No downstream dependencies*

### 1.1 Remove Dead Code
- Delete `libs/shared/src/lib/shared/` (unused stub component)
- Delete `libs/components/src/lib/components/components.css` (empty file)

### 1.2 Move Production Dependencies to Correct Scope
- `fuse.js` (used only in showcase search) → move to showcase or devDependencies
- `prismjs` + `@types/prismjs` (used only by code-block) → evaluate as peer/optional dependency
- Goal: zero production dependencies in the shared library

### 1.3 Add Animation Token System to Theming
- Add `PrimitiveAnimation` interface to `libs/theming/src/lib/tokens/primitive-tokens.ts`: duration tokens (`fast: 150ms`, `normal: 250ms`, `slow: 350ms`) + easing tokens (`ease-default`, `ease-spring` as cubic-bezier)
- Add semantic animation tokens to `libs/theming/src/lib/tokens/semantic-tokens.ts`
- Update `CssGeneratorService` to flatten and generate animation CSS vars
- Update all 3 default themes in `libs/theming/src/lib/themes/default-themes.ts`

### 1.4 tsconfig.base.json Modernization
- Change `moduleResolution` from `"node"` to `"bundler"` (Angular 20 best practice)
- Remove `emitDecoratorMetadata: true` (unnecessary with signals-based APIs)

---

## Phase 2: Component Accessibility & Semantic HTML — *Depends on Phase 1.3 for animation tokens*

### 2.1 Drawer → Native `<dialog>`
- Convert `libs/components/src/lib/drawer/drawer.component.html` from `<div role="dialog">` to native `<dialog>` element
- Gains: built-in focus trap, native backdrop, `showModal()`/`close()` API, better screen reader support
- Reference `libs/components/src/lib/modal/modal.component.ts` as template

### 2.2 Context Menu: ngOnDestroy + Arrow Keys
- Add lifecycle cleanup for Renderer2 listeners in `libs/components/src/lib/context-menu/context-menu.component.ts`
- Add ArrowUp/ArrowDown for item traversal, ArrowRight/Left for submenu open/close (WAI-ARIA Menu pattern)

### 2.3 Stepper: Arrow Key Navigation
- Add ArrowLeft/Right (horizontal) and ArrowUp/Down (vertical) + Home/End to `libs/components/src/lib/stepper/stepper.component.ts`

### 2.4 Tabs: Fix Scheduling
- Replace `setTimeout(..., 0)` and `setTimeout(..., 10)` with `requestAnimationFrame()` in `libs/components/src/lib/tabs/tabs.component.ts`

### 2.5 Accordion Animation Improvement
- Replace `max-height: 1000px` magic number in `libs/components/src/lib/accordion/accordion.component.css` with `grid-template-rows: 0fr → 1fr` transition (modern CSS pattern, no magic numbers)

### 2.6 Replace Hardcoded Animations Across All 34 Components
- Replace hardcoded `0.2s ease-in-out` / `0.3s cubic-bezier(...)` with animation token CSS vars from Phase 1.3
- Makes all animations themeable and globally consistent

### 2.7 Drop Unnecessary CommonModule Imports
- Angular 20's `@if/@for/@switch` do NOT require CommonModule
- Audit and remove from components that don't use CommonModule pipes/directives (e.g., `DatePipe`, `NgClass`)

### 2.8 Table: Firefox Scrollbar Fallback
- Add `scrollbar-width: thin; scrollbar-color: ...` to `libs/components/src/lib/table/table.component.css` alongside `::-webkit-scrollbar`

### 2.9 SSR Safety Audit
- Verify all direct `document.body` access (Modal, Drawer) is guarded by `isPlatformBrowser()` — currently Modal is, Drawer needs verification after `<dialog>` conversion

---

## Phase 3: Theme Builder Consolidation — *Depends on Phases 1 & 2*

### 3.1 Resolve Stub vs Real Implementation
- `libs/theme-builder/` is an empty stub; the real 2,900-line implementation lives at `apps/showcase/src/app/pages/theme-builder/`
- **Option A (Recommended)**: Decompose the monolith into reusable library components (`TokenEditorComponent`, `ThemePreviewComponent`, `AccessibilityCheckerComponent`, `ColorGeneratorComponent`, `ThemeExportComponent`, `ThemePresetsComponent`) and move to `libs/theme-builder/`
- **Option B**: Remove the stub library, keep as app-level feature

### 3.2 Eliminate Duplicate Utility Code
- `theme-utils.ts` in showcase duplicates `getLuminance()`, `getContrastRatio()`, `lightenColor()`, `darkenColor()`, `hexToRgb()` from `@ui-suite/shared`
- Replace with imports from `@ui-suite/shared`; add unique functions (`getComplementaryColor`, `getAnalogousColors`, `isValidHexColor`, `parseCSSVariables`, `saveTheme`/`getSavedThemes`/`deleteTheme`) to shared or theme-builder library

### 3.3 Theme Builder Standards
- Add `ChangeDetectionStrategy.OnPush` (currently missing)
- If decomposed (3.1A), use `input()`/`output()` signals on sub-components

---

## Phase 4: Documentation & Verification — *Parallel with Phase 3*

### 4.1 Update Library READMEs
- `libs/shared/README.md` — Document all exported utilities, WCAG helpers, typography utilities
- `libs/theming/README.md` — Document 3-tier token system, animation tokens, services API, theme creation guide
- `libs/components/README.md` — Document component catalog, accessibility features, keyboard shortcuts per component
- `libs/theme-builder/README.md` — Document theme builder usage, integration guide

### 4.2 Update CHANGELOG.md
- Add entry under `[Unreleased]` for all changes made

### 4.3 Update copilot-instructions.md
- Update component count if changed
- Add animation token documentation
- Update theme builder section based on 3.1 decision

---

## Relevant Files

### Shared Library
- `libs/shared/src/lib/shared/` — DELETE (unused stub)
- `libs/shared/src/lib/utils/color.utils.ts` — may need new functions from theme-utils.ts

### Theming Library
- `libs/theming/src/lib/tokens/primitive-tokens.ts` — add animation tokens
- `libs/theming/src/lib/tokens/semantic-tokens.ts` — add animation semantic tokens
- `libs/theming/src/lib/tokens/theme.interface.ts` — update Theme interface
- `libs/theming/src/lib/services/css-generator.service.ts` — handle animation token generation
- `libs/theming/src/lib/themes/default-themes.ts` — add animation values to all 3 themes

### Components Library
- `libs/components/src/lib/drawer/` — convert to `<dialog>` (3 files)
- `libs/components/src/lib/context-menu/context-menu.component.ts` — ngOnDestroy + arrow keys
- `libs/components/src/lib/stepper/stepper.component.ts` — arrow key navigation
- `libs/components/src/lib/tabs/tabs.component.ts` — fix setTimeout
- `libs/components/src/lib/accordion/accordion.component.css` — animation improvement
- `libs/components/src/lib/table/table.component.css` — Firefox scrollbar
- All 34 component CSS files — replace hardcoded transitions with tokens

### Theme Builder
- `libs/theme-builder/src/lib/theme-builder/theme-builder.ts` — replace stub or decompose
- `apps/showcase/src/app/pages/theme-builder/theme-utils.ts` — eliminate duplicates

### Config
- `tsconfig.base.json` — moduleResolution, emitDecoratorMetadata changes
- `package.json` — fix dependency scoping

---

## Verification

1. `pnpm run build:libs` — all libraries compile
2. `pnpm lint` — no violations
3. `pnpm test` — tests pass
4. `pnpm start` — showcase renders all components correctly
5. Tab through Modal and Drawer — focus stays trapped
6. Arrow keys on Stepper and Context Menu — navigation works
7. Toggle `prefers-reduced-motion` — all animations disabled
8. Switch light/dark/high-contrast — all components render correctly
9. `axe-core` accessibility audit on showcase — no critical violations
10. Screen reader test on Modal, Drawer, Tabs, Multi-Select

---

## Decisions

- Drawer converts to native `<dialog>` for focus trap and screen reader parity with Modal
- Animation tokens added to theming layer so all animations are themeable
- CommonModule removed where not needed (Angular 20 built-in control flow)
- `moduleResolution: "bundler"` for Angular 20 alignment
- Production deps moved to correct scopes

---

## Open Questions

1. **Theme Builder Architecture**: Option A (decompose into library) vs Option B (remove stub, keep in showcase). Recommendation: Option A for reusability, but it is the largest work item. Preference?
2. **Component Token Coverage**: Only 7/34 components have dedicated component-tier tokens. Should all 34 get them? Recommendation: No — add only when consumers need fine-grained control per component.
3. **Test Coverage**: No spec files exist. This plan excludes tests. A separate effort should target ~90% coverage.
