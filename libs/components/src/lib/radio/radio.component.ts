/**
 * Radio Component
 *
 * A themable radio button component following PrimeNG's pattern.
 * Uses model-based approach for proper radio group behavior.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccessorBase } from '../forms/form-value-accessor.base';

export type RadioSize = 'sm' | 'md' | 'lg';
type RadioSelection = string | undefined;

const UNSET_RADIO_SELECTION = Symbol('unset-radio-selection');

const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true,
};

@Component({
  selector: 'fui-radio',
  imports: [NgClass],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_VALUE_ACCESSOR],
  host: {
    '[class.fui-radio-wrapper]': 'true',
    '[class.fui-radio-wrapper--disabled]': 'isDisabled()',
  },
})
export class RadioComponent extends FormValueAccessorBase<string> {
  /**
   * Explicit selected value for the radio group.
   */
  readonly selectedValue = input<RadioSelection | typeof UNSET_RADIO_SELECTION>(
    UNSET_RADIO_SELECTION
  );

  /**
   * Selected value change event for the radio group.
   */
  readonly selectedValueChange = output<RadioSelection>();

  /**
   * Legacy model value binding retained for backward compatibility.
   */
  readonly modelValue = model<RadioSelection>(undefined);

  /**
   * Effective disabled state including Angular forms state.
   */
  protected readonly isDisabled = computed(() => this.disabled() || this.valueAccessorDisabled());

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Required field
   */
  readonly required = input<boolean>(false);

  /**
   * Radio size
   */
  readonly size = input<RadioSize>('md');

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Helper text
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Error message
   */
  readonly errorMessage = input<string | undefined>(undefined);

  /**
   * Name attribute for form (required for radio groups)
   */
  readonly name = input.required<string>();

  /**
   * Value attribute (required for radio groups)
   */
  readonly value = input.required<string>();

  /**
   * ID attribute
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * ARIA label
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Reference to radio input element
   */
  protected readonly radioElement = viewChild<ElementRef<HTMLInputElement>>('radio');

  /**
   * Effective group selection across the new explicit API and the legacy model alias.
   */
  protected readonly groupValue = computed<RadioSelection>(() => {
    const selectedValue = this.selectedValue();
    return selectedValue === UNSET_RADIO_SELECTION ? this.modelValue() : selectedValue;
  });

  /**
   * Computed checked state - compares modelValue with this radio's value
   * This is how PrimeNG determines which radio is selected
   */
  protected readonly isChecked = computed(() => {
    return this.groupValue() === this.value();
  });

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID for radio element
   */
  protected readonly radioId = computed(() => {
    const providedId = this.id();
    return providedId || `fui-radio-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed ID for helper text
   */
  protected readonly helperTextId = computed(() => `${this.radioId()}-helper`);

  /**
   * Computed ID for error message
   */
  protected readonly errorId = computed(() => `${this.radioId()}-error`);

  /**
   * Computed aria-describedby value
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
  protected readonly radioClasses = computed(() => ({
    'fui-radio': true,
    [`fui-radio--${this.size()}`]: true,
    'fui-radio--checked': this.isChecked(),
    'fui-radio--disabled': this.isDisabled(),
    'fui-radio--error': this.hasError(),
  }));

  constructor() {
    super();
  }

  /**
   * Handle radio change - updates the model value
   */
  protected handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      const selectedValue = this.value();
      this.modelValue.set(selectedValue);
      this.selectedValueChange.emit(selectedValue);
      this.emitValueChange(selectedValue);
    }
  }

  /**
   * Mark radio as touched for Angular forms.
   */
  protected handleBlur(): void {
    this.markAsTouched();
  }

  /**
   * Handle label click
   */
  protected handleLabelClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      return;
    }
  }

  /**
   * Focus the radio
   */
  public focus(): void {
    const radio = this.radioElement();
    if (radio) {
      radio.nativeElement.focus();
    }
  }

  protected setValue(value: string | null | undefined): void {
    this.modelValue.set(value ?? undefined);
  }
}
