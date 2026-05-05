/**
 * Toast Service
 * 
 * Service for managing toast notifications globally.
 */

import { Injectable, signal } from '@angular/core';

const TOAST_EXIT_DURATION = 250;

export interface Toast {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  dismissible?: boolean;
  dismissing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Active toasts
   */
  private readonly toasts = signal<Toast[]>([]);

  /**
   * Active auto-dismiss timers by toast ID
   */
  private readonly autoDismissTimers = new Map<string, number>();

  /**
   * Active removal timers by toast ID
   */
  private readonly removalTimers = new Map<string, number>();

  /**
   * Get all active toasts
   */
  public getToasts() {
    return this.toasts.asReadonly();
  }

  /**
   * Show a toast notification
   */
  public show(
    message: string,
    variant: Toast['variant'] = 'info',
    duration = 5000,
    dismissible = true
  ): string {
    const id = this.generateId();
    const toast: Toast = {
      id,
      message,
      variant,
      duration,
      dismissible,
    };

    this.toasts.update(toasts => [...toasts, toast]);

    // Auto-dismiss after duration
    if (duration > 0) {
      const timerId = window.setTimeout(() => this.dismissWithAnimation(id), duration);
      this.autoDismissTimers.set(id, timerId);
    }

    return id;
  }

  /**
   * Show info toast
   */
  public info(message: string, duration?: number): string {
    return this.show(message, 'info', duration);
  }

  /**
   * Show success toast
   */
  public success(message: string, duration?: number): string {
    return this.show(message, 'success', duration);
  }

  /**
   * Show warning toast
   */
  public warning(message: string, duration?: number): string {
    return this.show(message, 'warning', duration);
  }

  /**
   * Show error toast
   */
  public error(message: string, duration?: number): string {
    return this.show(message, 'error', duration);
  }

  /**
   * Start dismiss animation, then remove toast when exit duration completes.
   */
  public dismissWithAnimation(id: string): void {
    if (!this.beginDismiss(id)) {
      return;
    }

    this.clearAutoDismissTimer(id);

    const removalTimerId = window.setTimeout(() => {
      this.removalTimers.delete(id);
      this.dismiss(id);
    }, TOAST_EXIT_DURATION);

    this.removalTimers.set(id, removalTimerId);
  }

  /**
   * Dismiss a toast
   */
  public dismiss(id: string): void {
    this.clearAutoDismissTimer(id);
    this.clearRemovalTimer(id);
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  /**
   * Dismiss all toasts
   */
  public dismissAll(): void {
    this.autoDismissTimers.forEach(timerId => window.clearTimeout(timerId));
    this.autoDismissTimers.clear();
    this.removalTimers.forEach(timerId => window.clearTimeout(timerId));
    this.removalTimers.clear();
    this.toasts.set([]);
  }

  /**
   * Mark toast as dismissing.
   */
  private beginDismiss(id: string): boolean {
    let didStartDismiss = false;

    this.toasts.update(toasts =>
      toasts.map(toast => {
        if (toast.id !== id || toast.dismissing) {
          return toast;
        }

        didStartDismiss = true;
        return {
          ...toast,
          dismissing: true,
        };
      })
    );

    return didStartDismiss;
  }

  /**
   * Clear pending auto-dismiss timer for a toast.
   */
  private clearAutoDismissTimer(id: string): void {
    const timerId = this.autoDismissTimers.get(id);
    if (timerId !== undefined) {
      window.clearTimeout(timerId);
      this.autoDismissTimers.delete(id);
    }
  }

  /**
   * Clear pending removal timer for a toast.
   */
  private clearRemovalTimer(id: string): void {
    const timerId = this.removalTimers.get(id);
    if (timerId !== undefined) {
      window.clearTimeout(timerId);
      this.removalTimers.delete(id);
    }
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

