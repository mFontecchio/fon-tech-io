import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Breadcrumb</h3>
      <ui-card>
        <ui-breadcrumb [items]="basicItems()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Long Path</h3>
      <ui-card>
        <ui-breadcrumb [items]="longPath()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Icons</h3>
      <ui-card>
        <ui-breadcrumb [items]="withIcons()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Custom Separator</h3>
      <ui-card>
        <div class="separator-examples">
          <div>
            <p class="label">Default (/>)</p>
            <ui-breadcrumb [items]="basicItems()" />
          </div>
          <div>
            <p class="label">Arrow (→)</p>
            <ui-breadcrumb [items]="basicItems()" separator="→" />
          </div>
          <div>
            <p class="label">Chevron (›)</p>
            <ui-breadcrumb [items]="basicItems()" separator="›" />
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="size-examples">
          <div>
            <p class="label">Small</p>
            <ui-breadcrumb [items]="basicItems()" size="sm" />
          </div>
          <div>
            <p class="label">Medium</p>
            <ui-breadcrumb [items]="basicItems()" size="md" />
          </div>
          <div>
            <p class="label">Large</p>
            <ui-breadcrumb [items]="basicItems()" size="lg" />
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Examples</h3>
      <ui-card>
        <div class="practical-examples">
          <div class="example">
            <p class="example-label">E-commerce Navigation:</p>
            <ui-breadcrumb [items]="ecommerce()" />
          </div>
          <div class="example">
            <p class="example-label">Documentation:</p>
            <ui-breadcrumb [items]="docs()" />
          </div>
          <div class="example">
            <p class="example-label">File System:</p>
            <ui-breadcrumb [items]="fileSystem()" />
          </div>
        </div>
      </ui-card>
    </div>
  `,
  styles: [`
    .demo-section {
      margin-bottom: var(--primitive-spacing-6);
    }

    .demo-section h3 {
      margin-bottom: var(--primitive-spacing-3);
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .separator-examples, .size-examples {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
    }

    .label {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .practical-examples {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-5);
    }

    .example {
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
    }

    .example-label {
      margin: 0 0 var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbDemoComponent {
  protected basicItems = signal([
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details' },
  ]);

  protected longPath = signal([
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Subcategory', href: '/category/sub' },
    { label: 'Product Type', href: '/category/sub/type' },
    { label: 'Product', href: '/category/sub/type/product' },
    { label: 'Details' },
  ]);

  protected withIcons = signal([
    { label: '🏠 Home', href: '/' },
    { label: '📁 Projects', href: '/projects' },
    { label: '⚙ Settings' },
  ]);

  protected ecommerce = signal([
    { label: 'Home', href: '/' },
    { label: 'Electronics', href: '/electronics' },
    { label: 'Laptops', href: '/electronics/laptops' },
    { label: 'MacBook Pro' },
  ]);

  protected docs = signal([
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
    { label: 'Navigation', href: '/docs/components/navigation' },
    { label: 'Breadcrumb' },
  ]);

  protected fileSystem = signal([
    { label: 'C:', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'Documents', href: '/users/documents' },
    { label: 'Projects', href: '/users/documents/projects' },
    { label: 'my-app' },
  ]);
}
