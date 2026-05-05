# Context Menu Component

A context menu component that appears on right-click (contextmenu event). Supports nested submenus, dividers, icons, keyboard shortcuts, and full keyboard navigation.

## Features

- Right-click activation
- Nested submenus
- Icons and keyboard shortcuts
- Dividers for grouping
- Automatic viewport boundary detection
- Keyboard navigation (Arrow keys, Enter, Escape)
- Accessibility support (ARIA attributes, screen reader friendly)
- Smooth animations with Material Design easing
- Reduced motion support
- OnPush change detection for optimal performance

## Usage

### Basic Example

```typescript
import { Component, signal } from '@angular/core';
import { ContextMenuComponent, ContextMenuItem } from '@ui-suite/components';

@Component({
  selector: 'app-example',
  imports: [ContextMenuComponent],
  template: `
    <ui-context-menu [items]="menuItems()" (itemClick)="handleMenuClick($event)">
      <div class="content">Right-click anywhere in this area to open the context menu</div>
    </ui-context-menu>
  `,
})
export class ExampleComponent {
  readonly menuItems = signal<ContextMenuItem[]>([
    { id: 'cut', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X' },
    { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
    { id: 'paste', label: 'Paste', icon: '📄', shortcut: 'Ctrl+V' },
    { id: 'divider-1', divider: true },
    { id: 'delete', label: 'Delete', icon: '🗑️', shortcut: 'Del' },
  ]);

  handleMenuClick(item: ContextMenuItem): void {
    console.log('Menu item clicked:', item.id);
  }
}
```

### With Submenus

```typescript
readonly menuItems = signal<ContextMenuItem[]>([
  {
    id: 'file',
    label: 'File',
    icon: '📁',
    submenu: [
      { id: 'new', label: 'New File', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open', shortcut: 'Ctrl+O' },
      { id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
    ]
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: '✏️',
    submenu: [
      { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z' },
      { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Y' },
    ]
  },
]);
```

### With Disabled Items

```typescript
readonly menuItems = signal<ContextMenuItem[]>([
  { id: 'enabled', label: 'Enabled Action' },
  { id: 'disabled', label: 'Disabled Action', disabled: true },
  { id: 'divider-1', divider: true },
  { id: 'another', label: 'Another Action' },
]);
```

### Event Handling

```typescript
<ui-context-menu
  [items]="menuItems()"
  (itemClick)="handleItemClick($event)"
  (opened)="handleOpened($event)"
  (closed)="handleClosed()"
>
  <div>Right-click me</div>
</ui-context-menu>
```

```typescript
handleItemClick(item: ContextMenuItem): void {
  console.log('Item clicked:', item);

  switch (item.id) {
    case 'cut':
      // Handle cut
      break;
    case 'copy':
      // Handle copy
      break;
    // ... more cases
  }
}

handleOpened(event: MouseEvent): void {
  console.log('Context menu opened at:', event.clientX, event.clientY);
}

handleClosed(): void {
  console.log('Context menu closed');
}
```

## API

### Inputs

| Input      | Type                | Default      | Description                          |
| ---------- | ------------------- | ------------ | ------------------------------------ |
| `items`    | `ContextMenuItem[]` | **required** | Array of menu items to display       |
| `disabled` | `boolean`           | `false`      | Whether the context menu is disabled |

### Outputs

| Output      | Type              | Description                          |
| ----------- | ----------------- | ------------------------------------ |
| `itemClick` | `ContextMenuItem` | Emitted when a menu item is clicked  |
| `opened`    | `MouseEvent`      | Emitted when the context menu opens  |
| `closed`    | `void`            | Emitted when the context menu closes |

### ContextMenuItem Interface

```typescript
interface ContextMenuItem {
  id: string; // Unique identifier
  label: string; // Display text
  icon?: string; // Optional icon (emoji or text)
  disabled?: boolean; // Whether item is disabled
  divider?: boolean; // Whether this is a divider
  submenu?: ContextMenuItem[]; // Nested menu items
  shortcut?: string; // Keyboard shortcut display
  [key: string]: any; // Additional custom properties
}
```

