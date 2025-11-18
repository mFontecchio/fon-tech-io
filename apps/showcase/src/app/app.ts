/**
 * Main App Component
 * Shell with header, sidebar, and router outlet
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { ToastContainerComponent } from '@ui-suite/components';
import { ThemeService } from '@ui-suite/theming';

@Component({
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    ToastContainerComponent,
  ],
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-header />
      <div class="app-layout">
        <app-sidebar />
        <main class="app-main">
          <router-outlet />
        </main>
      </div>
      <ui-toast-container />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: var(--semantic-surface-background);
    }

    .app-layout {
      display: flex;
      padding-top: 4rem;
    }

    .app-main {
      flex: 1;
      margin-left: 280px;
      min-height: calc(100vh - 4rem);
      background-color: var(--semantic-surface-background);
    }

    @media (max-width: 768px) {
      .app-main {
        margin-left: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /**
   * Initialize theme service to ensure proper theme application
   */
  private readonly themeService = inject(ThemeService);
}
