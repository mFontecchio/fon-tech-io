import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, CardComponent, ButtonComponent, InputComponent } from '@ui-suite/components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, StepperComponent, CardComponent, ButtonComponent, InputComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Stepper</h3>
      <ui-card>
        <ui-stepper 
          [steps]="basicSteps()"
          [activeStep]="currentBasicStep()"
          (activeStepChange)="currentBasicStep.set($event)"
        />
        <div class="stepper-controls">
          <ui-button 
            variant="outlined" 
            [disabled]="currentBasicStep() === 0"
            (clicked)="previousBasicStep()"
          >
            Previous
          </ui-button>
          <ui-button 
            [disabled]="currentBasicStep() === basicSteps().length - 1"
            (clicked)="nextBasicStep()"
          >
            Next
          </ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Orientation</h3>
      <ui-card>
        <div class="orientation-examples">
          <div>
            <p class="label">Horizontal (Default)</p>
            <ui-stepper [steps]="basicSteps()" [activeStep]="1" orientation="horizontal" />
          </div>
          <div>
            <p class="label">Vertical</p>
            <ui-stepper [steps]="basicSteps()" [activeStep]="1" orientation="vertical" />
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Icons</h3>
      <ui-card>
        <ui-stepper
          [steps]="withIcons()"
          [activeStep]="currentIconStep()"
          (activeStepChange)="currentIconStep.set($event)"
        />
        <div class="stepper-controls">
          <ui-button 
            variant="outlined" 
            [disabled]="currentIconStep() === 0"
            (clicked)="decrementIconStep()"
          >
            Previous
          </ui-button>
          <ui-button 
            [disabled]="currentIconStep() === withIcons().length - 1"
            (clicked)="incrementIconStep()"
          >
            Next
          </ui-button>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Descriptions</h3>
      <ui-card>
        <ui-stepper [steps]="withDescriptions()" [activeStep]="1" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: Form Wizard</h3>
      <ui-card>
        <ui-stepper
          [steps]="formSteps()"
          [activeStep]="formStep()"
          (activeStepChange)="formStep.set($event)"
        />

        <div class="form-content">
          @switch (formStep()) {
            @case (0) {
              <div class="form-step">
                <h4>Account Information</h4>
                <ui-input label="Email" type="email" placeholder="email@example.com" [(value)]="formData.email" />
                <ui-input label="Password" type="password" placeholder="Enter password" [(value)]="formData.password" />
              </div>
            }
            @case (1) {
              <div class="form-step">
                <h4>Personal Details</h4>
                <ui-input label="First Name" placeholder="John" [(value)]="formData.firstName" />
                <ui-input label="Last Name" placeholder="Doe" [(value)]="formData.lastName" />
              </div>
            }
            @case (2) {
              <div class="form-step">
                <h4>Preferences</h4>
                <p class="info-text">Configure your notification preferences and privacy settings.</p>
              </div>
            }
            @case (3) {
              <div class="form-step">
                <h4>Review & Confirm</h4>
                <div class="review-data">
                  <p><strong>Email:</strong> {{ formData.email() || 'Not provided' }}</p>
                  <p><strong>Name:</strong> {{ formData.firstName() }} {{ formData.lastName() }}</p>
                </div>
              </div>
            }
          }

          <div class="stepper-controls">
            <ui-button 
              variant="outlined" 
              [disabled]="formStep() === 0"
              (clicked)="decrementFormStep()"
            >
              Previous
            </ui-button>
            @if (formStep() < formSteps().length - 1) {
              <ui-button (clicked)="incrementFormStep()">
                Next
              </ui-button>
            } @else {
              <ui-button color="success" (clicked)="submitForm()">
                Submit
              </ui-button>
            }
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

    .stepper-controls {
      display: flex;
      justify-content: space-between;
      margin-top: var(--primitive-spacing-5);
    }

    .orientation-examples {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--primitive-spacing-6);
    }

    .label {
      margin-bottom: var(--primitive-spacing-3);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .form-content {
      margin-top: var(--primitive-spacing-6);
    }

    .form-step {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-4);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      min-height: 200px;
    }

    .form-step h4 {
      margin: 0 0 var(--primitive-spacing-3) 0;
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .info-text {
      margin: 0;
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-brand-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .review-data {
      padding: var(--primitive-spacing-4);
      background-color: var(--semantic-surface-default);
      border-radius: var(--primitive-border-radius-md);
    }

    .review-data p {
      margin: var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-secondary);
    }

    .review-data strong {
      color: var(--semantic-text-primary);
    }

    @media (max-width: 768px) {
      .orientation-examples {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemoComponent {
  protected currentBasicStep = signal(0);
  protected currentIconStep = signal(0);
  protected formStep = signal(0);

  protected basicSteps = signal([
    { id: 'step-1', label: 'Step 1' },
    { id: 'step-2', label: 'Step 2' },
    { id: 'step-3', label: 'Step 3' },
    { id: 'step-4', label: 'Step 4' },
  ]);

  protected withIcons = signal([
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'profile', label: 'Profile', icon: '📝' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
    { id: 'complete', label: 'Complete', icon: '✓' },
  ]);

  protected withDescriptions = signal([
    { id: 'select', label: 'Select Campaign', description: 'Choose your campaign type' },
    { id: 'create', label: 'Create Ad', description: 'Design your advertisement' },
    { id: 'target', label: 'Target Audience', description: 'Define your target audience' },
    { id: 'review', label: 'Review & Launch', description: 'Review and launch campaign' },
  ]);

  protected formSteps = signal([
    { id: 'account', label: 'Account' },
    { id: 'personal', label: 'Personal' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'confirm', label: 'Confirm' },
  ]);

  protected formData = {
    email: signal(''),
    password: signal(''),
    firstName: signal(''),
    lastName: signal(''),
  };

  protected previousBasicStep(): void {
    this.currentBasicStep.update(v => Math.max(v - 1, 0));
  }

  protected nextBasicStep(): void {
    this.currentBasicStep.update(v => Math.min(v + 1, this.basicSteps().length - 1));
  }

  protected decrementIconStep(): void {
    this.currentIconStep.update(v => v - 1);
  }

  protected incrementIconStep(): void {
    this.currentIconStep.update(v => v + 1);
  }

  protected decrementFormStep(): void {
    this.formStep.update(v => v - 1);
  }

  protected incrementFormStep(): void {
    this.formStep.update(v => v + 1);
  }

  protected submitForm(): void {
    console.log('Form submitted:', {
      email: this.formData.email(),
      firstName: this.formData.firstName(),
      lastName: this.formData.lastName(),
    });
    alert('Form submitted successfully!');
  }
}
