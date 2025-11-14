/**
 * Slider Component
 * 
 * A range input component for selecting numeric values.
 * Supports single value or dual-handle range selection.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type SliderSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-slider',
  imports: [CommonModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-slider-wrapper]': 'true',
    '[class.ui-slider-wrapper--disabled]': 'disabled()',
  },
})
export class SliderComponent {
  /**
   * Current value (single handle) or start value (dual handle)
   */
  readonly value = input<number>(0);

  /**
   * End value (only for dual handle/range mode)
   */
  readonly valueEnd = input<number | undefined>(undefined);

  /**
   * Minimum value
   */
  readonly min = input<number>(0);

  /**
   * Maximum value
   */
  readonly max = input<number>(100);

  /**
   * Step increment
   */
  readonly step = input<number>(1);

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Show value label
   */
  readonly showValue = input<boolean>(true);

  /**
   * Show min/max labels
   */
  readonly showMinMax = input<boolean>(false);

  /**
   * Slider size
   */
  readonly size = input<SliderSize>('md');

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Name attribute
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * ID attribute
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * ARIA label
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Value change event
   */
  readonly valueChange = output<number>();

  /**
   * End value change event (for dual handle)
   */
  readonly valueEndChange = output<number>();

  /**
   * Internal value
   */
  protected readonly internalValue = signal<number>(0);

  /**
   * Internal end value
   */
  protected readonly internalValueEnd = signal<number | undefined>(undefined);

  /**
   * Is range/dual handle mode
   */
  protected readonly isRange = computed(() => this.valueEnd() !== undefined);

  /**
   * Computed ID
   */
  protected readonly sliderId = computed(() => {
    const providedId = this.id();
    return providedId || `ui-slider-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed CSS classes
   */
  protected readonly sliderClasses = computed(() => ({
    'ui-slider': true,
    [`ui-slider--${this.size()}`]: true,
    'ui-slider--disabled': this.disabled(),
    'ui-slider--range': this.isRange(),
  }));

  /**
   * Fill percentage (for visual track fill)
   */
  protected readonly fillPercentage = computed(() => {
    const min = this.min();
    const max = this.max();
    const value = this.internalValue();
    const range = max - min;
    
    if (range === 0) return 0;
    
    return ((value - min) / range) * 100;
  });

  /**
   * Range fill style (for dual handle)
   */
  protected readonly rangeFillStyle = computed(() => {
    if (!this.isRange()) return {};
    
    const min = this.min();
    const max = this.max();
    const start = this.internalValue();
    const end = this.internalValueEnd() || max;
    const range = max - min;
    
    if (range === 0) return {};
    
    const leftPercent = ((start - min) / range) * 100;
    const widthPercent = ((end - start) / range) * 100;
    
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`,
    };
  });

  constructor() {
    // Sync internal values
    effect(() => {
      this.internalValue.set(this.value());
    });

    effect(() => {
      this.internalValueEnd.set(this.valueEnd());
    });
  }

  /**
   * Handle value change
   */
  protected handleValueChange(value: number): void {
    this.internalValue.set(value);
    this.valueChange.emit(value);
  }

  /**
   * Handle end value change (dual handle)
   */
  protected handleValueEndChange(value: number): void {
    this.internalValueEnd.set(value);
    this.valueEndChange.emit(value);
  }
}

