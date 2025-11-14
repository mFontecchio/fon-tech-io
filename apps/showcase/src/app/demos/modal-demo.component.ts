import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent, ButtonComponent, CardComponent, InputComponent } from '@ui-suite/components';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonComponent, CardComponent, InputComponent],
  template: `
    <div class="demo-section">
      <h3>Basic Modal</h3>
      <ui-card>
        <ui-button (clicked)="openBasic()">Open Basic Modal</ui-button>
        
        <ui-modal
          [open]="basicOpen()"
          title="Basic Modal"
          (openChange)="handleOpenChange($event, basicOpen)"
          (confirmed)="handleConfirm()"
        >
          <p>This is a basic modal with title, content, and action buttons.</p>
          <p>You can close it by clicking outside, pressing Escape, or using the buttons.</p>
        </ui-modal>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="button-group">
          <ui-button variant="outlined" (clicked)="openSm()">Small Modal</ui-button>
          <ui-button variant="outlined" (clicked)="openMd()">Medium Modal</ui-button>
          <ui-button variant="outlined" (clicked)="openLg()">Large Modal</ui-button>
        </div>

        <ui-modal
          [open]="smOpen()"
          size="sm"
          title="Small Modal"
          (openChange)="handleOpenChange($event, smOpen)"
        >
          <p>This is a small modal, perfect for simple confirmations or short messages.</p>
        </ui-modal>

        <ui-modal
          [open]="mdOpen()"
          size="md"
          title="Medium Modal"
          (openChange)="handleOpenChange($event, mdOpen)"
        >
          <p>This is a medium modal with more space for content.</p>
          <p>It can accommodate forms, lists, and other structured content.</p>
        </ui-modal>

        <ui-modal
          [open]="lgOpen()"
          size="lg"
          title="Large Modal"
          (openChange)="handleOpenChange($event, lgOpen)"
        >
          <p>This is a large modal, ideal for complex forms or detailed information.</p>
          <p>It provides ample space for comprehensive content.</p>
        </ui-modal>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Form Modal</h3>
      <ui-card>
        <ui-button color="primary" (clicked)="openForm()">Open Form Modal</ui-button>

        <ui-modal
          [open]="formOpen()"
          title="Edit Profile"
          confirmText="Save Changes"
          (openChange)="handleOpenChange($event, formOpen)"
          (confirmed)="handleFormSubmit()"
        >
          <div class="form-content">
            <ui-input label="Name" [(value)]="formData.name" placeholder="Enter your name" />
            <ui-input label="Email" type="email" [(value)]="formData.email" placeholder="email@example.com" />
          </div>
        </ui-modal>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Prevent Close Modal</h3>
      <ui-card>
        <ui-button color="warning" (clicked)="openPrevent()">Open Non-Dismissible Modal</ui-button>

        <ui-modal
          [open]="preventOpen()"
          title="Important Action"
          confirmText="I Understand"
          (openChange)="handleOpenChange($event, preventOpen)"
          (confirmed)="preventOpen.set(false)"
        >
          <p>This modal cannot be dismissed by clicking outside or pressing Escape.</p>
          <p>You must explicitly click the button to close it.</p>
        </ui-modal>
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

    .button-group {
      display: flex;
      gap: var(--primitive-spacing-3);
      flex-wrap: wrap;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: var(--primitive-spacing-4);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDemoComponent {
  protected basicOpen = signal(false);
  protected smOpen = signal(false);
  protected mdOpen = signal(false);
  protected lgOpen = signal(false);
  protected formOpen = signal(false);
  protected preventOpen = signal(false);

  protected formData = {
    name: signal('John Doe'),
    email: signal('john@example.com'),
  };

  protected openBasic() { this.basicOpen.set(true); }
  protected openSm() { this.smOpen.set(true); }
  protected openMd() { this.mdOpen.set(true); }
  protected openLg() { this.lgOpen.set(true); }
  protected openForm() { this.formOpen.set(true); }
  protected openPrevent() { this.preventOpen.set(true); }

  protected handleConfirm() {
    console.log('Modal confirmed');
  }

  protected handleFormSubmit() {
    console.log('Form submitted:', {
      name: this.formData.name(),
      email: this.formData.email(),
    });
  }

  protected handleOpenChange(event: any, targetSignal: any): void {
    if (typeof event === 'boolean') {
      targetSignal.set(event);
    }
  }
}
