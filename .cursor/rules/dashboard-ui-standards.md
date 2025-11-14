# Dashboard UI Standards

## Overview
Standards and best practices for designing and building effective, user-friendly dashboard interfaces that prioritize simplicity, usability, and performance.

**Core Principle:** A dashboard should do "one thing well" - avoid creating interfaces that feel like "someone emptied a drawer onto the screen" or require "a PhD to operate."

**Reference:** Based on [Dashboard UI Design Best Practices](https://www.youtube.com/watch?v=B7k5rOgmOGY&list=PL2FB8Dt4MmU0nU7FsEtEkFhr6sOklOtM6&index=8)

## Sidebar Navigation

### Purpose and Structure
The sidebar acts as the "spine" of the product, housing persistent and globally relevant elements.

**Sidebar Should Contain:**
- Primary navigation links
- Profile management
- Global search
- Feature highlights
- Notifications
- Integration points

### Collapsible Sidebars
Use collapsible sidebars to manage space and reduce cognitive load.

**Implementation:**
```typescript
@Component({
  selector: 'app-sidebar',
  template: `
    <aside [class.collapsed]="isCollapsed()">
      <button (click)="toggleSidebar()" class="toggle-btn">
        <i [class]="isCollapsed() ? 'icon-expand' : 'icon-collapse'"></i>
      </button>
      
      <nav class="sidebar-nav">
        @for (group of navigationGroups(); track group.id) {
          <div class="nav-group">
            <h3>{{ group.title }}</h3>
            @for (link of group.links; track link.id) {
              <a 
                [routerLink]="link.path" 
                routerLinkActive="active"
                [class.nested]="link.children">
                {{ link.label }}
              </a>
            }
          </div>
        }
      </nav>
      
      @if (!isCollapsed()) {
        <div class="sidebar-footer">
          <app-notification-badge />
          <app-user-profile />
        </div>
      }
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  protected readonly isCollapsed = signal(false);
  protected readonly navigationGroups = signal<NavigationGroup[]>([]);
  
  toggleSidebar() {
    this.isCollapsed.update(collapsed => !collapsed);
  }
}
```

### Navigation Link Organization

**1. Grouped Links**
Organize navigation links by relevance to improve usability and reduce cognitive load.

```typescript
interface NavigationGroup {
  id: string;
  title: string;
  links: NavigationLink[];
}

const navigationGroups: NavigationGroup[] = [
  {
    id: 'main',
    title: 'Main',
    links: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'analytics', label: 'Analytics', path: '/analytics' }
    ]
  },
  {
    id: 'management',
    title: 'Management',
    links: [
      { id: 'users', label: 'Users', path: '/users' },
      { id: 'settings', label: 'Settings', path: '/settings' }
    ]
  }
];
```

**2. Nested Links**
Use dropdowns for expanding amounts of links to keep navigation organized.

```typescript
@Component({
  selector: 'app-nav-item',
  template: `
    <div class="nav-item">
      <a 
        [routerLink]="link().path" 
        routerLinkActive="active"
        (click)="link().children ? toggleExpanded() : null">
        {{ link().label }}
        @if (link().children) {
          <i [class]="isExpanded() ? 'icon-chevron-down' : 'icon-chevron-right'"></i>
        }
      </a>
      
      @if (link().children && isExpanded()) {
        <div class="nested-links">
          @for (child of link().children; track child.id) {
            <a [routerLink]="child.path" routerLinkActive="active">
              {{ child.label }}
            </a>
          }
        </div>
      }
    </div>
  `
})
export class NavItemComponent {
  link = input.required<NavigationLink>();
  protected readonly isExpanded = signal(false);
  
