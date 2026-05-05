/**
 * Theming Guide Page
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CodeBlockComponent } from '@ui-suite/components';

@Component({
  selector: 'app-theming-guide',
  standalone: true,
  imports: [CommonModule, CardComponent, CodeBlockComponent],
  template: `
    <div class="doc-page">
      <h1>Theming</h1>

      <p class="lead">
        The showcase and component libraries use theme families with explicit light and dark variants. ThemeService
        persists the active family and mode, and high-contrast remains available as a dedicated accessibility mode.
      </p>

      <div class="content-grid">
        <fui-card>
          <h2>ThemeService Basics</h2>
          <p>Select a family first, then switch between light, dark, and high-contrast modes.</p>
          <fui-code-block [code]="serviceExample" language="typescript" [title]="'ThemeService Example'" />
        </fui-card>

        <fui-card>
          <h2>What Persists</h2>
          <ul>
            <li>The selected theme family.</li>
            <li>The selected mode: light, dark, or high contrast.</li>
            <li>Any custom theme families registered in the browser persistence layer.</li>
          </ul>
        </fui-card>
      </div>

      <fui-card>
        <h2>Authoring Guidance</h2>
        <ul>
          <li>Prefer component and semantic tokens over hard-coded values in component CSS.</li>
          <li>Use the Theme Builder to preview family variants before exporting custom themes.</li>
          <li>Verify light, dark, and high-contrast behavior in the showcase after changing theme data.</li>
        </ul>
      </fui-card>
    </div>
  `,
  styles: [
    `
      .doc-page {
        padding: var(--primitive-spacing-8);
        max-width: 900px;
        margin: 0 auto;
        display: grid;
        gap: var(--primitive-spacing-6);
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
      }

      .lead {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-lg);
        line-height: 1.6;
      }

      .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--primitive-spacing-6);
      }

      h2 {
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      p,
      li {
        color: var(--semantic-text-secondary);
        line-height: 1.6;
      }

      ul {
        margin: 0;
        padding-left: 1.25rem;
      }

      @media (max-width: 768px) {
        .doc-page {
          padding: var(--primitive-spacing-6);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingComponent {
  protected readonly serviceExample = `import { Component, effect, inject } from '@angular/core';
import { ThemeService } from '@ui-suite/theming';

@Component({
  selector: 'app-shell',
  standalone: true,
  template: '',
})
export class ShellComponent {
  private readonly themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      console.log('Active theme', this.themeService.currentTheme().metadata.id);
    });
  }

  protected useDefaultDark(): void {
    this.themeService.setThemeFamily('default');
    this.themeService.setThemeMode('dark');
  }

  protected enableHighContrast(): void {
    this.themeService.setThemeMode('high-contrast');
  }
}`;
}