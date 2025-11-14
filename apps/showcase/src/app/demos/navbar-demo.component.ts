import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, CardComponent, ButtonComponent, AvatarComponent } from '@ui-suite/components';

@Component({
  selector: 'app-navbar-demo',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent, AvatarComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Navbar</h3>
      <ui-card>
        <ui-navbar [links]="basicLinks()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Logo</h3>
      <ui-card>
        <ui-navbar [links]="basicLinks()" logo="🎨 UI Suite" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Actions</h3>
      <ui-card>
        <div class="navbar-wrapper">
          <ui-navbar [links]="basicLinks()" logo="🎨 UI Suite">
            <div class="navbar-actions">
              <ui-button size="sm" variant="outlined">Sign In</ui-button>
              <ui-button size="sm">Sign Up</ui-button>
            </div>
          </ui-navbar>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Navbar Colors</h3>
      <ui-card>
        <div class="navbar-stack">
          <ui-navbar [links]="basicLinks()" logo="Primary" color="primary" />
          <ui-navbar [links]="basicLinks()" logo="Secondary" color="secondary" />
          <ui-navbar [links]="basicLinks()" logo="Default" color="default" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Fixed vs Static</h3>
      <ui-card>
        <div class="navbar-stack">
          <div>
            <p class="label">Static (scrolls with content)</p>
            <ui-navbar [links]="basicLinks()" logo="Static" />
          </div>
          <div>
            <p class="label">Fixed (stays at top)</p>
            <div class="fixed-demo">
              <ui-navbar [links]="basicLinks()" logo="Fixed" />
              <div class="demo-content">
                <p>Scroll content here...</p>
                <p>The navbar above is fixed and will stay in place.</p>
              </div>
            </div>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: App Navbar</h3>
      <ui-card>
        <div class="app-navbar">
          <ui-navbar [links]="appLinks()" logo="🚀 MyApp">
            <div class="navbar-actions">
              <ui-button size="sm" variant="text">🔔</ui-button>
              <ui-button size="sm" variant="text">💬</ui-button>
              <ui-avatar name="John Doe" size="sm" />
            </div>
          </ui-navbar>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: Marketing Site</h3>
      <ui-card>
        <div class="marketing-navbar">
          <ui-navbar [links]="marketingLinks()" logo="🎯 ProductName" color="default">
            <div class="navbar-actions">
              <ui-button size="sm" variant="text">Sign In</ui-button>
              <ui-button size="sm" color="primary">Get Started</ui-button>
            </div>
          </ui-navbar>
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

    .navbar-wrapper {
      border-radius: var(--primitive-border-radius-md);
      overflow: hidden;
    }

    .navbar-actions {
      display: flex;
      gap: var(--primitive-spacing-2);
      align-items: center;
    }

    .navbar-stack {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
    }

    .label {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .fixed-demo {
      position: relative;
      height: 200px;
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-md);
      overflow: auto;
    }

    .demo-content {
      padding: var(--primitive-spacing-6) var(--primitive-spacing-4);
      padding-top: calc(var(--primitive-spacing-6) + 60px); /* Account for fixed navbar */
    }

    .demo-content p {
      margin: var(--primitive-spacing-2) 0;
      color: var(--semantic-text-secondary);
    }

    .app-navbar, .marketing-navbar {
      border-radius: var(--primitive-border-radius-md);
      overflow: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarDemoComponent {
  protected basicLinks = signal([
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ]);

  protected appLinks = signal([
    { id: 'dashboard', label: '📊 Dashboard', href: '/dashboard' },
    { id: 'projects', label: '📁 Projects', href: '/projects' },
    { id: 'tasks', label: '✓ Tasks', href: '/tasks' },
    { id: 'team', label: '👥 Team', href: '/team' },
  ]);

  protected marketingLinks = signal([
    { id: 'features', label: 'Features', href: '/features' },
    { id: 'pricing', label: 'Pricing', href: '/pricing' },
    { id: 'docs', label: 'Docs', href: '/docs' },
    { id: 'blog', label: 'Blog', href: '/blog' },
  ]);
}
