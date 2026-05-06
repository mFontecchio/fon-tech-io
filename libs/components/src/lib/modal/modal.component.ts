/**
 * Modal Component
 *
 * A themable modal/dialog component with proper accessibility support.
 * Uses HTML dialog element for semantic HTML and native keyboard handling.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  effect,
  ElementRef,
  viewChild,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'fui-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-modal-host]': 'true',
  },
})
export class ModalComponent implements OnDestroy {
  /**
   * Whether modal is open
   */
  readonly open = input<boolean>(false);

  /**
   * Modal size
   */
  readonly size = input<ModalSize>('md');

  /**
   * Modal title
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Whether to show close button
   */
  readonly showClose = input<boolean>(true);

  /**
   * Whether clicking backdrop closes modal
   */
  readonly closeOnBackdropClick = input<boolean>(true);

  /**
   * Whether pressing Escape closes modal
   */
  readonly closeOnEscape = input<boolean>(true);

  /**
   * Prevent body scroll when modal is open
   */
  readonly preventBodyScroll = input<boolean>(true);

  /**
   * ARIA label for modal
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * ARIA labelledby ID
   */
  readonly ariaLabelledby = input<string | undefined>(undefined);

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
   * Reference to dialog element
   */
  protected readonly dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  /**
   * Computed title ID for ARIA
   */
  protected readonly titleId = computed(() => {
    const ariaLabelledby = this.ariaLabelledby();
    return ariaLabelledby || `fui-modal-title-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed CSS classes
   */
  protected readonly modalClasses = computed(() => ({
    'fui-modal': true,
    [`fui-modal--${this.size()}`]: true,
  }));

  /**
   * Original body overflow style (for restoration)
   */
  private originalBodyOverflow?: string;

  /**
   * Previously focused element before the modal opened.
   */
  private previouslyFocusedElement?: HTMLElement;

  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    // Sync open state and manage dialog
    effect(() => {
      const shouldBeOpen = this.open();
      const dialog = this.dialogElement();

      if (dialog) {
        if (shouldBeOpen) {
          this.openDialog();
        } else {
          this.closeDialog();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Restore body scroll on component destroy
    this.restoreBodyScroll();
    this.restoreFocus();
  }

  /**
   * Open the dialog
   */
  private openDialog(): void {
    const dialog = this.dialogElement();
    if (!dialog) return;

    const dialogEl = dialog.nativeElement;

    if (!dialogEl.open) {
      this.captureFocusedElement();
      dialogEl.showModal();
      this.isOpen.set(true);

      if (this.preventBodyScroll()) {
        this.preventScroll();
      }
    }
  }

  /**
   * Close the dialog
   */
  private closeDialog(): void {
    const dialog = this.dialogElement();
    if (!dialog) return;

    const dialogEl = dialog.nativeElement;

    if (dialogEl.open) {
      dialogEl.close();
      this.isOpen.set(false);
      this.restoreBodyScroll();
      this.restoreFocus();
      this.closed.emit();
    }
  }

  /**
   * Capture the currently focused element so it can be restored on close.
   */
  private captureFocusedElement(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const activeElement = document.activeElement;
    this.previouslyFocusedElement =
      activeElement instanceof HTMLElement ? activeElement : undefined;
  }

  /**
   * Restore focus to the element that opened the modal.
   */
  private restoreFocus(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.previouslyFocusedElement;
    this.previouslyFocusedElement = undefined;

    if (element?.isConnected) {
      element.focus();
    }
  }

  /**
   * Prevent body scroll
   */
  private preventScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  /**
   * Restore body scroll
   */
  private restoreBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.originalBodyOverflow !== undefined) {
      document.body.style.overflow = this.originalBodyOverflow;
      this.originalBodyOverflow = undefined;
    }
  }

  /**
   * Handle backdrop click
   */
  protected handleBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdropClick()) return;

    const dialog = this.dialogElement();
    if (!dialog) return;

    const dialogEl = dialog.nativeElement;
    const rect = dialogEl.getBoundingClientRect();

    // Check if click was outside dialog content
    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) {
      this.handleClose();
    }
  }

  /**
   * Handle close button click
   */
  protected handleClose(): void {
    this.close();
  }

  /**
   * Handle native dialog cancel event (Escape key)
   */
  protected handleCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }

    this.handleClose();
  }

  /**
   * Programmatically close the modal
   */
  public close(): void {
    this.openChange.emit(false);
    this.closeDialog();
  }
}
