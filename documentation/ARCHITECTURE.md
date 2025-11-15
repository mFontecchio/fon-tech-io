# UI Component Suite - Architecture

## Overview

The UI Component Suite is an enterprise-grade Angular 20 component library built with modern best practices, full theming support, and comprehensive accessibility features. The architecture follows a monorepo structure using Nx, with clear separation of concerns and modular design.

## System Architecture

### Monorepo Structure

```
ui-component-suite/
├── apps/
│   ├── showcase/                # Documentation and demo site
│   └── theme-builder-app/       # Standalone theme builder application
├── libs/
│   ├── components/              # Core UI component library
│   ├── theming/                 # Design system and theme engine
│   ├── theme-builder/           # Theme builder UI components
│   └── shared/                  # Shared utilities and types
├── documentation/               # Project documentation
└── tools/                       # Build tools and generators
```

### Library Dependencies

```
┌─────────────────┐
│   Applications  │
│  (showcase,     │
│   theme-builder)│
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
    ┌────▼─────┐      ┌───▼──────┐
    │components│      │ theme-   │
    │          │      │ builder  │
    └────┬─────┘      └───┬──────┘
         │                │
         └────────┬───────┘
                  │
            ┌─────▼────┐
            │ theming  │
            └─────┬────┘
                  │
            ┌─────▼────┐
            │  shared  │
            └──────────┘
```

## Core Concepts

### 1. Three-Tier Design Token System

The theming system uses a hierarchical approach to design tokens:

#### Tier 1: Primitive Tokens
Raw design values that serve as the foundation:
- Colors (palettes with 11 shades: 50-950)
- Spacing scale (0-64 with 4px multiplier)
- Typography (font families, sizes, weights, line heights, letter spacing)
- Border radius (none to full)
- Shadows (none to 2xl)
- Z-index scale

**Location**: `libs/theming/src/lib/tokens/primitive-tokens.ts`

#### Tier 2: Semantic Tokens
Purpose-driven tokens that reference primitive tokens:
- Surface colors (background, card, modal)
- Text colors (primary, secondary, disabled, inverse)
- Border colors (default, focus, error)
- State colors (hover, active, selected)
- Brand colors (primary, secondary, accent)
- Feedback colors (success, warning, error, info)

**Location**: `libs/theming/src/lib/tokens/semantic-tokens.ts`

#### Tier 3: Component Tokens
Component-specific tokens:
- Button styles and variants
- Input states and styling
- Card, modal, tooltip configurations
- Badge variants
- Table styling

**Location**: `libs/theming/src/lib/tokens/component-tokens.ts`

### 2. Theme Engine

The theme engine converts design tokens to CSS custom properties and manages theme application:

#### CSS Generator Service
- Converts theme objects to CSS custom properties
- Handles token flattening and kebab-case conversion
- Applies themes to DOM elements
- Generates CSS strings for static inclusion

**Location**: `libs/theming/src/lib/services/css-generator.service.ts`

#### Theme Service
- Manages active theme state using Angular signals
- Provides reactive theme switching
- Handles theme persistence (localStorage)
- SSR-compatible implementation
- System theme preference detection
- Custom theme registration

**Location**: `libs/theming/src/lib/services/theme.service.ts`

**Key Features**:
- Signal-based reactive state management
- Effect-based automatic theme application
- Browser/SSR detection
- Theme import/export (JSON)
- System preference watching

### 3. Responsive Typography System

Fluid typography that scales smoothly across breakpoints using CSS `clamp()`.

#### Typography Utilities
- Fluid font size generation
- Line height calculation based on font size
- Letter spacing optimization
- Predefined type scales (display, headings, body, labels)
- Responsive container widths for optimal readability (45-75 characters)

**Location**: `libs/shared/src/lib/utils/typography.utils.ts`

#### Typography Service
- Manages current breakpoint (signal-based)
- Provides type scale access
- Generates typography CSS custom properties
- Breakpoint detection and responsive calculations

**Location**: `libs/theming/src/lib/services/typography.service.ts`

#### Breakpoints
- Mobile: 320px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px

### 4. Component Architecture

All components follow Angular 20 best practices:

#### Component Standards
- **Standalone components** (default in Angular 20)
- **Signals** for reactive state management
- **OnPush change detection** for performance
- **HTML5-first design** using native elements where possible
- **Full ARIA support** for accessibility
- **Keyboard navigation** support
- **Focus management**

#### Component Structure
```
component/
├── component.ts           # Component logic (signals, inputs, outputs)
├── component.html         # Template (native control flow @if, @for)
├── component.css          # Styles (using design tokens)
├── component.spec.ts      # Unit tests (Jest + Testing Library)
└── README.md              # Component documentation
```

