/**
 * Context Menu Component
 *
 * A context menu that appears on right-click (contextmenu event).
 * Supports nested submenus, dividers, icons, and keyboard navigation.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ElementRef,
  inject,
  OnDestroy,
  Renderer2,
  afterNextRender,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  submenu?: ContextMenuItem[];
  shortcut?: string;
  [key: string]: any;
}

@Component({
  selector: 'ui-context-menu',
  imports: [NgClass],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-context-menu-wrapper]': 'true',
    '(document:click)': 'handleClickOutside($event)',
    '(keydown.escape)': 'handleEscape()',
    '(keydown)': 'handleKeyDown($event)',
    '(window:scroll)': 'handleScrollOrResize()',
    '(window:resize)': 'handleScrollOrResize()',
  },
})
export class ContextMenuComponent implements OnDestroy {
  /**
   * Menu items
   */
  readonly items = input.required<ContextMenuItem[]>();

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Item click event
   */
  readonly itemClick = output<ContextMenuItem>();

  /**
   * Context menu opened event
   */
  readonly opened = output<MouseEvent>();

  /**
   * Context menu closed event
   */
  readonly closed = output<void>();

  /**
   * Internal open state
   */
  protected readonly isOpen = signal(false);

  /**
   * Active submenu ID
   */
  protected readonly activeSubmenu = signal<string | null>(null);

  /**
   * Menu position
   */
  protected readonly menuPosition = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  /**
   * Computed CSS classes
   */
  protected readonly menuClasses = computed(() => ({
    'ui-context-menu': true,
    'ui-context-menu--open': this.isOpen(),
  }));

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * Stored unlisten function for the contextmenu Renderer2 listener.
   * Called in ngOnDestroy to prevent memory leaks.
   */
  private unlistenContextMenu?: () => void;

  constructor() {
    afterNextRender(() => {
      const contentElement = this.elementRef.nativeElement.querySelector(
        '.ui-context-menu-content'
      );
      if (contentElement) {
        this.unlistenContextMenu = this.renderer.listen(
          contentElement,
          'contextmenu',
          (event: MouseEvent) => {
            this.handleContextMenu(event);
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.unlistenContextMenu?.();
  }

  /**
   * Handle context menu event
   */
  protected handleContextMenu(event: MouseEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();

    const { clientX, clientY } = event;
    this.menuPosition.set({ x: clientX, y: clientY });

    this.isOpen.set(true);
    this.opened.emit(event);

    setTimeout(() => this.adjustMenuPosition(), 0);
  }

  /**
   * Close menu
   */
  protected close(): void {
    this.isOpen.set(false);
    this.activeSubmenu.set(null);
    this.closed.emit();
  }

  /**
   * Handle item click
   */
  protected handleItemClick(item: ContextMenuItem, event: Event): void {
    event.stopPropagation();

    if (item.disabled || item.divider) return;

    if (item.submenu && item.submenu.length > 0) {
      this.activeSubmenu.set(this.activeSubmenu() === item.id ? null : item.id);
    } else {
      this.itemClick.emit(item);
      this.close();
    }
  }

  /**
   * Check if submenu is active
   */
  protected isSubmenuActive(itemId: string): boolean {
    return this.activeSubmenu() === itemId;
  }

  /**
   * Click outside to close
   */
  protected handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;
    const menuElement = hostElement.querySelector('.ui-context-menu');

    if (menuElement && !menuElement.contains(target) && this.isOpen()) {
      this.close();
    }
  }

  /**
   * Handle escape key
   */
  protected handleEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  /**
   * Arrow key navigation (WAI-ARIA Menu pattern)
   * ArrowDown/ArrowUp: traverse items
   * ArrowRight: open submenu of focused item
   * ArrowLeft: close active submenu
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) return;

    event.preventDefault();
    const host = this.elementRef.nativeElement as HTMLElement;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        const inSubmenu = !!this.activeSubmenu();
        const containerSel = inSubmenu
          ? '.ui-context-menu-item--submenu-open > .ui-context-menu-submenu'
          : '.ui-context-menu-list';
        const container = host.querySelector<HTMLElement>(containerSel);
        if (!container) break;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            ':scope > .ui-context-menu-item:not(.ui-context-menu-item--disabled)'
          )
        );
        if (!focusable.length) break;
        const current = focusable.indexOf(document.activeElement as HTMLElement);
        const next =
          event.key === 'ArrowDown'
            ? (current + 1) % focusable.length
            : (current - 1 + focusable.length) % focusable.length;
        focusable[next]?.focus();
        break;
      }
      case 'ArrowRight': {
        const focused = document.activeElement as HTMLElement;
        const itemId = focused?.getAttribute('data-item-id');
        if (!itemId) break;
        const item = this.items().find((i) => i.id === itemId);
        if (item?.submenu?.length) {
          this.activeSubmenu.set(itemId);
          requestAnimationFrame(() => {
            const first = host.querySelector<HTMLElement>(
              '.ui-context-menu-item--submenu-open > .ui-context-menu-submenu .ui-context-menu-item:not(.ui-context-menu-item--disabled)'
            );
            first?.focus();
          });
        }
        break;
      }
      case 'ArrowLeft': {
        if (this.activeSubmenu()) {
          const parentItem = host.querySelector<HTMLElement>('.ui-context-menu-item--submenu-open');
          this.activeSubmenu.set(null);
          requestAnimationFrame(() => parentItem?.focus());
        }
        break;
      }
    }
  }

  /**
   * Update position on scroll/resize
   */
  protected handleScrollOrResize(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  /**
   * Adjust menu position to stay within viewport
   */
  private adjustMenuPosition(): void {
    const hostElement = this.elementRef.nativeElement;
    const menuElement = hostElement.querySelector('.ui-context-menu') as HTMLElement;
    if (!menuElement) return;

    const menuRect = menuElement.getBoundingClientRect();
    const pos = this.menuPosition();
    let { x, y } = pos;

    if (menuRect.right > window.innerWidth) {
      x = window.innerWidth - menuRect.width - 8;
    }

    if (menuRect.bottom > window.innerHeight) {
      y = window.innerHeight - menuRect.height - 8;
    }

    if (x < 8) {
      x = 8;
    }

    if (y < 8) {
      y = 8;
    }

    if (x !== pos.x || y !== pos.y) {
      this.menuPosition.set({ x, y });
    }
  }
}
