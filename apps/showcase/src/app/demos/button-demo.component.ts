/**
 * Button Component Demo
 * Interactive demonstration of the Button component
 */

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Variants</h3>
      <ui-card>
        <div class="button-group">
          <ui-button variant="filled" (clicked)="showMessage('Filled clicked')">
            Filled Button
          </ui-button>
          <ui-button variant="outlined" (clicked)="showMessage('Outlined clicked')">
            Outlined Button
          </ui-button>
          <ui-button variant="text" (clicked)="showMessage('Text clicked')">
            Text Button
          </ui-button>
        </div>
        @if (message()) {
          <p class="demo-message">{{ message() }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Colors</h3>
      <ui-card>
        <div class="button-group">
          <ui-button color="primary">Primary</ui-button>
          <ui-button color="secondary">Secondary</ui-button>
          <ui-button color="success">Success</ui-button>
          <ui-button color="warning">Warning</ui-button>
          <ui-button color="error">Error</ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="button-group">
          <ui-button size="sm">Small</ui-button>
          <ui-button size="md">Medium</ui-button>
          <ui-button size="lg">Large</ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="button-group">
          <ui-button [loading]="loading()" (clicked)="simulateLoading()">
            {{ loading() ? 'Loading...' : 'Click to Load' }}
          </ui-button>
          <ui-button [disabled]="true">Disabled Button</ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Full Width</h3>
      <ui-card>
        <ui-button [fullWidth]="true" color="primary">
          Full Width Button
        </ui-button>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Color × Variant Matrix</h3>
      <ui-card>
        <div class="matrix-grid">
          <div class="matrix-row">
            <div class="matrix-label">Primary</div>
            <ui-button variant="filled" color="primary">Filled</ui-button>
            <ui-button variant="outlined" color="primary">Outlined</ui-button>
            <ui-button variant="text" color="primary">Text</ui-button>
          </div>
          <div class="matrix-row">
            <div class="matrix-label">Success</div>
            <ui-button variant="filled" color="success">Filled</ui-button>
            <ui-button variant="outlined" color="success">Outlined</ui-button>
            <ui-button variant="text" color="success">Text</ui-button>
          </div>
          <div class="matrix-row">
            <div class="matrix-label">Error</div>
            <ui-button variant="filled" color="error">Filled</ui-button>
            <ui-button variant="outlined" color="error">Outlined</ui-button>
            <ui-button variant="text" color="error">Text</ui-button>
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

    .button-group {
      display: flex;
      gap: var(--primitive-spacing-3);
      flex-wrap: wrap;
      align-items: center;
    }

    .demo-message {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-brand-subtle);
      color: var(--semantic-brand-primary);
      border-radius: var(--primitive-border-radius-md);
      font-size: var(--primitive-font-size-sm);
    }

    .matrix-grid {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .matrix-row {
      display: grid;
      grid-template-columns: 100px 1fr 1fr 1fr;
      gap: var(--primitive-spacing-3);
      align-items: center;
    }

    .matrix-label {
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
      font-size: var(--primitive-font-size-sm);
    }

    @media (max-width: 768px) {
      .matrix-row {
        grid-template-columns: 1fr;
      }

      .matrix-label {
        font-weight: var(--primitive-font-weight-bold);
        margin-top: var(--primitive-spacing-2);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {
  protected message = signal<string>('');
  protected loading = signal(false);

  protected showMessage(msg: string): void {
    this.message.set(msg);
    setTimeout(() => this.message.set(''), 3000);
  }

  protected simulateLoading(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 2000);
  }
}

