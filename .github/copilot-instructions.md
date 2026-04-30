# UI Component Suite - AI Agent Guide

## Project Overview

Enterprise-grade Angular 20 component library (38 components) with a three-tier design token system, built in an Nx monorepo with pnpm. The library emphasizes HTML5-first architecture, signals-based reactivity, and comprehensive theming.

**Master Implementation Plan**: `/documentation/plan/angular-component-library-suite.plan.md`

- Comprehensive 8-phase plan covering foundation → components → theme builder → documentation
- Current Status: **Phase 7 (Developer Experience)** - All 38 components complete, theming system implemented
- Target: 30+ components (achieved 34), complete design system, theme builder UI, showcase site

## Architecture Quick Reference

### Monorepo Structure

```
libs/
├── theming/          # Design system engine (@ui-suite/theming)
├── shared/           # Utilities & types (@ui-suite/shared)
├── components/       # 34 UI components (@ui-suite/components)
└── theme-builder/    # Theme creation UI (@ui-suite/theme-builder)
apps/
├── showcase/         # Documentation & demos
└── theme-builder-app/
```

**Dependency Flow**: apps → components/theme-builder → theming → shared

### Import Aliases (tsconfig.base.json)

```typescript
import { ThemeService } from '@ui-suite/theming';
import { ButtonComponent } from '@ui-suite/components';
import { fluidFontSize } from '@ui-suite/shared';
```

## Critical Design Patterns

### 1. Three-Tier Design Token System

All styling uses CSS custom properties from this hierarchy:

**Tier 1: Primitive Tokens** (`libs/theming/src/lib/tokens/primitive-tokens.ts`)

- Raw values: colors (50-950 shades), spacing (0-64, 4px multiplier), typography, shadows
- Example: `--primitive-spacing-4`, `--primitive-color-primary-500`

**Tier 2: Semantic Tokens** (`libs/theming/src/lib/tokens/semantic-tokens.ts`)

- Purpose-driven: `--semantic-text-primary`, `--semantic-surface-card`, `--semantic-border-focus`

**Tier 3: Component Tokens** (`libs/theming/src/lib/tokens/component-tokens.ts`)

- Component-specific: `--component-button-filled-background`, `--component-input-padding-x`

**In component CSS**: Always reference tokens, never hardcode values:

```css
.ui-button {
  padding: var(--component-button-sizes-md-padding-y) var(--component-button-sizes-md-padding-x);
  background-color: var(--component-button-filled-background);
  border-radius: var(--component-button-border-radius);
}
```

### 2. Angular 20 Component Standards

**ALL components MUST follow these patterns** (see `libs/components/src/lib/button/` as reference):

```typescript
import { Component, input, output, computed, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-example',
  imports: [CommonModule], // Standalone, import dependencies directly
  templateUrl: './example.component.html',
  styleUrl: './example.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // REQUIRED
})
export class ExampleComponent {
  // Use input() function (NOT @Input decorator)
  readonly variant = input<'filled' | 'outlined'>('filled');
  readonly disabled = input<boolean>(false);

  // Use output() function (NOT @Output decorator)
  readonly clicked = output<MouseEvent>();

  // Use computed() for derived state
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  // Use signal() for internal state
  private readonly _isOpen = signal(false);
}
```

