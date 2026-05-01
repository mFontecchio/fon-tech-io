/**
 * Sidebar Navigation Component
 * Left sidebar with categorized component navigation
 */

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

interface NavCategory {
  label: string;
  items: NavItem[];
  expanded: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="app-sidebar" [class.mobile-open]="mobileMenuOpen()">
      <div class="sidebar-content">
        <!-- Getting Started -->
        <nav class="nav-section">
          <h3 class="nav-section-title">Getting Started</h3>
          <a routerLink="/getting-started/installation" routerLinkActive="active" class="nav-link">
            Installation
          </a>
          <a routerLink="/getting-started/usage" routerLinkActive="active" class="nav-link">
            Usage
          </a>
          <a routerLink="/getting-started/theming" routerLinkActive="active" class="nav-link">
            Theming
          </a>
        </nav>

        <!-- Components by Category -->
        @for (category of categories(); track category.label) {
          <nav class="nav-section">
            <button
              class="nav-section-title expandable"
              (click)="toggleCategory(category)"
              [attr.aria-expanded]="category.expanded"
            >
              <span>{{ category.label }}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                [class.rotated]="category.expanded"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            @if (category.expanded) {
              <div class="nav-items">
                @for (item of category.items; track item.path) {
                  <a [routerLink]="item.path" routerLinkActive="active" class="nav-link">
                    @if (item.icon) {
                      <span class="nav-icon">{{ item.icon }}</span>
                    }
                    {{ item.label }}
                  </a>
                }
              </div>
            }
          </nav>
        }

        <!-- Theme Builder -->
        <nav class="nav-section">
          <h3 class="nav-section-title">Tools</h3>
          <a routerLink="/theme-builder" routerLinkActive="active" class="nav-link">
            Theme Builder
          </a>
        </nav>
      </div>

      <!-- Mobile Overlay -->
      @if (mobileMenuOpen()) {
        <div class="sidebar-overlay" (click)="closeMobileMenu()"></div>
      }
    </aside>
  `,
  styles: [
    `
      .app-sidebar {
        position: fixed;
        left: 0;
        top: 4rem;
        bottom: 0;
        width: 280px;
        background-color: var(--semantic-surface-card);
        border-right: 1px solid var(--semantic-border-default);
        overflow-y: auto;
        z-index: 50;
      }

      .sidebar-content {
        padding: var(--primitive-spacing-6) var(--primitive-spacing-4);
      }

      .nav-section {
        margin-bottom: var(--primitive-spacing-6);
      }

      .nav-section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--primitive-spacing-3);
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-bold);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--semantic-text-secondary);
        border: none;
        background: none;
        padding: 0;
        cursor: default;
      }

      .nav-section-title.expandable {
        cursor: pointer;
        width: 100%;
        padding: var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-md);
        transition: background-color 0.2s;
      }

      .nav-section-title.expandable:hover {
        background-color: var(--semantic-surface-subtle);
      }

      .nav-section-title svg {
        transition: transform 0.2s;
      }

      .nav-section-title svg.rotated {
        transform: rotate(180deg);
      }

      .nav-items {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-1);
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        text-decoration: none;
        color: var(--semantic-text-primary);
        border-radius: var(--primitive-border-radius-md);
        font-size: var(--primitive-font-size-sm);
        transition: all 0.2s;
      }

      .nav-link:hover {
        background-color: var(--semantic-surface-subtle);
        color: var(--semantic-brand-primary);
      }

      .nav-link.active {
        background-color: var(--semantic-brand-subtle);
        color: var(--semantic-brand-primary);
        font-weight: var(--primitive-font-weight-medium);
      }

      .nav-icon {
        font-size: 1rem;
      }

      /* Mobile */
      .sidebar-overlay {
        display: none;
      }

      @media (max-width: 768px) {
        .app-sidebar {
          transform: translateX(-100%);
          transition: transform 0.3s;
        }

        .app-sidebar.mobile-open {
          transform: translateX(0);
        }

        .sidebar-overlay {
          display: block;
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected mobileMenuOpen = signal(false);

  protected categories = signal<NavCategory[]>([
    {
      label: 'Form Components',
      expanded: true,
      items: [
        { label: 'Button', path: '/components/form/button' },
        { label: 'Input', path: '/components/form/input' },
        { label: 'Textarea', path: '/components/form/textarea' },
        { label: 'Checkbox', path: '/components/form/checkbox' },
        { label: 'Radio', path: '/components/form/radio' },
        { label: 'Switch', path: '/components/form/switch' },
        { label: 'Select', path: '/components/form/select' },
        { label: 'Multi-Select', path: '/components/form/multi-select' },
        { label: 'Slider', path: '/components/form/slider' },
        { label: 'Date Picker', path: '/components/form/date-picker' },
        { label: 'File Upload', path: '/components/form/file-upload' },
      ],
    },
    {
      label: 'Layout Components',
      expanded: true,
      items: [
        { label: 'Card', path: '/components/layout/card' },
        { label: 'Modal', path: '/components/layout/modal' },
        { label: 'Drawer', path: '/components/layout/drawer' },
        { label: 'Tabs', path: '/components/layout/tabs' },
        { label: 'Accordion', path: '/components/layout/accordion' },
        { label: 'Divider', path: '/components/layout/divider' },
        { label: 'Stack', path: '/components/layout/stack' },
        { label: 'Grid', path: '/components/layout/grid' },
      ],
    },
    {
      label: 'Data Display',
      expanded: true,
      items: [
        { label: 'Badge', path: '/components/data-display/badge' },
        { label: 'Avatar', path: '/components/data-display/avatar' },
        { label: 'Tooltip', path: '/components/data-display/tooltip' },
        { label: 'Chip', path: '/components/data-display/chip' },
        { label: 'Popover', path: '/components/data-display/popover' },
        { label: 'Pagination', path: '/components/data-display/pagination' },
        { label: 'Table', path: '/components/data-display/table' },
        { label: 'List', path: '/components/data-display/list' },
        { label: 'Carousel', path: '/components/data-display/carousel' },
        { label: 'Code Block', path: '/components/data-display/code-block' },
      ],
    },
    {
      label: 'Feedback',
      expanded: true,
      items: [
        { label: 'Alert', path: '/components/feedback/alert' },
        { label: 'Spinner', path: '/components/feedback/spinner' },
        { label: 'Progress', path: '/components/feedback/progress' },
        { label: 'Skeleton', path: '/components/feedback/skeleton' },
        { label: 'Toast', path: '/components/feedback/toast' },
      ],
    },
    {
      label: 'Navigation',
      expanded: true,
      items: [
        { label: 'Breadcrumb', path: '/components/navigation/breadcrumb' },
        { label: 'Menu', path: '/components/navigation/menu' },
        { label: 'Context Menu', path: '/components/navigation/context-menu' },
        { label: 'Navbar', path: '/components/navigation/navbar' },
        { label: 'Stepper', path: '/components/navigation/stepper' },
      ],
    },
  ]);

  protected toggleCategory(category: NavCategory): void {
    category.expanded = !category.expanded;
    // Trigger change detection
    this.categories.set([...this.categories()]);
  }

  protected openMobileMenu(): void {
    this.mobileMenuOpen.set(true);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
