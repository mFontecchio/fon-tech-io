import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [CommonModule, DividerComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Horizontal Divider</h3>
      <ui-card>
        <p>Content above the divider</p>
        <ui-divider />
        <p>Content below the divider</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Vertical Divider</h3>
      <ui-card>
        <div class="vertical-container">
          <span>Left content</span>
          <ui-divider orientation="vertical" />
          <span>Middle content</span>
          <ui-divider orientation="vertical" />
          <span>Right content</span>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Text</h3>
      <ui-card>
        <p>Section 1 content</p>
        <ui-divider text="OR" />
        <p>Section 2 content</p>
        <ui-divider text="CONTINUED" />
        <p>Section 3 content</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Text Alignment</h3>
      <ui-card>
        <p>Content before</p>
        <ui-divider text="Left aligned" textAlign="left" />
        <p>Content middle</p>
        <ui-divider text="Center aligned" textAlign="center" />
        <p>Content middle</p>
        <ui-divider text="Right aligned" textAlign="right" />
        <p>Content after</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>List Separator</h3>
      <ui-card>
        <div class="list-container">
          <div class="list-item">
            <h4>Item 1</h4>
            <p>Description for item 1</p>
          </div>
          <ui-divider />
          <div class="list-item">
            <h4>Item 2</h4>
            <p>Description for item 2</p>
          </div>
          <ui-divider />
          <div class="list-item">
            <h4>Item 3</h4>
            <p>Description for item 3</p>
          </div>
        </div>
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

    p {
      color: var(--semantic-text-secondary);
      line-height: var(--primitive-line-height-md);
    }

    .vertical-container {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-2) 0;
    }

    .list-container {
      display: flex;
      flex-direction: column;
    }

    .list-item {
      padding: var(--primitive-spacing-3) 0;
    }

    .list-item h4 {
      margin: 0 0 var(--primitive-spacing-1) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .list-item p {
      margin: 0;
      font-size: var(--primitive-font-size-sm);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerDemoComponent {}
