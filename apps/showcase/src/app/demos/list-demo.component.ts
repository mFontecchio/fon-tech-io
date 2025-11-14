import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent, CardComponent, AvatarComponent, BadgeComponent } from '@ui-suite/components';

@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [CommonModule, ListComponent, CardComponent, AvatarComponent, BadgeComponent],
  template: `
    <div class="demo-section">
      <h3>Basic List</h3>
      <ui-card>
        <ui-list [items]="basicItems()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Variants</h3>
      <ui-card>
        <div class="list-grid">
          <div>
            <p class="label">Default</p>
            <ui-list [items]="basicItems()" variant="default" />
          </div>
          <div>
            <p class="label">Bordered</p>
            <ui-list [items]="basicItems()" variant="bordered" />
          </div>
          <div>
            <p class="label">Divided</p>
            <ui-list [items]="basicItems()" variant="divided" />
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Interactive List</h3>
      <ui-card>
        <ui-list [items]="interactiveItems()" [interactive]="true" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>List with Avatars</h3>
      <ui-card>
        <ui-list [items]="users()" variant="divided">
          @for (user of users(); track user.id) {
            <div class="list-item-with-avatar">
              <ui-avatar [src]="user.avatar" size="md" />
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
              <ui-badge [variant]="user.online ? 'success' : 'default'" size="sm">
                {{ user.online ? 'Online' : 'Offline' }}
              </ui-badge>
            </div>
          }
        </ui-list>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Notification List</h3>
      <ui-card>
        <ui-list [items]="notifications()" variant="divided" [interactive]="true">
          @for (notification of notifications(); track notification.id) {
            <div class="notification-item">
              <div class="notification-icon" [class]="notification.type">
                {{ notification.icon }}
              </div>
              <div class="notification-content">
                <div class="notification-title">{{ notification.title }}</div>
                <div class="notification-message">{{ notification.message }}</div>
                <div class="notification-time">{{ notification.time }}</div>
              </div>
              @if (!notification.read) {
                <div class="unread-dot"></div>
              }
            </div>
          }
        </ui-list>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Settings List</h3>
      <ui-card>
        <ui-list [items]="settings()" variant="divided">
          @for (setting of settings(); track setting.id) {
            <div class="setting-item">
              <div class="setting-icon">{{ setting.icon }}</div>
              <div class="setting-info">
                <div class="setting-title">{{ setting.title }}</div>
                <div class="setting-description">{{ setting.description }}</div>
              </div>
              <div class="setting-action">
                <button class="setting-button">{{ setting.action }}</button>
              </div>
            </div>
          }
        </ui-list>
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

    .list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--primitive-spacing-4);
    }

    .label {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .list-item-with-avatar {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-3);
    }

    .user-info {
      flex: 1;
    }

    .user-name {
      font-size: var(--primitive-font-size-md);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-primary);
      margin-bottom: var(--primitive-spacing-1);
    }

    .user-email {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .notification-item {
      display: flex;
      align-items: flex-start;
      gap: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-3);
      position: relative;
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--primitive-font-size-lg);
      flex-shrink: 0;
    }

    .notification-icon.success {
      background-color: var(--semantic-success-subtle);
    }

    .notification-icon.info {
      background-color: var(--semantic-brand-subtle);
    }

    .notification-icon.warning {
      background-color: var(--semantic-warning-subtle);
    }

    .notification-content {
      flex: 1;
    }

    .notification-title {
      font-size: var(--primitive-font-size-md);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-primary);
      margin-bottom: var(--primitive-spacing-1);
    }

    .notification-message {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      line-height: var(--primitive-line-height-md);
      margin-bottom: var(--primitive-spacing-1);
    }

    .notification-time {
      font-size: var(--primitive-font-size-xs);
      color: var(--semantic-text-tertiary);
    }

    .unread-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--semantic-brand-primary);
      flex-shrink: 0;
    }

    .setting-item {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-3);
    }

    .setting-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--primitive-border-radius-md);
      background-color: var(--semantic-surface-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--primitive-font-size-lg);
      flex-shrink: 0;
    }

    .setting-info {
      flex: 1;
    }

    .setting-title {
      font-size: var(--primitive-font-size-md);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-primary);
      margin-bottom: var(--primitive-spacing-1);
    }

    .setting-description {
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .setting-button {
      padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-sm);
      background-color: var(--semantic-surface-default);
      color: var(--semantic-text-primary);
      font-size: var(--primitive-font-size-sm);
      cursor: pointer;
      transition: all 0.2s;
    }

    .setting-button:hover {
      background-color: var(--semantic-surface-subtle);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDemoComponent {
  protected basicItems = signal([
    { id: 1, label: 'First item' },
    { id: 2, label: 'Second item' },
    { id: 3, label: 'Third item' },
    { id: 4, label: 'Fourth item' },
  ]);

  protected interactiveItems = signal([
    { id: 1, label: 'Home', icon: '🏠' },
    { id: 2, label: 'Profile', icon: '👤' },
    { id: 3, label: 'Settings', icon: '⚙' },
    { id: 4, label: 'Logout', icon: '🚪' },
  ]);

  protected users = signal([
    { id: 1, label: 'John Doe', name: 'John Doe', email: 'john@example.com', online: true, avatar: '' },
    { id: 2, label: 'Jane Smith', name: 'Jane Smith', email: 'jane@example.com', online: true, avatar: '' },
    { id: 3, label: 'Bob Wilson', name: 'Bob Wilson', email: 'bob@example.com', online: false, avatar: '' },
    { id: 4, label: 'Alice Brown', name: 'Alice Brown', email: 'alice@example.com', online: true, avatar: '' },
  ]);

  protected notifications = signal([
    { id: 1, label: 'Success', icon: '✓', type: 'success', title: 'Success', message: 'Your profile has been updated successfully.', time: '2 min ago', read: false },
    { id: 2, label: 'New Message', icon: 'ℹ', type: 'info', title: 'New Message', message: 'You have a new message from Sarah Johnson.', time: '1 hour ago', read: false },
    { id: 3, label: 'Warning', icon: '⚠', type: 'warning', title: 'Warning', message: 'Your subscription will expire in 3 days.', time: '2 hours ago', read: true },
  ]);

  protected settings = signal([
    { id: 1, label: 'Notifications', icon: '🔔', title: 'Notifications', description: 'Manage your notification preferences', action: 'Configure' },
    { id: 2, label: 'Privacy', icon: '🔒', title: 'Privacy', description: 'Control your privacy settings', action: 'Manage' },
    { id: 3, label: 'Appearance', icon: '🎨', title: 'Appearance', description: 'Customize your theme', action: 'Customize' },
    { id: 4, label: 'Language', icon: '🌐', title: 'Language', description: 'Change your language preferences', action: 'Change' },
  ]);
}
