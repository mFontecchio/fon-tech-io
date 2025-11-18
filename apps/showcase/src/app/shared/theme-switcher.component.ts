/**
 * Theme Switcher Component
 * Dropdown for selecting between light, dark, and high-contrast themes
 */

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
        <div class="icon-wrapper">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            class="theme-icon"
          >
            @if (themeService.isDarkMode()) {
              <!-- Sun icon for dark mode -->
              <circle cx="12" cy="12" r="5" class="sun-core" />
              <g class="sun-rays">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            } @else if (themeService.isHighContrastMode()) {
              <!-- High contrast icon -->
              <circle cx="12" cy="12" r="10" class="contrast-circle" />
              <path d="M12 2v20" class="contrast-split" />
            } @else {
              <!-- Moon icon for light mode -->
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="moon-crescent" />
            }
          </svg>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          class="chevron"
          [class.chevron-open]="isOpen()"
        >
          <polyline points="6 9 12 15 18 9" />
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
                      <circle cx="12" cy="12" r="5" />
                      <path
                        d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                      />
                    } @else if (option.mode === 'dark') {
                      <!-- Moon icon -->
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    } @else {
                      <!-- High contrast icon -->
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20" />
                    }
                  </svg>
                </div>
                <div class="theme-option-content">
                  <div class="theme-option-name">{{ option.name }}</div>
                  <div class="theme-option-description">{{ option.description }}</div>
                </div>
                @if (currentThemeId() === option.id) {
                  <svg
                    class="theme-option-check"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
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
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: visible;
      }

      .theme-toggle:hover {
        color: var(--semantic-text-primary);
        background-color: var(--semantic-surface-subtle);
        transform: scale(1.05);
      }

      .theme-toggle:active {
        transform: scale(0.95);
      }

      /* Icon wrapper for animations */
      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .theme-icon {
        stroke-width: 2;
        animation: iconFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Sun animations */
      .sun-core {
        animation: sunPulse 2s ease-in-out infinite;
        transform-origin: center;
      }

      .sun-rays {
        animation: sunRotate 8s linear infinite;
        transform-origin: center;
      }

      @keyframes sunPulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
      }

      @keyframes sunRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* Moon animations */
      .moon-crescent {
        animation: moonFloat 3s ease-in-out infinite;
        transform-origin: center;
      }

      @keyframes moonFloat {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-3px);
        }
      }

      /* Contrast icon animations */
      .contrast-circle {
        animation: contrastPulse 1.5s ease-in-out infinite;
      }

      .contrast-split {
        animation: contrastShift 2s ease-in-out infinite;
      }

      @keyframes contrastPulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      @keyframes contrastShift {
        0%,
        100% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(2px);
        }
      }

      /* Icon fade in on theme change */
      @keyframes iconFadeIn {
        0% {
          opacity: 0;
          transform: rotate(-180deg) scale(0.5);
        }
        50% {
          transform: rotate(-90deg) scale(1.2);
        }
        100% {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }
      }

      /* Chevron animations */
      .chevron {
        width: 12px;
        height: 12px;
        stroke-width: 2;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .chevron-open {
        transform: rotate(180deg);
      }

      .theme-toggle:hover .chevron {
        transform: translateY(2px);
      }

      .theme-toggle:hover .chevron-open {
        transform: rotate(180deg) translateY(2px);
      }

      /* Dropdown animations */
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
        animation: dropdownSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes dropdownSlideIn {
        0% {
          opacity: 0;
          transform: translateY(-12px) scale(0.95);
        }
        50% {
          transform: translateY(2px) scale(1.02);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .theme-dropdown-header {
        padding: var(--primitive-spacing-4);
        border-bottom: 1px solid var(--semantic-border-default);
        animation: headerFadeIn 0.4s ease-out;
      }

      @keyframes headerFadeIn {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .theme-dropdown-title {
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-primary);
      }

      .theme-options {
        padding: var(--primitive-spacing-2);
      }

      /* Staggered animation for theme options */
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
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: left;
        animation: optionSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) backwards;
      }

      .theme-option:nth-child(1) {
        animation-delay: 0.05s;
      }
      .theme-option:nth-child(2) {
        animation-delay: 0.1s;
      }
      .theme-option:nth-child(3) {
        animation-delay: 0.15s;
      }

      @keyframes optionSlideIn {
        from {
          opacity: 0;
          transform: translateX(-12px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .theme-option:hover {
        background-color: var(--semantic-surface-subtle);
        transform: translateX(4px);
      }

      .theme-option:active {
        transform: translateX(2px) scale(0.98);
      }

      .theme-option--active {
        background-color: var(--semantic-brand-subtle);
      }

      .theme-option--active:hover {
        background-color: var(--semantic-brand-subtle);
        transform: translateX(4px);
      }

      /* Icon animations */
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
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .theme-option:hover .theme-option-icon {
        transform: rotate(15deg) scale(1.1);
      }

      .theme-option--active .theme-option-icon {
        background-color: var(--semantic-brand-primary);
        color: var(--semantic-text-inverse);
        animation: iconBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes iconBounce {
        0%,
        100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2) rotate(10deg);
        }
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
        transition: transform 0.2s ease;
      }

      .theme-option:hover .theme-option-name {
        transform: translateX(2px);
      }

      .theme-option-description {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-secondary);
      }

      /* Check mark animation */
      .theme-option-check {
        color: var(--semantic-brand-primary);
        stroke-width: 3;
        flex-shrink: 0;
        animation: checkSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes checkSlideIn {
        0% {
          opacity: 0;
          transform: scale(0) rotate(-45deg);
        }
        50% {
          transform: scale(1.2) rotate(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .theme-toggle,
        .theme-icon,
        .chevron,
        .theme-dropdown,
        .theme-option,
        .theme-option-icon,
        .theme-option-check,
        .sun-core,
        .sun-rays,
        .moon-crescent,
        .contrast-circle,
        .contrast-split {
          animation: none;
          transition: none;
        }

        .theme-toggle:hover,
        .theme-option:hover {
          transform: none;
        }
      }
    `,
  ],
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
    return this.themeOptions.find((opt) => opt.id === id)?.name || 'Light';
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
    this.isOpen.update((open) => !open);
  }

  protected closeDropdown(): void {
    this.isOpen.set(false);
  }

  protected selectTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.closeDropdown();
  }
}
