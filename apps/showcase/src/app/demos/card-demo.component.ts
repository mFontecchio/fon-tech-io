import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent, BadgeComponent } from '@ui-suite/components';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, BadgeComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Card</h3>
      <ui-card>
        <h4>Card Title</h4>
        <p>This is a basic card with some content. Cards are versatile containers for grouping related information.</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Card with Header and Actions</h3>
      <ui-card>
        <div class="card-header">
          <h4>Product Card</h4>
          <ui-badge color="success">New</ui-badge>
        </div>
        <p>This card demonstrates a custom header with a badge and action buttons at the bottom.</p>
        <div class="card-actions">
          <ui-button variant="text" size="sm">Cancel</ui-button>
          <ui-button size="sm">Buy Now</ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Elevated Card</h3>
      <ui-card>
        <h4>Elevated Card</h4>
        <p>This card has increased elevation for emphasis. Perfect for important content that needs to stand out.</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Interactive Card</h3>
      <ui-card [interactive]="true">
        <h4>Clickable Card</h4>
        <p>This card has hover effects. Try hovering over it to see the interactive state.</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Card Grid</h3>
      <div class="card-grid">
        <ui-card>
          <h4>Feature 1</h4>
          <p>Description of the first feature.</p>
        </ui-card>
        <ui-card>
          <h4>Feature 2</h4>
          <p>Description of the second feature.</p>
        </ui-card>
        <ui-card>
          <h4>Feature 3</h4>
          <p>Description of the third feature.</p>
        </ui-card>
      </div>
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

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--primitive-spacing-3);
    }

    .card-header h4 {
      margin: 0;
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--primitive-spacing-2);
      margin-top: var(--primitive-spacing-4);
      padding-top: var(--primitive-spacing-4);
      border-top: 1px solid var(--semantic-border-subtle);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--primitive-spacing-4);
    }

    h4 {
      font-size: var(--primitive-font-size-lg);
      margin: 0 0 var(--primitive-spacing-2) 0;
      color: var(--semantic-text-primary);
    }

    p {
      margin: 0;
      color: var(--semantic-text-secondary);
      line-height: var(--primitive-line-height-md);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDemoComponent {}
