/**
 * List Component
 * 
 * A flexible list component for displaying collections of items.
 * Supports ordered, unordered, and interactive variants.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  [key: string]: any;
}

export type ListVariant = 'default' | 'bordered' | 'divided';
export type ListSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ListComponent {
  /**
   * List items
   */
  readonly items = input.required<ListItem[]>();

  /**
   * List variant
   */
  readonly variant = input<ListVariant>('default');

  /**
   * List size
   */
  readonly size = input<ListSize>('md');

  /**
   * Ordered list (ol vs ul)
   */
  readonly ordered = input<boolean>(false);

  /**
   * Interactive/clickable items
   */
  readonly interactive = input<boolean>(false);

  /**
   * Show item icons
   */
  readonly showIcons = input<boolean>(true);

  /**
   * Empty message
   */
  readonly emptyMessage = input<string>('No items');

  /**
   * Item click event
   */
  readonly itemClick = output<ListItem>();

  /**
   * Computed CSS classes
   */
  protected readonly listClasses = computed(() => ({
    'ui-list': true,
    [`ui-list--${this.variant()}`]: true,
    [`ui-list--${this.size()}`]: true,
    'ui-list--interactive': this.interactive(),
    'ui-list--ordered': this.ordered(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.listClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Handle item click
   */
  protected handleItemClick(item: ListItem): void {
    if (!this.interactive() || item.disabled) return;
    this.itemClick.emit(item);
  }
}

