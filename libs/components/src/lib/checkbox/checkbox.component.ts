/**
 * Checkbox Component
 *
 * A themable checkbox component with indeterminate state support.
 * Uses native HTML checkbox with Angular 20 best practices.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
  effect,
  forwardRef,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccessorBase } from '../forms/form-value-accessor.base';

export type CheckboxSize = 'sm' | 'md' | 'lg';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

@Component({
  selector: 'fui-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_VALUE_ACCESSOR],
  host: {
    '[class.fui-checkbox-wrapper]': 'true',
    '[class.fui-checkbox-wrapper--disabled]': 'isDisabled()',
  },
})
export class CheckboxComponent extends FormValueAccessorBase<boolean> {
  /**
   * Checked state
   */
  readonly checked = input<boolean>(false);

  /**
   * Indeterminate state (partially checked)
   */
  readonly indeterminate = input<boolean>(false);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Required field
   */
  readonly required = input<boolean>(false);

  /**
   * Checkbox size
   */
  readonly size = input<CheckboxSize>('md');

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
   * Name attribute for form
   */
  readonly name = input<string | undefined>(undefined);

  /**
   * Value attribute
   */
  readonly value = input<string | undefined>(undefined);

  /**
   * ID attribute
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * ARIA label
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Checked change event
   */
  readonly checkedChange = output<boolean>();

  /**
   * Internal checked state
   */
  protected readonly internalChecked = linkedSignal(() => this.checked());

  /**
   * Effective disabled state including Angular forms state.
   */
  protected readonly isDisabled = computed(() => this.disabled() || this.valueAccessorDisabled());

  /**
   * Reference to checkbox input element
   */
  protected readonly checkboxElement = viewChild<ElementRef<HTMLInputElement>>('checkbox');

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID for checkbox element
   */
  protected readonly checkboxId = computed(() => {
    const providedId = this.id();
    return providedId || `fui-checkbox-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed ID for helper text
   */
  protected readonly helperTextId = computed(() => `${this.checkboxId()}-helper`);

  /**
   * Computed ID for error message
   */
  protected readonly errorId = computed(() => `${this.checkboxId()}-error`);

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
  protected readonly checkboxClasses = computed(() => ({
    'fui-checkbox': true,
    [`fui-checkbox--${this.size()}`]: true,
    'fui-checkbox--checked': this.internalChecked(),
    'fui-checkbox--indeterminate': this.indeterminate(),
    'fui-checkbox--disabled': this.isDisabled(),
    'fui-checkbox--error': this.hasError(),
  }));

  constructor() {
    super();

    // Set indeterminate state on native element
    effect(() => {
      const checkbox = this.checkboxElement();
      if (checkbox) {
        checkbox.nativeElement.indeterminate = this.indeterminate();
      }
    });
  }

  /**
   * Handle checkbox change
   */
  protected handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newChecked = target.checked;

    this.internalChecked.set(newChecked);
    this.emitValueChange(newChecked);
    this.checkedChange.emit(newChecked);
  }

  /**
   * Handle blur to mark Angular forms state as touched.
   */
  protected handleBlur(): void {
    this.markAsTouched();
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
   * Toggle checked state programmatically
   */
  public toggle(): void {
    if (!this.isDisabled()) {
      const newChecked = !this.internalChecked();
      this.internalChecked.set(newChecked);
      this.emitValueChange(newChecked);
      this.checkedChange.emit(newChecked);

      const checkbox = this.checkboxElement();
      if (checkbox) {
        checkbox.nativeElement.checked = newChecked;
      }
    }
  }

  /**
   * Focus the checkbox
   */
  public focus(): void {
    const checkbox = this.checkboxElement();
    if (checkbox) {
      checkbox.nativeElement.focus();
    }
  }

  protected setValue(value: boolean | null | undefined): void {
    this.internalChecked.set(!!value);
  }
}
