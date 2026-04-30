/**
 * Drawer Component
 * 
 * A slide-in panel component that appears from the edge of the screen.
 * Supports left, right, top, and bottom positions with overlay backdrop.
 * Uses native <dialog> element for built-in focus trap and screen reader support.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  effect,
  signal,
  viewChild,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'ui-drawer',
  imports: [NgClass],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-drawer-host]': 'true',
  },
})
export class DrawerComponent implements OnDestroy {
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
   * Reference to native dialog element
   */
  protected readonly dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  /**
   * Internal open state (drives CSS animation class)
   */
  protected readonly isOpen = signal(false);

  /**
   * Timeout for closing animation
   */
  private closeTimeout?: number;

  /**
   * Stored body overflow for restoration on close
   */
  private originalBodyOverflow?: string;

  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Computed CSS classes for the drawer panel
   */
  protected readonly drawerClasses = computed(() => ({
    'ui-drawer': true,
    [`ui-drawer--${this.position()}`]: true,
    [`ui-drawer--${this.size()}`]: true,
    'ui-drawer--open': this.isOpen(),
  }));

  constructor() {
    effect(() => {
      const open = this.open();
      const dialog = this.dialogElement();

      if (!isPlatformBrowser(this.platformId) || !dialog) return;

      const dialogEl = dialog.nativeElement;

      if (open) {
        if (this.closeTimeout) {
          clearTimeout(this.closeTimeout);
          this.closeTimeout = undefined;
        }

        if (!dialogEl.open) {
          dialogEl.showModal();
        }

        // requestAnimationFrame ensures the element is painted before the
        // CSS transition starts, replacing the old setTimeout(..., 10) pattern
        requestAnimationFrame(() => {
          this.isOpen.set(true);
        });

        this.originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      } else {
        this.isOpen.set(false);
        // Wait for close animation (350ms) before calling dialog.close()
        this.closeTimeout = window.setTimeout(() => {
          if (dialogEl.open) {
            dialogEl.close();
          }
          this.closeTimeout = undefined;
          this.restoreBodyScroll();
        }, 350);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
    this.restoreBodyScroll();
    if (isPlatformBrowser(this.platformId)) {
      const dialog = this.dialogElement();
      if (dialog?.nativeElement.open) {
        dialog.nativeElement.close();
      }
    }
  }

  /**
   * Close drawer and emit events
   */
  protected close(): void {
    this.isOpen.set(false);
    this.openChange.emit(false);
    this.closed.emit();
  }

  /**
   * Handle click on the dialog element.
   * A click with target === dialogEl means the user clicked the backdrop
   * (the ::backdrop pseudo-element or the transparent dialog area outside the panel).
   */
  protected handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop()) return;
    const dialog = this.dialogElement();
    if (!dialog) return;
    if (event.target === dialog.nativeElement) {
      this.close();
    }
  }

  /**
   * Handle native dialog cancel event (triggered by ESC key).
   * We prevent the default close and handle it ourselves to allow
   * consumers to opt out via closeOnEsc.
   */
  protected handleCancel(event: Event): void {
    event.preventDefault();
    if (this.closeOnEsc()) {
      this.close();
    }
  }

  /**
   * Restore body scroll after closing
   */
  private restoreBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.originalBodyOverflow !== undefined) {
      document.body.style.overflow = this.originalBodyOverflow;
      this.originalBodyOverflow = undefined;
    }
  }
}

