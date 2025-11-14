import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent, InputComponent, TextareaComponent, CardComponent } from '@ui-suite/components';
import { ThemeService } from '@ui-suite/theming';

@Component({
  imports: [RouterModule, ButtonComponent, InputComponent, TextareaComponent, CardComponent],
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
}