**Template Control Flow** (Angular 20 syntax - NO *ngIf/*ngFor):

```html
@if (loading()) {
<span class="loader"></span>
} @for (tab of tabs(); track $index) {
<button>{{ tab.label() }}</button>
} @switch (variant()) { @case ('filled') {
<div>Filled</div>
} @case ('outlined') {
<div>Outlined</div>
} }
```

### 3. Theme Service Usage

The ThemeService uses signals for reactivity (`libs/theming/src/lib/services/theme.service.ts`):

```typescript
import { ThemeService } from '@ui-suite/theming';

constructor(private themeService = inject(ThemeService)) {
  // Access current theme (readonly signal)
  effect(() => {
    console.log('Theme changed:', this.themeService.currentTheme());
  });

  // Check mode
  if (this.themeService.isDarkMode()) { /* ... */ }

  // Switch themes
  this.themeService.setThemeMode('dark');

  // Register custom theme
  const customTheme: Theme = { /* ... */ };
  this.themeService.registerCustomTheme(customTheme);
  this.themeService.setTheme('custom-theme-id');
}
```

**Important**: ThemeService is SSR-compatible - it detects browser environment before DOM access.

### 3a. Theme Builder Integration

The theme builder (`libs/theme-builder/`) is a fully implemented library providing an interactive theme creation UI and utilities:

**Exported from `@ui-suite/theme-builder`**:

- `ThemeBuilderComponent` — Full interactive theme builder UI (selector: `app-theme-builder`)
- `ThemePreset`, `THEME_PRESETS` — Pre-configured theme presets
- `convertPresetToTheme()` — Convert flat preset tokens to `Theme` objects
- Color utilities: `getContrastRatio`, `lightenColor`, `darkenColor`, `getComplementaryColor`, `getAnalogousColors`, `isValidHexColor`, `generateShades`, `meetsWCAG`, `getWCAGLevel`
- Storage utilities: `saveTheme`, `getSavedThemes`, `deleteTheme`
- CSS utilities: `parseCSSVariables`

**Theme Builder Workflow** (lazy-load recommended):

```typescript
// Lazy-load in routing (recommended)
{
  path: 'theme-builder',
  loadComponent: () => import('@ui-suite/theme-builder').then(m => m.ThemeBuilderComponent),
}
```

**Theme Builder Features**:

- Real-time preview with all 38 components visible
- Accessibility contrast checker (WCAG AA/AAA validation)
- Import/export themes as JSON
- Preset theme library (Material, Bootstrap, Dark, Minimal, Ocean, Sunset, and more)
- Dual light/dark mode editing
- Undo/redo support
- Copy-to-clipboard for theme configuration

**Theme JSON Structure**:

```typescript
{
  metadata: {
    id: 'my-theme',
    name: 'My Custom Theme',
    mode: 'light', // 'light' | 'dark' | 'high-contrast'
    description: 'Custom theme description',
    author: 'Author name',
    version: '1.0.0'
  },
  primitive: { /* primitive tokens */ },
  semantic: { /* semantic tokens */ },
  component: { /* component tokens */ }
}
```

**Standalone Theme Builder App** (`apps/theme-builder-app/`):

- Dedicated application for theme creation
- Start with: `pnpm start:theme-builder`
- Access at: `http://localhost:4200` (or configured port)
- Save/load themes from browser localStorage
- Share themes via URL (theme encoded in query params)

### 3b. CSS Generator Service

The CssGeneratorService (`libs/theming/src/lib/services/css-generator.service.ts`) converts theme tokens to CSS custom properties:

```typescript
import { CssGeneratorService } from '@ui-suite/theming';

constructor(private cssGenerator = inject(CssGeneratorService)) {}

// Generate CSS string from theme
const cssString = this.cssGenerator.generateCssVariables(theme);
// Returns: ":root { --primitive-color-primary-500: #3b82f6; ... }"

// Apply theme to DOM element
this.cssGenerator.applyTheme(theme); // Applies to document.documentElement

// Generate CSS for specific element
this.cssGenerator.applyThemeToElement(theme, elementRef.nativeElement);
```

**Token Flattening Pattern**:
The service flattens nested token objects into kebab-case CSS variables:

```typescript
// Input: { primitive: { color: { primary: { 500: '#3b82f6' } } } }
// Output: --primitive-color-primary-500: #3b82f6;
```

**When to Use**:

- Creating new themes programmatically
- Exporting themes to CSS files
- Applying themes to shadow DOM components
- Generating static CSS for build-time theme bundling

### 3c. Theme Generator Service (Auto Hover States & Contrast Text)

The ThemeGeneratorService (`libs/theming/src/lib/services/theme-generator.service.ts`) automatically generates hover states and ensures optimal text contrast:

