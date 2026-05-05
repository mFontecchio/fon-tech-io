/**
 * Passthrough Table Component
 * Renders a formatted table of content projection slots and native attribute
 * passthrough surfaces for a component's API documentation.
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassthroughMetadata } from '../data/component-metadata.types';

@Component({
  selector: 'app-passthrough-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="passthrough-table-wrapper">
      <table class="passthrough-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Selector / Key</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          @for (pt of passthroughs(); track pt.name) {
            <tr>
              <td><code class="pt-name">{{ pt.name }}</code></td>
              <td>
                <span
                  class="pt-type-badge"
                  [class.pt-type-badge--slot]="pt.type === 'slot'"
                  [class.pt-type-badge--passthrough]="pt.type === 'passthrough'"
                >
                  {{ pt.type }}
                </span>
              </td>
              <td><code class="pt-selector">{{ pt.selector }}</code></td>
              <td class="pt-required">
                @if (pt.optional === false) {
                  <span class="pt-required--yes" aria-label="Required">Yes</span>
                } @else {
                  <span class="pt-required--no" aria-label="Optional">No</span>
                }
              </td>
              <td class="pt-description">{{ pt.description }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .passthrough-table-wrapper {
        overflow-x: auto;
        margin-bottom: var(--primitive-spacing-6);
      }

      .passthrough-table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--primitive-font-size-sm);
      }

      .passthrough-table thead tr {
        background-color: var(--semantic-surface-background-secondary);
      }

      .passthrough-table th {
        text-align: left;
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-primary);
        border-bottom: 2px solid var(--semantic-border-default);
        white-space: nowrap;
      }

      .passthrough-table td {
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        border-bottom: 1px solid var(--semantic-border-subtle);
        vertical-align: top;
      }

      .passthrough-table tr:last-child td {
        border-bottom: none;
      }

      .passthrough-table tr:hover td {
        background-color: var(--semantic-surface-background-secondary);
      }

      .pt-name {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        background-color: var(--semantic-surface-code);
        color: var(--semantic-text-code);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
        white-space: nowrap;
      }

      .pt-selector {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-text-secondary);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
        white-space: nowrap;
      }

      .pt-type-badge {
        display: inline-block;
        padding: 2px var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-full);
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .pt-type-badge--slot {
        background-color: var(--semantic-state-info-subtle, #dbeafe);
        color: var(--semantic-state-info, #1d4ed8);
      }

      .pt-type-badge--passthrough {
        background-color: var(--semantic-state-warning-subtle, #fef9c3);
        color: var(--semantic-state-warning, #a16207);
      }

      .pt-required--yes {
        color: var(--semantic-state-error, #dc2626);
        font-weight: var(--primitive-font-weight-semibold);
      }

      .pt-required--no {
        color: var(--semantic-text-tertiary);
      }

      .pt-description {
        color: var(--semantic-text-secondary);
        line-height: var(--primitive-line-height-lg);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassthroughTableComponent {
  readonly passthroughs = input.required<PassthroughMetadata[]>();
}
