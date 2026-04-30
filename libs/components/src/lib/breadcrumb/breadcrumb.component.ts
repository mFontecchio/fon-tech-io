/**
 * Breadcrumb Component
 * 
 * A navigation component showing the user's location in a hierarchy.
 * Supports custom separators and max displayed items with overflow.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
  isEllipsis?: boolean;
}

export type BreadcrumbSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-breadcrumb',
  imports: [NgClass],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.aria-label]': '"Breadcrumb"',
  },
})
export class BreadcrumbComponent {
  /**
   * Breadcrumb items
   */
  readonly items = input.required<BreadcrumbItem[]>();

  /**
   * Breadcrumb size
   */
  readonly size = input<BreadcrumbSize>('md');

  /**
   * Custom separator (default: /)
   */
  readonly separator = input<string>('/');

  /**
   * Maximum items to display (0 = unlimited)
   */
  readonly maxItems = input<number>(0);

  /**
   * Item clicked event (emits item and index)
   */
  readonly itemClicked = output<{ item: BreadcrumbItem; index: number }>();

  /**
   * Computed displayed items (with overflow handling)
   */
  protected readonly displayedItems = computed(() => {
    const allItems = this.items();
    const max = this.maxItems();
    
    if (max === 0 || allItems.length <= max) {
      return allItems;
    }
    
    // Show first item, ellipsis, and last (max - 1) items
    const lastItems = allItems.slice(-(max - 1));
    return [allItems[0], { label: '...', disabled: true, isEllipsis: true }, ...lastItems];
  });

  /**
   * Computed CSS classes
   */
  protected readonly breadcrumbClasses = computed(() => ({
    'ui-breadcrumb': true,
    [`ui-breadcrumb--${this.size()}`]: true,
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.breadcrumbClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Handle item click
   */
  protected handleItemClick(item: BreadcrumbItem, index: number, event: Event): void {
    if (item.disabled || (item as any).isEllipsis) {
      event.preventDefault();
      return;
    }
    
    this.itemClicked.emit({ item, index });
  }

  /**
   * Check if item is last
   */
  protected isLastItem(index: number): boolean {
    return index === this.displayedItems().length - 1;
  }
}

