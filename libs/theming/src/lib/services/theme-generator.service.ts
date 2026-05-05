/**
 * Theme Generator Service
 *
 * Automatically generates theme variants with proper hover states and contrast-based text colors
 */

import { Injectable } from '@angular/core';
import {
  generateHoverColor,
  generateActiveColor,
  getContrastTextColor,
  generateColorPalette,
  parseHex,
  rgbToHex,
} from '@ui-suite/shared';
import { Theme, ThemeMode } from '../tokens/theme.interface';
import { PrimitiveTokens } from '../tokens/primitive-tokens';
import { SemanticTokens } from '../tokens/semantic-tokens';
import { ComponentTokens } from '../tokens/component-tokens';

/**
 * Options for theme generation
 */
export interface ThemeGenerationOptions {
  /**
   * Generate hover states automatically
   * @default true
   */
  autoGenerateHoverStates?: boolean;

  /**
   * Use contrast-based text colors (black/white based on background)
   * @default true
   */
  autoContrastText?: boolean;

  /**
   * Amount to adjust colors for hover states (0-100)
   * @default 10
   */
  hoverAmount?: number;

  /**
   * Amount to adjust colors for active states (0-100)
   * @default 15
   */
  activeAmount?: number;

  /**
   * Black color to use for contrast text
   * @default '#000000'
   */
  blackColor?: string;

  /**
   * White color to use for contrast text
   * @default '#ffffff'
   */
  whiteColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeGeneratorService {
  /**
   * Default options
   */
  private readonly defaultOptions: ThemeGenerationOptions = {
    autoGenerateHoverStates: true,
    autoContrastText: true,
    hoverAmount: 10,
    activeAmount: 15,
    blackColor: '#000000',
    whiteColor: '#ffffff',
  };

  /**
   * Enhance a theme with auto-generated hover states and contrast text colors
   *
   * @param theme - Base theme to enhance
   * @param options - Generation options
   * @returns Enhanced theme
   *
   * @example
   * ```typescript
   * const baseTheme: Theme = { ... };
   * const enhancedTheme = this.themeGenerator.enhanceTheme(baseTheme);
   * ```
   */
  enhanceTheme(theme: Theme, options?: ThemeGenerationOptions): Theme {
    const opts = { ...this.defaultOptions, ...options };
    const mode = theme.metadata.mode;

    let enhancedTheme = { ...theme };

    if (opts.autoGenerateHoverStates) {
      enhancedTheme = this.generateHoverStates(enhancedTheme, mode, opts);
    }

    if (opts.autoContrastText) {
      enhancedTheme = this.generateContrastText(enhancedTheme, opts);
    }

    return enhancedTheme;
  }

  /**
   * Generate hover and active states for semantic and component tokens
   */
  private generateHoverStates(
    theme: Theme,
    mode: ThemeMode,
    options: ThemeGenerationOptions
  ): Theme {
    const semantic = { ...theme.semantic };
    const component = { ...theme.component };

    // Generate brand color hover states
    if (semantic.brand) {
      const primaryBase = this.extractColorFromVar(semantic.brand.primary, theme);
      const secondaryBase = this.extractColorFromVar(semantic.brand.secondary, theme);
      const accentBase = this.extractColorFromVar(semantic.brand.accent, theme);

      semantic.brand = {
        ...semantic.brand,
        primaryHover: generateHoverColor(primaryBase, mode, options.hoverAmount),
        primaryActive: generateActiveColor(primaryBase, mode, options.activeAmount),
        secondaryHover: generateHoverColor(secondaryBase, mode, options.hoverAmount),
        secondaryActive: generateActiveColor(secondaryBase, mode, options.activeAmount),
        accentHover: generateHoverColor(accentBase, mode, options.hoverAmount),
      };
    }

    // Generate button hover states
    if (component.button) {
      const filledBg = this.extractColorFromVar(component.button.filled.background, theme);

      component.button = {
        ...component.button,
        filled: {
          ...component.button.filled,
          backgroundHover: generateHoverColor(filledBg, mode, options.hoverAmount),
          backgroundActive: generateActiveColor(filledBg, mode, options.activeAmount),
        },
        outlined: {
          ...component.button.outlined,
          backgroundHover: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        },
        text: {
          ...component.button.text,
          backgroundHover: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        },
      };
    }

    // Generate surface hover states
    if (semantic.surface) {
      const cardBase = this.extractColorFromVar(semantic.surface.card, theme);

      semantic.surface = {
        ...semantic.surface,
        cardHover: generateHoverColor(cardBase, mode, options.hoverAmount! / 2), // Subtle hover
      };
    }

    return {
      ...theme,
      semantic,
      component,
    };
  }

  /**
   * Generate contrast-based text colors for components
   */
  private generateContrastText(theme: Theme, options: ThemeGenerationOptions): Theme {
    const component = { ...theme.component };

    // Button filled variant - auto text color based on background
    if (component.button) {
      const filledBg = this.extractColorFromVar(component.button.filled.background, theme);
      const textColor = getContrastTextColor(filledBg, options.blackColor, options.whiteColor);

      component.button = {
        ...component.button,
        filled: {
          ...component.button.filled,
          text: textColor,
        },
      };
    }

    // Badge variants - auto text colors
    if (component.badge) {
      const badges = ['default', 'success', 'warning', 'error', 'info'] as const;

      badges.forEach((variant) => {
        const bg = this.extractColorFromVar(component.badge[variant].background, theme);
        const textColor = getContrastTextColor(bg, options.blackColor, options.whiteColor);

        component.badge = {
          ...component.badge,
          [variant]: {
            ...component.badge[variant],
            text: textColor,
          },
        };
      });
    }

    return {
      ...theme,
      component,
    };
  }

  /**
   * Extract actual color value from CSS variable reference or direct value
   * Handles var(--token-name) format and direct hex colors
   */
  private extractColorFromVar(value: string, theme: Theme): string {
    // If it's a direct color value (hex), return it
    if (value.startsWith('#')) {
      return value;
    }

    // If it's a CSS variable, try to resolve it
    if (value.startsWith('var(--')) {
      const varName = value.match(/var\(--([^)]+)\)/)?.[1];
      if (varName) {
        // Try to find the value in primitive tokens
        // This is a simplified lookup - in production, you'd want a more robust resolver
        if (varName.startsWith('primitive-primary')) {
          const shade = varName.split('-').pop();
          const shadeKey = shade as unknown as keyof typeof theme.primitive.colors.primary;
          return theme.primitive.colors.primary[shadeKey] || '#3b82f6';
        }
        // Add more token resolution logic as needed
      }
    }

    // Fallback to a default color
    return '#3b82f6';
  }

