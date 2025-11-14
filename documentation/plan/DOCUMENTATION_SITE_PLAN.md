# Documentation Site & Theme Builder Plan

**Project**: UI Component Suite - Complete Documentation Platform  
**Date**: November 14, 2024  
**Status**: Planning Phase

---

## Executive Summary

Transform the current basic showcase into a comprehensive documentation platform that includes:

- Full API documentation for all 36 components
- Interactive theme builder with live preview
- Code examples and best practices
- Getting started guides
- Accessibility documentation

---

## Current State

### ✅ What We Have

- Basic showcase app running at `localhost:4200`
- All 36 components with visual demos
- Theme switching (light/dark mode)
- Component library fully functional

### ❌ What's Missing

- API documentation (inputs, outputs, methods)
- Theme builder UI
- Navigation structure
- Search functionality
- Code copy functionality
- Installation/getting started guides
- Component metadata extraction
- Accessibility guidelines per component

---

## Architecture

### Application Structure

```
apps/showcase/
├── src/
│   ├── app/
│   │   ├── app.ts (root component with router outlet)
│   │   ├── app.routes.ts (routing configuration)
│   │   │
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   └── home.component.ts (landing page)
│   │   │   │
│   │   │   ├── getting-started/
│   │   │   │   ├── installation.component.ts
│   │   │   │   ├── usage.component.ts
│   │   │   │   └── theming.component.ts
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── component-list.component.ts (category overview)
│   │   │   │   └── component-detail.component.ts (individual component docs)
│   │   │   │
│   │   │   └── theme-builder/
│   │   │       └── theme-builder.component.ts (full theme builder UI)
│   │   │
│   │   ├── layout/
│   │   │   ├── nav-sidebar.component.ts (left sidebar navigation)
│   │   │   ├── header.component.ts (top header with search)
│   │   │   └── footer.component.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── code-block.component.ts (syntax highlighted code)
│   │   │   ├── prop-table.component.ts (API documentation table)
│   │   │   ├── demo-container.component.ts (component demo wrapper)
│   │   │   ├── copy-button.component.ts
│   │   │   └── search.component.ts
│   │   │
│   │   └── data/
│   │       └── component-metadata.ts (all component API info)
│   │
│   └── assets/
│       ├── examples/ (code examples for each component)
│       └── images/
```

### Routing Structure

```
/                           → Home (landing page)
/getting-started/
  /installation             → Installation guide
  /usage                    → Basic usage guide
  /theming                  → Theming overview

/components/
  /form                     → Form components category
  /layout                   → Layout components category
  /data-display             → Data display category
  /feedback                 → Feedback category
  /navigation               → Navigation category

/components/:category/:name → Individual component docs
  Example: /components/form/button

/theme-builder              → Theme builder UI
/accessibility              → Accessibility guidelines
```

---

## Feature Specifications

### 1. API Documentation System

#### Component Metadata Structure

```typescript
interface ComponentMetadata {
  name: string;
  category: ComponentCategory;
  description: string;
  selector: string;

  inputs: ComponentInput[];
  outputs: ComponentOutput[];
  methods?: ComponentMethod[];

  examples: ComponentExample[];

  accessibility: {
    ariaSupport: string[];
    keyboardNavigation: KeyboardShortcut[];
    screenReaderNotes: string;
  };

  bestPractices: string[];
  relatedComponents: string[];
}

interface ComponentInput {
  name: string;
  type: string;
  default?: any;
  required: boolean;
  description: string;
}

interface ComponentOutput {
  name: string;
  type: string;
  description: string;
}

interface ComponentExample {
  title: string;
  description: string;
  code: string; // TypeScript code
  template: string; // HTML template
  styles?: string; // Optional CSS
}
```

#### Component Detail Page Layout

