/**
 * Theme Service
 * 
 * Manages theme state using Angular signals with localStorage persistence
 * and SSR compatibility
 */

import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme, ThemeMode } from '../tokens/theme.interface';
import { lightTheme, darkTheme, highContrastTheme, getDefaultTheme } from '../themes/default-themes';
import { CssGeneratorService } from './css-generator.service';

const THEME_STORAGE_KEY = 'ui-suite-theme';
const THEME_MODE_STORAGE_KEY = 'ui-suite-theme-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cssGenerator = inject(CssGeneratorService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Current active theme (signal)
   */
  private readonly _currentTheme = signal<Theme>(lightTheme);

  /**
   * Custom theme registry
   */
  private readonly _customThemes = signal<Map<string, Theme>>(new Map());

  /**
   * Public readonly signals
   */
  readonly currentTheme = this._currentTheme.asReadonly();
  readonly currentThemeId = computed(() => this._currentTheme().metadata.id);
  readonly currentThemeMode = computed(() => this._currentTheme().metadata.mode);
  readonly isLightMode = computed(() => this._currentTheme().metadata.mode === 'light');
  readonly isDarkMode = computed(() => this._currentTheme().metadata.mode === 'dark');
  readonly isHighContrastMode = computed(() => this._currentTheme().metadata.mode === 'high-contrast');

  /**
   * Available themes (default + custom)
   */
  readonly availableThemes = computed(() => {
    const themes = new Map<string, Theme>();
    themes.set('light', lightTheme);
    themes.set('dark', darkTheme);
    themes.set('high-contrast', highContrastTheme);
    
    this._customThemes().forEach((theme, id) => {
      themes.set(id, theme);
    });
    
    return themes;
  });

  constructor() {
    // Apply theme reactively whenever it changes
    effect(() => {
      const theme = this._currentTheme();
      if (this.isBrowser) {
        this.cssGenerator.applyTheme(theme);
        this.persistTheme(theme);
      }
    });

    // Initialize theme on browser
    if (this.isBrowser) {
      this.initializeTheme();
    }
  }

  /**
   * Set theme by ID
   */
  setTheme(themeId: string): void {
    const theme = this.availableThemes().get(themeId);
    if (theme) {
      this._currentTheme.set(theme);
    } else {
      console.warn(`Theme "${themeId}" not found. Available themes:`, Array.from(this.availableThemes().keys()));
    }
  }

  /**
   * Set theme by mode (light, dark, high-contrast)
   */
  setThemeMode(mode: ThemeMode): void {
    const modeToThemeMap: Record<ThemeMode, string> = {
      'light': 'light',
      'dark': 'dark',
      'high-contrast': 'high-contrast',
    };
    
    this.setTheme(modeToThemeMap[mode]);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleDarkMode(): void {
    const currentMode = this.currentThemeMode();
    this.setThemeMode(currentMode === 'dark' ? 'light' : 'dark');
  }

  /**
   * Set a complete custom theme
   */
  setCustomTheme(theme: Theme): void {
    this._customThemes.update(themes => {
      const newThemes = new Map(themes);
      newThemes.set(theme.metadata.id, theme);
      return newThemes;
    });
    this._currentTheme.set(theme);
  }

  /**
   * Register a custom theme without activating it
   */
  registerTheme(theme: Theme): void {
    this._customThemes.update(themes => {
      const newThemes = new Map(themes);
      newThemes.set(theme.metadata.id, theme);
      return newThemes;
    });
  }

  /**
   * Unregister a custom theme
   */
  unregisterTheme(themeId: string): void {
    this._customThemes.update(themes => {
      const newThemes = new Map(themes);
      newThemes.delete(themeId);
      return newThemes;
    });
  }

  /**
   * Get theme by ID
   */
  getTheme(themeId: string): Theme | undefined {
    return this.availableThemes().get(themeId);
  }

  /**
   * Export current theme as JSON
   */
  exportTheme(): string {
    return JSON.stringify(this._currentTheme(), null, 2);
  }

  /**
   * Import theme from JSON
   */
  importTheme(themeJson: string): void {
    try {
      const theme = JSON.parse(themeJson) as Theme;
      this.setCustomTheme(theme);
    } catch (error) {
      console.error('Failed to import theme:', error);
      throw new Error('Invalid theme JSON');
    }
  }

  /**
   * Detect system theme preference
   */
  detectSystemTheme(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia('(prefers-contrast: more)').matches) {
      return 'high-contrast';
    }
    return 'light';
  }

  /**
   * Listen to system theme changes
   */
  watchSystemTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const updateTheme = () => {
      const mode = this.detectSystemTheme();
      this.setThemeMode(mode);
    };

    darkModeQuery.addEventListener('change', updateTheme);
    contrastQuery.addEventListener('change', updateTheme);
  }

  /**
   * Initialize theme from storage or system preference
   */
  private initializeTheme(): void {
    const savedThemeId = this.getStoredThemeId();
    
    if (savedThemeId) {
      // Use saved theme
      this.setTheme(savedThemeId);
    } else {
      // Use system preference
      const systemMode = this.detectSystemTheme();
      this.setThemeMode(systemMode);
    }
  }

  /**
   * Persist theme to localStorage
   */
  private persistTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme.metadata.id);
      localStorage.setItem(THEME_MODE_STORAGE_KEY, theme.metadata.mode);
    } catch (error) {
      console.warn('Failed to persist theme to localStorage:', error);
    }
  }

  /**
   * Get stored theme ID from localStorage
   */
  private getStoredThemeId(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return null;
    }
  }

  /**
   * Clear stored theme preference
   */
  clearStoredTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
      localStorage.removeItem(THEME_MODE_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear theme from localStorage:', error);
    }
  }

  /**
   * Generate CSS custom properties string for current theme
   */
  generateCss(): string {
    return this.cssGenerator.generateCssVariables(this._currentTheme());
  }
}

