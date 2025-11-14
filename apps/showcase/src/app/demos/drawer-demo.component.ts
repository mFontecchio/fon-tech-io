import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent, ButtonComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [CommonModule, DrawerComponent, ButtonComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Drawer Positions</h3>
      <ui-card>
        <div class="button-group">
          <ui-button (clicked)="openLeft()">Open Left</ui-button>
          <ui-button (clicked)="openRight()">Open Right</ui-button>
          <ui-button (clicked)="openTop()">Open Top</ui-button>
          <ui-button (clicked)="openBottom()">Open Bottom</ui-button>
        </div>

        <ui-drawer
          [open]="leftOpen()"
          position="left"
          title="Left Drawer"
          (openChange)="leftOpen.set($event)"
        >
          <p>This drawer slides in from the left side.</p>
          <p>It's perfect for navigation menus or filters.</p>
        </ui-drawer>

        <ui-drawer
          [open]="rightOpen()"
          position="right"
          title="Right Drawer"
          (openChange)="rightOpen.set($event)"
        >
          <p>This drawer slides in from the right side.</p>
          <p>Common use cases include settings panels or detail views.</p>
        </ui-drawer>

        <ui-drawer
          [open]="topOpen()"
          position="top"
          title="Top Drawer"
          (openChange)="topOpen.set($event)"
        >
          <p>This drawer slides in from the top.</p>
          <p>Useful for notifications or announcements.</p>
        </ui-drawer>

        <ui-drawer
          [open]="bottomOpen()"
          position="bottom"
          title="Bottom Drawer"
          (openChange)="bottomOpen.set($event)"
        >
          <p>This drawer slides in from the bottom.</p>
          <p>Great for mobile-style action sheets or forms.</p>
        </ui-drawer>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Drawer Sizes</h3>
      <ui-card>
        <div class="button-group">
          <ui-button variant="outlined" (clicked)="openSmall()">Small Drawer</ui-button>
          <ui-button variant="outlined" (clicked)="openMedium()">Medium Drawer</ui-button>
          <ui-button variant="outlined" (clicked)="openLarge()">Large Drawer</ui-button>
        </div>

        <ui-drawer
          [open]="smallOpen()"
          size="sm"
          title="Small Drawer"
          (openChange)="smallOpen.set($event)"
        >
          <p>This is a small drawer (320px).</p>
        </ui-drawer>

        <ui-drawer
          [open]="mediumOpen()"
          size="md"
          title="Medium Drawer"
          (openChange)="mediumOpen.set($event)"
        >
          <p>This is a medium drawer (480px).</p>
        </ui-drawer>

        <ui-drawer
          [open]="largeOpen()"
          size="lg"
          title="Large Drawer"
          (openChange)="largeOpen.set($event)"
        >
          <p>This is a large drawer (640px).</p>
        </ui-drawer>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Rich Content Example</h3>
      <ui-card>
        <ui-button color="primary" (clicked)="openContent()">Open Settings</ui-button>

        <ui-drawer
          [open]="contentOpen()"
          title="Settings"
          (openChange)="contentOpen.set($event)"
        >
          <div class="drawer-content">
            <h4>Account Settings</h4>
            <p>Manage your account preferences and privacy settings.</p>
            
            <h4>Notifications</h4>
            <p>Configure how and when you receive notifications.</p>
            
            <h4>Appearance</h4>
            <p>Customize the look and feel of your application.</p>
            
            <div class="drawer-actions">
              <ui-button variant="outlined" (clicked)="contentOpen.set(false)">Cancel</ui-button>
              <ui-button (clicked)="saveSettings()">Save Changes</ui-button>
            </div>
          </div>
        </ui-drawer>
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

    .button-group {
      display: flex;
      gap: var(--primitive-spacing-3);
      flex-wrap: wrap;
    }

    .drawer-content {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
    }

    .drawer-content h4 {
      margin: 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .drawer-content p {
      margin: 0;
      color: var(--semantic-text-secondary);
      font-size: var(--primitive-font-size-sm);
    }

    .drawer-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--primitive-spacing-2);
      margin-top: var(--primitive-spacing-4);
      padding-top: var(--primitive-spacing-4);
      border-top: 1px solid var(--semantic-border-subtle);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerDemoComponent {
  protected leftOpen = signal(false);
  protected rightOpen = signal(false);
  protected topOpen = signal(false);
  protected bottomOpen = signal(false);
  protected smallOpen = signal(false);
  protected mediumOpen = signal(false);
  protected largeOpen = signal(false);
  protected contentOpen = signal(false);

  protected openLeft() { this.leftOpen.set(true); }
  protected openRight() { this.rightOpen.set(true); }
  protected openTop() { this.topOpen.set(true); }
  protected openBottom() { this.bottomOpen.set(true); }
  protected openSmall() { this.smallOpen.set(true); }
  protected openMedium() { this.mediumOpen.set(true); }
  protected openLarge() { this.largeOpen.set(true); }
  protected openContent() { this.contentOpen.set(true); }

  protected saveSettings() {
    console.log('Settings saved');
    this.contentOpen.set(false);
  }
}
