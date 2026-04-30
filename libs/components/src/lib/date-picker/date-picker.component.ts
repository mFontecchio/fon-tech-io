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
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type DatePickerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-date-picker',
  imports: [NgClass, FormsModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-date-picker-wrapper]': 'true',
    '[class.ui-date-picker-wrapper--disabled]': 'disabled()',
    '[class.ui-date-picker-wrapper--full-width]': 'fullWidth()',
  },
})
export class DatePickerComponent {
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
  protected readonly internalValue = signal<string | undefined>(undefined);

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID
   */
  protected readonly datePickerId = computed(() => {
    const providedId = this.id();
    return providedId || `ui-date-picker-${Math.random().toString(36).substr(2, 9)}`;
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
    'ui-date-picker': true,
    [`ui-date-picker--${this.size()}`]: true,
    'ui-date-picker--error': this.hasError(),
    'ui-date-picker--disabled': this.disabled(),
  }));

  constructor() {
    // Sync internal value
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  /**
   * Handle value change
   */
  protected handleChange(value: string): void {
    this.internalValue.set(value);
    this.valueChange.emit(value);
  }

  /**
   * Clear date
   */
  protected clear(): void {
    this.internalValue.set(undefined);
    this.valueChange.emit('');
  }
}

