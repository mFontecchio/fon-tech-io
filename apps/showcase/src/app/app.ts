/**
 * Main App Component
 * Shell with header, sidebar, and router outlet
 */

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { ToastContainerComponent } from '@ui-suite/components';
import { ThemeService } from '@ui-suite/theming';

@Component({
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ToastContainerComponent],
  selector: 'app-root',
  host: {
    '(window:resize)': 'handleWindowResize()',
  },
  template: `
    <div class="app-container">
      <app-header
        [mobileNavigationOpen]="mobileNavigationOpen()"
        (mobileNavigationClose)="closeMobileNavigation()"
        (mobileNavigationToggle)="toggleMobileNavigation()"
      />
      <div class="app-layout">
        <app-sidebar
          [mobileNavigationOpen]="mobileNavigationOpen()"
          (closeNavigation)="closeMobileNavigation()"
        />
        <div
          class="app-overlay"
          [class.app-overlay--active]="mobileNavigationOpen()"
          (click)="closeMobileNavigation()"
          aria-hidden="true"
        ></div>
        <main class="app-main">
          <router-outlet />
        </main>
      </div>
      <fui-toast-container />
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background-color: var(--semantic-surface-background);
        overflow-x: clip;
      }

      .app-layout {
        display: flex;
        padding-top: 1.5rem;
      }

      .app-main {
        flex: 1;
        margin-left: 280px;
        min-height: calc(100vh - 4rem);
        background-color: var(--semantic-surface-background);
        transition: margin-left var(--animation-duration-normal) var(--animation-easing-default);
      }

      @media (max-width: 1024px) {
        .app-layout {
          padding-top: 0;
        }

        .app-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 99;
          background-color: transparent;
        }

        .app-overlay--active {
          display: block;
        }

        @media (min-width: 1025px) {
          .app-overlay {
            display: none !important;
          }
        }

        .app-main {
          margin-left: 0;
          min-height: calc(100vh - 4.5rem);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .app-main {
          transition: none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly mobileNavigationOpen = signal(false);

  /**
   * Initialize theme service to ensure proper theme application
   */
  private readonly themeService = inject(ThemeService);

  protected toggleMobileNavigation(): void {
    this.mobileNavigationOpen.update((isOpen) => !isOpen);
  }

  protected closeMobileNavigation(): void {
    if (this.mobileNavigationOpen()) {
      this.mobileNavigationOpen.set(false);
    }
  }

  protected handleWindowResize(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 1024 && this.mobileNavigationOpen()) {
      this.closeMobileNavigation();
    }
  }
}
