/**
 * Chart Tooltip Component
 *
 * Floating tooltip overlay that displays data point values on hover.
 * Position is driven by CSS custom properties to maintain strict CSP compliance.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
} from '@angular/core';
import type { ChartTooltipState } from './chart.types';

@Component({
  selector: 'fui-chart-tooltip',
  standalone: true,
  template: `
    @if (state().visible) {
      <div #tooltipEl class="fui-chart-tooltip" role="tooltip" aria-live="polite">
        <div class="fui-chart-tooltip__label">{{ state().label }}</div>
        <ul class="fui-chart-tooltip__list" aria-label="Data values">
          @for (item of state().items; track item.datasetLabel) {
            <li class="fui-chart-tooltip__item">
              <span
                class="fui-chart-tooltip__swatch"
                [attr.aria-hidden]="true"
                [attr.data-color]="item.color"
              ></span>
              <span class="fui-chart-tooltip__dataset">{{ item.datasetLabel }}</span>
              <span class="fui-chart-tooltip__value">{{ item.value }}</span>
            </li>
          }
        </ul>
      </div>
    }
  `,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: visible;
      }

      .fui-chart-tooltip {
        position: absolute;
        left: var(--fui-tooltip-x, 0px);
        top: var(--fui-tooltip-y, 0px);
        transform: translate(-50%, calc(-100% - var(--primitive-spacing-2)));
        background-color: var(--semantic-surface-overlay);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        box-shadow: var(--primitive-shadow-lg);
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        min-width: 8rem;
        max-width: 16rem;
        z-index: 100;
        pointer-events: none;
        animation: fui-tooltip-in var(--animation-duration-fast) var(--animation-easing-default);
      }

      @keyframes fui-tooltip-in {
        from { opacity: 0; transform: translate(-50%, calc(-100% - var(--primitive-spacing-1))); }
        to   { opacity: 1; transform: translate(-50%, calc(-100% - var(--primitive-spacing-2))); }
      }

      .fui-chart-tooltip__label {
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .fui-chart-tooltip__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-1);
      }

      .fui-chart-tooltip__item {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-primary);
      }

      .fui-chart-tooltip__swatch {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
        background-color: var(--fui-swatch-color, var(--semantic-brand-primary));
      }

      .fui-chart-tooltip__dataset {
        flex: 1;
        color: var(--semantic-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .fui-chart-tooltip__value {
        font-weight: var(--primitive-font-weight-semibold);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTooltipComponent {
  /** Current tooltip display state driven by parent chart signals. */
  readonly state = input.required<ChartTooltipState>();

  private readonly _hostRef = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      const s = this.state();
      const host = this._hostRef.nativeElement;
      host.style.setProperty('--fui-tooltip-x', `${s.x}px`);
      host.style.setProperty('--fui-tooltip-y', `${s.y}px`);
    });
  }
}
