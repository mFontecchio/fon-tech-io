/**
 * CSS Generator Service
 * 
 * Converts theme tokens to CSS custom properties
 */

import { Injectable } from '@angular/core';
import { Theme } from '../tokens/theme.interface';
import {
  PrimitiveTokens,
  ColorPalette,
  PrimitiveSpacing,
  PrimitiveTypography,
  PrimitiveBorderRadius,
  PrimitiveShadows,
  PrimitiveZIndex,
} from '../tokens/primitive-tokens';
import { SemanticTokens } from '../tokens/semantic-tokens';
import { ComponentTokens } from '../tokens/component-tokens';

@Injectable({
  providedIn: 'root',
})
export class CssGeneratorService {
  /**
   * Generate CSS custom properties from a theme
   */
  generateCssVariables(theme: Theme): string {
    const cssVars: string[] = [];

    // Add primitive tokens
    cssVars.push(this.generatePrimitiveCss(theme.primitive));

    // Add semantic tokens
    cssVars.push(this.generateSemanticCss(theme.semantic));

    // Add component tokens
    cssVars.push(this.generateComponentCss(theme.component));

    return `:root {\n${cssVars.join('\n')}\n}`;
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme: Theme): void {
    const root = document.documentElement;

    // Apply primitive tokens
    this.applyPrimitiveTokens(root, theme.primitive);

    // Apply semantic tokens
    this.applySemanticTokens(root, theme.semantic);

    // Apply component tokens
    this.applyComponentTokens(root, theme.component);

    // Set theme mode attribute
    root.setAttribute('data-theme', theme.metadata.id);
    root.setAttribute('data-theme-mode', theme.metadata.mode);
  }