```typescript
import { ThemeGeneratorService } from '@ui-suite/theming';
import { getContrastTextColor, generateHoverColor } from '@ui-suite/shared';

constructor(private themeGenerator = inject(ThemeGeneratorService)) {}

// Auto-generate hover states and contrast text for existing theme
const enhancedTheme = this.themeGenerator.enhanceTheme(baseTheme, {
  autoGenerateHoverStates: true,  // Darken/lighten colors for hover
  autoContrastText: true,         // Auto-select black/white text
  hoverAmount: 10,                // Adjustment amount (0-100)
  activeAmount: 15                // Active state adjustment
});

// Create complete theme from a single brand color
const customTheme = this.themeGenerator.createThemeFromBrandColor(
  '#0066cc',                      // Brand color
  'light',                        // Mode
  'Corporate Blue',               // Name
  lightTheme                      // Base theme to extend
);

// Generate color palette (50-950 shades) from single color
const palette = this.themeGenerator.generatePalette('#3b82f6');
// Returns: { 50: '#eff6ff', 100: '#dbeafe', ..., 950: '#172554' }
```

**Color Utilities** (`libs/shared/src/lib/utils/color.utils.ts`):

```typescript
import {
  getContrastTextColor,
  getContrastRatio,
  checkContrast,
  generateHoverColor,
  darkenColor,
  lightenColor,
} from '@ui-suite/shared';

// Auto-select black or white text for best contrast
const textColor = getContrastTextColor('#3b82f6'); // Returns '#ffffff'

// Check WCAG contrast compliance
const { ratio, pass } = checkContrast('#3b82f6', '#ffffff', 'AA', 'normal');
// { ratio: 3.7, pass: false, level: 'AA normal' }

// Auto-generate hover states based on theme mode
const hoverColor = generateHoverColor('#3b82f6', 'light'); // Darker
const hoverColorDark = generateHoverColor('#3b82f6', 'dark'); // Lighter
```

**Key Features**:

- **Auto hover states**: Darkens colors in light mode, lightens in dark mode
- **Contrast-based text**: Automatically chooses black/white for optimal readability
- **WCAG validation**: Built-in contrast ratio checking (AA/AAA compliance)
- **Color palette generation**: Create full 11-shade palette from single color
- **Theme enhancement**: Apply improvements to existing themes without manual edits

### 3d. Animation Token System

The theming library includes a full animation token system following the three-tier token hierarchy. All component CSS files use these tokens — never hardcode transition values.

**Primitive animation tokens** (`libs/theming/src/lib/tokens/primitive-tokens.ts`):

- `--primitive-animation-duration-fast`: `150ms`
- `--primitive-animation-duration-normal`: `250ms`
- `--primitive-animation-duration-slow`: `350ms`
- `--primitive-animation-easing-default`: `ease-in-out`
- `--primitive-animation-easing-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)`

**Semantic animation tokens** (use these in component CSS):

- `--animation-duration-fast`, `--animation-duration-normal`, `--animation-duration-slow`
- `--animation-easing-default`, `--animation-easing-spring`

**Usage in component CSS**:

```css
/* Correct */
.ui-button {
  transition: background-color var(--animation-duration-normal) var(--animation-easing-default);
}

/* Wrong - hardcoded values */
.ui-button {
  transition: background-color 0.2s ease-in-out;
}
```

Every interactive component MUST include:

- ARIA attributes: `role`, `aria-label`, `aria-disabled`, `aria-selected`, etc.
- Keyboard navigation: Handle arrow keys, Enter, Space, Escape
- Focus management: `focus-visible` outline, programmatic focus control
- Disabled state: Both `[disabled]` and `[attr.aria-disabled]`
- WCAG 2.1 AA compliance minimum (target AAA where feasible)

Example from button.component.html:

```html
<button
  [type]="type()"
  [disabled]="isDisabled()"
  [attr.aria-label]="ariaLabel()"
  [attr.aria-disabled]="isDisabled()"
  (click)="handleClick($event)"
  (keydown)="handleKeyDown($event)"
></button>
```

### 5. HTML5-First Architecture

**Core Principle**: Use native HTML5 elements wherever possible to minimize breaking changes across Angular versions.

