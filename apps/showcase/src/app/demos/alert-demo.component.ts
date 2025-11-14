import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, CardComponent, ButtonComponent } from '@ui-suite/components';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule, AlertComponent, CardComponent, ButtonComponent],
  template: `
    <div class="demo-section">
      <h3>Variants</h3>
      <ui-card>
        <div class="alert-stack">
          <ui-alert variant="info">
            <strong>Info:</strong> This is an informational alert message.
          </ui-alert>
          <ui-alert variant="success">
            <strong>Success:</strong> Your action was completed successfully.
          </ui-alert>
          <ui-alert variant="warning">
            <strong>Warning:</strong> Please review this important information.
          </ui-alert>
          <ui-alert variant="error">
            <strong>Error:</strong> An error occurred while processing your request.
          </ui-alert>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Dismissible Alerts</h3>
      <ui-card>
        <div class="alert-stack">
          @if (showAlert1()) {
            <ui-alert variant="info" [dismissible]="true" (dismissed)="showAlert1.set(false)">
              This alert can be dismissed by clicking the X button.
            </ui-alert>
          }
          @if (showAlert2()) {
            <ui-alert variant="success" [dismissible]="true" (dismissed)="showAlert2.set(false)">
              Great! You can close this alert when you're done reading.
            </ui-alert>
          }
          @if (!showAlert1() && !showAlert2()) {
            <ui-button (clicked)="resetAlerts()">Show Alerts Again</ui-button>
          }
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Titles</h3>
      <ui-card>
        <div class="alert-stack">
          <ui-alert variant="info" title="Information">
            Here's some additional context about this feature or action.
          </ui-alert>
          <ui-alert variant="success" title="Payment Successful">
            Your payment of $99.99 has been processed successfully.
          </ui-alert>
          <ui-alert variant="warning" title="Action Required">
            Please verify your email address to continue using all features.
          </ui-alert>
          <ui-alert variant="error" title="Validation Failed">
            Please correct the errors in the form and try again.
          </ui-alert>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Icons/Emojis</h3>
      <ui-card>
        <div class="alert-stack">
          <ui-alert variant="info">
            ℹ <strong>Tip:</strong> Use keyboard shortcuts to work faster!
          </ui-alert>
          <ui-alert variant="success">
            ✓ <strong>Saved:</strong> Your changes have been saved automatically.
          </ui-alert>
          <ui-alert variant="warning">
            ⚠ <strong>Notice:</strong> Maintenance scheduled for tonight at 2 AM.
          </ui-alert>
          <ui-alert variant="error">
            ✕ <strong>Failed:</strong> Unable to connect to the server.
          </ui-alert>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Lists</h3>
      <ui-card>
        <ui-alert variant="error" title="Form Validation Errors">
          <p>Please fix the following errors:</p>
          <ul>
            <li>Email address is required</li>
            <li>Password must be at least 8 characters</li>
            <li>Terms and conditions must be accepted</li>
          </ul>
        </ui-alert>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Actions</h3>
      <ui-card>
        <div class="alert-stack">
          <ui-alert variant="info">
            <div class="alert-with-action">
              <div>
                <strong>New update available</strong>
                <p>Version 2.0 is now available with new features and improvements.</p>
              </div>
              <ui-button size="sm" variant="outlined">Update Now</ui-button>
            </div>
          </ui-alert>
          
          <ui-alert variant="warning">
            <div class="alert-with-action">
              <div>
                <strong>Your trial expires in 3 days</strong>
                <p>Upgrade now to continue using all premium features.</p>
              </div>
              <ui-button size="sm" color="warning">Upgrade</ui-button>
            </div>
          </ui-alert>
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

    .alert-stack {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .alert-with-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--primitive-spacing-4);
    }

    .alert-with-action > div {
      flex: 1;
    }

    .alert-with-action p {
      margin: var(--primitive-spacing-1) 0 0 0;
      font-size: var(--primitive-font-size-sm);
    }

    ui-alert ul {
      margin: var(--primitive-spacing-2) 0 0 var(--primitive-spacing-5);
      padding: 0;
    }

    ui-alert li {
      margin-bottom: var(--primitive-spacing-1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDemoComponent {
  protected showAlert1 = signal(true);
  protected showAlert2 = signal(true);

  protected resetAlerts(): void {
    this.showAlert1.set(true);
    this.showAlert2.set(true);
  }
}
