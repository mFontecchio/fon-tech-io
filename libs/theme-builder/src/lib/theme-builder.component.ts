/**
 * Theme Builder Page
 * Interactive theme customization tool with live preview and export
 */

import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  HostListener,
  afterNextRender,
  inject,
  untracked,
} from '@angular/core';

import {
  CardComponent,
  TabsComponent,
  TabComponent,
  ButtonComponent,
  InputComponent,
  AlertComponent,
  BadgeComponent,
  ModalComponent,
  SkeletonComponent,
} from '@ui-suite/components';
import { ThemeService, Theme, ThemeFamily, ThemeGeneratorService } from '@ui-suite/theming';
import { THEME_PRESETS, ThemePreset } from './theme-presets';
import { convertPresetToThemeFamily } from './preset-converter';
import {
  createThemeFamilyTokenBundle,
  deleteTheme,
  getAnalogousColors,
  getContrastRatio,
  getSavedThemes,
  getComplementaryColor,
  getWCAGLevel,
  SavedThemeRecord,
  saveTheme,
  ThemeFamilyTokenBundle,
  normalizeImportedThemeData,
  isValidHexColor,
  lightenColor,
  darkenColor,
  generateShades,
  parseCSSVariablesByBlock,
} from './theme-utils';

interface ThemeToken {
  name: string;
  value: string;
  type: 'color' | 'size' | 'font' | 'weight' | 'other';
  category: string;
  description?: string;
}

interface ThemeCategory {
  id: string;
  name: string;
  description: string;
  tokens: ThemeToken[];
}

interface HistoryEntry {
  tokenName: string;
  oldValue: string;
  newValue: string;
  timestamp: number;
}

interface EditableThemeFamilyMetadata {
  id: string;
  name: string;
  description: string;
  author: string;
  version?: string;
}

