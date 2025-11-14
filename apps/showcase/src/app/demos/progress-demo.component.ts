import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent, CardComponent, ButtonComponent } from '@ui-suite/components';

@Component({
  selector: 'app-progress-demo',
  standalone: true,
  imports: [CommonModule, ProgressComponent, CardComponent, ButtonComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Progress</h3>
      <ui-card>
        <ui-progress [value]="50" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Colors</h3>
      <ui-card>
        <div class="progress-stack">
          <ui-progress [value]="75" color="primary" />
          <ui-progress [value]="60" color="secondary" />
          <ui-progress [value]="85" color="success" />
          <ui-progress [value]="40" color="warning" />
          <ui-progress [value]="25" color="error" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="progress-stack">
          <ui-progress [value]="70" size="sm" />
          <ui-progress [value]="70" size="md" />
          <ui-progress [value]="70" size="lg" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Labels</h3>
      <ui-card>
        <div class="progress-stack">
          <ui-progress [value]="30" [showValue]="true" />
          <ui-progress [value]="60" [showValue]="true" color="success" />
          <ui-progress [value]="90" [showValue]="true" color="primary" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Interactive Progress</h3>
      <ui-card>
        <ui-progress [value]="progressValue()" [showValue]="true" color="primary" />
        <div class="button-group">
          <ui-button size="sm" variant="outlined" (clicked)="decreaseProgress()">-10%</ui-button>
          <ui-button size="sm" variant="outlined" (clicked)="increaseProgress()">+10%</ui-button>
          <ui-button size="sm" variant="text" (clicked)="resetProgress()">Reset</ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>File Upload Example</h3>
      <ui-card>
        <div class="upload-example">
          <div class="upload-info">
            <span class="filename">document.pdf</span>
            <span class="filesize">{{ uploadProgress() }}% complete</span>
          </div>
          <ui-progress [value]="uploadProgress()" color="success" size="sm" />
          @if (uploadProgress() < 100) {
            <ui-button size="sm" variant="outlined" (clicked)="simulateUpload()">
              Start Upload
            </ui-button>
          } @else {
            <ui-button size="sm" color="success" variant="outlined">
              ✓ Complete
            </ui-button>
          }
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Multi-step Progress</h3>
      <ui-card>
        <div class="steps-example">
          <div class="step-info">
            <span>Step {{ currentStep() }} of 4</span>
            <span>{{ stepLabels()[currentStep() - 1] }}</span>
          </div>
            <ui-progress [value]="(currentStep() / 4) * 100" [showValue]="true" />
          <div class="button-group">
            <ui-button 
              size="sm" 
              variant="outlined" 
              [disabled]="currentStep() === 1"
              (clicked)="previousStep()"
            >
              Previous
            </ui-button>
            <ui-button 
              size="sm" 
              [disabled]="currentStep() === 4"
              (clicked)="nextStep()"
            >
              Next
            </ui-button>
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

    .progress-stack {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
    }

    .button-group {
      display: flex;
      gap: var(--primitive-spacing-2);
      margin-top: var(--primitive-spacing-4);
      justify-content: center;
    }

    .upload-example {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .upload-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .filename {
      font-size: var(--primitive-font-size-md);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-primary);
    }

    .filesize {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .steps-example {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .step-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressDemoComponent {
  protected progressValue = signal(50);
  protected uploadProgress = signal(0);
  protected currentStep = signal(1);
  protected stepLabels = signal(['Account Info', 'Profile Details', 'Preferences', 'Confirmation']);

  protected increaseProgress(): void {
    this.progressValue.update(v => Math.min(v + 10, 100));
  }

  protected decreaseProgress(): void {
    this.progressValue.update(v => Math.max(v - 10, 0));
  }

  protected resetProgress(): void {
    this.progressValue.set(50);
  }

  protected simulateUpload(): void {
    this.uploadProgress.set(0);
    const interval = setInterval(() => {
      this.uploadProgress.update(v => {
        const newValue = v + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newValue;
      });
    }, 300);
  }

  protected nextStep(): void {
    this.currentStep.update(v => Math.min(v + 1, 4));
  }

  protected previousStep(): void {
    this.currentStep.update(v => Math.max(v - 1, 1));
  }
}