  /**
   * Generate a complete color palette from a single base color
   *
   * @param baseColor - Base color (HEX) - should be a medium shade
   * @returns Color palette with shades 50-950
   *
   * @example
   * ```typescript
   * const palette = this.themeGenerator.generatePalette('#3b82f6');
   * // Returns: { 50: '#eff6ff', 100: '#dbeafe', ..., 950: '#172554' }
   * ```
   */
  generatePalette(baseColor: string): Record<number, string> {
    return generateColorPalette(baseColor);
  }

  /**
   * Create a theme from a brand color
   * Generates a complete theme with proper hover states and text colors
   * NOTE: This creates a minimal theme structure. For production use,
   * extend with complete primitive, semantic, and component tokens.
   *
   * @param brandColor - Primary brand color (HEX)
   * @param mode - Theme mode
   * @param themeName - Name for the theme
   * @param baseTheme - Base theme to extend from (provides complete token structure)
   * @returns Complete theme
   */
  createThemeFromBrandColor(
    brandColor: string,
    mode: ThemeMode = 'light',
    themeName = 'Custom Theme',
    baseTheme?: Theme
  ): Theme {
    const palette = this.generatePalette(brandColor);

    // If no base theme provided, this will be incomplete - recommend passing a base theme
    if (!baseTheme) {
      throw new Error(
        'createThemeFromBrandColor requires a baseTheme parameter. ' +
          'Pass an existing theme (e.g., lightTheme or darkTheme) to extend from.'
      );
    }

    // Create theme by extending base theme with new primary color
    const theme: Theme = {
      metadata: {
        ...baseTheme.metadata,
        id: themeName.toLowerCase().replace(/\s+/g, '-'),
        name: themeName,
        mode,
        description: `Generated from ${brandColor}`,
        version: '1.0.0',
      },
      primitive: {
        ...baseTheme.primitive,
        colors: {
          ...baseTheme.primitive.colors,
          primary: palette as unknown as typeof baseTheme.primitive.colors.primary,
        },
      },
      semantic: { ...baseTheme.semantic },
      component: { ...baseTheme.component },
    };

    // Enhance with auto-generated hover states and contrast text
    return this.enhanceTheme(theme);
  }
}

