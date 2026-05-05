/**
 * Typography Service
 *
 * Service for managing responsive typography and providing utilities
 * for calculating font sizes, line heights, and other typography properties
 */

import { Injectable, signal, computed, inject, CSP_NONCE, DOCUMENT } from '@angular/core';
import {
  fluidFontSize,
  calculateLineHeight,
  calculateLetterSpacing,
  TypeScaleConfig,
  TYPE_SCALES,
  TYPOGRAPHY_PRESETS,
  generateTypographyCss,
  BREAKPOINTS,
  Breakpoint,
} from '@ui-suite/shared';

export { type TypeScaleConfig, type Breakpoint } from '@ui-suite/shared';

@Injectable({
  providedIn: 'root',
})
export class TypographyService {
  private readonly nonce = inject(CSP_NONCE, { optional: true });
  private readonly document = inject(DOCUMENT);

  /**
   * Current breakpoint (signal)
   */
  private readonly _currentBreakpoint = signal<Breakpoint>('desktop');

  /**
   * Public readonly signals
   */
  readonly currentBreakpoint = this._currentBreakpoint.asReadonly();
  readonly isMobile = computed(() => this._currentBreakpoint() === 'mobile');
  readonly isTablet = computed(() => this._currentBreakpoint() === 'tablet');
  readonly isDesktop = computed(() => this._currentBreakpoint() === 'desktop');
  readonly isWide = computed(() => this._currentBreakpoint() === 'wide');

  /**
   * Type scales
   */
  readonly typeScales = TYPE_SCALES;

  /**
   * Typography presets
   */
  readonly presets = TYPOGRAPHY_PRESETS;

  /**
   * Breakpoints
   */
  readonly breakpoints = BREAKPOINTS;

  constructor() {
    this.detectBreakpoint();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.detectBreakpoint());
    }
  }

  /**
   * Generate fluid font size
   */
  getFluidFontSize(config: TypeScaleConfig): string {
    return fluidFontSize(config);
  }

  /**
   * Calculate line height for font size
   */
  getLineHeight(fontSize: number): number {
    return calculateLineHeight(fontSize);
  }

  /**
   * Calculate letter spacing for font size
   */
  getLetterSpacing(fontSize: number): string {
    return calculateLetterSpacing(fontSize);
  }

  /**
   * Get predefined type scale
   */
  getTypeScale(scale: keyof typeof TYPE_SCALES): TypeScaleConfig {
    return TYPE_SCALES[scale];
  }

  /**
   * Generate all typography CSS custom properties
   */
  generateCss(): string {
    return generateTypographyCss();
  }

  /**
   * Apply typography CSS to document by injecting a nonce-compatible `<style>` element.
   * Reuses the existing element on subsequent calls to avoid DOM churn.
   */
  applyTypographyCss(): void {
    const styleId = 'fui-suite-typography';
    let styleEl = this.document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = this.document.createElement('style') as HTMLStyleElement;
      styleEl.id = styleId;
      if (this.nonce) {
        styleEl.nonce = this.nonce;
      }
      this.document.head.appendChild(styleEl);
    }

    styleEl.textContent = this.generateCss();
  }

  /**
   * Detect current breakpoint based on window width
   */
  private detectBreakpoint(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const width = window.innerWidth;

    if (width < BREAKPOINTS.tablet) {
      this._currentBreakpoint.set('mobile');
    } else if (width < BREAKPOINTS.desktop) {
      this._currentBreakpoint.set('tablet');
    } else if (width < BREAKPOINTS.wide) {
      this._currentBreakpoint.set('desktop');
    } else {
      this._currentBreakpoint.set('wide');
    }
  }

  /**
   * Get current font size for a type scale at current breakpoint
   */
  getCurrentFontSize(scale: keyof typeof TYPE_SCALES): number {
    const config = TYPE_SCALES[scale];
    const breakpoint = this._currentBreakpoint();

    // Interpolate based on breakpoint
    const breakpointValues = {
      mobile: config.min,
      tablet: config.min + (config.max - config.min) * 0.33,
      desktop: config.min + (config.max - config.min) * 0.66,
      wide: config.max,
    };

    return breakpointValues[breakpoint];
  }

  /**
   * Check if current viewport width matches breakpoint
   */
  matchesBreakpoint(breakpoint: Breakpoint, minOrMax: 'min' | 'max' = 'min'): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const width = window.innerWidth;
    const breakpointWidth = BREAKPOINTS[breakpoint];

    return minOrMax === 'min' ? width >= breakpointWidth : width <= breakpointWidth;
  }
}
