/**
 * Theme Builder Utilities
 * Helper functions for theme manipulation and validation
 */

import { parseHex, rgbToHex, hslToRgb, lightenColor, darkenColor, getContrastRatio } from '@ui-suite/shared';

// Re-export shared color utilities to eliminate duplication
export { getContrastRatio, lightenColor, darkenColor } from '@ui-suite/shared';

/**
 * Check if contrast ratio meets WCAG standards
 */
export function meetsWCAG(
  ratio: number,
  level: 'AA' | 'AAA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  }
  return size === 'large' ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Get WCAG compliance level for a contrast ratio
 */
export function getWCAGLevel(
  ratio: number,
  size: 'normal' | 'large' = 'normal'
): 'AAA' | 'AA' | 'Fail' {
  if (meetsWCAG(ratio, 'AAA', size)) return 'AAA';
  if (meetsWCAG(ratio, 'AA', size)) return 'AA';
  return 'Fail';
}

/**
 * Generate a complementary color
 */
export function getComplementaryColor(hex: string): string {
  const rgb = parseHex(hex);
  return rgbToHex({ r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b });
}

/**
 * Generate analogous colors (colors next to each other on the color wheel)
 */
export function getAnalogousColors(hex: string): string[] {
  const rgb = parseHex(hex);

  // Convert to normalized HSL (0-1 range)
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Generate analogous colors (±30 degrees on color wheel)
  const analogous1 = hslNormToHex((h + 30 / 360) % 1, s, l);
  const analogous2 = hslNormToHex((h - 30 / 360 + 1) % 1, s, l);

  return [analogous2, hex, analogous1];
}

/**
 * Convert normalized HSL values (0-1 range each) to a hex color string
 */
function hslNormToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb({ h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) });
  return rgbToHex(rgb);
}

/**
 * Save theme to localStorage
 */
export function saveTheme(name: string, tokens: Record<string, string>): void {
  const savedThemes = getSavedThemes();
  savedThemes[name] = {
    name,
    tokens,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem('custom-themes', JSON.stringify(savedThemes));
}

/**
 * Get all saved themes from localStorage
 */
export function getSavedThemes(): Record<
  string,
  { name: string; tokens: Record<string, string>; createdAt: string }
> {
  const saved = localStorage.getItem('custom-themes');
  return saved ? JSON.parse(saved) : {};
}

/**
 * Delete a saved theme
 */
export function deleteTheme(name: string): void {
  const savedThemes = getSavedThemes();
  delete savedThemes[name];
  localStorage.setItem('custom-themes', JSON.stringify(savedThemes));
}

/**
 * Parse CSS custom properties from a CSS string
 */
export function parseCSSVariables(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const regex = /--([\w-]+):\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(css)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim();
  }

  return tokens;
}

/**
 * Validate if a string is a valid hex color
 */
export function isValidHexColor(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

/**
 * Generate shades of a color (lighter to darker)
 */
export function generateShades(hex: string, count: number = 5): string[] {
  const shades: string[] = [];
  const step = 100 / (count + 1);

  for (let i = 1; i <= count; i++) {
    if (i < Math.ceil(count / 2)) {
      shades.push(lightenColor(hex, step * (Math.ceil(count / 2) - i)));
    } else if (i === Math.ceil(count / 2)) {
      shades.push(hex);
    } else {
      shades.push(darkenColor(hex, step * (i - Math.ceil(count / 2))));
    }
  }

  return shades;
}
