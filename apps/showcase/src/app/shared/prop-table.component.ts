/**
 * PropTable Component
 * Displays component inputs and outputs in a formatted table
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMetadata, OutputMetadata } from '../data/component-metadata.types';

@Component({
  selector: 'app-prop-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prop-table">
      <table>
        <caption class="sr-only">
          Component API reference
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            @if (showDefault()) {
              <th>Default</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (input of inputs(); track input.name) {
            <tr>
              <td>
                <code class="prop-name">{{ input.name }}</code>
                @if (input.required) {
                  <span class="required-badge">required</span>
                }
              </td>
              <td>
                <code class="prop-type">{{ input.type }}</code>
              </td>
              <td class="prop-description">{{ input.description }}</td>
              @if (showDefault()) {
                <td>
                  @if (input.defaultValue) {
                    <code class="prop-default">{{ input.defaultValue }}</code>
                  } @else {
                    <span class="prop-default-none">-</span>
                  }
                </td>
              }
            </tr>
          }
          @for (output of outputs(); track output.name) {
            <tr>
              <td>
                <code class="prop-name">{{ output.name }}</code>
              </td>
              <td>
                <code class="prop-type">{{ output.type }}</code>
              </td>
              <td class="prop-description">{{ output.description }}</td>
              @if (showDefault()) {
                <td><span class="prop-default-none">-</span></td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .prop-table {
        width: 100%;
        overflow-x: auto;
        margin: var(--primitive-spacing-4) 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        overflow: hidden;
      }

      thead {
        background-color: var(--semantic-surface-background-secondary);
      }

      th {
        text-align: left;
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-primary);
        border-bottom: 2px solid var(--semantic-border-default);
      }

      td {
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        border-bottom: 1px solid var(--semantic-border-subtle);
        vertical-align: top;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tbody tr:hover {
        background-color: var(--semantic-surface-background-secondary);
      }

      code {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: var(--primitive-font-size-xs);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
      }

      .prop-name {
        background-color: var(--semantic-surface-code);
        color: var(--semantic-brand-primary);
        font-weight: var(--primitive-font-weight-semibold);
      }

      .prop-type {
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-text-tertiary);
      }

      .prop-default {
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-text-secondary);
      }

      .prop-default-none {
        color: var(--semantic-text-disabled);
        font-style: italic;
      }

      .prop-description {
        line-height: var(--primitive-line-height-relaxed);
      }

      .required-badge {
        display: inline-block;
        margin-left: var(--primitive-spacing-2);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-inverse);
        background-color: var(--semantic-state-error);
        border-radius: var(--primitive-border-radius-sm);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      @media (max-width: 768px) {
        .prop-table {
          font-size: var(--primitive-font-size-xs);
        }

        th,
        td {
          padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropTableComponent {
  readonly inputs = input<InputMetadata[]>([]);
  readonly outputs = input<OutputMetadata[]>([]);
  readonly showDefault = input<boolean>(true);
}
