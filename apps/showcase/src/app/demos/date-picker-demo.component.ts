import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-date-picker-demo',
  standalone: true,
  imports: [CommonModule, DatePickerComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Date Picker</h3>
      <ui-card>
        <ui-date-picker
          label="Select a date"
          placeholder="Choose date"
          [(value)]="selectedDate"
        />
        @if (selectedDate()) {
          <p class="demo-output">Selected: {{ selectedDate() }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="picker-grid">
          <ui-date-picker size="sm" label="Small" placeholder="Select date" />
          <ui-date-picker size="md" label="Medium" placeholder="Select date" />
          <ui-date-picker size="lg" label="Large" placeholder="Select date" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="picker-grid">
          <ui-date-picker label="Required" placeholder="Required" [required]="true" />
          <ui-date-picker label="Disabled" [disabled]="true" value="2025-01-15" />
          <ui-date-picker label="Error" placeholder="Select date" error="Date is required" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Min/Max Dates</h3>
      <ui-card>
        <ui-date-picker
          label="Book a meeting"
          placeholder="Select date"
          [min]="minDate()"
          [max]="maxDate()"
          helperText="Available dates: next 30 days only"
        />
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

    .picker-grid {
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerDemoComponent {
  protected selectedDate = signal('');
  protected minDate = signal(new Date().toISOString().split('T')[0]);
  protected maxDate = signal((() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  })());
}
