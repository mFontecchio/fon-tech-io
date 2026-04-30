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
  input,
  output,
  signal,
  effect,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type SwitchSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-switch',
  imports: [NgClass, FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-switch-wrapper]': 'true',
    '[class.ui-switch-wrapper--disabled]': 'disabled()',
  },
})
export class SwitchComponent {
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
    return providedId || `ui-switch-${Math.random().toString(36).substr(2, 9)}`;
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
    'ui-switch': true,
    [`ui-switch--${this.size()}`]: true,
    'ui-switch--checked': this.internalChecked(),
    'ui-switch--disabled': this.disabled(),
    'ui-switch--error': this.hasError(),
    'ui-switch--with-labels': this.showLabels(),
  }));

  constructor() {
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
}

