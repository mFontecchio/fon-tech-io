/**
 * Chart SVG Path Utilities
 *
 * Pure functions that generate SVG path `d` attribute strings and
 * geometry objects for all SVG-rendered chart types.
 * All functions are stateless and side-effect free.
 */

import type { ChartDataset, ChartPieSlice, ChartBarRect, ChartScale } from './chart.types';
import { valueToPixel } from './chart-scale.utils';

// ---------------------------------------------------------------------------
// Padding constants used across SVG chart types
// ---------------------------------------------------------------------------

export const SVG_PADDING = {
  top: 16,
  right: 16,
  bottom: 48,  // space for X-axis labels
  left: 56,    // space for Y-axis labels
} as const;

// ---------------------------------------------------------------------------
// Line / Area charts
// ---------------------------------------------------------------------------

/**
 * Generates an SVG path `d` string for a line or area dataset.
 *
 * @param data - Numeric data values for this series.
 * @param labels - X-axis label array (used for point spacing).
 * @param scale - Y-axis scale.
 * @param width - Usable chart width (after padding).
 * @param height - Usable chart height (after padding).
 * @param smooth - When true, uses cubic bezier control points.
 * @returns SVG path `d` attribute string for a polyline (line chart).
 *
 * @example
 * ```typescript
 * const d = buildLinePath([10, 40, 30], labels, scale, 400, 200, true);
 * ```
 */
export function buildLinePath(
  data: readonly number[],
  scale: ChartScale,
  width: number,
  height: number,
  smooth: boolean
): string {
  if (data.length === 0) return '';

  const points = data.map((value, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * width,
    y: valueToPixel(value, scale, height, true),
  }));

  if (!smooth || points.length < 2) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  }

  return buildCatmullRomPath(points);
}

/**
 * Generates an SVG path `d` string for an area chart (filled region).
 * Extends the line path by closing down to the baseline (Y=0 or chart bottom).
 *
 * @param data - Numeric data values for this series.
 * @param scale - Y-axis scale.
 * @param width - Usable chart width.
 * @param height - Usable chart height.
 * @param smooth - When true, uses cubic bezier control points.
 * @returns SVG path `d` attribute string for a closed area polygon.
 */
export function buildAreaPath(
  data: readonly number[],
  scale: ChartScale,
  width: number,
  height: number,
  smooth: boolean
): string {
  if (data.length === 0) return '';

  const linePath = buildLinePath(data, scale, width, height, smooth);
  const baseline = valueToPixel(Math.max(scale.min, 0), scale, height, true);
  const lastX = ((data.length - 1) / Math.max(data.length - 1, 1)) * width;
  const firstX = 0;

  return `${linePath} L ${lastX.toFixed(2)},${baseline.toFixed(2)} L ${firstX.toFixed(2)},${baseline.toFixed(2)} Z`;
}

/**
 * Generates Catmull-Rom spline control points converted to cubic bezier format.
 * Produces smooth curves that pass through all data points.
 *
 * @param points - Array of {x, y} pixel coordinate objects.
 * @returns SVG path `d` string using cubic bezier commands.
 */
