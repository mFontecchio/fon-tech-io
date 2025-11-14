/**
 * Button Component
 * 
 * A themable button component with multiple variants, sizes, and full accessibility support.
 * Uses native HTML button element with Angular 20 best practices.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'filled' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'ui-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-button-wrapper]': 'true',
  },
})
export class ButtonComponent {
  /**
   * Button variant style
   */
  readonly variant = input<ButtonVariant>('filled');

  /**
   * Button size
   */
  readonly size = input<ButtonSize>('md');

  /**
   * Button type attribute
   */
  readonly type = input<ButtonType>('button');

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Loading state - shows loading indicator and disables button
   */
  readonly loading = input<boolean>(false);

  /**
   * Full width button
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Icon only button (no text padding)
   */
  readonly iconOnly = input<boolean>(false);

  /**
   * ARIA label for accessibility
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Click event output
   */
  readonly clicked = output<MouseEvent>();

  /**
   * Internal loading state signal
   */
  protected readonly isLoading = signal(false);

  /**
   * Computed disabled state (disabled or loading)
   */
  protected readonly isDisabled = computed(() => this.disabled() || this.loading() || this.isLoading());

  /**
   * Computed CSS classes
   */
  protected readonly buttonClasses = computed(() => ({
    'ui-button': true,
    [`ui-button--${this.variant()}`]: true,
    [`ui-button--${this.size()}`]: true,
    'ui-button--disabled': this.isDisabled(),
    'ui-button--loading': this.loading(),
    'ui-button--full-width': this.fullWidth(),
    'ui-button--icon-only': this.iconOnly(),
  }));

  /**
   * Handle button click
   */
  protected handleClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }

  /**
   * Handle keyboard activation (Enter and Space)
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const mouseEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      this.handleClick(mouseEvent);
    }
  }
}