  toggleExpanded() {
    this.isExpanded.update(expanded => !expanded);
  }
}
```

**3. Active State Indicators**
Always provide visual cues to show the currently selected page.

```css
.nav-item a {
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.nav-item a.active {
  color: var(--primary-color);
  background-color: var(--primary-light);
  border-left: 3px solid var(--primary-color);
  font-weight: 600;
}
```

**4. Feature Highlights**
Use the sidebar to showcase new features, search, or integrations.

```typescript
@Component({
  selector: 'app-feature-highlight',
  template: `
    <div class="feature-highlight">
      <span class="badge">NEW</span>
      <h4>{{ feature().title }}</h4>
      <p>{{ feature().description }}</p>
      <button (click)="tryFeature()">Try it now</button>
    </div>
  `
})
export class FeatureHighlightComponent {
  feature = input.required<Feature>();
  
  tryFeature() {
    // Navigate to new feature
  }
}
```

**5. Notifications in Sidebar**
Add notifications in available sidebar space.

```typescript
@Component({
  selector: 'app-notification-badge',
  template: `
    <button class="notification-btn" (click)="showNotifications()">
      <i class="icon-bell"></i>
      @if (unreadCount() > 0) {
        <span class="badge">{{ unreadCount() }}</span>
      }
    </button>
  `
})
export class NotificationBadgeComponent {
  protected readonly unreadCount = signal(0);
  
  showNotifications() {
    // Show notifications panel
  }
}
```

## Main Dashboard Layout

### Layout Principles

**1. Simplicity and Clarity**
Emphasize simplicity and clarity - dashboards should be immediately understandable.

**2. Smaller Font Sizes and Less Spacing**
Dashboard elements are generally smaller compared to landing pages to fit more information.

```css
/* Dashboard-specific typography */
.dashboard {
  font-size: 0.875rem; /* 14px */
  line-height: 1.4;
}

.dashboard h1 {
  font-size: 1.5rem; /* 24px */
  margin-bottom: 1rem;
}

.dashboard h2 {
  font-size: 1.25rem; /* 20px */
  margin-bottom: 0.75rem;
}

.dashboard .card {
  padding: 1rem; /* Tighter than marketing pages */
  margin-bottom: 1rem;
}
```

**3. Strict Grids and Layouts**
Dashboards utilize most or all screen space, requiring strict adherence to grids.

```typescript
@Component({
  selector: 'app-dashboard-layout',
  template: `
    <div class="dashboard-container">
      <!-- Page actions at the very top -->
      <header class="dashboard-header">
        <h1>{{ pageTitle() }}</h1>
        <div class="page-actions">
          <button class="btn-primary" (click)="performAction()">
            {{ primaryAction() }}
          </button>
        </div>
      </header>
      
      <!-- Main content in strict grid -->
      <main class="dashboard-grid">
        <ng-content />
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1.5rem;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
      flex: 1;
    }
  `]
})
export class DashboardLayoutComponent {
  pageTitle = input.required<string>();
  primaryAction = input<string>('Action');
  
  performAction() {
    // Execute primary action
  }
}
```

**4. Prioritize Important Information**
The main section should display what's most important to the user first.

**5. Page Actions at the Top**
The very top of the dashboard is reserved for important page actions or simple navigation.

```typescript
@Component({
  selector: 'app-page-header',
  template: `
    <header class="page-header">
      <div class="header-left">
        @if (showBackButton()) {
          <button (click)="goBack()" class="btn-back">
            <i class="icon-arrow-left"></i> Back
          </button>
        }
        <h1>{{ title() }}</h1>
      </div>
      
      <div class="header-actions">
        @for (action of actions(); track action.id) {
          <button 
            [class]="action.isPrimary ? 'btn-primary' : 'btn-secondary'"
            (click)="action.handler()">
            {{ action.label }}
          </button>
        }
      </div>
    </header>
  `
})
export class PageHeaderComponent {
  title = input.required<string>();
  showBackButton = input<boolean>(false);
  actions = input<PageAction[]>([]);
  
  private router = inject(Router);
  
