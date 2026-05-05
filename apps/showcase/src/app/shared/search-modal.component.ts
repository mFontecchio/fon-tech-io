/**
 * Search Modal Component
 * Global search with fuzzy matching and keyboard shortcuts
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Fuse, { FuseResult, FuseResultMatch } from 'fuse.js';
import { getAllComponentMetadata } from '../data/component-metadata';
import { ComponentMetadata } from '../data/component-metadata.types';

interface SearchResult {
  item: ComponentMetadata;
  matches?: readonly FuseResultMatch[];
  score?: number;
}

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule],
  host: {
    '(window:keydown)': 'handleKeyDown($event)',
  },
  template: `
    @if (isOpen()) {
      <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
      <div class="search-modal-backdrop" (click)="close()">
        <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
        <dialog
          class="search-modal"
          aria-label="Search components"
          open
          (click)="$event.stopPropagation()"
        >
          <!-- Search Header -->
          <div class="search-header">
            <div class="search-input-wrapper">
              <svg
                class="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                #searchInput
                type="text"
                class="search-input"
                placeholder="Search components..."
                [value]="searchQuery()"
                (input)="handleInput($event)"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
              />
              @if (searchQuery()) {
                <button class="search-clear" (click)="clearSearch()" aria-label="Clear search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              }
            </div>
            <button class="search-close" (click)="close()" aria-label="Close search">
              <kbd>ESC</kbd>
            </button>
          </div>

          <!-- Live region for result count -->
          <div class="search-results-live" aria-live="polite" aria-atomic="true">
            @if (searchQuery() && searchResults().length > 0) {
              {{ searchResults().length }} result{{ searchResults().length === 1 ? '' : 's' }} found
            } @else if (searchQuery() && searchResults().length === 0) {
              No results found
            }
          </div>

          <!-- Search Results -->
          <div class="search-results" role="listbox" aria-label="Search results">
            @if (searchQuery() && searchResults().length > 0) {
              @for (category of categorizedResults(); track category.name) {
                <div class="search-category">
                  <div class="search-category-header">{{ category.name }}</div>
                  @for (result of category.results; track result.item.id; let i = $index) {
                    <button
                      class="search-result-item"
                      [class.search-result-item--selected]="isSelected(result.item.id)"
                      role="option"
                      [attr.aria-selected]="isSelected(result.item.id)"
                      (click)="selectResult(result.item)"
                      (mouseenter)="selectedIndex.set(getGlobalIndex(result.item.id))"
                    >
                      <div class="search-result-content">
                        <div class="search-result-name">{{ result.item.name }}</div>
                        <div class="search-result-description">{{ result.item.description }}</div>
                      </div>
                      <div class="search-result-category-badge">{{ result.item.category }}</div>
                    </button>
                  }
                </div>
              }
            } @else if (searchQuery() && searchResults().length === 0) {
              <div class="search-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <p>No components found for "{{ searchQuery() }}"</p>
                <p class="search-empty-hint">
                  Try searching for button, input, modal, or other component names
                </p>
              </div>
            } @else {
              <div class="search-suggestions">
                <div class="search-suggestions-header">Popular Components</div>
                @for (component of popularComponents; track component.id) {
                  <button
                    class="search-result-item"
                    [class.search-result-item--selected]="isSelected(component.id)"
                    role="option"
                    [attr.aria-selected]="isSelected(component.id)"
                    (click)="selectResult(component)"
                    (mouseenter)="selectedIndex.set(getGlobalIndex(component.id))"
                  >
                    <div class="search-result-content">
                      <div class="search-result-name">{{ component.name }}</div>
                      <div class="search-result-description">{{ component.description }}</div>
                    </div>
                    <div class="search-result-category-badge">{{ component.category }}</div>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Search Footer -->
          <div class="search-footer">
            <div class="search-shortcuts">
              <span class="search-shortcut"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span class="search-shortcut"><kbd>↵</kbd> Select</span>
              <span class="search-shortcut"><kbd>ESC</kbd> Close</span>
            </div>
          </div>
        </dialog>
      </div>
    }
  `,
  styles: [
    `
      .search-modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 2000;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 10vh 1rem 1rem;
        animation: fadeIn var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-decelerate, cubic-bezier(0, 0, 0.2, 1));
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .search-modal {
        width: 100%;
        max-width: 640px;
        background-color: var(--semantic-surface-card);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-lg);
        box-shadow: var(--primitive-shadow-2xl);
        display: flex;
        flex-direction: column;
        max-height: 80vh;
        animation: slideDown var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-decelerate, cubic-bezier(0, 0, 0.2, 1));
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Header */
      .search-header {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
        padding: var(--primitive-spacing-4);
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .search-input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
        background-color: var(--semantic-surface-background-secondary);
        border-radius: var(--primitive-border-radius-md);
        padding: var(--primitive-spacing-3);
      }

      .search-icon {
        color: var(--semantic-text-secondary);
        flex-shrink: 0;
        stroke-width: 2;
      }

      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: var(--primitive-font-size-base);
        color: var(--semantic-text-primary);
        outline: none;
      }

      .search-input::placeholder {
        color: var(--semantic-text-secondary);
      }

      .search-clear,
      .search-close {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--primitive-spacing-2);
        border: none;
        background: transparent;
        color: var(--semantic-text-secondary);
        border-radius: var(--primitive-border-radius-sm);
        cursor: pointer;
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .search-clear:hover,
      .search-close:hover {
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-text-primary);
      }

      .search-clear svg {
        stroke-width: 2;
      }

      kbd {
        display: inline-block;
        padding: 2px 6px;
        font-size: 11px;
        font-family: var(--primitive-font-family-mono);
        background-color: var(--semantic-surface-background-secondary);
        border: 1px solid var(--semantic-border-default);
        border-radius: 4px;
        box-shadow: 0 1px 0 var(--semantic-border-default);
      }

      /* Results */
      .search-results {
        flex: 1;
        overflow-y: auto;
        padding: var(--primitive-spacing-2);
      }

      .search-results-live {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }

      .search-category {
        margin-bottom: var(--primitive-spacing-4);
      }

      .search-category:last-child {
        margin-bottom: 0;
      }

      .search-category-header {
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .search-result-item {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
        width: 100%;
        padding: var(--primitive-spacing-3);
        border: none;
        background: transparent;
        border-radius: var(--primitive-border-radius-md);
        cursor: pointer;
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
        text-align: left;
      }

      .search-result-item:hover,
      .search-result-item--selected {
        background-color: var(--semantic-surface-background-secondary);
      }

      .search-result-content {
        flex: 1;
        min-width: 0;
      }

      .search-result-name {
        font-size: var(--primitive-font-size-base);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-primary);
        margin-bottom: 2px;
      }

      .search-result-description {
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .search-result-category-badge {
        padding: 2px 8px;
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-secondary);
        background-color: var(--semantic-surface-background-secondary);
        border-radius: var(--primitive-border-radius-sm);
        flex-shrink: 0;
      }

      /* Empty State */
      .search-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--primitive-spacing-10) var(--primitive-spacing-4);
        text-align: center;
        color: var(--semantic-text-secondary);
      }

      .search-empty svg {
        margin-bottom: var(--primitive-spacing-4);
        opacity: 0.3;
        stroke-width: 1.5;
      }

      .search-empty p {
        margin: 0 0 var(--primitive-spacing-2) 0;
        font-size: var(--primitive-font-size-base);
      }

      .search-empty-hint {
        font-size: var(--primitive-font-size-sm);
        opacity: 0.7;
      }

      /* Suggestions */
      .search-suggestions {
        padding: var(--primitive-spacing-2);
      }

      .search-suggestions-header {
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Footer */
      .search-footer {
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        border-top: 1px solid var(--semantic-border-default);
        background-color: var(--semantic-surface-background-secondary);
      }

      .search-shortcuts {
        display: flex;
        gap: var(--primitive-spacing-4);
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-secondary);
      }

      .search-shortcut {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
      }

      .search-shortcut kbd {
        font-size: 10px;
      }

      /* Scrollbar */
      .search-results::-webkit-scrollbar {
        width: 8px;
      }

      .search-results::-webkit-scrollbar-track {
        background: transparent;
      }

      .search-results::-webkit-scrollbar-thumb {
        background: var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-full);
      }

      .search-results::-webkit-scrollbar-thumb:hover {
        background: var(--semantic-border-strong);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchModalComponent {
  private readonly router = inject(Router);

  // State
  readonly isOpen = signal(false);
  readonly searchQuery = signal('');
  readonly selectedIndex = linkedSignal(() => {
    this.searchQuery();
    return 0;
  });

  // All components
  private readonly allComponents = getAllComponentMetadata();

  // Popular components (shown when no search query)
  readonly popularComponents = this.allComponents.slice(0, 6);

  // Fuse.js instance
  private readonly fuse = new Fuse<ComponentMetadata>(this.allComponents, {
    keys: [
      { name: 'name', weight: 2 },
      { name: 'description', weight: 1 },
      { name: 'category', weight: 1 },
    ],
    threshold: 0.3,
    includeMatches: true,
    includeScore: true,
  });

  // Search results
  readonly searchResults = computed(() => {
    const query = this.searchQuery();
    if (!query) return [];

    const results = this.fuse.search(query);
    return results.map((result) => ({
      item: result.item,
      matches: result.matches,
      score: result.score,
    }));
  });

  // Categorized results
  readonly categorizedResults = computed(() => {
    const results = this.searchResults();
    const categories = new Map<string, SearchResult[]>();

    results.forEach((result) => {
      const category = result.item.category;
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(result);
    });

    return Array.from(categories.entries()).map(([name, results]) => ({
      name: this.formatCategoryName(name),
      results,
    }));
  });

  // Flat list of all visible results (for keyboard navigation)
  private readonly flatResults = computed(() => {
    const query = this.searchQuery();
    if (query) {
      return this.searchResults().map((r) => r.item);
    } else {
      return this.popularComponents;
    }
  });

  handleKeyDown(event: KeyboardEvent): void {
    // Cmd/Ctrl+K to open
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.open();
      return;
    }

    // Only handle these keys when modal is open
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.navigateDown();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.navigateUp();
        break;

      case 'Enter':
        event.preventDefault();
        this.selectCurrentResult();
        break;
    }
  }

  private readonly searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  open(): void {
    this.isOpen.set(true);
    this.searchQuery.set('');
    this.selectedIndex.set(0);

    afterNextRender(() => {
      this.searchInputRef()?.nativeElement.focus();
    });
  }

  close(): void {
    this.isOpen.set(false);
    this.searchQuery.set('');
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchInputRef()?.nativeElement.focus();
  }

  selectResult(component: ComponentMetadata): void {
    this.router.navigate(['/components', component.category, component.id]);
    this.close();
  }

  protected isSelected(componentId: string): boolean {
    const results = this.flatResults();
    return results[this.selectedIndex()]?.id === componentId;
  }

  protected getGlobalIndex(componentId: string): number {
    return this.flatResults().findIndex((c: ComponentMetadata) => c.id === componentId);
  }

  private navigateDown(): void {
    const maxIndex = this.flatResults().length - 1;
    this.selectedIndex.update((i) => Math.min(i + 1, maxIndex));
  }

  private navigateUp(): void {
    this.selectedIndex.update((i) => Math.max(i - 1, 0));
  }

  private selectCurrentResult(): void {
    const results = this.flatResults();
    const selected = results[this.selectedIndex()];
    if (selected) {
      this.selectResult(selected);
    }
  }

  private formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1) + ' Components';
  }
}
