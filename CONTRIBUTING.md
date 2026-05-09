# Contributing to UI Component Suite

Thank you for your interest in contributing. This document describes how to report issues, propose changes, and submit pull requests.

---

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating you agree to uphold its standards.

---

## Reporting Issues

Use the GitHub Issues tab. Choose the appropriate template:

- **Bug report** — for defects in existing components or the theming system
- **Feature request** — for new components, API additions, or enhancements

Please search existing issues before opening a new one.

---

## Development Setup

**Requirements**: Node.js 22, pnpm 10.9.0

```bash
# Clone and install
git clone https://github.com/mFontecchio/fon-tech-io.git
cd fon-tech-io
pnpm install

# Start the showcase app
pnpm start

# Start the theme builder app
pnpm start:theme-builder
```

---

## Branch Naming

| Type | Pattern | Example |
|---|---|---|
| Bug fix | `fix/<short-description>` | `fix/button-focus-ring` |
| Feature | `feat/<short-description>` | `feat/stepper-vertical` |
| Refactor | `refactor/<short-description>` | `refactor/tabs-signal-api` |
| Documentation | `docs/<short-description>` | `docs/slider-readme` |
| Chore | `chore/<short-description>` | `chore/bump-angular-20` |

Always branch from `main`.

---

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject line (~50 chars)

Optional body explaining what and why (wrap at 72 chars).
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
```
feat(button): add loading spinner slot
fix(tabs): correct indicator position in vertical orientation
docs(slider): add range mode usage example
```

---

## Code Standards

### Angular Components

All components must follow these patterns (see `libs/components/src/lib/button/` as reference):

- **Standalone** with `ChangeDetectionStrategy.OnPush`
- **Signals API**: use `input()`, `output()`, `computed()`, `signal()` — never `@Input` / `@Output` decorators
- **Template control flow**: use `@if`, `@for`, `@switch` — never `*ngIf`, `*ngFor`, `*ngSwitch`
- **Separate files**: `.ts`, `.html`, `.css` — no inline templates or styles
- **Class prefix**: `ui-` for all CSS class names

### Styling

- Reference design tokens exclusively — never hardcode colors, spacing, or transition values
- Token hierarchy: `var(--primitive-*)` → `var(--semantic-*)` → `var(--component-*)`
- Hardcoded `transition: 0.2s ease` is not acceptable — use `var(--animation-duration-normal)` etc.

### Accessibility

Every interactive component requires:

- Appropriate ARIA roles and attributes (`aria-label`, `aria-disabled`, `aria-expanded`, etc.)
- Keyboard navigation (arrow keys, Enter, Space, Escape as appropriate)
- `focus-visible` outline styles
- WCAG 2.1 AA compliance minimum

### TypeScript

- Strict mode is enforced — no `any` types
- Explicitly type all function parameters and return values
- Use `readonly` for component input properties
- Use `interface` for object shapes, `type` for unions/intersections
- All public APIs require JSDoc / TSDoc comments

---

## Build Order

Libraries have strict dependency ordering. Always build in sequence:

```bash
pnpm run build:theming    # 1 — base design system
pnpm run build:shared     # 2 — utilities
pnpm run build:components # 3 — component library
pnpm run build:theme-builder # 4 — theme builder UI
```

Or build all at once: `pnpm run build:libs`

---

## Pull Request Process

1. Fork the repository and create a branch from `main` using the naming convention above.
2. Make your changes, ensuring all code standards are met.
3. Update `CHANGELOG.md` under `[Unreleased]` with a clear description of the change.
4. Ensure `pnpm lint` and `pnpm test` pass locally.
5. Open a pull request against `main` using the provided template.
6. Address any review feedback. All conversations must be resolved before merge.
7. A maintainer will squash-merge approved pull requests.

Pull requests that do not follow this process or do not pass CI checks will not be merged.

---

## Adding a New Component

1. Create the component directory: `libs/components/src/lib/<component-name>/`
2. Add four files: `*.component.ts`, `*.component.html`, `*.component.css`, `README.md`
3. Export from `libs/components/src/index.ts`
4. Add a demo page in `apps/showcase/src/app/pages/components/`
5. Update `CHANGELOG.md`

Refer to the [Architecture Guide](.github/copilot-instructions.md) for full implementation details.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
