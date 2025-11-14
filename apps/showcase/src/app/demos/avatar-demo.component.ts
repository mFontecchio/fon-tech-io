import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [CommonModule, AvatarComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="avatar-group">
          <ui-avatar name="Small User" size="sm" />
          <ui-avatar name="Medium User" size="md" />
          <ui-avatar name="Large User" size="lg" />
          <ui-avatar name="Extra Large" size="xl" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Images</h3>
      <ui-card>
        <div class="avatar-group">
          <ui-avatar 
            name="John Doe" 
            src="https://i.pravatar.cc/150?img=1" 
            size="lg"
          />
          <ui-avatar 
            name="Jane Smith" 
            src="https://i.pravatar.cc/150?img=5" 
            size="lg"
          />
          <ui-avatar 
            name="Bob Wilson" 
            src="https://i.pravatar.cc/150?img=8" 
            size="lg"
          />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Initials Only</h3>
      <ui-card>
        <div class="avatar-group">
          <ui-avatar name="Alice Anderson" size="lg" />
          <ui-avatar name="Bob Brown" size="lg" />
          <ui-avatar name="Charlie Clark" size="lg" />
          <ui-avatar name="Diana Davis" size="lg" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Shapes</h3>
      <ui-card>
        <div class="avatar-group">
          <ui-avatar name="Round Avatar" shape="circle" size="lg" />
          <ui-avatar name="Square Avatar" shape="square" size="lg" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Status Indicator</h3>
      <ui-card>
        <div class="avatar-group">
          <div class="avatar-with-status">
            <ui-avatar name="Online User" size="lg" />
            <span class="status-dot online"></span>
          </div>
          <div class="avatar-with-status">
            <ui-avatar name="Away User" size="lg" />
            <span class="status-dot away"></span>
          </div>
          <div class="avatar-with-status">
            <ui-avatar name="Busy User" size="lg" />
            <span class="status-dot busy"></span>
          </div>
          <div class="avatar-with-status">
            <ui-avatar name="Offline User" size="lg" />
            <span class="status-dot offline"></span>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Avatar Group</h3>
      <ui-card>
        <div class="stacked-avatars">
          <ui-avatar name="User 1" size="md" />
          <ui-avatar name="User 2" size="md" />
          <ui-avatar name="User 3" size="md" />
          <ui-avatar name="User 4" size="md" />
          <div class="more-indicator">+5</div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>User Profile Example</h3>
      <ui-card>
        <div class="profile-example">
          <ui-avatar 
            name="Sarah Johnson" 
            src="https://i.pravatar.cc/150?img=9" 
            size="xl"
          />
          <div class="profile-info">
            <h4>Sarah Johnson</h4>
            <p>Product Designer</p>
            <p class="bio">Building beautiful user experiences</p>
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

    .avatar-group {
      display: flex;
      gap: var(--primitive-spacing-4);
      flex-wrap: wrap;
      align-items: center;
    }

    .avatar-with-status {
      position: relative;
      display: inline-block;
    }

    .status-dot {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid var(--semantic-surface-default);
    }

    .status-dot.online {
      background-color: var(--semantic-success-primary);
    }

    .status-dot.away {
      background-color: var(--semantic-warning-primary);
    }

    .status-dot.busy {
      background-color: var(--semantic-error-primary);
    }

    .status-dot.offline {
      background-color: var(--semantic-text-tertiary);
    }

    .stacked-avatars {
      display: flex;
      align-items: center;
    }

    .stacked-avatars ui-avatar {
      margin-left: calc(var(--primitive-spacing-2) * -1);
      border: 2px solid var(--semantic-surface-default);
    }

    .stacked-avatars ui-avatar:first-child {
      margin-left: 0;
    }

    .more-indicator {
      margin-left: calc(var(--primitive-spacing-2) * -1);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--semantic-surface-subtle);
      border: 2px solid var(--semantic-surface-default);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .profile-example {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-4);
    }

    .profile-info h4 {
      margin: 0 0 var(--primitive-spacing-1) 0;
      font-size: var(--primitive-font-size-lg);
      color: var(--semantic-text-primary);
    }

    .profile-info p {
      margin: 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .profile-info .bio {
      margin-top: var(--primitive-spacing-2);
      font-style: italic;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {}
