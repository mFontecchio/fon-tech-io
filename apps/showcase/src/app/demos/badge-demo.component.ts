import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, CardComponent, ButtonComponent, AvatarComponent } from '@ui-suite/components';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent, CardComponent, ButtonComponent, AvatarComponent],
  template: `
    <div class="demo-section">
      <h3>Colors</h3>
      <ui-card>
        <div class="badge-group">
          <ui-badge color="primary">Primary</ui-badge>
          <ui-badge color="secondary">Secondary</ui-badge>
          <ui-badge color="success">Success</ui-badge>
          <ui-badge color="warning">Warning</ui-badge>
          <ui-badge color="error">Error</ui-badge>
          <ui-badge color="info">Info</ui-badge>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Variants</h3>
      <ui-card>
        <div class="badge-group">
          <ui-badge variant="default">Default</ui-badge>
          <ui-badge variant="primary">Primary</ui-badge>
          <ui-badge variant="success">Success</ui-badge>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="badge-group">
          <ui-badge size="sm">Small</ui-badge>
          <ui-badge size="md">Medium</ui-badge>
          <ui-badge size="lg">Large</ui-badge>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Icons/Avatars</h3>
      <ui-card>
        <div class="badge-group">
          <ui-badge color="success">✓ Verified</ui-badge>
          <ui-badge color="warning">⚠ Alert</ui-badge>
          <ui-badge color="error">✕ Failed</ui-badge>
          <ui-badge color="info">ℹ Info</ui-badge>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Status Badges</h3>
      <ui-card>
        <div class="badge-group">
        <ui-badge variant="success">Active</ui-badge>
        <ui-badge variant="warning">Pending</ui-badge>
        <ui-badge variant="error">Inactive</ui-badge>
        <ui-badge variant="default">Draft</ui-badge>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Counter Badges</h3>
      <ui-card>
        <div class="badge-group">
          <ui-badge variant="primary">3</ui-badge>
          <ui-badge variant="error">99+</ui-badge>
          <ui-badge variant="success">New</ui-badge>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Examples</h3>
      <ui-card>
        <div class="examples-grid">
          <div class="example-item">
            <ui-button>
              Messages
              <ui-badge variant="error" size="sm">5</ui-badge>
            </ui-button>
          </div>
          
          <div class="example-item">
            <div class="user-item">
              <ui-avatar name="John Doe" size="md" />
              <span>John Doe</span>
              <ui-badge color="success" size="sm">Pro</ui-badge>
            </div>
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

    .badge-group {
      display: flex;
      gap: var(--primitive-spacing-3);
      flex-wrap: wrap;
      align-items: center;
    }

    .examples-grid {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
    }

    .example-item {
      display: flex;
      align-items: center;
    }

    .user-item {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
    }

    .user-item span {
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    ui-button {
      display: inline-flex;
      align-items: center;
      gap: var(--primitive-spacing-2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeDemoComponent {}
