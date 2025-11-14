/**
 * Badge Component
 * 
 * A themable badge/label component for displaying status, counts, or categories.
 * Uses Angular 20 best practices with flexible content projection.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"status"',
  },
})
export class BadgeComponent {
  /**
   * Badge visual variant
   */
  readonly variant = input<BadgeVariant>('default');

  /**
   * Badge size
   */
  readonly size = input<BadgeSize>('md');

  /**
   * Badge text content (alternative to content projection)
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Whether to display a dot indicator
   */
  readonly dot = input<boolean>(false);

  /**
   * Pill-shaped badge (fully rounded)
   */
  readonly pill = input<boolean>(false);

  /**
   * Max number to display (for count badges)
   * Numbers exceeding this will show as "max+"
   */
  readonly max = input<number | undefined>(undefined);

  /**
   * Count value (for numeric badges)
   */
  readonly count = input<number | undefined>(undefined);

  /**
   * Whether badge is dismissible
   */
  readonly dismissible = input<boolean>(false);

  /**
   * Icon name or slot for custom icon
   */
  readonly icon = input<string | undefined>(undefined);

  /**
   * ARIA label for accessibility
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Computed display text for count badges
   */
  protected readonly displayCount = computed(() => {
    const count = this.count();
    const max = this.max();
    
    if (count === undefined) {
      return undefined;
    }
    
    if (max !== undefined && count > max) {
      return `${max}+`;
    }
    
    return count.toString();
  });

  /**
   * Computed CSS classes
   */
  protected readonly badgeClasses = computed(() => ({
    'ui-badge': true,
    [`ui-badge--${this.variant()}`]: true,
    [`ui-badge--${this.size()}`]: true,
    'ui-badge--pill': this.pill(),
    'ui-badge--with-dot': this.dot(),
    'ui-badge--dismissible': this.dismissible(),
    'ui-badge--with-icon': !!this.icon(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.badgeClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Computed ARIA label
   */
  protected readonly computedAriaLabel = computed(() => {
    const ariaLabel = this.ariaLabel();
    if (ariaLabel) {
      return ariaLabel;
    }
    
    const count = this.displayCount();
    if (count) {
      return `${count} items`;
    }
    
    return undefined;
  });

  /**
   * Handle dismiss click
   */
  protected handleDismiss(event: MouseEvent): void {
    event.stopPropagation();
    // In a real implementation, this would emit an event
    // For now, it's just for styling/accessibility demonstration
  }
}

