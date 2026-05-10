/**
 * Chart Component
 *
 * Unified chart rendering component supporting line, bar, area, pie,
 * donut (SVG-rendered) and scatter (Canvas-rendered) chart types.
 *
 * All geometry is derived via Angular computed() signals. The SVG branch
 * uses declarative templates; the Canvas branch uses effect() for imperative
 * draw calls. Strict CSP compliance is maintained throughout.
 *
 * @example
 * ```html
 * <fui-chart
 *   type="line"
 *   [datasets]="revenueData"
 *   [labels]="months"
 *   [options]="{ smooth: true, yAxisLabel: 'USD' }"
 *   ariaLabel="Monthly revenue for 2025"
 * />
 * ```
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import type {
  ChartBarRect,
  ChartDataset,
  ChartOptions,
  ChartPieSlice,
  ChartScale,
  ChartTooltipState,
  ChartType,
  ResolvedChartOptions,
} from './chart.types';

import { resolveOptions, computeYScale, computeXScale, formatTickValue, valueToPixel } from './chart-scale.utils';
import { buildLinePath, buildAreaPath, buildBarRects, buildPieSlices, SVG_PADDING } from './chart-svg.utils';
import { drawScatter } from './chart-canvas.utils';
import { resolveDatasetColors, getDashPattern } from './chart-color.utils';
import { ChartTooltipComponent } from './chart-tooltip.component';
import { ChartLegendComponent } from './chart-legend.component';

@Component({
  selector: 'fui-chart',
  standalone: true,
  imports: [ChartTooltipComponent, ChartLegendComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fui-chart-host',
  },
})
export class ChartComponent {
  // ---------------------------------------------------------------------------
  // Inputs
  // ---------------------------------------------------------------------------

  /** Chart type. Determines rendering strategy (SVG vs Canvas). */
  readonly type = input<ChartType>('bar');

  /** Array of data series to render. */
  readonly datasets = input.required<readonly ChartDataset[]>();

  /**
   * Category labels for indexed chart types (line, bar, area, pie, donut).
   * For scatter plots this is used only for the accessible data table.
   */
  readonly labels = input.required<readonly string[]>();

  /** Optional chart configuration — all fields have sensible defaults. */
  readonly options = input<ChartOptions>({});

  /** Accessible description of the chart. Required for WCAG 2.1 AA compliance. */
  readonly ariaLabel = input.required<string>();

  // ---------------------------------------------------------------------------
  // Internal state
  // ---------------------------------------------------------------------------

  private readonly _hostRef = inject(ElementRef<HTMLElement>);
  private readonly _canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private _resizeObserver: ResizeObserver | null = null;

  protected readonly containerWidth = signal(0);
  protected readonly containerHeight = signal(0);

  /** Exposed so the template can reference SVG_PADDING constants. */
  protected readonly SVG_PADDING = SVG_PADDING;

  /** Indices of datasets hidden via legend toggle. */
  protected readonly hiddenDatasets = signal<readonly number[]>([]);

  protected readonly tooltipState = signal<ChartTooltipState>({
    visible: false, x: 0, y: 0, label: '', items: [],
  });

  // ---------------------------------------------------------------------------
  // Computed geometry
  // ---------------------------------------------------------------------------

  protected readonly resolvedOptions = computed<ResolvedChartOptions>(() =>
    resolveOptions(this.options())
  );

  /** Datasets filtered to exclude legend-hidden series. */
  protected readonly visibleDatasets = computed<readonly ChartDataset[]>(() => {
    const hidden = this.hiddenDatasets();
    return this.datasets().filter((_, i) => !hidden.includes(i));
  });

  protected readonly colors = computed<string[]>(() =>
    resolveDatasetColors(this.datasets())
  );

  protected readonly yScale = computed<ChartScale>(() =>
    computeYScale(this.visibleDatasets(), this.resolvedOptions())
  );

  protected readonly xScale = computed<ChartScale>(() =>
    computeXScale(this.visibleDatasets(), this.resolvedOptions())
  );

  /** Usable drawing area dimensions after padding. */
  protected readonly drawWidth = computed<number>(() =>
    Math.max(0, this.containerWidth() - SVG_PADDING.left - SVG_PADDING.right)
  );

  protected readonly drawHeight = computed<number>(() =>
    Math.max(0, this.containerHeight() - SVG_PADDING.top - SVG_PADDING.bottom)
  );

  /** SVG viewBox string derived from container dimensions. */
  protected readonly viewBox = computed<string>(() =>
    `0 0 ${this.containerWidth()} ${this.containerHeight()}`
  );

  /** Y-axis tick positions with pixel coordinates and formatted labels. */
  protected readonly yTicks = computed(() => {
    const scale = this.yScale();
    const height = this.drawHeight();
    return scale.ticks.map(value => ({
      value,
      label: formatTickValue(value),
      y: SVG_PADDING.top + valueToPixel(value, scale, height, true),
    }));
  });

  /** X-axis label positions. */
  protected readonly xLabels = computed(() => {
    const labels = this.labels();
    const width = this.drawWidth();
    return labels.map((label, i) => ({
      label,
      x: SVG_PADDING.left + (i / Math.max(labels.length - 1, 1)) * width,
    }));
  });

  /** Computed SVG path data for line chart datasets. */
  protected readonly linePaths = computed(() => {
    const opts = this.resolvedOptions();
    const scale = this.yScale();
    const width = this.drawWidth();
    const height = this.drawHeight();
    return this.visibleDatasets().map(ds => ({
      d: buildLinePath(ds.data as readonly number[], scale, width, height, opts.smooth),
    }));
  });

  /** Computed SVG path data for area chart datasets. */
  protected readonly areaPaths = computed(() => {
    const opts = this.resolvedOptions();
    const scale = this.yScale();
    const width = this.drawWidth();
    const height = this.drawHeight();
    return this.visibleDatasets().map(ds => ({
      line: buildLinePath(ds.data as readonly number[], scale, width, height, opts.smooth),
      area: buildAreaPath(ds.data as readonly number[], scale, width, height, opts.smooth),
    }));
  });

  /** Computed bar rect geometry. */
  protected readonly barRects = computed<ChartBarRect[]>(() =>
    buildBarRects(this.visibleDatasets(), this.yScale(), this.drawWidth(), this.drawHeight())
  );

  /** Computed pie/donut slice paths. */
  protected readonly pieSlices = computed<ChartPieSlice[]>(() => {
    const w = this.containerWidth();
    const h = this.containerHeight();
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 16;
    const innerRadius = this.type() === 'donut'
      ? radius * this.resolvedOptions().donutThickness
      : 0;
    return buildPieSlices(this.visibleDatasets(), this.labels(), cx, cy, radius, innerRadius);
  });

  protected readonly isDimensioned = computed<boolean>(() =>
    this.containerWidth() > 0 && this.containerHeight() > 0
  );

  protected readonly isSvgChart = computed<boolean>(() =>
    this.type() !== 'scatter'
  );

  protected readonly isCartesian = computed<boolean>(() =>
    this.type() === 'line' || this.type() === 'bar' || this.type() === 'area' || this.type() === 'scatter'
  );

  protected readonly isPolar = computed<boolean>(() =>
    this.type() === 'pie' || this.type() === 'donut'
  );

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  constructor() {
    // Scatter: redraw canvas whenever data or dimensions change
    effect(() => {
      if (this.type() !== 'scatter') return;
      const canvasRef = this._canvasRef();
      if (!canvasRef) return;

      const ctx = canvasRef.nativeElement.getContext('2d');
      if (!ctx) return;

      drawScatter(
        ctx,
        this.visibleDatasets(),
        this.xScale(),
        this.yScale(),
        this.containerWidth(),
        this.containerHeight(),
        typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1
      );
    });

    // Initialise ResizeObserver to track container dimensions
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(entries => {
        const entry = entries[0];
        if (!entry) return;
        const { width } = entry.contentRect;
        const opts = this.resolvedOptions();
        this.containerWidth.set(Math.floor(width));
        this.containerHeight.set(Math.floor(width / opts.aspectRatio));
      });
      observer.observe(this._hostRef.nativeElement);
      // Store reference for potential future cleanup
      this._resizeObserver = observer;
    }
  }

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  /**
   * Handles pointer move events on the SVG element to update tooltip state.
   *
   * @param event - The PointerEvent from the SVG element.
   */
  protected handleSvgPointerMove(event: PointerEvent): void {
    const svgEl = event.currentTarget as SVGSVGElement;
    const rect = svgEl.getBoundingClientRect();
    const relX = event.clientX - rect.left - SVG_PADDING.left;
    const relY = event.clientY - rect.top - SVG_PADDING.top;

    if (this.isPolar()) {
      this.updatePolarTooltip(relX + SVG_PADDING.left, relY + SVG_PADDING.top, event);
      return;
    }

    this.updateCartesianTooltip(relX, relY, event);
  }

  protected handlePointerLeave(): void {
    this.tooltipState.set({ visible: false, x: 0, y: 0, label: '', items: [] });
  }

  protected handleLegendChange(hidden: readonly number[]): void {
    this.hiddenDatasets.set(hidden);
  }

  protected getDashPattern(index: number): string {
    return getDashPattern(index);
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private updateCartesianTooltip(relX: number, relY: number, event: PointerEvent): void {
    const labels = this.labels();
    if (labels.length === 0) return;

    const width = this.drawWidth();
    const pointIndex = Math.round((relX / width) * (labels.length - 1));
    const clampedIndex = Math.max(0, Math.min(pointIndex, labels.length - 1));
    const label = labels[clampedIndex] ?? '';
    const colors = this.colors();

    const items = this.visibleDatasets()
      .filter(ds => clampedIndex < ds.data.length)
      .map((ds, i) => ({
        datasetLabel: ds.label,
        value: (ds.data as readonly number[])[clampedIndex] ?? 0,
        color: colors[i] ?? 'var(--semantic-brand-primary)',
      }));

    const svgEl = (event.currentTarget as SVGSVGElement);
    const rect = svgEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.tooltipState.set({ visible: true, x, y, label, items });
  }

  private updatePolarTooltip(x: number, y: number, event: PointerEvent): void {
    const slices = this.pieSlices();
    const cx = this.containerWidth() / 2;
    const cy = this.containerHeight() / 2;
    const dx = x - cx;
    const dy = y - cy;
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const normalAngle = angle < 0 ? angle + 2 * Math.PI : angle;

    let cumulative = 0;
    const total = slices.reduce((s, sl) => s + sl.value, 0);
    const hovered = slices.find(sl => {
      const sliceAngle = (sl.value / total) * 2 * Math.PI;
      const inSlice = normalAngle >= cumulative && normalAngle < cumulative + sliceAngle;
      cumulative += sliceAngle;
      return inSlice;
    });

    if (!hovered) {
      this.tooltipState.set({ visible: false, x: 0, y: 0, label: '', items: [] });
      return;
    }

    const svgEl = (event.currentTarget as SVGSVGElement);
    const rect = svgEl.getBoundingClientRect();

    this.tooltipState.set({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      label: hovered.label,
      items: [{
        datasetLabel: hovered.label,
        value: `${hovered.value} (${hovered.percentage.toFixed(1)}%)`,
        color: hovered.color,
      }],
    });
  }
}
