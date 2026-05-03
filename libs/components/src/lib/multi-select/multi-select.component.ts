/**
 * MultiSelect Component
 *
 * An advanced select component with multi-selection, search/filtering, and tag creation.
 * Built with Angular 20 best practices and full accessibility support.
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
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export type MultiSelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-multi-select',
  imports: [NgClass, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-multi-select-wrapper]': 'true',
    '[class.ui-multi-select-wrapper--disabled]': 'disabled()',
    '[class.ui-multi-select-wrapper--full-width]': 'fullWidth()',
    '(document:click)': 'handleClickOutside($event)',
    '(keydown.escape)': 'handleEscape()',
  },
})
export class MultiSelectComponent {
  /**
   * Available options
   */
  readonly options = input.required<MultiSelectOption[]>();

  /**
   * Selected values
   */
  readonly value = input<string[]>([]);

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Placeholder text
   */
  readonly placeholder = input<string>('Select options...');

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
  readonly size = input<MultiSelectSize>('md');

  /**
   * Full width
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Enable search/filtering
   */
  readonly searchable = input<boolean>(true);

  /**
   * Allow creating new tags
   */
  readonly allowCreate = input<boolean>(false);

  /**
   * Maximum number of selections (0 = unlimited)
   */
  readonly maxSelections = input<number>(0);

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
  readonly valueChange = output<string[]>();

  /**
   * Option created event
   */
  readonly optionCreated = output<MultiSelectOption>();

  /**
   * Internal selected values
   */
  protected readonly internalValue = signal<string[]>([]);

  /**
   * Dropdown open state
   */
  protected readonly isOpen = signal(false);

  /**
   * Search query
   */
  protected readonly searchQuery = signal('');

  /**
   * Reference to search input
   */
  protected readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed ID
   */
  protected readonly selectId = computed(() => {
    const providedId = this.id();
    return providedId || `ui-multi-select-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed helper text ID
   */
  protected readonly helperTextId = computed(() => `${this.selectId()}-helper`);

  /**
   * Computed error ID
   */
  protected readonly errorId = computed(() => `${this.selectId()}-error`);

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
  protected readonly selectClasses = computed(() => ({
    'ui-multi-select': true,
    [`ui-multi-select--${this.size()}`]: true,
    'ui-multi-select--error': this.hasError(),
    'ui-multi-select--disabled': this.disabled(),
    'ui-multi-select--open': this.isOpen(),
  }));

  /**
   * Filtered options based on search
   */
  protected readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const allOptions = this.options();

    if (!query) {
      return allOptions;
    }

    return allOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query)
    );
  });

  /**
   * Selected option objects
   */
  protected readonly selectedOptions = computed(() => {
    const values = this.internalValue();
    const allOptions = this.options();
    return values
      .map((val) => allOptions.find((opt) => opt.value === val))
      .filter(Boolean) as MultiSelectOption[];
  });

  /**
   * Can create new option
   */
  protected readonly canCreateOption = computed(() => {
    const query = this.searchQuery().trim();
    if (!query || !this.allowCreate()) return false;

    const allOptions = this.options();
    const exists = allOptions.some(
      (opt) =>
        opt.label.toLowerCase() === query.toLowerCase() ||
        opt.value.toLowerCase() === query.toLowerCase()
    );

    return !exists;
  });

  /**
   * Has reached max selections
   */
  protected readonly hasReachedMax = computed(() => {
    const max = this.maxSelections();
    if (max === 0) return false;
    return this.internalValue().length >= max;
  });

  /**
   * Reference to host element
   */
  private elementRef = inject(ElementRef);

  constructor() {
    // Sync internal value
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  /**
   * Toggle dropdown
   */
  protected toggleDropdown(): void {
    if (this.disabled()) return;

    this.isOpen.update((val) => !val);

    if (this.isOpen() && this.searchable()) {
      // Focus search input when opened
      setTimeout(() => {
        const input = this.searchInput();
        if (input) {
          input.nativeElement.focus();
        }
      });
    }
  }

  /**
   * Close dropdown
   */
  protected closeDropdown(): void {
    this.isOpen.set(false);
    this.searchQuery.set('');
  }

  /**
   * Toggle option selection
   */
  protected toggleOption(option: MultiSelectOption): void {
    if (option.disabled) return;

    const currentValues = this.internalValue();
    const index = currentValues.indexOf(option.value);

    if (index > -1) {
      // Remove
      const newValues = [...currentValues];
      newValues.splice(index, 1);
      this.internalValue.set(newValues);
      this.valueChange.emit(newValues);
    } else {
      // Add
      if (this.hasReachedMax()) return;

      const newValues = [...currentValues, option.value];
      this.internalValue.set(newValues);
      this.valueChange.emit(newValues);
    }
  }

  /**
   * Remove selected option
   */
  protected removeOption(option: MultiSelectOption, event: Event): void {
    event.stopPropagation();
    this.toggleOption(option);
  }

  /**
   * Create new option from search query
   */
  protected createOption(): void {
    const query = this.searchQuery().trim();
    if (!query || !this.canCreateOption()) return;

    const newOption: MultiSelectOption = {
      value: query.toLowerCase().replace(/\s+/g, '-'),
      label: query,
    };

    this.optionCreated.emit(newOption);
    this.toggleOption(newOption);
    this.searchQuery.set('');
  }

  /**
   * Clear all selections
   */
  protected clearAll(): void {
    this.internalValue.set([]);
    this.valueChange.emit([]);
  }

  /**
   * Check if option is selected
   */
  protected isSelected(option: MultiSelectOption): boolean {
    return this.internalValue().includes(option.value);
  }

  /**
   * Click outside to close
   */
  protected handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;

    if (!hostElement.contains(target) && this.isOpen()) {
      this.closeDropdown();
    }
  }

  /**
   * Handle escape key
   */
  protected handleEscape(): void {
    if (this.isOpen()) {
      this.closeDropdown();
    }
  }
}
