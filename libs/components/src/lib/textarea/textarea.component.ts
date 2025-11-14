/**
 * Textarea Component
 * 
 * A themable textarea component with auto-resize and character count features.
 * Uses native HTML textarea element with Angular 20 best practices.
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

@Component({
  selector: 'ui-textarea',
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-textarea-wrapper]': 'true',
    '[class.ui-textarea-wrapper--disabled]': 'disabled()',
    '[class.ui-textarea-wrapper--error]': 'hasError()',
    '[class.ui-textarea-wrapper--full-width]': 'fullWidth()',
  },
})
export class TextareaComponent {
  /**
   * Textarea value (two-way binding)
   */
  readonly value = input<string>('');

  /**
   * Placeholder text
   */
  readonly placeholder = input<string>('');

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
   * Full width textarea
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Auto resize to fit content
   */
  readonly autoResize = input<boolean>(false);

  /**
   * Show character count
   */
  readonly showCharacterCount = input<boolean>(false);

  /**
   * Maximum character length
   */
  readonly maxLength = input<number | undefined>(undefined);

  /**
   * Minimum character length
   */
  readonly minLength = input<number | undefined>(undefined);

  /**
   * Number of visible rows
   */
  readonly rows = input<number>(3);

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
   * Blur event
   */
  readonly blurred = output<FocusEvent>();

  /**
   * Focus event
   */
  readonly focused = output<FocusEvent>();

  /**
   * Input event
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
   * Reference to textarea element
   */
  protected readonly textareaElement = viewChild<ElementRef<HTMLTextAreaElement>>('textarea');

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed character count
   */
  protected readonly characterCount = computed(() => this.internalValue().length);

  /**
   * Computed remaining characters
   */
  protected readonly remainingCharacters = computed(() => {
    const max = this.maxLength();
    return max ? max - this.characterCount() : null;
  });

  /**
   * Computed ID for textarea element
   */
  protected readonly textareaId = computed(() => {
    const providedId = this.id();
    return providedId || `ui-textarea-${Math.random().toString(36).substr(2, 9)}`;
  });

  /**
   * Computed ID for helper text
   */
  protected readonly helperTextId = computed(() => `${this.textareaId()}-helper`);

  /**
   * Computed ID for error message
   */
  protected readonly errorId = computed(() => `${this.textareaId()}-error`);

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
   * Computed CSS classes for textarea
   */
  protected readonly textareaClasses = computed(() => ({
    'ui-textarea': true,
    'ui-textarea--error': this.hasError(),
    'ui-textarea--disabled': this.disabled(),
    'ui-textarea--focused': this.isFocused(),
    'ui-textarea--auto-resize': this.autoResize(),
  }));

  constructor() {
    // Sync internal value with input value
    effect(() => {
      this.internalValue.set(this.value());
      if (this.autoResize()) {
        this.adjustHeight();
      }
    });
  }

  /**
   * Handle textarea value change
   */
  protected handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;
    
    this.internalValue.set(newValue);
    this.valueChange.emit(newValue);
    this.inputted.emit(event);

    if (this.autoResize()) {
      this.adjustHeight();
    }
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
    this.blurred.emit(event);
  }

  /**
   * Adjust textarea height to fit content
   */
  private adjustHeight(): void {
    const textarea = this.textareaElement();
    if (!textarea) return;

    const element = textarea.nativeElement;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }

  /**
   * Focus the textarea programmatically
   */
  public focus(): void {
    const textarea = this.textareaElement();
    if (textarea) {
      textarea.nativeElement.focus();
    }
  }

  /**
   * Blur the textarea programmatically
   */
  public blur(): void {
    const textarea = this.textareaElement();
    if (textarea) {
      textarea.nativeElement.blur();
    }
  }

  /**
   * Select all text in the textarea
   */
  public selectAll(): void {
    const textarea = this.textareaElement();
    if (textarea) {
      textarea.nativeElement.select();
    }
  }
}

