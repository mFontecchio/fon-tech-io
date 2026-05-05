## Plan: Fix 5 Component Bugs

Resolve five isolated visual/behavioral defects found during dark-mode and interaction testing of the Angular component library.

**Steps**

1. **Tooltip dark mode background** (`tooltip.component.css`)
   Delete the entire `@media (prefers-color-scheme: dark)` block that hardcodes `background-color: rgba(255,255,255,0.95)` on `.ui-tooltip-content` and `.ui-tooltip-arrow`. The `--component-tooltip-background` and `--component-tooltip-text` design tokens already handle dark mode via ThemeService; the media query overrides them incorrectly.

2. **Accordion panels never fully collapse** (`accordion.component.html` + `accordion.component.css`)
   The CSS grid-collapse trick (`grid-template-rows: 0fr`) requires the direct child element to collapse to zero. `.ui-accordion-content` has `min-height: 0` but also has `padding: 16px 20px`, which prevents the box from shrinking below ~32px and leaves a permanent visible gap on every "collapsed" item.
   - In `accordion.component.html`, wrap `<ng-content></ng-content>` inside `.ui-accordion-content` with a new `<div class="ui-accordion-content-body">`.
   - In `accordion.component.css`, remove `padding` from `.ui-accordion-content` and add a new `.ui-accordion-content-body { padding: var(--primitive-spacing-4) var(--primitive-spacing-5); }` rule.

3. **Input prefix/suffix icons wrong color in dark mode** (`input.component.html` + `input.component.css`)
   The current implementation uses `::ng-deep [prefix]` / `::ng-deep [suffix]` (explicitly banned by project standards) and may not cascade `color` reliably to slotted SVG content.
   - In `input.component.html`, replace bare `<ng-content select="[prefix]" />` with `<span class="ui-input-prefix"><ng-content select="[prefix]" /></span>` and `<ng-content select="[suffix]" />` with `<span class="ui-input-suffix"><ng-content select="[suffix]" /></span>`.
   - In `input.component.css`, replace both `::ng-deep` rules with direct `.ui-input-prefix` / `.ui-input-suffix` rules carrying the same property values (`display: flex; align-items: center; color: var(--semantic-text-secondary); font-size: var(--primitive-font-size-sm); flex-shrink: 0;`) and their respective padding rules.

4. **Toast notification has no dismiss animation** (`toast.component.ts` + `toast.component.css`)
   `handleDismiss()` immediately emits `dismissed`, removing the element from the DOM with no animation. No exit keyframes exist.
   - In `toast.component.ts`, add `protected readonly isDismissing = signal(false);`. Add `'ui-toast--dismissing': this.isDismissing()` to `toastClasses()`. Update `handleDismiss()` to set `this.isDismissing.set(true)` then call `window.setTimeout(() => this.dismissed.emit(), 250)` to allow the animation to complete.
   - In `toast.component.css`, add `@keyframes ui-toast-exit { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-1rem); } }` and `.ui-toast--dismissing { animation: ui-toast-exit 250ms var(--semantic-animation-easing-accelerate, cubic-bezier(0.4, 0, 1, 1)) forwards; }`. Add a `prefers-reduced-motion` override that sets animation duration to 1ms.

5. **Spinner jitters instead of smooth animation** (`spinner.component.css`)
   `.ui-spinner-path` has `transform-origin: center` but the path only animates `stroke-dasharray`/`stroke-dashoffset` — no transform. This stray property interacts badly with the outer SVG's rotation and prevents compositor hoisting. The outer `.ui-spinner` also lacks `will-change: transform`.
   - Remove `transform-origin: center` from `.ui-spinner-path`.
   - Add `will-change: transform` to `.ui-spinner`.

**Relevant files**
- `libs/components/src/lib/tooltip/tooltip.component.css`
- `libs/components/src/lib/accordion/accordion.component.html`
- `libs/components/src/lib/accordion/accordion.component.css`
- `libs/components/src/lib/input/input.component.html`
- `libs/components/src/lib/input/input.component.css`
- `libs/components/src/lib/toast/toast.component.ts`
- `libs/components/src/lib/toast/toast.component.css`
- `libs/components/src/lib/spinner/spinner.component.css`

**Verification**
1. `pnpm exec tsc --project libs/components/tsconfig.lib.json --noEmit` — zero errors after all changes.
2. Dark mode: tooltip shows dark background with light text (no white flash).
3. Accordion: clicking a header fully collapses the panel to 0px height with no padding gap visible.
4. Input with prefix/suffix icon: icon color matches `--semantic-text-secondary` and adapts correctly in both light and dark modes.
5. Toast: clicking dismiss triggers a slide-fade-out animation before the element is removed.
6. Spinner: no visible stutter observed after 5+ seconds of continuous spinning.

**Decisions**
- No new design tokens are needed; existing semantic tokens cover all cases.
- `::ng-deep` is removed and not reintroduced; standard scoped classes replace it per project standards.
- Toast dismiss delay (250ms) matches the existing `ui-toast-enter` duration to maintain symmetry.
- Accordion fix is a two-file change but both files must be updated together; applying only the HTML change or only the CSS change will break layout.
- High-contrast and reduced-motion overrides must be preserved or added alongside each fix.

**Further Considerations**
1. The tooltip fix removes OS-level dark mode awareness entirely. If a future requirement calls for tooltip appearance that differs between OS dark mode and theme dark mode, a separate component token (`--component-tooltip-background-dark`) should be introduced rather than restoring the media query.
2. The toast `isDismissing` signal approach assumes the parent removes the host element on `dismissed`. If any showcase or consumer re-uses toasts without removing them, add a reset: `this.isDismissing.set(false)` at the start of `handleDismiss()` to allow re-triggering.
3. Other components that use `::ng-deep` for slotted content (e.g., select, date-picker) should be audited separately for the same icon color problem.
