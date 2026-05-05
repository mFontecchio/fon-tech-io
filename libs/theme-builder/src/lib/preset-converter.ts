/**
 * Preset Converter Utility
 * Converts preset families to engine-native theme families
 */

import { darkTheme, lightTheme, Theme, ThemeFamily } from '@ui-suite/theming';
import { ThemePreset, ThemePresetTokens } from './theme-presets';

const PRESET_THEME_VERSION = '1.0.0';

/**
 * Convert a preset family to a proper ThemeFamily object.
 */
export function convertPresetToThemeFamily(preset: ThemePreset): ThemeFamily {
  return {
    metadata: {
      id: preset.id,
      name: preset.name,
      description: preset.description,
      author: preset.author,
      version: PRESET_THEME_VERSION,
    },
    light: convertPresetVariantToTheme(preset, 'light', preset.light),
    dark: convertPresetVariantToTheme(preset, 'dark', preset.dark),
  };
}

/**
 * Legacy compatibility wrapper until the builder registers full families.
 */
export function convertPresetToTheme(preset: ThemePreset): Theme {
  return convertPresetToThemeFamily(preset).light;
}

function convertPresetVariantToTheme(
  preset: ThemePreset,
  mode: 'light' | 'dark',
  tokens: ThemePresetTokens
): Theme {
  const theme = structuredClone(mode === 'dark' ? darkTheme : lightTheme);
  const variantLabel = mode === 'light' ? 'Light' : 'Dark';

  theme.metadata = {
    id: `${preset.id}-${mode}`,
    name: `${preset.name} ${variantLabel}`,
    description: `${preset.description} (${variantLabel})`,
    author: preset.author,
    mode,
    version: PRESET_THEME_VERSION,
  };

  applyPresetTokens(theme, tokens);

  return theme;
}

function applyPresetTokens(theme: Theme, tokens: ThemePresetTokens): void {
  const assign = (tokenName: string, apply: (value: string) => void): void => {
    const value = tokens[tokenName];
    if (value) {
      apply(value);
    }
  };

  assign('--semantic-brand-primary', (value) => {
    theme.primitive.colors.primary[500] = value;
    theme.primitive.colors.primary[600] = value;
    theme.primitive.colors.primary[700] = value;
    theme.semantic.brand.primary = value;
    theme.semantic.brand.primaryHover = value;
    theme.semantic.brand.primaryActive = value;
    theme.semantic.text.link = value;
    theme.semantic.text.linkHover = value;
    theme.semantic.border.focus = value;
    theme.semantic.state.focusRing = value;
  });

  assign('--semantic-brand-secondary', (value) => {
    theme.primitive.colors.secondary[500] = value;
    theme.primitive.colors.secondary[600] = value;
    theme.primitive.colors.secondary[700] = value;
    theme.semantic.brand.secondary = value;
    theme.semantic.brand.secondaryHover = value;
    theme.semantic.brand.secondaryActive = value;
  });

  assign('--semantic-brand-primary-subtle', (value) => {
    theme.semantic.brand.primarySubtle = value;
    theme.semantic.state.selected = value;
  });

  assign('--semantic-feedback-success', (value) => {
    theme.primitive.colors.success[500] = value;
    theme.primitive.colors.success[600] = value;
    theme.semantic.feedback.success = value;
    theme.semantic.text.success = value;
    theme.semantic.border.success = value;
  });

  assign('--semantic-feedback-warning', (value) => {
    theme.primitive.colors.warning[500] = value;
    theme.primitive.colors.warning[600] = value;
    theme.semantic.feedback.warning = value;
    theme.semantic.text.warning = value;
    theme.semantic.border.warning = value;
  });

  assign('--semantic-feedback-error', (value) => {
    theme.primitive.colors.error[500] = value;
    theme.primitive.colors.error[600] = value;
    theme.semantic.feedback.error = value;
    theme.semantic.text.error = value;
    theme.semantic.border.error = value;
  });

  assign('--semantic-feedback-info', (value) => {
    theme.primitive.colors.info[500] = value;
    theme.primitive.colors.info[600] = value;
    theme.semantic.feedback.info = value;
    theme.semantic.text.info = value;
  });

  assign('--semantic-surface-background', (value) => {
    theme.primitive.colors.neutral[50] = value;
    theme.semantic.surface.background = value;
  });

  assign('--semantic-surface-card', (value) => {
    theme.semantic.surface.card = value;
    theme.semantic.surface.modal = value;
    theme.semantic.surface.elevated = value;
  });

  assign('--semantic-surface-background-secondary', (value) => {
    theme.primitive.colors.neutral[100] = value;
    theme.semantic.surface.backgroundSecondary = value;
    theme.semantic.surface.cardHover = value;
  });

  assign('--semantic-text-primary', (value) => {
    theme.primitive.colors.neutral[900] = value;
    theme.semantic.text.primary = value;
  });

  assign('--semantic-text-secondary', (value) => {
    theme.primitive.colors.neutral[600] = value;
    theme.semantic.text.secondary = value;
  });

  assign('--semantic-text-tertiary', (value) => {
    theme.primitive.colors.neutral[500] = value;
    theme.semantic.text.tertiary = value;
  });

  assign('--primitive-font-family-sans', (value) => {
    theme.primitive.typography.fontFamily.sans = value;
  });

  assign('--primitive-font-size-xs', (value) => {
    theme.primitive.typography.fontSize.xs = value;
  });

  assign('--primitive-font-size-sm', (value) => {
    theme.primitive.typography.fontSize.sm = value;
  });

  assign('--primitive-font-size-base', (value) => {
    theme.primitive.typography.fontSize.base = value;
  });

  assign('--primitive-font-size-lg', (value) => {
    theme.primitive.typography.fontSize.lg = value;
  });

  assign('--primitive-font-size-xl', (value) => {
    theme.primitive.typography.fontSize.xl = value;
  });

  assign('--primitive-spacing-1', (value) => {
    theme.primitive.spacing[1] = value;
  });

  assign('--primitive-spacing-2', (value) => {
    theme.primitive.spacing[2] = value;
  });

  assign('--primitive-spacing-3', (value) => {
    theme.primitive.spacing[3] = value;
  });

  assign('--primitive-spacing-4', (value) => {
    theme.primitive.spacing[4] = value;
  });

  assign('--primitive-spacing-6', (value) => {
    theme.primitive.spacing[6] = value;
  });

  assign('--primitive-spacing-8', (value) => {
    theme.primitive.spacing[8] = value;
  });

  assign('--primitive-border-radius-sm', (value) => {
    theme.primitive.borderRadius.sm = value;
  });

  assign('--primitive-border-radius-md', (value) => {
    theme.primitive.borderRadius.md = value;
  });

  assign('--primitive-border-radius-lg', (value) => {
    theme.primitive.borderRadius.lg = value;
  });

  assign('--primitive-border-radius-full', (value) => {
    theme.primitive.borderRadius.full = value;
  });
}