  goBack() {
    this.router.navigate(['..']);
  }
}
```

## Four Main Dashboard Components

### 1. Lists and Tables

Most common dashboard components. Emphasize separation through space, lines/dividers, or color.

**Essential Functionality:**
- Search
- Filter
- Sort
- Multi-selection
- Bulk actions

```typescript
@Component({
  selector: 'app-data-table',
  template: `
    <div class="table-container">
      <!-- Table controls -->
      <div class="table-controls">
        <input 
          type="search" 
          placeholder="Search..." 
          [value]="searchTerm()"
          (input)="onSearch($event)">
        
        <button (click)="toggleFilters()">
          <i class="icon-filter"></i> Filters
        </button>
        
        @if (selectedItems().length > 0) {
          <div class="bulk-actions">
            <span>{{ selectedItems().length }} selected</span>
            <button (click)="bulkDelete()">Delete</button>
            <button (click)="bulkExport()">Export</button>
          </div>
        }
      </div>
      
      <!-- Table -->
      <table class="data-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                [checked]="allSelected()"
                (change)="toggleSelectAll()">
            </th>
            @for (column of columns(); track column.id) {
              <th (click)="sortBy(column.id)" class="sortable">
                {{ column.label }}
                <i [class]="getSortIcon(column.id)"></i>
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (item of filteredData(); track item.id) {
            <tr [class.selected]="isSelected(item.id)">
              <td>
                <input 
                  type="checkbox" 
                  [checked]="isSelected(item.id)"
                  (change)="toggleSelect(item.id)">
              </td>
              @for (column of columns(); track column.id) {
                <td>{{ item[column.id] }}</td>
              }
            </tr>
          } @empty {
            <tr>
              <td [attr.colspan]="columns().length + 1">
                <app-empty-state message="No data found" />
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent<T> {
  data = input.required<T[]>();
  columns = input.required<TableColumn[]>();
  
  protected readonly searchTerm = signal('');
  protected readonly selectedItems = signal<string[]>([]);
  protected readonly sortColumn = signal<string>('');
  protected readonly sortDirection = signal<'asc' | 'desc'>('asc');
  
  protected readonly filteredData = computed(() => {
    let result = this.data();
    
    // Apply search filter
    if (this.searchTerm()) {
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(this.searchTerm().toLowerCase())
        )
      );
    }
    
    // Apply sorting
    if (this.sortColumn()) {
      result = [...result].sort((a, b) => {
        const aVal = a[this.sortColumn()];
        const bVal = b[this.sortColumn()];
        const modifier = this.sortDirection() === 'asc' ? 1 : -1;
        return aVal > bVal ? modifier : -modifier;
      });
    }
    
    return result;
  });
  
  protected readonly allSelected = computed(() => 
    this.filteredData().length > 0 && 
    this.selectedItems().length === this.filteredData().length
  );
  
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
  
  sortBy(columnId: string) {
    if (this.sortColumn() === columnId) {
      this.sortDirection.update(dir => dir === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(columnId);
      this.sortDirection.set('asc');
    }
  }
  
  toggleSelect(itemId: string) {
    this.selectedItems.update(items => 
      items.includes(itemId)
        ? items.filter(id => id !== itemId)
        : [...items, itemId]
    );
  }
  
  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedItems.set([]);
    } else {
      this.selectedItems.set(this.filteredData().map(item => item['id']));
    }
  }
  
  bulkDelete() {
    // Implement bulk delete with optimistic UI
  }
  
  bulkExport() {
    // Implement bulk export
  }
}
```

**Table Styling Best Practices:**

```css
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

/* Separation through lines */
.data-table.bordered {
  border: 1px solid var(--border-color);
}

.data-table.bordered td,
.data-table.bordered th {
  border-bottom: 1px solid var(--border-color);
}

/* Separation through spacing */
.data-table.spaced tbody tr {
  margin-bottom: 0.5rem;
}

/* Separation through color */
.data-table.striped tbody tr:nth-child(even) {
  background-color: var(--bg-secondary);
}

/* Selected row state */
.data-table tr.selected {
  background-color: var(--primary-light);
}
```

### 2. Cards

Includes charts and informational cards. Emphasize well-spaced margins and choice between borders or background colors.

```typescript
@Component({
  selector: 'app-dashboard-card',
  template: `
    <div class="card" [class.bordered]="bordered()" [class.elevated]="elevated()">
      <div class="card-header">
        <h3>{{ title() }}</h3>
        @if (actions()) {
          <button class="card-action" (click)="onAction()">
            <i class="icon-more"></i>
          </button>
        }
      </div>
      
      <div class="card-content">
        <ng-content />
      </div>
      
      @if (footer()) {
        <div class="card-footer">
          {{ footer() }}
        </div>
      }
    </div>
  `,
  styles: [`
    .card {
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .card.bordered {
      border: 1px solid var(--border-color);
      background: var(--bg-primary);
    }
    
    .card.elevated {
      background: var(--bg-primary);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .card-content {
      margin: 1rem 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardComponent {
  title = input.required<string>();
  bordered = input<boolean>(false);
  elevated = input<boolean>(true);
  actions = input<boolean>(false);
  footer = input<string>();
  
  onAction() {
    // Handle card actions
  }
}
```

### 3. User Input

Found in modals and settings pages. Keep forms clean and well-organized.

```typescript
@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form()" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Name</label>
        <input 
          id="name" 
          type="text" 
          formControlName="name"
          placeholder="Enter name">
        @if (form().get('name')?.invalid && form().get('name')?.touched) {
          <span class="error">Name is required</span>
        }
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          formControlName="email"
          placeholder="Enter email">
        @if (form().get('email')?.invalid && form().get('email')?.touched) {
          <span class="error">Valid email is required</span>
        }
      </div>
      
      <div class="form-actions">
        <button type="button" (click)="onCancel()">Cancel</button>
        <button type="submit" [disabled]="form().invalid">Save</button>
      </div>
    </form>
  `
})
export class UserFormComponent {
  form = input.required<FormGroup>();
  
  onSubmit() {
    if (this.form().valid) {
      // Handle form submission
    }
  }
  
  onCancel() {
    // Handle cancellation
  }
}
```

### 4. Tabs

Fantastic for adding new pages without cluttering the sidebar. Provide different views of related data.

```typescript
@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <div class="tab-list" role="tablist">
        @for (tab of tabs(); track tab.id) {
          <button
            role="tab"
            [class.active]="activeTab() === tab.id"
            (click)="selectTab(tab.id)">
            {{ tab.label }}
            @if (tab.count !== undefined) {
              <span class="tab-count">{{ tab.count }}</span>
            }
          </button>
        }
      </div>
      
      <div class="tab-content">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .tab-list {
      display: flex;
      border-bottom: 2px solid var(--border-color);
      margin-bottom: 1.5rem;
    }
    
    .tab-list button {
      padding: 0.75rem 1.5rem;
      border: none;
      background: none;
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }
    
    .tab-list button.active {
      color: var(--primary-color);
      font-weight: 600;
    }
    
    .tab-list button.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-color);
    }
    
    .tab-count {
      margin-left: 0.5rem;
      padding: 0.125rem 0.5rem;
      background: var(--bg-secondary);
      border-radius: 12px;
      font-size: 0.75rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  tabs = input.required<Tab[]>();
  activeTab = signal<string>('');
  
  constructor() {
    // Set first tab as active by default
    effect(() => {
      const tabs = this.tabs();
      if (tabs.length > 0 && !this.activeTab()) {
        this.activeTab.set(tabs[0].id);
      }
    });
  }
  
  selectTab(tabId: string) {
    this.activeTab.set(tabId);
  }
}
```

## Interaction Patterns

### Modals, Popovers & New Pages

Use different interaction patterns based on context complexity and user flow interruption needs.

**Decision Matrix:**

| Pattern | Use When | Blocking | Context |
|---------|----------|----------|---------|
| **Popover** | Simple, quick interactions | No | Current page |
| **Modal** | Complex interactions needing focus | Yes | Current page |
| **Toast** | Confirmations, warnings, errors | No | Any page |
| **New Page** | Permanent or very large contexts | No | New page |

### Popovers

Best for simple, non-blocking contexts where users can click away.

```typescript
@Component({
  selector: 'app-popover',
  template: `
    <div class="popover-trigger" (click)="toggle()">
      <ng-content select="[trigger]" />
    </div>
    
    @if (isOpen()) {
      <div 
        class="popover-content"
        [style.top.px]="position().top"
        [style.left.px]="position().left"
        (clickOutside)="close()">
        <ng-content select="[content]" />
      </div>
    }
  `,
  styles: [`
    .popover-content {
      position: absolute;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      min-width: 200px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
  protected readonly isOpen = signal(false);
  protected readonly position = signal({ top: 0, left: 0 });
  
  toggle() {
    this.isOpen.update(open => !open);
  }
  
  close() {
    this.isOpen.set(false);
  }
}
```

### Modals

Used for more complex interactions that keep the user on the same page but are blocking.

```typescript
@Component({
  selector: 'app-modal',
  template: `
    @if (isOpen()) {
      <div class="modal-overlay" (click)="onOverlayClick()">
        <div class="modal-container" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ title() }}</h2>
            <button class="modal-close" (click)="close()">
              <i class="icon-close"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <ng-content />
          </div>
          
          @if (showFooter()) {
            <div class="modal-footer">
              <button class="btn-secondary" (click)="close()">
                {{ cancelText() }}
              </button>
              <button class="btn-primary" (click)="confirm()">
                {{ confirmText() }}
              </button>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    
    .modal-container {
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .modal-body {
      padding: 1.5rem;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid var(--border-color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  isOpen = input.required<boolean>();
  title = input.required<string>();
  showFooter = input<boolean>(true);
  cancelText = input<string>('Cancel');
  confirmText = input<string>('Confirm');
  closeOnOverlayClick = input<boolean>(true);
  
  closed = output<void>();
  confirmed = output<void>();
  
  close() {
    this.closed.emit();
  }
  
  confirm() {
    this.confirmed.emit();
  }
  
  onOverlayClick() {
    if (this.closeOnOverlayClick()) {
      this.close();
    }
  }
}
```

### Toast Notifications

A non-intrusive notification system for confirming changes or providing warnings/errors.

**Always use toast notifications after blocking actions to confirm changes.**

```typescript
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<Toast[]>([]);
  
  show(toast: Omit<Toast, 'id'>) {
    const id = crypto.randomUUID();
    const duration = toast.duration ?? 5000;
    
    this.toasts.update(toasts => [...toasts, { ...toast, id }]);
    
    setTimeout(() => this.remove(id), duration);
  }
  
  success(message: string) {
    this.show({ type: 'success', message });
  }
  
  error(message: string) {
    this.show({ type: 'error', message });
  }
  
  warning(message: string) {
    this.show({ type: 'warning', message });
  }
  
  info(message: string) {
    this.show({ type: 'info', message });
  }
  
  remove(id: string) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
  
  getToasts() {
    return this.toasts.asReadonly();
  }
}

@Component({
  selector: 'app-toast-container',
  template: `
    <div class="toast-container">
      @for (toast of toasts(); track toast.id) {
        <div 
          class="toast"
          [class]="'toast-' + toast.type"
          @slideIn>
          <i [class]="getIcon(toast.type)"></i>
          <span>{{ toast.message }}</span>
          <button (click)="close(toast.id)">
            <i class="icon-close"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .toast {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      background: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 300px;
    }
    
    .toast-success {
      border-left: 4px solid var(--success-color);
    }
    
    .toast-error {
      border-left: 4px solid var(--error-color);
    }
    
    .toast-warning {
      border-left: 4px solid var(--warning-color);
    }
    
    .toast-info {
      border-left: 4px solid var(--info-color);
    }
  `],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  private toastService = inject(ToastService);
  protected readonly toasts = this.toastService.getToasts();
  
  close(id: string) {
    this.toastService.remove(id);
  }
  
  getIcon(type: string): string {
    const icons = {
      success: 'icon-check-circle',
      error: 'icon-alert-circle',
      warning: 'icon-alert-triangle',
      info: 'icon-info'
    };
    return icons[type] || icons.info;
  }
}
```

### New Pages

For permanent or very large contexts, direct users to a new page.

**Always provide navigation:** Include a back button or breadcrumbs when directing to new pages.

```typescript
@Component({
  selector: 'app-detail-page',
  template: `
    <div class="page-container">
      <!-- Breadcrumbs for navigation -->
      <nav class="breadcrumbs">
        @for (crumb of breadcrumbs(); track crumb.path; let isLast = $last) {
          @if (!isLast) {
            <a [routerLink]="crumb.path">{{ crumb.label }}</a>
            <span class="separator">/</span>
          } @else {
            <span class="current">{{ crumb.label }}</span>
          }
        }
      </nav>
      
      <!-- Back button alternative -->
      <button class="btn-back" (click)="goBack()">
        <i class="icon-arrow-left"></i> Back to List
      </button>
      
      <div class="page-content">
        <ng-content />
      </div>
    </div>
  `
})
export class DetailPageComponent {
  breadcrumbs = input<Breadcrumb[]>([]);
  private router = inject(Router);
  private location = inject(Location);
  
  goBack() {
    this.location.back();
  }
}
```

## Empty States

Design how the UI looks when there is no data to display.

```typescript
@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      @if (icon()) {
        <i [class]="icon()" class="empty-icon"></i>
      }
      
      <h3>{{ title() }}</h3>
      <p>{{ message() }}</p>
      
      @if (actionLabel()) {
        <button class="btn-primary" (click)="action.emit()">
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
    }
    
    .empty-icon {
      font-size: 4rem;
      color: var(--text-tertiary);
      margin-bottom: 1rem;
    }
    
    .empty-state h3 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .empty-state p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      max-width: 400px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  icon = input<string>('icon-inbox');
  title = input<string>('No data available');
  message = input.required<string>();
  actionLabel = input<string>();
  
  action = output<void>();
}
```

## Charts and Data Visualization

Design informative and aesthetic charts that are simple, informative, and visually appealing.

**Chart Requirements:**
- Include grid lines for readability
- Show numbers and data points
- Provide summaries or key insights
- Use animations on hover to display detailed data
- Keep visualizations simple and focused

```typescript
@Component({
  selector: 'app-chart-card',
  template: `
    <app-dashboard-card [title]="title()">
      <div class="chart-summary">
        <div class="chart-metric">
          <span class="metric-value">{{ primaryMetric() }}</span>
          <span class="metric-label">{{ primaryLabel() }}</span>
        </div>
        
        @if (trend()) {
          <div class="chart-trend" [class.positive]="trend() > 0">
            <i [class]="trend() > 0 ? 'icon-trending-up' : 'icon-trending-down'"></i>
            <span>{{ Math.abs(trend()) }}%</span>
          </div>
        }
      </div>
      
      <div class="chart-container">
        <canvas #chartCanvas></canvas>
      </div>
      
      @if (showLegend()) {
        <div class="chart-legend">
          @for (item of legendItems(); track item.id) {
            <div class="legend-item">
              <span 
                class="legend-color" 
                [style.background-color]="item.color"></span>
              <span>{{ item.label }}</span>
            </div>
          }
        </div>
      }
    </app-dashboard-card>
  `,
  styles: [`
    .chart-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .metric-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      display: block;
      margin-top: 0.25rem;
    }
    
    .chart-trend {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      background: var(--error-light);
      color: var(--error-color);
    }
    
    .chart-trend.positive {
      background: var(--success-light);
      color: var(--success-color);
    }
    
    .chart-container {
      position: relative;
      height: 300px;
    }
    
    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1rem;
      justify-content: center;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent {
  title = input.required<string>();
  primaryMetric = input.required<string | number>();
  primaryLabel = input.required<string>();
  trend = input<number>();
  showLegend = input<boolean>(true);
  legendItems = input<LegendItem[]>([]);
  
  protected readonly Math = Math;
}
```

## Micro Interactions and Performance

### Micro Interactions

Small animations and interactions that enhance usability and user experience.

**Chart Animations:**
Creative animations on hover to display data.

```css
/* Animated chart bars */
@keyframes barGrow {
  from {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

.chart-bar {
  animation: barGrow 0.5s ease-out;
  transition: opacity 0.2s, transform 0.2s;
}

.chart-bar:hover {
  opacity: 0.8;
  transform: translateY(-4px);
}

/* Animated data points */
.data-point {
  transition: r 0.2s;
}

.data-point:hover {
  r: 6;
  cursor: pointer;
}
```

**Button Interactions:**

```css
.btn {
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.btn:active::before {
  width: 300px;
  height: 300px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

### Optimistic UI

Design the UI to respond instantly to user actions, assuming server requests will succeed to avoid awkward pauses.

**Principle:** Make the dashboard feel snappy and fast by updating the UI immediately, then handle errors if they occur.

```typescript
@Injectable({ providedIn: 'root' })
export class OptimisticDataService {
  private items = signal<Item[]>([]);
  private toastService = inject(ToastService);
  
  async deleteItem(itemId: string) {
    // Store original state for rollback
    const originalItems = this.items();
    
    // Optimistically update UI immediately
    this.items.update(items => items.filter(item => item.id !== itemId));
    
    // Show immediate feedback
    this.toastService.success('Item deleted');
    
    try {
      // Make actual API call
      await this.api.deleteItem(itemId);
    } catch (error) {
      // Rollback on error
      this.items.set(originalItems);
      this.toastService.error('Failed to delete item. Please try again.');
    }
  }
  
  async updateItem(itemId: string, updates: Partial<Item>) {
    const originalItems = this.items();
    
    // Optimistically update
    this.items.update(items => 
      items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
    
    try {
      await this.api.updateItem(itemId, updates);
      this.toastService.success('Item updated');
    } catch (error) {
      // Rollback on error
      this.items.set(originalItems);
      this.toastService.error('Failed to update item');
    }
  }
}
```

**Example: Email Deletion with Optimistic UI**

```typescript
@Component({
  selector: 'app-email-list',
  template: `
    @for (email of emails(); track email.id) {
      <div class="email-item" @fadeOut>
        <span>{{ email.subject }}</span>
        <button (click)="deleteEmail(email.id)">
          Delete
        </button>
      </div>
    }
  `,
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ])
  ]
})
export class EmailListComponent {
  private emailService = inject(EmailService);
  protected readonly emails = this.emailService.getEmails();
  
  async deleteEmail(emailId: string) {
    // UI updates immediately with animation
    await this.emailService.deleteEmail(emailId);
  }
}
```

## Best Practices Summary

### Design Principles
1. **Keep it simple** - Avoid cluttered, complex interfaces
2. **Reduce cognitive load** - Group related items, use clear navigation
3. **Prioritize information** - Show what's most important first
4. **Use space efficiently** - Utilize grids and tighter spacing than marketing pages
5. **Maintain consistency** - Use consistent patterns throughout

### Data Management
1. **Implement search, filter, and sort** for all tables
2. **Enable multi-selection and bulk actions** for efficiency
3. **Show empty states** when no data is available
4. **Design informative charts** with grid lines, numbers, and summaries

### User Feedback
1. **Use toast notifications** to confirm changes after blocking actions
2. **Implement optimistic UI** to make interactions feel instant
3. **Provide clear navigation** with back buttons or breadcrumbs
4. **Show loading states** during asynchronous operations

### Component Usage
1. **Master the four main components**: Lists/Tables, Cards, User Input, Tabs
2. **Choose the right interaction pattern**:
   - Popovers for simple, non-blocking interactions
   - Modals for complex, focused interactions
   - Toast for confirmations and alerts
   - New pages for permanent or large contexts

### Performance
1. **Make dashboards snappy and fast** with optimistic UI
2. **Use animations purposefully** to enhance UX, not distract
3. **Implement lazy loading** for large datasets
4. **Optimize chart rendering** and interactions

## Anti-Patterns to Avoid

### ❌ The Cluttered Dashboard
```
Anti-Pattern: A dashboard that looks like "someone emptied a drawer onto 
the screen" with no clear organization or hierarchy.

Solution: Follow strict grids, group related information, use tabs for 
additional views instead of cramming everything on one page.
```

### ❌ The PhD-Required Dashboard
```
Anti-Pattern: Dashboards that are so complex they "require a PhD to operate"
with unclear navigation and hidden functionality.

Solution: Keep interfaces intuitive, use clear labels, provide helpful 
empty states, and maintain consistent patterns.
```

### ❌ Blocking Without Feedback
```
Anti-Pattern: Performing actions (like deleting items) without immediate 
feedback, creating awkward pauses.

Solution: Implement optimistic UI and show toast notifications immediately
after actions.
```

### ❌ Poor Sidebar Organization
```
Anti-Pattern: Long, unorganized lists of navigation links without grouping.

Solution: Group links by relevance, use nested dropdowns for expanding 
navigation, provide clear active states.
```

### ❌ Uninformative Charts
```
Anti-Pattern: Charts without grid lines, numbers, or context that are 
purely decorative.

Solution: Include grid lines, data points, summaries, and interactive 
hover states to make charts informative.
```

## Checklist

Before launching a dashboard:
- [ ] Sidebar navigation is well-organized with grouped links
- [ ] Active state indicators are clear
- [ ] Page actions are prominently placed at the top
- [ ] Tables include search, filter, sort, and bulk actions
- [ ] Empty states are designed for all data components
- [ ] Charts are informative with grid lines and summaries
- [ ] Modals used for complex interactions
- [ ] Popovers used for simple, non-blocking interactions
- [ ] Toast notifications confirm all actions
- [ ] Optimistic UI implemented for snappy performance
- [ ] Tabs used to organize related views
- [ ] Back buttons or breadcrumbs on detail pages
- [ ] Micro interactions enhance usability
- [ ] Dashboard is simple and doesn't require "a PhD to operate"

---

**Last Updated:** 2025-11-07  
**Version:** 1.0  
**Reference:** [Dashboard UI Design Best Practices](https://www.youtube.com/watch?v=B7k5rOgmOGY&list=PL2FB8Dt4MmU0nU7FsEtEkFhr6sOklOtM6&index=8)

