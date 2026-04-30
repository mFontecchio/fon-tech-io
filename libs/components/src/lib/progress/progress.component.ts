/**
 * Progress Component
 * 
 * A themable progress bar component with determinate and indeterminate modes.
 * Supports labels, multiple variants, and sizes.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ProgressSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-progress',
  imports: [NgClass],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"progressbar"',
    '[attr.aria-valuenow]': 'indeterminate() ? null : value()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-label]': 'ariaLabel() || label()',
  },
})
export class ProgressComponent {
  /**
   * Current value (0-max)
   */
  readonly value = input<number>(0);

  /**
   * Maximum value
   */
  readonly max = input<number>(100);

  /**
   * Progress variant
   */
  readonly variant = input<ProgressVariant>('default');

  /**
   * Progress size
   */
  readonly size = input<ProgressSize>('md');

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Show percentage text
   */
  readonly showValue = input<boolean>(false);

  /**
   * Indeterminate mode (loading animation)
   */
  readonly indeterminate = input<boolean>(false);

  /**
   * Striped pattern
   */
  readonly striped = input<boolean>(false);

  /**
   * Animated stripes
   */
  readonly animated = input<boolean>(false);

  /**
   * ARIA label
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Computed percentage
   */
  protected readonly percentage = computed(() => {
    const val = this.value();
    const maximum = this.max();
    return Math.min(Math.max((val / maximum) * 100, 0), 100);
  });

  /**
   * Computed display value
   */
  protected readonly displayValue = computed(() => {
    return `${Math.round(this.percentage())}%`;
  });

  /**
   * Computed CSS classes for container
   */
  protected readonly progressClasses = computed(() => ({
    'ui-progress': true,
    [`ui-progress--${this.size()}`]: true,
  }));

  /**
   * Computed CSS classes for bar
   */
  protected readonly barClasses = computed(() => ({
    'ui-progress-bar': true,
    [`ui-progress-bar--${this.variant()}`]: true,
    'ui-progress-bar--indeterminate': this.indeterminate(),
    'ui-progress-bar--striped': this.striped() || this.animated(),
    'ui-progress-bar--animated': this.animated(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.progressClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Computed bar width style
   */
  protected readonly barWidth = computed(() => {
    if (this.indeterminate()) {
      return undefined;
    }
    return `${this.percentage()}%`;
  });
}

