/**
 * Getting Started Overview Page
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-getting-started-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  template: `
    <div class="getting-started-overview">
      <h1>Getting Started</h1>
      <p class="subtitle">
        Learn how to install, use, and theme the UI Component Suite with Angular 20 standalone
        components, signal-friendly APIs, and family-aware runtime theming.
      </p>

      <div class="guides-grid">
        <a routerLink="/getting-started/installation" class="guide-card">
          <ui-card>
            <h2>Installation</h2>
            <p>
              Set up the workspace locally or consume the published packages in another Angular
              application.
            </p>
          </ui-card>
        </a>

        <a routerLink="/getting-started/usage" class="guide-card">
          <ui-card>
            <h2>Usage</h2>
            <p>
              Import standalone components, wire signals to inputs and outputs, and compose views
              that match the shared libraries.
            </p>
          </ui-card>
        </a>

        <a routerLink="/getting-started/theming" class="guide-card">
          <ui-card>
            <h2>Theming</h2>
            <p>
              Use ThemeService to select theme families, toggle light and dark modes, and preserve
              user preference across reloads.
            </p>
          </ui-card>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .getting-started-overview {
        padding: var(--primitive-spacing-8);
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
      }

      .subtitle {
        font-size: var(--primitive-font-size-lg);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-8);
      }

      .guides-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--primitive-spacing-6);
      }

      .guide-card {
        text-decoration: none;
        color: inherit;
        display: block;
        transition: transform var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
      }

      .guide-card:hover {
        transform: translateY(-4px);
      }

      h2 {
        font-size: var(--primitive-font-size-xl);
        margin-bottom: var(--primitive-spacing-2);
        color: var(--semantic-text-primary);
      }

      p {
        color: var(--semantic-text-secondary);
        line-height: 1.6;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedOverviewComponent {}
