import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  // Form Components
  ButtonComponent,
  InputComponent,
  TextareaComponent,
  CheckboxComponent,
  RadioComponent,
  SwitchComponent,
  SelectComponent,
  SelectOption,
  MultiSelectComponent,
  MultiSelectOption,
  SliderComponent,
  DatePickerComponent,
  FileUploadComponent,
  
  // Layout Components
  CardComponent,
  ModalComponent,
  DrawerComponent,
  AccordionComponent,
  AccordionItemComponent,
  TabsComponent,
  TabComponent,
  DividerComponent,
  StackComponent,
  GridComponent,
  
  // Data Display Components
  BadgeComponent,
  AvatarComponent,
  TooltipComponent,
  ChipComponent,
  PopoverComponent,
  PaginationComponent,
  TableComponent,
  TableColumn,
  ListComponent,
  ListItem,
  
  // Feedback Components
  AlertComponent,
  SpinnerComponent,
  ProgressComponent,
  SkeletonComponent,
  ToastContainerComponent,
  ToastService,
  
  // Navigation Components
  BreadcrumbComponent,
  BreadcrumbItem,
  MenuComponent,
  MenuItem,
  NavbarComponent,
  NavbarLink,
  StepperComponent,
  Step,
} from '@ui-suite/components';
import { ThemeService } from '@ui-suite/theming';

@Component({
  imports: [
    RouterModule,
    CommonModule,
    // Form
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    SelectComponent,
    MultiSelectComponent,
    SliderComponent,
    DatePickerComponent,
    FileUploadComponent,
    // Layout
    CardComponent,
    ModalComponent,
    DrawerComponent,
    AccordionComponent,
    AccordionItemComponent,
    TabsComponent,
    TabComponent,
    DividerComponent,
    StackComponent,
    GridComponent,
    // Data Display
    BadgeComponent,
    AvatarComponent,
    TooltipComponent,
    ChipComponent,
    PopoverComponent,
    PaginationComponent,
    TableComponent,
    ListComponent,
    // Feedback
    AlertComponent,
    SpinnerComponent,
    ProgressComponent,
    SkeletonComponent,
    ToastContainerComponent,
    // Navigation
    BreadcrumbComponent,
    MenuComponent,
    NavbarComponent,
    StepperComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'UI Component Suite - All 36 Components';
  
  // Services
  protected themeService = inject(ThemeService);
  protected toastService = inject(ToastService);
  
  // Form state
  protected inputValue = signal('');
  protected textareaValue = signal('');
  protected buttonClicks = signal(0);
  protected checkboxChecked = signal(false);
  protected radioValue = signal('option1');
  protected switchChecked = signal(false);
  protected selectValue = signal<string | undefined>(undefined);
  protected multiSelectValue = signal<string[]>([]);
  protected sliderValue = signal(50);
  protected sliderRangeStart = signal(25);
  protected sliderRangeEnd = signal(75);
  protected dateValue = signal<string | undefined>(undefined);
  protected uploadedFiles = signal<File[]>([]);
  
  // Layout state
  protected modalOpen = signal(false);
  protected drawerOpen = signal(false);
  protected activeTabIndex = signal(0);
  protected expandedAccordionItems = signal<string[]>([]);
  
  // Data Display state
  protected currentPage = signal(1);
  protected itemsPerPage = signal(10);
  protected tableData = signal([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  ]);
  protected tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];
  
  // Feedback state
  protected loading = signal(false);
  protected progressValue = signal(0);
  protected progressInterval?: number;
  protected showSkeleton = signal(true);
  
  // Navigation state
  protected activeStep = signal(0);
  protected menuOpen = signal(false);
  
  // Options data
  protected fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];
  
  protected multiSelectOptions: MultiSelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
  ];
  
  protected listItems: ListItem[] = [
    { id: '1', label: 'Item 1', description: 'Description for item 1', icon: '📄' },
    { id: '2', label: 'Item 2', description: 'Description for item 2', icon: '📁' },
    { id: '3', label: 'Item 3', description: 'Description for item 3', icon: '📊' },
  ];
  
  protected breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Showcase', href: '/showcase' },
  ];
  
  protected menuItems: MenuItem[] = [
    { id: '1', label: 'Profile', icon: '👤' },
    { id: '2', label: 'Settings', icon: '⚙️' },
    { id: '3', label: '', divider: true },
    { id: '4', label: 'Logout', icon: '🚪' },
  ];
  
  protected navLinks: NavbarLink[] = [
    { id: '1', label: 'Home', href: '/', active: true },
    { id: '2', label: 'Components', href: '/components' },
    { id: '3', label: 'Documentation', href: '/docs' },
  ];
  
  protected steps: Step[] = [
    { id: '1', label: 'Account', description: 'Create your account' },
    { id: '2', label: 'Profile', description: 'Setup your profile' },
    { id: '3', label: 'Preferences', description: 'Configure preferences' },
    { id: '4', label: 'Complete', description: 'Finish setup' },
  ];
  
  // Methods
  protected toggleTheme() {
    this.themeService.toggleDarkMode();
  }
  
  protected onButtonClick() {
    this.buttonClicks.update(count => count + 1);
  }
  
  protected showToast(variant: 'success' | 'info' | 'warning' | 'error') {
    this.toastService.show(
      `This is a ${variant} toast notification!`,
      variant,
      3000
    );
  }
  
  protected startProgress() {
    this.progressValue.set(0);
    this.progressInterval = window.setInterval(() => {
      this.progressValue.update(val => {
        if (val >= 100) {
          this.stopProgress();
          return 100;
        }
        return val + 10;
      });
    }, 500);
  }
  
  protected stopProgress() {
    if (this.progressInterval) {
      window.clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }
  }
  
  protected resetProgress() {
    this.stopProgress();
    this.progressValue.set(0);
  }
  
  protected toggleSkeleton() {
    this.showSkeleton.update(val => !val);
    if (!this.showSkeleton()) {
      setTimeout(() => this.showSkeleton.set(true), 2000);
    }
  }
}
