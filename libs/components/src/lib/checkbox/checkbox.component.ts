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
  output,
  signal,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-checkbox',
  imports: [NgClass, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-checkbox-wrapper]': 'true',
    '[class.ui-checkbox-wrapper--disabled]': 'disabled()',
  },
})
export class CheckboxComponent {
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
  protected readonly internalChecked = signal(false);

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
    return providedId || `ui-checkbox-${Math.random().toString(36).substr(2, 9)}`;
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
    'ui-checkbox': true,
    [`ui-checkbox--${this.size()}`]: true,
    'ui-checkbox--checked': this.internalChecked(),
    'ui-checkbox--indeterminate': this.indeterminate(),
    'ui-checkbox--disabled': this.disabled(),
    'ui-checkbox--error': this.hasError(),
  }));

  constructor() {
    // Sync internal checked state
    effect(() => {
      this.internalChecked.set(this.checked());
    });

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
    this.checkedChange.emit(newChecked);
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
    if (!this.disabled()) {
      const newChecked = !this.internalChecked();
      this.internalChecked.set(newChecked);
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
}

