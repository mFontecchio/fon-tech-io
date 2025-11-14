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
      <p class="subtitle">Learn how to install, use, and customize the UI Component Suite</p>

      <div class="guides-grid">
        <a routerLink="/getting-started/installation" class="guide-card">
          <ui-card>
            <h2>Installation</h2>
            <p>Step-by-step guide to installing and configuring the component library in your Angular project.</p>
          </ui-card>
        </a>

        <a routerLink="/getting-started/usage" class="guide-card">
          <ui-card>
            <h2>Usage</h2>
            <p>Learn how to import and use components in your application with practical examples.</p>
          </ui-card>
        </a>

        <a routerLink="/getting-started/theming" class="guide-card">
          <ui-card>
            <h2>Theming</h2>
            <p>Customize the look and feel of components using our powerful theming system.</p>
          </ui-card>
        </a>
      </div>
    </div>
  `,
  styles: [`
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
      transition: transform 0.2s;
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedOverviewComponent {}

