/**
 * Chart Legend Component
 *
 * Renders dataset color swatches with labels below a chart.
 * Supports toggling dataset visibility via click.
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import type { ChartDataset } from './chart.types';

@Component({
  selector: 'fui-chart-legend',
  standalone: true,
  template: `
    <ul class="fui-chart-legend" role="list" aria-label="Chart legend">
      @for (item of items(); track item.label; let i = $index) {
        <li class="fui-chart-legend__item">
          <button
            type="button"
            class="fui-chart-legend__btn"
            [class.fui-chart-legend__btn--hidden]="hiddenIndices().includes(i)"
            [attr.aria-pressed]="hiddenIndices().includes(i)"
            [attr.aria-label]="hiddenIndices().includes(i) ? 'Show ' + item.label : 'Hide ' + item.label"
            (click)="toggleDataset(i)"
          >
            <span
              class="fui-chart-legend__swatch"
              aria-hidden="true"
              [attr.data-color-index]="i"
            ></span>
            <span class="fui-chart-legend__label">{{ item.label }}</span>
          </button>
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .fui-chart-legend {
        list-style: none;
        margin: var(--primitive-spacing-3) 0 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--primitive-spacing-2) var(--primitive-spacing-4);
      }

      .fui-chart-legend__item {
        display: contents;
      }

      .fui-chart-legend__btn {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        background: none;
        border: none;
        cursor: pointer;
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
        color: var(--semantic-text-primary);
        font-size: var(--primitive-font-size-sm);
        transition:
          opacity var(--animation-duration-fast) var(--animation-easing-default),
          background-color var(--animation-duration-fast) var(--animation-easing-default);
      }

      .fui-chart-legend__btn:hover {
        background-color: var(--semantic-surface-background-secondary);
      }

      .fui-chart-legend__btn:focus-visible {
        outline: 2px solid var(--semantic-border-focus);
        outline-offset: 2px;
      }

      .fui-chart-legend__btn--hidden {
        opacity: 0.4;
      }

      .fui-chart-legend__swatch {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        flex-shrink: 0;
        background-color: var(--fui-legend-swatch-color, var(--semantic-brand-primary));
      }

      .fui-chart-legend__label {
        white-space: nowrap;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendComponent {
  /** Dataset array from the parent chart. */
  readonly items = input.required<readonly ChartDataset[]>();

  /** Emits the set of currently hidden dataset indices on each toggle. */
  readonly hiddenChange = output<readonly number[]>();

  protected readonly hiddenIndices = signal<readonly number[]>([]);

  protected toggleDataset(index: number): void {
    const current = this.hiddenIndices();
    const next = current.includes(index)
      ? current.filter(i => i !== index)
      : [...current, index];
    this.hiddenIndices.set(next);
    this.hiddenChange.emit(next);
  }
}
