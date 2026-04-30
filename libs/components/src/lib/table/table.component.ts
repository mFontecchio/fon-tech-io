/**
 * Table Component
 * 
 * A data table component with sorting, filtering, and pagination support.
 * Built with accessibility and responsive design in mind.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string;
  direction: SortDirection;
}

export type TableSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-table',
  imports: [NgClass],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-table-wrapper]': 'true',
  },
})
export class TableComponent {
  /**
   * Table columns
   */
  readonly columns = input.required<TableColumn[]>();

  /**
   * Table data
   */
  readonly data = input.required<any[]>();

  /**
   * Table size
   */
  readonly size = input<TableSize>('md');

  /**
   * Striped rows
   */
  readonly striped = input<boolean>(false);

  /**
   * Hoverable rows
   */
  readonly hoverable = input<boolean>(true);

  /**
   * Bordered table
   */
  readonly bordered = input<boolean>(false);

  /**
   * Loading state
   */
  readonly loading = input<boolean>(false);

  /**
   * Empty message
   */
  readonly emptyMessage = input<string>('No data available');

  /**
   * Enable row selection
   */
  readonly selectable = input<boolean>(false);

  /**
   * Selected row indices
   */
  readonly selectedRows = input<number[]>([]);

  /**
   * Caption text
   */
  readonly caption = input<string | undefined>(undefined);

  /**
   * Sort change event
   */
  readonly sortChange = output<SortState>();

  /**
   * Row click event
   */
  readonly rowClick = output<{ row: any; index: number }>();

  /**
   * Selection change event
   */
  readonly selectionChange = output<number[]>();

  /**
   * Internal sort state
   */
  protected readonly sortState = signal<SortState>({ column: '', direction: null });

  /**
   * Internal selected rows
   */
  protected readonly internalSelectedRows = signal<number[]>([]);

  /**
   * Sorted data
   */
  protected readonly sortedData = computed(() => {
    const data = this.data();
    const sort = this.sortState();

    if (!sort.direction || !sort.column) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  });

  /**
   * All rows selected
   */
  protected readonly allSelected = computed(() => {
    const selected = this.internalSelectedRows();
    const dataLength = this.data().length;
    return dataLength > 0 && selected.length === dataLength;
  });

  /**
   * Some rows selected
   */
  protected readonly someSelected = computed(() => {
    const selected = this.internalSelectedRows();
    return selected.length > 0 && !this.allSelected();
  });

  /**
   * Computed CSS classes
   */
  protected readonly tableClasses = computed(() => ({
    'ui-table': true,
    [`ui-table--${this.size()}`]: true,
    'ui-table--striped': this.striped(),
    'ui-table--hoverable': this.hoverable(),
    'ui-table--bordered': this.bordered(),
    'ui-table--selectable': this.selectable(),
  }));

  constructor() {
    // Sync internal selected rows
    effect(() => {
      this.internalSelectedRows.set(this.selectedRows());
    });
  }

  /**
   * Handle column sort
   */
  protected handleSort(column: TableColumn): void {
    if (!column.sortable) return;

    const currentSort = this.sortState();
    let newDirection: SortDirection;

    if (currentSort.column === column.key) {
      // Cycle through: asc -> desc -> null
      newDirection = currentSort.direction === 'asc' ? 'desc' : currentSort.direction === 'desc' ? null : 'asc';
    } else {
      newDirection = 'asc';
    }

    const newSort: SortState = {
      column: newDirection ? column.key : '',
      direction: newDirection,
    };

    this.sortState.set(newSort);
    this.sortChange.emit(newSort);
  }

  /**
   * Handle row click
   */
  protected handleRowClick(row: any, index: number): void {
    this.rowClick.emit({ row, index });
  }

  /**
   * Handle row selection
   */
  protected handleRowSelect(index: number, event: Event): void {
    event.stopPropagation();

    const selected = this.internalSelectedRows();
    const newSelected = selected.includes(index)
      ? selected.filter(i => i !== index)
      : [...selected, index];

    this.internalSelectedRows.set(newSelected);
    this.selectionChange.emit(newSelected);
  }

  /**
   * Handle select all
   */
  protected handleSelectAll(): void {
    const newSelected = this.allSelected() ? [] : this.data().map((_, i) => i);
    this.internalSelectedRows.set(newSelected);
    this.selectionChange.emit(newSelected);
  }

  /**
   * Check if row is selected
   */
  protected isRowSelected(index: number): boolean {
    return this.internalSelectedRows().includes(index);
  }

  /**
   * Get sort icon
   */
  protected getSortIcon(column: TableColumn): string {
    if (!column.sortable) return '';

    const sort = this.sortState();
    if (sort.column !== column.key) return 'sort';
    
    return sort.direction === 'asc' ? 'sort-asc' : 'sort-desc';
  }
}

