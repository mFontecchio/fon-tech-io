import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent, AccordionItemComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [CommonModule, AccordionComponent, AccordionItemComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Accordion (Single)</h3>
      <ui-card>
        <ui-accordion>
          <ui-accordion-item title="What is Angular?" itemId="angular">
            <p>Angular is a platform and framework for building single-page client applications using HTML, CSS, and TypeScript.</p>
          </ui-accordion-item>
          <ui-accordion-item title="What are Signals?" itemId="signals">
            <p>Signals are Angular's new reactive primitive that provides fine-grained reactivity with automatic dependency tracking.</p>
          </ui-accordion-item>
          <ui-accordion-item title="What is Standalone?" itemId="standalone">
            <p>Standalone components are a new feature that allows components to be used without NgModules, simplifying the Angular architecture.</p>
          </ui-accordion-item>
        </ui-accordion>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Multiple Expansion</h3>
      <ui-card>
        <ui-accordion [expanded]="expandedIndices()" (expandedChange)="handleExpandedChange($event)">
          <ui-accordion-item title="Features" itemId="features">
            <ul>
              <li>Component-based architecture</li>
              <li>Reactive programming with RxJS</li>
              <li>Powerful CLI tooling</li>
              <li>TypeScript support</li>
            </ul>
          </ui-accordion-item>
          <ui-accordion-item title="Benefits" itemId="benefits">
            <ul>
              <li>Strong typing with TypeScript</li>
              <li>Excellent performance</li>
              <li>Large ecosystem</li>
              <li>Enterprise-ready</li>
            </ul>
          </ui-accordion-item>
          <ui-accordion-item title="Best Practices" itemId="practices">
            <ul>
              <li>Use OnPush change detection</li>
              <li>Leverage signals for state</li>
              <li>Follow the style guide</li>
              <li>Write testable code</li>
            </ul>
          </ui-accordion-item>
        </ui-accordion>
        <p class="info-text">Expanded: {{ expandedItems().join(', ') || 'None' }}</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>FAQ Example</h3>
      <ui-card>
        <ui-accordion>
          <ui-accordion-item title="How do I get started?" itemId="started">
            <p>Install the Angular CLI with <code>npm install -g @angular/cli</code>, then create a new project with <code>ng new my-app</code>.</p>
          </ui-accordion-item>
          <ui-accordion-item title="Is it free to use?" itemId="free">
            <p>Yes! Angular is completely free and open-source, licensed under MIT.</p>
          </ui-accordion-item>
          <ui-accordion-item title="What's new in Angular 20?" itemId="v20">
            <p>Angular 20 includes improvements to signals, enhanced performance, better developer experience, and more.</p>
          </ui-accordion-item>
          <ui-accordion-item title="Where can I get help?" itemId="help">
            <p>Visit the official documentation at angular.dev, join the Discord community, or ask questions on Stack Overflow.</p>
          </ui-accordion-item>
        </ui-accordion>
      </ui-card>
    </div>
  `,
  styles: [`
    .demo-section {
      margin-bottom: var(--primitive-spacing-6);
    }

    .demo-section h3 {
      margin-bottom: var(--primitive-spacing-3);
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    p, ul {
      color: var(--semantic-text-secondary);
      line-height: var(--primitive-line-height-md);
    }

    ul {
      margin: var(--primitive-spacing-2) 0 0 var(--primitive-spacing-5);
      padding: 0;
    }

    li {
      margin-bottom: var(--primitive-spacing-1);
    }

    code {
      background-color: var(--semantic-surface-code);
      color: var(--semantic-text-code);
      padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
      border-radius: var(--primitive-border-radius-sm);
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: var(--primitive-font-size-sm);
    }

    .info-text {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionDemoComponent {
  protected expandedItems = signal<string[]>([]);
  protected expandedIndices = signal<number[]>([0]);

  protected handleExpandedChange(indices: any): void {
    if (Array.isArray(indices)) {
      this.expandedIndices.set(indices);
    }
  }
}
