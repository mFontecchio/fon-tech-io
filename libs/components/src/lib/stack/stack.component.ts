/**
 * Stack Component
 * 
 * A layout component for arranging items in a vertical or horizontal stack
 * with consistent spacing between items.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type StackDirection = 'vertical' | 'horizontal';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
export type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

@Component({
  selector: 'ui-stack',
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.gap]': 'gapValue()',
    '[style.align-items]': 'alignValue()',
    '[style.justify-content]': 'justifyValue()',
  },
})
export class StackComponent {
  /**
   * Stack direction
   */
  readonly direction = input<StackDirection>('vertical');

  /**
   * Spacing between items (using primitive spacing scale)
   */
  readonly spacing = input<StackSpacing>(4);

  /**
   * Align items
   */
  readonly align = input<StackAlign>('stretch');

  /**
   * Justify content
   */
  readonly justify = input<StackJustify>('start');

  /**
   * Wrap items
   */
  readonly wrap = input<boolean>(false);

  /**
   * Divider between items
   */
  readonly divider = input<boolean>(false);

  /**
   * Full width/height
   */
  readonly fullSize = input<boolean>(false);

  /**
   * Computed CSS classes
   */
  protected readonly stackClasses = computed(() => ({
    'ui-stack': true,
    [`ui-stack--${this.direction()}`]: true,
    'ui-stack--wrap': this.wrap(),
    'ui-stack--divider': this.divider(),
    'ui-stack--full-size': this.fullSize(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.stackClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Computed gap value
   */
  protected readonly gapValue = computed(() => {
    const spacing = this.spacing();
    return `var(--primitive-spacing-${spacing})`;
  });

  /**
   * Computed align value
   */
  protected readonly alignValue = computed(() => {
    const align = this.align();
    if (align === 'start') return 'flex-start';
    if (align === 'end') return 'flex-end';
    return align;
  });

  /**
   * Computed justify value
   */
  protected readonly justifyValue = computed(() => {
    const justify = this.justify();
    if (justify === 'start') return 'flex-start';
    if (justify === 'end') return 'flex-end';
    return justify;
  });
}

