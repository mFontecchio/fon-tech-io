/**
 * Responsive Preview Component
 * Allows viewing components in different viewport sizes
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ViewportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: string;
}

const VIEWPORT_PRESETS: ViewportPreset[] = [
  { id: 'mobile', name: 'Mobile', width: 375, height: 667, icon: 'mobile' },
  { id: 'tablet', name: 'Tablet', width: 768, height: 1024, icon: 'tablet' },
  { id: 'desktop', name: 'Desktop', width: 1440, height: 900, icon: 'desktop' },
  { id: 'wide', name: 'Wide', width: 1920, height: 1080, icon: 'wide' },
  { id: 'full', name: 'Full Width', width: 0, height: 0, icon: 'full' },
];

@Component({
  selector: 'app-responsive-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="responsive-preview">
      <!-- Toolbar -->
      <div class="preview-toolbar">
        <div class="preview-device-selector">
          @for (preset of viewportPresets; track preset.id) {
            <button
              class="preview-device-button"
              [class.preview-device-button--active]="selectedViewport() === preset.id"
              (click)="selectViewport(preset.id)"
              [attr.aria-label]="'Preview in ' + preset.name"
              [title]="preset.name + (preset.width ? ' (' + preset.width + 'px)' : '')"
            >
              @switch (preset.icon) {
                @case ('mobile') {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <path d="M12 18h.01"/>
                  </svg>
                }
                @case ('tablet') {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                    <path d="M12 18h.01"/>
                  </svg>
                }
                @case ('desktop') {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <path d="M8 21h8"/>
                    <path d="M12 17v4"/>
                  </svg>
                }
                @case ('wide') {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="1" y="6" width="22" height="12" rx="2" ry="2"/>
                  </svg>
                }
                @case ('full') {
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                }
              }
              <span class="preview-device-label">{{ preset.name }}</span>
            </button>
          }
        </div>

        @if (currentPreset().width > 0) {
          <div class="preview-dimensions">
            <span>{{ currentPreset().width }}×{{ currentPreset().height }}px</span>
            @if (showZoom()) {
              <span class="preview-zoom">{{ zoomLevel() }}%</span>
            }
          </div>
        }

        @if (currentPreset().width > 0) {
          <button
            class="preview-rotate-button"
            (click)="toggleOrientation()"
            [attr.aria-label]="'Rotate to ' + (isLandscape() ? 'portrait' : 'landscape')"
            title="Rotate device"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 4v6h6"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
          </button>
        }
      </div>

      <!-- Preview Container -->
      <div class="preview-container" [class.preview-container--centered]="currentPreset().width > 0">
        <div
          class="preview-frame"
          [class.preview-frame--full]="selectedViewport() === 'full'"
          [style.width]="frameWidth()"
          [style.height]="frameHeight()"
          [style.transform]="'scale(' + zoomLevel() / 100 + ')'"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .responsive-preview {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-lg);
      overflow: hidden;
    }

    /* Toolbar */
    .preview-toolbar {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-card);
      border-bottom: 1px solid var(--semantic-border-default);
    }

    .preview-device-selector {
      display: flex;
      gap: var(--primitive-spacing-1);
      flex-wrap: wrap;
    }

    .preview-device-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--primitive-spacing-1);
      padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
      border: 1px solid var(--semantic-border-default);
      background-color: transparent;
      color: var(--semantic-text-secondary);
      border-radius: var(--primitive-border-radius-md);
      cursor: pointer;
      transition: all 0.2s;
      font-size: var(--primitive-font-size-xs);
    }

    .preview-device-button:hover {
      background-color: var(--semantic-surface-subtle);
      color: var(--semantic-text-primary);
      border-color: var(--semantic-border-strong);
    }

    .preview-device-button--active {
      background-color: var(--semantic-brand-primary);
      color: var(--semantic-text-inverse);
      border-color: var(--semantic-brand-primary);
    }

    .preview-device-button svg {
      stroke-width: 2;
    }

    .preview-device-label {
      font-weight: var(--primitive-font-weight-medium);
    }

    .preview-dimensions {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-2);
      margin-left: auto;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      font-family: var(--primitive-font-family-mono);
    }

    .preview-zoom {
      padding: 2px 6px;
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
    }

    .preview-rotate-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--primitive-spacing-2);
      border: 1px solid var(--semantic-border-default);
      background-color: transparent;
      color: var(--semantic-text-secondary);
      border-radius: var(--primitive-border-radius-md);
      cursor: pointer;
      transition: all 0.2s;
    }

    .preview-rotate-button:hover {
      background-color: var(--semantic-surface-subtle);
      color: var(--semantic-text-primary);
      border-color: var(--semantic-border-strong);
    }

    .preview-rotate-button svg {
      stroke-width: 2;
    }

    /* Container */
    .preview-container {
      flex: 1;
      overflow: auto;
      padding: var(--primitive-spacing-4);
      min-height: 400px;
    }

    .preview-container--centered {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .preview-frame {
      background-color: var(--semantic-surface-card);
      border-radius: var(--primitive-border-radius-md);
      box-shadow: var(--primitive-shadow-lg);
      overflow: auto;
      transform-origin: center center;
      transition: all 0.3s ease-in-out;
    }

    .preview-frame--full {
      width: 100%;
      min-height: 400px;
      box-shadow: none;
    }

    /* Scrollbar */
    .preview-container::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .preview-container::-webkit-scrollbar-track {
      background: transparent;
    }

    .preview-container::-webkit-scrollbar-thumb {
      background: var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-full);
    }

    .preview-container::-webkit-scrollbar-thumb:hover {
      background: var(--semantic-border-strong);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .preview-device-label {
        display: none;
      }

      .preview-device-button {
        padding: var(--primitive-spacing-2);
      }

      .preview-dimensions {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsivePreviewComponent {
  readonly enableZoom = input<boolean>(true);

  protected readonly viewportPresets = VIEWPORT_PRESETS;
  protected readonly selectedViewport = signal<string>('full');
  protected readonly isLandscape = signal<boolean>(false);
  protected readonly zoomLevel = signal<number>(100);

  protected readonly currentPreset = computed(() => {
    const id = this.selectedViewport();
    return this.viewportPresets.find(p => p.id === id) || VIEWPORT_PRESETS[4];
  });

  protected readonly showZoom = computed(() => {
    return this.enableZoom() && this.zoomLevel() !== 100;
  });

  protected readonly frameWidth = computed(() => {
    const preset = this.currentPreset();
    if (preset.width === 0) return '100%';
    
    const width = this.isLandscape() ? preset.height : preset.width;
    return `${width}px`;
  });

  protected readonly frameHeight = computed(() => {
    const preset = this.currentPreset();
    if (preset.height === 0) return 'auto';
    
    const height = this.isLandscape() ? preset.width : preset.height;
    return `${height}px`;
  });

  protected selectViewport(id: string): void {
    this.selectedViewport.set(id);
    this.isLandscape.set(false);
    this.adjustZoom();
  }

  protected toggleOrientation(): void {
    this.isLandscape.update(landscape => !landscape);
    this.adjustZoom();
  }

  private adjustZoom(): void {
    if (!this.enableZoom()) return;

    const preset = this.currentPreset();
    if (preset.width === 0) {
      this.zoomLevel.set(100);
      return;
    }

    // Auto-adjust zoom if viewport is too large
    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 300;
    const width = this.isLandscape() ? preset.height : preset.width;
    const height = this.isLandscape() ? preset.width : preset.height;

    const widthZoom = (maxWidth / width) * 100;
    const heightZoom = (maxHeight / height) * 100;
    const zoom = Math.min(widthZoom, heightZoom, 100);

    if (zoom < 100) {
      this.zoomLevel.set(Math.floor(zoom));
    } else {
      this.zoomLevel.set(100);
    }
  }
}

