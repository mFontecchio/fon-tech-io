/**
 * Toast Service
 * 
 * Service for managing toast notifications globally.
 */

import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  dismissible?: boolean;
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
    duration: number = 5000,
    dismissible: boolean = true
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
      setTimeout(() => this.dismiss(id), duration);
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
   * Dismiss a toast
   */
  public dismiss(id: string): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  /**
   * Dismiss all toasts
   */
  public dismissAll(): void {
    this.toasts.set([]);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

