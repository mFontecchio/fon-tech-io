/**
 * CodeBlock Component
 * Displays formatted code with syntax highlighting, copy-to-clipboard, and download functionality
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  afterNextRender,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import Prism from 'prismjs';

// Import language definitions
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';

@Component({
  selector: 'ui-code-block',
  standalone: true,
  imports: [],
  template: `
    <div class="ui-code-block">
      @if (title()) {
        <div class="ui-code-block-header">
          <span class="ui-code-block-title">{{ title() }}</span>
          <div class="ui-code-block-actions">
            <button
              class="ui-code-block-copy"
              (click)="copyCode()"
              [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
            >
              @if (copied()) {
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Copied!</span>
              } @else {
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy</span>
              }
            </button>
            @if (showDownload()) {
              <button
                class="ui-code-block-download"
                (click)="downloadCode()"
                [attr.aria-label]="'Download ' + filename()"
                title="Download file"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download</span>
              </button>
            }
          </div>
        </div>
      }
      <pre
        class="ui-code-block-content"
      ><code #codeElement [class]="'language-' + language()"></code></pre>
    </div>
  `,
  styles: [
    `
      .ui-code-block {
        margin: var(--primitive-spacing-4) 0;
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-md);
        overflow: hidden;
        background-color: var(--semantic-surface-card);
      }

      .ui-code-block-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
        background-color: var(--semantic-surface-background-secondary);
        border-bottom: 1px solid var(--semantic-border-default);
      }

      .ui-code-block-title {
        font-size: var(--primitive-font-size-sm);
        font-weight: var(--primitive-font-weight-semibold);
        color: var(--semantic-text-primary);
      }

      .ui-code-block-actions {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
      }

      .ui-code-block-copy,
      .ui-code-block-download {
        display: flex;
        align-items: center;
        gap: var(--primitive-spacing-2);
        padding: var(--primitive-spacing-2) var(--primitive-spacing-3);
        font-size: var(--primitive-font-size-xs);
        font-weight: var(--primitive-font-weight-medium);
        color: var(--semantic-text-secondary);
        background-color: transparent;
        border: 1px solid var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-sm);
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .ui-code-block-copy:hover,
      .ui-code-block-download:hover {
        background-color: var(--semantic-surface-card);
        color: var(--semantic-text-primary);
        border-color: var(--semantic-border-strong);
      }

      .ui-code-block-copy:active,
      .ui-code-block-download:active {
        transform: scale(0.95);
      }

      .ui-code-block-copy svg,
      .ui-code-block-download svg {
        width: 14px;
        height: 14px;
        stroke-width: 2;
      }

      .ui-code-block-content {
        margin: 0;
        padding: var(--primitive-spacing-4);
        overflow-x: auto;
        font-size: var(--primitive-font-size-base);
        line-height: 1.6;
        background-color: var(--semantic-surface-card);
      }

      .ui-code-block-content code {
        font-family: var(--primitive-font-family-mono);
        color: var(--semantic-text-primary);
      }

      /* Prism Theme - Dark Mode (Default) */
      :host ::ng-deep code .token.comment,
      :host ::ng-deep code .token.prolog,
      :host ::ng-deep code .token.doctype,
      :host ::ng-deep code .token.cdata {
        color: #7c8891;
      }
      :host ::ng-deep code .token.punctuation {
        color: #c5d4dd;
      }
      :host ::ng-deep code .token.property,
      :host ::ng-deep code .token.tag,
      :host ::ng-deep code .token.boolean,
      :host ::ng-deep code .token.number,
      :host ::ng-deep code .token.constant,
      :host ::ng-deep code .token.symbol,
      :host ::ng-deep code .token.deleted {
        color: #79c0ff;
      }
      :host ::ng-deep code .token.selector,
      :host ::ng-deep code .token.attr-name,
      :host ::ng-deep code .token.string,
      :host ::ng-deep code .token.char,
      :host ::ng-deep code .token.builtin,
      :host ::ng-deep code .token.inserted {
        color: #a5d6ff;
      }
      :host ::ng-deep code .token.operator,
      :host ::ng-deep code .token.entity,
      :host ::ng-deep code .token.url,
      :host ::ng-deep code .language-css .token.string,
      :host ::ng-deep code .style .token.string,
      :host ::ng-deep code .token.atrule,
      :host ::ng-deep code .token.attr-value,
      :host ::ng-deep code .token.keyword {
        color: #ff7b72;
      }
      :host ::ng-deep code .token.function,
      :host ::ng-deep code .token.class-name {
        color: #d2a8ff;
      }
      :host ::ng-deep code .token.regex,
      :host ::ng-deep code .token.important,
      :host ::ng-deep code .token.variable {
        color: #ffa657;
      }

      /* Prism Theme - Light Mode */
      :host-context([data-theme-mode='light']) ::ng-deep code .token.comment,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.prolog,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.doctype,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.cdata {
        color: #6a737d;
      }
      :host-context([data-theme-mode='light']) ::ng-deep code .token.punctuation {
        color: #24292e;
      }
      :host-context([data-theme-mode='light']) ::ng-deep code .token.property,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.tag,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.boolean,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.number,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.constant,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.symbol,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.deleted {
        color: #005cc5;
      }
      :host-context([data-theme-mode='light']) ::ng-deep code .token.selector,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.attr-name,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.string,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.char,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.builtin,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.inserted {
        color: #032f62;
      }
      :host-context([data-theme-mode='light']) ::ng-deep code .token.operator,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.entity,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.url,
      :host-context([data-theme-mode='light']) ::ng-deep code .language-css .token.string,
      :host-context([data-theme-mode='light']) ::ng-deep code .style .token.string,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.atrule,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.attr-value,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.keyword {
        color: #d73a49;
      }
      :host-context([data-theme-mode='light']) ::ng-deep code .token.function,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.class-name {
        color: #6f42c1;
      }
      :host-context([data-theme-mode='light']) ::ng-deep code .token.regex,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.important,
      :host-context([data-theme-mode='light']) ::ng-deep code .token.variable {
        color: #b45309;
      }

      /* Prism Theme - High Contrast Mode */
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.comment,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.prolog,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.doctype,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.cdata {
        color: #9ca3af;
      }
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.punctuation {
        color: #f3f4f6;
      }
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.property,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.tag,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.boolean,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.number,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.constant,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.symbol,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.deleted {
        color: #60a5fa;
      }
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.selector,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.attr-name,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.string,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.char,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.builtin,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.inserted {
        color: #93c5fd;
      }
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.operator,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.entity,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.url,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .language-css .token.string,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .style .token.string,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.atrule,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.attr-value,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.keyword {
        color: #fca5a5;
      }
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.function,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.class-name {
        color: #e9d5ff;
      }
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.regex,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.important,
      :host-context([data-theme-mode='high-contrast']) ::ng-deep code .token.variable {
        color: #fdba74;
      }

      /* Scrollbar Styling */
      .ui-code-block-content::-webkit-scrollbar {
        height: 8px;
      }

      .ui-code-block-content::-webkit-scrollbar-track {
        background: transparent;
      }

      .ui-code-block-content::-webkit-scrollbar-thumb {
        background: var(--semantic-border-default);
        border-radius: var(--primitive-border-radius-full);
      }

      .ui-code-block-content::-webkit-scrollbar-thumb:hover {
        background: var(--semantic-border-strong);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');
  readonly title = input<string>('');
  readonly showDownload = input<boolean>(true);
  readonly filename = input<string>('');

  protected readonly copied = signal(false);
  protected readonly codeElement = viewChild<ElementRef<HTMLElement>>('codeElement');

  constructor() {
    // Initial highlight after rendering
    afterNextRender(() => {
      setTimeout(() => {
        this.highlightCode();
      }, 0);
    });

    // Re-highlight when code or language changes
    effect(() => {
      // Track code and language changes
      const currentCode = this.code();
      const currentLang = this.language();

      // Skip if no code element yet
      if (this.codeElement()) {
        setTimeout(() => {
          this.highlightCode();
        }, 0);
      }
    });
  }

  private highlightCode(): void {
    const element = this.codeElement()?.nativeElement;
    if (element && this.code()) {
      // Remove the 'code-highlighted' class that Prism adds to prevent re-highlighting
      element.classList.remove('code-highlighted');

      // Ensure the element has the language class
      const lang = this.language();
      element.className = `language-${lang}`;

      // Set the text content
      element.textContent = this.code();

      // Highlight the element
      Prism.highlightElement(element);
    }
  }

  protected copyCode(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  protected downloadCode(): void {
    const code = this.code();
    const lang = this.language();
    const customFilename = this.filename();

    // Generate filename with proper extension
    let fileName: string;
    if (customFilename) {
      fileName = customFilename;
    } else {
      const extension = this.getFileExtension(lang);
      fileName = `example${extension}`;
    }

    // Create blob and download
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private getFileExtension(language: string): string {
    const extensionMap: Record<string, string> = {
      typescript: '.ts',
      javascript: '.js',
      html: '.html',
      css: '.css',
      scss: '.scss',
      json: '.json',
      markdown: '.md',
      bash: '.sh',
      shell: '.sh',
    };
    return extensionMap[language] || '.txt';
  }
}