  /**
   * Generate CSS for primitive tokens
   */
  private generatePrimitiveCss(primitive: PrimitiveTokens): string {
    const vars: string[] = [];

    // Colors
    Object.entries(primitive.colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'string') {
        vars.push(`  --primitive-${this.kebabCase(colorName)}: ${colorValue};`);
      } else {
        // Color palette
        Object.entries(colorValue as ColorPalette).forEach(([shade, value]) => {
          vars.push(`  --primitive-${this.kebabCase(colorName)}-${shade}: ${value};`);
        });
      }
    });

    // Spacing
    Object.entries(primitive.spacing).forEach(([key, value]) => {
      vars.push(`  --primitive-spacing-${key}: ${value};`);
    });

    // Typography
    Object.entries(primitive.typography.fontFamily).forEach(([key, value]) => {
      vars.push(`  --primitive-font-family-${key}: ${value};`);
    });
    Object.entries(primitive.typography.fontSize).forEach(([key, value]) => {
      vars.push(`  --primitive-font-size-${key}: ${value};`);
    });
    Object.entries(primitive.typography.fontWeight).forEach(([key, value]) => {
      vars.push(`  --primitive-font-weight-${key}: ${value};`);
    });
    Object.entries(primitive.typography.lineHeight).forEach(([key, value]) => {
      vars.push(`  --primitive-line-height-${key}: ${value};`);
    });
    Object.entries(primitive.typography.letterSpacing).forEach(([key, value]) => {
      vars.push(`  --primitive-letter-spacing-${key}: ${value};`);
    });

    // Border radius
    Object.entries(primitive.borderRadius).forEach(([key, value]) => {
      vars.push(`  --primitive-border-radius-${key}: ${value};`);
    });

    // Shadows
    Object.entries(primitive.shadows).forEach(([key, value]) => {
      vars.push(`  --primitive-shadow-${key}: ${value};`);
    });

    // Z-index
    Object.entries(primitive.zIndex).forEach(([key, value]) => {
      vars.push(`  --primitive-z-index-${this.kebabCase(key)}: ${value};`);
    });

    return vars.join('\n');
  }

  /**
   * Generate CSS for semantic tokens
   */
  private generateSemanticCss(semantic: SemanticTokens): string {
    const vars: string[] = [];

    // Surface colors
    Object.entries(semantic.surface).forEach(([key, value]) => {
      vars.push(`  --semantic-surface-${this.kebabCase(key)}: ${value};`);
    });

    // Text colors
    Object.entries(semantic.text).forEach(([key, value]) => {
      vars.push(`  --semantic-text-${this.kebabCase(key)}: ${value};`);
    });

    // Border colors
    Object.entries(semantic.border).forEach(([key, value]) => {
      vars.push(`  --semantic-border-${this.kebabCase(key)}: ${value};`);
    });

    // State colors
    Object.entries(semantic.state).forEach(([key, value]) => {
      vars.push(`  --semantic-state-${this.kebabCase(key)}: ${value};`);
    });

    // Brand colors
    Object.entries(semantic.brand).forEach(([key, value]) => {
      vars.push(`  --semantic-brand-${this.kebabCase(key)}: ${value};`);
    });

    // Feedback colors
    Object.entries(semantic.feedback).forEach(([key, value]) => {
      vars.push(`  --semantic-feedback-${this.kebabCase(key)}: ${value};`);
    });

    return vars.join('\n');
  }

  /**
   * Generate CSS for component tokens
   */
  private generateComponentCss(component: ComponentTokens): string {
    const vars: string[] = [];

    // Flatten component tokens
    Object.entries(component).forEach(([componentName, componentTokens]) => {
      this.flattenObject(componentTokens, `component-${this.kebabCase(componentName)}`).forEach(
        ([key, value]) => {
          vars.push(`  --${key}: ${value};`);
        }
      );
    });

    return vars.join('\n');
  }

  /**
   * Apply primitive tokens to DOM element
   */
  private applyPrimitiveTokens(element: HTMLElement, primitive: PrimitiveTokens): void {
    // Colors
    Object.entries(primitive.colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'string') {
        element.style.setProperty(`--primitive-${this.kebabCase(colorName)}`, colorValue);
      } else {
        Object.entries(colorValue as ColorPalette).forEach(([shade, value]) => {
          element.style.setProperty(`--primitive-${this.kebabCase(colorName)}-${shade}`, value);
        });
      }
    });

    // Spacing
    Object.entries(primitive.spacing).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-spacing-${key}`, value);
    });

    // Typography
    Object.entries(primitive.typography.fontFamily).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-font-family-${key}`, value);
    });
    Object.entries(primitive.typography.fontSize).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-font-size-${key}`, value);
    });
    Object.entries(primitive.typography.fontWeight).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-font-weight-${key}`, value);
    });
    Object.entries(primitive.typography.lineHeight).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-line-height-${key}`, value);
    });
    Object.entries(primitive.typography.letterSpacing).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-letter-spacing-${key}`, value);
    });

    // Border radius
    Object.entries(primitive.borderRadius).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-border-radius-${key}`, value);
    });

    // Shadows
    Object.entries(primitive.shadows).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-shadow-${key}`, value);
    });

    // Z-index
    Object.entries(primitive.zIndex).forEach(([key, value]) => {
      element.style.setProperty(`--primitive-z-index-${this.kebabCase(key)}`, String(value));
    });
  }

  /**
   * Apply semantic tokens to DOM element
   */
  private applySemanticTokens(element: HTMLElement, semantic: SemanticTokens): void {
    Object.entries(semantic.surface).forEach(([key, value]) => {
      element.style.setProperty(`--semantic-surface-${this.kebabCase(key)}`, value);
    });

    Object.entries(semantic.text).forEach(([key, value]) => {
      element.style.setProperty(`--semantic-text-${this.kebabCase(key)}`, value);
    });

    Object.entries(semantic.border).forEach(([key, value]) => {
      element.style.setProperty(`--semantic-border-${this.kebabCase(key)}`, value);
    });

    Object.entries(semantic.state).forEach(([key, value]) => {
      element.style.setProperty(`--semantic-state-${this.kebabCase(key)}`, value);
    });

    Object.entries(semantic.brand).forEach(([key, value]) => {
      element.style.setProperty(`--semantic-brand-${this.kebabCase(key)}`, value);
    });

    Object.entries(semantic.feedback).forEach(([key, value]) => {
      element.style.setProperty(`--semantic-feedback-${this.kebabCase(key)}`, value);
    });
  }

  /**
   * Apply component tokens to DOM element
   */
  private applyComponentTokens(element: HTMLElement, component: ComponentTokens): void {
    Object.entries(component).forEach(([componentName, componentTokens]) => {
      this.flattenObject(componentTokens, `component-${this.kebabCase(componentName)}`).forEach(
        ([key, value]) => {
          element.style.setProperty(`--${key}`, String(value));
        }
      );
    });
  }

  /**
   * Flatten nested object to key-value pairs
   */
  private flattenObject(
    obj: Record<string, unknown>,
    prefix = ''
  ): Array<[string, string | number]> {
    const result: Array<[string, string | number]> = [];

    Object.entries(obj).forEach(([key, value]) => {
      const newKey = prefix ? `${prefix}-${this.kebabCase(key)}` : this.kebabCase(key);

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result.push(...this.flattenObject(value as Record<string, unknown>, newKey));
      } else if (typeof value === 'string' || typeof value === 'number') {
        result.push([newKey, value]);
      }
    });

    return result;
  }

  /**
   * Convert camelCase to kebab-case
   */
  private kebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
  }
}

