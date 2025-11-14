import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [CommonModule, SelectComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Select</h3>
      <ui-card>
        <ui-select
          label="Choose a country"
          placeholder="Select a country"
          [options]="countries()"
          [(value)]="selectedCountry"
        />
        @if (selectedCountry()) {
          <p class="demo-output">Selected: {{ selectedCountry() }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="select-grid">
          <ui-select size="sm" label="Small" [options]="sizes()" placeholder="Select size" />
          <ui-select size="md" label="Medium" [options]="sizes()" placeholder="Select size" />
          <ui-select size="lg" label="Large" [options]="sizes()" placeholder="Select size" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="select-grid">
          <ui-select label="Required" [options]="countries()" placeholder="Required" [required]="true" />
          <ui-select label="Disabled" [options]="countries()" [disabled]="true" value="usa" />
          <ui-select label="Error" [options]="countries()" placeholder="Select" error="This field is required" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Helper Text</h3>
      <ui-card>
        <ui-select
          label="Programming Language"
          placeholder="Choose your language"
          [options]="languages()"
          helperText="Select your primary programming language"
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

    .select-grid {
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
export class SelectDemoComponent {
  protected selectedCountry = signal('');
  
  protected countries = signal([
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'germany', label: 'Germany' },
  ]);

  protected sizes = signal([
    { value: 'xs', label: 'Extra Small' },
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ]);

  protected languages = signal([
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ]);
}
