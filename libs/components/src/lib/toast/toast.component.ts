/**
 * Toast Component
 * 
 * Individual toast notification component.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'fui-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ToastComponent {
  /**
   * Toast message
   */
  readonly message = input.required<string>();

  /**
   * Toast variant
   */
  readonly variant = input<ToastVariant>('info');

  /**
   * Whether toast is dismissible
   */
  readonly dismissible = input<boolean>(true);

  /**
   * Whether the toast is currently playing its dismiss animation
   */
  readonly dismissing = input<boolean>(false);

  /**
   * Dismiss request event
   */
  readonly dismissRequested = output<void>();

  /**
   * Computed CSS classes
   */
  protected readonly toastClasses = computed(() => ({
    'fui-toast': true,
    'fui-toast--dismissing': this.dismissing(),
    [`fui-toast--${this.variant()}`]: true,
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.toastClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Get icon for variant
   */
  protected readonly icon = computed(() => {
    switch (this.variant()) {
      case 'success':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'error':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'info':
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  });

  /**
   * Handle dismiss request
   */
  protected handleDismiss(): void {
    this.dismissRequested.emit();
  }
}

