/**
 * Toast Container Component
 * 
 * Container component that displays all active toasts.
 * Should be placed once at the root level of the application.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService } from './toast.service';
import { ToastComponent } from './toast.component';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'fui-toast-container',
  imports: [NgClass, ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ToastContainerComponent {
  /**
   * Position of toast container
   */
  readonly position = input<ToastPosition>('top-right');

  /**
   * Toast service
   */
  protected readonly toastService = inject(ToastService);

  /**
   * Active toasts
   */
  protected readonly toasts = this.toastService.getToasts();

  /**
   * Computed CSS classes
   */
  protected readonly containerClasses = computed(() => ({
    'fui-toast-container': true,
    [`fui-toast-container--${this.position()}`]: true,
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.containerClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Dismiss toast
   */
  protected dismissToast(id: string): void {
    this.toastService.dismissWithAnimation(id);
  }
}

