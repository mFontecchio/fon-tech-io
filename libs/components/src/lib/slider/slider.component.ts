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
  forwardRef,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccessorBase } from '../forms/form-value-accessor.base';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderRangeValue = readonly [number, number];

const UNSET_SLIDER_RANGE_VALUE = Symbol('unset-slider-range-value');

const SLIDER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true,
};

@Component({
  selector: 'fui-slider',
  imports: [NgClass],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SLIDER_VALUE_ACCESSOR],
  host: {
    '[class.fui-slider-wrapper]': 'true',
    '[class.fui-slider-wrapper--disabled]': 'isDisabled()',
  },
})
export class SliderComponent extends FormValueAccessorBase<number> {
  /**
   * Current value (single handle) or start value (dual handle)
   */
  readonly value = input<number>(0);

  /**
   * End value (only for dual handle/range mode)
   */
  readonly valueEnd = input<number | undefined>(undefined);

  /**
   * Composite range value for dual-handle mode.
   */
  readonly rangeValue = input<SliderRangeValue | typeof UNSET_SLIDER_RANGE_VALUE>(
    UNSET_SLIDER_RANGE_VALUE
  );

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
   * Composite range value change event for dual-handle mode.
   */
  readonly rangeValueChange = output<SliderRangeValue>();

  /**
   * Internal value
   */
  protected readonly internalValue = signal<number>(0);

  /**
   * Effective disabled state including Angular forms state.
   */
  protected readonly isDisabled = computed(() => this.disabled() || this.valueAccessorDisabled());

  /**
   * Internal end value
   */
  protected readonly internalValueEnd = signal<number | undefined>(undefined);

  /**
   * Active handle (for z-index management)
   */
  protected readonly activeHandle = signal<'start' | 'end' | null>(null);

  /**
   * Range tuple when the new composite range contract is used.
   */
  protected readonly explicitRangeValue = computed<SliderRangeValue | undefined>(() => {
    const rangeValue = this.rangeValue();
    return rangeValue === UNSET_SLIDER_RANGE_VALUE ? undefined : rangeValue;
  });

  protected readonly isRange = computed(
    () => this.explicitRangeValue() !== undefined || this.valueEnd() !== undefined
  );

  /**
   * Computed ID
   */
  protected readonly sliderId = computed(() => {
    const providedId = this.id();
    return providedId || `fui-slider-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed CSS classes
   */
  protected readonly sliderClasses = computed(() => ({
    'fui-slider': true,
    [`fui-slider--${this.size()}`]: true,
    'fui-slider--disabled': this.isDisabled(),
    'fui-slider--range': this.isRange(),
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
   * CSS left offset for range fill (dual handle)
   */
  protected readonly rangeFillLeft = computed(() => {
    if (!this.isRange()) return null;
    const min = this.min();
    const max = this.max();
    const start = this.internalValue();
    const range = max - min;
    if (range === 0) return null;
    return `${((start - min) / range) * 100}%`;
  });

  /**
   * CSS width for range fill (dual handle)
   */
  protected readonly rangeFillWidth = computed(() => {
    if (!this.isRange()) return null;
    const min = this.min();
    const max = this.max();
    const start = this.internalValue();
    const end = this.internalValueEnd() || max;
    const range = max - min;
    if (range === 0) return null;
    return `${((end - start) / range) * 100}%`;
  });

  constructor() {
    super();

    // Sync internal values
    effect(() => {
      const explicitRangeValue = this.explicitRangeValue();
      if (explicitRangeValue) {
        const [startValue, endValue] = this.normalizeRangeValue(explicitRangeValue);
        this.internalValue.set(startValue);
        this.internalValueEnd.set(endValue);
        return;
      }

      const value = this.clampValue(this.value());
      const valueEnd = this.valueEnd();
      if (valueEnd !== undefined) {
        this.internalValue.set(Math.min(value, this.clampValue(valueEnd)));
        return;
      }

      this.internalValue.set(value);
    });

    effect(() => {
      if (this.explicitRangeValue()) {
        return;
      }

      const valueEnd = this.valueEnd();
      this.internalValueEnd.set(
        valueEnd === undefined ? undefined : this.clampRangeEnd(this.internalValue(), valueEnd)
      );
    });
  }

  /**
   * Handle value change
   */
  protected handleValueChange(value: number): void {
    // Ensure value is within min/max bounds
    value = this.clampValue(value);

    // In range mode, ensure start doesn't exceed end
    if (this.isRange()) {
      const endValue = this.internalValueEnd();
      if (endValue !== undefined && value > endValue) {
        // Clamp to end value (handles can't swap)
        value = endValue;
      }
    }

    this.internalValue.set(value);
    this.emitValueChange(value);
    this.valueChange.emit(value);

    if (this.isRange()) {
      this.emitRangeValueChange(value, this.internalValueEnd());
    }
  }

  /**
   * Handle end value change (dual handle)
   */
  protected handleValueEndChange(value: number): void {
    // Ensure value is within min/max bounds
    value = this.clampValue(value);

    // Ensure end doesn't go below start (handles can't swap)
    const startValue = this.internalValue();
    if (value < startValue) {
      value = startValue;
    }

    this.internalValueEnd.set(value);
    this.valueEndChange.emit(value);
    this.emitRangeValueChange(this.internalValue(), value);
  }

  /**
   * Mark control as touched for Angular forms.
   */
  protected handleBlur(): void {
    this.markAsTouched();
  }

  /**
   * Handle start handle mouse/touch down
   */
  protected onStartHandleMouseDown(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    this.activeHandle.set('start');

    // Reset on mouse/touch up
    const resetHandle = () => {
      this.activeHandle.set(null);
      document.removeEventListener('mouseup', resetHandle);
      document.removeEventListener('touchend', resetHandle);
    };
    document.addEventListener('mouseup', resetHandle);
    document.addEventListener('touchend', resetHandle);
  }

  /**
   * Handle end handle mouse/touch down
   */
  protected onEndHandleMouseDown(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    this.activeHandle.set('end');

    // Reset on mouse/touch up
    const resetHandle = () => {
      this.activeHandle.set(null);
      document.removeEventListener('mouseup', resetHandle);
      document.removeEventListener('touchend', resetHandle);
    };
    document.addEventListener('mouseup', resetHandle);
    document.addEventListener('touchend', resetHandle);
  }

  protected setValue(value: number | null | undefined): void {
    this.internalValue.set(this.clampValue(value ?? this.min()));
  }

  /**
   * Clamp a numeric value to the configured slider bounds.
   */
  private clampValue(value: number): number {
    return Math.max(this.min(), Math.min(this.max(), value));
  }

  /**
   * Clamp the end handle while keeping it at or above the start handle.
   */
  private clampRangeEnd(startValue: number, endValue: number): number {
    return Math.max(startValue, this.clampValue(endValue));
  }

  /**
   * Normalize a composite range tuple within slider bounds and ordering.
   */
  private normalizeRangeValue(rangeValue: SliderRangeValue): SliderRangeValue {
    const [startInput, endInput] = rangeValue;
    const startValue = this.clampValue(startInput);
    const endValue = this.clampValue(endInput);
    const normalizedStart = Math.min(startValue, endValue);
    const normalizedEnd = Math.max(normalizedStart, endValue);
    return [normalizedStart, normalizedEnd];
  }

  /**
   * Emit the composite range contract when the slider is operating in range mode.
   */
  private emitRangeValueChange(startValue: number, endValue: number | undefined): void {
    if (endValue === undefined) {
      return;
    }

    this.rangeValueChange.emit([startValue, endValue]);
  }
}
