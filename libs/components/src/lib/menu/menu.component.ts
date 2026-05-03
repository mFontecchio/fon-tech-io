/**
 * Menu Component
 *
 * A versatile menu component for dropdowns and context menus.
 * Supports nested submenus, dividers, and keyboard navigation.
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
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  submenu?: MenuItem[];
  [key: string]: any;
}

export type MenuPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

@Component({
  selector: 'ui-menu',
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-menu-wrapper]': 'true',
    '(document:click)': 'handleClickOutside($event)',
    '(window:scroll)': 'handleScrollOrResize()',
    '(window:resize)': 'handleScrollOrResize()',
    '(keydown.escape)': 'handleEscape()',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class MenuComponent {
  /**
   * Menu items
   */
  readonly items = input.required<MenuItem[]>();

  /**
   * Menu position relative to trigger
   */
  readonly position = input<MenuPosition>('bottom-left');

  /**
   * Open state
   */
  readonly open = input<boolean>(false);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Open state change event
   */
  readonly openChange = output<boolean>();

  /**
   * Item click event
   */
  readonly itemClick = output<MenuItem>();

  /**
   * Internal open state
   */
  protected readonly isOpen = signal(false);

  /**
   * Active submenu ID
   */
  protected readonly activeSubmenu = signal<string | null>(null);

  /**
   * Computed CSS classes
   */
  protected readonly menuClasses = computed(() => ({
    'ui-menu': true,
    [`ui-menu--${this.position()}`]: true,
    'ui-menu--open': this.isOpen(),
  }));

  private elementRef = inject(ElementRef);

  /**
   * Toggle menu
   */
  protected toggle(): void {
    if (this.disabled()) return;

    const newState = !this.isOpen();
    this.isOpen.set(newState);

    if (newState) {
      this.updatePosition();
    }

    this.openChange.emit(newState);
  }

  /**
   * Close menu
   */
  protected close(): void {
    this.isOpen.set(false);
    this.activeSubmenu.set(null);
    this.openChange.emit(false);
  }

  /**
   * Handle item click
   */
  protected handleItemClick(item: MenuItem, event: Event): void {
    event.stopPropagation();

    if (item.disabled || item.divider) return;

    if (item.submenu && item.submenu.length > 0) {
      // Toggle submenu
      this.activeSubmenu.set(this.activeSubmenu() === item.id ? null : item.id);
    } else {
      // Emit click event and close menu
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

    if (!hostElement.contains(target) && this.isOpen()) {
      this.close();
    }
  }

  /**
   * Update position on scroll
   */
  protected handleScrollOrResize(): void {
    if (this.isOpen()) {
      this.updatePosition();
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
   * ArrowDown/ArrowUp: traverse enabled items
   * ArrowRight: open submenu of focused item
   * ArrowLeft: close active submenu
   * Home/End: jump to first/last item
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const host = this.elementRef.nativeElement as HTMLElement;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        const inSubmenu = !!this.activeSubmenu();
        const containerSel = inSubmenu
          ? '.ui-menu-item--submenu-open > .ui-menu-submenu'
          : '.ui-menu-list';
        const container = host.querySelector<HTMLElement>(containerSel);
        if (!container) break;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            ':scope > .ui-menu-item:not(.ui-menu-item--disabled)'
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
      case 'Home': {
        const items = host.querySelectorAll<HTMLElement>(
          '.ui-menu-list > .ui-menu-item:not(.ui-menu-item--disabled)'
        );
        (items[0] as HTMLElement | undefined)?.focus();
        break;
      }
      case 'End': {
        const items = host.querySelectorAll<HTMLElement>(
          '.ui-menu-list > .ui-menu-item:not(.ui-menu-item--disabled)'
        );
        (items[items.length - 1] as HTMLElement | undefined)?.focus();
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
              '.ui-menu-item--submenu-open > .ui-menu-submenu .ui-menu-item:not(.ui-menu-item--disabled)'
            );
            first?.focus();
          });
        }
        break;
      }
      case 'ArrowLeft': {
        if (this.activeSubmenu()) {
          const parentItem = host.querySelector<HTMLElement>('.ui-menu-item--submenu-open');
          this.activeSubmenu.set(null);
          requestAnimationFrame(() => parentItem?.focus());
        }
        break;
      }
    }
  }

  /**
   * Update menu position
   */
  private updatePosition(): void {
    const hostElement = this.elementRef?.nativeElement;
    if (!hostElement) return;

    const trigger = hostElement.querySelector('.ui-menu-trigger');
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const position = this.position();
    const gap = 4;

    hostElement.style.setProperty('--ui-menu-top', 'auto');
    hostElement.style.setProperty('--ui-menu-left', 'auto');
    hostElement.style.setProperty('--ui-menu-right', 'auto');
    hostElement.style.setProperty('--ui-menu-bottom', 'auto');

    switch (position) {
      case 'bottom-left':
        hostElement.style.setProperty('--ui-menu-top', `${rect.bottom + gap}px`);
        hostElement.style.setProperty('--ui-menu-left', `${rect.left}px`);
        break;
      case 'bottom-right':
        hostElement.style.setProperty('--ui-menu-top', `${rect.bottom + gap}px`);
        hostElement.style.setProperty('--ui-menu-right', `${window.innerWidth - rect.right}px`);
        break;
      case 'top-left':
        hostElement.style.setProperty(
          '--ui-menu-bottom',
          `${window.innerHeight - rect.top + gap}px`
        );
        hostElement.style.setProperty('--ui-menu-left', `${rect.left}px`);
        break;
      case 'top-right':
        hostElement.style.setProperty(
          '--ui-menu-bottom',
          `${window.innerHeight - rect.top + gap}px`
        );
        hostElement.style.setProperty('--ui-menu-right', `${window.innerWidth - rect.right}px`);
        break;
    }
  }
}
