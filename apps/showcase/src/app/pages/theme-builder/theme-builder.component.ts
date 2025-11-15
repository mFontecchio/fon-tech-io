/**
 * Theme Builder Page
 * Interactive theme customization tool with live preview and export
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  signal,
  computed,
  effect,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardComponent,
  TabsComponent,
  TabComponent,
  ButtonComponent,
  InputComponent,
  AlertComponent,
  BadgeComponent,
} from '@ui-suite/components';
import { THEME_PRESETS, ThemePreset } from './theme-presets';
import {
  getContrastRatio,
  getWCAGLevel,
  saveTheme,
  getSavedThemes,
  deleteTheme,
  parseCSSVariables,
  isValidHexColor,
  getComplementaryColor,
  getAnalogousColors,
  lightenColor,
  darkenColor,
  generateShades,
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

@Component({
  selector: 'app-theme-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    TabsComponent,
    TabComponent,
    ButtonComponent,
    InputComponent,
    AlertComponent,
    BadgeComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="theme-builder-page">
      <div class="theme-builder-header">
        <div>
          <h1>Theme Builder</h1>
          <p class="subtitle">Customize design tokens for both light and dark modes</p>
        </div>
        <div class="header-actions">
          <div class="history-buttons">
            <ui-button
              variant="outlined"
              size="sm"
              (clicked)="undo()"
              [disabled]="!canUndo()"
              title="Undo (Ctrl+Z)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7v6h6" />
                <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </ui-button>
            <ui-button
              variant="outlined"
              size="sm"
              (clicked)="redo()"
              [disabled]="!canRedo()"
              title="Redo (Ctrl+Y)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 7v6h-6" />
                <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
              </svg>
            </ui-button>
          </div>
          <ui-button variant="outlined" (clicked)="toggleAccessibilityChecker()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            A11y Check
          </ui-button>
          <ui-button variant="outlined" (clicked)="toggleColorGenerator()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
              <circle cx="13.5" cy="6.5" r=".5" />
              <circle cx="17.5" cy="10.5" r=".5" />
              <circle cx="8.5" cy="7.5" r=".5" />
              <circle cx="6.5" cy="12.5" r=".5" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
            Colors
          </ui-button>
          <ui-button variant="outlined" (clicked)="resetTheme()">
            Reset
          </ui-button>
          <ui-button variant="filled" (clicked)="exportTheme()">
            Export
          </ui-button>
        </div>
      </div>

      <!-- Dual Theme Info -->
      <ui-alert variant="info" style="margin-bottom: var(--primitive-spacing-6);">
        <strong>Dual Theme System:</strong> Edit both Light and Dark color modes simultaneously! 
        Each color token has two inputs side-by-side - Light (left) and Dark (right). 
        Typography and spacing tokens are shared between both themes. 
        Use the Light/Dark toggle buttons in the Live Preview section to see your theme in both modes. 
        When you export, both light and dark color tokens will be included for a complete theme solution.
      </ui-alert>

      <!-- Theme Presets & Quick Actions -->
      <div class="presets-section">
        <ui-card>
          <div class="presets-header">
            <div>
              <h2>Theme Presets</h2>
              <p class="presets-description">Start with a pre-made theme or load a saved one</p>
            </div>
            <div class="presets-actions">
              <ui-button variant="outlined" size="sm" (clicked)="importTheme()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import
              </ui-button>
              <ui-button variant="outlined" size="sm" (clicked)="showSaveThemeModal()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="margin-right: 6px;">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save
              </ui-button>
            </div>
          </div>
          
          <div class="presets-grid">
            @for (preset of themePresets; track preset.id) {
              <div class="preset-card" (click)="applyPreset(preset)">
                <div class="preset-info">
                  <h4>{{ preset.name }}</h4>
                  <p>{{ preset.description }}</p>
                  <span class="preset-author">by {{ preset.author }}</span>
                </div>
                <div class="preset-colors">
                  <div class="color-dot" [style.background-color]="preset.tokens['--semantic-brand-primary']"></div>
                  <div class="color-dot" [style.background-color]="preset.tokens['--semantic-success-primary']"></div>
                  <div class="color-dot" [style.background-color]="preset.tokens['--semantic-warning-primary']"></div>
                  <div class="color-dot" [style.background-color]="preset.tokens['--semantic-error-primary']"></div>
                </div>
              </div>
            }
          </div>

          @if (savedThemes().length > 0) {
            <div class="saved-themes-section">
              <h3>Your Saved Themes</h3>
              <div class="saved-themes-grid">
                @for (theme of savedThemes(); track theme.name) {
                  <div class="saved-theme-card">
                    <div class="saved-theme-info" (click)="loadSavedTheme(theme.name)">
                      <h4>{{ theme.name }}</h4>
                      <span class="saved-theme-date">{{ formatDate(theme.createdAt) }}</span>
                    </div>
                    <button class="delete-theme-btn" (click)="deleteSavedTheme(theme.name)" title="Delete theme">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                }
              </div>
            </div>
          }
        </ui-card>
      </div>

      <div class="theme-builder-layout">
        <!-- Token Editor -->
        <div class="token-editor">
          <ui-card>
            <h2>Design Tokens</h2>
            
            <ui-tabs>
              <ui-tab label="Colors">
                <div class="token-section">
                  @for (category of colorCategories(); track category.id) {
                    <div class="token-category">
                      <h3>{{ category.name }}</h3>
                      <p class="category-description">{{ category.description }}</p>
                      
                      <div class="token-grid">
                        @for (token of category.tokens; track token.name) {
                          <div class="token-item">
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
                                    (input)="updateLightToken(token.name, $any($event.target).value)"
                                    class="color-input"
                                  />
                                  <input
                                    type="text"
                                    [value]="token.value"
                                    (input)="updateLightToken(token.name, $any($event.target).value)"
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
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </ui-tab>

              <ui-tab label="Typography">
                <div class="token-section">
                  @for (category of typographyCategories(); track category.id) {
                    <div class="token-category">
                      <h3>{{ category.name }}</h3>
                      <p class="category-description">{{ category.description }}</p>
                      
                      <div class="token-grid">
                        @for (token of category.tokens; track token.name) {
                          <div class="token-item">
                            <label>
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
              </ui-tab>

              <ui-tab label="Spacing">
                <div class="token-section">
                  @for (category of spacingCategories(); track category.id) {
                    <div class="token-category">
                      <h3>{{ category.name }}</h3>
                      <p class="category-description">{{ category.description }}</p>
                      
                      <div class="token-grid">
                        @for (token of category.tokens; track token.name) {
                          <div class="token-item">
                            <label>
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
              </ui-tab>
            </ui-tabs>
          </ui-card>
        </div>

        <!-- Live Preview -->
        <div class="live-preview">
          <ui-card>
            <div class="preview-header">
              <div>
                <h2>Live Preview</h2>
                <p class="preview-description">See your theme changes in real-time</p>
              </div>
              <div class="preview-mode-toggle">
                <ui-button 
                  [variant]="!isPreviewingDark() ? 'filled' : 'outlined'" 
                  size="sm"
                  (clicked)="setPreviewMode('light')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
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
                </ui-button>
                <ui-button 
                  [variant]="isPreviewingDark() ? 'filled' : 'outlined'" 
                  size="sm"
                  (clicked)="setPreviewMode('dark')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px; vertical-align: middle;">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark
                </ui-button>
              </div>
            </div>
            
            <div class="preview-container" [attr.data-preview-theme]="isPreviewingDark() ? 'dark' : 'light'">
              <!-- Buttons -->
              <div class="preview-section">
                <h4>Buttons</h4>
                <div class="preview-row">
                  <ui-button variant="filled" size="sm">Small</ui-button>
                  <ui-button variant="filled" size="md">Medium</ui-button>
                  <ui-button variant="filled" size="lg">Large</ui-button>
                </div>
                <div class="preview-row">
                  <ui-button variant="outlined">Outlined</ui-button>
                  <ui-button variant="text">Text</ui-button>
                </div>
              </div>

              <!-- Inputs -->
              <div class="preview-section">
                <h4>Form Controls</h4>
                <ui-input placeholder="Enter text..." label="Text Input" />
              </div>

              <!-- Alert -->
              <div class="preview-section">
                <h4>Feedback</h4>
                <ui-alert variant="info">This is an informational message</ui-alert>
              </div>

              <!-- Card -->
              <div class="preview-section">
                <h4>Card</h4>
                <ui-card>
                  <h3>Card Title</h3>
                  <p>This is a sample card with your custom theme applied.</p>
                </ui-card>
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
                  <div class="color-swatch" style="background-color: var(--semantic-brand-primary)">
                    <span>Brand</span>
                  </div>
                  <div class="color-swatch" style="background-color: var(--semantic-success-primary)">
                    <span>Success</span>
                  </div>
                  <div class="color-swatch" style="background-color: var(--semantic-warning-primary)">
                    <span>Warning</span>
                  </div>
                  <div class="color-swatch" style="background-color: var(--semantic-error-primary)">
                    <span>Error</span>
                  </div>
                </div>
              </div>
            </div>
          </ui-card>
        </div>
      </div>

      <!-- Export Modal (shown when exporting) -->
      @if (showExportModal()) {
        <div class="export-modal-overlay" (click)="closeExportModal()">
          <div class="export-modal" (click)="$event.stopPropagation()">
            <ui-card>
              <h2>Export Theme</h2>
              <p>Choose your export format:</p>
              
              <div class="export-options">
                <ui-button variant="outlined" [fullWidth]="true" (clicked)="exportAsCSS()">
                  Export as CSS Variables
                </ui-button>
                <ui-button variant="outlined" [fullWidth]="true" (clicked)="exportAsJSON()">
                  Export as JSON
                </ui-button>
                <ui-button variant="outlined" [fullWidth]="true" (clicked)="exportAsTypeScript()">
                  Export as TypeScript
                </ui-button>
              </div>
              
              <div class="modal-actions">
                <ui-button variant="text" (clicked)="closeExportModal()">Cancel</ui-button>
              </div>
            </ui-card>
          </div>
        </div>
      }

      <!-- Save Theme Modal -->
      @if (showSaveModal()) {
        <div class="export-modal-overlay" (click)="closeSaveModal()">
          <div class="export-modal" (click)="$event.stopPropagation()">
            <ui-card>
              <h2>Save Theme</h2>
              <p>Give your custom theme a name:</p>
              
              <ui-input
                [(ngModel)]="saveThemeName"
                placeholder="My Custom Theme"
                label="Theme Name"
              />
              
              <div class="modal-actions">
                <ui-button variant="text" (clicked)="closeSaveModal()">Cancel</ui-button>
                <ui-button variant="filled" (clicked)="saveCurrentTheme()">Save</ui-button>
              </div>
            </ui-card>
          </div>
        </div>
      }

      <!-- Accessibility Checker Panel -->
      @if (showAccessibilityChecker()) {
        <div class="utility-panel">
          <ui-card>
            <div class="panel-header">
              <h2>Accessibility Checker</h2>
              <button class="close-panel-btn" (click)="toggleAccessibilityChecker()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p class="panel-description">Check contrast ratios for WCAG compliance</p>
            
            <div class="contrast-checks">
              @for (check of contrastChecks(); track check.label) {
                <div class="contrast-check-item">
                  <div class="contrast-info">
                    <span class="contrast-label">{{ check.label }}</span>
                    <div class="color-samples">
                      <span class="color-sample" [style.background-color]="check.foreground">A</span>
                      <span class="color-sample" [style.background-color]="check.background">A</span>
                    </div>
                  </div>
                  <div class="contrast-result">
                    <span class="contrast-ratio">{{ check.ratio.toFixed(2) }}:1</span>
                    <ui-badge 
                      [variant]="check.level === 'AAA' ? 'success' : check.level === 'AA' ? 'warning' : 'error'"
                    >
                      {{ check.level }}
                    </ui-badge>
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
          </ui-card>
        </div>
      }

      <!-- Color Generator Panel -->
      @if (showColorGenerator()) {
        <div class="utility-panel">
          <ui-card>
            <div class="panel-header">
              <h2>Color Palette Generator</h2>
              <button class="close-panel-btn" (click)="toggleColorGenerator()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <p class="panel-description">Generate harmonious color schemes</p>
            
            <div class="color-generator-controls">
              <ui-input
                [value]="baseColorForGeneration"
                (valueChange)="baseColorForGeneration = $event"
                label="Base Color"
                placeholder="#3b82f6"
              />
              <div class="generator-buttons">
                <ui-button variant="outlined" size="sm" (clicked)="generateComplementary()">
                  Complementary
                </ui-button>
                <ui-button variant="outlined" size="sm" (clicked)="generateAnalogous()">
                  Analogous
                </ui-button>
                <ui-button variant="outlined" size="sm" (clicked)="generateShades()">
                  Shades
                </ui-button>
              </div>
            </div>
            
            @if (generatedColors().length > 0) {
              <div class="generated-colors">
                <h4>Generated Colors:</h4>
                <div class="generated-color-grid">
                  @for (color of generatedColors(); track color) {
                    <div class="generated-color-item" (click)="copyColorToClipboard(color)">
                      <div class="generated-color-preview" [style.background-color]="color"></div>
                      <span class="generated-color-value">{{ color }}</span>
                    </div>
                  }
                </div>
                <p class="hint">Click any color to copy to clipboard</p>
              </div>
            }
          </ui-card>
        </div>
      }

      <!-- Hidden file input for import -->
      <input
        type="file"
        #fileInput
        style="display: none"
        accept=".json,.css"
        (change)="handleFileImport($event)"
      />
    </div>
  `,
  styles: [`
    .theme-builder-page {
      padding: var(--primitive-spacing-6);
      max-width: 1600px;
      margin: 0 auto;
    }

    .theme-builder-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--primitive-spacing-6);
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: var(--primitive-spacing-2);
    }

    .subtitle {
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-secondary);
    }

    .header-actions {
      display: flex;
      gap: var(--primitive-spacing-3);
      align-items: center;
      flex-wrap: wrap;
    }

    .history-buttons {
      display: flex;
      gap: var(--primitive-spacing-1);
    }
    .header-actions ui-button svg{vertical-align:middle}

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
    
    .utility-panel ui-card {
      background: transparent;
      border: none;
      box-shadow: none;
    }

    .utility-panel ::ng-deep ui-input,
    .utility-panel ::ng-deep ui-button {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    .utility-panel ::ng-deep ui-input input {
      display: block !important;
    }
    
    .utility-panel .generator-buttons ui-button {
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

    .close-panel-btn {
      padding: var(--primitive-spacing-2);
      border: none;
      background: transparent;
      color: var(--semantic-text-secondary);
      cursor: pointer;
      border-radius: var(--primitive-border-radius-sm);
      transition: all 0.2s;
    }

    .close-panel-btn:hover {
      background-color: var(--semantic-surface-subtle);
      color: var(--semantic-text-primary);
    }

    .panel-description {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      margin-bottom: var(--primitive-spacing-4);
    }

    /* Accessibility Checker Styles */
    .contrast-checks{display:flex;flex-direction:column;gap:var(--primitive-spacing-3);margin-bottom:var(--primitive-spacing-4)}
    .contrast-check-item{display:flex;justify-content:space-between;align-items:center;padding:var(--primitive-spacing-3);border:1px solid var(--semantic-border-default);border-radius:var(--primitive-border-radius-md)}
    .contrast-info{flex:1}
    .contrast-label{font-size:var(--primitive-font-size-sm);font-weight:600;display:block;margin-bottom:var(--primitive-spacing-2)}
    .color-samples{display:flex;gap:var(--primitive-spacing-2)}
    .color-sample{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:var(--primitive-border-radius-sm);font-weight:600;box-shadow:var(--primitive-shadow-sm)}
    .contrast-result{display:flex;flex-direction:column;align-items:flex-end;gap:var(--primitive-spacing-1)}
    .contrast-ratio{font-size:var(--primitive-font-size-sm);font-weight:600;color:var(--semantic-text-primary)}
    .wcag-info{padding:var(--primitive-spacing-3);background:var(--semantic-surface-subtle);border-radius:var(--primitive-border-radius-md)}
    .wcag-info h4{font-size:var(--primitive-font-size-sm);margin-bottom:var(--primitive-spacing-2)}
    .wcag-info ul{list-style:none;padding:0;margin:0}
    .wcag-info li{font-size:var(--primitive-font-size-xs);color:var(--semantic-text-secondary);margin-bottom:var(--primitive-spacing-1)}

    /* Color Generator Styles */
    .color-generator-controls{margin-bottom:var(--primitive-spacing-4)}
    .color-generator-controls ui-input{display:block;width:100%}
    .generator-buttons{display:flex;gap:var(--primitive-spacing-2);margin-top:var(--primitive-spacing-3);flex-wrap:wrap}
    .generated-colors h4{font-size:var(--primitive-font-size-md);margin-bottom:var(--primitive-spacing-3)}
    .generated-color-grid{display:grid;grid-template-columns:1fr;gap:var(--primitive-spacing-2);margin-bottom:var(--primitive-spacing-2)}
    .generated-color-item{display:flex;align-items:center;gap:var(--primitive-spacing-3);padding:var(--primitive-spacing-2);border:1px solid var(--semantic-border-default);border-radius:var(--primitive-border-radius-md);cursor:pointer;transition:all .2s}
    .generated-color-item:hover{border-color:var(--semantic-brand-primary);background:var(--semantic-surface-subtle)}
    .generated-color-preview{width:48px;height:48px;border-radius:var(--primitive-border-radius-md);box-shadow:var(--primitive-shadow-sm)}
    .generated-color-value{font-family:monospace;font-size:var(--primitive-font-size-sm);color:var(--semantic-text-primary)}
    .hint{font-size:var(--primitive-font-size-xs);color:var(--semantic-text-tertiary);text-align:center;font-style:italic}

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

    .presets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--primitive-spacing-4);
      margin-bottom: var(--primitive-spacing-4);
    }

    .preset-card {
      padding: var(--primitive-spacing-4);
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-lg);
      cursor: pointer;
      transition: all 0.2s;
    }

    .preset-card:hover {
      border-color: var(--semantic-brand-primary);
      box-shadow: var(--primitive-shadow-md);
      transform: translateY(-2px);
    }

    .preset-info h4 {
      font-size: var(--primitive-font-size-md);
      margin-bottom: var(--primitive-spacing-2);
    }

    .preset-info p {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      margin-bottom: var(--primitive-spacing-2);
    }

    .preset-author {
      font-size: var(--primitive-font-size-xs);
      color: var(--semantic-text-tertiary);
    }

    .preset-colors {
      display: flex;
      gap: var(--primitive-spacing-2);
      margin-top: var(--primitive-spacing-3);
    }

    .color-dot {
      width: 24px;
      height: 24px;
      border-radius: var(--primitive-border-radius-full);
      box-shadow: var(--primitive-shadow-sm);
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

    .delete-theme-btn {
      padding: var(--primitive-spacing-2);
      border: none;
      background: transparent;
      color: var(--semantic-error-primary);
      cursor: pointer;
      border-radius: var(--primitive-border-radius-sm);
      transition: all 0.2s;
    }

    .delete-theme-btn:hover {
      background-color: var(--semantic-error-subtle);
    }

    .delete-theme-btn svg {
      display: block;
      stroke-width: 2;
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
      background-color: var(--semantic-surface-subtle);
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    /* Dark Mode Preview - Override all color tokens */
    .preview-container[data-preview-theme="dark"] {
      /* Semantic: Brand Colors */
      --semantic-brand-primary: var(--semantic-brand-primary-dark, #6B7FED);
      --semantic-brand-secondary: var(--semantic-brand-secondary-dark, #8B95A5);
      --semantic-brand-subtle: var(--semantic-brand-subtle-dark, #2A2E3F);
      
      /* Semantic: Feedback Colors */
      --semantic-success-primary: var(--semantic-success-primary-dark, #4ADE80);
      --semantic-warning-primary: var(--semantic-warning-primary-dark, #FBBF24);
      --semantic-error-primary: var(--semantic-error-primary-dark, #F87171);
      --semantic-info-primary: var(--semantic-info-primary-dark, #60A5FA);
      
      /* Semantic: Surface Colors */
      --semantic-surface-background: var(--semantic-surface-background-dark, #1A1D29);
      --semantic-surface-card: var(--semantic-surface-card-dark, #232734);
      --semantic-surface-subtle: var(--semantic-surface-subtle-dark, #2A2E3F);
      --semantic-surface-background-secondary: var(--semantic-surface-background-secondary-dark, #2A2E3F);
      
      /* Semantic: Text Colors */
      --semantic-text-primary: var(--semantic-text-primary-dark, #E5E7EB);
      --semantic-text-secondary: var(--semantic-text-secondary-dark, #9CA3AF);
      --semantic-text-tertiary: var(--semantic-text-tertiary-dark, #6B7280);
      --semantic-text-disabled: var(--semantic-text-disabled-dark, #4B5563);
      
      /* Semantic: Border Colors */
      --semantic-border-default: var(--semantic-border-default-dark, #374151);
      --semantic-border-subtle: var(--semantic-border-subtle-dark, #4B5563);
      --semantic-border-strong: var(--semantic-border-strong-dark, #6B7280);
      
      /* Component: Card */
      --component-card-background: var(--semantic-surface-card-dark, #232734);
      --component-card-border: var(--semantic-border-default-dark, #374151);
      
      /* Component: Input */
      --component-input-default-background: var(--semantic-surface-card-dark, #232734);
      --component-input-default-text: var(--semantic-text-primary-dark, #E5E7EB);
      --component-input-default-border: var(--semantic-border-default-dark, #374151);
      --component-input-default-placeholder: var(--semantic-text-tertiary-dark, #6B7280);
      --component-input-hover-border: var(--semantic-border-strong-dark, #6B7280);
      --component-input-focus-border: var(--semantic-brand-primary-dark, #6B7FED);
      
      /* Component: Alert */
      --component-alert-info-background: var(--semantic-surface-subtle-dark, #2A2E3F);
      --component-alert-info-text: var(--semantic-text-primary-dark, #E5E7EB);
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
      font-size: var(--primitive-font-size-md);
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

    .export-modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .export-modal {
      width: 90%;
      max-width: 500px;
    }

    .export-modal h2 {
      margin-bottom: var(--primitive-spacing-3);
    }

    .export-modal p {
      margin-bottom: var(--primitive-spacing-4);
      color: var(--semantic-text-secondary);
    }

    .export-options {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
      margin-bottom: var(--primitive-spacing-4);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: var(--primitive-spacing-4);
      border-top: 1px solid var(--semantic-border-default);
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
        background-color: var(--semantic-surface-subtle);
      }
    }

    @media (max-width: 768px) {
      .theme-builder-header {
        flex-direction: column;
        gap: var(--primitive-spacing-4);
      }

      .header-actions {
        width: 100%;
        flex-direction: column;
      }

      .preview-header {
        flex-direction: column;
        align-items: stretch;
      }

      .preview-mode-toggle {
        width: 100%;
      }

      .preview-mode-toggle ui-button {
        flex: 1;
      }

      .utility-panel {
        width: 90%;
        right: 5%;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBuilderComponent {
  protected readonly showExportModal = signal(false);
  protected readonly showSaveModal = signal(false);
  protected readonly showAccessibilityChecker = signal(false);
  protected readonly showColorGenerator = signal(false);
  protected saveThemeName = '';
  protected readonly themePresets = THEME_PRESETS;
  protected readonly savedThemes = signal<
    Array<{ name: string; tokens: Record<string, string>; createdAt: string }>
  >([]);
  
  // Preview Mode (for live preview panel)
  protected readonly previewMode = signal<'light' | 'dark'>('light');
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
  
  // Theme tokens organized by category
  protected readonly colorCategories = signal<ThemeCategory[]>([
    {
      id: 'brand',
      name: 'Brand Colors',
      description: 'Primary brand colors and variations',
      tokens: [
        { name: '--semantic-brand-primary', value: this.getComputedToken('--semantic-brand-primary'), type: 'color', category: 'brand' },
        { name: '--semantic-brand-secondary', value: this.getComputedToken('--semantic-brand-secondary'), type: 'color', category: 'brand' },
        { name: '--semantic-brand-subtle', value: this.getComputedToken('--semantic-brand-subtle'), type: 'color', category: 'brand' },
      ],
    },
    {
      id: 'semantic',
      name: 'Semantic Colors',
      description: 'Success, warning, error, and info colors',
      tokens: [
        { name: '--semantic-success-primary', value: this.getComputedToken('--semantic-success-primary'), type: 'color', category: 'semantic' },
        { name: '--semantic-warning-primary', value: this.getComputedToken('--semantic-warning-primary'), type: 'color', category: 'semantic' },
        { name: '--semantic-error-primary', value: this.getComputedToken('--semantic-error-primary'), type: 'color', category: 'semantic' },
        { name: '--semantic-info-primary', value: this.getComputedToken('--semantic-info-primary'), type: 'color', category: 'semantic' },
      ],
    },
    {
      id: 'surfaces',
      name: 'Surface Colors',
      description: 'Background and surface colors',
      tokens: [
        { name: '--semantic-surface-background', value: this.getComputedToken('--semantic-surface-background'), type: 'color', category: 'surfaces' },
        { name: '--semantic-surface-card', value: this.getComputedToken('--semantic-surface-card'), type: 'color', category: 'surfaces' },
        { name: '--semantic-surface-subtle', value: this.getComputedToken('--semantic-surface-subtle'), type: 'color', category: 'surfaces' },
      ],
    },
    {
      id: 'text',
      name: 'Text Colors',
      description: 'Text color hierarchy',
      tokens: [
        { name: '--semantic-text-primary', value: this.getComputedToken('--semantic-text-primary'), type: 'color', category: 'text' },
        { name: '--semantic-text-secondary', value: this.getComputedToken('--semantic-text-secondary'), type: 'color', category: 'text' },
        { name: '--semantic-text-tertiary', value: this.getComputedToken('--semantic-text-tertiary'), type: 'color', category: 'text' },
      ],
    },
  ]);

  protected readonly typographyCategories = signal<ThemeCategory[]>([
    {
      id: 'fonts',
      name: 'Font Families',
      description: 'Typography font stacks',
      tokens: [
        { name: '--primitive-font-family-base', value: this.getComputedToken('--primitive-font-family-base'), type: 'font', category: 'fonts' },
        { name: '--primitive-font-family-mono', value: this.getComputedToken('--primitive-font-family-mono'), type: 'font', category: 'fonts' },
      ],
    },
    {
      id: 'sizes',
      name: 'Font Sizes',
      description: 'Typography size scale',
      tokens: [
        { name: '--primitive-font-size-xs', value: this.getComputedToken('--primitive-font-size-xs'), type: 'size', category: 'sizes' },
        { name: '--primitive-font-size-sm', value: this.getComputedToken('--primitive-font-size-sm'), type: 'size', category: 'sizes' },
        { name: '--primitive-font-size-md', value: this.getComputedToken('--primitive-font-size-md'), type: 'size', category: 'sizes' },
        { name: '--primitive-font-size-lg', value: this.getComputedToken('--primitive-font-size-lg'), type: 'size', category: 'sizes' },
        { name: '--primitive-font-size-xl', value: this.getComputedToken('--primitive-font-size-xl'), type: 'size', category: 'sizes' },
      ],
    },
  ]);

  protected readonly spacingCategories = signal<ThemeCategory[]>([
    {
      id: 'spacing',
      name: 'Spacing Scale',
      description: 'Consistent spacing values',
      tokens: [
        { name: '--primitive-spacing-1', value: this.getComputedToken('--primitive-spacing-1'), type: 'size', category: 'spacing' },
        { name: '--primitive-spacing-2', value: this.getComputedToken('--primitive-spacing-2'), type: 'size', category: 'spacing' },
        { name: '--primitive-spacing-3', value: this.getComputedToken('--primitive-spacing-3'), type: 'size', category: 'spacing' },
        { name: '--primitive-spacing-4', value: this.getComputedToken('--primitive-spacing-4'), type: 'size', category: 'spacing' },
        { name: '--primitive-spacing-6', value: this.getComputedToken('--primitive-spacing-6'), type: 'size', category: 'spacing' },
        { name: '--primitive-spacing-8', value: this.getComputedToken('--primitive-spacing-8'), type: 'size', category: 'spacing' },
      ],
    },
    {
      id: 'radius',
      name: 'Border Radius',
      description: 'Corner rounding values',
      tokens: [
        { name: '--primitive-border-radius-sm', value: this.getComputedToken('--primitive-border-radius-sm'), type: 'size', category: 'radius' },
        { name: '--primitive-border-radius-md', value: this.getComputedToken('--primitive-border-radius-md'), type: 'size', category: 'radius' },
        { name: '--primitive-border-radius-lg', value: this.getComputedToken('--primitive-border-radius-lg'), type: 'size', category: 'radius' },
        { name: '--primitive-border-radius-full', value: this.getComputedToken('--primitive-border-radius-full'), type: 'size', category: 'radius' },
      ],
    },
  ]);

  // Computed property to trigger updates when color categories change
  protected readonly previewStyles = computed(() => {
    // This ensures the preview updates when tokens change
    this.colorCategories();
    return '';
  });

  constructor(private cdr: ChangeDetectorRef) {
    // Load saved themes from localStorage
    this.loadSavedThemesList();
    
    // Initialize dark mode tokens with default values (if they don't exist)
    this.initializeDarkTokens();
    
    // Initialize accessibility checks
    this.updateAccessibilityChecks();
    
    // Apply token changes to document root
    effect(() => {
      const colorCategories = this.colorCategories();
      const typographyCategories = this.typographyCategories();
      const spacingCategories = this.spacingCategories();
      
      // Apply light mode tokens
      [...colorCategories, ...typographyCategories, ...spacingCategories].forEach(category => {
        category.tokens.forEach(token => {
          document.documentElement.style.setProperty(token.name, token.value);
        });
      });
      
      // Update accessibility checks when colors change
      this.updateAccessibilityChecks();
    });
  }

  private initializeDarkTokens(): void {
    // Initialize dark tokens with defaults if they don't exist
    const colorCategories = this.colorCategories();
    
    const darkDefaults: Record<string, string> = {
      // Brand Colors - Dark mode typically uses slightly lighter/more vibrant versions
      '--semantic-brand-primary': '#6B7FED',
      '--semantic-brand-secondary': '#8B95A5',
      '--semantic-brand-subtle': '#2A2E3F',
      
      // Semantic Colors
      '--semantic-success-primary': '#4ADE80',
      '--semantic-warning-primary': '#FBBF24',
      '--semantic-error-primary': '#F87171',
      '--semantic-info-primary': '#60A5FA',
      
      // Surface Colors - Dark backgrounds
      '--semantic-surface-background': '#1A1D29',
      '--semantic-surface-card': '#232734',
      '--semantic-surface-subtle': '#2A2E3F',
      
      // Text Colors - Light text on dark backgrounds
      '--semantic-text-primary': '#E5E7EB',
      '--semantic-text-secondary': '#9CA3AF',
      '--semantic-text-tertiary': '#6B7280',
      
      // Border Colors
      '--semantic-border-default': '#374151',
    };
    
    colorCategories.forEach(category => {
      category.tokens.forEach(token => {
        const darkTokenName = `${token.name}-dark`;
        const existingDarkValue = getComputedStyle(document.documentElement)
          .getPropertyValue(darkTokenName)
          .trim();
        
        // If no dark value exists, use the default or the light value as a starting point
        if (!existingDarkValue) {
          const defaultDarkValue = darkDefaults[token.name] || token.value;
          document.documentElement.style.setProperty(darkTokenName, defaultDarkValue);
        }
      });
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
    return getComputedStyle(document.documentElement)
      .getPropertyValue(tokenName)
      .trim();
  }

  protected formatTokenName(name: string): string {
    return name
      .replace(/^--/, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  // Direct token update (handles both light and dark)
  protected updateTokenDirect(tokenName: string, value: string, isDark: boolean): void {
    // Get old value for history
    const oldValue = getComputedStyle(document.documentElement)
      .getPropertyValue(tokenName)
      .trim();
    
    // For light mode updates, update the category signals
    if (!isDark) {
      const baseTokenName = tokenName.replace('-dark', '');
      const updateInCategory = (categories: ThemeCategory[]) => {
        return categories.map(category => ({
          ...category,
          tokens: category.tokens.map(token =>
            token.name === baseTokenName ? { ...token, value } : token
          ),
        }));
      };

      if (baseTokenName.includes('color') || baseTokenName.includes('brand') || baseTokenName.includes('semantic') || baseTokenName.includes('surface') || baseTokenName.includes('text')) {
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
    if (oldValue !== value) {
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
    allCategories.forEach(category => {
      css += `  /* ${category.name} */\n`;
      category.tokens.forEach(token => {
        css += `  ${token.name}: ${token.value};\n`;
      });
      css += '\n';
    });
    css += '}\n\n';
    
    css += '/* Dark Mode */\n:root[data-theme="dark"],\n[data-theme="dark"] {\n';
    // Only export dark variants for color tokens
    colorCategories.forEach(category => {
      css += `  /* ${category.name} - Dark */\n`;
      category.tokens.forEach(token => {
        const darkValue = getComputedStyle(document.documentElement)
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
    const colorCategories = this.colorCategories();
    const typographyCategories = this.typographyCategories();
    const spacingCategories = this.spacingCategories();
    const allCategories = [...colorCategories, ...typographyCategories, ...spacingCategories];

    const themeLight: Record<string, string> = {};
    const themeDark: Record<string, string> = {};
    
    // All tokens go into light theme
    allCategories.forEach(category => {
      category.tokens.forEach(token => {
        themeLight[token.name] = token.value;
      });
    });
    
    // Only color tokens get dark variants
    colorCategories.forEach(category => {
      category.tokens.forEach(token => {
        const darkValue = getComputedStyle(document.documentElement)
          .getPropertyValue(`${token.name}-dark`)
          .trim() || token.value;
        themeDark[token.name] = darkValue;
      });
    });

    const fullTheme = {
      light: themeLight,
      dark: themeDark,
    };

    const json = JSON.stringify(fullTheme, null, 2);
    this.downloadFile('theme.json', json, 'application/json');
    this.closeExportModal();
  }

  protected exportAsTypeScript(): void {
    const colorCategories = this.colorCategories();
    const typographyCategories = this.typographyCategories();
    const spacingCategories = this.spacingCategories();
    const allCategories = [...colorCategories, ...typographyCategories, ...spacingCategories];

    let ts = 'export const customTheme = {\n';
    ts += '  light: {\n';
    allCategories.forEach(category => {
      ts += `    // ${category.name}\n`;
      category.tokens.forEach(token => {
        ts += `    '${token.name}': '${token.value}',\n`;
      });
      ts += '\n';
    });
    ts += '  },\n';
    
    ts += '  dark: {\n';
    // Only color tokens get dark variants
    colorCategories.forEach(category => {
      ts += `    // ${category.name} - Dark\n`;
      category.tokens.forEach(token => {
        const darkValue = getComputedStyle(document.documentElement)
          .getPropertyValue(`${token.name}-dark`)
          .trim() || token.value;
        ts += `    '${token.name}': '${darkValue}',\n`;
      });
      ts += '\n';
    });
    ts += '  },\n';
    ts += '};\n';

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
    // Apply all tokens from the preset
    Object.entries(preset.tokens).forEach(([tokenName, value]) => {
      this.updateToken(tokenName, value);
    });
  }

  // Save/Load Management
  protected showSaveThemeModal(): void {
    this.showSaveModal.set(true);
    this.saveThemeName = '';
  }

  protected closeSaveModal(): void {
    this.showSaveModal.set(false);
  }

  protected saveCurrentTheme(): void {
    if (!this.saveThemeName.trim()) {
      alert('Please enter a theme name');
      return;
    }

    const allCategories = [
      ...this.colorCategories(),
      ...this.typographyCategories(),
      ...this.spacingCategories(),
    ];

    const tokens: Record<string, string> = {};
    allCategories.forEach(category => {
      category.tokens.forEach(token => {
        tokens[token.name] = token.value;
      });
    });

    saveTheme(this.saveThemeName, tokens);
    this.loadSavedThemesList();
    this.closeSaveModal();
  }

  protected loadSavedTheme(name: string): void {
    const savedThemes = getSavedThemes();
    const theme = savedThemes[name];
    
    if (theme) {
      Object.entries(theme.tokens).forEach(([tokenName, value]) => {
        this.updateToken(tokenName, value);
      });
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
      let tokens: Record<string, string> = {};

      try {
        if (file.name.endsWith('.json')) {
          tokens = JSON.parse(content);
        } else if (file.name.endsWith('.css')) {
          tokens = parseCSSVariables(content);
        }

        // Apply imported tokens
        Object.entries(tokens).forEach(([tokenName, value]) => {
          if (tokenName.startsWith('--')) {
            this.updateToken(tokenName, value);
          }
        });

        alert(`Successfully imported ${Object.keys(tokens).length} tokens!`);
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

  protected undo(): void {
    if (!this.canUndo()) return;
    
    const entry = this.history[this.historyIndex];
    const isDark = entry.tokenName.endsWith('-dark');
    document.documentElement.style.setProperty(entry.tokenName, entry.oldValue);
    this.historyIndex--;
    this.updateHistoryButtons();
  }

  protected redo(): void {
    if (!this.canRedo()) return;
    
    this.historyIndex++;
    const entry = this.history[this.historyIndex];
    const isDark = entry.tokenName.endsWith('-dark');
    document.documentElement.style.setProperty(entry.tokenName, entry.newValue);
    this.updateHistoryButtons();
  }

  // Accessibility Checker Methods
  protected toggleAccessibilityChecker(): void {
    this.showAccessibilityChecker.update(v => !v);
    if (this.showAccessibilityChecker()) {
      this.showColorGenerator.set(false);
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
        label: 'White Text on Brand Primary',
        foreground: '#ffffff',
        background: brandPrimary,
        ratio: getContrastRatio('#ffffff', brandPrimary),
        level: getWCAGLevel(getContrastRatio('#ffffff', brandPrimary), 'normal'),
      },
    ];
    
    this.contrastChecks.set(checks);
  }

  // Preview Mode Toggle (for live preview panel only)
  protected togglePreviewMode(): void {
    this.previewMode.update(mode => mode === 'light' ? 'dark' : 'light');
    // Update accessibility checks for the current preview mode
    this.updateAccessibilityChecks();
  }

  // Set specific preview mode
  protected setPreviewMode(mode: 'light' | 'dark'): void {
    this.previewMode.set(mode);
    // Update accessibility checks for the current preview mode
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
    
    // Record in history
    if (oldValue !== value) {
      this.addToHistory(darkTokenName, oldValue, value);
    }
  }

  // Color Generator Methods
  protected toggleColorGenerator(): void {
    this.showColorGenerator.update(v => !v);
    if (this.showColorGenerator()) {
      this.showAccessibilityChecker.set(false);
      // Force re-render of child components after animation starts
      setTimeout(() => {
        this.baseColorForGeneration = this.baseColorForGeneration || '#3b82f6';
      }, 0);
    }
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
