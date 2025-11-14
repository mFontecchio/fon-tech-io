/**
 * Drawer Component
 * 
 * A slide-in panel component that appears from the edge of the screen.
 * Supports left, right, top, and bottom positions with overlay backdrop.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  effect,
  signal,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'ui-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-drawer-host]': 'true',
  },
})
export class DrawerComponent {
  /**
   * Open state
   */
  readonly open = input<boolean>(false);

  /**
   * Drawer position
   */
  readonly position = input<DrawerPosition>('right');

  /**
   * Drawer size
   */
  readonly size = input<DrawerSize>('md');

  /**
   * Show backdrop overlay
   */
  readonly showBackdrop = input<boolean>(true);

  /**
   * Close on backdrop click
   */
  readonly closeOnBackdrop = input<boolean>(true);

  /**
   * Close on ESC key
   */
  readonly closeOnEsc = input<boolean>(true);

  /**
   * Title text
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Open state change event
   */
  readonly openChange = output<boolean>();

  /**
   * Closed event
   */
  readonly closed = output<void>();

  /**
   * Internal open state
   */
  protected readonly isOpen = signal(false);

  /**
   * Computed CSS classes
   */
  protected readonly drawerClasses = computed(() => ({
    'ui-drawer': true,
    [`ui-drawer--${this.position()}`]: true,
    [`ui-drawer--${this.size()}`]: true,
    'ui-drawer--open': this.isOpen(),
  }));

  constructor() {
    // Sync internal open state
    effect(() => {
      const open = this.open();
      this.isOpen.set(open);
      
      // Manage body scroll
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Close drawer
   */
  protected close(): void {
    this.isOpen.set(false);
    this.openChange.emit(false);
    this.closed.emit();
  }

  /**
   * Handle backdrop click
   */
  protected handleBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }

  /**
   * Handle ESC key
   */
  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    if (this.closeOnEsc() && this.isOpen()) {
      this.close();
    }
  }
}

