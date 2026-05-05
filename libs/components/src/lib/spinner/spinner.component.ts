/**
 * Spinner Component
 * 
 * A themable loading spinner component with multiple sizes and variants.
 * Uses CSS animations for performance and accessibility.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'inverse';

@Component({
  selector: 'fui-spinner',
  imports: [NgClass],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"status"',
    '[attr.aria-live]': '"polite"',
  },
})
export class SpinnerComponent {
  /**
   * Spinner size
   */
  readonly size = input<SpinnerSize>('md');

  /**
   * Spinner visual variant
   */
  readonly variant = input<SpinnerVariant>('primary');

  /**
   * Loading message for screen readers
   */
  readonly label = input<string>('Loading...');

  /**
   * Show label text visually
   */
  readonly showLabel = input<boolean>(false);

  /**
   * Center the spinner
   */
  readonly centered = input<boolean>(false);

  /**
   * Computed CSS classes
   */
  protected readonly spinnerClasses = computed(() => ({
    'fui-spinner': true,
    [`fui-spinner--${this.size()}`]: true,
    [`fui-spinner--${this.variant()}`]: true,
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    const classes = ['fui-spinner-wrapper'];
    
    if (this.centered()) {
      classes.push('fui-spinner-wrapper--centered');
    }
    
    return classes.join(' ');
  });

  /**
   * Computed container classes
   */
  protected readonly containerClasses = computed(() => {
    const classes: string[] = [];
    
    if (this.showLabel()) {
      classes.push('fui-spinner-container--with-label');
    }
    
    return classes.join(' ');
  });
}

