/**
 * Select Component
 * 
 * A themable select/dropdown component built on native HTML select.
 * Provides enhanced styling while maintaining native behavior.
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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'ui-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-select-wrapper]': 'true',
    '[class.ui-select-wrapper--disabled]': 'disabled()',
    '[class.ui-select-wrapper--full-width]': 'fullWidth()',
  },
})
export class SelectComponent {
  /**
   * Select options
   */
  readonly options = input.required<SelectOption[]>();

  /**
   * Selected value
   */
  readonly value = input<string | undefined>(undefined);

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Placeholder text
   */
  readonly placeholder = input<string>('Select an option');

  /**
   * Helper text
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Error message
   */
  readonly errorMessage = input<string | undefined>(undefined);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Required field
   */
  readonly required = input<boolean>(false);

  /**
   * Select size
   */
  readonly size = input<SelectSize>('md');

  /**
   * Full width
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Name attribute for forms
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
   * Internal value state
   */
  protected readonly internalValue = signal<string | undefined>(undefined);

  /**
   * Reference to select element
   */
  protected readonly selectElement = viewChild<ElementRef<HTMLSelectElement>>('select');

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID for select element
   */
  protected readonly selectId = computed(() => {
    const providedId = this.id();
    return providedId || `ui-select-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed ID for helper text
   */
  protected readonly helperTextId = computed(() => `${this.selectId()}-helper`);

  /**
   * Computed ID for error message
   */
  protected readonly errorId = computed(() => `${this.selectId()}-error`);

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
  protected readonly selectClasses = computed(() => ({
    'ui-select': true,
    [`ui-select--${this.size()}`]: true,
    'ui-select--error': this.hasError(),
    'ui-select--disabled': this.disabled(),
    'ui-select--has-value': !!this.internalValue(),
  }));

  /**
   * Group options by group property
   */
  protected readonly groupedOptions = computed(() => {
    const options = this.options();
    const grouped = new Map<string | undefined, SelectOption[]>();
    
    options.forEach(option => {
      const group = option.group;
      if (!grouped.has(group)) {
        grouped.set(group, []);
      }
      grouped.get(group)!.push(option);
    });
    
    return grouped;
  });

  /**
   * Check if options have groups
   */
  protected readonly hasGroups = computed(() => {
    return this.options().some(opt => opt.group !== undefined);
  });

  constructor() {
    // Sync internal value
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  /**
   * Handle select change
   */
  protected handleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value;
    
    this.internalValue.set(newValue);
    this.valueChange.emit(newValue);
  }

  /**
   * Focus the select
   */
  public focus(): void {
    const select = this.selectElement();
    if (select) {
      select.nativeElement.focus();
    }
  }
}

