/**
 * Theme Builder Utilities
 * Helper functions for theme manipulation and validation
 */

import { parseHex, rgbToHex, hslToRgb, lightenColor, darkenColor, getContrastRatio } from '@ui-suite/shared';

// Re-export shared color utilities to eliminate duplication
export { getContrastRatio, lightenColor, darkenColor } from '@ui-suite/shared';

const CUSTOM_THEME_STORAGE_KEY = 'custom-themes';

export interface ThemeFamilyTokenBundleMetadata {
  id: string;
  name: string;
  description?: string;
  author?: string;
  version?: string;
}

export interface ThemeFamilyTokenBundle {
  metadata: ThemeFamilyTokenBundleMetadata;
  light: Record<string, string>;
  dark: Record<string, string>;
  isIncomplete?: boolean;
}

export interface SavedThemeRecord {
  name: string;
  family: ThemeFamilyTokenBundle;
  createdAt: string;
  isIncomplete?: boolean;
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
export function saveTheme(name: string, family: ThemeFamilyTokenBundle): void {
  const savedThemes = getSavedThemes();
  savedThemes[name] = {
    name,
    family: {
      ...family,
      metadata: {
        ...family.metadata,
        id: family.metadata.id || slugifyThemeName(name),
        name,
      },
    },
    createdAt: new Date().toISOString(),
    isIncomplete: family.isIncomplete,
  };
  localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(savedThemes));
}

/**
 * Get all saved themes from localStorage
 */
export function getSavedThemes(): Record<string, SavedThemeRecord> {
  const saved = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
  if (!saved) {
    return {};
  }

  try {
    const parsed = JSON.parse(saved) as Record<string, unknown>;

    return Object.fromEntries(
      Object.entries(parsed)
        .map(([name, value]) => {
          const record = normalizeSavedThemeRecord(name, value);
          return record ? [name, record] : null;
        })
        .filter((entry): entry is [string, SavedThemeRecord] => entry !== null)
    );
  } catch {
    return {};
  }
}

/**
 * Delete a saved theme
 */
export function deleteTheme(name: string): void {
  const savedThemes = getSavedThemes();
  delete savedThemes[name];
  localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(savedThemes));
}

/**
 * Create a normalized family token bundle.
 */
export function createThemeFamilyTokenBundle(
  name: string,
  light: Record<string, string>,
  dark: Record<string, string>,
  metadata: Partial<ThemeFamilyTokenBundleMetadata> = {}
): ThemeFamilyTokenBundle {
  const normalizedLight = { ...light };
  const normalizedDark = Object.keys(dark).length > 0 ? { ...normalizedLight, ...dark } : { ...normalizedLight };

  return {
    metadata: {
      id: metadata.id || slugifyThemeName(name),
      name,
      description: metadata.description,
      author: metadata.author,
      version: metadata.version,
    },
    light: normalizedLight,
    dark: normalizedDark,
    isIncomplete: Object.keys(dark).length === 0,
  };
}

/**
 * Normalize imported theme data into the builder family token schema.
 */
export function normalizeImportedThemeData(
  input: unknown,
  fallbackName: string = 'Imported Theme'
): ThemeFamilyTokenBundle {
  if (!isRecord(input)) {
    throw new Error('Invalid theme data');
  }

  if (isTokenMap(input)) {
    return createThemeFamilyTokenBundle(fallbackName, input, {}, { name: fallbackName });
  }

  const metadataValue = input['metadata'];
  const metadataRecord = isRecord(metadataValue) ? metadataValue : {};
  const themeName = typeof metadataRecord['name'] === 'string' ? metadataRecord['name'] : fallbackName;
  const lightValue = input['light'];
  const darkValue = input['dark'];
  const light = isTokenMap(lightValue) ? lightValue : undefined;
  const dark = isTokenMap(darkValue) ? darkValue : undefined;

  if (light || dark) {
    return createThemeFamilyTokenBundle(themeName, light ?? {}, dark ?? {}, {
      id: typeof metadataRecord['id'] === 'string' ? metadataRecord['id'] : slugifyThemeName(themeName),
      description:
        typeof metadataRecord['description'] === 'string' ? metadataRecord['description'] : undefined,
      author: typeof metadataRecord['author'] === 'string' ? metadataRecord['author'] : undefined,
      version: typeof metadataRecord['version'] === 'string' ? metadataRecord['version'] : undefined,
    });
  }

  const tokensValue = input['tokens'];
  if (isTokenMap(tokensValue)) {
    return createThemeFamilyTokenBundle(themeName, tokensValue, {}, {
      id: typeof metadataRecord['id'] === 'string' ? metadataRecord['id'] : slugifyThemeName(themeName),
      description:
        typeof metadataRecord['description'] === 'string' ? metadataRecord['description'] : undefined,
      author: typeof metadataRecord['author'] === 'string' ? metadataRecord['author'] : undefined,
      version: typeof metadataRecord['version'] === 'string' ? metadataRecord['version'] : undefined,
    });
  }

  throw new Error('Unsupported theme data format');
}

/**
 * Parse CSS custom properties from a CSS string
 *
 * Returns a flat map of all custom properties found in the CSS. Properties in
 * dark-mode blocks overwrite earlier light-mode definitions. For round-trip
 * import of exported themes use {@link parseCSSVariablesByBlock} instead,
 * which preserves the light/dark separation.
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
 * Parse CSS custom properties from a CSS string, preserving light/dark block
 * separation.
 *
 * Selectors that contain the word "dark" (e.g. `[data-theme-mode="dark"]`)
 * are treated as dark-mode overrides. All other selectors contribute to the
 * light token map. This enables a correct round-trip import of CSS files
 * exported by the theme builder.
 */
export function parseCSSVariablesByBlock(css: string): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};

  // Strip CSS block comments before processing
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match each selector { ... } block (non-nested rules only)
  const blockRegex = /([^{}]+)\{([^{}]*)\}/g;
  const tokenRegex = /--([\w-]+):\s*([^;]+);/g;

  let blockMatch: RegExpExecArray | null;
  while ((blockMatch = blockRegex.exec(stripped)) !== null) {
    const selector = blockMatch[1].trim();
    const blockContent = blockMatch[2];
    const target = /dark/.test(selector) ? dark : light;

    tokenRegex.lastIndex = 0;
    let tokenMatch: RegExpExecArray | null;
    while ((tokenMatch = tokenRegex.exec(blockContent)) !== null) {
      target[`--${tokenMatch[1]}`] = tokenMatch[2].trim();
    }
  }

  return { light, dark };
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

function normalizeSavedThemeRecord(name: string, value: unknown): SavedThemeRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  const createdAt =
    typeof value['createdAt'] === 'string' ? value['createdAt'] : new Date().toISOString();

  const familyValue = value['family'];
  if (isRecord(familyValue)) {
    const family = normalizeImportedThemeData(familyValue, name);
    return {
      name,
      family,
      createdAt,
      isIncomplete: family.isIncomplete,
    };
  }

  const tokensValue = value['tokens'];
  if (isTokenMap(tokensValue)) {
    const family = createThemeFamilyTokenBundle(name, tokensValue, {}, { name });
    return {
      name,
      family,
      createdAt,
      isIncomplete: true,
    };
  }

  return null;
}

function slugifyThemeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'custom-theme';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isTokenMap(value: unknown): value is Record<string, string> {
  if (!isRecord(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === 'string');
}
