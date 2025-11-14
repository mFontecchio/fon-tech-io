import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-grid-demo',
  standalone: true,
  imports: [CommonModule, GridComponent, CardComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Grid (3 Columns)</h3>
      <ui-card>
        <ui-grid [columns]="3">
          <div class="grid-item">1</div>
          <div class="grid-item">2</div>
          <div class="grid-item">3</div>
          <div class="grid-item">4</div>
          <div class="grid-item">5</div>
          <div class="grid-item">6</div>
        </ui-grid>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Different Column Counts</h3>
      <ui-card>
        <div class="grid-examples">
          <div>
            <p class="label">2 Columns</p>
            <ui-grid [columns]="2">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
            </ui-grid>
          </div>
          
          <div>
            <p class="label">4 Columns</p>
            <ui-grid [columns]="4">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
            </ui-grid>
          </div>
          
          <div>
            <p class="label">6 Columns</p>
            <ui-grid [columns]="6">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
              <div class="grid-item">4</div>
              <div class="grid-item">5</div>
              <div class="grid-item">6</div>
            </ui-grid>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Different Gap Sizes</h3>
      <ui-card>
        <div class="grid-examples">
          <div>
            <p class="label">Gap: 2 (small)</p>
            <ui-grid [columns]="3" [gap]="2">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
            </ui-grid>
          </div>
          
          <div>
            <p class="label">Gap: 4 (medium)</p>
            <ui-grid [columns]="3" [gap]="4">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
            </ui-grid>
          </div>
          
          <div>
            <p class="label">Gap: 8 (large)</p>
            <ui-grid [columns]="3" [gap]="8">
              <div class="grid-item">1</div>
              <div class="grid-item">2</div>
              <div class="grid-item">3</div>
            </ui-grid>
          </div>
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Responsive Grid</h3>
      <ui-card>
        <p class="info-text">This grid adapts to screen size (resize the window to see):</p>
        <ui-grid [columns]="4">
          <div class="grid-item">1</div>
          <div class="grid-item">2</div>
          <div class="grid-item">3</div>
          <div class="grid-item">4</div>
          <div class="grid-item">5</div>
          <div class="grid-item">6</div>
          <div class="grid-item">7</div>
          <div class="grid-item">8</div>
        </ui-grid>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Practical Example: Product Grid</h3>
      <ui-card>
        <ui-grid [columns]="3" [gap]="4">
          <div class="product-card">
            <div class="product-image"></div>
            <h4>Product 1</h4>
            <p>$29.99</p>
          </div>
          <div class="product-card">
            <div class="product-image"></div>
            <h4>Product 2</h4>
            <p>$39.99</p>
          </div>
          <div class="product-card">
            <div class="product-image"></div>
            <h4>Product 3</h4>
            <p>$49.99</p>
          </div>
          <div class="product-card">
            <div class="product-image"></div>
            <h4>Product 4</h4>
            <p>$19.99</p>
          </div>
          <div class="product-card">
            <div class="product-image"></div>
            <h4>Product 5</h4>
            <p>$59.99</p>
          </div>
          <div class="product-card">
            <div class="product-image"></div>
            <h4>Product 6</h4>
            <p>$24.99</p>
          </div>
        </ui-grid>
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

    .grid-item {
      padding: var(--primitive-spacing-4);
      background-color: var(--semantic-brand-subtle);
      color: var(--semantic-brand-primary);
      border-radius: var(--primitive-border-radius-md);
      text-align: center;
      font-size: var(--primitive-font-size-lg);
      font-weight: var(--primitive-font-weight-bold);
    }

    .grid-examples {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-6);
    }

    .label {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
      font-weight: var(--primitive-font-weight-medium);
    }

    .info-text {
      margin-bottom: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-2);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-sm);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .product-card {
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
      text-align: center;
    }

    .product-image {
      width: 100%;
      height: 120px;
      background: linear-gradient(135deg, var(--semantic-brand-subtle) 0%, var(--semantic-brand-primary) 100%);
      border-radius: var(--primitive-border-radius-md);
      margin-bottom: var(--primitive-spacing-2);
    }

    .product-card h4 {
      margin: var(--primitive-spacing-2) 0;
      font-size: var(--primitive-font-size-md);
      color: var(--semantic-text-primary);
    }

    .product-card p {
      margin: 0;
      font-size: var(--primitive-font-size-lg);
      font-weight: var(--primitive-font-weight-bold);
      color: var(--semantic-brand-primary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoComponent {}
