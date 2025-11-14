/**
 * Prop Table Component
 * Displays component inputs/outputs in a table format
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentInput, ComponentOutput } from '../data/component-metadata.types';

@Component({
  selector: 'app-prop-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prop-table-container">
      <table class="prop-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            @if (showDefault()) {
              <th>Default</th>
            }
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          @if (inputs().length > 0) {
            @for (prop of inputs(); track prop.name) {
              <tr>
                <td class="prop-name">
                  <code>{{ prop.name }}</code>
                  @if (prop.required) {
                    <span class="required-badge">required</span>
                  }
                </td>
                <td class="prop-type">
                  <code>{{ prop.type }}</code>
                </td>
                @if (showDefault()) {
                  <td class="prop-default">
                    @if (prop.default) {
                      <code>{{ prop.default }}</code>
                    } @else {
                      <span class="prop-no-default">-</span>
                    }
                  </td>
                }
                <td class="prop-description">{{ prop.description }}</td>
              </tr>
            }
          }
          @if (outputs().length > 0) {
            @for (output of outputs(); track output.name) {
              <tr>
                <td class="prop-name">
                  <code>{{ output.name }}</code>
                </td>
                <td class="prop-type">
                  <code>{{ output.type }}</code>
                </td>
                @if (showDefault()) {
                  <td class="prop-default">
                    <span class="prop-no-default">-</span>
                  </td>
                }
                <td class="prop-description">{{ output.description }}</td>
              </tr>
            }
          }
        </tbody>
      </table>

      @if (inputs().length === 0 && outputs().length === 0) {
        <p class="no-props">No properties to display.</p>
      }
    </div>
  `,
  styles: [`
    .prop-table-container {
      overflow-x: auto;
    }

    .prop-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--primitive-font-size-sm);
    }

    .prop-table th {
      text-align: left;
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-bottom: 2px solid var(--semantic-border-default);
      font-weight: var(--primitive-font-weight-bold);
      color: var(--semantic-text-primary);
    }

    .prop-table td {
      padding: var(--primitive-spacing-3);
      border-bottom: 1px solid var(--semantic-border-default);
      vertical-align: top;
    }

    .prop-table tr:last-child td {
      border-bottom: none;
    }

    .prop-name {
      white-space: nowrap;
    }

    .prop-name code {
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-brand-primary);
    }

    .required-badge {
      display: inline-block;
      margin-left: var(--primitive-spacing-2);
      padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
      background-color: var(--primitive-color-red-100);
      color: var(--primitive-color-red-700);
      border-radius: var(--primitive-border-radius-sm);
      font-size: 0.65rem;
      font-weight: var(--primitive-font-weight-bold);
      text-transform: uppercase;
    }

    .prop-type code {
      color: var(--primitive-color-purple-600);
    }

    .prop-default code {
      color: var(--primitive-color-green-600);
    }

    .prop-no-default {
      color: var(--semantic-text-disabled);
    }

    .prop-description {
      color: var(--semantic-text-secondary);
      line-height: 1.6;
    }

    code {
      padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
    }

    .no-props {
      padding: var(--primitive-spacing-6);
      text-align: center;
      color: var(--semantic-text-secondary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .prop-table {
        font-size: var(--primitive-font-size-xs);
      }

      .prop-table th,
      .prop-table td {
        padding: var(--primitive-spacing-2);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropTableComponent {
  readonly inputs = input<ComponentInput[]>([]);
  readonly outputs = input<ComponentOutput[]>([]);
  readonly showDefault = input<boolean>(true);
}

