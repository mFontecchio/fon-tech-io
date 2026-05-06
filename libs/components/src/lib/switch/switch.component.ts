/**
 * Switch Component
 *
 * A themable toggle switch component for boolean settings.
 * Uses native HTML checkbox with custom styling for toggle appearance.
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
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccessorBase } from '../forms/form-value-accessor.base';

export type SwitchSize = 'sm' | 'md' | 'lg';

const SWITCH_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true,
};

@Component({
  selector: 'fui-switch',
  imports: [NgClass],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SWITCH_VALUE_ACCESSOR],
  host: {
    '[class.fui-switch-wrapper]': 'true',
    '[class.fui-switch-wrapper--disabled]': 'isDisabled()',
  },
})
export class SwitchComponent extends FormValueAccessorBase<boolean> {
  /**
   * Checked state
   */
  readonly checked = input<boolean>(false);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Required field
   */
  readonly required = input<boolean>(false);

  /**
   * Switch size
   */
  readonly size = input<SwitchSize>('md');

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
   * ID attribute
   */
  readonly id = input<string | undefined>(undefined);

  /**
   * ARIA label
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Show on/off labels on the switch
   */
  readonly showLabels = input<boolean>(false);

  /**
   * Custom on label text
   */
  readonly onLabel = input<string>('ON');

  /**
   * Custom off label text
   */
  readonly offLabel = input<string>('OFF');

  /**
   * Checked change event
   */
  readonly checkedChange = output<boolean>();

  /**
   * Internal checked state
   */
  protected readonly internalChecked = signal(false);

  /**
   * Effective disabled state including Angular forms state.
   */
  protected readonly isDisabled = computed(() => this.disabled() || this.valueAccessorDisabled());

  /**
   * Reference to checkbox input element
   */
  protected readonly switchElement = viewChild<ElementRef<HTMLInputElement>>('switch');

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID for switch element
   */
  protected readonly switchId = computed(() => {
    const providedId = this.id();
    return providedId || `fui-switch-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed ID for helper text
   */
  protected readonly helperTextId = computed(() => `${this.switchId()}-helper`);

  /**
   * Computed ID for error message
   */
  protected readonly errorId = computed(() => `${this.switchId()}-error`);

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
  protected readonly switchClasses = computed(() => ({
    'fui-switch': true,
    [`fui-switch--${this.size()}`]: true,
    'fui-switch--checked': this.internalChecked(),
    'fui-switch--disabled': this.isDisabled(),
    'fui-switch--error': this.hasError(),
    'fui-switch--with-labels': this.showLabels(),
  }));

  constructor() {
    super();

    // Sync internal checked state
    effect(() => {
      this.internalChecked.set(this.checked());
    });
  }

  /**
   * Handle switch change
   */
  protected handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newChecked = target.checked;

    this.internalChecked.set(newChecked);
    this.emitValueChange(newChecked);
    this.checkedChange.emit(newChecked);
  }

  /**
   * Mark the switch as touched for Angular forms.
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
   * Toggle checked state programmatically
   */
  public toggle(): void {
    if (!this.isDisabled()) {
      const newChecked = !this.internalChecked();
      this.internalChecked.set(newChecked);
      this.emitValueChange(newChecked);
      this.checkedChange.emit(newChecked);

      const switchEl = this.switchElement();
      if (switchEl) {
        switchEl.nativeElement.checked = newChecked;
      }
    }
  }

  /**
   * Focus the switch
   */
  public focus(): void {
    const switchEl = this.switchElement();
    if (switchEl) {
      switchEl.nativeElement.focus();
    }
  }

  protected setValue(value: boolean | null | undefined): void {
    this.internalChecked.set(!!value);
  }
}
