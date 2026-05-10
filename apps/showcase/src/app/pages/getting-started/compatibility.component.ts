/**
 * Angular Version Compatibility Page
 *
 * Displays a matrix of which package versions are compatible with which versions
 * of Angular, TypeScript, and Node.js. The data is sourced from
 * `apps/showcase/src/app/data/compatibility.data.ts` so it remains a single
 * source of truth shared with the documentation markdown file.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent, CardComponent, CodeBlockComponent } from '@mfontecchio/components';
import {
  COMPATIBILITY_MATRIX,
  PUBLISHED_PACKAGES,
  type CompatibilityEntry,
} from '../../data/compatibility.data';

@Component({
  selector: 'app-compatibility',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, CodeBlockComponent],
  template: `
    <div class="doc-page">
      <h1>Angular Version Compatibility</h1>

      <p class="lead">
        All four packages —
        @for (pkg of packages; track pkg; let last = $last) {
          <code>{{ pkg }}</code>{{ last ? '' : ', ' }}
        }
        — are released together and share the same version number.
      </p>

      <fui-card>
        <h2>Versioning Scheme</h2>
        <p>
          These packages use <strong>Angular-aligned versioning</strong>, the same convention
          used by Angular Material and Angular CDK. The MAJOR version number always matches the
          Angular major the package targets, so compatibility is communicated by the version
          number itself — no separate lookup required.
        </p>

        <div class="scheme-grid">
          <div class="scheme-block">
            <span class="scheme-label">MAJOR</span>
            <span class="scheme-value">Angular major</span>
            <span class="scheme-example">20.x.x → Angular 20</span>
          </div>
          <div class="scheme-sep">.</div>
          <div class="scheme-block">
            <span class="scheme-label">MINOR</span>
            <span class="scheme-value">New features</span>
            <span class="scheme-example">20.1.0 → backward-compatible additions</span>
          </div>
          <div class="scheme-sep">.</div>
          <div class="scheme-block">
            <span class="scheme-label">PATCH</span>
            <span class="scheme-value">Bug fixes</span>
            <span class="scheme-example">20.1.1 → backward-compatible fixes</span>
          </div>
        </div>

        <p class="scheme-note">
          When Angular 21 is released, a new <code>21.0.0</code> will be published. The
          <code>20.x</code> line continues to receive critical bug fixes during the Angular 20
          support window.
        </p>
      </fui-card>

      <fui-card>
        <h2>Compatibility Matrix</h2>

        <div class="table-scroll">
          <table class="compat-table" aria-label="Package version compatibility matrix">
            <thead>
              <tr>
                <th scope="col">Package Version</th>
                <th scope="col">Angular</th>
                <th scope="col">TypeScript</th>
                <th scope="col">Node.js</th>
                <th scope="col">zone.js</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              @for (entry of matrix; track entry.packageVersion) {
                <tr [class.row--latest]="entry.isLatest">
                  <td>
                    @if (entry.releaseUrl) {
                      <a [href]="entry.releaseUrl" target="_blank" rel="noopener noreferrer">
                        {{ entry.packageVersion }}
                      </a>
                    } @else {
                      {{ entry.packageVersion }}
                    }
                  </td>
                  <td>{{ entry.angularVersion }}</td>
                  <td>{{ entry.typescriptVersion }}</td>
                  <td>{{ entry.nodeVersion }}</td>
                  <td>{{ entry.zoneJsVersion }}</td>
                  <td>
                    @if (entry.isLatest) {
                      <fui-badge variant="success">Latest</fui-badge>
                    } @else {
                      <fui-badge variant="default">Supported</fui-badge>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </fui-card>

      <fui-card>
        <h2>Installation</h2>
        <p>
          Install the version whose MAJOR matches your Angular version. All four packages must
          stay on the same version.
        </p>
        <fui-code-block [code]="installSnippet" language="bash" title="Install — pnpm" />
        <fui-code-block [code]="installSnippetNpm" language="bash" title="Install — npm" />
      </fui-card>

      <fui-card>
        <h2>Notes</h2>
        <ul>
          <li>
            MAJOR version bumps coincide with Angular major releases and may contain breaking
            changes to component APIs or design tokens.
          </li>
          <li>
            MINOR and PATCH releases within a MAJOR are always backward-compatible. You can
            update freely within the same MAJOR.
          </li>
          <li>
            TypeScript and Node.js requirements reflect the minimums enforced by Angular itself.
            Consult the
            <a href="https://angular.dev/reference/releases" target="_blank" rel="noopener noreferrer">
              Angular release schedule
            </a>
            for end-of-life dates.
          </li>
          <li>
            All four packages are always released together at the same version. Mixing versions
            across the four packages is not supported.
          </li>
        </ul>
      </fui-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }

      .doc-page {
        padding: var(--primitive-spacing-8);
        max-width: 960px;
        margin: 0 auto;
        display: grid;
        gap: var(--primitive-spacing-6);
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
      }

      h2 {
        font-size: var(--primitive-font-size-xl);
        margin-bottom: var(--primitive-spacing-4);
        color: var(--semantic-text-primary);
      }

      .lead {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-lg);
        line-height: 1.7;
      }

      .lead code {
        font-family: var(--primitive-font-family-mono, monospace);
        font-size: 0.875em;
        background-color: var(--semantic-surface-background-secondary);
        padding: 0.1em 0.35em;
        border-radius: var(--primitive-border-radius-sm);
      }

      .table-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .compat-table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--primitive-font-size-sm);
      }

      .compat-table th,
      .compat-table td {
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        text-align: left;
        border-bottom: 1px solid var(--semantic-border-default);
        white-space: nowrap;
      }

      .compat-table th {
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-secondary);
        background-color: var(--semantic-surface-background-secondary);
        font-size: var(--primitive-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .compat-table tbody tr:hover {
        background-color: var(--semantic-surface-background-secondary);
      }

      .compat-table tbody tr:last-child td {
        border-bottom: none;
      }

      .row--latest td {
        font-weight: var(--primitive-font-weight-medium);
      }

      .compat-table a {
        color: var(--semantic-brand-primary);
        text-decoration: none;
      }

      .compat-table a:hover {
        text-decoration: underline;
      }

      ul {
        padding-left: var(--primitive-spacing-6);
        display: grid;
        gap: var(--primitive-spacing-3);
        color: var(--semantic-text-secondary);
        line-height: 1.6;
      }

      ul a {
        color: var(--semantic-brand-primary);
        text-decoration: none;
      }

      ul a:hover {
        text-decoration: underline;
      }

      .scheme-grid {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        margin: var(--primitive-spacing-6) 0;
        flex-wrap: wrap;
      }

      .scheme-block {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-1);
        background-color: var(--semantic-surface-background-secondary);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        padding: var(--primitive-spacing-4);
        min-width: 160px;
        flex: 1;
      }

      .scheme-label {
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-bold);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--semantic-brand-primary);
      }

      .scheme-value {
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-primary);
      }

      .scheme-example {
        font-size: var(--primitive-font-size-xs);
        color: var(--semantic-text-secondary);
        font-family: var(--primitive-font-family-mono, monospace);
      }

      .scheme-sep {
        font-size: 1.5rem;
        font-weight: var(--primitive-font-weight-bold);
        color: var(--semantic-text-secondary);
        flex-shrink: 0;
      }

      .scheme-note {
        font-size: var(--primitive-font-size-sm);
        color: var(--semantic-text-secondary);
        line-height: 1.6;
        margin-top: var(--primitive-spacing-2);
      }

      .scheme-note code {
        font-family: var(--primitive-font-family-mono, monospace);
        font-size: 0.875em;
        background-color: var(--semantic-surface-background-secondary);
        padding: 0.1em 0.35em;
        border-radius: var(--primitive-border-radius-sm);
      }

      p {
        color: var(--semantic-text-secondary);
        line-height: 1.6;
        margin-bottom: var(--primitive-spacing-4);
      }

      p:last-child {
        margin-bottom: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompatibilityComponent {
  protected readonly matrix: CompatibilityEntry[] = COMPATIBILITY_MATRIX;
  protected readonly packages = PUBLISHED_PACKAGES;

  protected readonly installSnippet = `pnpm add @mfontecchio/components @mfontecchio/theming @mfontecchio/shared`;

  protected readonly installSnippetNpm = `npm install @mfontecchio/components @mfontecchio/theming @mfontecchio/shared`;
}
