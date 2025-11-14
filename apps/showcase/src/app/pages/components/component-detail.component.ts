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
import { TabsComponent, TabComponent, AlertComponent, CardComponent } from '@ui-suite/components';
import { PropTableComponent } from '../../shared/prop-table.component';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { getComponentMetadata, hasComponentMetadata } from '../../data/component-metadata';

// Form Components
import { ButtonDemoComponent } from '../../demos/button-demo.component';
import { InputDemoComponent } from '../../demos/input-demo.component';
import { TextareaDemoComponent } from '../../demos/textarea-demo.component';
import { CheckboxDemoComponent } from '../../demos/checkbox-demo.component';
import { RadioDemoComponent } from '../../demos/radio-demo.component';
import { SwitchDemoComponent } from '../../demos/switch-demo.component';
import { SelectDemoComponent } from '../../demos/select-demo.component';
import { MultiSelectDemoComponent } from '../../demos/multi-select-demo.component';
import { SliderDemoComponent } from '../../demos/slider-demo.component';
import { DatePickerDemoComponent } from '../../demos/date-picker-demo.component';
import { FileUploadDemoComponent } from '../../demos/file-upload-demo.component';

// Layout Components
import { CardDemoComponent } from '../../demos/card-demo.component';
import { ModalDemoComponent } from '../../demos/modal-demo.component';
import { TabsDemoComponent } from '../../demos/tabs-demo.component';
import { AccordionDemoComponent } from '../../demos/accordion-demo.component';
import { DividerDemoComponent } from '../../demos/divider-demo.component';
import { DrawerDemoComponent } from '../../demos/drawer-demo.component';
import { StackDemoComponent } from '../../demos/stack-demo.component';
import { GridDemoComponent } from '../../demos/grid-demo.component';

// Data Display Components
import { BadgeDemoComponent } from '../../demos/badge-demo.component';
import { AvatarDemoComponent } from '../../demos/avatar-demo.component';
import { TooltipDemoComponent } from '../../demos/tooltip-demo.component';
import { ChipDemoComponent } from '../../demos/chip-demo.component';
import { PopoverDemoComponent } from '../../demos/popover-demo.component';
import { PaginationDemoComponent } from '../../demos/pagination-demo.component';
import { TableDemoComponent } from '../../demos/table-demo.component';
import { ListDemoComponent } from '../../demos/list-demo.component';

// Feedback Components
import { AlertDemoComponent } from '../../demos/alert-demo.component';
import { SpinnerDemoComponent } from '../../demos/spinner-demo.component';
import { ProgressDemoComponent } from '../../demos/progress-demo.component';
import { SkeletonDemoComponent } from '../../demos/skeleton-demo.component';
import { ToastDemoComponent } from '../../demos/toast-demo.component';

// Navigation Components
import { BreadcrumbDemoComponent } from '../../demos/breadcrumb-demo.component';
import { MenuDemoComponent } from '../../demos/menu-demo.component';
import { NavbarDemoComponent } from '../../demos/navbar-demo.component';
import { StepperDemoComponent } from '../../demos/stepper-demo.component';