```typescript
// ✅ Good - native HTML button
<button type="button" [disabled]="disabled()">Click</button>

// ✅ Good - native select with enhancement
<select [value]="selected()" (change)="onChange($event)">
  @for (option of options(); track option.id) {
    <option [value]="option.value">{{ option.label }}</option>
  }
</select>

// ✅ Good - semantic HTML structure
<nav aria-label="Main navigation">
  <ul class="ui-navbar-list">
    @for (item of navItems(); track item.id) {
      <li><a [href]="item.href">{{ item.label }}</a></li>
    }
  </ul>
</nav>
```

**Benefits**:

- Better accessibility out-of-the-box
- More resilient to framework version changes
- Better SEO and semantic structure
- Native browser functionality (form validation, etc.)

## Developer Workflows

### Build Order (Critical!)

Libraries have dependencies. Always build in this order:

```bash
pnpm run build:theming    # First - base design system
pnpm run build:shared     # Second - utilities
pnpm run build:components # Third - depends on theming + shared
pnpm run build:theme-builder # Fourth - depends on all above
```

Or build all: `pnpm run build:libs`

### Development Commands

```bash
pnpm start                    # Showcase app (port 4200) - most common
pnpm start:theme-builder      # Theme builder app
pnpm test                     # Run Jest tests
pnpm lint                     # ESLint all projects
pnpm format:write             # Prettier format
nx affected:build             # Build only changed projects
```

### Nx Project Targeting

```bash
nx build components           # Build specific library
nx test components            # Test specific library
nx serve showcase             # Serve specific app
nx run showcase:build:production  # Production build
```

### Adding a New Component

1. **Generate component** (or create manually in `libs/components/src/lib/component-name/`):
   - `component-name.component.ts` - Use signals, OnPush, standalone
   - `component-name.component.html` - Use @if/@for control flow
   - `component-name.component.css` - Use design tokens (var(--component-...))
   - `README.md` - API docs, examples, accessibility, best practices

2. **Export from index.ts**: Add to `libs/components/src/index.ts`:

   ```typescript
   export * from './lib/component-name/component-name.component';
   ```

3. **Add to showcase**: Create demo page in `apps/showcase/src/app/pages/components/`

### Creating Custom Themes

**Method 1: Using Theme Builder UI** (Recommended)

```bash
pnpm start:theme-builder
# Navigate to http://localhost:4200
# Use visual editors to customize colors, typography, spacing
# Export theme as JSON or TypeScript
```

**Method 2: Programmatic Theme Creation**

```typescript
import { Theme } from '@ui-suite/theming';

const myCustomTheme: Theme = {
  metadata: {
    id: 'my-brand-theme',
    name: 'My Brand Theme',
    mode: 'light',
    description: 'Corporate brand theme',
    version: '1.0.0',
  },
  primitive: {
    color: {
      primary: {
        500: '#0066cc', // Brand blue
        // ... other shades
      },
    },
    // ... other primitive tokens
  },
  semantic: {
    // Semantic tokens reference primitive tokens
    brand: {
      primary: 'var(--primitive-color-primary-500)',
    },
  },
  component: {
    // Component-specific overrides
    button: {
      borderRadius: '8px',
    },
  },
};

// Register and activate
this.themeService.registerCustomTheme(myCustomTheme);
this.themeService.setTheme('my-brand-theme');
```

**Testing Themes**:

```typescript
// Test theme switching in components
effect(() => {
  const theme = this.themeService.currentTheme();
  console.log('Active theme:', theme.metadata.name);
  // Verify component tokens are applied
});

// Test contrast ratios for WCAG compliance
import { checkContrast } from '@ui-suite/shared';
const contrastRatio = checkContrast(foreground, background);
console.log('WCAG AA:', contrastRatio >= 4.5); // Text
console.log('WCAG AAA:', contrastRatio >= 7); // Text
```

### Routing Pattern (Showcase App)

Uses lazy loading with `loadComponent`:

```typescript
{
  path: 'components/:category/:name',
  loadComponent: () => import('./pages/components/component-detail.component')
    .then(m => m.ComponentDetailComponent),
}
```

