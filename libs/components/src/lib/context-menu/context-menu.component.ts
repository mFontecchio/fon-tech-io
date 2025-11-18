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
  HostListener,
  Renderer2,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-context-menu-wrapper]': 'true',
  },
})
export class ContextMenuComponent {
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

  /**
   * Computed menu styles
   */
  protected readonly menuStyles = computed(() => {
    const pos = this.menuPosition();
    return {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
    };
  });

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    afterNextRender(() => {
      // Set up context menu listener on the content area
      const contentElement = this.elementRef.nativeElement.querySelector(
        '.ui-context-menu-content'
      );
      if (contentElement) {
        this.renderer.listen(contentElement, 'contextmenu', (event: MouseEvent) => {
          this.handleContextMenu(event);
        });
      }
    });
  }

  /**
   * Handle context menu event
   */
  protected handleContextMenu(event: MouseEvent): void {
    if (this.disabled()) return;

    event.preventDefault();
    event.stopPropagation();

    // Calculate position
    const { clientX, clientY } = event;
    this.menuPosition.set({ x: clientX, y: clientY });

    // Open menu
    this.isOpen.set(true);
    this.opened.emit(event);

    // Adjust position if menu goes off-screen
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
    const menuElement = hostElement.querySelector('.ui-context-menu');

    if (menuElement && !menuElement.contains(target) && this.isOpen()) {
      this.close();
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
   * Update position on scroll/resize
   */
  @HostListener('window:scroll')
  @HostListener('window:resize')
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

    // Check right edge
    if (menuRect.right > window.innerWidth) {
      x = window.innerWidth - menuRect.width - 8;
    }

    // Check bottom edge
    if (menuRect.bottom > window.innerHeight) {
      y = window.innerHeight - menuRect.height - 8;
    }

    // Check left edge
    if (x < 8) {
      x = 8;
    }

    // Check top edge
    if (y < 8) {
      y = 8;
    }

    // Update position if adjusted
    if (x !== pos.x || y !== pos.y) {
      this.menuPosition.set({ x, y });
    }
  }
}
