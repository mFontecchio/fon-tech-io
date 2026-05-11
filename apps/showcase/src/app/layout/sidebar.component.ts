/**
 * Sidebar Navigation Component
 * Left sidebar with categorized component navigation
 */

import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccordionComponent, AccordionItemComponent } from '@mfontecchio/components';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

interface NavCategory {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AccordionComponent, AccordionItemComponent],
  host: {
    '(document:keydown.escape)': 'handleEscape()',
  },
  template: `
    <aside
      id="showcase-sidebar"
      class="app-sidebar"
      [class.mobile-open]="mobileNavigationOpen()"
      [attr.aria-hidden]="ariaHiddenAttr()"
      aria-label="Primary navigation"
    >
      <div class="sidebar-content">
        <nav class="nav-section nav-section--mobile-only" aria-label="Top-level navigation">
          <h3 class="nav-section-title">Navigate</h3>
          <div class="nav-items">
            @for (item of topLevelItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                class="nav-link nav-link--primary"
                (click)="handleNavigationSelection()"
              >
                {{ item.label }}
              </a>
            }
          </div>
        </nav>

        <!-- Getting Started -->
        <nav class="nav-section">
          <h3 class="nav-section-title">Getting Started</h3>
          <div class="nav-items">
            @for (item of gettingStartedItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                class="nav-link"
                (click)="handleNavigationSelection()"
              >
                {{ item.label }}
              </a>
            }
          </div>
        </nav>

        <!-- Components by Category -->
        <nav aria-label="Component categories">
          <fui-accordion
            mode="multiple"
            [bordered]="false"
            [highlightExpanded]="false"
            [dividers]="false"
            [expanded]="initialExpanded"
          >
            @for (category of categories; track category.label) {
              <fui-accordion-item [title]="category.label">
                <div class="nav-items nav-items--indented">
                  @for (item of category.items; track item.path) {
                    <a
                      [routerLink]="item.path"
                      routerLinkActive="active"
                      class="nav-link"
                      (click)="handleNavigationSelection()"
                    >
                      @if (item.icon) {
                        <span class="nav-icon">{{ item.icon }}</span>
                      }
                      {{ item.label }}
                    </a>
                  }
                </div>
              </fui-accordion-item>
            }
          </fui-accordion>
        </nav>

        <!-- Tools -->
        <nav class="nav-section">
          <h3 class="nav-section-title">Tools</h3>
          <div class="nav-items">
            @for (item of toolItems; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                class="nav-link"
                (click)="handleNavigationSelection()"
              >
                {{ item.label }}
              </a>
            }
          </div>
        </nav>
      </div>
    </aside>

    <button
      type="button"
      class="sidebar-overlay"
      [class.sidebar-overlay--visible]="mobileNavigationOpen()"
      [attr.aria-hidden]="mobileNavigationOpen() ? null : 'true'"
      [attr.tabindex]="mobileNavigationOpen() ? '0' : '-1'"
      aria-label="Close navigation menu"
      (click)="requestCloseNavigation()"
    ></button>
  `,
  styles: [
    `
      .app-sidebar {
        position: fixed;
        left: 0;
        top: 4.5rem;
        bottom: 0;
        width: 280px;
        background-color: var(--semantic-surface-card);
        border-right: 1px solid var(--semantic-border-default);
        overflow-y: auto;
        z-index: 90;
        will-change: transform;
        transition:
          transform var(--animation-duration-normal) var(--animation-easing-default),
          box-shadow var(--animation-duration-normal) var(--animation-easing-default);
      }

      .sidebar-content {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-6);
        padding: var(--primitive-spacing-6) var(--primitive-spacing-4);
        padding-bottom: calc(var(--primitive-spacing-8) + env(safe-area-inset-bottom, 0px));
      }

      .nav-section {
        margin-bottom: 0;
      }

      .nav-section--mobile-only {
        display: none;
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

      .nav-link:focus-visible,
      .sidebar-overlay:focus-visible {
        outline: 2px solid var(--semantic-border-focus);
        outline-offset: 2px;
      }

      .nav-items {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-1);
        min-height: 0;
        overflow: hidden;
      }

      .nav-items--indented {
        padding-bottom: var(--primitive-spacing-2);
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
        transition:
          background-color var(--animation-duration-fast) var(--animation-easing-default),
          color var(--animation-duration-fast) var(--animation-easing-default),
          transform var(--animation-duration-fast) var(--animation-easing-default);
      }

      .nav-link:hover {
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-brand-primary);
        transform: translateX(2px);
      }

      .nav-link.active {
        background-color: var(--semantic-brand-primary-subtle);
        color: var(--semantic-brand-primary);
        font-weight: var(--primitive-font-weight-medium);
      }

      .nav-link--primary {
        font-weight: var(--primitive-font-weight-medium);
      }

      .nav-icon {
        font-size: 1rem;
      }

      .sidebar-overlay {
        display: none;
      }

      @media (max-width: 1024px) {
        .app-sidebar {
          width: min(20rem, calc(100vw - var(--primitive-spacing-8)));
          transform: translate3d(calc(-100% - var(--primitive-spacing-5)), 0, 0);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          box-shadow: none;
          transition:
            transform var(--semantic-animation-duration-page, 350ms)
              var(--semantic-animation-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
            opacity var(--semantic-animation-duration-component, 250ms)
              var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
            box-shadow var(--semantic-animation-duration-page, 350ms)
              var(--semantic-animation-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
            visibility 0s linear var(--semantic-animation-duration-page, 350ms);
        }

        .sidebar-content {
          opacity: 0;
          transform: translate3d(calc(var(--primitive-spacing-4) * -1), 0, 0);
          transition:
            transform var(--semantic-animation-duration-page, 350ms)
              var(--semantic-animation-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
            opacity var(--semantic-animation-duration-component, 250ms)
              var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
        }

        .app-sidebar.mobile-open {
          transform: translate3d(0, 0, 0);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          box-shadow: var(--primitive-shadow-xl);
          transition-delay: 0s, 0s, 0s, 0s;
        }

        .app-sidebar.mobile-open .sidebar-content {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: var(--semantic-animation-duration-interactive, 150ms);
        }

        .nav-section--mobile-only {
          display: block;
        }

        .sidebar-overlay {
          display: block;
          appearance: none;
          border: none;
          padding: 0;
          position: fixed;
          top: 4.5rem;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: 80;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity 220ms ease,
            visibility 0s linear 220ms;
        }

        .sidebar-overlay--visible {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transition-delay: 0s, 0s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .app-sidebar,
        .sidebar-content,
        .nav-link,
        .sidebar-overlay {
          transition: none;
          animation: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly mobileNavigationOpen = input(false);
  readonly closeNavigation = output<void>();

  private readonly _isMobile = signal(typeof window !== 'undefined' && window.innerWidth < 768);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this._isMobile.set(window.innerWidth < 768));
    }
  }

  /** aria-hidden only when sidebar is off-screen (mobile viewport, menu closed) */
  protected readonly ariaHiddenAttr = computed(() =>
    this._isMobile() && !this.mobileNavigationOpen() ? 'true' : null
  );

  protected readonly topLevelItems: NavItem[] = [
    { label: 'Components', path: '/components' },
    { label: 'Theme Builder', path: '/theme-builder' },
    { label: 'Getting Started', path: '/getting-started' },
  ];

  protected readonly categories: NavCategory[] = [
    {
      label: 'Form Components',
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
        { label: 'Chart', path: '/components/data-display/chart' },
      ],
    },
    {
      label: 'Feedback',
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
      items: [
        { label: 'Breadcrumb', path: '/components/navigation/breadcrumb' },
        { label: 'Menu', path: '/components/navigation/menu' },
        { label: 'Context Menu', path: '/components/navigation/context-menu' },
        { label: 'Navbar', path: '/components/navigation/navbar' },
        { label: 'Stepper', path: '/components/navigation/stepper' },
        { label: 'Dock', path: '/components/navigation/dock' },
      ],
    },
  ];

  protected readonly initialExpanded: number[] = this.categories.map((_, i) => i);

  protected readonly gettingStartedItems: NavItem[] = [
    { label: 'Installation', path: '/getting-started/installation' },
    { label: 'Usage', path: '/getting-started/usage' },
    { label: 'Theming', path: '/getting-started/theming' },
    { label: 'Compatibility', path: '/getting-started/compatibility' },
  ];

  protected readonly toolItems: NavItem[] = [{ label: 'Theme Builder', path: '/theme-builder' }];

  protected handleNavigationSelection(): void {
    if (this.mobileNavigationOpen()) {
      this.requestCloseNavigation();
    }
  }

  protected requestCloseNavigation(): void {
    this.closeNavigation.emit();
  }

  protected handleEscape(): void {
    if (this.mobileNavigationOpen()) {
      this.requestCloseNavigation();
    }
  }
}