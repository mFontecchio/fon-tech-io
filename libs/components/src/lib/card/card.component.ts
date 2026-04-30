/**
 * Card Component
 * 
 * A themable card container component with optional header and footer.
 * Uses semantic HTML5 article element for accessibility.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

@Component({
  selector: 'ui-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-card-host]': 'true',
    '[class.ui-card-host--full-width]': 'fullWidth()',
    '[class.ui-card-host--interactive]': 'interactive()',
  },
})
export class CardComponent {
  /**
   * Card visual variant
   */
  readonly variant = input<CardVariant>('elevated');

  /**
   * Full width card
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Interactive card (adds hover effect)
   */
  readonly interactive = input<boolean>(false);

  /**
   * Disable card padding
   */
  readonly noPadding = input<boolean>(false);

  /**
   * ARIA label for the card
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * ARIA labelledby reference
   */
  readonly ariaLabelledBy = input<string | undefined>(undefined);

  /**
   * Computed CSS classes
   */
  protected readonly cardClasses = computed(() => ({
    'ui-card': true,
    [`ui-card--${this.variant()}`]: true,
    'ui-card--no-padding': this.noPadding(),
    'ui-card--interactive': this.interactive(),
  }));

  /**
   * Check if header slot has content
   */
  protected hasHeader = false;

  /**
   * Check if footer slot has content
   */
  protected hasFooter = false;
}