@Component({
  selector: 'app-component-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TabsComponent,
    TabComponent,
    AlertComponent,
    CardComponent,
    PropTableComponent,
    CodeBlockComponent,
    // Form
    ButtonDemoComponent,
    InputDemoComponent,
    TextareaDemoComponent,
    CheckboxDemoComponent,
    RadioDemoComponent,
    SwitchDemoComponent,
    SelectDemoComponent,
    MultiSelectDemoComponent,
    SliderDemoComponent,
    DatePickerDemoComponent,
    FileUploadDemoComponent,
    // Layout
    CardDemoComponent,
    ModalDemoComponent,
    TabsDemoComponent,
    AccordionDemoComponent,
    DividerDemoComponent,
    DrawerDemoComponent,
    StackDemoComponent,
    GridDemoComponent,
    // Data Display
    BadgeDemoComponent,
    AvatarDemoComponent,
    TooltipDemoComponent,
    ChipDemoComponent,
    PopoverDemoComponent,
    PaginationDemoComponent,
    TableDemoComponent,
    ListDemoComponent,
    // Feedback
    AlertDemoComponent,
    SpinnerDemoComponent,
    ProgressDemoComponent,
    SkeletonDemoComponent,
    ToastDemoComponent,
    // Navigation
    BreadcrumbDemoComponent,
    MenuDemoComponent,
    NavbarDemoComponent,
    StepperDemoComponent,
  ],
  template: `
    <div class="component-detail-page">
      <!-- Header -->
      <div class="component-header">
        <h1>{{ componentName() }}</h1>
        <p class="category-badge">{{ category() }}</p>
        @if (metadata()) {
          <p class="component-description">{{ metadata()!.description }}</p>
        }
      </div>

      <!-- Interactive Demo Section (Hero) -->
      @if (metadata()) {
        <div class="demo-section">
          <div class="demo-section-header">
            <h2>Interactive Demo</h2>
            <p>Try out the component with different configurations</p>
          </div>

          <div class="demo-container">
            @switch (componentId()) {
              @case ('button') {
                <app-button-demo />
              }
              @case ('input') {
                <app-input-demo />
              }
              @case ('textarea') {
                <app-textarea-demo />
              }
              @case ('checkbox') {
                <app-checkbox-demo />
              }
              @case ('radio') {
                <app-radio-demo />
              }
              @case ('switch') {
                <app-switch-demo />
              }
              @case ('select') {
                <app-select-demo />
              }
              @case ('multi-select') {
                <app-multi-select-demo />
              }
              @case ('slider') {
                <app-slider-demo />
              }
              @case ('date-picker') {
                <app-date-picker-demo />
              }
              @case ('file-upload') {
                <app-file-upload-demo />
              }
              @case ('card') {
                <app-card-demo />
              }
              @case ('modal') {
                <app-modal-demo />
              }
              @case ('tabs') {
                <app-tabs-demo />
              }
              @case ('accordion') {
                <app-accordion-demo />
              }
              @case ('divider') {
                <app-divider-demo />
              }
              @case ('drawer') {
                <app-drawer-demo />
              }
              @case ('stack') {
                <app-stack-demo />
              }
              @case ('grid') {
                <app-grid-demo />
              }
              @case ('badge') {
                <app-badge-demo />
              }
              @case ('avatar') {
                <app-avatar-demo />
              }
              @case ('tooltip') {
                <app-tooltip-demo />
              }
              @case ('chip') {
                <app-chip-demo />
              }
              @case ('popover') {
                <app-popover-demo />
              }
              @case ('pagination') {
                <app-pagination-demo />
              }
              @case ('table') {
                <app-table-demo />
              }
              @case ('list') {
                <app-list-demo />
              }
              @case ('alert') {
                <app-alert-demo />
              }
              @case ('spinner') {
                <app-spinner-demo />
              }
              @case ('progress') {
                <app-progress-demo />
              }
              @case ('skeleton') {
                <app-skeleton-demo />
              }
              @case ('toast') {
                <app-toast-demo />
              }
              @case ('breadcrumb') {
                <app-breadcrumb-demo />
              }
              @case ('menu') {
                <app-menu-demo />
              }
              @case ('navbar') {
                <app-navbar-demo />
              }
              @case ('stepper') {
                <app-stepper-demo />
              }
              @default {
                <ui-card>
                  <ui-alert variant="info">
                    <strong>Interactive Demo Coming Soon</strong>
                    <p>We're building an interactive demo for this component.</p>
                    <p>
                      For now, check the <strong>Examples</strong> tab for code samples you can try.
                    </p>
                  </ui-alert>
                </ui-card>
              }
            }
          </div>
        </div>
      }

      <!-- Documentation Tabs -->
      @if (metadata()) {
        <ui-tabs>
          <!-- Overview Tab -->
          <ui-tab label="Overview">
            <div class="tab-content">
              <h2>About</h2>
              <p>{{ metadata()!.description }}</p>

              <h3>Selector</h3>
              <app-code-block
                [code]="'<' + metadata()!.selector + '></' + metadata()!.selector + '>'"
                language="html"
              />

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
            </div>
          </ui-tab>

          <!-- API Tab -->
          <ui-tab label="API">
            <div class="tab-content">
              @if (metadata()!.inputs.length > 0) {
                <h2>Inputs</h2>
                <app-prop-table [inputs]="metadata()!.inputs" [outputs]="[]" />
              }

              @if (metadata()!.outputs.length > 0) {
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
            </div>
          </ui-tab>

          <!-- Examples Tab -->
          <ui-tab label="Examples">
            <div class="tab-content">
              @for (example of metadata()!.examples; track example.title) {
                <div class="example-section">
                  <h3>{{ example.title }}</h3>
                  <p>{{ example.description }}</p>

                  @if (example.typescript) {
                    <app-code-block
                      [code]="example.typescript"
                      [title]="'Component (TypeScript)'"
                      language="typescript"
                    />
                  }

                  @if (example.template) {
                    <app-code-block
                      [code]="example.template"
                      [title]="'Template (HTML)'"
                      language="html"
                    />
                  }

                  @if (example.styles) {
                    <app-code-block
                      [code]="example.styles"
                      [title]="'Styles (CSS)'"
                      language="css"
                    />
                  }
                </div>
              }
            </div>
          </ui-tab>

          <!-- Accessibility Tab -->
          <ui-tab label="Accessibility">
            <div class="tab-content">
              <h2>ARIA Support</h2>
              <ul>
                @for (aria of metadata()!.accessibility.ariaSupport; track aria) {
                  <li>{{ aria }}</li>
                }
              </ul>

              <h2>Keyboard Navigation</h2>
              <table class="keyboard-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  @for (
                    shortcut of metadata()!.accessibility.keyboardNavigation;
                    track shortcut.key
                  ) {
                    <tr>
                      <td>
                        <kbd>{{ shortcut.key }}</kbd>
                      </td>
                      <td>{{ shortcut.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>

              <h2>Screen Reader Notes</h2>
              <p>{{ metadata()!.accessibility.screenReaderNotes }}</p>
            </div>
          </ui-tab>
        </ui-tabs>
      } @else {
        <!-- No metadata available -->
        <ui-alert variant="info">
          <strong>Documentation In Progress</strong>
          <p>API documentation for this component is being written. Check back soon!</p>
        </ui-alert>
      }
    </div>
  `,
  styles: [
    `
      .component-detail-page {
        padding: var(--primitive-spacing-8);
        max-width: 1200px;
        margin: 0 auto;
      }

      /* Header */
      .component-header {
        margin-bottom: var(--primitive-spacing-8);
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: var(--primitive-spacing-2);
        color: var(--semantic-text-primary);
      }

      .category-badge {
        display: inline-block;
        padding: var(--primitive-spacing-1) var(--primitive-spacing-3);
        background-color: var(--semantic-brand-subtle);
        color: var(--semantic-brand-primary);
        border-radius: var(--primitive-border-radius-full);
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-medium);
        margin-bottom: var(--primitive-spacing-4);
        text-transform: capitalize;
      }

      .component-description {
        font-size: var(--primitive-font-size-lg);
        color: var(--semantic-text-secondary);
        line-height: 1.6;
      }

      /* Tab Content */
      .tab-content {
        padding: var(--primitive-spacing-6) 0;
      }

      h2 {
        font-size: var(--primitive-font-size-xl);
        margin: var(--primitive-spacing-6) 0 var(--primitive-spacing-4) 0;
        color: var(--semantic-text-primary);
      }

      h2:first-child {
        margin-top: 0;
      }

      h3 {
        font-size: var(--primitive-font-size-lg);
        margin: var(--primitive-spacing-5) 0 var(--primitive-spacing-3) 0;
        color: var(--semantic-text-primary);
      }

      p {
        line-height: 1.6;
        color: var(--semantic-text-secondary);
        margin-bottom: var(--primitive-spacing-4);
      }

      /* Best Practices */
      .best-practices-list {
        list-style: none;
        padding: 0;
      }

      .best-practices-list li {
        padding-left: var(--primitive-spacing-6);
        margin-bottom: var(--primitive-spacing-3);
        position: relative;
        line-height: 1.6;
        color: var(--semantic-text-secondary);
      }

      .best-practices-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--semantic-success-primary);
        font-weight: var(--primitive-font-weight-bold);
      }

      /* Related Components */
      .related-components {
        display: flex;
        flex-wrap: wrap;
        gap: var(--primitive-spacing-2);
      }

      .related-chip {
        padding: var(--primitive-spacing-2) var(--primitive-spacing-4);
        background-color: var(--semantic-surface-subtle);
        border-radius: var(--primitive-border-radius-md);
        text-decoration: none;
        color: var(--semantic-text-primary);
        font-size: var(--primitive-font-size-sm);
        transition: all 0.2s;
        text-transform: capitalize;
      }

      .related-chip:hover {
        background-color: var(--semantic-brand-subtle);
        color: var(--semantic-brand-primary);
      }

      /* Examples */
      .example-section {
        margin-bottom: var(--primitive-spacing-8);
        padding-bottom: var(--primitive-spacing-8);
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .example-section:last-child {
        border-bottom: none;
      }

      /* Methods */
      .methods-list {
        display: flex;
        flex-direction: column;
        gap: var(--primitive-spacing-4);
      }

      .method-item {
        padding: var(--primitive-spacing-4);
        background-color: var(--semantic-surface-subtle);
        border-radius: var(--primitive-border-radius-md);
      }

      .method-item h4 {
        margin: 0 0 var(--primitive-spacing-2) 0;
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-3);
      }

      .method-item code {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        color: var(--semantic-brand-primary);
      }

      .return-type {
        color: var(--semantic-text-secondary);
        font-size: var(--primitive-font-size-sm);
      }

      .method-item p {
        margin: 0;
      }

      /* Keyboard Table */
      .keyboard-table {
        width: 100%;
        border-collapse: collapse;
      }

      .keyboard-table th,
      .keyboard-table td {
        padding: var(--primitive-spacing-3);
        text-align: left;
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .keyboard-table th {
        background-color: var(--semantic-surface-subtle);
        font-weight: var(--primitive-font-weight-bold);
      }

      kbd {
        display: inline-block;
        padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
        background-color: var(--semantic-surface-subtle);
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-sm);
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: var(--primitive-font-size-sm);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      /* Demo Section (Hero) */
      .demo-section {
        margin-top: var(--primitive-spacing-8);
        margin-bottom: var(--primitive-spacing-8);
        padding: var(--primitive-spacing-6);
        background: linear-gradient(
          135deg,
          var(--semantic-surface-subtle) 0%,
          var(--semantic-surface-default) 100%
        );
        border-radius: var(--primitive-border-radius-lg);
        border: 1px solid var(--semantic-border-default);
      }

      .demo-section-header {
        margin-bottom: var(--primitive-spacing-6);
        text-align: center;
      }

      .demo-section-header h2 {
        font-size: var(--primitive-font-size-2xl);
        margin-bottom: var(--primitive-spacing-2);
        color: var(--semantic-text-primary);
      }

      .demo-section-header p {
        font-size: var(--primitive-font-size-md);
        color: var(--semantic-text-secondary);
        margin: 0;
      }

      .demo-container {
        background-color: var(--semantic-surface-default);
        padding: var(--primitive-spacing-6);
        border-radius: var(--primitive-border-radius-md);
        border: 1px solid var(--semantic-border-subtle);
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

  protected metadata = computed(() => {
    const id = this.componentId();
    if (!id) return null;
    const result = getComponentMetadata(id);
    console.log('Looking up metadata for:', id, 'Found:', result ? 'YES' : 'NO');
    if (result) {
      console.log('Metadata details:', {
        name: result.name,
        inputCount: result.inputs?.length,
        outputCount: result.outputs?.length,
        exampleCount: result.examples?.length,
        hasAccessibility: !!result.accessibility,
      });
    }
    return result || null;
  });

  ngOnInit(): void {
    // Subscribe to route param changes
    this.route.params.subscribe((params) => {
      const category = params['category'] || '';
      const name = params['name'] || '';

      console.log('Route params:', { category, name });

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
}
