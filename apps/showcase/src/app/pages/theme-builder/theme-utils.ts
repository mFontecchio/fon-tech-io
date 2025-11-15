/**
 * Theme Builder Utilities
 * Helper functions for theme manipulation and validation
 */

/**
 * Calculate relative luminance of a color (WCAG formula)
 */
export function getLuminance(hex: string): number {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  // Apply gamma correction
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

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
 * Convert hex to RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Generate a complementary color
 */
export function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
}

/**
 * Generate analogous colors (colors next to each other on the color wheel)
 */
export function getAnalogousColors(hex: string): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex];
  
  // Convert to HSL
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
  const analogous1 = hslToHex((h + 30 / 360) % 1, s, l);
  const analogous2 = hslToHex((h - 30 / 360 + 1) % 1, s, l);
  
  return [analogous2, hex, analogous1];
}

/**
 * Convert HSL to hex
 */
function hslToHex(h: number, s: number, l: number): string {
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
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
  
  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
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
 * Parse CSS custom properties from string
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
 * Lighten a color by a percentage
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * (percent / 100)));
  const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * (percent / 100)));
  const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * (percent / 100)));
  
  return rgbToHex(r, g, b);
}

/**
 * Darken a color by a percentage
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.max(0, Math.round(rgb.r * (1 - percent / 100)));
  const g = Math.max(0, Math.round(rgb.g * (1 - percent / 100)));
  const b = Math.max(0, Math.round(rgb.b * (1 - percent / 100)));
  
  return rgbToHex(r, g, b);
}

/**
 * Generate shades of a color (lighter to darker)
 */
export function generateShades(hex: string, count: number = 5): string[] {
  const shades: string[] = [];
  const step = 100 / (count + 1);
  
  for (let i = 1; i <= count; i++) {
    if (i < Math.ceil(count / 2)) {
      // Lighter shades
      shades.push(lightenColor(hex, step * (Math.ceil(count / 2) - i)));
    } else if (i === Math.ceil(count / 2)) {
      // Base color
      shades.push(hex);
    } else {
      // Darker shades
      shades.push(darkenColor(hex, step * (i - Math.ceil(count / 2))));
    }
  }
  
  return shades;
}

