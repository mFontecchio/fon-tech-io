import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent, ButtonComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TooltipComponent, ButtonComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Tooltip</h3>
      <ui-card>
        <ui-tooltip text="This is a helpful tooltip">
          <ui-button>Hover over me</ui-button>
        </ui-tooltip>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Positions</h3>
      <ui-card>
        <div class="tooltip-grid">
          <ui-tooltip text="Tooltip on top" position="top">
            <ui-button>Top</ui-button>
          </ui-tooltip>
          <ui-tooltip text="Tooltip on right" position="right">
            <ui-button>Right</ui-button>
          </ui-tooltip>
          <ui-tooltip text="Tooltip on bottom" position="bottom">
            <ui-button>Bottom</ui-button>
          </ui-tooltip>
          <ui-tooltip text="Tooltip on left" position="left">
            <ui-button>Left</ui-button>
          </ui-tooltip>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Trigger Types</h3>
      <ui-card>
        <div class="tooltip-grid">
          <ui-tooltip text="Shown on hover (default)" trigger="hover">
            <ui-button>Hover</ui-button>
          </ui-tooltip>
          <ui-tooltip text="Shown on click" trigger="click">
            <ui-button>Click</ui-button>
          </ui-tooltip>
          <ui-tooltip text="Shown on focus" trigger="focus">
            <ui-button>Focus</ui-button>
          </ui-tooltip>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Different Content</h3>
      <ui-card>
        <div class="tooltip-grid">
          <ui-tooltip text="Short tip">
            <ui-button variant="outlined">Short</ui-button>
          </ui-tooltip>
          <ui-tooltip text="This is a much longer tooltip that provides more detailed information about the feature">
            <ui-button variant="outlined">Long</ui-button>
          </ui-tooltip>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Examples</h3>
      <ui-card>
        <div class="examples">
          <ui-tooltip text="Save your current work">
            <ui-button color="success">💾 Save</ui-button>
          </ui-tooltip>
          
          <ui-tooltip text="Undo your last action">
            <ui-button variant="outlined">↶ Undo</ui-button>
          </ui-tooltip>
          
          <ui-tooltip text="Permanently delete this item. This action cannot be undone.">
            <ui-button color="error" variant="outlined">🗑 Delete</ui-button>
          </ui-tooltip>
          
          <ui-tooltip text="Download as PDF file">
            <ui-button variant="text">⬇ Download</ui-button>
          </ui-tooltip>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Info Icons with Tooltips</h3>
      <ui-card>
        <div class="info-items">
          <div class="info-item">
            <span>Username</span>
            <ui-tooltip text="Must be 3-20 characters, alphanumeric only">
              <span class="info-icon">ℹ</span>
            </ui-tooltip>
          </div>
          <div class="info-item">
            <span>Password</span>
            <ui-tooltip text="Minimum 8 characters, include uppercase, lowercase, and numbers">
              <span class="info-icon">ℹ</span>
            </ui-tooltip>
          </div>
          <div class="info-item">
            <span>API Key</span>
            <ui-tooltip text="Keep this secret! Never share it publicly or commit it to version control">
              <span class="info-icon">⚠</span>
            </ui-tooltip>
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

    .tooltip-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--primitive-spacing-4);
      justify-items: center;
    }

    .examples {
      display: flex;
      gap: var(--primitive-spacing-3);
      flex-wrap: wrap;
    }

    .info-items {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-2);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
    }

    .info-item span:first-child {
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
      font-weight: var(--primitive-font-weight-medium);
    }

    .info-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--semantic-brand-subtle);
      color: var(--semantic-brand-primary);
      font-size: var(--primitive-font-size-sm);
      cursor: help;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {}