## Common Pitfalls & Solutions

### ❌ Don't Use Deprecated Patterns

- NO `@Input()` / `@Output()` decorators → Use `input()` / `output()` functions
- NO `*ngIf` / `*ngFor` / `*ngSwitch` → Use `@if` / `@for` / `@switch`
- NO hardcoded CSS values → Use `var(--token-name)`
- NO hardcoded transition durations/easings → Use `var(--animation-duration-*)` / `var(--animation-easing-*)`
- NO `ng-deep` or `::ng-deep` → Use design tokens or CSS layers
- NO `any` types → Use proper TypeScript types
- NO mixing programming paradigms → Maintain consistency with existing code
- NO `<div role="dialog">` for overlays → Use native `<dialog>` element (Drawer and Modal already do this)

### ✅ TypeScript Best Practices

- Use strict mode (already enabled in tsconfig)
- Explicitly type function parameters and return types
- Use `readonly` for immutable properties
- Leverage union types, type guards, and discriminated unions
- Use `interface` for object shapes, `type` for unions/intersections

```typescript
// Good - explicit types
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Component input with proper typing
readonly variant = input<ButtonVariant>('filled');
readonly size = input<ButtonSize>('md');
```

### ✅ Responsive Typography

Use fluid typography utilities (`libs/shared/src/lib/utils/typography.utils.ts`):

```typescript
import { fluidFontSize, calculateLineHeight } from '@ui-suite/shared';

const fontSize = fluidFontSize({ min: 16, max: 24 }); // Responsive clamp()
```

### ✅ Component File Structure

Each component folder should contain:

- `*.component.ts` - Component logic
- `*.component.html` - Template (separate file, NOT inline)
- `*.component.css` - Styles using tokens (separate file)
- `README.md` - Comprehensive documentation (see other components for format)

### ✅ Styling Convention

- Use `ui-` prefix for all component classes: `.ui-button`, `.ui-tabs-list`
- Use BEM-like modifiers: `.ui-button--filled`, `.ui-button--disabled`
- Use element modifiers: `.ui-button__content`, `.ui-button__loader`

## Testing Approach

Currently **no spec files exist** - tests should be added using Jest + Angular Testing Library:

```typescript
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
```

Configuration: `jest.config.ts` (root) + per-project configs in each lib/app

## Key Files Reference

- **Theme Interface**: `libs/theming/src/lib/tokens/theme.interface.ts`
- **Default Themes**: `libs/theming/src/lib/themes/default-themes.ts`
- **CSS Generator**: `libs/theming/src/lib/services/css-generator.service.ts` (converts tokens → CSS vars)
- **Component Catalog**: All 38 components in `libs/components/src/lib/` (accordion, alert, avatar, badge, breadcrumb, button, card, checkbox, chip, code-block, context-menu, date-picker, divider, drawer, file-upload, grid, input, list, menu, modal, multi-select, navbar, pagination, popover, progress, radio, select, skeleton, slider, spinner, stack, stepper, switch, table, tabs, textarea, toast, tooltip)
- **Documentation Status**: `documentation/FINAL_100_PERCENT_COMPLETION.md` (all 38 components fully documented)

## Project-Specific Context

- **Package Manager**: pnpm (NOT npm/yarn) - enforced via `packageManager` in package.json
- **Angular Version**: 20.3.x - uses latest features (signals, new control flow)
- **Nx Version**: 22.0.3 - monorepo tooling
- **TypeScript**: Strict mode enabled - `noImplicitReturns`, `noFallthroughCasesInSwitch`, etc.
- **Browser Target**: ES2022 - modern browsers only (Chrome, Firefox, Safari, Edge latest)
- **Component Count**: 38 fully functional components (11 form, 8 layout, 9 data display, 5 feedback, 5 navigation)
- **Theming**: Supports light, dark, and high-contrast modes with system preference detection

## Code Quality Standards

### Documentation Requirements

- **JSDoc/TSDoc comments required** for all public functions, classes, components
- Include `@param`, `@returns`, `@throws`, `@example` tags
- Document purpose, parameters, return types, and exceptions
- Add usage examples in complex cases

