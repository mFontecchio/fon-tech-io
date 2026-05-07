/**
 * Date Picker Component
 *
 * A date picker component with native HTML5 input fallback.
 * Provides a clean, accessible way to select dates.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccessorBase } from '../forms/form-value-accessor.base';

export type DatePickerSize = 'sm' | 'md' | 'lg';

const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true,
};

@Component({
  selector: 'fui-date-picker',
  imports: [NgClass],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_PICKER_VALUE_ACCESSOR],
  host: {
    '[class.fui-date-picker-wrapper]': 'true',
    '[class.fui-date-picker-wrapper--disabled]': 'isDisabled()',
    '[class.fui-date-picker-wrapper--full-width]': 'fullWidth()',
  },
})
export class DatePickerComponent extends FormValueAccessorBase<string> {
  /**
   * Selected date value
   */
  readonly value = input<string | undefined>(undefined);

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Placeholder text
   */
  readonly placeholder = input<string>('Select date...');

  /**
   * Helper text
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Error message
   */
  readonly errorMessage = input<string | undefined>(undefined);

  /**
   * Minimum date (YYYY-MM-DD)
   */
  readonly min = input<string | undefined>(undefined);

  /**
   * Maximum date (YYYY-MM-DD)
   */
  readonly max = input<string | undefined>(undefined);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Required field
   */
  readonly required = input<boolean>(false);

  /**
   * Date picker size
   */
  readonly size = input<DatePickerSize>('md');

  /**
   * Full width
   */
  readonly fullWidth = input<boolean>(false);

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
  readonly valueChange = output<string>();

  /**
   * Internal value
   */
  protected readonly internalValue = linkedSignal<string | undefined>(() => this.value());

  /**
   * Effective disabled state including Angular forms state.
   */
  protected readonly isDisabled = computed(() => this.disabled() || this.valueAccessorDisabled());

  /**
   * Reference to native date input
   */
  protected readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('input');

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID
   */
  protected readonly datePickerId = computed(() => {
    const providedId = this.id();
    return providedId || `fui-date-picker-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed helper text ID
   */
  protected readonly helperTextId = computed(() => `${this.datePickerId()}-helper`);

  /**
   * Computed error ID
   */
  protected readonly errorId = computed(() => `${this.datePickerId()}-error`);

  /**
   * Computed aria-describedby
   */
  protected readonly computedAriaDescribedBy = computed(() => {
    const parts: string[] = [];

    if (this.helperText()) {
      parts.push(this.helperTextId());
    }

    if (this.hasError()) {
      parts.push(this.errorId());
    }

    return parts.length > 0 ? parts.join(' ') : undefined;
  });

  /**
   * Computed CSS classes
   */
  protected readonly datePickerClasses = computed(() => ({
    'fui-date-picker': true,
    [`fui-date-picker--${this.size()}`]: true,
    'fui-date-picker--error': this.hasError(),
    'fui-date-picker--disabled': this.isDisabled(),
  }));

  /**
   * Handle value change
   */
  protected handleChange(value: string): void {
    this.internalValue.set(value);
    this.emitValueChange(value);
    this.valueChange.emit(value);
  }

  /**
   * Mark the date picker as touched for Angular forms.
   */
  protected handleBlur(): void {
    this.markAsTouched();
  }

  /**
   * Clear date
   */
  protected clear(): void {
    this.internalValue.set(undefined);
    this.emitValueChange('');
    this.markAsTouched();
    this.valueChange.emit('');
  }

  /**
   * Open native date picker with custom trigger button.
   */
  protected openPicker(): void {
    const input = this.inputElement()?.nativeElement;

    if (!input || this.isDisabled()) {
      return;
    }

    input.focus();

    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }

    input.click();
  }

  protected setValue(value: string | null | undefined): void {
    this.internalValue.set(value ?? undefined);
  }
}
