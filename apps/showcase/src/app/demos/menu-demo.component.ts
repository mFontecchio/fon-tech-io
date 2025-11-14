import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-menu-demo',
  standalone: true,
  imports: [CommonModule, MenuComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Menu</h3>
      <ui-card>
        <ui-menu [items]="basicItems()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Icons</h3>
      <ui-card>
        <ui-menu [items]="withIcons()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Dividers</h3>
      <ui-card>
        <ui-menu [items]="withDividers()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Disabled Items</h3>
      <ui-card>
        <ui-menu [items]="withDisabled()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Horizontal Menu</h3>
      <ui-card>
        <ui-menu [items]="basicItems()" orientation="horizontal" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: User Menu</h3>
      <ui-card>
        <ui-menu [items]="userMenu()" (itemSelected)="handleMenuClick($event)" />
        @if (lastAction()) {
          <p class="action-feedback">Last action: {{ lastAction() }}</p>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: Sidebar Navigation</h3>
      <ui-card>
        <div class="sidebar-example">
          <ui-menu [items]="sidebarMenu()" />
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

    .action-feedback {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-brand-subtle);
      border-radius: var(--primitive-border-radius-md);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-brand-primary);
    }

    .sidebar-example {
      max-width: 250px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  protected lastAction = signal('');

  protected basicItems = signal([
    { id: '1', label: 'Home' },
    { id: '2', label: 'About' },
    { id: '3', label: 'Services' },
    { id: '4', label: 'Contact' },
  ]);

  protected withIcons = signal([
    { id: '1', label: '🏠 Home' },
    { id: '2', label: '👤 Profile' },
    { id: '3', label: '⚙ Settings' },
    { id: '4', label: '❓ Help' },
  ]);

  protected withDividers = signal([
    { id: '1', label: 'New File' },
    { id: '2', label: 'Open File' },
    { id: '3', label: '', divider: true },
    { id: '4', label: 'Save' },
    { id: '5', label: 'Save As' },
    { id: '6', label: '', divider: true },
    { id: '7', label: 'Exit' },
  ]);

  protected withDisabled = signal([
    { id: '1', label: 'Cut', disabled: false },
    { id: '2', label: 'Copy', disabled: false },
    { id: '3', label: 'Paste', disabled: true },
    { id: '4', label: '', divider: true },
    { id: '5', label: 'Undo', disabled: true },
    { id: '6', label: 'Redo', disabled: false },
  ]);

  protected userMenu = signal([
    { id: 'profile', label: '👤 View Profile' },
    { id: 'settings', label: '⚙ Settings' },
    { id: 'billing', label: '💳 Billing' },
    { id: 'divider1', label: '', divider: true },
    { id: 'help', label: '❓ Help & Support' },
    { id: 'feedback', label: '📝 Send Feedback' },
    { id: 'divider2', label: '', divider: true },
    { id: 'logout', label: '🚪 Sign Out' },
  ]);

  protected sidebarMenu = signal([
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'projects', label: '📁 Projects' },
    { id: 'tasks', label: '✓ Tasks' },
    { id: 'calendar', label: '📅 Calendar' },
    { id: 'divider', label: '', divider: true },
    { id: 'team', label: '👥 Team' },
    { id: 'settings', label: '⚙ Settings' },
  ]);

  protected handleMenuClick(event: any): void {
    // Handle both string ID and event object
    const itemId = typeof event === 'string' ? event : event?.id || 'unknown';
    const item = this.userMenu().find(i => i.id === itemId);
    if (item && !item.divider) {
      this.lastAction.set(item.label);
    }
  }
}
