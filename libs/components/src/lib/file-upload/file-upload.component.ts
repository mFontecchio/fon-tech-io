/**
 * File Upload Component
 * 
 * A file upload component with drag-drop support, preview, and progress tracking.
 * Built with accessibility and modern file handling in mind.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadedFile {
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

@Component({
  selector: 'ui-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-file-upload-wrapper]': 'true',
  },
})
export class FileUploadComponent {
  /**
   * Accepted file types (e.g., 'image/*', '.pdf', etc.)
   */
  readonly accept = input<string | undefined>(undefined);

  /**
   * Allow multiple files
   */
  readonly multiple = input<boolean>(false);

  /**
   * Maximum file size in bytes
   */
  readonly maxSize = input<number>(5 * 1024 * 1024); // 5MB default

  /**
   * Maximum number of files
   */
  readonly maxFiles = input<number>(10);

  /**
   * Show preview for images
   */
  readonly showPreview = input<boolean>(true);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Label text
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Helper text
   */
  readonly helperText = input<string | undefined>(undefined);

  /**
   * Error message
   */
  readonly errorMessage = input<string | undefined>(undefined);

  /**
   * Files selected event
   */
  readonly filesSelected = output<File[]>();

  /**
   * File removed event
   */
  readonly fileRemoved = output<File>();

  /**
   * Uploaded files
   */
  protected readonly uploadedFiles = signal<UploadedFile[]>([]);

  /**
   * Drag over state
   */
  protected readonly isDragOver = signal(false);

  /**
   * Computed error state
   */
  protected readonly hasError = computed(() => !!this.errorMessage());

  /**
   * Computed CSS classes
   */
  protected readonly dropzoneClasses = computed(() => ({
    'ui-file-upload-dropzone': true,
    'ui-file-upload-dropzone--drag-over': this.isDragOver(),
    'ui-file-upload-dropzone--disabled': this.disabled(),
    'ui-file-upload-dropzone--error': this.hasError(),
  }));

  /**
   * Handle file selection from input
   */
  protected handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = ''; // Reset input
    }
  }

  /**
   * Handle drag over
   */
  @HostListener('dragover', ['$event'])
  protected handleDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  /**
   * Handle drag leave
   */
  @HostListener('dragleave', ['$event'])
  protected handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  /**
   * Handle drop
   */
  @HostListener('drop', ['$event'])
  protected handleDrop(event: DragEvent): void {
    if (this.disabled()) return;
    
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(Array.from(files));
    }
  }

  /**
   * Process selected files
   */
  private processFiles(files: File[]): void {
    const currentFiles = this.uploadedFiles();
    const maxFiles = this.maxFiles();
    const maxSize = this.maxSize();
    const accept = this.accept();

    // Filter files
    let validFiles = files;

    // Check file count
    if (!this.multiple()) {
      validFiles = validFiles.slice(0, 1);
    } else if (currentFiles.length + validFiles.length > maxFiles) {
      validFiles = validFiles.slice(0, maxFiles - currentFiles.length);
    }

    // Validate files
    const uploadedFiles: UploadedFile[] = validFiles.map(file => {
      let error: string | undefined;

      // Check size
      if (file.size > maxSize) {
        error = `File size exceeds ${this.formatFileSize(maxSize)}`;
      }

      // Check type
      if (accept && !this.isFileTypeAccepted(file, accept)) {
        error = `File type not accepted`;
      }

      const uploadedFile: UploadedFile = {
        file,
        error,
      };

      // Generate preview for images
      if (this.showPreview() && file.type.startsWith('image/') && !error) {
        this.generatePreview(file, uploadedFile);
      }

      return uploadedFile;
    });

    // Update state
    if (!this.multiple()) {
      this.uploadedFiles.set(uploadedFiles);
    } else {
      this.uploadedFiles.update(current => [...current, ...uploadedFiles]);
    }

    // Emit valid files
    const validFilesOnly = uploadedFiles
      .filter(uf => !uf.error)
      .map(uf => uf.file);
    
    if (validFilesOnly.length > 0) {
      this.filesSelected.emit(validFilesOnly);
    }
  }

  /**
   * Generate preview for image
   */
  private generatePreview(file: File, uploadedFile: UploadedFile): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedFile.preview = e.target?.result as string;
      this.uploadedFiles.set([...this.uploadedFiles()]);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Remove file
   */
  protected removeFile(index: number): void {
    const files = this.uploadedFiles();
    const file = files[index];
    
    this.uploadedFiles.update(current => 
      current.filter((_, i) => i !== index)
    );

    this.fileRemoved.emit(file.file);
  }

  /**
   * Format file size
   */
  protected formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Check if file type is accepted
   */
  private isFileTypeAccepted(file: File, accept: string): boolean {
    const acceptTypes = accept.split(',').map(t => t.trim());
    
    return acceptTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type === type;
    });
  }
}

