/**
 * Typography Utilities
 * 
 * Utilities for responsive typography with fluid scaling
 */

/**
 * Breakpoint definitions (in pixels)
 */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Type scale configuration
 */
export interface TypeScaleConfig {
  min: number; // Minimum font size (px)
  max: number; // Maximum font size (px)
  minVw?: number; // Minimum viewport width (px) - defaults to mobile breakpoint
  maxVw?: number; // Maximum viewport width (px) - defaults to wide breakpoint
}

/**
 * Responsive font size configuration
 */
export interface ResponsiveFontConfig {
  mobile: string;
  tablet?: string;
  desktop?: string;
  wide?: string;
}

/**
 * Generate fluid font size using clamp()
 * 
 * Creates a responsive font size that scales smoothly between min and max sizes
 * based on viewport width.
 * 
 * Formula: clamp(MIN, PREFERRED, MAX)
 * where PREFERRED = MIN + (MAX - MIN) * ((100vw - MIN_VW) / (MAX_VW - MIN_VW))
 * 
 * @example
 * fluidFontSize({ min: 16, max: 24 })
 * // Returns: "clamp(1rem, 0.8889rem + 0.5556vw, 1.5rem)"
 */
export function fluidFontSize(config: TypeScaleConfig): string {
  const { min, max, minVw = BREAKPOINTS.mobile, maxVw = BREAKPOINTS.wide } = config;

  // Convert px to rem (assuming 16px = 1rem)
  const minRem = min / 16;
  const maxRem = max / 16;

  // Calculate slope: (max - min) / (maxVw - minVw)
  const slope = (max - min) / (maxVw - minVw);

  // Calculate intercept: min - slope * minVw
  const intercept = min - slope * minVw;

  // Convert to rem
  const interceptRem = intercept / 16;
  const slopeVw = slope * 100; // Convert to vw units

  // Generate clamp value
  const preferred = `${interceptRem.toFixed(4)}rem + ${slopeVw.toFixed(4)}vw`;

  return `clamp(${minRem}rem, ${preferred}, ${maxRem}rem)`;
}

/**
 * Generate line height based on font size
 * 
 * Larger text needs tighter line height, smaller text needs more space
 */
export function calculateLineHeight(fontSize: number): number {
  if (fontSize <= 14) {
    return 1.6;
  } else if (fontSize <= 18) {
    return 1.5;
  } else if (fontSize <= 24) {
    return 1.4;
  } else if (fontSize <= 36) {
    return 1.3;
  } else {
    return 1.2;
  }
}

/**
 * Generate letter spacing based on font size
 * 
 * Larger text can be tighter, smaller text needs more tracking
 */
export function calculateLetterSpacing(fontSize: number): string {
  if (fontSize <= 12) {
    return '0.05em';
  } else if (fontSize <= 16) {
    return '0.025em';
  } else if (fontSize <= 24) {
    return '0';
  } else if (fontSize <= 48) {
    return '-0.025em';
  } else {
    return '-0.05em';
  }
}

/**
 * Predefined type scales
 */
export const TYPE_SCALES = {
  // Display text (hero sections)
  display1: { min: 48, max: 96 },
  display2: { min: 40, max: 72 },
  display3: { min: 32, max: 60 },

  // Headings
  h1: { min: 32, max: 48 },
  h2: { min: 28, max: 40 },
  h3: { min: 24, max: 32 },
  h4: { min: 20, max: 24 },
  h5: { min: 18, max: 20 },
  h6: { min: 16, max: 18 },

  // Body text
  body: { min: 16, max: 18 },
  bodySmall: { min: 14, max: 16 },
  caption: { min: 12, max: 14 },

  // Labels and UI
  label: { min: 14, max: 16 },
  labelSmall: { min: 12, max: 14 },
} as const;

/**
 * Generate CSS custom properties for responsive typography
 */
export function generateTypographyCss(): string {
  const css: string[] = [':root {'];

  Object.entries(TYPE_SCALES).forEach(([name, scale]) => {
    const fontSize = fluidFontSize(scale);
    const lineHeight = calculateLineHeight(scale.min);
    const letterSpacing = calculateLetterSpacing(scale.min);

    css.push(`  --font-size-${kebabCase(name)}: ${fontSize};`);
    css.push(`  --line-height-${kebabCase(name)}: ${lineHeight};`);
    css.push(`  --letter-spacing-${kebabCase(name)}: ${letterSpacing};`);
  });

  css.push('}');

  return css.join('\n');
}

/**
 * Generate media query for breakpoint
 */
export function mediaQuery(breakpoint: Breakpoint, minOrMax: 'min' | 'max' = 'min'): string {
  const value = BREAKPOINTS[breakpoint];
  return `@media (${minOrMax}-width: ${value}px)`;
}

/**
 * Generate responsive font size CSS with breakpoints
 */
export function responsiveFontSize(config: ResponsiveFontConfig): string {
  const css: string[] = [];

  // Base (mobile)
  css.push(`font-size: ${config.mobile};`);

  // Tablet
  if (config.tablet) {
    css.push(`${mediaQuery('tablet')} {`);
    css.push(`  font-size: ${config.tablet};`);
    css.push(`}`);
  }

  // Desktop
  if (config.desktop) {
    css.push(`${mediaQuery('desktop')} {`);
    css.push(`  font-size: ${config.desktop};`);
    css.push(`}`);
  }

  // Wide
  if (config.wide) {
    css.push(`${mediaQuery('wide')} {`);
    css.push(`  font-size: ${config.wide};`);
    css.push(`}`);
  }

  return css.join('\n');
}

/**
 * Check if line length is readable (45-75 characters)
 * 
 * @param characterCount Number of characters per line
 * @returns Whether the line length is within readable range
 */
export function isReadableLineLength(characterCount: number): boolean {
  return characterCount >= 45 && characterCount <= 75;
}

/**
 * Calculate optimal container width for readable line length
 * 
 * @param fontSize Font size in pixels
 * @param characterCount Desired character count per line
 * @returns Container width in pixels
 */
export function calculateContainerWidth(
  fontSize: number,
  characterCount: number = 65
): number {
  // Average character width is approximately 0.5em for most fonts
  const characterWidth = fontSize * 0.5;
  return characterWidth * characterCount;
}

/**
 * Convert camelCase to kebab-case
 */
function kebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Typography presets for common use cases
 */
export const TYPOGRAPHY_PRESETS = {
  hero: {
    fontSize: TYPE_SCALES.display1,
    fontWeight: 'bold',
    lineHeight: calculateLineHeight(TYPE_SCALES.display1.max),
    letterSpacing: calculateLetterSpacing(TYPE_SCALES.display1.max),
  },
  heading: {
    fontSize: TYPE_SCALES.h1,
    fontWeight: 'bold',
    lineHeight: calculateLineHeight(TYPE_SCALES.h1.max),
    letterSpacing: calculateLetterSpacing(TYPE_SCALES.h1.max),
  },
  body: {
    fontSize: TYPE_SCALES.body,
    fontWeight: 'normal',
    lineHeight: calculateLineHeight(TYPE_SCALES.body.max),
    letterSpacing: calculateLetterSpacing(TYPE_SCALES.body.max),
  },
  caption: {
    fontSize: TYPE_SCALES.caption,
    fontWeight: 'normal',
    lineHeight: calculateLineHeight(TYPE_SCALES.caption.max),
    letterSpacing: calculateLetterSpacing(TYPE_SCALES.caption.max),
  },
} as const;

