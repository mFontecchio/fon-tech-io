/**
 * Code Block Component
 * Displays syntax-highlighted code with copy functionality
 */

import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CodeLanguage = 'typescript' | 'html' | 'css' | 'json' | 'bash';

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
            class="copy-button" 
            (click)="copyCode()"
            [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
          >
            @if (copied()) {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>Copied!</span>
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>Copy</span>
            }
          </button>
        </div>
      }
      <div class="code-block-content">
        <pre [class]="'language-' + language()"><code>{{ code() }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .code-block {
      margin: var(--primitive-spacing-4) 0;
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-md);
      overflow: hidden;
      background-color: var(--semantic-surface-card);
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
      font-weight: var(--primitive-font-weight-medium);
      color: var(--semantic-text-secondary);
    }

    .copy-button {
      display: flex;
      align-items: center;
      gap: var(--primitive-spacing-2);
      padding: var(--primitive-spacing-1) var(--primitive-spacing-3);
      background: transparent;
      border: 1px solid var(--semantic-border-default);
      border-radius: var(--primitive-border-radius-sm);
      color: var(--semantic-text-secondary);
      font-size: var(--primitive-font-size-sm);
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-button:hover {
      background-color: var(--semantic-surface-subtle);
      border-color: var(--semantic-brand-primary);
      color: var(--semantic-brand-primary);
    }

    .copy-button:active {
      transform: scale(0.95);
    }

    .code-block-content {
      overflow-x: auto;
      background-color: var(--semantic-surface-base);
    }

    pre {
      margin: 0;
      padding: var(--primitive-spacing-4);
      overflow-x: auto;
    }

    code {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: var(--primitive-font-size-sm);
      line-height: 1.6;
      color: var(--semantic-text-primary);
    }

    /* Basic syntax highlighting (can be enhanced with a library later) */
    .language-typescript code,
    .language-html code,
    .language-css code {
      white-space: pre;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  readonly code = input.required<string>();
  readonly language = input<CodeLanguage>('typescript');
  readonly title = input<string>();
  
  protected copied = signal(false);

  protected copyCode(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}

