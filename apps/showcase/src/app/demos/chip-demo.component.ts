import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [CommonModule, ChipComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Colors</h3>
      <ui-card>
        <div class="chip-group">
          <ui-chip label="Primary" color="primary" />
          <ui-chip label="Secondary" color="secondary" />
          <ui-chip label="Success" color="success" />
          <ui-chip label="Warning" color="warning" />
          <ui-chip label="Error" color="error" />
          <ui-chip label="Info" color="info" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Variants</h3>
      <ui-card>
        <div class="chip-group">
          <ui-chip label="Default" variant="default" />
          <ui-chip label="Primary" variant="primary" />
          <ui-chip label="Success" variant="success" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="chip-group">
          <ui-chip label="Small" size="sm" />
          <ui-chip label="Medium" size="md" />
          <ui-chip label="Large" size="lg" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Removable Chips</h3>
      <ui-card>
        <div class="chip-group">
          @for (tag of tags(); track tag) {
            <ui-chip [label]="tag" [removable]="true" (removed)="removeTag(tag)" />
          }
        </div>
        @if (tags().length === 0) {
          <p class="empty-message">All tags removed</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Icons/Emojis</h3>
      <ui-card>
        <div class="chip-group">
          <ui-chip label="✓ Approved" color="success" />
          <ui-chip label="⏱ Pending" color="warning" />
          <ui-chip label="✕ Rejected" color="error" />
          <ui-chip label="📧 Email" color="info" />
          <ui-chip label="🔒 Private" color="primary" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Technology Stack Example</h3>
      <ui-card>
        <p class="section-label">Frontend:</p>
        <div class="chip-group">
          <ui-chip label="Angular" variant="primary" />
          <ui-chip label="TypeScript" variant="primary" />
          <ui-chip label="RxJS" variant="primary" />
          <ui-chip label="Signals" variant="primary" />
        </div>
        
        <p class="section-label">Backend:</p>
        <div class="chip-group">
          <ui-chip label="Node.js" variant="success" />
          <ui-chip label="Express" variant="success" />
          <ui-chip label="PostgreSQL" variant="success" />
        </div>
        
        <p class="section-label">Tools:</p>
        <div class="chip-group">
          <ui-chip label="Nx" variant="default" />
          <ui-chip label="Jest" variant="default" />
          <ui-chip label="Cypress" variant="default" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Filter Tags Example</h3>
      <ui-card>
        <p class="section-label">Active Filters:</p>
        <div class="chip-group">
          @for (filter of activeFilters(); track filter) {
            <ui-chip 
              [label]="filter"
              variant="primary"
              [removable]="true"
              (removed)="removeFilter(filter)"
            />
          }
        </div>
        @if (activeFilters().length === 0) {
          <p class="empty-message">No active filters</p>
        }
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

    .chip-group {
      display: flex;
      gap: var(--primitive-spacing-2);
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: var(--primitive-spacing-3);
    }

    .section-label {
      margin: var(--primitive-spacing-4) 0 var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .section-label:first-child {
      margin-top: 0;
    }

    .empty-message {
      margin: 0;
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-tertiary);
      text-align: center;
      font-style: italic;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipDemoComponent {
  protected tags = signal(['Angular', 'TypeScript', 'Signals', 'Nx', 'RxJS']);
  protected activeFilters = signal(['Category: Books', 'Price: $10-$50', 'Rating: 4+']);

  protected removeTag(tag: string): void {
    this.tags.set(this.tags().filter(t => t !== tag));
  }

  protected removeFilter(filter: string): void {
    this.activeFilters.set(this.activeFilters().filter(f => f !== filter));
  }
}
