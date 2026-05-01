/**
 * Input Component
 * 
 * A themable input component with validation states and full accessibility support.
 * Uses native HTML5 input element with Angular 20 best practices.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type InputType = 'text' | 'email' | 'tel' | 'url' | 'number' | 'password' | 'search';

@Component({
  selector: 'ui-input',
  imports: [NgClass, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-input-wrapper]': 'true',
    '[class.ui-input-wrapper--disabled]': 'disabled()',
    '[class.ui-input-wrapper--error]': 'hasError()',
    '[class.ui-input-wrapper--full-width]': 'fullWidth()',
  },
})
export class InputComponent {
  /**
   * Input type attribute
   */
  readonly type = input<InputType>('text');

  /**
   * Input value (two-way binding)
   */
  readonly value = input<string>('');

  /**
   * Placeholder text
   */
  readonly placeholder = input<string>('');

  /**
   * Icon or text rendered before the input value
   */
  readonly prefixIcon = input<string | undefined>(undefined);

  /**
   * Icon or text rendered after the input value
   */
  readonly suffixIcon = input<string | undefined>(undefined);

  /**
   * Show a built-in password reveal toggle when type is password
   */
  readonly showPasswordToggle = input<boolean>(false);

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Helper text (shown below input)
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Error message (shows error state)
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
   * Readonly state
   */
  readonly readonly = input<boolean>(false);

  /**
   * Full width input
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Auto focus on mount
   */
  readonly autoFocus = input<boolean>(false);

  /**
   * Maximum length
   */
  readonly maxLength = input<number | undefined>(undefined);

  /**
   * Minimum length
   */
  readonly minLength = input<number | undefined>(undefined);

  /**
   * Pattern for validation
   */
  readonly pattern = input<string | undefined>(undefined);

  /**
   * Autocomplete attribute
   */
  readonly autocomplete = input<string | undefined>(undefined);

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
   * ARIA described by
   */
  readonly ariaDescribedBy = input<string | undefined>(undefined);

  /**
   * Value change event
   */
  readonly valueChange = output<string>();

  /**
   * Blur event
   */
  readonly blurred = output<FocusEvent>();

  /**
   * Focus event
   */
  readonly focused = output<FocusEvent>();

  /**
   * Input event (on every keystroke)
   */
  readonly inputted = output<Event>();

  /**
   * Internal value signal
   */
  protected readonly internalValue = signal('');

  /**
   * Internal focus state
   */
  protected readonly isFocused = signal(false);

  /**
   * Whether the user has interacted with the field
   */
  protected readonly hasInteracted = signal(false);

  /**
   * Internal validation message derived from native validity rules
   */
  protected readonly internalValidationMessage = signal<string | undefined>(undefined);

  /**
   * Whether password content is currently visible
   */
  protected readonly isPasswordVisible = signal(false);

  /**
   * Reference to input element
   */
  protected readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('input');

  /**
   * Computed error message
   */
  protected readonly displayedErrorMessage = computed(
    () => this.errorMessage() || (this.hasInteracted() ? this.internalValidationMessage() : undefined)
  );

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.displayedErrorMessage());

  /**
   * Computed ID for input element
   */
  protected readonly inputId = computed(() => {
    const providedId = this.id();
    return providedId || `ui-input-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed ID for helper text
   */
  protected readonly helperTextId = computed(() => `${this.inputId()}-helper`);

  /**
   * Computed ID for error message
   */
  protected readonly errorId = computed(() => `${this.inputId()}-error`);

  /**
   * Computed aria-describedby value
   */
  protected readonly computedAriaDescribedBy = computed(() => {
    const parts: string[] = [];
    
    if (this.ariaDescribedBy()) {
      parts.push(this.ariaDescribedBy()!);
    }
    
    if (this.helperText()) {
      parts.push(this.helperTextId());
    }
    
    if (this.hasError()) {
      parts.push(this.errorId());
    }
    
    return parts.length > 0 ? parts.join(' ') : undefined;
  });

  /**
   * Computed CSS classes for input
   */
  protected readonly inputClasses = computed(() => ({
    'ui-input': true,
    'ui-input--error': this.hasError(),
    'ui-input--disabled': this.disabled(),
    'ui-input--focused': this.isFocused(),
  }));

  /**
   * Whether the configured input type is password.
   */
  protected readonly isPasswordType = computed(() => this.type() === 'password');

  /**
   * Whether the built-in password toggle should render.
   */
  protected readonly shouldShowPasswordToggle = computed(
    () => this.isPasswordType() && this.showPasswordToggle()
  );

  /**
   * Type passed to the native input element.
   */
  protected readonly resolvedInputType = computed<InputType>(() => {
    if (this.shouldShowPasswordToggle() && this.isPasswordVisible()) {
      return 'text';
    }

    return this.type();
  });

  /**
   * Accessible label for the password toggle control.
   */
  protected readonly passwordToggleLabel = computed(() =>
    this.isPasswordVisible() ? 'Hide password' : 'Show password'
  );

  constructor() {
    // Sync internal value with input value
    effect(() => {
      this.internalValue.set(this.value());

      this.required();
      this.minLength();
      this.maxLength();
      this.pattern();
      this.type();

      if (this.hasInteracted()) {
        queueMicrotask(() => this.updateValidationState());
      }
    });

    // Auto focus if needed
    effect(() => {
      if (this.autoFocus()) {
        const input = this.inputElement();
        if (input) {
          setTimeout(() => input.nativeElement.focus(), 0);
        }
      }
    });
  }

  /**
   * Handle input value change
   */
  protected handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    
    this.internalValue.set(newValue);
    this.hasInteracted.set(true);
    this.updateValidationState(target);
    this.valueChange.emit(newValue);
    this.inputted.emit(event);
  }

  /**
   * Handle focus event
   */
  protected handleFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.focused.emit(event);
  }

  /**
   * Handle blur event
   */
  protected handleBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.hasInteracted.set(true);
    this.updateValidationState(event.target as HTMLInputElement | null);
    this.blurred.emit(event);
  }

  /**
   * Toggle password visibility while preserving focus and selection.
   */
  protected togglePasswordVisibility(): void {
    const input = this.inputElement()?.nativeElement;
    const selectionStart = input?.selectionStart ?? null;
    const selectionEnd = input?.selectionEnd ?? null;

    this.isPasswordVisible.update(isVisible => !isVisible);

    queueMicrotask(() => {
      const resolvedInput = this.inputElement()?.nativeElement;

      if (!resolvedInput) {
        return;
      }

      resolvedInput.focus({ preventScroll: true });

      if (selectionStart !== null && selectionEnd !== null) {
        resolvedInput.setSelectionRange(selectionStart, selectionEnd);
      }
    });
  }

  /**
   * Synchronize validation state with native input validity.
   */
  private updateValidationState(inputElement?: HTMLInputElement | null): void {
    const resolvedInput = inputElement ?? this.inputElement()?.nativeElement;

    if (!resolvedInput || this.disabled() || this.readonly()) {
      this.internalValidationMessage.set(undefined);
      return;
    }

    const validationMessage = resolvedInput.validity.valid
      ? undefined
      : resolvedInput.validationMessage || this.getFallbackValidationMessage(resolvedInput.value);

    this.internalValidationMessage.set(validationMessage);
  }

  /**
   * Provide fallback validation copy when browser message is unavailable.
   */
  private getFallbackValidationMessage(value: string): string | undefined {
    if (this.required() && !value.trim()) {
      return 'This field is required.';
    }

    const minLength = this.minLength();
    if (minLength !== undefined && value.length < minLength) {
      return `Enter at least ${minLength} characters.`;
    }

    const maxLength = this.maxLength();
    if (maxLength !== undefined && value.length > maxLength) {
      return `Enter no more than ${maxLength} characters.`;
    }

    const pattern = this.pattern();
    if (pattern && value) {
      try {
        if (!new RegExp(pattern).test(value)) {
          return 'Enter value in required format.';
        }
      } catch {
        return 'Enter a valid value.';
      }
    }

    return undefined;
  }

  /**
   * Focus the input programmatically
   */
  public focus(): void {
    const input = this.inputElement();
    if (input) {
      input.nativeElement.focus();
    }
  }

  /**
   * Blur the input programmatically
   */
  public blur(): void {
    const input = this.inputElement();
    if (input) {
      input.nativeElement.blur();
    }
  }

  /**
   * Select all text in the input
   */
  public selectAll(): void {
    const input = this.inputElement();
    if (input) {
      input.nativeElement.select();
    }
  }
}