Example:

````typescript
/**
 * Generates fluid font size using CSS clamp()
 *
 * @param config - Type scale configuration with min/max sizes
 * @returns CSS clamp() string for responsive font sizing
 * @example
 * ```typescript
 * fluidFontSize({ min: 16, max: 24 })
 * // Returns: "clamp(1rem, 0.8889rem + 0.5556vw, 1.5rem)"
 * ```
 */
export function fluidFontSize(config: TypeScaleConfig): string { ... }
````

### Testing Requirements

- **No spec files currently exist** - maintain this pattern (tests intentionally omitted)
- When tests are added in future, use Jest + Angular Testing Library
- Target: 90% code coverage minimum
- Test happy paths, edge cases, and error conditions

### Performance Guidelines

- Write clear, readable code first
- Optimize only proven bottlenecks
- Document why optimizations are necessary
- Prefer built-in Angular optimizations (OnPush, signals, trackBy)

### File Organization Standards

- **All documentation** must be saved in `/documentation/`
- **All plans and summaries** must be saved in `/documentation/plan/`
- Create folders automatically if they don't exist
- Never save docs in `/src/`, `/docs/`, or `/notes/`

## Git Workflow

### Commit Message Standards

Follow conventional commit format:

```
type(scope): subject line (~50 chars)

Body explaining what and why (wrap at 72 chars)

- Use imperative mood: "Add feature" not "Added feature"
- Separate subject from body with blank line
- Capitalize subject line
- No period at end of subject
- Explain WHAT changed and WHY, not HOW
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Changelog Maintenance

- **ALWAYS update `/CHANGELOG.md`** when making changes
- Follow [Keep a Changelog](https://keepachangelog.com/) format
- Use Semantic Versioning (MAJOR.MINOR.PATCH)
- Categories: Added, Changed, Deprecated, Removed, Fixed, Security
- Professional tone, no emojis

Example:

```markdown
## [Unreleased]

### Added

- New Slider component with dual handle support in `libs/components/src/lib/slider/`

### Fixed

- Tabs indicator position calculation in vertical orientation
```

## Professional Standards

- **Use formal, professional language** in all documentation and code comments
- **NO emojis, emoticons, or informal expressions** in docs or commit messages
- Use proper technical terminology
- Write for enterprise audience
- Focus on clarity and accuracy

## Questions to Ask Before Implementation

1. **New Component**: Does it follow signals, OnPush, standalone, @if/@for syntax?
2. **Styling**: Am I using design tokens (--primitive/--semantic/--component) instead of hardcoded values?
3. **Accessibility**: Did I add ARIA attributes and keyboard navigation?
4. **Theme Integration**: Does it respond to theme changes via ThemeService?
5. **Build Order**: If modifying libs, will downstream libraries need rebuilding?
6. **Documentation**: Does this change require updating CHANGELOG.md or docs in `/documentation/`?
7. **Code Comments**: Have I added JSDoc/TSDoc for all public APIs?
8. **Plan Alignment**: Does this align with the master plan in `/documentation/plan/angular-component-library-suite.plan.md`?

## Implementation Status

**Current Phase**: Phase 7 (Developer Experience)

**Completed**:

- ✅ Phase 1: Foundation Setup - Nx workspace, libraries, apps configured
- ✅ Phase 2: Design System & Theming Engine - Three-tier tokens, ThemeService, CssGenerator
- ✅ Phase 3: Core Component Library - All 38 components implemented and documented
- ✅ Phase 4: Theme Builder UI - Visual theme creator with real-time preview
- ✅ Phase 5: Showcase & Documentation Site - Live demos, API docs, examples
- ✅ Phase 6: Accessibility & Best Practices - WCAG 2.1 AA compliance, keyboard nav

**In Progress**:

- 🔄 Phase 7: Developer Experience - Documentation, guides, build optimization

**Pending**:

- ⏳ Phase 8: Future Enhancements - Animation system, icon library, i18n

When making changes, always refer to the master plan to understand the overall architecture and ensure consistency with project goals.
