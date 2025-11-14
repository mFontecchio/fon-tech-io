import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [CommonModule, PaginationComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Pagination</h3>
      <ui-card>
        <ui-pagination
          [currentPage]="currentPage()"
          [totalItems]="100"
          [pageSize]="10"
          (pageChange)="currentPage.set($event)"
        />
        <p class="info-text">Current page: {{ currentPage() }} of 10</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Different Page Sizes</h3>
      <ui-card>
        <ui-pagination
          [currentPage]="page2()"
          [totalItems]="200"
          [pageSize]="20"
          (pageChange)="page2.set($event)"
        />
        <p class="info-text">20 items per page (10 total pages)</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Page Size Selector</h3>
      <ui-card>
        <ui-pagination
          [currentPage]="page3()"
          [totalItems]="150"
          [pageSize]="pageSize()"
          (pageChange)="page3.set($event)"
          (pageSizeChange)="handlePageSizeChange($event)"
        />
        <p class="info-text">
          Page {{ page3() }} - Showing {{ pageSize() }} items per page
        </p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="pagination-stack">
          <div>
            <p class="label">Small</p>
            <ui-pagination
              size="sm"
              [currentPage]="1"
              [totalItems]="100"
              [pageSize]="10"
            />
          </div>
          <div>
            <p class="label">Medium</p>
            <ui-pagination
              size="md"
              [currentPage]="1"
              [totalItems]="100"
              [pageSize]="10"
            />
          </div>
          <div>
            <p class="label">Large</p>
            <ui-pagination
              size="lg"
              [currentPage]="1"
              [totalItems]="100"
              [pageSize]="10"
            />
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: Search Results</h3>
      <ui-card>
        <div class="search-results">
          <h4>Search Results ({{ totalResults() }} items)</h4>
          <div class="results-list">
            @for (item of currentResults(); track item) {
              <div class="result-item">
                <h5>Result {{ item }}</h5>
                <p>This is result #{{ item }} from the search query.</p>
              </div>
            }
          </div>
          <ui-pagination
            [currentPage]="searchPage()"
            [totalItems]="totalResults()"
            [pageSize]="resultsPerPage()"
            (pageChange)="searchPage.set($event)"
            (pageSizeChange)="resultsPerPage.set($event)"
          />
        </div>
      </ui-card>
    </div>
  `,
  styles: [`
    .demo-section {
      margin-bottom: var(--primitive-spacing-6);
    }

    .demo-section h3 {
      margin-bottom: var(--primitive-spacing-3);
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .info-text {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .pagination-stack {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-5);
    }

    .label {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .search-results h4 {
      margin: 0 0 var(--primitive-spacing-4) 0;
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .results-list {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
      margin-bottom: var(--primitive-spacing-5);
    }

    .result-item {
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
    }

    .result-item h5 {
      margin: 0 0 var(--primitive-spacing-1) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .result-item p {
      margin: 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationDemoComponent {
  protected currentPage = signal(1);
  protected page2 = signal(1);
  protected page3 = signal(1);
  protected pageSize = signal(10);
  
  protected searchPage = signal(1);
  protected resultsPerPage = signal(5);
  protected totalResults = signal(47);
  
  protected currentResults = signal([1, 2, 3, 4, 5]);

  protected handlePageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page3.set(1); // Reset to first page
  }
}
