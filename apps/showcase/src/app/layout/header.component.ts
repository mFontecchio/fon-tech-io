/**
 * Header Component
 * Top navigation bar with logo, search, and theme toggle
 */

import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../shared/theme-switcher.component';
import { SearchModalComponent } from '../shared/search-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ThemeSwitcherComponent, SearchModalComponent],
  template: `
    <header class="app-header">
      <div class="app-header-content">
        <!-- Logo/Brand -->
        <a routerLink="/" class="app-header-brand">
          <span class="brand-name">UI Component Suite</span>
        </a>

        <!-- Navigation -->
        <nav class="app-header-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/components" routerLinkActive="active">Components</a>
          <a routerLink="/theme-builder" routerLinkActive="active">Theme Builder</a>
          <a routerLink="/getting-started" routerLinkActive="active">Getting Started</a>
        </nav>

        <!-- Actions -->
        <div class="app-header-actions">
          <!-- Search -->
          <button class="search-button" (click)="openSearch()" [title]="'Search components (Cmd+K)'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <!-- Theme Switcher -->
          <app-theme-switcher />

          <!-- GitHub Link -->
          <a href="https://github.com" target="_blank" class="github-link" title="View on GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Search Modal -->
    <app-search-modal />
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--semantic-surface-card);
      border-bottom: 1px solid var(--semantic-border-default);
      box-shadow: var(--primitive-shadow-sm);
    }

    .app-header-content {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-6);
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--primitive-spacing-4) var(--primitive-spacing-6);
    }

    /* Brand */
    .app-header-brand {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-3);
      text-decoration: none;
      color: var(--semantic-text-primary);
      font-weight: var(--primitive-font-weight-bold);
      font-size: var(--primitive-font-size-lg);
      transition: opacity 0.2s;
    }

    .app-header-brand:hover {
      opacity: 0.8;
    }

    /* Navigation */
    .app-header-nav {
      display: flex;
      gap: var(--primitive-spacing-2);
      margin-left: auto;
    }

    .app-header-nav a {
      padding: var(--primitive-spacing-2) var(--primitive-spacing-4);
      text-decoration: none;
      color: var(--semantic-text-secondary);
      border-radius: var(--primitive-border-radius-md);
      transition: all 0.2s;
      font-weight: var(--primitive-font-weight-medium);
    }

    .app-header-nav a:hover {
      color: var(--semantic-text-primary);
      background-color: var(--semantic-surface-subtle);
    }

    .app-header-nav a.active {
      color: var(--semantic-brand-primary);
      background-color: var(--semantic-brand-subtle);
    }

    /* Actions */
    .app-header-actions {
      display: flex;
      gap: var(--primitive-spacing-2);
      align-items: center;
    }

    .search-button,
    .github-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border: none;
      background: transparent;
      color: var(--semantic-text-secondary);
      border-radius: var(--primitive-border-radius-md);
      cursor: pointer;
      transition: all 0.2s;
    }

    .search-button:hover,
    .github-link:hover {
      color: var(--semantic-text-primary);
      background-color: var(--semantic-surface-subtle);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .app-header-nav {
        display: none;
      }

      .brand-name {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly searchModal = viewChild(SearchModalComponent);

  protected openSearch(): void {
    this.searchModal()?.open();
  }
}