@Component({
  selector: 'app-theme-builder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    TabsComponent,
    TabComponent,
    ButtonComponent,
    InputComponent,
    AlertComponent,
    BadgeComponent,
    ModalComponent,
    SkeletonComponent,
  ],
  template: `
    <div class="theme-builder-page">
      <div class="theme-builder-header">
        <div>
          <h1>Theme Builder</h1>
          <p class="subtitle">Customize design tokens for both light and dark modes</p>
        </div>
      </div>

      <!-- Dual Theme Info -->
      <fui-alert variant="info" class="dual-theme-alert">
        <strong>Dual Theme System:</strong> Edit both Light and Dark color modes simultaneously!
        Each color token has two inputs side-by-side - Light (left) and Dark (right). Typography and
        spacing tokens are shared between both themes. Use the Light/Dark toggle buttons in the Live
        Preview section to see your theme in both modes. When you export, both light and dark color
        tokens will be included for a complete theme solution.
      </fui-alert>

      <!-- Sticky Action Toolbar -->
      <!-- Action Toolbar with Skeleton Loader -->
      @if (isInitializing()) {
        <div class="action-toolbar">
          <fui-skeleton variant="rectangular" height="2.5rem" width="100%" />
        </div>
      } @else {
        <div class="action-toolbar">
          <div class="toolbar-section">
            <span class="toolbar-label">History</span>
            <div class="toolbar-buttons">
              <fui-button
                variant="outlined"
                size="sm"
                (clicked)="undo()"
                [disabled]="!canUndo()"
                title="Undo (Ctrl+Z)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
                </svg>
                Undo
              </fui-button>
              <fui-button
                variant="outlined"
                size="sm"
                (clicked)="redo()"
                [disabled]="!canRedo()"
                title="Redo (Ctrl+Y)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
                </svg>
                Redo
              </fui-button>
            </div>
          </div>

          <div class="toolbar-divider"></div>

          <div class="toolbar-section">
            <span class="toolbar-label">Tools</span>
            <div class="toolbar-buttons">
              <fui-button variant="outlined" size="sm" (clicked)="toggleAccessibilityChecker()">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                A11y Check
              </fui-button>
              <fui-button variant="outlined" size="sm" (clicked)="toggleColorGenerator()">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
                  />
                </svg>
                Colors
              </fui-button>
              <fui-button variant="outlined" size="sm" (clicked)="toggleBrandColorGenerator()">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                Brand
              </fui-button>
            </div>
          </div>

          <div class="toolbar-divider"></div>

          <div class="toolbar-section">
            <span class="toolbar-label">Actions</span>
            <div class="toolbar-buttons">
              <fui-button variant="outlined" size="sm" (clicked)="resetTheme()">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
                Reset
              </fui-button>
              <fui-button variant="filled" size="sm" (clicked)="exportTheme()">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export
              </fui-button>
            </div>
          </div>
        </div>
      }

      <!-- Theme Presets & Quick Actions -->
      <div class="presets-section">
        <fui-card>
          <div class="presets-header">
            <div>
              <h2>Theme Presets</h2>
              <p class="presets-description">Start with a pre-made theme or load a saved one</p>
            </div>
            <div class="presets-actions">
              @if (isInitializing()) {
                <fui-skeleton variant="rounded" height="2rem" width="5rem" />
                <fui-skeleton variant="rounded" height="2rem" width="5rem" />
              } @else {
                <fui-button variant="outlined" size="sm" (clicked)="importTheme()">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="icon-inline"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Import
                </fui-button>
                <fui-button variant="outlined" size="sm" (clicked)="showSaveThemeModal()">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="icon-inline"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save
                </fui-button>
              }
            </div>
          </div>

          <div class="presets-compact">
            <label for="preset-selector" class="preset-label">Quick Start with Preset:</label>
            <div class="preset-selector-wrapper">
              <select
                id="preset-selector"
                class="preset-selector"
                (change)="onPresetChange($event)"
                [value]="''"
              >
                <option value="" disabled>Select a theme preset...</option>
                @for (preset of themePresets; track preset.id) {
                  <option [value]="preset.id">{{ preset.name }} - {{ preset.description }}</option>
                }
              </select>
              <svg
                class="preset-selector-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <div class="preset-colors-preview">
              @for (preset of themePresets.slice(0, 6); track preset.id) {
                <button
                  class="preset-quick-button"
                  (click)="applyPreset(preset)"
                  [title]="preset.name + ': ' + preset.description"
                  [attr.aria-label]="'Apply ' + preset.name + ' preset'"
                >
                  <div
                    class="preset-color-swatch"
                    [style.background]="
                      'linear-gradient(135deg, ' +
                      preset.tokens['--semantic-brand-primary'] +
                      ' 0%, ' +
                      preset.tokens['--semantic-brand-primary'] +
                      ' 50%, ' +
                      preset.tokens['--semantic-feedback-success'] +
                      ' 50%, ' +
                      preset.tokens['--semantic-feedback-success'] +
                      ' 100%)'
                    "
                  ></div>
                  <span class="preset-quick-name">{{ preset.name }}</span>
                </button>
              }
            </div>
          </div>

          @if (savedThemes().length > 0) {
            <div class="saved-themes-section">
              <h3>Your Saved Themes</h3>
              <div class="saved-themes-grid">
                @for (theme of savedThemes(); track theme.name) {
                  <div class="saved-theme-card">
                    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
                    <div class="saved-theme-info" (click)="loadSavedTheme(theme.name)">
                      <h4>{{ theme.name }}</h4>
                      <span class="saved-theme-date">{{ formatDate(theme.createdAt) }}</span>
                    </div>
                    <fui-button
                      variant="text"
                      size="sm"
                      (clicked)="deleteSavedTheme(theme.name)"
                      [ariaLabel]="'Delete theme ' + theme.name"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        />
                      </svg>
                    </fui-button>
                  </div>
                }
              </div>
            </div>
          }
        </fui-card>
      </div>

      <div class="theme-builder-layout">
        <!-- Token Editor -->
        <div class="token-editor">
          <fui-card>
            <h2>Design Tokens</h2>

            <fui-tabs>
              <fui-tab label="Colors">
                <div class="token-section">
                  @for (category of colorCategories(); track category.id) {
                    <div class="token-category">
                      <h3>{{ category.name }}</h3>
                      <p class="category-description">{{ category.description }}</p>

                      <div class="token-grid">
                        @for (token of category.tokens; track token.name) {
                          <div class="token-item">
                            <!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
                            <label>
                              <span class="token-label">{{ formatTokenName(token.name) }}</span>
                              @if (token.description) {
                                <span class="token-description">{{ token.description }}</span>
                              }
                            </label>
                            <div class="dual-token-inputs">
                              <div class="mode-input-group">
                                <span class="mode-input-label">Light</span>
                                <div class="token-input-wrapper">
                                  <input
                                    type="color"
                                    [id]="token.name + '-light'"
                                    [value]="token.value"
                                    (input)="
                                      updateLightToken(token.name, $any($event.target).value)
                                    "
                                    class="color-input"
                                  />
                                  <input
                                    type="text"
                                    [value]="token.value"
                                    (input)="
                                      updateLightToken(token.name, $any($event.target).value)
                                    "
                                    class="text-input"
                                    [placeholder]="token.value"
                                  />
                                </div>
                              </div>
                              <div class="mode-input-group">
                                <span class="mode-input-label">Dark</span>
                                <div class="token-input-wrapper">
                                  <input
                                    type="color"
                                    [id]="token.name + '-dark'"
                                    [value]="getDarkTokenValue(token.name)"
                                    (input)="updateDarkToken(token.name, $any($event.target).value)"
                                    class="color-input"
                                  />
                                  <input
                                    type="text"
                                    [value]="getDarkTokenValue(token.name)"
                                    (input)="updateDarkToken(token.name, $any($event.target).value)"
                                    class="text-input"
                                    [placeholder]="getDarkTokenValue(token.name)"
                                  />
                                </div>
                              </div>
                            </div>
                            @if (getInlineContrastChecks(token.name).length > 0) {
                              <div class="inline-contrast-checks">
                                @for (check of getInlineContrastChecks(token.name); track check.pairLabel) {
                                  <div class="inline-contrast-check">
                                    <span class="inline-contrast-label">{{ check.pairLabel }}</span>
                                    <div class="inline-contrast-badges">
                                      <span
                                        class="inline-contrast-badge"
                                        [class.inline-contrast-badge--aaa]="check.lightLevel === 'AAA'"
                                        [class.inline-contrast-badge--aa]="check.lightLevel === 'AA'"
                                        [class.inline-contrast-badge--fail]="check.lightLevel === 'Fail'"
                                        [title]="'Light: ' + check.lightRatio.toFixed(2) + ':1'"
                                      >☀ {{ check.lightLevel }}</span>
                                      <span
                                        class="inline-contrast-badge"
                                        [class.inline-contrast-badge--aaa]="check.darkLevel === 'AAA'"
                                        [class.inline-contrast-badge--aa]="check.darkLevel === 'AA'"
                                        [class.inline-contrast-badge--fail]="check.darkLevel === 'Fail'"
                                        [title]="'Dark: ' + check.darkRatio.toFixed(2) + ':1'"
                                      >☾ {{ check.darkLevel }}</span>
                                    </div>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </fui-tab>

              <fui-tab label="Typography">
                <div class="token-section">
                  @for (category of typographyCategories(); track category.id) {
                    <div class="token-category">
                      <h3>{{ category.name }}</h3>
                      <p class="category-description">{{ category.description }}</p>

                      <div class="token-grid">
                        @for (token of category.tokens; track token.name) {
                          <div class="token-item">
                            <label [for]="token.name">
                              <span class="token-label">{{ formatTokenName(token.name) }}</span>
                            </label>
                            <input
                              type="text"
                              [id]="token.name"
                              [value]="token.value"
                              (input)="updateToken(token.name, $any($event.target).value)"
                              class="text-input full-width"
                            />
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </fui-tab>

              <fui-tab label="Spacing">
                <div class="token-section">
                  @for (category of spacingCategories(); track category.id) {
                    <div class="token-category">
                      <h3>{{ category.name }}</h3>
                      <p class="category-description">{{ category.description }}</p>

                      <div class="token-grid">
                        @for (token of category.tokens; track token.name) {
                          <div class="token-item">
                            <label [for]="token.name">
                              <span class="token-label">{{ formatTokenName(token.name) }}</span>
                            </label>
                            <input
                              type="text"
                              [id]="token.name"
                              [value]="token.value"
                              (input)="updateToken(token.name, $any($event.target).value)"
                              class="text-input full-width"
                            />
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </fui-tab>
            </fui-tabs>
          </fui-card>
        </div>

        <!-- Live Preview -->
        <div class="live-preview">
          <fui-card>
            <div class="preview-header">
              <div>
                <h2>Live Preview</h2>
                <p class="preview-description">See your theme changes in real-time</p>
              </div>
              <div class="preview-mode-toggle">
                <fui-button
                  [variant]="!isPreviewingDark() ? 'filled' : 'outlined'"
                  size="sm"
                  (clicked)="setPreviewMode('light')"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon-inline icon-inline--middle"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  Light
                </fui-button>
                <fui-button
                  [variant]="isPreviewingDark() ? 'filled' : 'outlined'"
                  size="sm"
                  (clicked)="setPreviewMode('dark')"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon-inline icon-inline--middle"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark
                </fui-button>
              </div>
            </div>

            <div
              class="preview-container"
              [attr.data-preview-theme]="isPreviewingDark() ? 'dark' : 'light'"
            >
              <!-- Buttons -->
              <div class="preview-section">
                <h4>Buttons</h4>
                <div class="preview-row">
                  <fui-button variant="filled" size="sm">Small</fui-button>
                  <fui-button variant="filled" size="md">Medium</fui-button>
                  <fui-button variant="filled" size="lg">Large</fui-button>
                </div>
                <div class="preview-row">
                  <fui-button variant="outlined">Outlined</fui-button>
                  <fui-button variant="text">Text</fui-button>
                </div>
              </div>

              <!-- Inputs -->
              <div class="preview-section">
                <h4>Form Controls</h4>
                <fui-input placeholder="Enter text..." label="Text Input" />
              </div>

              <!-- Alert -->
              <div class="preview-section">
                <h4>Feedback</h4>
                <fui-alert variant="info">This is an informational message</fui-alert>
              </div>

              <!-- Card -->
              <div class="preview-section">
                <h4>Card</h4>
                <fui-card>
                  <h3>Card Title</h3>
                  <p>This is a sample card with your custom theme applied.</p>
                </fui-card>
              </div>

              <!-- Typography -->
              <div class="preview-section">
                <h4>Typography</h4>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <p>Body text with your custom font family and sizing.</p>
              </div>

              <!-- Colors -->
              <div class="preview-section">
                <h4>Color Palette</h4>
                <div class="color-swatches">
                  <div class="color-swatch color-swatch--brand">
                    <span>Brand</span>
                  </div>
                  <div class="color-swatch color-swatch--success">
                    <span>Success</span>
                  </div>
                  <div class="color-swatch color-swatch--warning">
                    <span>Warning</span>
                  </div>
                  <div class="color-swatch color-swatch--error">
                    <span>Error</span>
                  </div>
                </div>
              </div>
            </div>
          </fui-card>
        </div>
      </div>

      <!-- Export Modal (shown when exporting) -->
      <fui-modal
        [open]="showExportModal()"
        [title]="'Export Theme'"
        [size]="'md'"
        (closed)="closeExportModal()"
      >
        <p>Choose your export format:</p>

        <div class="export-options">
          <fui-button variant="outlined" [fullWidth]="true" (clicked)="exportAsCSS()">
            Export as CSS Variables
          </fui-button>
          <fui-button variant="outlined" [fullWidth]="true" (clicked)="exportAsJSON()">
            Export as JSON
          </fui-button>
          <fui-button variant="outlined" [fullWidth]="true" (clicked)="exportAsTypeScript()">
            Export as TypeScript
          </fui-button>
        </div>

        <div slot="footer">
          <fui-button variant="text" (clicked)="closeExportModal()">Cancel</fui-button>
        </div>
      </fui-modal>

      <!-- Save Theme Modal -->
      <fui-modal
        [open]="showSaveModal()"
        [title]="'Save Theme'"
        [size]="'md'"
        (closed)="closeSaveModal()"
      >
        <p>Give your custom theme a name:</p>

        <fui-input
          [value]="saveThemeName()"
          (valueChange)="saveThemeName.set($event)"
          placeholder="My Custom Theme"
          label="Theme Name"
        />

        <div slot="footer">
          <fui-button variant="text" (clicked)="closeSaveModal()">Cancel</fui-button>
          <fui-button variant="filled" (clicked)="saveCurrentTheme()">Save</fui-button>
        </div>
      </fui-modal>

      <!-- Accessibility Checker Panel -->
      @if (showAccessibilityChecker()) {
        <div class="utility-panel">
          <fui-card>
            <div class="panel-header">
              <h2>Accessibility Checker</h2>
              <fui-button
                variant="text"
                size="sm"
                (clicked)="toggleAccessibilityChecker()"
                [ariaLabel]="'Close accessibility checker'"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </fui-button>
            </div>
            <p class="panel-description">Check contrast ratios for WCAG compliance</p>

            <div class="contrast-checks">
              @for (check of contrastChecks(); track check.label) {
                <div class="contrast-check-item">
                  <div class="contrast-info">
                    <span class="contrast-label">{{ check.label }}</span>
                    <div class="color-samples">
                      <span class="color-sample" [style.background-color]="check.foreground"
                        >A</span
                      >
                      <span class="color-sample" [style.background-color]="check.background"
                        >A</span
                      >
                    </div>
                  </div>
                  <div class="contrast-result">
                    <span class="contrast-ratio">{{ check.ratio.toFixed(2) }}:1</span>
                    <fui-badge
                      [variant]="
                        check.level === 'AAA'
                          ? 'success'
                          : check.level === 'AA'
                            ? 'warning'
                            : 'error'
                      "
                    >
                      {{ check.level }}
                    </fui-badge>
                  </div>
                </div>
              }
            </div>

            <div class="wcag-info">
              <h4>WCAG Standards:</h4>
              <ul>
                <li><strong>AAA:</strong> 7:1 for normal text, 4.5:1 for large text</li>
                <li><strong>AA:</strong> 4.5:1 for normal text, 3:1 for large text</li>
                <li><strong>Fail:</strong> Does not meet minimum standards</li>
              </ul>
            </div>
          </fui-card>
        </div>
      }

      <!-- Color Generator Panel -->
      @if (showColorGenerator()) {
        <div class="utility-panel">
          <fui-card>
            <div class="panel-header">
              <h2>Color Palette Generator</h2>
              <fui-button
                variant="text"
                size="sm"
                (clicked)="toggleColorGenerator()"
                [ariaLabel]="'Close color generator'"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </fui-button>
            </div>
            <p class="panel-description">Generate harmonious color schemes</p>

            <div class="color-generator-controls">
              <div class="color-input-group">
                <fui-input
                  [value]="baseColorForGeneration"
                  (valueChange)="baseColorForGeneration = $event"
                  label="Base Color"
                  placeholder="#3b82f6"
                />
                <div class="color-picker-wrapper">
                  <label class="color-picker-label" for="color-picker-input">Pick Color</label>
                  <input
                    type="color"
                    id="color-picker-input"
                    class="color-picker-input"
                    [value]="baseColorForGeneration || '#3b82f6'"
                    (input)="baseColorForGeneration = $any($event.target).value"
                  />
                </div>
              </div>
              <div class="generator-buttons">
                <fui-button variant="outlined" size="sm" (clicked)="generateComplementary()">
                  Complementary
                </fui-button>
                <fui-button variant="outlined" size="sm" (clicked)="generateAnalogous()">
                  Analogous
                </fui-button>
                <fui-button variant="outlined" size="sm" (clicked)="generateShades()">
                  Shades
                </fui-button>
              </div>
            </div>

            @if (generatedColors().length > 0) {
              <div class="generated-colors">
                <h4>Generated Colors:</h4>
                <div class="generated-color-grid">
                  @for (color of generatedColors(); track color) {
                    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
                    <div class="generated-color-item" (click)="copyColorToClipboard(color)">
                      <div class="generated-color-preview" [style.background-color]="color"></div>
                      <span class="generated-color-value">{{ color }}</span>
                    </div>
                  }
                </div>
                <p class="hint">Click any color to copy to clipboard</p>
              </div>
            }
          </fui-card>
        </div>
      }

      <!-- Brand Color Theme Generator Panel -->
      @if (showBrandColorGenerator()) {
        <div class="utility-panel">
          <fui-card>
            <div class="panel-header">
              <h2>Generate Theme from Brand Color</h2>
              <fui-button
                variant="text"
                size="sm"
                (clicked)="toggleBrandColorGenerator()"
                [ariaLabel]="'Close brand color generator'"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </fui-button>
            </div>
            <p class="panel-description">
              Generate a complete light and dark theme from a single brand color. Text colors and
              hover states are automatically adjusted to meet contrast requirements.
            </p>

            <div class="brand-generator-controls">
              <div class="color-input-group">
                <fui-input
                  [value]="brandGeneratorColor()"
                  (valueChange)="brandGeneratorColor.set($event)"
                  label="Brand Color"
                  placeholder="#3b82f6"
                />
                <div class="color-picker-wrapper">
                  <label class="color-picker-label" for="brand-color-picker">Pick Color</label>
                  <input
                    type="color"
                    id="brand-color-picker"
                    class="color-picker-input"
                    [value]="brandGeneratorColor() || '#3b82f6'"
                    (input)="brandGeneratorColor.set($any($event.target).value)"
                  />
                </div>
              </div>

              <div class="brand-color-preview">
                <div
                  class="brand-color-swatch"
                  [style.background-color]="brandGeneratorColor()"
                ></div>
                <div
                  class="brand-color-swatch brand-color-swatch--text"
                  [style.background-color]="brandGeneratorColor()"
                >
                  <span>Aa</span>
                </div>
              </div>

              <fui-input
                [value]="brandGeneratorThemeName()"
                (valueChange)="brandGeneratorThemeName.set($event)"
                label="Theme Name"
                placeholder="My Brand Theme"
              />

              @if (brandGeneratorError()) {
                <fui-alert variant="error">{{ brandGeneratorError() }}</fui-alert>
              }

              <fui-button
                variant="filled"
                [fullWidth]="true"
                (clicked)="generateThemeFromBrandColor()"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon-inline icon-inline--middle"
                >
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                Generate Theme
              </fui-button>
            </div>

            <div class="wcag-info">
              <h4>What gets generated:</h4>
              <ul>
                <li>Complete light and dark color palettes from your brand color</li>
                <li>Automatic hover and active states</li>
                <li>Contrast-optimized text colors (WCAG AA minimum)</li>
                <li>All semantic and component tokens are preserved from the current theme</li>
              </ul>
            </div>
          </fui-card>
        </div>
      }

      <!-- Hidden file input for import -->
      <input
        type="file"
        #fileInput
        class="file-input-hidden"
        accept=".json,.css"
        (change)="handleFileImport($event)"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      /* Skeleton loader styles */
      .presets-actions fui-skeleton {
        display: inline-block;
      }

      .theme-builder-page {
        padding: var(--primitive-spacing-6);
        max-width: 1600px;
        margin: 0 auto;
        /* Ensure sticky positioning works - no overflow or transform/filter on parent */
        position: relative;
        overflow: visible;
        min-height: 100vh;
        /* Remove any transforms that could break sticky */
        transform: none;
      }

      .theme-builder-header {
        margin-bottom: var(--primitive-spacing-6);
      }

      .dual-theme-alert {
        margin-bottom: var(--primitive-spacing-6);
      }

      .icon-inline {
        margin-right: var(--primitive-spacing-1);
      }

      .icon-inline--middle {
        vertical-align: middle;
      }

      .color-swatch--brand {
        background-color: var(--semantic-brand-primary);
      }

      .color-swatch--success {
        background-color: var(--semantic-feedback-success);
      }

      .color-swatch--warning {
        background-color: var(--semantic-feedback-warning);
      }

      .color-swatch--error {
        background-color: var(--semantic-feedback-error);
      }

      .file-input-hidden {
        display: none;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
      }

      .subtitle {
        font-size: var(--primitive-font-size-lg);
        color: var(--semantic-text-secondary);
      }

      /* Sticky Action Toolbar */
      .action-toolbar {
        position: -webkit-sticky !important; /* Safari support */
        position: sticky !important;
        top: 4rem !important; /* Stick below the header (header height is 4rem/64px) */
        z-index: 50 !important; /* Above content, below header (which is z-index: 100) */
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-4);
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        margin: 0 calc(var(--primitive-spacing-6) * -1) var(--primitive-spacing-6); /* Negative margin to extend to edges */
        margin-top: 0;
        background-color: var(--semantic-surface-background);
        border-bottom: 1px solid var(--semantic-border-default);
        box-shadow: var(--primitive-shadow-md);
        backdrop-filter: blur(12px);
        transition:
          box-shadow 0.2s ease,
          background-color 0.2s ease,
          border-color 0.2s ease;
      }

      @supports (backdrop-filter: blur(12px)) {
        .action-toolbar {
          background-color: color-mix(in srgb, var(--semantic-surface-background) 95%, transparent);
        }
      }

      /* Enhanced shadow when scrolled */
      .action-toolbar::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--semantic-border-default);
      }

      .toolbar-section {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
      }

      .toolbar-label {
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        white-space: nowrap;
      }

      .toolbar-buttons {
        display: flex;
        gap: var(--primitive-spacing-2);
        align-items: center;
      }

      .toolbar-buttons fui-button {
        white-space: nowrap;
      }

      .toolbar-buttons fui-button svg {
        vertical-align: middle;
        margin-right: 4px;
      }

      .toolbar-divider {
        width: 1px;
        height: 32px;
        background-color: var(--semantic-border-default);
        flex-shrink: 0;
      }

      /* Utility Panels (Accessibility Checker & Color Generator) */
      .utility-panel {
        position: fixed;
        top: 80px;
        right: var(--primitive-spacing-6);
        width: 400px;
        max-height: calc(100vh - 120px);
        overflow-y: auto;
        z-index: 100;
        background: var(--semantic-surface-card);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-lg);
        box-shadow: var(--primitive-shadow-lg);
        animation: slideInRight 0.3s ease-out;
      }

      .utility-panel ::ng-deep fui-card {
        background: transparent;
        border: none;
        box-shadow: none;
      }

      .utility-panel ::ng-deep fui-input,
      .utility-panel ::ng-deep fui-button {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .utility-panel ::ng-deep fui-input input {
        display: block !important;
      }

      .utility-panel .generator-buttons ::ng-deep fui-button {
        flex: 1 1 auto;
        min-width: 100px;
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--primitive-spacing-3);
      }

      .panel-header h2 {
        font-size: var(--primitive-font-size-lg);
        margin: 0;
      }

      .panel-header fui-button {
        flex-shrink: 0;
      }

      .panel-description {
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-4);
      }

      /* Accessibility Checker Styles */
      .contrast-checks {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-3);
        margin-bottom: var(--primitive-spacing-4);
      }
      .contrast-check-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--primitive-spacing-3);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
      }
      .contrast-info {
        flex: 1;
      }
      .contrast-label {
        font-size: var(--primitive-font-size-sm);
        font-weight: 600;
        display: block;
        margin-bottom: var(--primitive-spacing-2);
      }
      .color-samples {
        display: flex;
        gap: var(--primitive-spacing-2);
      }
      .color-sample {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--primitive-border-radius-sm);
        font-weight: 600;
        box-shadow: var(--primitive-shadow-sm);
      }
      .contrast-result {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--primitive-spacing-1);
      }
      .contrast-ratio {
        font-size: var(--primitive-font-size-sm);
        font-weight: 600;
        color: var(--semantic-text-primary);
      }
      .wcag-info {
        padding: var(--primitive-spacing-3);
        background: var(--semantic-surface-background-secondary);
        border-radius: var(--primitive-border-radius-md);
      }
      .wcag-info h4 {
        font-size: var(--primitive-font-size-sm);
        margin-bottom: var(--primitive-spacing-2);
      }
      .wcag-info ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .wcag-info li {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-1);
      }

      /* Color Generator Styles */
      .color-generator-controls {
        margin-bottom: var(--primitive-spacing-4);
      }
      .color-input-group {
        display: flex;
        gap: var(--primitive-spacing-3);
        align-items: flex-end;
      }
      .color-generator-controls fui-input {
        flex: 1;
      }
      .color-picker-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-1);
      }
      .color-picker-label {
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-primary);
      }
      .color-picker-input {
        width: 4rem;
        height: 2.5rem;
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        cursor: pointer;
        background: var(--semantic-surface-card);
        transition: border-color 0.2s ease;
      }
      .color-picker-input:hover {
        border-color: var(--semantic-brand-primary);
      }
      .color-picker-input:focus {
        outline: 2px solid var(--semantic-state-focus-ring);
        outline-offset: 2px;
      }
      .generator-buttons {
        display: flex;
        gap: var(--primitive-spacing-2);
        margin-top: var(--primitive-spacing-3);
        flex-wrap: wrap;
      }
      .generated-colors h4 {
        font-size: var(--primitive-font-size-base);
        margin-bottom: var(--primitive-spacing-3);
      }
      .generated-color-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--primitive-spacing-2);
        margin-bottom: var(--primitive-spacing-2);
      }
      .generated-color-item {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
        padding: var(--primitive-spacing-2);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        cursor: pointer;
        transition: all 0.2s;
      }
      .generated-color-item:hover {
        border-color: var(--semantic-brand-primary);
        background: var(--semantic-surface-background-secondary);
      }
      .generated-color-preview {
        width: 48px;
        height: 48px;
        border-radius: var(--primitive-border-radius-md);
        box-shadow: var(--primitive-shadow-sm);
      }
      .generated-color-value {
        font-family: monospace;
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-primary);
      }
      .hint {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-tertiary);
        text-align: center;
        font-style: italic;
      }

      /* Presets Section */
      .presets-section {
        margin-bottom: var(--primitive-spacing-6);
      }

      .presets-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--primitive-spacing-4);
      }

      .presets-description {
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        margin-top: var(--primitive-spacing-1);
      }

      .presets-actions {
        display: flex;
        gap: var(--primitive-spacing-2);
      }

      .presets-compact {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-3);
        margin-bottom: var(--primitive-spacing-4);
        padding: var(--primitive-spacing-4);
        background-color: var(--semantic-surface-background-secondary);
        border-radius: var(--primitive-border-radius-lg);
      }

      .preset-label {
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-secondary);
      }

      .preset-selector-wrapper {
        position: relative;
        width: 100%;
      }

      .preset-selector {
        width: 100%;
        padding: var(--primitive-spacing-3) var(--primitive-spacing-10) var(--primitive-spacing-3)
          var(--primitive-spacing-3);
        background-color: var(--semantic-surface-card);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-primary);
        cursor: pointer;
        appearance: none;
        transition: all 0.2s;
      }

      .preset-selector:hover {
        border-color: var(--semantic-brand-primary);
      }

      .preset-selector:focus {
        outline: 2px solid var(--semantic-brand-primary);
        outline-offset: 2px;
      }

      .preset-selector-icon {
        position: absolute;
        right: var(--primitive-spacing-3);
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: var(--semantic-text-secondary);
        stroke-width: 2;
      }

      .preset-colors-preview {
        display: flex;
        flex-wrap: wrap;
        gap: var(--primitive-spacing-2);
      }

      .preset-quick-button {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        background-color: var(--semantic-surface-card);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        cursor: pointer;
        transition: all 0.2s;
        font-size: var(--primitive-font-size-xs);
      }

      .preset-quick-button:hover {
        border-color: var(--semantic-brand-primary);
        transform: translateY(-1px);
        box-shadow: var(--primitive-shadow-sm);
      }

      .preset-color-swatch {
        width: 20px;
        height: 20px;
        border-radius: var(--primitive-border-radius-sm);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
      }

      .preset-quick-name {
        color: var(--semantic-text-secondary);
        font-weight: var(--primitive-font-weight-medium);
      }

      /* Saved Themes */
      .saved-themes-section {
        margin-top: var(--primitive-spacing-6);
        padding-top: var(--primitive-spacing-6);
        border-top: 1px solid var(--semantic-border-default);
      }

      .saved-themes-section h3 {
        font-size: var(--primitive-font-size-lg);
        margin-bottom: var(--primitive-spacing-4);
      }

      .saved-themes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--primitive-spacing-3);
      }

      .saved-theme-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--primitive-spacing-3);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        transition: all 0.2s;
      }

      .saved-theme-card:hover {
        border-color: var(--semantic-brand-primary);
      }

      .saved-theme-info {
        flex: 1;
        cursor: pointer;
      }

      .saved-theme-info h4 {
        font-size: var(--primitive-font-size-sm);
        margin-bottom: 2px;
      }

      .saved-theme-date {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-tertiary);
      }

      /* Delete button in saved themes - custom color override */
      .saved-theme-card fui-button svg {
        color: var(--semantic-feedback-error);
      }

      .saved-theme-card fui-button:hover svg {
        color: var(--semantic-feedback-error);
      }

      .theme-builder-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--primitive-spacing-6);
      }

      .token-editor h2 {
        margin-bottom: var(--primitive-spacing-4);
      }

      .live-preview h2 {
        margin: 0;
      }

      .preview-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--primitive-spacing-4);
        gap: var(--primitive-spacing-4);
      }

      .preview-mode-toggle {
        display: flex;
        gap: var(--primitive-spacing-2);
        flex-shrink: 0;
      }

      .token-section {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-6);
      }

      .token-category {
        padding: var(--primitive-spacing-4) 0;
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .token-category:last-child {
        border-bottom: none;
      }

      .token-category h3 {
        font-size: var(--primitive-font-size-lg);
        margin-bottom: var(--primitive-spacing-2);
      }

      .category-description {
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-4);
      }

      .token-grid {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-4);
      }

      .token-item {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-3);
        width: 100%;
      }

      .dual-token-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--primitive-spacing-4);
        width: 100%;
      }

      .mode-input-group {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-2);
        min-width: 0; /* Allows flex items to shrink below content size */
      }

      .mode-input-label {
        font-size: var(--primitive-font-size-xs);
        font-weight: 600;
        color: var(--semantic-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--primitive-spacing-1);
      }

      .token-label {
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-primary);
        display: block;
        margin-bottom: var(--primitive-spacing-1);
      }

      .token-description {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-secondary);
        display: block;
        margin-top: 2px;
      }

      .token-input-wrapper {
        display: flex;
        gap: var(--primitive-spacing-2);
        align-items: center;
        width: 100%;
        min-width: 0;
      }

      .color-input {
        width: 48px;
        height: 38px;
        min-width: 48px;
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        cursor: pointer;
        flex-shrink: 0;
      }

      .color-input::-webkit-color-swatch-wrapper {
        padding: 2px;
      }

      .color-input::-webkit-color-swatch {
        border: none;
        border-radius: 4px;
      }

      .text-input {
        flex: 1;
        min-width: 0;
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        font-size: var(--primitive-font-size-sm);
        font-family: var(--primitive-font-family-mono);
        background-color: var(--semantic-surface-card);
        color: var(--semantic-text-primary);
      }

      .text-input.full-width {
        width: 100%;
      }

      .text-input:focus {
        outline: none;
        border-color: var(--semantic-brand-primary);
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
      }

      .preview-description {
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-4);
      }

      .preview-container {
        padding: var(--primitive-spacing-4);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        background-color: var(--semantic-surface-background-secondary);
        transition:
          background-color 0.3s ease,
          border-color 0.3s ease;
      }

      /* Dark Mode Preview - Override all color tokens */
      .preview-container[data-preview-theme='dark'] {
        /* Semantic: Brand Colors */
        --semantic-brand-primary: var(--semantic-brand-primary-dark, #6b7fed);
        --semantic-brand-secondary: var(--semantic-brand-secondary-dark, #8b95a5);
        --semantic-brand-primary-subtle: var(--semantic-brand-primary-subtle-dark, #2a2e3f);

        /* Semantic: Feedback Colors */
        --semantic-feedback-success: var(--semantic-feedback-success-dark, #4ade80);
        --semantic-feedback-warning: var(--semantic-feedback-warning-dark, #fbbf24);
        --semantic-feedback-error: var(--semantic-feedback-error-dark, #f87171);
        --semantic-feedback-info: var(--semantic-feedback-info-dark, #60a5fa);

        /* Semantic: Surface Colors */
        --semantic-surface-background: var(--semantic-surface-background-dark, #1a1d29);
        --semantic-surface-card: var(--semantic-surface-card-dark, #232734);
        --semantic-surface-background-secondary: var(
          --semantic-surface-background-secondary-dark,
          #2a2e3f
        );

        /* Semantic: Text Colors */
        --semantic-text-primary: var(--semantic-text-primary-dark, #e5e7eb);
        --semantic-text-secondary: var(--semantic-text-secondary-dark, #9ca3af);
        --semantic-text-tertiary: var(--semantic-text-tertiary-dark, #6b7280);
        --semantic-text-disabled: var(--semantic-text-disabled-dark, #4b5563);
        --semantic-text-inverse: var(--semantic-text-inverse-dark, #000000);

        /* Semantic: Border Colors */
        --semantic-border-default: var(--semantic-border-default-dark, #374151);
        --semantic-border-subtle: var(--semantic-border-subtle-dark, #4b5563);
        --semantic-border-strong: var(--semantic-border-strong-dark, #6b7280);

        /* Component: Card */
        --component-card-background: var(--semantic-surface-card-dark, #232734);
        --component-card-border: var(--semantic-border-default-dark, #374151);

        /* Component: Input */
        --component-input-default-background: var(--semantic-surface-card-dark, #232734);
        --component-input-default-text: var(--semantic-text-primary-dark, #e5e7eb);
        --component-input-default-border: var(--semantic-border-default-dark, #374151);
        --component-input-default-placeholder: var(--semantic-text-tertiary-dark, #6b7280);
        --component-input-hover-border: var(--semantic-border-strong-dark, #6b7280);
        --component-input-focus-border: var(--semantic-brand-primary-dark, #6b7fed);

        /* Component: Alert */
        --component-alert-info-background: var(
          --semantic-surface-background-secondary-dark,
          #2a2e3f
        );
        --component-alert-info-text: var(--semantic-text-primary-dark, #e5e7eb);
        --component-alert-info-border: var(--semantic-border-default-dark, #374151);
      }

      .preview-container h4,
      .preview-container h1,
      .preview-container h2,
      .preview-container h3,
      .preview-container p {
        color: var(--semantic-text-primary);
      }

      .preview-section {
        margin-bottom: var(--primitive-spacing-6);
      }

      .preview-section:last-child {
        margin-bottom: 0;
      }

      .preview-section h4 {
        font-size: var(--primitive-font-size-base);
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      .preview-row {
        display: flex;
        gap: var(--primitive-spacing-3);
        margin-bottom: var(--primitive-spacing-3);
        flex-wrap: wrap;
      }

      .color-swatches {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: var(--primitive-spacing-3);
      }

      .color-swatch {
        aspect-ratio: 1;
        border-radius: var(--primitive-border-radius-md);
        display: flex;
        align-items: flex-end;
        padding: var(--primitive-spacing-2);
        box-shadow: var(--primitive-shadow-sm);
      }

      .color-swatch span {
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-medium);
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      /* Modal content styles */
      ::ng-deep fui-modal p {
        margin-bottom: var(--primitive-spacing-4);
        color: var(--semantic-text-secondary);
      }

      ::ng-deep fui-modal .export-options {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-3);
        margin-top: var(--primitive-spacing-4);
      }

      ::ng-deep fui-modal fui-input {
        display: block;
        margin-top: var(--primitive-spacing-2);
      }

      ::ng-deep fui-modal [slot='footer'] {
        display: flex;
        gap: var(--primitive-spacing-2);
        justify-content: flex-end;
      }

      /* Inline contrast badges */
      .inline-contrast-checks {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-1);
        margin-top: var(--primitive-spacing-2);
      }

      .inline-contrast-check {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--primitive-spacing-2);
      }

      .inline-contrast-label {
        font-size: 0.6875rem;
        color: var(--semantic-text-tertiary);
        flex: 1;
        line-height: 1.2;
      }

      .inline-contrast-badges {
        display: flex;
        gap: var(--primitive-spacing-1);
        flex-shrink: 0;
      }

      .inline-contrast-badge {
        font-size: 0.625rem;
        font-weight: 600;
        padding: 0.125rem 0.375rem;
        border-radius: var(--primitive-border-radius-sm);
        cursor: default;
        white-space: nowrap;
      }

      .inline-contrast-badge--aaa {
        background-color: #dcfce7;
        color: #166534;
      }

      .inline-contrast-badge--aa {
        background-color: #fef9c3;
        color: #854d0e;
      }

      .inline-contrast-badge--fail {
        background-color: #fee2e2;
        color: #991b1b;
      }

      /* Brand color generator panel controls */
      .brand-generator-controls {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-4);
      }

      .brand-color-preview {
        display: flex;
        gap: var(--primitive-spacing-3);
        align-items: center;
      }

      .brand-color-swatch {
        width: 3rem;
        height: 3rem;
        border-radius: var(--primitive-border-radius-md);
        border: 1px solid var(--semantic-border-default);
        flex-shrink: 0;
      }

      .brand-color-swatch--text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: 700;
        color: #ffffff;
        mix-blend-mode: difference;
      }

      @media (max-width: 1200px) {
        .theme-builder-layout {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 1024px) {
        .dual-token-inputs {
          grid-template-columns: 1fr;
          gap: var(--primitive-spacing-3);
        }

        .mode-input-group {
          padding: var(--primitive-spacing-3);
          border: 1px solid var(--semantic-border-default);
          border-radius: var(--primitive-border-radius-md);
          background-color: var(--semantic-surface-background-secondary);
        }
      }

      @media (max-width: 1024px) {
        .action-toolbar {
          flex-wrap: wrap;
          gap: var(--primitive-spacing-3);
        }

        .toolbar-section {
          flex-wrap: wrap;
        }

        .toolbar-divider {
          display: none;
        }

        .toolbar-label {
          width: 100%;
          margin-bottom: var(--primitive-spacing-1);
        }
      }

      @media (max-width: 768px) {
        .action-toolbar {
          position: relative;
          flex-direction: column;
          align-items: stretch;
          padding: var(--primitive-spacing-3);
          background-color: var(--semantic-surface-background);
        }

        .toolbar-section {
          flex-direction: column;
          align-items: stretch;
          gap: var(--primitive-spacing-2);
          padding: var(--primitive-spacing-3);
          border: 1px solid var(--semantic-border-subtle);
          border-radius: var(--primitive-border-radius-md);
          background: var(--semantic-surface-card);
        }

        .toolbar-buttons {
          flex-direction: column;
          width: 100%;
        }

        .toolbar-buttons fui-button {
          width: 100%;
          justify-content: flex-start;
        }

        .preview-header {
          flex-direction: column;
          align-items: stretch;
        }

        .preview-mode-toggle {
          width: 100%;
        }

        .preview-mode-toggle fui-button {
          flex: 1;
        }

        .utility-panel {
          width: 90%;
          right: 5%;
        }
      }
    `,
  ],
})
export class ThemeBuilderComponent {
  // Services
  private readonly themeService = inject(ThemeService);
  private readonly themeGenerator = inject(ThemeGeneratorService);

