/**
 * Alert Component
 * 
 * A themable alert/banner component for displaying important messages.
 * Supports multiple variants, icons, and dismissibility.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-alert',
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': 'role()',
    '[attr.aria-live]': 'ariaLive()',
  },
})
export class AlertComponent {
  /**
   * Alert visual variant
   */
  readonly variant = input<AlertVariant>('info');

  /**
   * Alert size
   */
  readonly size = input<AlertSize>('md');

  /**
   * Alert title
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Whether to show icon
   */
  readonly showIcon = input<boolean>(true);

  /**
   * Whether alert is dismissible
   */
  readonly dismissible = input<boolean>(false);

  /**
   * ARIA role (alert or status)
   */
  readonly role = input<'alert' | 'status'>('alert');

  /**
   * ARIA live region politeness
   */
  readonly ariaLive = input<'polite' | 'assertive'>('polite');

  /**
   * Dismissed event
   */
  readonly dismissed = output<void>();

  /**
   * Internal visibility state
   */
  protected readonly isVisible = signal(true);

  /**
   * Computed icon SVG path based on variant
   */
  protected readonly iconPath = computed(() => {
    switch (this.variant()) {
      case 'success':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'error':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
      default: // info
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  });

  /**
   * Computed CSS classes
   */
  protected readonly alertClasses = computed(() => ({
    'ui-alert': true,
    [`ui-alert--${this.variant()}`]: true,
    [`ui-alert--${this.size()}`]: true,
    'ui-alert--with-title': !!this.title(),
    'ui-alert--dismissible': this.dismissible(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    if (!this.isVisible()) {
      return 'ui-alert-wrapper ui-alert-wrapper--hidden';
    }
    
    return Object.entries(this.alertClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Handle dismiss click
   */
  protected handleDismiss(): void {
    this.isVisible.set(false);
    this.dismissed.emit();
  }
}

