import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [CommonModule, SwitchComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Switch</h3>
      <ui-card>
        <ui-switch
          label="Enable notifications"
          [(checked)]="notifications"
        />
        <p class="demo-output">
          Notifications: <strong>{{ notifications() ? 'ON' : 'OFF' }}</strong>
        </p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="switch-group">
          <ui-switch size="sm" label="Small switch" />
          <ui-switch size="md" label="Medium switch" />
          <ui-switch size="lg" label="Large switch" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="switch-group">
          <ui-switch label="Unchecked" [checked]="false" />
          <ui-switch label="Checked" [checked]="true" />
          <ui-switch label="Disabled Off" [disabled]="true" [checked]="false" />
          <ui-switch label="Disabled On" [disabled]="true" [checked]="true" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Settings Panel</h3>
      <ui-card>
        <div class="switch-group">
          <ui-switch label="Dark mode" [(checked)]="settings.darkMode" />
          <ui-switch label="Auto-save" [(checked)]="settings.autoSave" />
          <ui-switch label="Show tooltips" [(checked)]="settings.tooltips" />
          <ui-switch label="Enable animations" [(checked)]="settings.animations" />
        </div>
        <div class="demo-output">
          <strong>Settings:</strong>
          <ul>
            <li>Dark mode: {{ settings.darkMode() ? '✓' : '✗' }}</li>
            <li>Auto-save: {{ settings.autoSave() ? '✓' : '✗' }}</li>
            <li>Tooltips: {{ settings.tooltips() ? '✓' : '✗' }}</li>
            <li>Animations: {{ settings.animations() ? '✓' : '✗' }}</li>
          </ul>
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

    .switch-group {
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

    .demo-output ul {
      margin: var(--primitive-spacing-2) 0 0 var(--primitive-spacing-4);
      padding: 0;
    }

    .demo-output li {
      margin-bottom: var(--primitive-spacing-1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchDemoComponent {
  protected notifications = signal(true);
  protected settings = {
    darkMode: signal(false),
    autoSave: signal(true),
    tooltips: signal(true),
    animations: signal(false),
  };
}
