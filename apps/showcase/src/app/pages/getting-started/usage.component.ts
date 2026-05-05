/**
 * Usage Guide Page
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CodeBlockComponent } from '@ui-suite/components';

@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [CommonModule, CardComponent, CodeBlockComponent],
  template: `
    <div class="doc-page">
      <h1>Usage</h1>

      <p class="lead">
        The shared libraries are designed for Angular standalone components. Import only the UI pieces you need,
        bind to inputs and outputs directly, and keep application state in signals or your preferred store.
      </p>

      <div class="content-grid">
        <fui-card>
          <h2>Standalone Component Imports</h2>
          <p>Import the library components in the feature component that renders them.</p>
          <fui-code-block [code]="standaloneExample" language="typescript" [title]="'Standalone Example'" />
        </fui-card>

        <fui-card>
          <h2>Template Usage</h2>
          <p>Inputs are regular Angular bindings and outputs emit typed events.</p>
          <fui-code-block [code]="templateExample" language="html" [title]="'Template Example'" />
        </fui-card>
      </div>

      <fui-card>
        <h2>Patterns To Follow</h2>
        <ul>
          <li>Prefer signals for local view state and pass their values into component inputs.</li>
          <li>Use projected prefix and suffix content where components support richer content than plain strings.</li>
          <li>Keep examples aligned with the actual public APIs documented in the showcase API tab.</li>
        </ul>
      </fui-card>
    </div>
  `,
  styles: [
    `
      .doc-page {
        padding: var(--primitive-spacing-8);
        max-width: 900px;
        margin: 0 auto;
        display: grid;
        gap: var(--primitive-spacing-6);
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
      }

      .lead {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-lg);
        line-height: 1.6;
      }

      .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--primitive-spacing-6);
      }

      h2 {
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      p,
      li {
        color: var(--semantic-text-secondary);
        line-height: 1.6;
      }

      ul {
        margin: 0;
        padding-left: 1.25rem;
      }

      @media (max-width: 768px) {
        .doc-page {
          padding: var(--primitive-spacing-6);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageComponent {
  protected readonly standaloneExample = `import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent, InputComponent } from '@ui-suite/components';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  templateUrl: './account-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent {
  protected readonly email = signal('');

  protected updateEmail(value: string): void {
    this.email.set(value);
  }
}`;

  protected readonly templateExample = `<fui-input
  label="Email"
  type="email"
  [value]="email()"
  helperText="We only use this for product updates."
  (valueChange)="updateEmail($event)"
/>

<fui-button variant="filled">Save changes</fui-button>`;
}