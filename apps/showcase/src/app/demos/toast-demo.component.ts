import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@ui-suite/components';
import { ToastService } from '@ui-suite/components';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="demo-section">
      <h3>Toast Variants</h3>
      <ui-card>
        <div class="button-grid">
          <ui-button (clicked)="showSuccess()">
            Success Toast
          </ui-button>
          <ui-button (clicked)="showInfo()">
            Info Toast
          </ui-button>
          <ui-button (clicked)="showWarning()">
            Warning Toast
          </ui-button>
          <ui-button (clicked)="showError()">
            Error Toast
          </ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Different Durations</h3>
      <ui-card>
        <div class="button-grid">
          <ui-button variant="outlined" (clicked)="showQuick()">
            Quick (2s)
          </ui-button>
          <ui-button variant="outlined" (clicked)="showNormal()">
            Normal (4s)
          </ui-button>
          <ui-button variant="outlined" (clicked)="showLong()">
            Long (6s)
          </ui-button>
          <ui-button variant="outlined" (clicked)="showPersistent()">
            Persistent
          </ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Action Examples</h3>
      <ui-card>
        <div class="button-grid">
          <ui-button color="success" (clicked)="showSaveSuccess()">
            Save Action
          </ui-button>
          <ui-button color="error" (clicked)="showDeleteWarning()">
            Delete Action
          </ui-button>
          <ui-button color="primary" (clicked)="showUploadProgress()">
            Upload Action
          </ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Multiple Toasts</h3>
      <ui-card>
        <ui-button (clicked)="showMultiple()">
          Show Multiple Toasts
        </ui-button>
        <p class="info-text">
          Click to see how multiple toasts stack and display
        </p>
      </ui-card>
    </div>

    <div class="demo-info">
      <p><strong>Note:</strong> Toasts appear in the top-right corner of the page.</p>
      <p>They automatically dismiss after the specified duration or can be closed manually.</p>
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

    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--primitive-spacing-3);
    }

    .info-text {
      margin-top: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .demo-info {
      margin-top: var(--primitive-spacing-6);
      padding: var(--primitive-spacing-4);
      background-color: var(--semantic-brand-subtle);
      border-left: 4px solid var(--semantic-brand-primary);
      border-radius: var(--primitive-border-radius-md);
    }

    .demo-info p {
      margin: var(--primitive-spacing-1) 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .demo-info p:first-child {
      margin-top: 0;
    }

    .demo-info p:last-child {
      margin-bottom: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemoComponent {
  private toastService = inject(ToastService);

  protected showSuccess(): void {
    this.toastService.show('Operation completed successfully!', 'success');
  }

  protected showInfo(): void {
    this.toastService.show('Here is some helpful information.', 'info');
  }

  protected showWarning(): void {
    this.toastService.show('Please review this warning.', 'warning');
  }

  protected showError(): void {
    this.toastService.show('An error occurred. Please try again.', 'error');
  }

  protected showQuick(): void {
    this.toastService.show('Quick toast (2 seconds)', 'info', 2000);
  }

  protected showNormal(): void {
    this.toastService.show('Normal toast (4 seconds)', 'info', 4000);
  }

  protected showLong(): void {
    this.toastService.show('Long-lasting toast (6 seconds)', 'info', 6000);
  }

  protected showPersistent(): void {
    this.toastService.show('This toast stays until you close it manually', 'info', 0);
  }

  protected showSaveSuccess(): void {
    this.toastService.show('✓ Your changes have been saved successfully.', 'success');
  }

  protected showDeleteWarning(): void {
    this.toastService.show('⚠ Item deleted. This action cannot be undone.', 'warning', 5000);
  }

  protected showUploadProgress(): void {
    this.toastService.show('📤 Uploading file... This may take a moment.', 'info', 3000);
  }

  protected showMultiple(): void {
    this.toastService.show('First toast notification', 'info');
    setTimeout(() => {
      this.toastService.show('Second toast notification', 'success');
    }, 500);
    setTimeout(() => {
      this.toastService.show('Third toast notification', 'warning');
    }, 1000);
  }
}
