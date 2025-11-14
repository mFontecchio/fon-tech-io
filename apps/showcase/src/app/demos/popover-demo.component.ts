import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent, ButtonComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-popover-demo',
  standalone: true,
  imports: [CommonModule, PopoverComponent, ButtonComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Popover</h3>
      <ui-card>
        <ui-popover>
          <ui-button>Open Popover</ui-button>
          <div class="popover-content">
            <h4>Popover Title</h4>
            <p>This is the popover content. You can put any content here.</p>
          </div>
        </ui-popover>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Positions</h3>
      <ui-card>
        <div class="popover-grid">
          <ui-popover position="top">
            <ui-button>Top</ui-button>
            <div class="popover-content">
              <p>Popover on top</p>
            </div>
          </ui-popover>
          
          <ui-popover position="right">
            <ui-button>Right</ui-button>
            <div class="popover-content">
              <p>Popover on right</p>
            </div>
          </ui-popover>
          
          <ui-popover position="bottom">
            <ui-button>Bottom</ui-button>
            <div class="popover-content">
              <p>Popover on bottom</p>
            </div>
          </ui-popover>
          
          <ui-popover position="left">
            <ui-button>Left</ui-button>
            <div class="popover-content">
              <p>Popover on left</p>
            </div>
          </ui-popover>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Trigger Types</h3>
      <ui-card>
        <div class="popover-grid">
          <ui-popover trigger="click">
            <ui-button>Click</ui-button>
            <div class="popover-content">
              <p>Shown on click</p>
            </div>
          </ui-popover>
          
          <ui-popover trigger="hover">
            <ui-button>Hover</ui-button>
            <div class="popover-content">
              <p>Shown on hover</p>
            </div>
          </ui-popover>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>User Card Example</h3>
      <ui-card>
        <ui-popover trigger="click" position="right">
          <ui-button variant="outlined">View Profile</ui-button>
          <div class="user-card">
            <div class="user-avatar">JD</div>
            <div class="user-info">
              <h4>John Doe</h4>
              <p class="user-role">Senior Developer</p>
              <p class="user-bio">Full-stack developer with 10+ years experience</p>
              <div class="user-stats">
                <div class="stat">
                  <strong>125</strong>
                  <span>Posts</span>
                </div>
                <div class="stat">
                  <strong>1.2k</strong>
                  <span>Followers</span>
                </div>
                <div class="stat">
                  <strong>340</strong>
                  <span>Following</span>
                </div>
              </div>
              <ui-button size="sm" color="primary" [fullWidth]="true">Follow</ui-button>
            </div>
          </div>
        </ui-popover>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Settings Menu Example</h3>
      <ui-card>
        <ui-popover trigger="click">
          <ui-button variant="outlined">⚙ Settings</ui-button>
          <div class="menu-content">
            <div class="menu-item">⚙ Preferences</div>
            <div class="menu-item">🔔 Notifications</div>
            <div class="menu-item">🔒 Privacy</div>
            <div class="menu-divider"></div>
            <div class="menu-item danger">🚪 Sign Out</div>
          </div>
        </ui-popover>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Rich Content Example</h3>
      <ui-card>
        <ui-popover trigger="click" position="bottom">
          <ui-button>📅 Schedule</ui-button>
          <div class="schedule-content">
            <h4>Quick Schedule</h4>
            <div class="schedule-options">
              <button class="schedule-option">
                <strong>Today</strong>
                <span>Nov 14, 2025</span>
              </button>
              <button class="schedule-option">
                <strong>Tomorrow</strong>
                <span>Nov 15, 2025</span>
              </button>
              <button class="schedule-option">
                <strong>Next Week</strong>
                <span>Nov 21, 2025</span>
              </button>
              <button class="schedule-option">
                <strong>Custom Date</strong>
                <span>Pick a date</span>
              </button>
            </div>
          </div>
        </ui-popover>
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

    .popover-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--primitive-spacing-4);
      justify-items: center;
    }

    .popover-content {
      padding: var(--primitive-spacing-3);
      min-width: 200px;
    }

    .popover-content h4 {
      margin: 0 0 var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .popover-content p {
      margin: 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      line-height: var(--primitive-line-height-md);
    }

    .user-card {
      padding: var(--primitive-spacing-4);
      min-width: 280px;
    }

    .user-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--semantic-brand-primary), var(--semantic-brand-secondary));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--primitive-font-size-xl);
      font-weight: var(--primitive-font-weight-bold);
      margin-bottom: var(--primitive-spacing-3);
    }

    .user-info h4 {
      margin: 0 0 var(--primitive-spacing-1) 0;
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .user-role {
      margin: 0 0 var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      font-weight: var(--primitive-font-weight-medium);
    }

    .user-bio {
      margin: 0 0 var(--primitive-spacing-4) 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      line-height: var(--primitive-line-height-md);
    }

    .user-stats {
      display: flex;
      gap: var(--primitive-spacing-4);
      margin-bottom: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3) 0;
      border-top: 1px solid var(--semantic-border-subtle);
      border-bottom: 1px solid var(--semantic-border-subtle);
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }

    .stat strong {
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .stat span {
      font-size: var(--primitive-font-size-xs);
      color: var(--semantic-text-tertiary);
    }

    .menu-content {
      padding: var(--primitive-spacing-2);
      min-width: 200px;
    }

    .menu-item {
      padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
      border-radius: var(--primitive-border-radius-sm);
      cursor: pointer;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-primary);
      transition: background-color 0.2s;
    }

    .menu-item:hover {
      background-color: var(--semantic-surface-subtle);
    }

    .menu-item.danger {
      color: var(--semantic-error-primary);
    }

    .menu-divider {
      height: 1px;
      background-color: var(--semantic-border-subtle);
      margin: var(--primitive-spacing-2) 0;
    }

    .schedule-content {
      padding: var(--primitive-spacing-4);
      min-width: 280px;
    }

    .schedule-content h4 {
      margin: 0 0 var(--primitive-spacing-3) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .schedule-options {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-2);
    }

    .schedule-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--primitive-spacing-3);
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-md);
      background-color: var(--semantic-surface-default);
      cursor: pointer;
      transition: all 0.2s;
    }

    .schedule-option:hover {
      border-color: var(--semantic-brand-primary);
      background-color: var(--semantic-brand-subtle);
    }

    .schedule-option strong {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-primary);
    }

    .schedule-option span {
      font-size: var(--primitive-font-size-xs);
      color: var(--semantic-text-tertiary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverDemoComponent {}
