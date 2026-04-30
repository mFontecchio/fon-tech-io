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
  input,
  output,
  model,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type RadioSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-radio',
  imports: [NgClass],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-radio-wrapper]': 'true',
    '[class.ui-radio-wrapper--disabled]': 'disabled()',
  },
})
export class RadioComponent {
  /**
   * Model value - the currently selected value for the radio group
   * Similar to PrimeNG's [(ngModel)] binding
   */
  readonly modelValue = model<string | undefined>(undefined);

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
   * Computed checked state - compares modelValue with this radio's value
   * This is how PrimeNG determines which radio is selected
   */
  protected readonly isChecked = computed(() => {
    return this.modelValue() === this.value();
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
    return providedId || `ui-radio-${Math.random().toString(36).substr(2, 9)}`;
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
    'ui-radio': true,
    [`ui-radio--${this.size()}`]: true,
    'ui-radio--checked': this.isChecked(),
    'ui-radio--disabled': this.disabled(),
    'ui-radio--error': this.hasError(),
  }));

  /**
   * Handle radio change - updates the model value
   */
  protected handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.modelValue.set(this.value());
    }
  }

  /**
   * Handle label click
   */
  protected handleLabelClick(event: MouseEvent): void {
    if (this.disabled()) {
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
}
