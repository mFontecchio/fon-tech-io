import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [CommonModule, RadioComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Radio Group</h3>
      <ui-card>
        <div class="radio-group">
          <ui-radio
            name="color"
            value="red"
            label="Red"
            [checked]="selectedColor() === 'red'"
            (checkedChange)="handleColorChange('red')"
          />
          <ui-radio
            name="color"
            value="green"
            label="Green"
            [checked]="selectedColor() === 'green'"
            (checkedChange)="handleColorChange('green')"
          />
          <ui-radio
            name="color"
            value="blue"
            label="Blue"
            [checked]="selectedColor() === 'blue'"
            (checkedChange)="handleColorChange('blue')"
          />
        </div>
        @if (selectedColor()) {
          <p class="demo-output">Selected: {{ selectedColor() }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="radio-group">
          <ui-radio size="sm" name="size" value="small" label="Small" />
          <ui-radio size="md" name="size" value="medium" label="Medium" />
          <ui-radio size="lg" name="size" value="large" label="Large" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="radio-group">
          <ui-radio name="state" value="normal" label="Normal" />
          <ui-radio name="state" value="selected" label="Selected" [checked]="true" />
          <ui-radio name="disabled" value="disabled" label="Disabled" [disabled]="true" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Subscription Plan</h3>
      <ui-card>
        <div class="radio-group">
          <ui-radio
            name="plan"
            value="free"
            label="Free - $0/month"
            [checked]="selectedPlan() === 'free'"
            (checkedChange)="handlePlanChange('free')"
          />
          <ui-radio
            name="plan"
            value="pro"
            label="Pro - $9.99/month"
            [checked]="selectedPlan() === 'pro'"
            (checkedChange)="handlePlanChange('pro')"
          />
          <ui-radio
            name="plan"
            value="enterprise"
            label="Enterprise - $49.99/month"
            [checked]="selectedPlan() === 'enterprise'"
            (checkedChange)="handlePlanChange('enterprise')"
          />
        </div>
        <p class="demo-output">
          Selected plan: <strong>{{ selectedPlan() || 'None' }}</strong>
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

    .radio-group {
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
export class RadioDemoComponent {
  protected selectedColor = signal('red');
  protected selectedPlan = signal('free');

  protected handleColorChange(color: string): void {
    this.selectedColor.set(color);
  }

  protected handlePlanChange(plan: string): void {
    this.selectedPlan.set(plan);
  }
}
