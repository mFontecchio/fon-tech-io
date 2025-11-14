import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Input</h3>
      <ui-card>
        <ui-input label="Full Name" placeholder="Enter your name" [(value)]="name" />
        @if (name()) {
          <p class="demo-output">Value: {{ name() }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Input Types</h3>
      <ui-card>
        <div class="input-grid">
          <ui-input type="text" label="Text" placeholder="Text input" />
          <ui-input type="email" label="Email" placeholder="email@example.com" />
          <ui-input type="password" label="Password" placeholder="Enter password" />
          <ui-input type="number" label="Number" placeholder="123" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="input-grid">
          <ui-input size="sm" label="Small" placeholder="Small input" />
          <ui-input size="md" label="Medium" placeholder="Medium input" />
          <ui-input size="lg" label="Large" placeholder="Large input" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="input-grid">
          <ui-input label="Required" placeholder="Required field" [required]="true" />
          <ui-input label="Disabled" placeholder="Disabled" [disabled]="true" value="Cannot edit" />
          <ui-input label="Error" placeholder="Invalid input" error="This field is required" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Helper Text</h3>
      <ui-card>
        <ui-input
          label="Username"
          placeholder="Choose a username"
          helperText="Must be 3-20 characters, alphanumeric only"
        />
      </ui-card>
    </div>
  `,
  styles: [
    `
      .demo-section {
        margin-bottom: var(--primitive-spacing-6);
      }

      .demo-section h3 {
        margin-bottom: var(--primitive-spacing-3);
        font-size: var(--primitive-font-size-lg);
        color: var(--semantic-text-primary);
      }

      .input-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--primitive-spacing-4);
      }

      .demo-output {
        margin-top: var(--primitive-spacing-4);
        padding: var(--primitive-spacing-3);
        background-color: var(--semantic-surface-subtle);
        border-radius: var(--primitive-border-radius-md);
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDemoComponent {
  protected name = signal('');
}
