import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent, CardComponent, ButtonComponent } from '@ui-suite/components';

@Component({
  selector: 'app-spinner-demo',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, CardComponent, ButtonComponent],
  template: `
    <div class="demo-section">
      <h3>Colors</h3>
      <ui-card>
        <div class="spinner-group">
          <ui-spinner color="primary" />
          <ui-spinner color="secondary" />
          <ui-spinner color="success" />
          <ui-spinner color="warning" />
          <ui-spinner color="error" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="spinner-group">
          <ui-spinner size="sm" />
          <ui-spinner size="md" />
          <ui-spinner size="lg" />
          <ui-spinner size="xl" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Labels</h3>
      <ui-card>
        <div class="spinner-stack">
          <ui-spinner label="Loading..." />
          <ui-spinner label="Processing..." color="success" />
          <ui-spinner label="Please wait..." color="secondary" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>In Buttons</h3>
      <ui-card>
        <div class="button-group">
          <ui-button [loading]="true">Loading</ui-button>
          <ui-button color="success" [loading]="true">Processing</ui-button>
          <ui-button color="error" [loading]="true">Deleting</ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Loading States</h3>
      <ui-card>
        <div class="loading-examples">
          <div class="loading-card">
            <ui-spinner size="lg" />
            <p>Loading content...</p>
          </div>
          
          <div class="loading-card">
            <ui-spinner size="md" color="success" />
            <p>Uploading files...</p>
          </div>
          
          <div class="loading-card">
            <ui-spinner size="md" color="warning" />
            <p>Syncing data...</p>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Full Page Loader</h3>
      <ui-card>
        <div class="full-page-demo">
          <div class="overlay-example">
            <ui-spinner size="xl" label="Loading application..." />
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

    .spinner-group {
      display: flex;
      gap: var(--primitive-spacing-6);
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: var(--primitive-spacing-4);
    }

    .spinner-stack {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-5);
      align-items: center;
      padding: var(--primitive-spacing-4);
    }

    .button-group {
      display: flex;
      gap: var(--primitive-spacing-3);
      flex-wrap: wrap;
    }

    .loading-examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--primitive-spacing-4);
    }

    .loading-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-6);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      min-height: 150px;
    }

    .loading-card p {
      margin: 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .full-page-demo {
      position: relative;
      height: 300px;
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      overflow: hidden;
    }

    .overlay-example {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerDemoComponent {}
