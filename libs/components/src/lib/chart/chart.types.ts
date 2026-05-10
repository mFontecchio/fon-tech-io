/**
 * Chart Component Types
 *
 * Core type definitions for the fui-chart component system.
 * All chart types share the same data API — only the `type` input
 * and type-specific fields within `ChartOptions` differ.
 */

/**
 * Supported chart rendering types.
 *
 * SVG-rendered: line, bar, area, pie, donut
 * Canvas-rendered: scatter (for high-density point datasets)
 */
export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'scatter';

/**
 * Explicit x/y coordinate pair used by scatter plot datasets.
 *
 * @example
 * ```typescript
 * const points: ChartPoint[] = [
 *   { x: 1.2, y: 4.5 },
 *   { x: 3.0, y: 2.1 },
 * ];
 * ```
 */
export interface ChartPoint {
  readonly x: number;
  readonly y: number;
}

/**
 * Named color aliases that resolve to semantic design tokens.
 * Consumers may also pass any valid CSS color string.
 *
 * @example
 * ```typescript
 * { label: 'Revenue', data: [...], color: 'primary' }
 * { label: 'Costs',   data: [...], color: '#ff5733'  }
 * ```
 */
export type ChartColorAlias = 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'muted';

/**
 * A single data series within a chart.
 *
 * @example
 * ```typescript
 * const dataset: ChartDataset = {
 *   label: 'Monthly Revenue',
 *   data: [120, 340, 280, 450, 390],
 *   color: 'primary',
 * };
 * ```
 */
export interface ChartDataset {
  /** Display label shown in legend and tooltip. */
  readonly label: string;

  /**
   * Data values for this series.
   * Use `number[]` for indexed charts (line, bar, area, pie, donut).
   * Use `ChartPoint[]` for scatter plots.
   */
  readonly data: readonly number[] | readonly ChartPoint[];

  /**
   * Series color. Accepts a named alias or any valid CSS color string.
   * When omitted, the default palette cycles through semantic tokens.
   */
  readonly color?: ChartColorAlias | string;
}

/**
 * Configuration options for chart appearance and behaviour.
 * All fields are optional — sensible defaults are applied internally.
 *
 * @example
 * ```typescript
 * const options: ChartOptions = {
 *   smooth: true,
 *   yAxisLabel: 'USD',
 *   showGrid: true,
 *   tickCount: 6,
 * };
 * ```
 */
export interface ChartOptions {
  /** Label rendered below the X axis. */
  readonly xAxisLabel?: string;

  /** Label rendered to the left of the Y axis. */
  readonly yAxisLabel?: string;

  /**
   * Whether to render horizontal grid lines aligned to Y-axis ticks.
   * @default true
   */
  readonly showGrid?: boolean;

  /**
   * Whether to render the dataset legend below the chart.
   * @default true
   */
  readonly showLegend?: boolean;

  /**
   * Override the auto-detected minimum Y value.
   * Useful for forcing axes to start at zero.
   */
  readonly yMin?: number;

  /**
   * Override the auto-detected maximum Y value.
   * Useful for fixed-scale comparisons across multiple charts.
   */
  readonly yMax?: number;

  /**
   * Number of Y-axis tick marks (including min and max).
   * @default 5
   */
  readonly tickCount?: number;

  /**
   * When true, line and area charts use cubic bezier curves.
   * When false, straight line segments are used.
   * @default false
   */
  readonly smooth?: boolean;

  /**
   * Inner radius ratio for donut charts (0–1).
   * A value of 0 renders a solid pie; 1 would be invisible.
   * @default 0.6
   */
  readonly donutThickness?: number;

  /**
   * Chart aspect ratio expressed as width / height.
   * Used to derive the SVG viewBox height from container width.
   * @default 1.7778 (16:9)
   */
  readonly aspectRatio?: number;
}

/**
 * Resolved options with all defaults applied.
 * Used internally after merging consumer-provided options with defaults.
 */
export type ResolvedChartOptions = Required<ChartOptions>;

/**
 * Computed scale information for a single axis.
 * Produced by chart-scale.utils.ts and consumed by rendering logic.
 */
export interface ChartScale {
  /** Minimum value of the data domain (after applying yMin override). */
  readonly min: number;

  /** Maximum value of the data domain (after applying yMax override). */
  readonly max: number;

  /** Range (max - min). */
  readonly range: number;

  /** Evenly spaced tick values within [min, max]. */
  readonly ticks: readonly number[];
}

/**
 * Computed geometry for a single bar in a bar chart.
 */
export interface ChartBarRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly datasetIndex: number;
  readonly pointIndex: number;
  readonly value: number;
}

/**
 * Computed geometry for a single slice in a pie or donut chart.
 */
export interface ChartPieSlice {
  /** SVG path `d` attribute string for this slice. */
  readonly path: string;
  readonly datasetIndex: number;
  readonly label: string;
  readonly value: number;
  readonly percentage: number;
  readonly color: string;
}

/**
 * State held by the active tooltip overlay.
 */
export interface ChartTooltipState {
  readonly visible: boolean;
  readonly x: number;
  readonly y: number;
  readonly label: string;
  readonly items: readonly ChartTooltipItem[];
}

/**
 * A single row within the tooltip body.
 */
export interface ChartTooltipItem {
  readonly datasetLabel: string;
  readonly value: number | string;
  readonly color: string;
}