## Accessibility

### ARIA Attributes

- `role="menu"` - Menu container
- `role="menuitem"` - Menu items
- `role="separator"` - Dividers
- `aria-disabled` - Disabled state
- `aria-haspopup` - Indicates presence of submenu
- `aria-expanded` - Submenu open state
- `aria-label` - Keyboard shortcut descriptions

### Keyboard Navigation

- **Right-click** - Open context menu at cursor position
- **Escape** - Close menu
- **Enter/Space** - Activate menu item
- **Arrow Keys** - Navigate between items
- **Tab** - Move focus within menu

### Screen Reader Support

- All menu items are properly labeled
- Disabled state is announced
- Keyboard shortcuts are announced
- Submenu indicators are announced

## Styling

The component uses design tokens for all styling:

```css
/* Token categories used */
--semantic-surface-card
--semantic-border-default
--semantic-text-primary
--semantic-text-secondary
--primitive-spacing-*
--primitive-border-radius-*
--primitive-shadow-lg
```

### Custom Styling

You can override styles using CSS:

```css
::ng-deep .ui-context-menu {
  min-width: 15rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

::ng-deep .ui-context-menu-item {
  padding: 0.75rem 1rem;
}
```

## Best Practices

1. **Use meaningful IDs**: Each menu item should have a unique, descriptive ID
2. **Provide keyboard shortcuts**: Display common shortcuts for better UX
3. **Group related items**: Use dividers to separate logical groups
4. **Limit nesting**: Avoid deep submenu hierarchies (max 2 levels recommended)
5. **Handle disabled state**: Disable items that aren't applicable to current context
6. **Provide feedback**: Show visual feedback when actions are performed
7. **Keep labels concise**: Use short, action-oriented labels
8. **Use icons sparingly**: Icons should enhance recognition, not clutter

## Examples

### File Explorer Context Menu

```typescript
readonly fileMenuItems = signal<ContextMenuItem[]>([
  { id: 'open', label: 'Open', shortcut: 'Enter' },
  { id: 'open-with', label: 'Open With', submenu: [
    { id: 'notepad', label: 'Notepad' },
    { id: 'vscode', label: 'VS Code' },
    { id: 'other', label: 'Choose another app...' }
  ]},
  { id: 'divider-1', divider: true },
  { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
  { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V', disabled: true },
  { id: 'divider-2', divider: true },
  { id: 'rename', label: 'Rename', shortcut: 'F2' },
  { id: 'delete', label: 'Delete', shortcut: 'Del' },
  { id: 'divider-3', divider: true },
  { id: 'properties', label: 'Properties', shortcut: 'Alt+Enter' },
]);
```

### Text Editor Context Menu

```typescript
readonly editorMenuItems = signal<ContextMenuItem[]>([
  { id: 'cut', label: 'Cut', icon: '✂️', shortcut: 'Ctrl+X' },
  { id: 'copy', label: 'Copy', icon: '📋', shortcut: 'Ctrl+C' },
  { id: 'paste', label: 'Paste', icon: '📄', shortcut: 'Ctrl+V' },
  { id: 'divider-1', divider: true },
  { id: 'select-all', label: 'Select All', shortcut: 'Ctrl+A' },
  { id: 'divider-2', divider: true },
  {
    id: 'format',
    label: 'Format',
    submenu: [
      { id: 'bold', label: 'Bold', shortcut: 'Ctrl+B' },
      { id: 'italic', label: 'Italic', shortcut: 'Ctrl+I' },
      { id: 'underline', label: 'Underline', shortcut: 'Ctrl+U' },
    ]
  },
]);
```

## Related Components

- **Menu** - Dropdown menu with trigger button
- **Popover** - Floating content container
- **Tooltip** - Hover information display

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance

- Uses OnPush change detection
- Signals for reactive state management
- Lazy rendering (menu only exists in DOM when open)
- Efficient event handling with HostListeners
- No unnecessary re-renders
