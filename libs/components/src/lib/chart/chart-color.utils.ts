/**
 * Chart Color Utilities
 *
 * Resolves dataset color aliases to CSS custom property references
 * and provides the default cycling palette.
 */

import type { ChartColorAlias, ChartDataset } from './chart.types';

/**
 * Maps named color aliases to semantic design tokens.
 * Consuming components reference these via SVG presentation attributes.
 */
const COLOR_ALIAS_MAP: Record<ChartColorAlias, string> = {
  primary: 'var(--semantic-brand-primary)',
  success: 'var(--semantic-status-success)',
  warning: 'var(--semantic-status-warning)',
  danger: 'var(--semantic-status-error)',
  secondary: 'var(--semantic-brand-secondary)',
  muted: 'var(--semantic-text-secondary)',
};

/**
 * Default palette cycled when a dataset does not specify a color.
 * Uses semantic tokens so palette responds to theme changes automatically.
 */
export const DEFAULT_PALETTE: readonly string[] = [
  'var(--semantic-brand-primary)',
  'var(--semantic-status-success)',
  'var(--semantic-status-warning)',
  'var(--semantic-status-error)',
  'var(--semantic-brand-secondary)',
  'var(--semantic-text-secondary)',
];

/**
 * SVG stroke-dasharray patterns applied per dataset index.
 * Ensures color is never the sole visual differentiator (WCAG 1.4.1).
 * Used for line and area chart series.
 */
export const DATASET_DASH_PATTERNS: readonly string[] = [
  'none',       // solid
  '6 3',        // dashed
  '2 3',        // dotted
  '8 3 2 3',    // dash-dot
  '12 3',       // long dash
  '2 3 2 3',    // double-dot
];

/**
 * Resolves a color alias or arbitrary CSS color string to its final value.
 *
 * @param color - Named alias ('primary', 'success', etc.) or any CSS color.
 * @returns Resolved CSS color string.
 *
 * @example
 * ```typescript
 * resolveColor('primary')  // 'var(--semantic-brand-primary)'
 * resolveColor('#ff5733')  // '#ff5733'
 * ```
 */
export function resolveColor(color: string): string {
  return (COLOR_ALIAS_MAP as Record<string, string>)[color] ?? color;
}

/**
 * Resolves colors for all datasets, cycling through the default palette
 * when a dataset does not specify a color.
 *
 * @param datasets - Array of chart datasets.
 * @returns Array of resolved CSS color strings, one per dataset.
 */
export function resolveDatasetColors(datasets: readonly ChartDataset[]): string[] {
  return datasets.map((ds, i) =>
    ds.color ? resolveColor(ds.color) : (DEFAULT_PALETTE[i % DEFAULT_PALETTE.length] as string)
  );
}

/**
 * Returns the stroke-dasharray pattern for a given dataset index.
 *
 * @param index - Zero-based dataset index.
 * @returns SVG stroke-dasharray value string.
 */
export function getDashPattern(index: number): string {
  return DATASET_DASH_PATTERNS[index % DATASET_DASH_PATTERNS.length] as string;
}

/**
 * Converts a CSS color string to an rgba string with the given opacity.
 * Only works for hex colors — CSS variable references are returned unchanged
 * since their actual values are resolved by the browser at paint time.
 *
 * @param color - Resolved CSS color string.
 * @param opacity - Opacity value (0–1).
 * @returns CSS color with opacity applied, or original if not a hex color.
 */
export function withOpacity(color: string, opacity: number): string {
  if (color.startsWith('var(')) {
    // CSS variable references are returned as-is; opacity is applied via
    // SVG fill-opacity attribute on the consuming element.
    return color;
  }

  const hex = color.replace('#', '');
  const fullHex = hex.length === 3
    ? hex.split('').map(c => c + c).join('')
    : hex;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return color;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
