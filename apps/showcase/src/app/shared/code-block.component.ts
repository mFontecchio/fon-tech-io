/**
 * CodeBlock Component
 * Displays formatted code with syntax highlighting and copy-to-clipboard functionality
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
import { CommonModule } from '@angular/common';
import Prism from 'prismjs';

// Import language definitions
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-block">
      @if (title()) {
        <div class="code-block-header">
          <span class="code-block-title">{{ title() }}</span>
          <button
            class="code-block-copy"
            (click)="copyCode()"
            [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
          >
            @if (copied()) {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Copied!</span>
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            }
          </button>
        </div>
      }
      <pre class="code-block-content"><code #codeElement [class]="'language-' + language()"></code></pre>
    </div>
  `,
  styles: [`
    .code-block {
      margin: var(--primitive-spacing-4) 0;
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-md);
      overflow: hidden;
      background-color: var(--semantic-surface-code);
    }

    .code-block-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--primitive-spacing-3) var(--primitive-spacing-4);
      background-color: var(--semantic-surface-subtle);
      border-bottom: 1px solid var(--semantic-border-default);
    }

    .code-block-title {
      font-size: var(--primitive-font-size-sm);
      font-weight: var(--primitive-font-weight-semibold);
      color: var(--semantic-text-primary);
    }

    .code-block-copy {
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

    .code-block-copy:hover {
      background-color: var(--semantic-surface-card);
      color: var(--semantic-text-primary);
      border-color: var(--semantic-border-strong);
    }

    .code-block-copy:active {
      transform: scale(0.95);
    }

    .code-block-copy svg {
      width: 14px;
      height: 14px;
      stroke-width: 2;
    }

    .code-block-content {
      margin: 0;
      padding: var(--primitive-spacing-4);
      overflow-x: auto;
      background-color: var(--semantic-surface-code);
    }

    code {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: var(--primitive-font-size-sm);
      line-height: var(--primitive-line-height-relaxed);
      color: var(--semantic-text-code);
      white-space: pre;
    }

    /* Prism.js Syntax Highlighting - Theme-Aware Colors */
    
    /* Comments - Muted green/gray */
    :host ::ng-deep code .token.comment,
    :host ::ng-deep code .token.prolog,
    :host ::ng-deep code .token.doctype,
    :host ::ng-deep code .token.cdata {
      color: #6a9955; /* Dark theme */
      opacity: 0.8;
    }

    :host-context([data-theme="light"]) ::ng-deep code .token.comment,
    :host-context([data-theme="light"]) ::ng-deep code .token.prolog,
    :host-context([data-theme="light"]) ::ng-deep code .token.doctype,
    :host-context([data-theme="light"]) ::ng-deep code .token.cdata {
      color: #008000; /* Darker green for light mode - WCAG AA */
    }

    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.comment,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.prolog,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.doctype,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.cdata {
      color: #00ff00; /* Bright green for high contrast */
    }

    /* Punctuation - Use semantic text color */
    :host ::ng-deep code .token.punctuation {
      color: var(--semantic-text-secondary);
    }

    /* Numbers, Booleans, Constants - Light green */
    :host ::ng-deep code .token.property,
    :host ::ng-deep code .token.tag,
    :host ::ng-deep code .token.boolean,
    :host ::ng-deep code .token.number,
    :host ::ng-deep code .token.constant,
    :host ::ng-deep code .token.symbol,
    :host ::ng-deep code .token.deleted {
      color: #b5cea8; /* Dark theme */
    }

    :host-context([data-theme="light"]) ::ng-deep code .token.property,
    :host-context([data-theme="light"]) ::ng-deep code .token.tag,
    :host-context([data-theme="light"]) ::ng-deep code .token.boolean,
    :host-context([data-theme="light"]) ::ng-deep code .token.number,
    :host-context([data-theme="light"]) ::ng-deep code .token.constant,
    :host-context([data-theme="light"]) ::ng-deep code .token.symbol,
    :host-context([data-theme="light"]) ::ng-deep code .token.deleted {
      color: #098658; /* Darker green for light mode - WCAG AA */
    }

    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.property,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.tag,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.boolean,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.number,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.constant,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.symbol,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.deleted {
      color: #00ffff; /* Cyan for high contrast */
    }

    /* Strings, Attributes - Orange */
    :host ::ng-deep code .token.selector,
    :host ::ng-deep code .token.attr-name,
    :host ::ng-deep code .token.string,
    :host ::ng-deep code .token.char,
    :host ::ng-deep code .token.builtin,
    :host ::ng-deep code .token.inserted {
      color: #ce9178; /* Dark theme */
    }

    :host-context([data-theme="light"]) ::ng-deep code .token.selector,
    :host-context([data-theme="light"]) ::ng-deep code .token.attr-name,
    :host-context([data-theme="light"]) ::ng-deep code .token.string,
    :host-context([data-theme="light"]) ::ng-deep code .token.char,
    :host-context([data-theme="light"]) ::ng-deep code .token.builtin,
    :host-context([data-theme="light"]) ::ng-deep code .token.inserted {
      color: #a31515; /* Darker red for light mode - WCAG AA */
    }

    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.selector,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.attr-name,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.string,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.char,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.builtin,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.inserted {
      color: #ffff00; /* Yellow for high contrast */
    }

    /* Operators - Use primary text color */
    :host ::ng-deep code .token.operator,
    :host ::ng-deep code .token.entity,
    :host ::ng-deep code .token.url,
    :host ::ng-deep code .language-css .token.string,
    :host ::ng-deep code .style .token.string {
      color: var(--semantic-text-primary);
    }

    /* Keywords - Purple/Magenta */
    :host ::ng-deep code .token.atrule,
    :host ::ng-deep code .token.attr-value,
    :host ::ng-deep code .token.keyword {
      color: #c586c0; /* Dark theme */
    }

    :host-context([data-theme="light"]) ::ng-deep code .token.atrule,
    :host-context([data-theme="light"]) ::ng-deep code .token.attr-value,
    :host-context([data-theme="light"]) ::ng-deep code .token.keyword {
      color: #0000ff; /* Blue for light mode - WCAG AA */
    }

    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.atrule,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.attr-value,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.keyword {
      color: #ff00ff; /* Magenta for high contrast */
    }

    /* Functions, Classes - Yellow */
    :host ::ng-deep code .token.function,
    :host ::ng-deep code .token.class-name {
      color: #dcdcaa; /* Dark theme */
    }

    :host-context([data-theme="light"]) ::ng-deep code .token.function,
    :host-context([data-theme="light"]) ::ng-deep code .token.class-name {
      color: #795e26; /* Darker yellow-brown for light mode - WCAG AA */
    }

    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.function,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.class-name {
      color: #ffff00; /* Bright yellow for high contrast */
      font-weight: bold;
    }

    /* Variables, Regex - Red */
    :host ::ng-deep code .token.regex,
    :host ::ng-deep code .token.important,
    :host ::ng-deep code .token.variable {
      color: #d16969; /* Dark theme */
    }

    :host-context([data-theme="light"]) ::ng-deep code .token.regex,
    :host-context([data-theme="light"]) ::ng-deep code .token.important,
    :host-context([data-theme="light"]) ::ng-deep code .token.variable {
      color: #e50000; /* Brighter red for light mode - WCAG AA */
    }

    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.regex,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.important,
    :host-context([data-theme="high-contrast"]) ::ng-deep code .token.variable {
      color: #ff0000; /* Bright red for high contrast */
    }

    /* Text emphasis */
    :host ::ng-deep code .token.important,
    :host ::ng-deep code .token.bold {
      font-weight: bold;
    }

    :host ::ng-deep code .token.italic {
      font-style: italic;
    }

    /* Scrollbar styling */
    .code-block-content::-webkit-scrollbar {
      height: 8px;
    }

    .code-block-content::-webkit-scrollbar-track {
      background: var(--semantic-surface-subtle);
    }

    .code-block-content::-webkit-scrollbar-thumb {
      background: var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-full);
    }

    .code-block-content::-webkit-scrollbar-thumb:hover {
      background: var(--semantic-border-strong);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('typescript');
  readonly title = input<string>('');

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
}

