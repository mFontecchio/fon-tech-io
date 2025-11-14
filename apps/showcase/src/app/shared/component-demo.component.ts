/**
 * Component Demo Viewer
 * Displays live interactive examples of components based on component ID and example data
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputComponent,
  TextareaComponent,
  CheckboxComponent,
  RadioComponent,
  SwitchComponent,
  SelectComponent,
  SelectOption,
  MultiSelectComponent,
  SliderComponent,
  CardComponent,
  AlertComponent,
  BadgeComponent,
  AvatarComponent,
  ChipComponent,
  SpinnerComponent,
  ProgressComponent,
  SkeletonComponent,
  DividerComponent,
  StackComponent,
  GridComponent,
} from '@ui-suite/components';

@Component({
  selector: 'app-component-demo',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    SelectComponent,
    MultiSelectComponent,
    SliderComponent,
    CardComponent,
    AlertComponent,
    BadgeComponent,
    AvatarComponent,
    ChipComponent,
    SpinnerComponent,
    ProgressComponent,
    SkeletonComponent,
    DividerComponent,
    StackComponent,
    GridComponent,
  ],
  template: `
    <div class="component-demo">
      <div class="demo-container">
        @switch (componentId()) {
          <!-- BUTTON DEMOS -->
          @case ('button') {
            @if (exampleTitle() === 'Basic Usage') {
              <ui-button>Click Me</ui-button>
            }
            @if (exampleTitle() === 'Button Variants') {
              <div class="demo-row">
                <ui-button variant="filled">Filled</ui-button>
                <ui-button variant="outlined">Outlined</ui-button>
                <ui-button variant="text">Text</ui-button>
              </div>
            }
            @if (exampleTitle() === 'Button Sizes') {
              <div class="demo-row">
                <ui-button size="sm">Small</ui-button>
                <ui-button size="md">Medium</ui-button>
                <ui-button size="lg">Large</ui-button>
              </div>
            }
            @if (exampleTitle() === 'Disabled State') {
              <ui-button [disabled]="true">Disabled Button</ui-button>
            }
            @if (exampleTitle() === 'Loading State') {
              <ui-button [loading]="true">Loading...</ui-button>
            }
            @if (exampleTitle() === 'Full Width') {
              <ui-button [fullWidth]="true">Full Width Button</ui-button>
            }
          }

          <!-- INPUT DEMOS -->
          @case ('input') {
            @if (exampleTitle() === 'Basic Input') {
              <ui-input label="Email" placeholder="Enter your email" />
            }
            @if (exampleTitle() === 'Input Types') {
              <div class="demo-column">
                <ui-input type="email" label="Email" placeholder="email@example.com" />
                <ui-input type="password" label="Password" placeholder="Enter password" />
                <ui-input type="number" label="Age" placeholder="Enter age" />
                <ui-input type="tel" label="Phone" placeholder="(123) 456-7890" />
              </div>
            }
            @if (exampleTitle() === 'Input with Prefix Icon') {
              <ui-input 
                label="Search" 
                placeholder="Search..." 
                prefixIcon="🔍" 
              />
            }
            @if (exampleTitle() === 'Input with Suffix Icon') {
              <ui-input 
                label="Password" 
                type="password"
                placeholder="Enter password" 
                suffixIcon="👁️" 
              />
            }
            @if (exampleTitle() === 'Input with Error') {
              <ui-input 
                label="Email" 
                value="invalid-email"
                error="Please enter a valid email address"
              />
            }
            @if (exampleTitle() === 'Input with Helper Text') {
              <ui-input 
                label="Username" 
                placeholder="Enter username"
                helperText="Must be 3-20 characters, letters and numbers only"
              />
            }
            @if (exampleTitle() === 'Disabled Input') {
              <ui-input 
                label="Email" 
                value="user@example.com"
                [disabled]="true"
              />
            }
            @if (exampleTitle() === 'Required Input') {
              <ui-input 
                label="Email" 
                placeholder="Enter your email"
                [required]="true"
              />
            }
          }

          <!-- TEXTAREA DEMOS -->
          @case ('textarea') {
            @if (exampleTitle() === 'Basic Textarea') {
              <ui-textarea 
                label="Description" 
                placeholder="Enter description..." 
                [rows]="5" 
              />
            }
          }

          <!-- CHECKBOX DEMOS -->
          @case ('checkbox') {
            @if (exampleTitle() === 'Basic Checkbox') {
              <ui-checkbox label="Accept terms and conditions" />
            }
            @if (exampleTitle() === 'Checkbox States') {
              <div class="demo-column">
                <ui-checkbox label="Unchecked" [checked]="false" />
                <ui-checkbox label="Checked" [checked]="true" />
                <ui-checkbox label="Indeterminate" [indeterminate]="true" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Checkbox') {
              <div class="demo-column">
                <ui-checkbox label="Disabled unchecked" [disabled]="true" />
                <ui-checkbox label="Disabled checked" [checked]="true" [disabled]="true" />
              </div>
            }
            @if (exampleTitle() === 'Checkbox Group') {
              <div class="demo-column">
                <ui-checkbox label="JavaScript" />
                <ui-checkbox label="TypeScript" />
                <ui-checkbox label="Angular" />
              </div>
            }
          }

          <!-- RADIO DEMOS -->
          @case ('radio') {
            @if (exampleTitle() === 'Radio Group') {
              <div class="demo-column">
                <ui-radio name="plan" value="free" label="Free Plan" />
                <ui-radio name="plan" value="pro" label="Pro Plan" />
              </div>
            }
          }

          <!-- SWITCH DEMOS -->
          @case ('switch') {
            @if (exampleTitle() === 'Basic Switch') {
              <ui-switch label="Enable notifications" />
            }
            @if (exampleTitle() === 'Switch States') {
              <div class="demo-column">
                <ui-switch label="Off" [checked]="false" />
                <ui-switch label="On" [checked]="true" />
              </div>
            }
            @if (exampleTitle() === 'Switch Sizes') {
              <div class="demo-column">
                <ui-switch label="Small" size="sm" />
                <ui-switch label="Medium" size="md" />
                <ui-switch label="Large" size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Disabled Switch') {
              <div class="demo-column">
                <ui-switch label="Disabled off" [disabled]="true" />
                <ui-switch label="Disabled on" [checked]="true" [disabled]="true" />
              </div>
            }
          }

          <!-- SELECT DEMOS -->
          @case ('select') {
            @if (exampleTitle() === 'Basic Select') {
              <ui-select 
                label="Country" 
                [options]="sampleOptions()" 
                placeholder="Select country" 
              />
            }
          }

          <!-- MULTI-SELECT DEMOS -->
          @case ('multi-select') {
            @if (exampleTitle() === 'Multi-Select') {
              <ui-multi-select 
                label="Skills" 
                [options]="skillOptions()" 
                placeholder="Select skills" 
              />
            }
          }

          <!-- SLIDER DEMOS -->
          @case ('slider') {
            @if (exampleTitle() === 'Basic Slider') {
              <ui-slider 
                label="Volume" 
                [min]="0" 
                [max]="100" 
                [value]="50" 
              />
            }
          }

          <!-- CARD DEMOS -->
          @case ('card') {
            @if (exampleTitle() === 'Basic Card') {
              <ui-card>
                <h3>Card Title</h3>
                <p>Card content goes here...</p>
              </ui-card>
            }
            @if (exampleTitle() === 'Card Variants') {
              <div class="demo-column">
                <ui-card variant="elevated">
                  <h3>Elevated Card</h3>
                  <p>Card with shadow elevation</p>
                </ui-card>
                <ui-card variant="outlined">
                  <h3>Outlined Card</h3>
                  <p>Card with border only</p>
                </ui-card>
                <ui-card variant="filled">
                  <h3>Filled Card</h3>
                  <p>Card with background fill</p>
                </ui-card>
              </div>
            }
          }

          <!-- ALERT DEMOS -->
          @case ('alert') {
            @if (exampleTitle() === 'Alert Variants') {
              <div class="demo-column">
                <ui-alert variant="info">
                  This is an informational message.
                </ui-alert>
                <ui-alert variant="success">
                  Operation completed successfully!
                </ui-alert>
                <ui-alert variant="warning">
                  Please review your input carefully.
                </ui-alert>
                <ui-alert variant="error">
                  An error occurred. Please try again.
                </ui-alert>
              </div>
            }
            @if (exampleTitle() === 'Dismissible Alert') {
              <ui-alert variant="info" [dismissible]="true">
                You can close this alert by clicking the X button.
              </ui-alert>
            }
            @if (exampleTitle() === 'Alert Sizes') {
              <div class="demo-column">
                <ui-alert variant="info" size="sm">Small alert message</ui-alert>
                <ui-alert variant="info" size="md">Medium alert message</ui-alert>
                <ui-alert variant="info" size="lg">Large alert message</ui-alert>
              </div>
            }
          }

          <!-- BADGE DEMOS -->
          @case ('badge') {
            @if (exampleTitle() === 'Badge Variants') {
              <div class="demo-row">
                <ui-badge variant="default">Default</ui-badge>
                <ui-badge variant="primary">Primary</ui-badge>
                <ui-badge variant="success">Success</ui-badge>
                <ui-badge variant="warning">Warning</ui-badge>
                <ui-badge variant="error">Error</ui-badge>
              </div>
            }
            @if (exampleTitle() === 'Badge Sizes') {
              <div class="demo-row">
                <ui-badge size="sm">Small</ui-badge>
                <ui-badge size="md">Medium</ui-badge>
                <ui-badge size="lg">Large</ui-badge>
              </div>
            }
            @if (exampleTitle() === 'Status Indicators') {
              <div class="demo-row">
                <ui-badge variant="success">Active</ui-badge>
                <ui-badge variant="warning">Pending</ui-badge>
                <ui-badge variant="error">Inactive</ui-badge>
              </div>
            }
            @if (exampleTitle() === 'Count Badges') {
              <div class="demo-row">
                <ui-badge variant="primary">5</ui-badge>
                <ui-badge variant="error">99+</ui-badge>
              </div>
            }
          }

          <!-- AVATAR DEMOS -->
          @case ('avatar') {
            @if (exampleTitle() === 'Avatar with Image') {
              <ui-avatar text="JD" alt="John Doe" />
            }
          }

          <!-- CHIP DEMOS -->
          @case ('chip') {
            @if (exampleTitle() === 'Removable Chip') {
              <ui-chip label="JavaScript" [removable]="true" />
            }
          }

          <!-- SPINNER DEMOS -->
          @case ('spinner') {
            @if (exampleTitle() === 'Basic Spinner') {
              <ui-spinner />
            }
            @if (exampleTitle() === 'Spinner Sizes') {
              <div class="demo-row">
                <ui-spinner size="sm" />
                <ui-spinner size="md" />
                <ui-spinner size="lg" />
              </div>
            }
            @if (exampleTitle() === 'Inline Loading') {
              <p>Loading data <ui-spinner size="sm" /></p>
            }
          }

          <!-- PROGRESS DEMOS -->
          @case ('progress') {
            @if (exampleTitle() === 'Progress Bar') {
              <ui-progress [value]="75" [showValue]="true" />
            }
          }

          <!-- SKELETON DEMOS -->
          @case ('skeleton') {
            @if (exampleTitle() === 'Text Skeleton') {
              <ui-skeleton variant="text" width="200px" />
            }
          }

          <!-- DIVIDER DEMOS -->
          @case ('divider') {
            @if (exampleTitle() === 'Horizontal Divider') {
              <div class="demo-column" style="width: 100%;">
                <div>Section 1</div>
                <ui-divider />
                <div>Section 2</div>
              </div>
            }
          }

          <!-- STACK DEMOS -->
          @case ('stack') {
            @if (exampleTitle() === 'Vertical Stack') {
              <ui-stack direction="vertical" [spacing]="4">
                <div style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;">Item 1</div>
                <div style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;">Item 2</div>
              </ui-stack>
            }
          }

          <!-- GRID DEMOS -->
          @case ('grid') {
            @if (exampleTitle() === 'Responsive Grid') {
              <ui-grid [columns]="3" [gap]="4">
                <div style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;">Item 1</div>
                <div style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;">Item 2</div>
                <div style="padding: 1rem; background: var(--semantic-surface-subtle); border-radius: 4px;">Item 3</div>
              </ui-grid>
            }
          }

          @default {
            <div class="demo-placeholder">
              <p>Live demo coming soon for this example</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .component-demo {
      width: 100%;
    }

    .demo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .demo-row {
      display: flex;
      gap: var(--primitive-spacing-4);
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .demo-column {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
      align-items: flex-start;
    }

    .demo-placeholder {
      text-align: center;
      color: var(--semantic-text-tertiary);
      font-style: italic;
      padding: var(--primitive-spacing-6);
    }

    /* Ensure components have appropriate sizing */
    :host ::ng-deep ui-input,
    :host ::ng-deep ui-textarea,
    :host ::ng-deep ui-select,
    :host ::ng-deep ui-multi-select,
    :host ::ng-deep ui-slider {
      width: 100%;
      max-width: 400px;
    }

    :host ::ng-deep ui-card {
      width: 100%;
      max-width: 500px;
    }

    :host ::ng-deep ui-alert {
      width: 100%;
      max-width: 600px;
    }

    :host ::ng-deep ui-stack,
    :host ::ng-deep ui-grid {
      width: 100%;
      max-width: 600px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDemoComponent {
  /**
   * Component ID to determine which demo to show
   */
  readonly componentId = input.required<string>();

  /**
   * Example title to determine which specific example to show
   */
  readonly exampleTitle = input.required<string>();

  /**
   * Loading state for button demos
   */
  protected readonly isLoading = signal(false);

  /**
   * Sample select options
   */
  protected readonly sampleOptions = signal<SelectOption[]>([
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]);

  /**
   * Skill options for multi-select
   */
  protected readonly skillOptions = signal<SelectOption[]>([
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]);

  /**
   * Handle loading demo button click
   */
  protected handleLoadingDemo(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }
}

