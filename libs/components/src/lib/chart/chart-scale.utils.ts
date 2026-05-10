/**
 * Chart Scale Utilities
 *
 * Pure functions for calculating axis scales and tick values.
 * All functions are stateless and side-effect free — safe to call
 * inside Angular `computed()` signals.
 */

import type { ChartDataset, ChartOptions, ChartPoint, ChartScale, ResolvedChartOptions } from './chart.types';

/** Default options applied when consumer omits a field. */
export const CHART_DEFAULTS: ResolvedChartOptions = {
  xAxisLabel: '',
  yAxisLabel: '',
  showGrid: true,
  showLegend: true,
  yMin: undefined as unknown as number,
  yMax: undefined as unknown as number,
  tickCount: 5,
  smooth: false,
  donutThickness: 0.6,
  aspectRatio: 16 / 9,
};

/**
 * Merges consumer-provided options with library defaults.
 *
 * @param options - Partial options from the consumer.
 * @returns Fully resolved options object.
 */
export function resolveOptions(options: ChartOptions): ResolvedChartOptions {
  return { ...CHART_DEFAULTS, ...options };
}

/**
 * Extracts all numeric values from an array of datasets.
 * Handles both `number[]` and `ChartPoint[]` data shapes.
 *
 * @param datasets - Array of chart datasets.
 * @param axis - For ChartPoint data, which axis to extract ('x' | 'y').
 * @returns Flat array of all numeric values across datasets.
 */
export function extractValues(datasets: readonly ChartDataset[], axis: 'x' | 'y' = 'y'): number[] {
  const values: number[] = [];
  for (const ds of datasets) {
    for (const point of ds.data) {
      if (typeof point === 'number') {
        values.push(point);
      } else {
        values.push(axis === 'x' ? (point as ChartPoint).x : (point as ChartPoint).y);
      }
    }
  }
  return values;
}

/**
 * Computes a "nice" rounded number that is >= the provided raw maximum.
 * Prevents chart data from being clipped at the top edge.
 *
 * @param rawMax - The actual maximum data value.
 * @param tickCount - Desired number of ticks.
 * @returns A rounded ceiling value suitable for axis display.
 */
export function niceMax(rawMax: number, tickCount: number): number {
  if (rawMax === 0) return 1;
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(rawMax))));
  const step = magnitude * Math.ceil(rawMax / (magnitude * (tickCount - 1)));
  return step * (tickCount - 1);
}

/**
 * Computes a "nice" rounded number that is <= the provided raw minimum.
 *
 * @param rawMin - The actual minimum data value.
 * @param tickCount - Desired number of ticks.
 * @returns A rounded floor value suitable for axis display.
 */
export function niceMin(rawMin: number, tickCount: number): number {
  if (rawMin >= 0) return 0;
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(rawMin))));
  const step = magnitude * Math.ceil(Math.abs(rawMin) / (magnitude * (tickCount - 1)));
  return -(step * (tickCount - 1));
}

/**
 * Computes the Y-axis scale from the given datasets and options.
 *
 * @param datasets - Array of chart datasets to scale.
 * @param options - Resolved chart options (yMin, yMax, tickCount).
 * @returns ChartScale with min, max, range, and tick values.
 *
 * @example
 * ```typescript
 * const scale = computeYScale(datasets, resolvedOptions);
 * // scale.ticks → [0, 100, 200, 300, 400]
 * ```
 */
export function computeYScale(
  datasets: readonly ChartDataset[],
  options: Pick<ResolvedChartOptions, 'yMin' | 'yMax' | 'tickCount'>
): ChartScale {
  const values = extractValues(datasets, 'y');
  if (values.length === 0) {
    return { min: 0, max: 1, range: 1, ticks: [0, 1] };
  }

  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const tickCount = Math.max(2, options.tickCount ?? CHART_DEFAULTS.tickCount);

  const min = options.yMin !== undefined && !Number.isNaN(options.yMin)
    ? options.yMin
    : niceMin(rawMin, tickCount);

  const max = options.yMax !== undefined && !Number.isNaN(options.yMax)
    ? options.yMax
    : niceMax(rawMax, tickCount);

  const safeMax = max === min ? min + 1 : max;
  const ticks = generateTicks(min, safeMax, tickCount);

  return { min, max: safeMax, range: safeMax - min, ticks };
}

/**
 * Computes the X-axis scale for scatter plots.
 *
 * @param datasets - Array of datasets with ChartPoint data.
 * @param options - Resolved chart options.
 * @returns ChartScale for the X axis.
 */
export function computeXScale(
  datasets: readonly ChartDataset[],
  options: Pick<ResolvedChartOptions, 'tickCount'>
): ChartScale {
  const values = extractValues(datasets, 'x');
  if (values.length === 0) {
    return { min: 0, max: 1, range: 1, ticks: [0, 1] };
  }

  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const tickCount = Math.max(2, options.tickCount ?? CHART_DEFAULTS.tickCount);

  const min = niceMin(rawMin, tickCount);
  const max = niceMax(rawMax, tickCount);
  const safeMax = max === min ? min + 1 : max;

  return { min, max: safeMax, range: safeMax - min, ticks: generateTicks(min, safeMax, tickCount) };
}

/**
 * Generates an array of evenly spaced tick values between min and max.
 *
 * @param min - Axis minimum.
 * @param max - Axis maximum.
 * @param count - Number of ticks (including endpoints).
 * @returns Array of tick values.
 */
export function generateTicks(min: number, max: number, count: number): number[] {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => parseFloat((min + step * i).toPrecision(6)));
}

/**
 * Maps a data value to a pixel coordinate along an axis.
 *
 * @param value - The data value to map.
 * @param scale - The axis scale.
 * @param pixelLength - Available pixel length (width or height).
 * @param invert - When true, inverts the mapping (for SVG Y axis where 0 is top).
 * @returns Pixel coordinate.
 *
 * @example
 * ```typescript
 * // SVG Y axis — value=0 should be at the bottom (invert=true)
 * const py = valueToPixel(0, scale, chartHeight, true);
 * ```
 */
export function valueToPixel(
  value: number,
  scale: ChartScale,
  pixelLength: number,
  invert = false
): number {
  const ratio = scale.range === 0 ? 0 : (value - scale.min) / scale.range;
  return invert ? pixelLength * (1 - ratio) : pixelLength * ratio;
}

/**
 * Formats a tick value for axis display.
 * Large numbers are abbreviated (e.g. 1500 → "1.5k").
 *
 * @param value - The numeric tick value.
 * @returns Formatted string.
 */
export function formatTickValue(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toPrecision(3)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toPrecision(3)}k`;
  if (Number.isInteger(value)) return String(value);
  return value.toPrecision(4).replace(/\.?0+$/, '');
}
