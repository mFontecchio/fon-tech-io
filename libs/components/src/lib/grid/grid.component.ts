/**
 * Grid Component
 *
 * A responsive grid layout component with customizable columns and gaps.
 * Built with CSS Grid for modern, flexible layouts.
 */

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type GridColumns = 1 | 2 | 3 | 4 | 6 | 12 | 'auto';
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

@Component({
  selector: 'ui-grid',
  imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.--ui-grid-columns]': 'columnsValue()',
    '[style.--ui-grid-gap]': 'gapValue()',
  },
})
export class GridComponent {
  /**
   * Number of columns (or 'auto' for auto-fit)
   */
  readonly columns = input<GridColumns>(12);

  /**
   * Columns for tablet breakpoint
   */
  readonly columnsMd = input<GridColumns | undefined>(undefined);

  /**
   * Columns for desktop breakpoint
   */
  readonly columnsLg = input<GridColumns | undefined>(undefined);

  /**
   * Gap between items
   */
  readonly gap = input<GridGap>(4);

  /**
   * Row gap (defaults to gap if not specified)
   */
  readonly rowGap = input<GridGap | undefined>(undefined);

  /**
   * Column gap (defaults to gap if not specified)
   */
  readonly columnGap = input<GridGap | undefined>(undefined);

  /**
   * Minimum column width for auto-fit (in rem)
   */
  readonly minColumnWidth = input<number>(15);

  /**
   * Full width
   */
  readonly fullWidth = input<boolean>(true);

  /**
   * Computed CSS classes
   */
  protected readonly gridClasses = computed(() => ({
    'ui-grid': true,
    'ui-grid--full-width': this.fullWidth(),
    [`ui-grid--cols-md-${this.columnsMd()}`]: !!this.columnsMd(),
    [`ui-grid--cols-lg-${this.columnsLg()}`]: !!this.columnsLg(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.gridClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Computed columns value
   */
  protected readonly columnsValue = computed(() => {
    const columns = this.columns();

    if (columns === 'auto') {
      return `repeat(auto-fit, minmax(${this.minColumnWidth()}rem, 1fr))`;
    }

    return `repeat(${columns}, 1fr)`;
  });

  /**
   * Computed gap value
   */
  protected readonly gapValue = computed(() => {
    const rowGap = this.rowGap() ?? this.gap();
    const columnGap = this.columnGap() ?? this.gap();

    if (rowGap === columnGap) {
      return `var(--primitive-spacing-${this.gap()})`;
    }

    return `var(--primitive-spacing-${rowGap}) var(--primitive-spacing-${columnGap})`;
  });
}