#### Input/Output Pattern
```typescript
// Inputs using input() function
readonly variant = input<ButtonVariant>('filled');
readonly disabled = input<boolean>(false);

// Outputs using output() function
readonly clicked = output<MouseEvent>();

// Computed values
readonly isDisabled = computed(() => 
  this.disabled() || this.loading()
);
```

## Data Flow

### Theme Application Flow

```
1. User selects theme
   ↓
2. ThemeService.setTheme()
   ↓
3. Signal update: _currentTheme.set(theme)
   ↓
4. Effect triggers automatically
   ↓
5. CssGeneratorService.applyTheme()
   ↓
6. CSS custom properties applied to :root
   ↓
7. Components re-render with new theme
   ↓
8. Theme persisted to localStorage
```

### Component Rendering Flow

```
1. Component initialized (signals created)
   ↓
2. Inputs set from parent
   ↓
3. Computed signals calculate derived state
   ↓
4. Template renders using signals
   ↓
5. User interaction triggers event
   ↓
6. Signal updates (if needed)
   ↓
7. OnPush change detection runs
   ↓
8. Only affected parts re-render
```

## Accessibility Architecture

### WCAG 2.1 AA Compliance

All components implement:

#### Keyboard Navigation
- Tab order management
- Enter/Space activation
- Arrow key navigation (where applicable)
- Escape key handling (modals, dropdowns)
- Focus trapping (modals)

#### ARIA Support
- Semantic roles
- State attributes (aria-disabled, aria-checked, etc.)
- Labels and descriptions
- Live regions for dynamic content
- Relationships (aria-labelledby, aria-describedby)

#### Visual Accessibility
- Color contrast ratios (4.5:1 for text, 3:1 for UI)
- Focus indicators (2px visible outline)
- Reduced motion support (@prefers-reduced-motion)
- High contrast mode support (@prefers-contrast)
- Sufficient touch targets (minimum 44x44px)

### Focus Management
```typescript
// Focus trap in modals
focusTrap.activate();

// Restore focus on close
previousFocusedElement.focus();

// Skip links for navigation
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## Performance Considerations

### Optimization Strategies

1. **OnPush Change Detection**
   - All components use OnPush
   - Reduces unnecessary change detection cycles
   - Relies on signals for reactivity

2. **Lazy Loading**
   - Route-based code splitting
   - Component lazy loading where appropriate
   - Dynamic imports for large features

3. **Tree Shaking**
   - Modular exports from libraries
   - Named exports for granular imports
   - No barrel file anti-patterns

4. **CSS Custom Properties**
   - Runtime theme switching without rebuilding
   - Minimal CSS bundle size
   - Browser-native performance

5. **Signal-Based Reactivity**
   - Fine-grained reactivity
   - Automatic dependency tracking
   - Minimal re-rendering

### Bundle Size Targets
- Components library: < 50KB (gzipped)
- Theming library: < 10KB (gzipped)
- Per-component: < 5KB (gzipped)

## Testing Strategy

### Unit Testing (Jest)
- Component logic tests
- Input/output behavior
- State management
- Computed signal calculations
- Using Angular Testing Library for DOM interactions

### E2E Testing (Cypress)
- User flow testing
- Cross-browser compatibility
- Accessibility testing (cypress-axe)
- Theme switching verification
- Responsive behavior

### Test Coverage Targets
- Overall: 80%+
- Critical components: 90%+
- Services: 95%+
- Utilities: 100%

## Build and Distribution

### Library Builds
```bash
# Build all libraries
pnpm nx run-many --target=build --all

# Build specific library
pnpm nx build components
```

### Publishing
Libraries are published to Artifactory:
- `@ui-suite/components`
- `@ui-suite/theming`
- `@ui-suite/theme-builder`
- `@ui-suite/shared`

### Version Management
- Semantic Versioning (SemVer)
- Independent library versions
- Changelog per library
- Migration guides for breaking changes

## Security Considerations

1. **Dependency Management**
   - Regular dependency updates
   - Security audit scanning
   - No known vulnerabilities

2. **XSS Prevention**
   - No innerHTML usage
   - Sanitized user input
   - Angular's built-in security

3. **CSP Compliance**
   - No inline styles or scripts
   - Nonce support for dynamic styles
   - External resource policies

## Browser Support

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript
- Graceful degradation for older browsers

## Future Considerations

### Planned Enhancements
1. Component generator in theme builder UI
2. Web-hosted theme sharing platform
3. Animation system with motion design tokens
4. Icon library integration
5. Advanced table features (grouping, tree data)
6. Form builder components
7. Internationalization (i18n) support
8. RTL (right-to-left) language support

### Scalability
- Designed for hundreds of components
- Plugin architecture for extensions
- Custom theme system for white-labeling
- Micro-frontend compatibility


