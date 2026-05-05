/**
 * Component Detail Page
 * Shows API documentation and examples for a specific component
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  TabsComponent,
  TabComponent,
  AlertComponent,
  CodeBlockComponent,
} from '@ui-suite/components';
import { PropTableComponent } from '../../shared/prop-table.component';
import { ComponentDemoComponent } from '../../shared/component-demo.component';
import { ResponsivePreviewComponent } from '../../shared/responsive-preview.component';
import { PassthroughTableComponent } from '../../shared/passthrough-table.component';
import { getComponentMetadata } from '../../data/component-metadata';

@Component({
  selector: 'app-component-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TabsComponent,
    TabComponent,
    AlertComponent,
    PropTableComponent,
    CodeBlockComponent,
    ComponentDemoComponent,
    ResponsivePreviewComponent,
    PassthroughTableComponent,
  ],
  template: `
    <article class="component-detail-page">
      <!-- Header -->
      <header class="component-header">
        <h1>{{ componentName() }}</h1>
        <p class="category-badge">{{ category() }}</p>
        @if (metadata()) {
          <p class="component-description">{{ metadata()!.description }}</p>
        }
      </header>

      <!-- Documentation Tabs -->
      @if (metadata()) {
        <fui-tabs>
          <!-- Overview Tab -->
          <fui-tab label="Overview">
            <div class="tab-content">
              <!-- Standalone Import & Setup -->
              @if (metadata()!.setup) {
                <h3>Installation &amp; Import</h3>
                <fui-code-block
                  [code]="buildImportSnippet()"
                  [title]="'TypeScript'"
                  language="typescript"
                />

                @if (metadata()!.setup!.setupNotes) {
                  <p class="setup-notes">{{ metadata()!.setup!.setupNotes }}</p>
                }

                <h3>Minimal Usage</h3>
                <fui-code-block
                  [code]="metadata()!.setup!.usageSnippet"
                  [title]="'HTML'"
                  language="html"
                />

                @if (metadata()!.setup!.usageTypescript) {
                  <fui-code-block
                    [code]="metadata()!.setup!.usageTypescript!"
                    [title]="'TypeScript'"
                    language="typescript"
                  />
                }
              } @else {
                <!-- Fallback selector hint for components without explicit setup metadata -->
                <h3>Selector</h3>
                <fui-code-block
                  [code]="'<' + metadata()!.selector + '></' + metadata()!.selector + '>'"
                  [title]="'Usage'"
                  language="html"
                />
              }

              <!-- Quick Example Preview -->
              @if (metadata()!.examples && metadata()!.examples.length > 0) {
                <h3>Quick Example</h3>
                <div class="example-preview">
                  <app-component-demo
                    [componentId]="componentId()"
                    [exampleTitle]="metadata()!.examples[0].title"
                  />
                </div>
                <fui-code-block
                  [code]="metadata()!.examples[0].template ?? ''"
                  [title]="'HTML'"
                  language="html"
                />
                @if (metadata()!.examples[0].typescript) {
                  <fui-code-block
                    [code]="metadata()!.examples[0].typescript!"
                    [title]="'TypeScript'"
                    language="typescript"
                  />
                }
              }

              @if (metadata()!.bestPractices && metadata()!.bestPractices!.length > 0) {
                <h3>Best Practices</h3>
                <ul class="best-practices-list">
                  @for (practice of metadata()!.bestPractices; track practice) {
                    <li>{{ practice }}</li>
                  }
                </ul>
              }

              @if (metadata()!.relatedComponents && metadata()!.relatedComponents!.length > 0) {
                <h3>Related Components</h3>
                <div class="related-components">
                  @for (relatedId of metadata()!.relatedComponents; track relatedId) {
                    <a
                      [routerLink]="'/components/' + category() + '/' + relatedId"
                      class="related-chip"
                    >
                      {{ relatedId }}
                    </a>
                  }
                </div>
              }

              <!-- All Examples -->
              @if (metadata()!.examples && metadata()!.examples.length > 1) {
                <h2 style="margin-top: var(--primitive-spacing-8)">More Examples</h2>
                <div class="examples-toolbar">
                  <button
                    class="responsive-toggle"
                    [class.responsive-toggle--active]="showResponsivePreview()"
                    (click)="toggleResponsivePreview()"
                    aria-label="Toggle responsive preview"
                    [attr.aria-pressed]="showResponsivePreview()"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <path d="M8 21h8" />
                      <path d="M12 17v4" />
                    </svg>
                    <span>Responsive Preview</span>
                  </button>
                </div>

                @for (example of metadata()!.examples.slice(1); track example.title) {
                  <div class="example-section">
                    <h3>{{ example.title }}</h3>
                    <p>{{ example.description }}</p>

                    <!-- Component Preview -->
                    @if (example.template) {
                      @if (showResponsivePreview()) {
                        <app-responsive-preview>
                          <div class="example-preview-inner">
                            <app-component-demo
                              [componentId]="componentId()"
                              [exampleTitle]="example.title"
                            />
                          </div>
                        </app-responsive-preview>
                      } @else {
                        <div class="example-preview">
                          <app-component-demo
                            [componentId]="componentId()"
                            [exampleTitle]="example.title"
                          />
                        </div>
                      }
                      <fui-code-block
                        [code]="example.template"
                        [title]="'HTML'"
                        [filename]="generateFilename(example.title, 'html')"
                        language="html"
                      />
                    }

                    @if (example.typescript) {
                      <fui-code-block
                        [code]="example.typescript"
                        [title]="'TypeScript'"
                        [filename]="generateFilename(example.title, 'ts')"
                        language="typescript"
                      />
                    }
                  </div>
                }
              }
            </div>
          </fui-tab>

          <!-- API Tab -->
          <fui-tab label="API">
            <div class="tab-content">
              @if (metadata()!.inputs && metadata()!.inputs.length > 0) {
                <h2>Inputs</h2>
                <app-prop-table [inputs]="metadata()!.inputs" [outputs]="[]" />
              }

              @if (metadata()!.outputs && metadata()!.outputs.length > 0) {
                <h2>Outputs</h2>
                <app-prop-table
                  [inputs]="[]"
                  [outputs]="metadata()!.outputs"
                  [showDefault]="false"
                />
              }

              @if (metadata()!.methods && metadata()!.methods!.length > 0) {
                <h2>Methods</h2>
                <div class="methods-list">
                  @for (method of metadata()!.methods; track method.name) {
                    <div class="method-item">
                      <h4>
                        <code>{{ method.name }}{{ method.parameters }}</code>
                        <span class="return-type">→ {{ method.returnType }}</span>
                      </h4>
                      <p>{{ method.description }}</p>
                    </div>
                  }
                </div>
              }

              @if (metadata()!.passthroughs && metadata()!.passthroughs!.length > 0) {
                <h2>Content Projection &amp; Passthroughs</h2>
                <app-passthrough-table [passthroughs]="metadata()!.passthroughs!" />
              }
            </div>
          </fui-tab>

          <!-- Theming Tab -->
          @if (metadata()!.theming) {
            <fui-tab label="Theming">
              <div class="tab-content">
                <h2>Design Tokens</h2>
                <p>
                  This component is styled exclusively through CSS custom properties (design tokens).
                  Override these tokens at the nearest ancestor scope to theme the component without
                  modifying source files.
                </p>

                <div class="token-table-wrapper">
                  <table class="token-table">
                    <thead>
                      <tr>
                        <th>Token</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (tokenMeta of metadata()!.theming!.tokens; track tokenMeta.token) {
                        <tr>
                          <td><code class="token-code">{{ tokenMeta.token }}</code></td>
                          <td class="token-description">{{ tokenMeta.description }}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>

                @if (metadata()!.theming!.customizationNotes) {
                  <h3>Customisation</h3>
                  <p>{{ metadata()!.theming!.customizationNotes }}</p>
                }

                <h3>Override Example</h3>
                <p>
                  Scope token overrides to a CSS class or host element to avoid affecting other
                  components.  Do not use <code>::ng-deep</code>; use design tokens or CSS layers
                  instead.
                </p>
                <fui-code-block
                  [code]="buildTokenOverrideExample()"
                  [title]="'CSS'"
                  language="css"
                />
              </div>
            </fui-tab>
          }

          <!-- Accessibility Tab -->
          <fui-tab label="Accessibility">
            <div class="tab-content">
              @if (metadata()!.accessibility) {
                <h3>ARIA Support</h3>
                <ul class="accessibility-list">
                  @for (item of metadata()!.accessibility!.ariaSupport; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>

                <h3>Keyboard Navigation</h3>
                <ul class="accessibility-list">
                  @for (item of metadata()!.accessibility!.keyboardNavigation; track item.key) {
                    <li>
                      <strong>{{ item.key }}</strong
                      >: {{ item.description }}
                    </li>
                  }
                </ul>

                <h3>Screen Reader Notes</h3>
                <p>{{ metadata()!.accessibility!.screenReaderNotes }}</p>
              } @else {
                <fui-alert variant="info">Accessibility documentation coming soon.</fui-alert>
              }
            </div>
          </fui-tab>
        </fui-tabs>
      } @else {
        <fui-alert variant="warning">
          Documentation for <strong>{{ componentName() }}</strong> is in progress or not found.
        </fui-alert>
      }
    </article>
  `,
  styles: [
    `
      .component-detail-page {
        padding: var(--primitive-spacing-8);
        max-width: 1200px;
        margin: 0 auto;
      }

      .component-header {
        margin-bottom: var(--primitive-spacing-8);
      }

      h1 {
        font-size: var(--primitive-font-size-4xl);
        margin-bottom: var(--primitive-spacing-2);
        color: var(--semantic-text-primary);
      }

      .category-badge {
        display: inline-block;
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-text-secondary);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-3);
        border-radius: var(--primitive-border-radius-full);
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-medium);
        margin-bottom: var(--primitive-spacing-4);
        text-transform: capitalize;
      }

      .component-description {
        font-size: var(--primitive-font-size-lg);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-6);
      }

      .tab-content {
        padding: var(--primitive-spacing-6) 0;
      }

      .tab-content h2 {
        font-size: var(--primitive-font-size-2xl);
        margin-bottom: var(--primitive-spacing-4);
        color: var(--semantic-text-primary);
        border-bottom: 1px solid var(--semantic-border-default);
        padding-bottom: var(--primitive-spacing-2);
      }

      .tab-content h3 {
        font-size: var(--primitive-font-size-xl);
        margin-top: var(--primitive-spacing-6);
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      .tab-content p,
      .tab-content ul {
        font-size: var(--primitive-font-size-base);
        line-height: var(--primitive-line-height-lg);
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-4);
      }

      .best-practices-list,
      .accessibility-list {
        list-style: disc;
        margin-left: var(--primitive-spacing-5);
        padding-left: var(--primitive-spacing-2);
      }

      .best-practices-list li,
      .accessibility-list li {
        margin-bottom: var(--primitive-spacing-2);
      }

      .methods-list {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-6);
      }

      .method-item {
        background-color: var(--semantic-surface-background-secondary);
        border-left: 4px solid var(--semantic-brand-primary);
        padding: var(--primitive-spacing-4);
        border-radius: var(--primitive-border-radius-md);
      }

      .method-item h4 {
        font-family: var(--primitive-font-family-mono);
        font-size: var(--primitive-font-size-lg);
        color: var(--semantic-text-primary);
        margin-bottom: var(--primitive-spacing-2);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      .method-item h4 code {
        background-color: transparent;
        padding: 0;
        border-radius: 0;
        box-shadow: none;
      }

      .method-item .return-type {
        font-size: var(--primitive-font-size-base);
        color: var(--semantic-text-tertiary);
        margin-left: var(--primitive-spacing-3);
      }

      .method-item p {
        margin-bottom: 0;
      }

      .related-components {
        display: flex;
        flex-wrap: wrap;
        gap: var(--primitive-spacing-2);
      }

      .related-chip {
        padding: var(--primitive-spacing-2) var(--primitive-spacing-4);
        background-color: var(--semantic-surface-background-secondary);
        border-radius: var(--primitive-border-radius-md);
        text-decoration: none;
        color: var(--semantic-text-primary);
        font-size: var(--primitive-font-size-sm);
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
        text-transform: capitalize;
      }

      .related-chip:hover {
        background-color: var(--semantic-brand-primary-subtle);
        color: var(--semantic-brand-primary);
      }

      /* Examples */
      .examples-toolbar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: var(--primitive-spacing-4);
        padding-bottom: var(--primitive-spacing-3);
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .responsive-toggle {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        padding: var(--primitive-spacing-2) var(--primitive-spacing-4);
        border: 1px solid var(--semantic-border-default);
        background-color: transparent;
        color: var(--semantic-text-secondary);
        border-radius: var(--primitive-border-radius-md);
        cursor: pointer;
        transition: all var(--semantic-animation-duration-interactive, 150ms)
          var(--semantic-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-medium);
      }

      .responsive-toggle:hover {
        background-color: var(--semantic-surface-background-secondary);
        color: var(--semantic-text-primary);
        border-color: var(--semantic-border-strong);
      }

      .responsive-toggle--active {
        background-color: var(--semantic-brand-primary);
        color: var(--semantic-text-inverse);
        border-color: var(--semantic-brand-primary);
      }

      .responsive-toggle svg {
        stroke-width: 2;
      }

      .example-section {
        margin-bottom: var(--primitive-spacing-8);
        padding-bottom: var(--primitive-spacing-8);
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .example-section:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .example-preview-inner {
        padding: var(--primitive-spacing-4);
      }

      .example-section h3 {
        font-size: var(--primitive-font-size-xl);
        margin-bottom: var(--primitive-spacing-3);
        color: var(--semantic-text-primary);
      }

      .example-section p {
        margin-bottom: var(--primitive-spacing-4);
      }

      .example-preview {
        margin-bottom: var(--primitive-spacing-4);
        padding: var(--primitive-spacing-10);
        background: var(--semantic-surface-card);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        width: 100%;
      }

      code {
        background-color: var(--semantic-surface-code);
        color: var(--semantic-text-code);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: var(--primitive-font-size-sm);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      /* Setup notes */
      .setup-notes {
        font-size: var(--primitive-font-size-base);
        color: var(--semantic-text-secondary);
        background: var(--semantic-surface-background-secondary);
        border-left: 3px solid var(--semantic-brand-primary);
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        border-radius: 0 var(--primitive-border-radius-md) var(--primitive-border-radius-md) 0;
        margin-bottom: var(--primitive-spacing-4);
      }

      /* Token table */
      .token-table-wrapper {
        overflow-x: auto;
        margin-bottom: var(--primitive-spacing-6);
      }

      .token-table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--primitive-font-size-sm);
      }

      .token-table thead tr {
        background-color: var(--semantic-surface-background-secondary);
      }

      .token-table th {
        text-align: left;
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-primary);
        border-bottom: 2px solid var(--semantic-border-default);
      }

      .token-table td {
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        border-bottom: 1px solid var(--semantic-border-subtle);
        vertical-align: top;
      }

      .token-table tr:last-child td {
        border-bottom: none;
      }

      .token-table tr:hover td {
        background-color: var(--semantic-surface-background-secondary);
      }

      .token-code {
        font-size: var(--primitive-font-size-xs);
        white-space: nowrap;
        background-color: var(--semantic-surface-code);
        color: var(--semantic-text-code);
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        border-radius: var(--primitive-border-radius-sm);
        box-shadow: none;
      }

      .token-description {
        color: var(--semantic-text-secondary);
        line-height: var(--primitive-line-height-lg);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  protected category = signal('');
  protected componentName = signal('');
  protected componentId = signal('');
  protected showResponsivePreview = signal(false);

  protected metadata = computed(() => {
    const id = this.componentId();
    return id ? getComponentMetadata(id) : null;
  });

  ngOnInit(): void {
    // Subscribe to route param changes
    this.route.params.subscribe((params) => {
      const category = params['category'] || '';
      const name = params['name'] || '';

      this.category.set(category);
      this.componentId.set(name);
      this.componentName.set(
        name
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      );
    });
  }

  protected toggleResponsivePreview(): void {
    this.showResponsivePreview.update((show) => !show);
  }

  protected generateFilename(exampleTitle: string, extension: string): string {
    const cleanTitle = exampleTitle.toLowerCase().replace(/\s+/g, '-');
    return `${this.componentId()}-${cleanTitle}.${extension}`;
  }

  /** Builds the import statement code block shown in the Overview setup section. */
  protected buildImportSnippet(): string {
    const setup = this.metadata()?.setup;
    if (!setup) return '';
    const lines: string[] = [setup.importStatement];
    if (setup.additionalImports?.length) {
      lines.push(
        `// Additional types`,
        ...setup.additionalImports.map(
          (imp) => `import { ${imp} } from '@ui-suite/components';`
        )
      );
    }
    return lines.join('\n');
  }

  /** Builds a CSS snippet showing how to scope-override the first component token. */
  protected buildTokenOverrideExample(): string {
    const tokens = this.metadata()?.theming?.tokens;
    if (!tokens?.length) return '';
    const firstToken = tokens[0].token;
    return `.my-custom-${this.componentId()} {\n  ${firstToken}: /* your value */;\n}`;
  }
}
