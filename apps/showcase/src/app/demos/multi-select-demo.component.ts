import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-multi-select-demo',
  standalone: true,
  imports: [CommonModule, MultiSelectComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Multi-Select</h3>
      <ui-card>
        <ui-multi-select
          label="Select technologies"
          placeholder="Choose multiple..."
          [options]="technologies()"
          [(value)]="selectedTech"
        />
        @if (selectedTech().length > 0) {
          <p class="demo-output">Selected ({{ selectedTech().length }}): {{ selectedTech().join(', ') }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Search</h3>
      <ui-card>
        <ui-multi-select
          label="Choose frameworks"
          placeholder="Search and select..."
          [options]="frameworks()"
          [searchable]="true"
        />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Allow Custom Tags</h3>
      <ui-card>
        <ui-multi-select
          label="Add tags"
          placeholder="Type and press Enter to add custom tags"
          [options]="predefinedTags()"
          [searchable]="true"
        />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="select-grid">
          <ui-multi-select size="sm" label="Small" [options]="colors()" placeholder="Select colors" />
          <ui-multi-select size="md" label="Medium" [options]="colors()" placeholder="Select colors" />
          <ui-multi-select size="lg" label="Large" [options]="colors()" placeholder="Select colors" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="select-grid">
          <ui-multi-select label="Disabled" [options]="colors()" [disabled]="true" [value]="['red', 'blue']" />
          <ui-multi-select label="Error" [options]="colors()" placeholder="Select" error="At least one selection required" />
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
export class MultiSelectDemoComponent {
  protected selectedTech = signal<string[]>([]);
  
  protected technologies = signal([
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'node', label: 'Node.js' },
    { value: 'deno', label: 'Deno' },
  ]);

  protected frameworks = signal([
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt' },
    { value: 'remix', label: 'Remix' },
  ]);

  protected predefinedTags = signal([
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'documentation', label: 'Documentation' },
  ]);

  protected colors = signal([
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
  ]);
}
