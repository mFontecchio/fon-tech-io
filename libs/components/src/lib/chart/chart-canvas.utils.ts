/**
 * Chart Canvas Utilities
 *
 * Pure functions for drawing scatter plots on an HTML5 Canvas 2D context.
 * Accepts the rendering context and data — never references DOM directly.
 * All functions are stateless and side-effect free (aside from drawing).
 */

import type { ChartDataset, ChartPoint, ChartScale } from './chart.types';
import { resolveDatasetColors } from './chart-color.utils';
import { valueToPixel } from './chart-scale.utils';

/** Point radius for scatter plot dots (in logical pixels). */
const SCATTER_POINT_RADIUS = 4;

/** Padding inside the canvas drawing area. */
const CANVAS_PADDING = {
  top: 16,
  right: 16,
  bottom: 48,
  left: 56,
} as const;

/**
 * Clears and redraws the full scatter plot onto the given canvas context.
 *
 * @param ctx - Canvas 2D rendering context.
 * @param datasets - Chart datasets (must contain ChartPoint[] data).
 * @param xScale - Computed X-axis scale.
 * @param yScale - Computed Y-axis scale.
 * @param canvasWidth - Physical canvas width in CSS pixels.
 * @param canvasHeight - Physical canvas height in CSS pixels.
 * @param dpr - Device pixel ratio for HiDPI support.
 *
 * @example
 * ```typescript
 * const ctx = canvasEl.getContext('2d')!;
 * drawScatter(ctx, datasets, xScale, yScale, 800, 450, window.devicePixelRatio);
 * ```
 */
export function drawScatter(
  ctx: CanvasRenderingContext2D,
  datasets: readonly ChartDataset[],
  xScale: ChartScale,
  yScale: ChartScale,
  canvasWidth: number,
  canvasHeight: number,
  dpr: number
): void {
  const physicalWidth = canvasWidth * dpr;
  const physicalHeight = canvasHeight * dpr;

  // Size canvas at physical pixels for HiDPI sharpness
  ctx.canvas.width = physicalWidth;
  ctx.canvas.height = physicalHeight;
  ctx.canvas.style.width = `${canvasWidth}px`;
  ctx.canvas.style.height = `${canvasHeight}px`;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const drawWidth = canvasWidth - CANVAS_PADDING.left - CANVAS_PADDING.right;
  const drawHeight = canvasHeight - CANVAS_PADDING.top - CANVAS_PADDING.bottom;

  // Resolve theme-aware colors before any draw calls (Canvas 2D cannot read CSS vars directly)
  const textColor = resolveCanvasColor(ctx.canvas, 'var(--semantic-text-secondary)');
  const gridColor = resolveCanvasColor(ctx.canvas, 'var(--semantic-border-default)');

  drawAxes(ctx, xScale, yScale, drawWidth, drawHeight, textColor);
  drawGridLines(ctx, yScale, drawWidth, drawHeight, gridColor);
  drawScatterPoints(ctx, datasets, xScale, yScale, drawWidth, drawHeight);
}

/**
 * Draws X and Y axis lines.
 */
function drawAxes(
  ctx: CanvasRenderingContext2D,
  xScale: ChartScale,
  yScale: ChartScale,
  drawWidth: number,
  drawHeight: number,
  textColor: string
): void {
  ctx.save();
  ctx.translate(CANVAS_PADDING.left, CANVAS_PADDING.top);

  // Y-axis ticks and labels
  ctx.fillStyle = textColor;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (const tick of yScale.ticks) {
    const y = valueToPixel(tick, yScale, drawHeight, true);
    ctx.fillText(formatTick(tick), -8, y);
  }

  // X-axis ticks and labels
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  for (const tick of xScale.ticks) {
    const x = valueToPixel(tick, xScale, drawWidth, false);
    ctx.fillText(formatTick(tick), x, drawHeight + 8);
  }

  ctx.restore();
}

/**
 * Draws horizontal grid lines at Y-axis tick positions.
 */
function drawGridLines(
  ctx: CanvasRenderingContext2D,
  yScale: ChartScale,
  drawWidth: number,
  drawHeight: number,
  gridColor: string
): void {
  ctx.save();
  ctx.translate(CANVAS_PADDING.left, CANVAS_PADDING.top);
  ctx.strokeStyle = gridColor;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;

  for (const tick of yScale.ticks) {
    const y = valueToPixel(tick, yScale, drawHeight, true);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(drawWidth, y);
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Draws scatter plot data points for all datasets.
 * Uses resolved design-token colors — the browser resolves `var()` references
 * at paint time when set on a DOM element; for Canvas we resolve via
 * getComputedStyle on the canvas element for live theme responsiveness.
 */
function drawScatterPoints(
  ctx: CanvasRenderingContext2D,
  datasets: readonly ChartDataset[],
  xScale: ChartScale,
  yScale: ChartScale,
  drawWidth: number,
  drawHeight: number
): void {
  const colors = resolveDatasetColors(datasets);
  const computedColors = colors.map(color => resolveCanvasColor(ctx.canvas, color));

  ctx.save();
  ctx.translate(CANVAS_PADDING.left, CANVAS_PADDING.top);

  for (let dsIdx = 0; dsIdx < datasets.length; dsIdx++) {
    const ds = datasets[dsIdx];
    if (!ds) continue;
    const color = computedColors[dsIdx] ?? '#6366f1';
    const points = ds.data as readonly ChartPoint[];

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    for (const point of points) {
      const px = valueToPixel(point.x, xScale, drawWidth, false);
      const py = valueToPixel(point.y, yScale, drawHeight, true);

      ctx.beginPath();
      ctx.arc(px, py, SCATTER_POINT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

/**
 * Resolves a CSS color string (including `var()` references) to a concrete
 * color value by reading computed styles from the canvas element.
 *
 * @param canvas - The canvas element used as the style resolution scope.
 * @param color - CSS color string potentially containing `var()` references.
 * @returns Concrete color string usable in Canvas 2D API calls.
 */
export function resolveCanvasColor(canvas: HTMLCanvasElement, color: string): string {
  if (!color.startsWith('var(')) return color;

  // Create a temporary element to resolve the CSS variable
  const el = document.createElement('span');
  el.style.setProperty('color', color);
  canvas.parentElement?.appendChild(el);
  const resolved = getComputedStyle(el).color;
  canvas.parentElement?.removeChild(el);

  return resolved || color;
}

/**
 * Formats a numeric tick value for axis labels.
 *
 * @param value - Numeric value to format.
 * @returns Short human-readable string.
 */
function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toPrecision(3)}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toPrecision(3)}k`;
  if (Number.isInteger(value)) return String(value);
  return value.toPrecision(3).replace(/\.?0+$/, '');
}
