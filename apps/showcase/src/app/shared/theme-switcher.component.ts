/**
 * Theme Switcher Component
 * Dropdown for selecting between light, dark, and high-contrast themes
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@ui-suite/theming';

interface ThemeOption {
  id: string;
  name: string;
  mode: 'light' | 'dark' | 'high-contrast';
  description: string;
  icon: string;
}

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher">
      <button
        class="theme-toggle"
        (click)="toggleDropdown(); $event.stopPropagation()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-label]="'Current theme: ' + currentThemeName()"
        title="Switch theme"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          @if (themeService.isDarkMode()) {
            <!-- Sun icon for dark mode -->
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          } @else if (themeService.isHighContrastMode()) {
            <!-- High contrast icon -->
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2v20"/>
          } @else {
            <!-- Moon icon for light mode -->
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          }
        </svg>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="chevron">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      @if (isOpen()) {
        <div class="theme-dropdown" (click)="$event.stopPropagation()">
          <div class="theme-dropdown-header">
            <span class="theme-dropdown-title">Select Theme</span>
          </div>
          <div class="theme-options">
            @for (option of themeOptions; track option.id) {
              <button
                class="theme-option"
                [class.theme-option--active]="currentThemeId() === option.id"
                (click)="selectTheme(option.id)"
                [attr.aria-label]="option.name + ': ' + option.description"
              >
                <div class="theme-option-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    @if (option.mode === 'light') {
                      <!-- Sun icon -->
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    } @else if (option.mode === 'dark') {
                      <!-- Moon icon -->
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    } @else {
                      <!-- High contrast icon -->
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2v20"/>
                    }
                  </svg>
                </div>
                <div class="theme-option-content">
                  <div class="theme-option-name">{{ option.name }}</div>
                  <div class="theme-option-description">{{ option.description }}</div>
                </div>
                @if (currentThemeId() === option.id) {
                  <svg class="theme-option-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .theme-switcher {
      position: relative;
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--primitive-spacing-1);
      padding: var(--primitive-spacing-2);
      border: none;
      background: transparent;
      color: var(--semantic-text-secondary);
      border-radius: var(--primitive-border-radius-md);
      cursor: pointer;
      transition: all 0.2s;
    }

    .theme-toggle:hover {
      color: var(--semantic-text-primary);
      background-color: var(--semantic-surface-subtle);
    }

    .theme-toggle svg.chevron {
      width: 12px;
      height: 12px;
      stroke-width: 2;
    }

    .theme-dropdown {
      position: absolute;
      top: calc(100% + var(--primitive-spacing-2));
      right: 0;
      width: 280px;
      background-color: var(--semantic-surface-card);
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-lg);
      box-shadow: var(--primitive-shadow-xl);
      z-index: 1000;
      overflow: hidden;
    }

    .theme-dropdown-header {
      padding: var(--primitive-spacing-4);
      border-bottom: 1px solid var(--semantic-border-default);
    }

    .theme-dropdown-title {
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-semibold);
      color: var(--semantic-text-primary);
    }

    .theme-options {
      padding: var(--primitive-spacing-2);
    }

    .theme-option {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-3);
      width: 100%;
      padding: var(--primitive-spacing-3);
      border: none;
      background: transparent;
      border-radius: var(--primitive-border-radius-md);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .theme-option:hover {
      background-color: var(--semantic-surface-subtle);
    }

    .theme-option--active {
      background-color: var(--semantic-brand-subtle);
    }

    .theme-option--active:hover {
      background-color: var(--semantic-brand-subtle);
    }

    .theme-option-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--primitive-border-radius-md);
      background-color: var(--semantic-surface-subtle);
      color: var(--semantic-text-secondary);
      flex-shrink: 0;
    }

    .theme-option--active .theme-option-icon {
      background-color: var(--semantic-brand-primary);
      color: var(--semantic-text-inverse);
    }

    .theme-option-icon svg {
      stroke-width: 2;
    }

    .theme-option-content {
      flex: 1;
      min-width: 0;
    }

    .theme-option-name {
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-primary);
      margin-bottom: 2px;
    }

    .theme-option-description {
      font-size: var(--primitive-font-size-xs);
      color: var(--semantic-text-secondary);
    }

    .theme-option-check {
      color: var(--semantic-brand-primary);
      stroke-width: 2;
      flex-shrink: 0;
    }

    /* Animation */
    .theme-dropdown {
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  host: {
    '(document:click)': 'closeDropdown()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly isOpen = signal(false);

  protected readonly currentThemeId = this.themeService.currentThemeId;
  protected readonly currentThemeName = computed(() => {
    const id = this.currentThemeId();
    return this.themeOptions.find(opt => opt.id === id)?.name || 'Light';
  });

  protected readonly themeOptions: ThemeOption[] = [
    {
      id: 'light',
      name: 'Light',
      mode: 'light',
      description: 'Clean and bright interface',
      icon: 'sun',
    },
    {
      id: 'dark',
      name: 'Dark',
      mode: 'dark',
      description: 'Easy on the eyes',
      icon: 'moon',
    },
    {
      id: 'high-contrast',
      name: 'High Contrast',
      mode: 'high-contrast',
      description: 'Maximum readability',
      icon: 'contrast',
    },
  ];

  protected toggleDropdown(): void {
    this.isOpen.update(open => !open);
  }

  protected closeDropdown(): void {
    this.isOpen.set(false);
  }

  protected selectTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.closeDropdown();
  }
}

