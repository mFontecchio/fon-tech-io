import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent, CardComponent, ButtonComponent, AvatarComponent } from '@ui-suite/components';

@Component({
  selector: 'app-skeleton-demo',
  standalone: true,
  imports: [CommonModule, SkeletonComponent, CardComponent, ButtonComponent, AvatarComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Shapes</h3>
      <ui-card>
        <div class="skeleton-examples">
          <ui-skeleton variant="text" width="200px" />
          <ui-skeleton variant="circular" width="50px" height="50px" />
          <ui-skeleton variant="rectangular" width="300px" height="100px" />
          <ui-skeleton variant="rounded" width="250px" height="80px" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Text Skeletons</h3>
      <ui-card>
        <div class="text-skeletons">
          <ui-skeleton variant="text" width="80%" />
          <ui-skeleton variant="text" width="90%" />
          <ui-skeleton variant="text" width="70%" />
          <ui-skeleton variant="text" width="85%" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Loading vs Loaded State</h3>
      <ui-card>
        <ui-button (clicked)="toggleLoading()" [fullWidth]="false">
          {{ loading() ? 'Show Content' : 'Show Skeleton' }}
        </ui-button>
        
        <div class="content-example">
          @if (loading()) {
            <div class="user-card-skeleton">
              <ui-skeleton variant="circular" width="64px" height="64px" />
              <div class="user-info-skeleton">
                <ui-skeleton variant="text" width="150px" height="24px" />
                <ui-skeleton variant="text" width="200px" height="16px" />
                <ui-skeleton variant="text" width="180px" height="14px" />
              </div>
            </div>
          } @else {
            <div class="user-card">
              <ui-avatar name="John Doe" size="xl" />
              <div class="user-info">
                <h4>John Doe</h4>
                <p class="user-role">Senior Developer</p>
                <p class="user-bio">Full-stack developer with 10+ years experience</p>
              </div>
            </div>
          }
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Card Skeleton Example</h3>
      <ui-card>
        <div class="card-skeleton">
          <ui-skeleton variant="rounded" width="100%" height="200px" />
          <ui-skeleton variant="text" width="80%" height="24px" />
          <ui-skeleton variant="text" width="100%" height="16px" />
          <ui-skeleton variant="text" width="90%" height="16px" />
          <ui-skeleton variant="text" width="70%" height="16px" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>List Skeleton Example</h3>
      <ui-card>
        <div class="list-skeleton">
          @for (item of [1, 2, 3, 4]; track item) {
            <div class="list-item-skeleton">
              <ui-skeleton variant="circular" width="40px" height="40px" />
              <div class="list-content-skeleton">
                <ui-skeleton variant="text" width="150px" height="16px" />
                <ui-skeleton variant="text" width="200px" height="14px" />
              </div>
            </div>
          }
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Table Skeleton Example</h3>
      <ui-card>
        <div class="table-skeleton">
          <div class="table-header-skeleton">
            <ui-skeleton variant="text" width="100px" />
            <ui-skeleton variant="text" width="150px" />
            <ui-skeleton variant="text" width="120px" />
          </div>
          @for (row of [1, 2, 3, 4, 5]; track row) {
            <div class="table-row-skeleton">
              <ui-skeleton variant="text" width="100px" />
              <ui-skeleton variant="text" width="150px" />
              <ui-skeleton variant="text" width="120px" />
            </div>
          }
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

    .skeleton-examples {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
      align-items: flex-start;
    }

    .text-skeletons {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-2);
    }

    .content-example {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-4);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
    }

    .user-card-skeleton, .user-card {
      display: flex;
      gap: var(--primitive-spacing-4);
      align-items: center;
    }

    .user-info-skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-2);
      flex: 1;
    }

    .user-info {
      flex: 1;
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
      margin: 0;
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .card-skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .list-skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-3);
    }

    .list-item-skeleton {
      display: flex;
      gap: var(--primitive-spacing-3);
      align-items: center;
    }

    .list-content-skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-1);
      flex: 1;
    }

    .table-skeleton {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-2);
    }

    .table-header-skeleton, .table-row-skeleton {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1.2fr;
      gap: var(--primitive-spacing-3);
      padding: var(--primitive-spacing-2);
    }

    .table-header-skeleton {
      border-bottom: 2px solid var(--semantic-border-default);
      padding-bottom: var(--primitive-spacing-3);
      margin-bottom: var(--primitive-spacing-2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDemoComponent {
  protected loading = signal(true);

  protected toggleLoading(): void {
    this.loading.update(v => !v);
  }
}
