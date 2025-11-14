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
}