function buildCatmullRomPath(points: ReadonlyArray<{ x: number; y: number }>): string {
  const tension = 0.4;
  const first = points[0];
  if (!first) return '';
  let d = `M ${first.x.toFixed(2)},${first.y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)] ?? points[0];
    const p1 = points[i] ?? points[0];
    const p2 = points[i + 1] ?? points[points.length - 1];
    const p3 = points[Math.min(i + 2, points.length - 1)] ?? points[points.length - 1];

    if (!p0 || !p1 || !p2 || !p3) continue;

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }

  return d;
}

// ---------------------------------------------------------------------------
// Bar chart
// ---------------------------------------------------------------------------

/**
 * Computes bar rect geometry for all datasets in a bar chart.
 * Datasets are grouped by label index and rendered side-by-side.
 *
 * @param datasets - Array of chart datasets (number[] data only).
 * @param scale - Y-axis scale.
 * @param width - Usable chart width.
 * @param height - Usable chart height.
 * @returns Array of ChartBarRect objects, one per data point per dataset.
 */
export function buildBarRects(
  datasets: readonly ChartDataset[],
  scale: ChartScale,
  width: number,
  height: number
): ChartBarRect[] {
  const labelCount = Math.max(...datasets.map(ds => ds.data.length), 0);
  if (labelCount === 0) return [];

  const groupCount = datasets.length;
  const groupWidth = width / labelCount;
  const barPadding = groupWidth * 0.15;
  const barWidth = (groupWidth - barPadding * 2) / groupCount;
  const baseline = valueToPixel(Math.max(scale.min, 0), scale, height, true);
  const rects: ChartBarRect[] = [];

  for (let dsIdx = 0; dsIdx < datasets.length; dsIdx++) {
    const ds = datasets[dsIdx];
    if (!ds) continue;
    const data = ds.data as readonly number[];

    for (let ptIdx = 0; ptIdx < data.length; ptIdx++) {
      const value = data[ptIdx] ?? 0;
      const groupX = (ptIdx / labelCount) * width + barPadding;
      const barX = groupX + dsIdx * barWidth;
      const barY = valueToPixel(value, scale, height, true);
      const barHeight = Math.abs(baseline - barY);

      rects.push({
        x: barX,
        y: Math.min(barY, baseline),
        width: barWidth,
        height: barHeight,
        datasetIndex: dsIdx,
        pointIndex: ptIdx,
        value,
      });
    }
  }

  return rects;
}

// ---------------------------------------------------------------------------
// Pie / Donut charts
// ---------------------------------------------------------------------------

/**
 * Computes SVG arc path strings for pie or donut chart slices.
 * Treats the first dataset's data values as slice proportions.
 *
 * @param datasets - Chart datasets (only the first dataset is used for pie/donut).
 * @param labels - Label for each slice (parallel to dataset[0].data).
 * @param cx - Center X coordinate.
 * @param cy - Center Y coordinate.
 * @param radius - Outer radius in pixels.
 * @param innerRadius - Inner radius for donut (0 for solid pie).
 * @returns Array of ChartPieSlice objects with computed SVG paths.
 */
export function buildPieSlices(
  datasets: readonly ChartDataset[],
  labels: readonly string[],
  cx: number,
  cy: number,
  radius: number,
  innerRadius: number
): ChartPieSlice[] {
  const ds = datasets[0];
  if (!ds) return [];

  const sliceColors = labels.map((_label, idx) => {
    const DEFAULT_PALETTE = [
      'var(--semantic-brand-primary)',
      'var(--semantic-feedback-success)',
      'var(--semantic-feedback-warning)',
      'var(--semantic-feedback-error)',
      'var(--semantic-brand-secondary)',
      'var(--semantic-feedback-info)',
    ];
    return DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length] as string;
  });

  const data = ds.data as readonly number[];
  const total = data.reduce((sum, v) => sum + Math.abs(v), 0);
  if (total === 0) return [];

  const slices: ChartPieSlice[] = [];
  let startAngle = -Math.PI / 2; // start at 12 o'clock

  for (let i = 0; i < data.length; i++) {
    const value = Math.abs(data[i] ?? 0);
    const percentage = (value / total) * 100;
    const sweepAngle = (value / total) * 2 * Math.PI;
    const endAngle = startAngle + sweepAngle;

    slices.push({
      path: buildArcPath(cx, cy, radius, innerRadius, startAngle, endAngle),
      datasetIndex: 0,
      label: labels[i] ?? `Item ${i + 1}`,
      value,
      percentage,
      color: sliceColors[i] ?? 'var(--semantic-brand-primary)',
    });

    startAngle = endAngle;
  }

  return slices;
}

/**
 * Builds an SVG arc path for a single pie/donut slice.
 *
 * @param cx - Center X.
 * @param cy - Center Y.
 * @param outerR - Outer radius.
 * @param innerR - Inner radius (0 for solid pie).
 * @param startAngle - Start angle in radians.
 * @param endAngle - End angle in radians.
 * @returns SVG path `d` attribute string.
 */
function buildArcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  const outerX1 = cx + outerR * Math.cos(startAngle);
  const outerY1 = cy + outerR * Math.sin(startAngle);
  const outerX2 = cx + outerR * Math.cos(endAngle);
  const outerY2 = cy + outerR * Math.sin(endAngle);

  if (innerR <= 0) {
    return [
      `M ${outerX1.toFixed(2)},${outerY1.toFixed(2)}`,
      `A ${outerR},${outerR} 0 ${largeArc},1 ${outerX2.toFixed(2)},${outerY2.toFixed(2)}`,
      `L ${cx},${cy}`,
      'Z',
    ].join(' ');
  }

  const innerX1 = cx + innerR * Math.cos(endAngle);
  const innerY1 = cy + innerR * Math.sin(endAngle);
  const innerX2 = cx + innerR * Math.cos(startAngle);
  const innerY2 = cy + innerR * Math.sin(startAngle);

  return [
    `M ${outerX1.toFixed(2)},${outerY1.toFixed(2)}`,
    `A ${outerR},${outerR} 0 ${largeArc},1 ${outerX2.toFixed(2)},${outerY2.toFixed(2)}`,
    `L ${innerX1.toFixed(2)},${innerY1.toFixed(2)}`,
    `A ${innerR},${innerR} 0 ${largeArc},0 ${innerX2.toFixed(2)},${innerY2.toFixed(2)}`,
    'Z',
  ].join(' ');
}
