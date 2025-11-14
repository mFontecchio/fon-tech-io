/**
 * Components Overview Page
 * Shows all component categories
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@ui-suite/components';

interface ComponentCategory {
  name: string;
  description: string;
  count: number;
  link: string;
}

@Component({
  selector: 'app-components-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent],
  template: `
    <div class="components-overview">
      <h1>Components</h1>
      <p class="subtitle">Browse all 36 components organized by category</p>

      <div class="categories-grid">
        @for (category of categories; track category.name) {
          <a [routerLink]="category.link" class="category-card">
            <ui-card>
              <h2>{{ category.name }}</h2>
              <p>{{ category.description }}</p>
              <span class="component-count">{{ category.count }} components</span>
            </ui-card>
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    .components-overview {
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

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--primitive-spacing-6);
    }

    .category-card {
      text-decoration: none;
      color: inherit;
      display: block;
      transition: transform 0.2s;
    }

    .category-card:hover {
      transform: translateY(-4px);
    }

    h2 {
      font-size: var(--primitive-font-size-xl);
      margin-bottom: var(--primitive-spacing-2);
      color: var(--semantic-text-primary);
    }

    p {
      color: var(--semantic-text-secondary);
      margin-bottom: var(--primitive-spacing-3);
      line-height: 1.6;
    }

    .component-count {
      display: inline-block;
      padding: var(--primitive-spacing-1) var(--primitive-spacing-3);
      background-color: var(--semantic-brand-subtle);
      color: var(--semantic-brand-primary);
      border-radius: var(--primitive-border-radius-full);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsOverviewComponent {
  protected categories: ComponentCategory[] = [
    {
      name: 'Form Components',
      description: 'Interactive form controls for user input',
      count: 11,
      link: '/components/form/button',
    },
    {
      name: 'Layout Components',
      description: 'Structure and organize your content',
      count: 8,
      link: '/components/layout/card',
    },
    {
      name: 'Data Display',
      description: 'Present information to users',
      count: 8,
      link: '/components/data-display/badge',
    },
    {
      name: 'Feedback',
      description: 'Provide feedback and status updates',
      count: 5,
      link: '/components/feedback/alert',
    },
    {
      name: 'Navigation',
      description: 'Help users navigate through your app',
      count: 4,
      link: '/components/navigation/breadcrumb',
    },
  ];
}