```
┌─────────────────────────────────────────────────────┐
│ Component Name                          [Copy Code] │
│ Brief description                                   │
├─────────────────────────────────────────────────────┤
│ Tabs: [Overview] [API] [Examples] [Accessibility]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ OVERVIEW TAB:                                       │
│   - Live interactive demo                           │
│   - When to use this component                      │
│   - Best practices                                  │
│                                                     │
│ API TAB:                                            │
│   - Props/Inputs table                              │
│   - Outputs/Events table                            │
│   - Public methods                                  │
│   - CSS custom properties                           │
│                                                     │
│ EXAMPLES TAB:                                       │
│   - Multiple code examples                          │
│   - Each with live preview + code                   │
│   - Copy button for each                            │
│                                                     │
│ ACCESSIBILITY TAB:                                  │
│   - ARIA attributes used                            │
│   - Keyboard navigation                             │
│   - Screen reader considerations                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2. Theme Builder UI

#### Features

- **Color System Editor**
  - Primitive colors (primary, secondary, neutral, success, warning, error, info)
  - Color picker for each
  - Preview of all shades/tints
  - Contrast ratio checker (WCAG AA/AAA)

- **Typography Editor**
  - Font family selection (with Google Fonts integration?)
  - Font size scale editor (base, sm, lg, xl, etc.)
  - Font weight options
  - Line height adjustments
  - Letter spacing

- **Spacing & Sizing Editor**
  - Spacing scale (0.25rem to 4rem)
  - Border radius presets
  - Shadow presets

- **Component Token Overrides**
  - Browse by component
  - Override specific component tokens
  - Reset to defaults

- **Live Preview Panel**
  - Split screen view
  - All components rendered with current theme
  - Real-time updates as you edit

- **Export/Import**
  - Export as TypeScript file
  - Export as CSS custom properties
  - Export as JSON
  - Import existing theme
  - Share theme via URL (base64 encoded in query param?)

#### Theme Builder Layout

```
┌──────────────────────────────────────────────────────────┐
│                     THEME BUILDER                        │
├─────────────────────┬────────────────────────────────────┤
│  Editor Panel       │  Live Preview Panel                │
│  (Left 40%)         │  (Right 60%)                       │
│                     │                                    │
│  ┌───────────────┐  │  ┌──────────────────────────────┐ │
│  │ Colors        │  │  │  Preview with current theme  │ │
│  │  ├─ Primary   │  │  │                              │ │
│  │  ├─ Secondary │  │  │  [Button Examples]           │ │
│  │  ├─ Success   │  │  │  [Input Examples]            │ │
│  │  └─ ...       │  │  │  [Card Examples]             │ │
│  │               │  │  │  [All components...]         │ │
│  │ Typography    │  │  │                              │ │
│  │  ├─ Families  │  │  │  [Scroll to see more]        │ │
│  │  ├─ Sizes     │  │  │                              │ │
│  │  └─ Weights   │  │  └──────────────────────────────┘ │
│  │               │  │                                    │
│  │ Spacing       │  │  [Export] [Import] [Reset]        │
│  │               │  │                                    │
│  │ Components    │  │                                    │
│  │  ├─ Button    │  │                                    │
│  │  ├─ Input     │  │                                    │
│  │  └─ ...       │  │                                    │
│  └───────────────┘  │                                    │
└─────────────────────┴────────────────────────────────────┘
```

### 3. Navigation System

#### Sidebar Navigation

- Collapsible categories
- Active route highlighting
- Search bar at top
- Quick links:
  - Getting Started
  - Components (with categories)
  - Theme Builder
  - Accessibility

#### Header

- Logo/Title
- Global search
- Theme toggle (light/dark)
- GitHub link
- Version selector (future)

### 4. Code Display & Copy

#### Features

- Syntax highlighting (Prism.js or highlight.js)
- Copy to clipboard button
- Language indicator
- Line numbers (optional)
- Expand/collapse for long examples

### 5. Search Functionality

#### Search Scope

- Component names
- Component descriptions
- API property names
- Code examples
- Guide content

#### Search UI

- Global search in header
- Instant results dropdown
- Keyboard navigation (arrow keys, enter)
- Recent searches

---

## Technology Stack

### Dependencies to Add

```json
{
  "dependencies": {
    "@angular/router": "^20.x", // Already included
    "prismjs": "^1.29.0", // Syntax highlighting
    "clipboard": "^2.0.11" // Copy to clipboard
  },
  "devDependencies": {
    "@types/prismjs": "^1.26.0"
  }
}
```

### Libraries to Consider

- **Prism.js** - Syntax highlighting (lightweight, widely used)
- **Clipboard.js** - Copy to clipboard
- **Fuse.js** - Fuzzy search (optional, can implement simple search first)

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

**Goal**: Set up routing, navigation, and basic structure

- [ ] Set up Angular Router
- [ ] Create route structure
- [ ] Build sidebar navigation component
- [ ] Build header component
- [ ] Create page components (empty shells)
- [ ] Add basic styling/layout

**Deliverable**: Navigable documentation site structure

---

### Phase 2: Component Metadata & API Docs (Week 2)

**Goal**: Document all 36 components

- [ ] Create component metadata structure
- [ ] Document all 36 components:
  - Inputs, outputs, methods
  - Descriptions
  - Examples
- [ ] Build PropTable component
- [ ] Build ComponentDetail page
- [ ] Add syntax highlighting
- [ ] Add copy-to-clipboard functionality

**Deliverable**: Complete API documentation for all components

---

### Phase 3: Interactive Examples (Week 2-3)

**Goal**: Add interactive demos and code examples

- [ ] Create DemoContainer component
- [ ] Build interactive examples for each component
- [ ] Add "Edit in StackBlitz" links (optional)
- [ ] Create code example templates
- [ ] Add variant switchers (size, color, etc.)

**Deliverable**: Interactive component playground

---

### Phase 4: Theme Builder UI (Week 3-4)

**Goal**: Build complete theme builder

- [ ] Create theme builder page layout
- [ ] Build color picker components
- [ ] Build typography editor
- [ ] Build spacing/sizing editor
- [ ] Build component token override UI
- [ ] Create live preview panel
- [ ] Implement theme export (TS, CSS, JSON)
- [ ] Implement theme import
- [ ] Add preset themes (default, dark, custom)
- [ ] Add validation and error handling

**Deliverable**: Fully functional theme builder

---

### Phase 5: Search & Polish (Week 5)

**Goal**: Add search and polish the UX

- [ ] Implement global search
- [ ] Add search indexing
- [ ] Create search results UI
- [ ] Add keyboard shortcuts
- [ ] Improve mobile responsiveness
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Performance optimization

**Deliverable**: Production-ready documentation site

---

### Phase 6: Getting Started & Guides (Week 5-6)

**Goal**: Add guides and documentation

- [ ] Write installation guide
- [ ] Write usage guide
- [ ] Write theming guide
- [ ] Write accessibility guidelines
- [ ] Add contributing guide
- [ ] Create migration guides (if applicable)

**Deliverable**: Complete documentation

---

## Technical Considerations

### Component Metadata Approach

**Option A: Manual Metadata Files** ✅ Recommended

- Create a `component-metadata.ts` file with all component info
- Manually document each component
- Full control over documentation
- Easy to maintain
- No build-time magic

**Option B: Auto-generate from TypeScript**

- Use TypeScript Compiler API to extract metadata
- Complex setup
- May miss important context
- Harder to maintain

**Recommendation**: Start with Option A (manual). We have 36 components, it's manageable.

### Routing Strategy

Use **lazy loading** for better performance:

```typescript
{
  path: 'components/:category/:name',
  loadComponent: () => import('./pages/components/component-detail.component')
}
```

### State Management

**No state management library needed** - Use Angular signals:

- Current theme state (already have ThemeService)
- Search query
- Navigation state (open/closed sidebar)
- Theme builder state

### Performance Optimization

1. **Lazy load routes** - Don't load everything upfront
2. **Virtual scrolling** - For long component lists
3. **Code splitting** - Separate bundles for theme builder
4. **Image optimization** - Use WebP, lazy load images
5. **Memoization** - Cache expensive computations (theme previews)

---

## Design Considerations

### Visual Design

- Clean, modern interface
- Consistent with component design system
- Plenty of white space
- Clear typography hierarchy
- Smooth animations

### Mobile Responsive

- Collapsible sidebar (hamburger menu)
- Stacked layout on mobile
- Touch-friendly buttons
- Readable code blocks on small screens

### Accessibility

- Keyboard navigation throughout
- Focus indicators
- ARIA labels
- Screen reader announcements
- High contrast mode support

---

## Success Metrics

### Developer Experience

- Can find component API in < 30 seconds
- Can copy working code example in < 1 minute
- Can create custom theme in < 10 minutes

### Documentation Coverage

- 100% of component inputs documented
- 100% of component outputs documented
- At least 3 examples per component
- Accessibility notes for all interactive components

### Performance

- Initial page load < 2 seconds
- Route transitions < 500ms
- Theme preview updates < 100ms
- Search results < 200ms

---

## Decisions Made ✅

1. **Google Fonts Integration?** ✅ YES
   - Theme builder will support Google Fonts
   - Popular fonts pre-loaded, with search/filter
   - Preview fonts in real-time

2. **StackBlitz Integration?** ❌ NO (not at this time)
   - Can be added later if needed
   - Focus on core documentation first

3. **Theme Sharing via URL?** ❌ NO
   - Export/import files only
   - Simpler implementation

4. **Versioning?** ⏸️ DEFERRED
   - Support latest version only for now
   - Can add version selector in future

5. **Analytics?** ❌ NO
   - No tracking for now
   - Focus on functionality first

---

## Next Steps ✅ APPROVED

**Selected Approach**: Option 2 - Full Implementation (5-6 weeks)

1. ✅ **Plan reviewed and approved** - Decisions made on open questions
2. ✅ **Features prioritized** - Full feature set with Google Fonts integration
3. 🚀 **Starting Phase 1** - Set up routing and navigation structure
4. ⏭️ **Phase 2** - Create component metadata and API docs
5. ⏭️ **Phase 4** - Build theme builder with Google Fonts support

---

## Estimated Timeline

**Total: 5-6 weeks** (working full-time, single developer)

- Phase 1: 1 week
- Phase 2: 1 week
- Phase 3: 1 week
- Phase 4: 2 weeks (theme builder is complex)
- Phase 5: 1 week
- Phase 6: 1 week (can be done in parallel with other phases)

**Can be accelerated** by focusing on must-have features first and deferring nice-to-haves.

---

## Alternative: MVP Approach (2-3 weeks)

If we want to ship faster, here's an MVP:

### Must-Have (MVP)

- ✅ Basic routing and navigation
- ✅ Component API documentation (inputs/outputs)
- ✅ Code examples with syntax highlighting
- ✅ Basic theme builder (colors + typography)
- ✅ Export theme as TypeScript
- ✅ Installation guide

### Nice-to-Have (Later)

- ⏸️ Advanced search
- ⏸️ StackBlitz integration
- ⏸️ Component token overrides in theme builder
- ⏸️ Theme sharing via URL
- ⏸️ Multiple documentation versions
- ⏸️ Analytics

---

## Conclusion

This plan provides a comprehensive roadmap for building a professional documentation site with an integrated theme builder. The phased approach allows for incremental development and early feedback.

**Recommended Next Step**: Approve this plan (with any modifications) and begin Phase 1.