  // Loading state for skeleton loaders
  protected readonly isInitializing = signal(true);

  protected readonly showExportModal = signal(false);
  protected readonly showSaveModal = signal(false);
  protected readonly showAccessibilityChecker = signal(false);
  protected readonly showColorGenerator = signal(false);
  protected readonly showBrandColorGenerator = signal(false);
  protected readonly saveThemeName = signal('');
  protected readonly themePresets = THEME_PRESETS;
  protected readonly savedThemes = signal<SavedThemeRecord[]>([]);
  protected readonly editableThemeFamilyMetadata = signal<EditableThemeFamilyMetadata>({
    id: 'default',
    name: 'Default',
    description: 'Default paired light and dark theme family',
    author: 'UI Suite',
    version: '1.0.0',
  });

  // Brand Color Generator
  protected readonly brandGeneratorColor = signal('#3b82f6');
  protected readonly brandGeneratorThemeName = signal('My Brand Theme');
  protected readonly brandGeneratorError = signal('');

  protected onPresetChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const presetId = select.value;
    const preset = this.themePresets.find((p) => p.id === presetId);
    if (preset) {
      this.applyPreset(preset);
      select.value = ''; // Reset dropdown
    }
  }

  // Preview Mode follows the active ThemeService mode.
  protected readonly previewMode = computed<'light' | 'dark'>(() =>
    this.themeService.currentThemeMode() === 'dark' ? 'dark' : 'light'
  );
  protected readonly isPreviewingDark = computed(() => this.previewMode() === 'dark');

  // Undo/Redo History
  private readonly history: HistoryEntry[] = [];
  private historyIndex = -1;
  protected readonly canUndo = signal(false);
  protected readonly canRedo = signal(false);

  // Accessibility Checker
  protected readonly contrastChecks = signal<
    Array<{ label: string; foreground: string; background: string; ratio: number; level: string }>
  >([]);

  // Color Generator
  protected readonly generatedColors = signal<string[]>([]);
  protected baseColorForGeneration = '#3b82f6';

  // Tracks dark-token mutations so the contrast map reacts to dark edits
  private readonly darkTokenVersion = signal(0);

  /**
   * Defines the foreground/background token pairs to check for WCAG contrast.
   * Each entry represents a meaningful color relationship in the design system.
   */
  private readonly CONTRAST_PAIRS: Array<{
    foreground: string;
    background: string;
    label: string;
  }> = [
    {
      foreground: '--semantic-text-primary',
      background: '--semantic-surface-background',
      label: 'Primary text / Background',
    },
    {
      foreground: '--semantic-text-primary',
      background: '--semantic-surface-card',
      label: 'Primary text / Card',
    },
    {
      foreground: '--semantic-text-secondary',
      background: '--semantic-surface-background',
      label: 'Secondary text / Background',
    },
    {
      foreground: '--semantic-brand-primary',
      background: '--semantic-surface-background',
      label: 'Brand / Background',
    },
    {
      foreground: '--semantic-text-inverse',
      background: '--semantic-brand-primary',
      label: 'Inverse text / Brand',
    },
  ];

  /**
   * Maps each token name to its relevant contrast check results for both
   * light and dark modes. Reacts to color category changes and dark-token edits.
   */
  protected readonly inlineContrastMap = computed(() => {
    this.colorCategories(); // reactive dependency for light values
    this.darkTokenVersion(); // reactive dependency for dark values

    const getLightValue = (tokenName: string): string => {
      const cats = this.colorCategories();
      for (const cat of cats) {
        const tok = cat.tokens.find((t) => t.name === tokenName);
        if (tok) return tok.value;
      }
      return '';
    };

    const getDarkValue = (tokenName: string): string => {
      const stored = document.documentElement.style.getPropertyValue(`${tokenName}-dark`).trim();
      return stored || getLightValue(tokenName);
    };

    const map = new Map<string, Array<{
      pairLabel: string;
      lightRatio: number;
      lightLevel: string;
      darkRatio: number;
      darkLevel: string;
    }>>();

    for (const pair of this.CONTRAST_PAIRS) {
      const lightFg = getLightValue(pair.foreground);
      const lightBg = getLightValue(pair.background);
      const darkFg = getDarkValue(pair.foreground);
      const darkBg = getDarkValue(pair.background);

      const isValidHex = (v: string) => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(v);

      if (!isValidHex(lightFg) || !isValidHex(lightBg) || !isValidHex(darkFg) || !isValidHex(darkBg)) {
        continue;
      }

      const lightRatio = getContrastRatio(lightFg, lightBg);
      const darkRatio = getContrastRatio(darkFg, darkBg);

      const entry = {
        pairLabel: pair.label,
        lightRatio,
        lightLevel: getWCAGLevel(lightRatio, 'normal'),
        darkRatio,
        darkLevel: getWCAGLevel(darkRatio, 'normal'),
      };

      // Both the foreground and background tokens receive the badge
      for (const tokenName of [pair.foreground, pair.background]) {
        const existing = map.get(tokenName) ?? [];
        existing.push(entry);
        map.set(tokenName, existing);
      }
    }

    return map;
  });

  // Theme tokens organized by category
  protected readonly colorCategories = signal<ThemeCategory[]>([
    {
      id: 'brand',
      name: 'Brand Colors',
      description: 'Primary brand colors and variations',
      tokens: [
        {
          name: '--semantic-brand-primary',
          value: this.getComputedToken('--semantic-brand-primary'),
          type: 'color',
          category: 'brand',
        },
        {
          name: '--semantic-brand-secondary',
          value: this.getComputedToken('--semantic-brand-secondary'),
          type: 'color',
          category: 'brand',
        },
        {
          name: '--semantic-brand-primary-subtle',
          value: this.getComputedToken('--semantic-brand-primary-subtle'),
          type: 'color',
          category: 'brand',
        },
      ],
    },
    {
      id: 'semantic',
      name: 'Semantic Colors',
      description: 'Success, warning, error, and info colors',
      tokens: [
        {
          name: '--semantic-feedback-success',
          value: this.getComputedToken('--semantic-feedback-success'),
          type: 'color',
          category: 'semantic',
        },
        {
          name: '--semantic-feedback-warning',
          value: this.getComputedToken('--semantic-feedback-warning'),
          type: 'color',
          category: 'semantic',
        },
        {
          name: '--semantic-feedback-error',
          value: this.getComputedToken('--semantic-feedback-error'),
          type: 'color',
          category: 'semantic',
        },
        {
          name: '--semantic-feedback-info',
          value: this.getComputedToken('--semantic-feedback-info'),
          type: 'color',
          category: 'semantic',
        },
      ],
    },
    {
      id: 'surfaces',
      name: 'Surface Colors',
      description: 'Background and surface colors',
      tokens: [
        {
          name: '--semantic-surface-background',
          value: this.getComputedToken('--semantic-surface-background'),
          type: 'color',
          category: 'surfaces',
        },
        {
          name: '--semantic-surface-card',
          value: this.getComputedToken('--semantic-surface-card'),
          type: 'color',
          category: 'surfaces',
        },
        {
          name: '--semantic-surface-background-secondary',
          value: this.getComputedToken('--semantic-surface-background-secondary'),
          type: 'color',
          category: 'surfaces',
        },
      ],
    },
    {
      id: 'text',
      name: 'Text Colors',
      description: 'Text color hierarchy',
      tokens: [
        {
          name: '--semantic-text-primary',
          value: this.getComputedToken('--semantic-text-primary'),
          type: 'color',
          category: 'text',
        },
        {
          name: '--semantic-text-secondary',
          value: this.getComputedToken('--semantic-text-secondary'),
          type: 'color',
          category: 'text',
        },
        {
          name: '--semantic-text-tertiary',
          value: this.getComputedToken('--semantic-text-tertiary'),
          type: 'color',
          category: 'text',
        },
        {
          name: '--semantic-text-inverse',
          value: this.getComputedToken('--semantic-text-inverse'),
          type: 'color',
          category: 'text',
        },
      ],
    },
  ]);

  protected readonly typographyCategories = signal<ThemeCategory[]>([
    {
      id: 'fonts',
      name: 'Font Families',
      description: 'Typography font stacks',
      tokens: [
        {
          name: '--primitive-font-family-sans',
          value: this.getComputedToken('--primitive-font-family-sans'),
          type: 'font',
          category: 'fonts',
        },
        {
          name: '--primitive-font-family-mono',
          value: this.getComputedToken('--primitive-font-family-mono'),
          type: 'font',
          category: 'fonts',
        },
      ],
    },
    {
      id: 'sizes',
      name: 'Font Sizes',
      description: 'Typography size scale',
      tokens: [
        {
          name: '--primitive-font-size-xs',
          value: this.getComputedToken('--primitive-font-size-xs'),
          type: 'size',
          category: 'sizes',
        },
        {
          name: '--primitive-font-size-sm',
          value: this.getComputedToken('--primitive-font-size-sm'),
          type: 'size',
          category: 'sizes',
        },
        {
          name: '--primitive-font-size-base',
          value: this.getComputedToken('--primitive-font-size-base'),
          type: 'size',
          category: 'sizes',
        },
        {
          name: '--primitive-font-size-lg',
          value: this.getComputedToken('--primitive-font-size-lg'),
          type: 'size',
          category: 'sizes',
        },
        {
          name: '--primitive-font-size-xl',
          value: this.getComputedToken('--primitive-font-size-xl'),
          type: 'size',
          category: 'sizes',
        },
      ],
    },
  ]);

  protected readonly spacingCategories = signal<ThemeCategory[]>([
    {
      id: 'spacing',
      name: 'Spacing Scale',
      description: 'Consistent spacing values',
      tokens: [
        {
          name: '--primitive-spacing-1',
          value: this.getComputedToken('--primitive-spacing-1'),
          type: 'size',
          category: 'spacing',
        },
        {
          name: '--primitive-spacing-2',
          value: this.getComputedToken('--primitive-spacing-2'),
          type: 'size',
          category: 'spacing',
        },
        {
          name: '--primitive-spacing-3',
          value: this.getComputedToken('--primitive-spacing-3'),
          type: 'size',
          category: 'spacing',
        },
        {
          name: '--primitive-spacing-4',
          value: this.getComputedToken('--primitive-spacing-4'),
          type: 'size',
          category: 'spacing',
        },
        {
          name: '--primitive-spacing-6',
          value: this.getComputedToken('--primitive-spacing-6'),
          type: 'size',
          category: 'spacing',
        },
        {
          name: '--primitive-spacing-8',
          value: this.getComputedToken('--primitive-spacing-8'),
          type: 'size',
          category: 'spacing',
        },
      ],
    },
    {
      id: 'radius',
      name: 'Border Radius',
      description: 'Corner rounding values',
      tokens: [
        {
          name: '--primitive-border-radius-sm',
          value: this.getComputedToken('--primitive-border-radius-sm'),
          type: 'size',
          category: 'radius',
        },
        {
          name: '--primitive-border-radius-md',
          value: this.getComputedToken('--primitive-border-radius-md'),
          type: 'size',
          category: 'radius',
        },
        {
          name: '--primitive-border-radius-lg',
          value: this.getComputedToken('--primitive-border-radius-lg'),
          type: 'size',
          category: 'radius',
        },
        {
          name: '--primitive-border-radius-full',
          value: this.getComputedToken('--primitive-border-radius-full'),
          type: 'size',
          category: 'radius',
        },
      ],
    },
  ]);

  // Computed property to trigger updates when color categories change
  protected readonly previewStyles = computed(() => {
    // This ensures the preview updates when tokens change
    this.colorCategories();
    return '';
  });

  constructor() {
    // Load saved themes from localStorage
    this.loadSavedThemesList();

    const initialFamily =
      this.themeService.currentThemeFamily() ?? this.themeService.getThemeFamily('default');
    if (initialFamily) {
      this.loadThemeFamilyIntoEditor(initialFamily);
    }

    // Initialize accessibility checks
    this.updateAccessibilityChecks();

    // Keep the active ThemeService family in sync with the editor state.
    effect(() => {
      this.colorCategories();
      this.typographyCategories();
      this.spacingCategories();

      untracked(() => {
        this.syncThemeFamilyWithService();
        this.updateAccessibilityChecks();
      });
    });

    // Hide skeleton loaders after the next render cycle (Angular best practice)
    afterNextRender(() => {
      this.isInitializing.set(false);
    });
  }

  private loadThemeFamilyIntoEditor(themeFamily: ThemeFamily): void {
    this.editableThemeFamilyMetadata.set({
      id: themeFamily.metadata.id,
      name: themeFamily.metadata.name,
      description: themeFamily.metadata.description || '',
      author: themeFamily.metadata.author || themeFamily.light.metadata.author || 'UI Suite',
      version: themeFamily.metadata.version,
    });
    this.refreshCategoriesFromTheme(themeFamily.light);
    this.applyDarkThemeTokens(themeFamily.dark);
  }

  private applyDarkThemeTokens(theme: Theme): void {
    this.colorCategories().forEach((category) => {
      category.tokens.forEach((token) => {
        const value = this.getTokenValueFromTheme(theme, token.name) || token.value;
        document.documentElement.style.setProperty(`${token.name}-dark`, value);
      });
    });
  }

  private syncThemeFamilyWithService(activate = false): ThemeFamily {
    const themeFamily = this.buildEditableThemeFamily();
    this.themeService.registerThemeFamily(themeFamily);

    if (activate) {
      this.themeService.setThemeFamily(themeFamily.metadata.id);
    }

    return themeFamily;
  }

  private buildEditableThemeFamily(
    metadata: EditableThemeFamilyMetadata = this.editableThemeFamilyMetadata()
  ): ThemeFamily {
    const bundle = this.buildCurrentThemeTokenBundle(metadata);

    return convertPresetToThemeFamily({
      id: bundle.metadata.id,
      name: bundle.metadata.name,
      description: bundle.metadata.description || '',
      author: bundle.metadata.author || 'UI Suite',
      light: bundle.light,
      dark: bundle.dark,
      tokens: bundle.light,
    });
  }

  private buildCurrentThemeTokenBundle(
    metadata: EditableThemeFamilyMetadata = this.editableThemeFamilyMetadata()
  ): ThemeFamilyTokenBundle {
    const allCategories = [
      ...this.colorCategories(),
      ...this.typographyCategories(),
      ...this.spacingCategories(),
    ];
    const lightTokens: Record<string, string> = {};
    const darkTokens: Record<string, string> = {};

    allCategories.forEach((category) => {
      category.tokens.forEach((token) => {
        lightTokens[token.name] = token.value;
        darkTokens[token.name] =
          token.category === 'brand' || token.type === 'color'
            ? this.getDarkTokenValue(token.name)
            : token.value;
      });
    });

    return createThemeFamilyTokenBundle(metadata.name, lightTokens, darkTokens, {
      id: metadata.id,
      description: metadata.description,
      author: metadata.author,
      version: metadata.version,
    });
  }

  // Keyboard shortcuts
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.undo();
    } else if (
      ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
      ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z')
    ) {
      event.preventDefault();
      this.redo();
    }
  }

  private getComputedToken(tokenName: string): string {
    const currentFamily = this.themeService.currentThemeFamily();
    if (currentFamily) {
      const familyValue = this.getTokenValueFromTheme(currentFamily.light, tokenName);
      if (familyValue) {
        return familyValue;
      }
    }

    const resolvedThemeValue = this.getTokenValueFromTheme(
      this.themeService.getResolvedTheme(),
      tokenName
    );
    if (resolvedThemeValue) {
      return resolvedThemeValue;
    }

    const value = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
    return this.resolveCssVariableReference(value);
  }

  private resolveCssVariableReference(value: string, depth = 0): string {
    if (!value.startsWith('var(--') || depth > 8) {
      return value;
    }

    const variableName = value.slice(4, -1).trim();
    const resolvedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();

    if (!resolvedValue || resolvedValue === value) {
      return value;
    }

    return this.resolveCssVariableReference(resolvedValue, depth + 1);
  }

  protected formatTokenName(name: string): string {
    return name
      .replace(/^--/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Direct token update (handles both light and dark)
  protected updateTokenDirect(
    tokenName: string,
    value: string,
    isDark: boolean,
    recordHistory = true
  ): void {
    // Get old value for history
    const oldValue = getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();

    // For light mode updates, update the category signals
    if (!isDark) {
      const baseTokenName = tokenName.replace('-dark', '');
      const updateInCategory = (categories: ThemeCategory[]) => {
        return categories.map((category) => ({
          ...category,
          tokens: category.tokens.map((token) =>
            token.name === baseTokenName ? { ...token, value } : token
          ),
        }));
      };

      if (
        baseTokenName.includes('color') ||
        baseTokenName.includes('brand') ||
        baseTokenName.includes('semantic') ||
        baseTokenName.includes('surface') ||
        baseTokenName.includes('text')
      ) {
        this.colorCategories.set(updateInCategory(this.colorCategories()));
      } else if (baseTokenName.includes('font')) {
        this.typographyCategories.set(updateInCategory(this.typographyCategories()));
      } else {
        this.spacingCategories.set(updateInCategory(this.spacingCategories()));
      }
    }

    // Apply to document
    document.documentElement.style.setProperty(tokenName, value);

    // Record in history
    if (recordHistory && oldValue !== value) {
      this.addToHistory(tokenName, oldValue, value);
    }
  }

  // Legacy method for backwards compatibility
  protected updateToken(tokenName: string, value: string): void {
    this.updateLightToken(tokenName, value);
  }

  protected resetTheme(): void {
    // Reload the page to reset to default theme
    window.location.reload();
  }

  protected exportTheme(): void {
    this.showExportModal.set(true);
  }

  protected closeExportModal(): void {
    this.showExportModal.set(false);
  }

  protected exportAsCSS(): void {
    const colorCategories = this.colorCategories();
    const typographyCategories = this.typographyCategories();
    const spacingCategories = this.spacingCategories();
    const allCategories = [...colorCategories, ...typographyCategories, ...spacingCategories];

    let css = '/* Light Mode (Default) */\n:root {\n';
    allCategories.forEach((category) => {
      css += `  /* ${category.name} */\n`;
      category.tokens.forEach((token) => {
        css += `  ${token.name}: ${token.value};\n`;
      });
      css += '\n';
    });
    css += '}\n\n';

    css += '/* Dark Mode */\n:root[data-theme-mode="dark"],\n[data-theme-mode="dark"] {\n';
    // Only export dark variants for color tokens
    colorCategories.forEach((category) => {
      css += `  /* ${category.name} - Dark */\n`;
      category.tokens.forEach((token) => {
        const darkValue =
          getComputedStyle(document.documentElement)
            .getPropertyValue(`${token.name}-dark`)
            .trim() || token.value;
        css += `  ${token.name}: ${darkValue};\n`;
      });
      css += '\n';
    });
    css += '}';

    this.downloadFile('theme.css', css, 'text/css');
    this.closeExportModal();
  }

  protected exportAsJSON(): void {
    const json = JSON.stringify(this.buildEditableThemeFamily(), null, 2);
    this.downloadFile('theme.json', json, 'application/json');
    this.closeExportModal();
  }

  protected exportAsTypeScript(): void {
    const themeFamily = JSON.stringify(this.buildEditableThemeFamily(), null, 2);
    let ts = "import type { ThemeFamily } from '@ui-suite/theming';\n\n";
    ts += `export const customThemeFamily: ThemeFamily = ${themeFamily};\n`;

    this.downloadFile('theme.ts', ts, 'text/typescript');
    this.closeExportModal();
  }

  private downloadFile(filename: string, content: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Preset Management
  protected applyPreset(preset: ThemePreset): void {
    const themeFamily = convertPresetToThemeFamily(preset);

    this.loadThemeFamilyIntoEditor(themeFamily);
    this.themeService.setCustomThemeFamily(themeFamily);
  }

  /**
   * Refresh local token categories from a theme object
   */
  private refreshCategoriesFromTheme(theme: Theme): void {
    // Update color categories
    const colorCats = this.colorCategories();
    colorCats.forEach((category) => {
      category.tokens.forEach((token) => {
        // Extract value from theme based on token name
        const value = this.getTokenValueFromTheme(theme, token.name);
        if (value) {
          token.value = value;
        }
      });
    });
    this.colorCategories.set([...colorCats]);

    // Update typography categories
    const typoCats = this.typographyCategories();
    typoCats.forEach((category) => {
      category.tokens.forEach((token) => {
        const value = this.getTokenValueFromTheme(theme, token.name);
        if (value) {
          token.value = value;
        }
      });
    });
    this.typographyCategories.set([...typoCats]);

    // Update spacing categories
    const spacingCats = this.spacingCategories();
    spacingCats.forEach((category) => {
      category.tokens.forEach((token) => {
        const value = this.getTokenValueFromTheme(theme, token.name);
        if (value) {
          token.value = value;
        }
      });
    });
    this.spacingCategories.set([...spacingCats]);
  }

  /**
   * Extract token value from theme object by CSS variable name
   */
  private getTokenValueFromTheme(theme: Theme, tokenName: string): string | undefined {
    // Map CSS variable names to theme paths
    const mapping: Record<string, string> = {
      '--semantic-brand-primary': theme.semantic.brand.primary,
      '--semantic-brand-secondary': theme.semantic.brand.secondary,
      '--semantic-brand-primary-subtle': theme.semantic.brand.primarySubtle,
      '--semantic-feedback-success': theme.semantic.feedback.success,
      '--semantic-feedback-warning': theme.semantic.feedback.warning,
      '--semantic-feedback-error': theme.semantic.feedback.error,
      '--semantic-feedback-info': theme.semantic.feedback.info,
      '--semantic-surface-background': theme.semantic.surface.background,
      '--semantic-surface-card': theme.semantic.surface.card,
      '--semantic-surface-background-secondary': theme.semantic.surface.backgroundSecondary,
      '--semantic-text-primary': theme.semantic.text.primary,
      '--semantic-text-secondary': theme.semantic.text.secondary,
      '--semantic-text-tertiary': theme.semantic.text.tertiary,
      '--semantic-text-inverse': theme.semantic.text.inverse,
      '--primitive-font-family-sans': theme.primitive.typography.fontFamily.sans,
      '--primitive-font-family-mono': theme.primitive.typography.fontFamily.mono,
      '--primitive-font-size-xs': theme.primitive.typography.fontSize.xs,
      '--primitive-font-size-sm': theme.primitive.typography.fontSize.sm,
      '--primitive-font-size-base': theme.primitive.typography.fontSize.base,
      '--primitive-font-size-lg': theme.primitive.typography.fontSize.lg,
      '--primitive-font-size-xl': theme.primitive.typography.fontSize.xl,
      '--primitive-spacing-1': theme.primitive.spacing[1],
      '--primitive-spacing-2': theme.primitive.spacing[2],
      '--primitive-spacing-3': theme.primitive.spacing[3],
      '--primitive-spacing-4': theme.primitive.spacing[4],
      '--primitive-spacing-6': theme.primitive.spacing[6],
      '--primitive-spacing-8': theme.primitive.spacing[8],
      '--primitive-border-radius-sm': theme.primitive.borderRadius.sm,
      '--primitive-border-radius-md': theme.primitive.borderRadius.md,
      '--primitive-border-radius-lg': theme.primitive.borderRadius.lg,
      '--primitive-border-radius-full': theme.primitive.borderRadius.full,
    };

    return this.resolveThemeTokenValue(theme, mapping[tokenName]);
  }

  private resolveThemeTokenValue(theme: Theme, value: string | undefined): string | undefined {
    if (!value || !value.startsWith('var(--')) {
      return value;
    }

    const variableName = value.slice(4, -1).trim();
    if (!variableName.startsWith('--primitive-')) {
      return value;
    }

    const primitivePath = variableName.replace('--primitive-', '').split('-');

    if (primitivePath.length === 1) {
      const [name] = primitivePath;
      if (name === 'white') {
        return theme.primitive.colors.white;
      }

      if (name === 'black') {
        return theme.primitive.colors.black;
      }
    }

    if (primitivePath.length === 2) {
      const [group, key] = primitivePath;
      const colorGroup = group as keyof Theme['primitive']['colors'];

      if (colorGroup in theme.primitive.colors) {
        const colorValue = theme.primitive.colors[colorGroup];
        if (typeof colorValue === 'object' && key in colorValue) {
          return (colorValue as unknown as Record<string, string>)[key];
        }
      }
    }

    return value;
  }

  // Save/Load Management
  protected showSaveThemeModal(): void {
    this.showSaveModal.set(true);
    this.saveThemeName.set('');
  }

  protected closeSaveModal(): void {
    this.showSaveModal.set(false);
  }

  protected saveCurrentTheme(): void {
    if (!this.saveThemeName().trim()) {
      alert('Please enter a theme name');
      return;
    }

    const metadata = this.createEditableMetadata(this.saveThemeName());
    const bundle = this.buildCurrentThemeTokenBundle(metadata);

    this.editableThemeFamilyMetadata.set(metadata);
    saveTheme(metadata.name, bundle);
    this.syncThemeFamilyWithService(true);
    this.loadSavedThemesList();
    this.closeSaveModal();
  }

  protected loadSavedTheme(name: string): void {
    const savedThemes = getSavedThemes();
    const theme = savedThemes[name];

    if (theme) {
      this.applyImportedThemeBundle(theme.family);

      if (theme.isIncomplete) {
        alert(
          'Loaded a legacy saved theme. Dark tokens were seeded from the light variant and should be reviewed.'
        );
      }
    }
  }

  protected deleteSavedTheme(name: string): void {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteTheme(name);
      this.loadSavedThemesList();
    }
  }

  private loadSavedThemesList(): void {
    const savedThemes = getSavedThemes();
    this.savedThemes.set(Object.values(savedThemes));
  }

  private applyImportedThemeBundle(bundle: ThemeFamilyTokenBundle): void {
    const themeFamily = this.buildThemeFamilyFromBundle(bundle);
    this.loadThemeFamilyIntoEditor(themeFamily);
    this.themeService.setCustomThemeFamily(themeFamily);
  }

  private buildThemeFamilyFromBundle(bundle: ThemeFamilyTokenBundle): ThemeFamily {
    return convertPresetToThemeFamily({
      id: bundle.metadata.id,
      name: bundle.metadata.name,
      description: bundle.metadata.description || '',
      author: bundle.metadata.author || 'UI Suite',
      light: bundle.light,
      dark: bundle.dark,
      tokens: bundle.light,
    });
  }

  private convertThemeFamilyToTokenBundle(themeFamily: ThemeFamily): ThemeFamilyTokenBundle {
    return createThemeFamilyTokenBundle(
      themeFamily.metadata.name,
      this.extractTokensFromTheme(themeFamily.light),
      this.extractTokensFromTheme(themeFamily.dark),
      {
        id: themeFamily.metadata.id,
        description: themeFamily.metadata.description,
        author: themeFamily.metadata.author,
        version: themeFamily.metadata.version,
      }
    );
  }

  private extractTokensFromTheme(theme: Theme): Record<string, string> {
    const tokens: Record<string, string> = {};
    const allCategories = [
      ...this.colorCategories(),
      ...this.typographyCategories(),
      ...this.spacingCategories(),
    ];

    allCategories.forEach((category) => {
      category.tokens.forEach((token) => {
        const value = this.getTokenValueFromTheme(theme, token.name);
        if (value) {
          tokens[token.name] = value;
        }
      });
    });

    return tokens;
  }

  private createEditableMetadata(name: string): EditableThemeFamilyMetadata {
    const currentMetadata = this.editableThemeFamilyMetadata();

    return {
      ...currentMetadata,
      id: this.toThemeId(name),
      name,
    };
  }

  private toThemeId(value: string): string {
    return (
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'custom-theme'
    );
  }

  private getFileBaseName(fileName: string): string {
    return fileName.replace(/\.[^.]+$/, '');
  }

  private isEngineThemeFamily(value: unknown): value is ThemeFamily {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const candidate = value as Partial<ThemeFamily>;
    return (
      !!candidate.metadata &&
      !!candidate.light &&
      !!candidate.dark &&
      'metadata' in candidate.light &&
      'metadata' in candidate.dark
    );
  }

  // Import/Export
  protected importTheme(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  protected handleFileImport(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      try {
        let importedTheme: ThemeFamilyTokenBundle;

        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content) as unknown;
          importedTheme = this.isEngineThemeFamily(parsed)
            ? this.convertThemeFamilyToTokenBundle(parsed)
            : normalizeImportedThemeData(parsed, this.getFileBaseName(file.name));
        } else if (file.name.endsWith('.css')) {
          importedTheme = normalizeImportedThemeData(
            parseCSSVariablesByBlock(content),
            this.getFileBaseName(file.name)
          );
        } else {
          throw new Error('Unsupported file format');
        }

        this.applyImportedThemeBundle(importedTheme);
        alert(
          importedTheme.isIncomplete
            ? `Imported legacy theme family "${importedTheme.metadata.name}". Dark tokens were seeded from the light variant and should be reviewed.`
            : `Successfully imported theme family "${importedTheme.metadata.name}".`
        );
      } catch (error) {
        alert('Error importing theme file. Please check the format.');
        console.error('Import error:', error);
      }
    };

    reader.readAsText(file);

    // Reset input
    input.value = '';
  }

  // Utility
  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  // Undo/Redo Methods
  private addToHistory(tokenName: string, oldValue: string, newValue: string): void {
    // Remove any entries after current history index
    this.history.splice(this.historyIndex + 1);

    // Add new entry
    this.history.push({
      tokenName,
      oldValue,
      newValue,
      timestamp: Date.now(),
    });

    // Limit history to 50 entries
    if (this.history.length > 50) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }

    this.updateHistoryButtons();
  }

  private updateHistoryButtons(): void {
    this.canUndo.set(this.historyIndex >= 0);
    this.canRedo.set(this.historyIndex < this.history.length - 1);
  }

  private applyHistoryEntry(entry: HistoryEntry, value: string): void {
    const isDark = entry.tokenName.endsWith('-dark');

    if (isDark) {
      document.documentElement.style.setProperty(entry.tokenName, value);
    } else {
      this.updateTokenDirect(entry.tokenName, value, false, false);
    }

    this.syncThemeFamilyWithService();
    this.updateAccessibilityChecks();
  }

  protected undo(): void {
    if (!this.canUndo()) return;

    const entry = this.history[this.historyIndex];
    this.applyHistoryEntry(entry, entry.oldValue);
    this.historyIndex--;
    this.updateHistoryButtons();
  }

  protected redo(): void {
    if (!this.canRedo()) return;

    this.historyIndex++;
    const entry = this.history[this.historyIndex];
    this.applyHistoryEntry(entry, entry.newValue);
    this.updateHistoryButtons();
  }

  // Accessibility Checker Methods
  protected toggleAccessibilityChecker(): void {
    this.showAccessibilityChecker.update((v) => !v);
    if (this.showAccessibilityChecker()) {
      this.showColorGenerator.set(false);
      this.showBrandColorGenerator.set(false);
      this.updateAccessibilityChecks();
    }
  }

  private updateAccessibilityChecks(): void {
    const isDark = this.isPreviewingDark();

    // Get appropriate token values based on preview mode
    const getTokenValue = (tokenName: string): string => {
      if (isDark) {
        const darkValue = getComputedStyle(document.documentElement)
          .getPropertyValue(`${tokenName}-dark`)
          .trim();
        return darkValue || this.getComputedToken(tokenName);
      }
      return this.getComputedToken(tokenName);
    };

    const bg = getTokenValue('--semantic-surface-background');
    const card = getTokenValue('--semantic-surface-card');
    const primary = getTokenValue('--semantic-text-primary');
    const secondary = getTokenValue('--semantic-text-secondary');
    const inverse = getTokenValue('--semantic-text-inverse');
    const brandPrimary = getTokenValue('--semantic-brand-primary');

    const checks = [
      {
        label: 'Primary Text on Background',
        foreground: primary,
        background: bg,
        ratio: getContrastRatio(primary, bg),
        level: getWCAGLevel(getContrastRatio(primary, bg), 'normal'),
      },
      {
        label: 'Primary Text on Card',
        foreground: primary,
        background: card,
        ratio: getContrastRatio(primary, card),
        level: getWCAGLevel(getContrastRatio(primary, card), 'normal'),
      },
      {
        label: 'Secondary Text on Background',
        foreground: secondary,
        background: bg,
        ratio: getContrastRatio(secondary, bg),
        level: getWCAGLevel(getContrastRatio(secondary, bg), 'normal'),
      },
      {
        label: 'Brand Primary on Background',
        foreground: brandPrimary,
        background: bg,
        ratio: getContrastRatio(brandPrimary, bg),
        level: getWCAGLevel(getContrastRatio(brandPrimary, bg), 'normal'),
      },
      {
        label: 'Inverse Text on Brand Primary',
        foreground: inverse,
        background: brandPrimary,
        ratio: getContrastRatio(inverse, brandPrimary),
        level: getWCAGLevel(getContrastRatio(inverse, brandPrimary), 'normal'),
      },
    ];

    this.contrastChecks.set(checks);
  }

  // Preview Mode Toggle (for live preview panel only)
  protected togglePreviewMode(): void {
    this.themeService.setThemeMode(this.isPreviewingDark() ? 'light' : 'dark');
    this.updateAccessibilityChecks();
  }

  // Set specific preview mode
  protected setPreviewMode(mode: 'light' | 'dark'): void {
    this.themeService.setThemeMode(mode);
    this.updateAccessibilityChecks();
  }

  // Get dark mode token value
  protected getDarkTokenValue(tokenName: string): string {
    const darkTokenName = `${tokenName}-dark`;
    let darkValue = getComputedStyle(document.documentElement)
      .getPropertyValue(darkTokenName)
      .trim();

    // If no dark value after initialization, get it from the stored property
    if (!darkValue) {
      darkValue = document.documentElement.style.getPropertyValue(darkTokenName).trim();
    }

    // Fallback to light token if dark doesn't exist
    return darkValue || this.getComputedToken(tokenName);
  }

  // Update light mode token
  protected updateLightToken(tokenName: string, value: string): void {
    this.updateTokenDirect(tokenName, value, false);
  }

  // Update dark mode token
  protected updateDarkToken(tokenName: string, value: string): void {
    const darkTokenName = `${tokenName}-dark`;

    // Get old value for history
    const oldValue = getComputedStyle(document.documentElement)
      .getPropertyValue(darkTokenName)
      .trim();

    // Apply to document root
    document.documentElement.style.setProperty(darkTokenName, value);

    // Invalidate the contrast map for dark values
    this.darkTokenVersion.update((v) => v + 1);

    // Record in history
    if (oldValue !== value) {
      this.addToHistory(darkTokenName, oldValue, value);
    }

    this.syncThemeFamilyWithService();
    this.updateAccessibilityChecks();
  }

  // Color Generator Methods
  protected toggleColorGenerator(): void {
    this.showColorGenerator.update((v) => !v);
    if (this.showColorGenerator()) {
      this.showAccessibilityChecker.set(false);
      this.showBrandColorGenerator.set(false);
      // Force re-render of child components after animation starts
      setTimeout(() => {
        this.baseColorForGeneration = this.baseColorForGeneration || '#3b82f6';
      }, 0);
    }
  }

  // Brand Color Generator Methods
  protected toggleBrandColorGenerator(): void {
    this.showBrandColorGenerator.update((v) => !v);
    if (this.showBrandColorGenerator()) {
      this.showAccessibilityChecker.set(false);
      this.showColorGenerator.set(false);
      this.brandGeneratorError.set('');
    }
  }

  /**
   * Generate a complete theme family from the current brand color input.
   * Both light and dark variants are generated and loaded into the editor.
   * The accessibility checker opens automatically after generation.
   */
  protected generateThemeFromBrandColor(): void {
    const color = this.brandGeneratorColor();
    const themeName = this.brandGeneratorThemeName().trim() || 'My Brand Theme';

    if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(color)) {
      this.brandGeneratorError.set('Please enter a valid hex color (e.g., #3b82f6).');
      return;
    }

    this.brandGeneratorError.set('');

    // Resolve base themes — fall back to the registered default if no active family
    const currentFamily = this.themeService.currentThemeFamily();
    const defaultFamily = this.themeService.getThemeFamily('default');
    const lightBase: Theme | undefined = currentFamily?.light ?? defaultFamily?.light;
    const darkBase: Theme | undefined = currentFamily?.dark ?? defaultFamily?.dark;

    if (!lightBase || !darkBase) {
      this.brandGeneratorError.set('Could not resolve a base theme. Please try resetting the theme first.');
      return;
    }

    const lightTheme = this.themeGenerator.createThemeFromBrandColor(color, 'light', themeName, lightBase);
    const darkTheme = this.themeGenerator.createThemeFromBrandColor(color, 'dark', themeName, darkBase);

    // Extract the editor-tracked tokens from both generated themes
    const lightTokens = this.extractTokensFromTheme(lightTheme);
    const darkTokens = this.extractTokensFromTheme(darkTheme);

    const bundle = createThemeFamilyTokenBundle(themeName, lightTokens, darkTokens, {
      id: this.toThemeId(themeName),
      description: `Generated from brand color ${color}`,
      author: this.editableThemeFamilyMetadata().author,
      version: '1.0.0',
    });

    this.applyImportedThemeBundle(bundle);

    // Switch to light preview and open the accessibility checker
    this.setPreviewMode('light');
    this.showBrandColorGenerator.set(false);
    this.showAccessibilityChecker.set(true);
    this.updateAccessibilityChecks();
  }

  /**
   * Returns the inline contrast checks for a given token name.
   * Used in the template to show WCAG badges next to color inputs.
   */
  protected getInlineContrastChecks(tokenName: string): Array<{
    pairLabel: string;
    lightRatio: number;
    lightLevel: string;
    darkRatio: number;
    darkLevel: string;
  }> {
    return this.inlineContrastMap().get(tokenName) ?? [];
  }

  protected generateComplementary(): void {
    if (!isValidHexColor(this.baseColorForGeneration)) {
      alert('Please enter a valid hex color (e.g., #3b82f6)');
      return;
    }

    const complementary = getComplementaryColor(this.baseColorForGeneration);
    this.generatedColors.set([this.baseColorForGeneration, complementary]);
  }

  protected generateAnalogous(): void {
    if (!isValidHexColor(this.baseColorForGeneration)) {
      alert('Please enter a valid hex color (e.g., #3b82f6)');
      return;
    }

    const analogous = getAnalogousColors(this.baseColorForGeneration);
    this.generatedColors.set(analogous);
  }

  protected generateShades(): void {
    if (!isValidHexColor(this.baseColorForGeneration)) {
      alert('Please enter a valid hex color (e.g., #3b82f6)');
      return;
    }

    const shades = generateShades(this.baseColorForGeneration, 7);
    this.generatedColors.set(shades);
  }

  protected copyColorToClipboard(color: string): void {
    navigator.clipboard.writeText(color).then(() => {
      alert(`Copied ${color} to clipboard!`);
    });
  }
}
