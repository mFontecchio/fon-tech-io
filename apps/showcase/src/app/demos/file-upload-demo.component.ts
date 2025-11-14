import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent, CardComponent, ChipComponent } from '@ui-suite/components';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, CardComponent, ChipComponent],
  template: `
    <div class="demo-section">
      <h3>Basic File Upload</h3>
      <ui-card>
        <ui-file-upload
          label="Upload files"
          (filesSelected)="onFilesSelected($event)"
        />
        @if (uploadedFiles().length > 0) {
          <div class="file-list">
            <p><strong>Uploaded files:</strong></p>
            @for (file of uploadedFiles(); track file.name) {
              <ui-chip 
                [label]="file.name + ' (' + formatFileSize(file.size) + ')'" 
                [removable]="true" 
                (removed)="removeFile(file)" 
              />
            }
          </div>
        }
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Multiple Files</h3>
      <ui-card>
        <ui-file-upload
          label="Upload multiple files"
          [multiple]="true"
        />
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Specific File Types</h3>
      <ui-card>
        <div class="upload-grid">
          <ui-file-upload
            label="Images only"
            accept="image/*"
            helperText="Only image files allowed"
          />
          <ui-file-upload
            label="Documents only"
            accept=".pdf,.doc,.docx"
            helperText="PDF and Word documents"
          />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <ui-card>
        <div class="upload-grid">
          <ui-file-upload size="sm" label="Small" />
          <ui-file-upload size="md" label="Medium" />
          <ui-file-upload size="lg" label="Large" />
        </div>
      </ui-card>
    </div>

    <div class="demo-section">
      <h3>States</h3>
      <ui-card>
        <div class="upload-grid">
          <ui-file-upload label="File Upload" />
          <ui-file-upload label="Disabled" [disabled]="true" />
          <ui-file-upload label="Error" error="File size exceeds limit" />
        </div>
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

    .upload-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--primitive-spacing-4);
    }

    .file-list {
      margin-top: var(--primitive-spacing-4);
      padding: var(--primitive-spacing-3);
      background-color: var(--semantic-surface-subtle);
      border-radius: var(--primitive-border-radius-md);
    }

    .file-list p {
      margin-bottom: var(--primitive-spacing-2);
      font-size: var(--primitive-font-size-sm);
      color: var(--semantic-text-secondary);
    }

    .file-list ui-chip {
      margin-right: var(--primitive-spacing-2);
      margin-bottom: var(--primitive-spacing-2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDemoComponent {
  protected uploadedFiles = signal<File[]>([]);

  protected onFilesSelected(files: File[]): void {
    this.uploadedFiles.set([...this.uploadedFiles(), ...files]);
  }

  protected removeFile(file: File): void {
    this.uploadedFiles.set(this.uploadedFiles().filter(f => f !== file));
  }

  protected formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
