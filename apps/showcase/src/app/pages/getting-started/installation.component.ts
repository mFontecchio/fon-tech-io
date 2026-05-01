/**
 * Installation Guide Page
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CodeBlockComponent } from '@ui-suite/components';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule, CardComponent, CodeBlockComponent],
  template: `
    <div class="doc-page">
      <h1>Installation</h1>

      <p class="lead">
        The UI Component Suite is an Angular 20 library set designed for standalone components,
        signal-based state, and runtime theming. Use the workspace commands below when developing in this
        monorepo, or install the published packages in another application.
      </p>

      <div class="content-grid">
        <ui-card>
          <h2>Develop In This Workspace</h2>
          <p>Install dependencies once, then run the showcase and theme builder apps locally.</p>
          <ui-code-block [code]="workspaceCommands" language="bash" [title]="'Workspace Commands'" />
        </ui-card>

        <ui-card>
          <h2>Consume In Another Angular App</h2>
          <p>Install the component, theming, and shared packages together so tokens and utilities stay aligned.</p>
          <ui-code-block [code]="consumerInstall" language="bash" [title]="'Package Installation'" />
        </ui-card>
      </div>

      <ui-card>
        <h2>Recommended Project Setup</h2>
        <ul>
          <li>Use Angular 20 standalone components and import UI Suite components directly where they are used.</li>
          <li>Keep theming enabled at the application shell so family and mode changes apply consistently.</li>
          <li>Use pnpm in this repository to match the lockfile and Nx workspace tooling.</li>
        </ul>
      </ui-card>

      <ui-card>
        <h2>What To Run Next</h2>
        <ui-code-block [code]="nextSteps" language="typescript" [title]="'Next Steps'" />
      </ui-card>
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
export class InstallationComponent {
  protected readonly workspaceCommands = `pnpm install
pnpm start
pnpm start:theme-builder`;

  protected readonly consumerInstall = `pnpm add @ui-suite/components @ui-suite/theming @ui-suite/shared`;

  protected readonly nextSteps = `// 1. Open the showcase at http://localhost:4200
// 2. Browse the Usage guide for standalone imports
// 3. Review the Theming guide before wiring ThemeService`;
}

