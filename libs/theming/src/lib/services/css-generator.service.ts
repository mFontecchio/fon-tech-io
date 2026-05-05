/**
 * CSS Generator Service
 *
 * Converts theme tokens to CSS custom properties
 */

import { Injectable, inject, CSP_NONCE, DOCUMENT } from '@angular/core';
import { Theme } from '../tokens/theme.interface';
import { PrimitiveTokens, ColorPalette } from '../tokens/primitive-tokens';
import { SemanticTokens } from '../tokens/semantic-tokens';
import { ComponentTokens } from '../tokens/component-tokens';

@Injectable({
  providedIn: 'root',
})
export class CssGeneratorService {
  private readonly nonce = inject(CSP_NONCE, { optional: true });
  private readonly document = inject(DOCUMENT);

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
   * Apply theme to document by injecting a nonce-compatible `<style>` element.
   * Reuses the existing element on subsequent calls to avoid DOM churn.
   */
  applyTheme(theme: Theme): void {
    const cssText = this.generateCssVariables(theme);
    const styleId = 'fui-suite-theme';
    let styleEl = this.document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = this.document.createElement('style') as HTMLStyleElement;
      styleEl.id = styleId;
      if (this.nonce) {
        styleEl.nonce = this.nonce;
      }
      this.document.head.appendChild(styleEl);
    }

    styleEl.textContent = cssText;

    const root = this.document.documentElement;
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

    // Animation durations
    Object.entries(primitive.animation.duration).forEach(([key, value]) => {
      vars.push(`  --primitive-animation-duration-${this.kebabCase(key)}: ${value};`);
    });

    // Animation easings
    Object.entries(primitive.animation.easing).forEach(([key, value]) => {
      vars.push(`  --primitive-animation-easing-${this.kebabCase(key)}: ${value};`);
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

    // Animation tokens
    Object.entries(semantic.animation.duration).forEach(([key, value]) => {
      vars.push(`  --semantic-animation-duration-${this.kebabCase(key)}: ${value};`);
    });
    Object.entries(semantic.animation.easing).forEach(([key, value]) => {
      vars.push(`  --semantic-animation-easing-${this.kebabCase(key)}: ${value};`);
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
