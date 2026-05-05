/**
 * Pagination Component
 * 
 * A navigation component for paging through data.
 * Supports various display modes and customizable page sizes.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type PaginationSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'fui-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-pagination-wrapper]': 'true',
  },
})
export class PaginationComponent {
  /**
   * Current page (1-based)
   */
  readonly currentPage = input<number>(1);

  /**
   * Total number of items
   */
  readonly totalItems = input<number>(0);

  /**
   * Items per page
   */
  readonly pageSize = input<number>(10);

  /**
   * Maximum page buttons to display
   */
  readonly maxPages = input<number>(7);

  /**
   * Pagination size
   */
  readonly size = input<PaginationSize>('md');

  /**
   * Show first/last buttons
   */
  readonly showFirstLast = input<boolean>(true);

  /**
   * Show page size selector
   */
  readonly showPageSize = input<boolean>(false);

  /**
   * Available page sizes
   */
  readonly pageSizeOptions = input<number[]>([10, 20, 50, 100]);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Page change event
   */
  readonly pageChange = output<number>();

  /**
   * Page size change event
   */
  readonly pageSizeChange = output<number>();

  /**
   * Internal current page
   */
  protected readonly internalPage = linkedSignal(() => this.currentPage());

  /**
   * Internal page size
   */
  protected readonly internalPageSize = linkedSignal(() => this.pageSize());

  /**
   * Total pages
   */
  protected readonly totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.internalPageSize();
    return Math.ceil(total / size);
  });

  /**
   * Has previous page
   */
  protected readonly hasPrevious = computed(() => this.internalPage() > 1);

  /**
   * Has next page
   */
  protected readonly hasNext = computed(() => this.internalPage() < this.totalPages());

  /**
   * Page numbers to display
   */
  protected readonly displayedPages = computed(() => {
    const current = this.internalPage();
    const total = this.totalPages();
    const max = this.maxPages();

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = Math.max(1, current - half);
    const end = Math.min(total, start + max - 1);

    if (end - start < max - 1) {
      start = Math.max(1, end - max + 1);
    }

    const pages: (number | string)[] = [];

    // Add first page and ellipsis
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page
    if (end < total) {
      if (end < total - 1) {
        pages.push('...');
      }
      pages.push(total);
    }

    return pages;
  });

  /**
   * Computed CSS classes
   */
  protected readonly paginationClasses = computed(() => ({
    'fui-pagination': true,
    [`fui-pagination--${this.size()}`]: true,
    'fui-pagination--disabled': this.disabled(),
  }));

  /**
   * Go to specific page
   */
  protected goToPage(page: number): void {
    if (this.disabled() || page === this.internalPage()) return;

    const total = this.totalPages();
    const validPage = Math.max(1, Math.min(page, total));

    this.internalPage.set(validPage);
    this.pageChange.emit(validPage);
  }

  /**
   * Go to first page
   */
  protected goToFirst(): void {
    this.goToPage(1);
  }

  /**
   * Go to last page
   */
  protected goToLast(): void {
    this.goToPage(this.totalPages());
  }

  /**
   * Go to previous page
   */
  protected goToPrevious(): void {
    this.goToPage(this.internalPage() - 1);
  }

  /**
   * Go to next page
   */
  protected goToNext(): void {
    this.goToPage(this.internalPage() + 1);
  }

  /**
   * Handle page size change
   */
  protected handlePageSizeChange(size: number): void {
    if (this.disabled()) return;

    this.internalPageSize.set(size);
    this.pageSizeChange.emit(size);

    // Reset to first page when page size changes
    this.goToPage(1);
  }

  /**
   * Check if page is current
   */
  protected isCurrentPage(page: number | string): boolean {
    return page === this.internalPage();
  }

  /**
   * Check if value is ellipsis
   */
  protected isEllipsis(value: number | string): boolean {
    return value === '...';
  }
}

