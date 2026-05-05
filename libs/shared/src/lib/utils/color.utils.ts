/**
 * Color Utilities
 *
 * Utilities for color manipulation, contrast calculation, and accessibility
 */

/**
 * Color format types
 */
export type ColorFormat = 'hex' | 'rgb' | 'hsl';

/**
 * RGB color object
 */
export interface RgbColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a?: number; // 0-1
}

/**
 * HSL color object
 */
export interface HslColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a?: number; // 0-1
}

/**
 * Parse HEX color to RGB
 *
 * @param hex - HEX color string (#RRGGBB or #RGB)
 * @returns RGB color object
 *
 * @example
 * ```typescript
 * parseHex('#3b82f6') // { r: 59, g: 130, b: 246 }
 * parseHex('#fff') // { r: 255, g: 255, b: 255 }
 * ```
 */
export function parseHex(hex: string): RgbColor {
  const cleanHex = hex.replace('#', '');

  // Handle shorthand hex (#RGB)
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }

  // Handle full hex (#RRGGBB)
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Convert RGB to HEX
 *
 * @param rgb - RGB color object
 * @returns HEX color string
 */
export function rgbToHex(rgb: RgbColor): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16).padStart(2, '0');
    return hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Convert RGB to HSL
 *
 * @param rgb - RGB color object
 * @returns HSL color object
 */
export function rgbToHsl(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 *
 * @param hsl - HSL color object
 * @returns RGB color object
 */
export function hslToRgb(hsl: HslColor): RgbColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Calculate relative luminance of a color
 * Used for WCAG contrast calculations
 *
 * @param rgb - RGB color object
 * @returns Relative luminance (0-1)
 */
export function getLuminance(rgb: RgbColor): number {
  const rsrgb = rgb.r / 255;
  const gsrgb = rgb.g / 255;
  const bsrgb = rgb.b / 255;

  const r = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
  const g = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
  const b = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 *
 * @param color1 - First color (HEX or RGB)
 * @param color2 - Second color (HEX or RGB)
 * @returns Contrast ratio (1-21)
 *
 * @example
 * ```typescript
 * getContrastRatio('#3b82f6', '#ffffff') // 3.7:1
 * getContrastRatio('#000000', '#ffffff') // 21:1
 * ```
 */
export function getContrastRatio(color1: string | RgbColor, color2: string | RgbColor): number {
  const rgb1 = typeof color1 === 'string' ? parseHex(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? parseHex(color2) : color2;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color contrast meets WCAG standards
 *
 * @param foreground - Foreground color
 * @param background - Background color
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns Object with contrast ratio and pass/fail status
 */
export function checkContrast(
  foreground: string | RgbColor,
  background: string | RgbColor,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): { ratio: number; pass: boolean; level: string } {
  const ratio = getContrastRatio(foreground, background);

  // WCAG requirements
  const requirements = {
    'AA-normal': 4.5,
    'AA-large': 3.0,
    'AAA-normal': 7.0,
    'AAA-large': 4.5,
  };

  const required = requirements[`${level}-${size}`];

  return {
    ratio: Math.round(ratio * 100) / 100,
    pass: ratio >= required,
    level: `${level} ${size}`,
  };
}

/**
 * Get best contrast text color (black or white) for a background
 *
 * @param backgroundColor - Background color (HEX or RGB)
 * @param blackColor - Black color to use (default: #000000)
 * @param whiteColor - White color to use (default: #ffffff)
 * @returns HEX color string (black or white with best contrast)
 *
 * @example
 * ```typescript
 * getContrastTextColor('#3b82f6') // '#ffffff' (white text on blue)
 * getContrastTextColor('#fef3c7') // '#000000' (black text on light yellow)
 * ```
 */
export function getContrastTextColor(
  backgroundColor: string | RgbColor,
  blackColor = '#000000',
  whiteColor = '#ffffff'
): string {
  const contrastWithBlack = getContrastRatio(backgroundColor, blackColor);
  const contrastWithWhite = getContrastRatio(backgroundColor, whiteColor);

  return contrastWithBlack > contrastWithWhite ? blackColor : whiteColor;
}

/**
 * Darken a color by reducing lightness
 *
 * @param color - Color to darken (HEX)
 * @param amount - Amount to darken (0-100)
 * @returns Darkened color (HEX)
 *
 * @example
 * ```typescript
 * darkenColor('#3b82f6', 10) // Darker blue
 * ```
 */
export function darkenColor(color: string, amount: number): string {
  const rgb = parseHex(color);
  const hsl = rgbToHsl(rgb);

  hsl.l = Math.max(0, hsl.l - amount);

  const newRgb = hslToRgb(hsl);
  return rgbToHex(newRgb);
}

/**
 * Lighten a color by increasing lightness
 *
 * @param color - Color to lighten (HEX)
 * @param amount - Amount to lighten (0-100)
 * @returns Lightened color (HEX)
 *
 * @example
 * ```typescript
 * lightenColor('#3b82f6', 10) // Lighter blue
 * ```
 */
export function lightenColor(color: string, amount: number): string {
  const rgb = parseHex(color);
  const hsl = rgbToHsl(rgb);

  hsl.l = Math.min(100, hsl.l + amount);

  const newRgb = hslToRgb(hsl);
  return rgbToHex(newRgb);
}

/**
 * Generate hover color automatically based on theme mode
 *
 * @param color - Base color (HEX)
 * @param mode - Theme mode ('light' or 'dark')
 * @param amount - Amount to adjust (default: 10)
 * @returns Hover color (HEX)
 *
 * @example
 * ```typescript
 * generateHoverColor('#3b82f6', 'light') // Darker for light mode
 * generateHoverColor('#3b82f6', 'dark') // Lighter for dark mode
 * ```
 */
export function generateHoverColor(
  color: string,
  mode: 'light' | 'dark' | 'high-contrast',
  amount = 10
): string {
  // For light mode, darken on hover
  // For dark mode, lighten on hover
  return mode === 'dark' ? lightenColor(color, amount) : darkenColor(color, amount);
}

/**
 * Generate active/pressed color (darker than hover)
 *
 * @param color - Base color (HEX)
 * @param mode - Theme mode ('light' or 'dark')
 * @param amount - Amount to adjust (default: 15)
 * @returns Active color (HEX)
 */
export function generateActiveColor(
  color: string,
  mode: 'light' | 'dark' | 'high-contrast',
  amount = 15
): string {
  return mode === 'dark' ? lightenColor(color, amount) : darkenColor(color, amount);
}

/**
 * Generate color palette from a base color
 * Creates shades from 50 (lightest) to 950 (darkest)
 *
 * @param baseColor - Base color (HEX) - should be around 500 shade
 * @returns Object with color shades (50-950)
 */
export function generateColorPalette(baseColor: string): Record<number, string> {
  const rgb = parseHex(baseColor);
  const hsl = rgbToHsl(rgb);

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const palette: Record<number, string> = {};

  shades.forEach((shade) => {
    // Calculate lightness based on shade
    let lightness: number;
    if (shade < 500) {
      // Lighter shades
      const factor = (500 - shade) / 450; // 0-1
      lightness = hsl.l + (95 - hsl.l) * factor;
    } else if (shade > 500) {
      // Darker shades
      const factor = (shade - 500) / 450; // 0-1
      lightness = hsl.l - (hsl.l - 5) * factor;
    } else {
      // Base color (500)
      lightness = hsl.l;
    }

    const newHsl: HslColor = { h: hsl.h, s: hsl.s, l: Math.round(lightness) };
    const newRgb = hslToRgb(newHsl);
    palette[shade] = rgbToHex(newRgb);
  });

  return palette;
}
