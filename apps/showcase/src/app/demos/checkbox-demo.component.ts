import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Checkbox</h3>
      <ui-card>
        <ui-checkbox
          label="Accept terms and conditions"
          [(checked)]="accepted"
        />
        @if (accepted()) {
          <p class="demo-output">✓ Terms accepted</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="checkbox-group">
          <ui-checkbox size="sm" label="Small checkbox" />
          <ui-checkbox size="md" label="Medium checkbox" />
          <ui-checkbox size="lg" label="Large checkbox" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="checkbox-group">
          <ui-checkbox label="Unchecked" [checked]="false" />
          <ui-checkbox label="Checked" [checked]="true" />
          <ui-checkbox label="Disabled" [disabled]="true" />
          <ui-checkbox label="Disabled Checked" [checked]="true" [disabled]="true" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Multiple Selection</h3>
      <ui-card>
        <div class="checkbox-group">
          <ui-checkbox label="JavaScript" [(checked)]="skills.js" />
          <ui-checkbox label="TypeScript" [(checked)]="skills.ts" />
          <ui-checkbox label="Angular" [(checked)]="skills.angular" />
          <ui-checkbox label="React" [(checked)]="skills.react" />
        </div>
        <p class="demo-output">
          Selected: {{ getSelectedSkills() }}
        </p>
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

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .demo-output {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxDemoComponent {
  protected accepted = signal(false);
  protected skills = {
    js: signal(true),
    ts: signal(true),
    angular: signal(false),
    react: signal(false),
  };

  protected getSelectedSkills(): string {
    const selected: string[] = [];
    if (this.skills.js()) selected.push('JavaScript');
    if (this.skills.ts()) selected.push('TypeScript');
    if (this.skills.angular()) selected.push('Angular');
    if (this.skills.react()) selected.push('React');
    return selected.length > 0 ? selected.join(', ') : 'None';
  }
}
