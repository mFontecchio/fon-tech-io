/**
 * Complete theme interface combining all three tiers of design tokens
 */

import { PrimitiveTokens } from './primitive-tokens';
import { SemanticTokens } from './semantic-tokens';
import { ComponentTokens } from './component-tokens';

/**
 * Theme metadata
 */
export interface ThemeMetadata {
  id: string;
  name: string;
  description?: string;
  author?: string;
  version?: string;
  mode: 'light' | 'dark' | 'high-contrast';
}

/**
 * Complete theme definition
 * Includes all three tiers of design tokens plus metadata
 */
export interface Theme {
  metadata: ThemeMetadata;
  primitive: PrimitiveTokens;
  semantic: SemanticTokens;
  component: ComponentTokens;
}

/**
 * Theme family metadata
 * Groups paired light and dark leaf themes under a stable family identity
 */
export interface ThemeFamilyMetadata {
  id: string;
  name: string;
  description?: string;
  author?: string;
  version?: string;
}

/**
 * Paired light and dark themes managed as one selectable family
 */
export interface ThemeFamily {
  metadata: ThemeFamilyMetadata;
  light: Theme;
  dark: Theme;
}

/**
 * Partial theme definition for customization
 * Allows partial overrides of any token tier
 */
export type PartialTheme = {
  metadata?: Partial<ThemeMetadata>;
  primitive?: Partial<PrimitiveTokens>;
  semantic?: Partial<SemanticTokens>;
  component?: Partial<ComponentTokens>;
};

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'high-contrast';

/**
 * Supported family variants for paired themes
 */
export type ThemeFamilyMode = Extract<ThemeMode, 'light' | 'dark'>;

/**
 * CSS custom property prefix
 */
export const CSS_VAR_PREFIX = '--ui-suite';

