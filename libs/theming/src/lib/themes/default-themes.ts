/**
 * Default theme definitions
 * 
 * Pre-built themes that can be used out of the box
 */

import { Theme } from '../tokens/theme.interface';
import {
  defaultPrimitiveTokens,
  PrimitiveTokens,
} from '../tokens/primitive-tokens';
import {
  defaultLightSemanticTokens,
  defaultDarkSemanticTokens,
  SemanticTokens,
} from '../tokens/semantic-tokens';
import { defaultComponentTokens } from '../tokens/component-tokens';

/**
 * Default light theme
 */
export const lightTheme: Theme = {
  metadata: {
    id: 'light',
    name: 'Light',
    description: 'Default light theme',
    mode: 'light',
    version: '1.0.0',
  },
  primitive: defaultPrimitiveTokens,
  semantic: defaultLightSemanticTokens,
  component: defaultComponentTokens,
};

/**
 * Default dark theme
 */
export const darkTheme: Theme = {
  metadata: {
    id: 'dark',
    name: 'Dark',
    description: 'Default dark theme',
    mode: 'dark',
    version: '1.0.0',
  },
  primitive: defaultPrimitiveTokens,
  semantic: defaultDarkSemanticTokens,
  component: defaultComponentTokens,
};

/**
 * High contrast theme (light based)
 */
export const highContrastTheme: Theme = {
  metadata: {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'High contrast theme for improved accessibility',
    mode: 'high-contrast',
    version: '1.0.0',
  },
  primitive: {
    ...defaultPrimitiveTokens,
    // Override with higher contrast colors
    colors: {
      ...defaultPrimitiveTokens.colors,
      neutral: {
        50: '#ffffff',
        100: '#f5f5f5',
        200: '#e0e0e0',
        300: '#bdbdbd',
        400: '#9e9e9e',
        500: '#757575',
        600: '#616161',
        700: '#424242',
        800: '#212121',
        900: '#000000',
        950: '#000000',
      },
    },
  },
  semantic: {
    ...defaultLightSemanticTokens,
    text: {
      ...defaultLightSemanticTokens.text,
      primary: 'var(--primitive-black)',
      secondary: 'var(--primitive-neutral-800)',
      tertiary: 'var(--primitive-neutral-700)',
    },
    border: {
      ...defaultLightSemanticTokens.border,
      default: 'var(--primitive-black)',
      strong: 'var(--primitive-black)',
    },
  },
  component: defaultComponentTokens,
};

/**
 * Map of all default themes
 */
export const defaultThemes: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
};

/**
 * Get a default theme by ID
 */
export function getDefaultTheme(id: string): Theme | undefined {
  return defaultThemes[id];
}

/**
 * Get all default theme IDs
 */
export function getDefaultThemeIds(): string[] {
  return Object.keys(defaultThemes);
}

