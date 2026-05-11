# Dock

A taskbar-style navigation bar fixed to a viewport edge. Supports `top`, `right`, `bottom`, and `left` positions with automatic horizontal/vertical layout switching. Child items accept projected icon content and support badge counts, active indicators, and disabled states. Provides full ARIA toolbar keyboard navigation.

## Selectors

- `fui-dock` — the container toolbar bar
- `fui-dock-item` — an individual dock item

## Import

```typescript
import { DockComponent, DockItemComponent } from '@mfontecchio/components';
```

## Minimal Usage

```html
<fui-dock position="bottom">
  <fui-dock-item label="Home" [active]="true">
    <!-- project any icon here: SVG, img, or icon component -->
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  </fui-dock-item>

  <fui-dock-item label="Notifications" [badge]="unreadCount">
    <!-- icon -->
  </fui-dock-item>

  <fui-dock-item label="Settings" [disabled]="true">
    <!-- icon -->
  </fui-dock-item>
</fui-dock>
```

> **Layout note:** The dock uses `position: fixed` and spans the full length of the chosen edge. Add padding to your page layout matching the dock's width or height to prevent content from being hidden behind it.

---

## API Reference

### `DockComponent` (`fui-dock`)

#### Inputs

| Name       | Type                                      | Default    | Description                                                  |
|------------|-------------------------------------------|------------|--------------------------------------------------------------|
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` | Viewport edge the dock attaches to. Controls orientation and border radius styling. |

#### Content Projection

| Slot             | Description                                                   |
|------------------|---------------------------------------------------------------|
| `fui-dock-item`  | Project one or more `fui-dock-item` components as dock items. |

---

### `DockItemComponent` (`fui-dock-item`)

#### Inputs

| Name        | Type                          | Default     | Description                                                                 |
|-------------|-------------------------------|-------------|-----------------------------------------------------------------------------|
| `label`     | `string`                      | **required**| Text label shown beneath (horizontal) or beside (vertical) the icon.        |
| `badge`     | `number \| string \| undefined` | `undefined` | Badge bubble value. Numbers above 99 display as `99+`.                    |
| `active`    | `boolean`                     | `false`     | Highlights the item as the active/selected entry.                           |
| `disabled`  | `boolean`                     | `false`     | Prevents interaction and dims the item.                                     |
| `ariaLabel` | `string \| undefined`         | `undefined` | Accessible label override. Falls back to `label` when not provided.         |

#### Outputs

| Name        | Type         | Description                                                              |
|-------------|--------------|--------------------------------------------------------------------------|
| `itemClick` | `MouseEvent` | Emitted on click or keyboard activation. Suppressed when `disabled`.     |

#### Content Projection

| Slot       | Description                                                          |
|------------|----------------------------------------------------------------------|
| (default)  | Project any icon element — SVG, `<img>`, or an icon component.       |

---

## Keyboard Navigation

The dock implements the ARIA toolbar keyboard interaction pattern.

| Key                      | Behavior                                                        |
|--------------------------|-----------------------------------------------------------------|
| `ArrowLeft` / `ArrowRight` | Move focus between items (horizontal dock — top/bottom position) |
| `ArrowUp` / `ArrowDown`  | Move focus between items (vertical dock — left/right position)  |
| `Home`                   | Move focus to the first enabled item                            |
| `End`                    | Move focus to the last enabled item                             |
| `Enter` / `Space`        | Activate the focused item (native button behavior)              |
| `Tab`                    | Exit the dock and follow normal document focus order            |

---

## Accessibility

- `role="toolbar"` on the `fui-dock` host element
- `aria-orientation` reflects `"horizontal"` or `"vertical"` based on position
- `aria-label="Application dock"` on the container (override via CSS custom property or subclass if needed)
- `aria-current="true"` on the active item button
- `aria-disabled="true"` on disabled item buttons
- `aria-hidden="true"` on badge bubble elements (badge value is included in the button's `aria-label`)
- `focus-visible` outline on keyboard focus for all item buttons
- Disabled items are excluded from keyboard navigation

---

## Design Tokens

Override these CSS custom properties to restyle the dock without modifying component internals. Set overrides on a parent element or `:root`.

### Container

| Token                        | Default value                        | Description                           |
|------------------------------|--------------------------------------|---------------------------------------|
| `--component-dock-background`| `var(--semantic-surface-card)`       | Dock bar background color             |
| `--component-dock-border`    | `var(--semantic-border-subtle)`      | Dock bar border color                 |
| `--component-dock-padding`   | `var(--primitive-spacing-2)`         | Internal padding of the dock bar      |
| `--component-dock-gap`       | `var(--primitive-spacing-1)`         | Gap between dock items                |

### Items

| Token                                    | Default value                        | Description                            |
|------------------------------------------|--------------------------------------|----------------------------------------|
| `--component-dock-item-size`             | `3rem`                               | Item button width (or height for vertical) |
| `--component-dock-item-padding`          | `var(--primitive-spacing-2)`         | Item button internal padding           |
| `--component-dock-item-border-radius`    | `var(--primitive-border-radius-md)`  | Item button border radius              |
| `--component-dock-item-color`            | `var(--semantic-text-secondary)`     | Default icon and label color           |
| `--component-dock-item-active-color`     | `var(--semantic-brand-primary)`      | Icon and label color when active       |
| `--component-dock-item-hover-background` | `var(--semantic-state-hover)`        | Background color on hover              |
| `--component-dock-item-disabled-opacity` | `0.5`                                | Opacity applied to disabled items      |

### Active Indicator

| Token                                     | Default value                        | Description                            |
|-------------------------------------------|--------------------------------------|----------------------------------------|
| `--component-dock-active-indicator-color` | `var(--semantic-brand-primary)`      | Active indicator dot color             |
| `--component-dock-active-indicator-size`  | `3px`                                | Active indicator dot size              |

### Badge

| Token                              | Default value                        | Description                            |
|------------------------------------|--------------------------------------|----------------------------------------|
| `--component-dock-badge-background`| `var(--semantic-feedback-error)`     | Badge bubble background color          |
| `--component-dock-badge-color`     | `var(--semantic-text-inverse)`       | Badge bubble text color                |
| `--component-dock-badge-size`      | `1.125rem`                           | Badge bubble minimum width and height  |
| `--component-dock-badge-font-size` | `var(--primitive-font-size-xs)`      | Badge bubble font size                 |

### Label

| Token                              | Default value                        | Description                            |
|------------------------------------|--------------------------------------|----------------------------------------|
| `--component-dock-label-font-size` | `var(--primitive-font-size-xs)`      | Label text font size                   |
| `--component-dock-label-color`     | `var(--semantic-text-secondary)`     | Label text color                       |

---

## Best Practices

- Add padding to your page layout matching the dock's size to prevent content from being hidden behind it (e.g., `padding-bottom: 5rem` for a bottom dock).
- Keep dock items to 5–7 maximum for optimal usability on small screens.
- Always provide a meaningful `label` for each item — it is also used as the accessible button label.
- Set `badge` only for genuinely actionable notifications to avoid notification fatigue.
- Bind `[active]` to the item corresponding to the current route or application state.
- Provide a custom `ariaLabel` input when the default label text is not sufficient for screen reader context.
- Avoid placing two docks on the same viewport edge.
- Guard the component with `isPlatformBrowser()` in SSR applications, as the dock uses `position: fixed` and reads `document.activeElement` for keyboard navigation.

---

## SSR Compatibility

| Concern             | Status                                                                 |
|---------------------|------------------------------------------------------------------------|
| Server rendering    | Not safe — uses `position: fixed` and `document.activeElement`         |
| Keyboard navigation | Browser-only (`document.activeElement`)                                |
| Mitigation          | Wrap in `@if (isBrowser)` or use `isPlatformBrowser()` from `@angular/common` |

---

## Related Components

- [Navbar](../navbar/README.md) — top-of-page navigation bar with link list and mobile toggle
- [Menu](../menu/README.md) — floating dropdown menu triggered by a button
