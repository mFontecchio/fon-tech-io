/**
 * Chip Component
 * 
 * A compact element representing input, attribute, or action.
 * Similar to Badge but interactive and removable.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ChipSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'fui-chip',
  imports: [NgClass],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ChipComponent {
  /**
   * Chip visual variant
   */
  readonly variant = input<ChipVariant>('default');

  /**
   * Chip size
   */
  readonly size = input<ChipSize>('md');

  /**
   * Chip label text
   */
  readonly label = input.required<string>();

  /**
   * Avatar/icon to display
   */
  readonly avatar = input<string | undefined>(undefined);

  /**
   * Whether chip is removable
   */
  readonly removable = input<boolean>(false);

  /**
   * Whether chip is clickable
   */
  readonly clickable = input<boolean>(false);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * ARIA label
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Click event
   */
  readonly clicked = output<void>();

  /**
   * Remove event
   */
  readonly removed = output<void>();

  /**
   * Computed CSS classes
   */
  protected readonly chipClasses = computed(() => ({
    'fui-chip': true,
    [`fui-chip--${this.variant()}`]: true,
    [`fui-chip--${this.size()}`]: true,
    'fui-chip--clickable': this.clickable() && !this.disabled(),
    'fui-chip--disabled': this.disabled(),
    'fui-chip--with-avatar': !!this.avatar(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.chipClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Handle chip click
   */
  protected handleClick(): void {
    if (!this.disabled() && this.clickable()) {
      this.clicked.emit();
    }
  }

  /**
   * Handle remove click
   */
  protected handleRemove(event: Event): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.removed.emit();
    }
  }
}

