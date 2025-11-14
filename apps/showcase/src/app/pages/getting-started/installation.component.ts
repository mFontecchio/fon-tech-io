/**
 * Installation Guide Page
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@ui-suite/components';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="doc-page">
      <h1>Installation</h1>
      
      <ui-card>
        <h2>Installation Guide Coming Soon</h2>
        <p>Step-by-step instructions for installing and configuring the UI Component Suite.</p>
      </ui-card>
    </div>
  `,
  styles: [`
    .doc-page {
      padding: var(--primitive-spacing-8);
      max-width: 900px;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: var(--primitive-spacing-6);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationComponent {}

