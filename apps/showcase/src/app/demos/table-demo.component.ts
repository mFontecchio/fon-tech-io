import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, CardComponent, BadgeComponent } from '@ui-suite/components';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [CommonModule, TableComponent, CardComponent, BadgeComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Table</h3>
      <ui-card>
        <ui-table [columns]="basicColumns()" [data]="basicData()" />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sortable Table</h3>
      <ui-card>
        <ui-table 
          [columns]="sortableColumns()" 
          [data]="sortableData()"
        />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Table with Actions</h3>
      <ui-card>
        <ui-table [columns]="actionsColumns()" [data]="actionsData()">
          <ng-template #actionsCell let-row>
            <div class="action-buttons">
              <button class="action-btn">✏ Edit</button>
              <button class="action-btn danger">🗑 Delete</button>
            </div>
          </ng-template>
        </ui-table>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Striped Table</h3>
      <ui-card>
        <ui-table 
          [columns]="basicColumns()" 
          [data]="basicData()"
          [striped]="true"
        />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Hoverable Table</h3>
      <ui-card>
        <ui-table 
          [columns]="basicColumns()" 
          [data]="basicData()"
          [hoverable]="true"
        />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: User Management</h3>
      <ui-card>
        <ui-table [columns]="userColumns()" [data]="userData()" [hoverable]="true">
          <ng-template #statusCell let-row>
            <ui-badge [variant]="row.status === 'Active' ? 'success' : 'default'" size="sm">
              {{ row.status }}
            </ui-badge>
          </ng-template>
          <ng-template #roleCell let-row>
            <ui-badge variant="primary" size="sm">
              {{ row.role }}
            </ui-badge>
          </ng-template>
        </ui-table>
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

    .action-buttons {
      display: flex;
      gap: var(--primitive-spacing-2);
    }

    .action-btn {
      padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-sm);
      background-color: var(--semantic-surface-default);
      color: var(--semantic-text-primary);
      font-size: var(--primitive-font-size-xs);
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn:hover {
      background-color: var(--semantic-surface-subtle);
    }

    .action-btn.danger {
      color: var(--semantic-error-primary);
      border-color: var(--semantic-error-primary);
    }

    .action-btn.danger:hover {
      background-color: var(--semantic-error-subtle);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDemoComponent {
  protected basicColumns = signal([
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]);

  protected basicData = signal([
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor' },
  ]);

  protected sortableColumns = signal([
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'score', label: 'Score', sortable: true },
  ]);

  protected sortableData = signal([
    { name: 'Alice', age: 28, score: 95 },
    { name: 'Bob', age: 35, score: 87 },
    { name: 'Charlie', age: 22, score: 92 },
    { name: 'Diana', age: 31, score: 88 },
  ]);

  protected actionsColumns = signal([
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ]);

  protected actionsData = signal([
    { name: 'Project Alpha', status: 'Active' },
    { name: 'Project Beta', status: 'Pending' },
    { name: 'Project Gamma', status: 'Completed' },
  ]);

  protected userColumns = signal([
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastActive', label: 'Last Active' },
  ]);

  protected userData = signal([
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive', lastActive: '3 days ago' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastActive: '5 min ago' },
  ]);
}
