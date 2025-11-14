import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  InputComponent,
  TextareaComponent,
  CardComponent,
  CheckboxComponent,
  RadioComponent,
  SwitchComponent,
  BadgeComponent,
  AlertComponent,
  SpinnerComponent,
  ModalComponent,
  SelectComponent,
  SelectOption,
  MultiSelectComponent,
  MultiSelectOption,
  TabsComponent,
  TabComponent,
  TooltipComponent,
  AvatarComponent,
  ProgressComponent,
} from '@ui-suite/components';
import { ThemeService } from '@ui-suite/theming';

@Component({
  imports: [
    RouterModule,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    CardComponent,
    CheckboxComponent,
    RadioComponent,
    SwitchComponent,
    BadgeComponent,
    AlertComponent,
    SpinnerComponent,
    ModalComponent,
    SelectComponent,
    MultiSelectComponent,
    TabsComponent,
    TabComponent,
    TooltipComponent,
    AvatarComponent,
    ProgressComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'UI Component Suite - Showcase';
  
  // Inject theme service
  protected themeService = inject(ThemeService);
  
  // Demo state
  protected inputValue = signal('');
  protected textareaValue = signal('');
  protected buttonClicks = signal(0);
  protected checkboxChecked = signal(false);
  protected checkboxIndeterminate = signal(false);
  protected radioValue = signal('option1');
  protected switchChecked = signal(false);
  protected modalOpen = signal(false);
  protected showAlert = signal(true);
  protected loading = signal(false);
  
  // New component state
  protected selectValue = signal<string | undefined>(undefined);
  protected multiSelectValue = signal<string[]>([]);
  protected activeTabIndex = signal(0);
  protected progressValue = signal(0);
  protected progressInterval?: number;

  // Select options
  protected fruitOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
  ];

  protected groupedOptions: SelectOption[] = [
    { value: 'apple', label: 'Apple', group: 'Fruits' },
    { value: 'banana', label: 'Banana', group: 'Fruits' },
    { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
    { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
    { value: 'chicken', label: 'Chicken', group: 'Proteins' },
    { value: 'beef', label: 'Beef', group: 'Proteins' },
  ];

  // Multi-select options
  protected multiSelectOptions: MultiSelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid.js' },
    { value: 'next', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
  ];

  protected onButtonClick() {
    this.buttonClicks.update(count => count + 1);
  }

  protected toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  protected onInputChange(value: string) {
    this.inputValue.set(value);
  }

  protected onTextareaChange(value: string) {
    this.textareaValue.set(value);
  }

  protected onCheckboxChange(checked: boolean) {
    this.checkboxChecked.set(checked);
    if (checked) {
      this.checkboxIndeterminate.set(false);
    }
  }

  protected toggleIndeterminate() {
    this.checkboxIndeterminate.update(val => !val);
    if (!this.checkboxIndeterminate()) {
      this.checkboxChecked.set(false);
    }
  }

  protected onRadioChange(value: string) {
    this.radioValue.set(value);
  }

  protected onSwitchChange(checked: boolean) {
    this.switchChecked.set(checked);
  }

  protected openModal() {
    this.modalOpen.set(true);
  }

  protected closeModal() {
    this.modalOpen.set(false);
  }

  protected simulateLoading() {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 3000);
  }

  protected onSelectChange(value: string) {
    this.selectValue.set(value);
  }

  protected onMultiSelectChange(values: string[]) {
    this.multiSelectValue.set(values);
  }

  protected onOptionCreated(option: MultiSelectOption) {
    // Add the new option to the list
    this.multiSelectOptions = [...this.multiSelectOptions, option];
  }

  protected onTabChange(index: number) {
    this.activeTabIndex.set(index);
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
}
