import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-slider-demo',
  standalone: true,
  imports: [CommonModule, SliderComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Slider</h3>
      <ui-card>
        <ui-slider
          label="Volume"
          [min]="0"
          [max]="100"
          [(value)]="volume"
        />
        <p class="demo-output">Value: {{ volume() }}%</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Range Slider</h3>
      <ui-card>
        <ui-slider
          label="Price Range"
          [min]="0"
          [max]="1000"
          [(value)]="priceStart"
          [(valueEnd)]="priceEnd"
        />
        <p class="demo-output">Range: $\{{ priceStart() }} - $\{{ priceEnd() }}</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Step</h3>
      <ui-card>
        <ui-slider
          label="Rating"
          [min]="0"
          [max]="10"
          [step]="0.5"
          [(value)]="rating"
        />
        <p class="demo-output">Rating: {{ rating() }} / 10</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>With Marks</h3>
      <ui-card>
        <ui-slider
          label="Temperature"
          [min]="0"
          [max]="100"
          [(value)]="temp"
        />
        <p class="demo-output">{{ temp() }}°C</p>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="slider-stack">
          <ui-slider size="sm" label="Small" [min]="0" [max]="100" [value]="30" />
          <ui-slider size="md" label="Medium" [min]="0" [max]="100" [value]="60" />
          <ui-slider size="lg" label="Large" [min]="0" [max]="100" [value]="90" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Disabled State</h3>
      <ui-card>
        <ui-slider
          label="Disabled Slider"
          [min]="0"
          [max]="100"
          [value]="50"
          [disabled]="true"
        />
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

    .slider-stack {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-5);
    }

    .demo-output {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      font-weight: var(--primitive-font-weight-medium);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderDemoComponent {
  protected volume = signal(50);
  protected priceStart = signal(200);
  protected priceEnd = signal(800);
  protected rating = signal(7.5);
  protected temp = signal(25);
}
