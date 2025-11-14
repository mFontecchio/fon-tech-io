import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackComponent, CardComponent, ButtonComponent } from '@ui-suite/components';

@Component({
  selector: 'app-stack-demo',
  standalone: true,
  imports: [CommonModule, StackComponent, CardComponent, ButtonComponent],
  template: `
    <div class="demo-section">
      <h3>Vertical Stack (Default)</h3>
      <ui-card>
        <ui-stack>
          <div class="demo-item">Item 1</div>
          <div class="demo-item">Item 2</div>
          <div class="demo-item">Item 3</div>
        </ui-stack>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Horizontal Stack</h3>
      <ui-card>
        <ui-stack direction="horizontal">
          <div class="demo-item">Item 1</div>
          <div class="demo-item">Item 2</div>
          <div class="demo-item">Item 3</div>
        </ui-stack>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Different Spacing</h3>
      <ui-card>
        <div class="spacing-examples">
          <div>
            <p class="label">Spacing: 2 (small)</p>
            <ui-stack [spacing]="2">
              <div class="demo-item">Item 1</div>
              <div class="demo-item">Item 2</div>
              <div class="demo-item">Item 3</div>
            </ui-stack>
          </div>
          
          <div>
            <p class="label">Spacing: 4 (medium)</p>
            <ui-stack [spacing]="4">
              <div class="demo-item">Item 1</div>
              <div class="demo-item">Item 2</div>
              <div class="demo-item">Item 3</div>
            </ui-stack>
          </div>
          
          <div>
            <p class="label">Spacing: 8 (large)</p>
            <ui-stack [spacing]="8">
              <div class="demo-item">Item 1</div>
              <div class="demo-item">Item 2</div>
              <div class="demo-item">Item 3</div>
            </ui-stack>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Alignment</h3>
      <ui-card>
        <div class="alignment-examples">
          <div>
            <p class="label">Align: start</p>
            <ui-stack direction="horizontal" align="start">
              <div class="demo-item small">Small</div>
              <div class="demo-item">Normal</div>
              <div class="demo-item large">Large</div>
            </ui-stack>
          </div>
          
          <div>
            <p class="label">Align: center</p>
            <ui-stack direction="horizontal" align="center">
              <div class="demo-item small">Small</div>
              <div class="demo-item">Normal</div>
              <div class="demo-item large">Large</div>
            </ui-stack>
          </div>
          
          <div>
            <p class="label">Align: end</p>
            <ui-stack direction="horizontal" align="end">
              <div class="demo-item small">Small</div>
              <div class="demo-item">Normal</div>
              <div class="demo-item large">Large</div>
            </ui-stack>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: Form</h3>
      <ui-card>
        <ui-stack [spacing]="4">
          <h4>Sign Up Form</h4>
          <input type="text" placeholder="Full Name" class="form-input" />
          <input type="email" placeholder="Email" class="form-input" />
          <input type="password" placeholder="Password" class="form-input" />
          <ui-stack direction="horizontal" justify="space-between">
            <ui-button variant="outlined">Cancel</ui-button>
            <ui-button color="primary">Sign Up</ui-button>
          </ui-stack>
        </ui-stack>
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

    .demo-item {
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-brand-subtle);
      color: var(--semantic-brand-primary);
      border-radius: var(--primitive-border-radius-md);
      text-align: center;
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
    }

    .demo-item.small {
      padding: var(--primitive-spacing-2);
    }

    .demo-item.large {
      padding: var(--primitive-spacing-5);
    }

    .spacing-examples, .alignment-examples {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-6);
    }

    .label {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      font-weight: var(--primitive-font-weight-medium);
    }

    h4 {
      margin: 0;
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .form-input {
      padding: var(--primitive-spacing-3);
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-md);
      font-size: var(--primitive-font-size-md);
      background-color: var(--semantic-surface-default);
      color: var(--semantic-text-primary);
      width: 100%;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--semantic-brand-primary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackDemoComponent {}
