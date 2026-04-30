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
  HostListener,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

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
  imports: [NgClass, NgStyle],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-menu-wrapper]': 'true',
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
   * Dynamic position styles
   */
  protected readonly menuStyles = signal<Record<string, string>>({});

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
  @HostListener('document:click', ['$event'])
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
  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected handleScrollOrResize(): void {
    if (this.isOpen()) {
      this.updatePosition();
    }
  }

  /**
   * Handle escape key
   */
  @HostListener('keydown.escape')
  protected handleEscape(): void {
    if (this.isOpen()) {
      this.close();
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

    const styles: Record<string, string> = {};

    switch (position) {
      case 'bottom-left':
        styles['top'] = `${rect.bottom + gap}px`;
        styles['left'] = `${rect.left}px`;
        break;
      case 'bottom-right':
        styles['top'] = `${rect.bottom + gap}px`;
        styles['right'] = `${window.innerWidth - rect.right}px`;
        break;
      case 'top-left':
        styles['bottom'] = `${window.innerHeight - rect.top + gap}px`;
        styles['left'] = `${rect.left}px`;
        break;
      case 'top-right':
        styles['bottom'] = `${window.innerHeight - rect.top + gap}px`;
        styles['right'] = `${window.innerWidth - rect.right}px`;
        break;
    }

    this.menuStyles.set(styles);
  }
}
