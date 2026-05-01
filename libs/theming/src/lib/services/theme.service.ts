/**
 * Theme Service
 * 
 * Manages theme state using Angular signals with localStorage persistence
 * and SSR compatibility
 */

import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Theme, ThemeFamily, ThemeFamilyMode, ThemeMode } from '../tokens/theme.interface';
import {
  defaultThemeFamilies,
  highContrastTheme,
  lightTheme,
  standaloneDefaultThemes,
} from '../themes/default-themes';
import { CssGeneratorService } from './css-generator.service';

const THEME_STORAGE_KEY = 'ui-suite-theme';
const THEME_FAMILY_STORAGE_KEY = 'ui-suite-theme-family';
const THEME_MODE_STORAGE_KEY = 'ui-suite-theme-mode';
const CUSTOM_FAMILIES_STORAGE_KEY = 'ui-suite-custom-families';
const DEFAULT_THEME_FAMILY_ID = 'default';
const HIGH_CONTRAST_THEME_ID = 'high-contrast';

type ThemeSelection =
  | { kind: 'family'; familyId: string }
  | { kind: 'theme'; themeId: string };

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cssGenerator = inject(CssGeneratorService);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Current active selection
   */
  private readonly _selection = signal<ThemeSelection>({
    kind: 'family',
    familyId: DEFAULT_THEME_FAMILY_ID,
  });

  /**
   * Preferred family used when switching between light and dark modes
   */
  private readonly _preferredThemeFamilyId = signal<string>(DEFAULT_THEME_FAMILY_ID);

  /**
   * Current requested mode
   */
  private readonly _currentMode = signal<ThemeMode>('light');

  /**
   * Custom standalone theme registry
   */
  private readonly _customThemes = signal<Map<string, Theme>>(new Map());

  /**
   * Custom family registry
   */
  private readonly _customThemeFamilies = signal<Map<string, ThemeFamily>>(new Map());

  /**
   * Public readonly signals
   */
  readonly availableFamilies = computed(() => {
    const families = new Map<string, ThemeFamily>();

    Object.values(defaultThemeFamilies).forEach((family) => {
      families.set(family.metadata.id, family);
    });

    this._customThemeFamilies().forEach((family, id) => {
      families.set(id, family);
    });

    return families;
  });

  readonly currentThemeFamilyId = computed(() => {
    const selection = this._selection();
    return selection.kind === 'family' ? selection.familyId : null;
  });

  readonly currentThemeFamily = computed(() => {
    const familyId = this.currentThemeFamilyId();
    return familyId ? this.availableFamilies().get(familyId) : undefined;
  });

  readonly currentTheme = computed(() => this.resolveCurrentTheme());
  readonly currentThemeId = computed(() => this.currentTheme().metadata.id);
  readonly currentThemeMode = computed(() => this.currentTheme().metadata.mode);
  readonly isLightMode = computed(() => this.currentThemeMode() === 'light');
  readonly isDarkMode = computed(() => this.currentThemeMode() === 'dark');
  readonly isHighContrastMode = computed(() => this.currentThemeMode() === 'high-contrast');

  /**
   * Available themes (default + custom)
   */
  readonly availableThemes = computed(() => {
    const themes = new Map<string, Theme>();

    this.availableFamilies().forEach((family) => {
      themes.set(family.light.metadata.id, family.light);
      themes.set(family.dark.metadata.id, family.dark);
    });

    Object.entries(standaloneDefaultThemes).forEach(([id, theme]) => {
      themes.set(id, theme);
    });
    
    this._customThemes().forEach((theme, id) => {
      themes.set(id, theme);
    });
    
    return themes;
  });

  constructor() {
    // Apply theme reactively whenever it changes
    effect(() => {
      const theme = this.currentTheme();
      if (this.isBrowser) {
        this.cssGenerator.applyTheme(theme);
        this.persistThemeSelection(theme);
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
    const familyMatch = this.findThemeFamilyByThemeId(themeId);
    if (familyMatch) {
      this._preferredThemeFamilyId.set(familyMatch.family.metadata.id);
      this._selection.set({ kind: 'family', familyId: familyMatch.family.metadata.id });
      this._currentMode.set(familyMatch.mode);
      return;
    }

    const theme = this.availableThemes().get(themeId);
    if (!theme) {
      console.warn(`Theme "${themeId}" not found. Available themes:`, Array.from(this.availableThemes().keys()));
      return;
    }

    this._selection.set({ kind: 'theme', themeId });
    this._currentMode.set(theme.metadata.mode);
  }

  /**
   * Select an explicit theme family
   */
  setThemeFamily(familyId: string): void {
    const family = this.availableFamilies().get(familyId);
    if (!family) {
      console.warn(`Theme family "${familyId}" not found. Available families:`, Array.from(this.availableFamilies().keys()));
      return;
    }

    const resolvedMode = this._currentMode() === 'dark' ? 'dark' : 'light';
    this._preferredThemeFamilyId.set(family.metadata.id);
    this._selection.set({ kind: 'family', familyId: family.metadata.id });
    this._currentMode.set(resolvedMode);
  }

  /**
   * Set theme by mode (light, dark, high-contrast)
   */
  setThemeMode(mode: ThemeMode): void {
    if (mode === 'high-contrast') {
      const currentFamilyId = this.currentThemeFamilyId();
      if (currentFamilyId) {
        this._preferredThemeFamilyId.set(currentFamilyId);
      }

      this._selection.set({ kind: 'theme', themeId: HIGH_CONTRAST_THEME_ID });
      this._currentMode.set(mode);
      return;
    }

    const familyId = this.currentThemeFamilyId() ?? this._preferredThemeFamilyId();
    const family = this.availableFamilies().get(familyId) ?? this.availableFamilies().get(DEFAULT_THEME_FAMILY_ID);

    if (!family) {
      console.warn('No theme family is available to resolve mode changes.');
      return;
    }

    this._preferredThemeFamilyId.set(family.metadata.id);
    this._selection.set({ kind: 'family', familyId: family.metadata.id });
    this._currentMode.set(mode);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleDarkMode(): void {
    const currentMode = this.currentThemeMode();
    this.setThemeMode(currentMode === 'dark' ? 'light' : 'dark');
  }

  /**
   * Set a complete custom standalone theme
   */
  setCustomTheme(theme: Theme): void {
    this._customThemes.update((themes) => {
      const newThemes = new Map(themes);
      newThemes.set(theme.metadata.id, theme);
      return newThemes;
    });
    this._selection.set({ kind: 'theme', themeId: theme.metadata.id });
    this._currentMode.set(theme.metadata.mode);
  }

  /**
   * Register and activate a custom family
   */
  setCustomThemeFamily(themeFamily: ThemeFamily): void {
    this.registerThemeFamily(themeFamily);
    this.setThemeFamily(themeFamily.metadata.id);
  }

  /**
   * Register a custom standalone theme without activating it
   */
  registerTheme(theme: Theme): void {
    this._customThemes.update((themes) => {
      const newThemes = new Map(themes);
      newThemes.set(theme.metadata.id, theme);
      return newThemes;
    });
  }

  /**
   * Register a custom standalone theme without activating it
   */
  registerCustomTheme(theme: Theme): void {
    this.registerTheme(theme);
  }

  /**
   * Register a custom family without activating it
   */
  registerThemeFamily(themeFamily: ThemeFamily): void {
    this._customThemeFamilies.update((families) => {
      const newFamilies = new Map(families);
      newFamilies.set(themeFamily.metadata.id, themeFamily);
      return newFamilies;
    });
    if (this.isBrowser) {
      this.persistCustomFamilies();
    }
  }

  /**
   * Unregister a custom standalone theme
   */
  unregisterTheme(themeId: string): void {
    this._customThemes.update((themes) => {
      const newThemes = new Map(themes);
      newThemes.delete(themeId);
      return newThemes;
    });
  }

  /**
   * Unregister a custom family
   */
  unregisterThemeFamily(familyId: string): void {
    this._customThemeFamilies.update((families) => {
      const newFamilies = new Map(families);
      newFamilies.delete(familyId);
      return newFamilies;
    });
    if (this.isBrowser) {
      this.persistCustomFamilies();
    }
  }

  /**
   * Get theme by ID
   */
  getTheme(themeId: string): Theme | undefined {
    return this.availableThemes().get(themeId);
  }

  /**
   * Get theme family by ID
   */
  getThemeFamily(familyId: string): ThemeFamily | undefined {
    return this.availableFamilies().get(familyId);
  }

  /**
   * Resolve the currently active leaf theme
   */
  getResolvedTheme(): Theme {
    return this.currentTheme();
  }

  /**
   * Export current theme as JSON
   */
  exportTheme(): string {
    return JSON.stringify(this.currentTheme(), null, 2);
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
    // Restore persisted custom families before resolving selection
    this.loadCustomFamiliesFromStorage();

    const savedThemeFamilyId = this.getStoredThemeFamilyId();
    const savedThemeMode = this.getStoredThemeMode();
    const savedThemeId = this.getStoredThemeId();

    if (savedThemeMode === 'high-contrast') {
      const familyId = this.resolvePreferredFamilyId(savedThemeFamilyId);
      if (familyId) {
        this._preferredThemeFamilyId.set(familyId);
      }

      this.setThemeMode('high-contrast');
      return;
    }

    if (savedThemeFamilyId && this.availableFamilies().has(savedThemeFamilyId)) {
      this.setThemeFamily(savedThemeFamilyId);

      if (savedThemeMode === 'light' || savedThemeMode === 'dark') {
        this.setThemeMode(savedThemeMode);
      }

      return;
    }

    if (savedThemeId) {
      const familyId = this.resolvePreferredFamilyId(savedThemeFamilyId);
      if (familyId) {
        this._preferredThemeFamilyId.set(familyId);
      }

      this.setTheme(savedThemeId);
      return;
    }

    const systemMode = this.detectSystemTheme();
    this.setThemeMode(systemMode);
  }

  /**
   * Persist theme to localStorage
   */
  private persistThemeSelection(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme.metadata.id);
      localStorage.setItem(THEME_MODE_STORAGE_KEY, theme.metadata.mode);

      const familyId = this.resolvePreferredFamilyId(this.currentThemeFamilyId());
      if (familyId) {
        localStorage.setItem(THEME_FAMILY_STORAGE_KEY, familyId);
      } else {
        localStorage.removeItem(THEME_FAMILY_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist theme to localStorage:', error);
    }
  }

  /**
   * Get stored theme family ID from localStorage
   */
  private getStoredThemeFamilyId(): string | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      return localStorage.getItem(THEME_FAMILY_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read theme family from localStorage:', error);
      return null;
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
   * Get stored theme mode from localStorage
   */
  private getStoredThemeMode(): ThemeMode | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const storedMode = localStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (storedMode === 'light' || storedMode === 'dark' || storedMode === 'high-contrast') {
        return storedMode;
      }

      return null;
    } catch (error) {
      console.warn('Failed to read theme mode from localStorage:', error);
      return null;
    }
  }

  /**
   * Clear stored theme preference and any persisted custom families
   */
  clearStoredTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
      localStorage.removeItem(THEME_FAMILY_STORAGE_KEY);
      localStorage.removeItem(THEME_MODE_STORAGE_KEY);
      localStorage.removeItem(CUSTOM_FAMILIES_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear theme from localStorage:', error);
    }
  }

  /**
   * Persist all registered custom theme families to localStorage
   */
  private persistCustomFamilies(): void {
    try {
      const serializable: Record<string, ThemeFamily> = {};
      this._customThemeFamilies().forEach((family, id) => {
        serializable[id] = family;
      });
      localStorage.setItem(CUSTOM_FAMILIES_STORAGE_KEY, JSON.stringify(serializable));
    } catch (error) {
      console.warn('Failed to persist custom theme families to localStorage:', error);
    }
  }

  /**
   * Restore custom theme families from localStorage
   */
  private loadCustomFamiliesFromStorage(): void {
    try {
      const stored = localStorage.getItem(CUSTOM_FAMILIES_STORAGE_KEY);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as Record<string, unknown>;
      Object.values(parsed).forEach((value) => {
        const family = value as ThemeFamily;
        if (
          family &&
          typeof family === 'object' &&
          family.metadata?.id &&
          family.light?.metadata &&
          family.dark?.metadata
        ) {
          this._customThemeFamilies.update((families) => {
            const newFamilies = new Map(families);
            newFamilies.set(family.metadata.id, family);
            return newFamilies;
          });
        }
      });
    } catch (error) {
      console.warn('Failed to load custom theme families from localStorage:', error);
    }
  }

  /**
   * Generate CSS custom properties string for current theme
   */
  generateCss(): string {
    return this.cssGenerator.generateCssVariables(this.currentTheme());
  }

  /**
   * Resolve the active theme from current selection and mode
   */
  private resolveCurrentTheme(): Theme {
    const selection = this._selection();

    if (selection.kind === 'family') {
      return this.resolveFamilyTheme(selection.familyId, this._currentMode()) ?? lightTheme;
    }

    return this.availableThemes().get(selection.themeId) ?? lightTheme;
  }

  /**
   * Resolve a leaf theme from a family and requested mode
   */
  private resolveFamilyTheme(familyId: string, mode: ThemeMode): Theme | undefined {
    const family = this.availableFamilies().get(familyId);
    if (!family) {
      return undefined;
    }

    const variant: ThemeFamilyMode = mode === 'dark' ? 'dark' : 'light';
    return family[variant];
  }

  /**
   * Find the owning family for a legacy leaf theme ID
   */
  private findThemeFamilyByThemeId(themeId: string): { family: ThemeFamily; mode: ThemeFamilyMode } | undefined {
    for (const family of this.availableFamilies().values()) {
      if (family.light.metadata.id === themeId) {
        return { family, mode: 'light' };
      }

      if (family.dark.metadata.id === themeId) {
        return { family, mode: 'dark' };
      }
    }

    return undefined;
  }

  /**
   * Resolve the last valid family ID for persistence and recovery
   */
  private resolvePreferredFamilyId(candidateFamilyId: string | null): string | null {
    if (candidateFamilyId && this.availableFamilies().has(candidateFamilyId)) {
      return candidateFamilyId;
    }

    const preferredFamilyId = this._preferredThemeFamilyId();
    if (this.availableFamilies().has(preferredFamilyId)) {
      return preferredFamilyId;
    }

    if (this.availableFamilies().has(DEFAULT_THEME_FAMILY_ID)) {
      return DEFAULT_THEME_FAMILY_ID;
    }

    return null;
  }
}

