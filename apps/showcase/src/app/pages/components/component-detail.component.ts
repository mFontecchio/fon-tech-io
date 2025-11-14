/**
 * Component Detail Page
 * Shows API documentation and examples for a specific component
 */

import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-component-detail',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="component-detail-page">
      <h1>{{ componentName() }}</h1>
      <p class="category-badge">{{ category() }}</p>
      
      <ui-card>
        <h2>API Documentation Coming Soon</h2>
        <p>This component's full API documentation, examples, and interactive demos will be available here.</p>
        <p><strong>Component:</strong> {{ componentName() }}</p>
        <p><strong>Category:</strong> {{ category() }}</p>
      </ui-card>
    </div>
  `,
  styles: [`
    .component-detail-page {
      padding: var(--primitive-spacing-8);
      max-width: 1200px;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: var(--primitive-spacing-2);
    }

    .category-badge {
      display: inline-block;
      padding: var(--primitive-spacing-1) var(--primitive-spacing-3);
      background-color: var(--semantic-brand-subtle);
      color: var(--semantic-brand-primary);
      border-radius: var(--primitive-border-radius-full);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      margin-bottom: var(--primitive-spacing-6);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDetailComponent {
  private route = inject(ActivatedRoute);
  
  protected category = signal('');
  protected componentName = signal('');

  constructor() {
    // Subscribe to route param changes
    effect(() => {
      this.route.params.subscribe(params => {
        const category = params['category'] || '';
        const name = params['name'] || '';
        
        this.category.set(category);
        this.componentName.set(
          name.split('-').map((word: string) => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        );
      });
    });
  }
}

