import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, TabComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Tabs</h3>
      <ui-card>
        <ui-tabs>
          <ui-tab label="Profile">
            <div class="tab-content">
              <h4>Profile Information</h4>
              <p>View and edit your profile details here.</p>
            </div>
          </ui-tab>
          <ui-tab label="Settings">
            <div class="tab-content">
              <h4>Account Settings</h4>
              <p>Manage your account preferences and settings.</p>
            </div>
          </ui-tab>
          <ui-tab label="Notifications">
            <div class="tab-content">
              <h4>Notification Preferences</h4>
              <p>Configure how you receive notifications.</p>
            </div>
          </ui-tab>
        </ui-tabs>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Controlled Tabs</h3>
      <ui-card>
        <p class="info-text">Active tab index: {{ activeTabIndex() }}</p>
        <ui-tabs [activeIndex]="activeTabIndex()" (activeIndexChange)="activeTabIndex.set($event)">
          <ui-tab label="Tab 1">
            <div class="tab-content">
              <p>Content for Tab 1</p>
            </div>
          </ui-tab>
          <ui-tab label="Tab 2">
            <div class="tab-content">
              <p>Content for Tab 2</p>
            </div>
          </ui-tab>
          <ui-tab label="Tab 3">
            <div class="tab-content">
              <p>Content for Tab 3</p>
            </div>
          </ui-tab>
        </ui-tabs>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Many Tabs</h3>
      <ui-card>
        <ui-tabs>
          <ui-tab label="Overview">
            <div class="tab-content"><p>Overview content</p></div>
          </ui-tab>
          <ui-tab label="Features">
            <div class="tab-content"><p>Features content</p></div>
          </ui-tab>
          <ui-tab label="Pricing">
            <div class="tab-content"><p>Pricing content</p></div>
          </ui-tab>
          <ui-tab label="Support">
            <div class="tab-content"><p>Support content</p></div>
          </ui-tab>
          <ui-tab label="Documentation">
            <div class="tab-content"><p>Documentation content</p></div>
          </ui-tab>
          <ui-tab label="API">
            <div class="tab-content"><p>API content</p></div>
          </ui-tab>
        </ui-tabs>
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

    .tab-content {
      padding: var(--primitive-spacing-4);
    }

    .tab-content h4 {
      margin: 0 0 var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .tab-content p {
      margin: 0;
      color: var(--semantic-text-secondary);
    }

    .info-text {
      margin-bottom: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoComponent {
  protected activeTabIndex = signal(0);
}
