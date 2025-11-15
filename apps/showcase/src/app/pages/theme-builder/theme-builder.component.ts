/**
 * Theme Builder Page
 * Interactive theme customization tool with live preview and export
 */

import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  effect,
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
  template: `
    <div class="theme-builder-page">
      <div class="theme-builder-header">
        <div>
          <h1>Theme Builder</h1>
          <p class="subtitle">Customize design tokens and see changes in real-time</p>
        </div>
        <div class="header-actions">
          <ui-button variant="outlined" (clicked)="resetTheme()">
            Reset to Default
          </ui-button>
          <ui-button variant="filled" (clicked)="exportTheme()">
            Export Theme
          </ui-button>
        </div>
      </div>

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
                            <label [for]="token.name">
                              <span class="token-label">{{ formatTokenName(token.name) }}</span>
                              @if (token.description) {
                                <span class="token-description">{{ token.description }}</span>
                              }
                            </label>
                            <div class="token-input-wrapper">
                              <input
                                type="color"
                                [id]="token.name"
                                [value]="token.value"
                                (input)="updateToken(token.name, $any($event.target).value)"
                                class="color-input"
                              />
                              <input
                                type="text"
                                [value]="token.value"
                                (input)="updateToken(token.name, $any($event.target).value)"
                                class="text-input"
                                [placeholder]="token.value"
                              />
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
              </ui-tab>
            </ui-tabs>
          </ui-card>
        </div>

        <!-- Live Preview -->
        <div class="live-preview">
          <ui-card>
            <h2>Live Preview</h2>
            <p class="preview-description">See your theme changes in real-time</p>
            
            <div class="preview-container" [style]="previewStyles()">
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

    .token-editor h2,
    .live-preview h2 {
      margin-bottom: var(--primitive-spacing-4);
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
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--primitive-spacing-4);
    }

    .token-item {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-2);
    }

    .token-label {
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-primary);
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
    }

    .color-input {
      width: 48px;
      height: 36px;
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-md);
      cursor: pointer;
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

    @media (max-width: 768px) {
      .theme-builder-header {
        flex-direction: column;
        gap: var(--primitive-spacing-4);
      }

      .header-actions {
        width: 100%;
        flex-direction: column;
      }

      .token-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeBuilderComponent {
  protected readonly showExportModal = signal(false);
  protected readonly showSaveModal = signal(false);
  protected saveThemeName = '';
  protected readonly themePresets = THEME_PRESETS;
  protected readonly savedThemes = signal<
    Array<{ name: string; tokens: Record<string, string>; createdAt: string }>
  >([]);
  
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

  // Computed styles for preview
  protected readonly previewStyles = computed(() => {
    // This will trigger recomputation when tokens change
    const categories = [...this.colorCategories(), ...this.typographyCategories(), ...this.spacingCategories()];
    return '';
  });

  constructor() {
    // Load saved themes from localStorage
    this.loadSavedThemesList();
    
    // Apply token changes to document root
    effect(() => {
      const allCategories = [
        ...this.colorCategories(),
        ...this.typographyCategories(),
        ...this.spacingCategories(),
      ];
      
      allCategories.forEach(category => {
        category.tokens.forEach(token => {
          document.documentElement.style.setProperty(token.name, token.value);
        });
      });
    });
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

  protected updateToken(tokenName: string, value: string): void {
    // Update the token value in all categories
    const updateInCategory = (categories: ThemeCategory[]) => {
      return categories.map(category => ({
        ...category,
        tokens: category.tokens.map(token =>
          token.name === tokenName ? { ...token, value } : token
        ),
      }));
    };

    if (tokenName.includes('color') || tokenName.includes('brand') || tokenName.includes('semantic') || tokenName.includes('surface') || tokenName.includes('text')) {
      this.colorCategories.set(updateInCategory(this.colorCategories()));
    } else if (tokenName.includes('font')) {
      this.typographyCategories.set(updateInCategory(this.typographyCategories()));
    } else {
      this.spacingCategories.set(updateInCategory(this.spacingCategories()));
    }

    // Apply immediately to document
    document.documentElement.style.setProperty(tokenName, value);
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
    const allCategories = [
      ...this.colorCategories(),
      ...this.typographyCategories(),
      ...this.spacingCategories(),
    ];

    let css = ':root {\n';
    allCategories.forEach(category => {
      css += `  /* ${category.name} */\n`;
      category.tokens.forEach(token => {
        css += `  ${token.name}: ${token.value};\n`;
      });
      css += '\n';
    });
    css += '}';

    this.downloadFile('theme.css', css, 'text/css');
    this.closeExportModal();
  }

  protected exportAsJSON(): void {
    const allCategories = [
      ...this.colorCategories(),
      ...this.typographyCategories(),
      ...this.spacingCategories(),
    ];

    const theme: Record<string, string> = {};
    allCategories.forEach(category => {
      category.tokens.forEach(token => {
        theme[token.name] = token.value;
      });
    });

    const json = JSON.stringify(theme, null, 2);
    this.downloadFile('theme.json', json, 'application/json');
    this.closeExportModal();
  }

  protected exportAsTypeScript(): void {
    const allCategories = [
      ...this.colorCategories(),
      ...this.typographyCategories(),
      ...this.spacingCategories(),
    ];

    let ts = 'export const customTheme = {\n';
    allCategories.forEach(category => {
      ts += `  // ${category.name}\n`;
      category.tokens.forEach(token => {
        const key = token.name.replace(/^--/, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        ts += `  '${token.name}': '${token.value}',\n`;
      });
      ts += '\n';
    });
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
}
