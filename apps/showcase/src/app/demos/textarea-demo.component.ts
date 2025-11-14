import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-textarea-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, TextareaComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Textarea</h3>
      <ui-card>
        <ui-textarea
          label="Description"
          placeholder="Enter a detailed description..."
          [(value)]="description"
        />
        @if (description()) {
          <p class="demo-output">Character count: {{ description().length }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="textarea-grid">
          <ui-textarea size="sm" label="Small" placeholder="Small textarea" [rows]="3" />
          <ui-textarea size="md" label="Medium" placeholder="Medium textarea" [rows]="4" />
          <ui-textarea size="lg" label="Large" placeholder="Large textarea" [rows]="5" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="textarea-grid">
          <ui-textarea label="Required" placeholder="Required field" [required]="true" />
          <ui-textarea label="Disabled" [disabled]="true" value="Cannot edit this content" />
          <ui-textarea label="Error" placeholder="Invalid input" error="This field is required" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Auto-resize</h3>
      <ui-card>
        <ui-textarea
          label="Auto-growing Textarea"
          placeholder="Type to see it grow..."
          [autoResize]="true"
          helperText="This textarea automatically expands as you type"
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

    .textarea-grid {
      display: grid;
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
export class TextareaDemoComponent {
  protected description = signal('');
}
