/**
 * CodeBlock Component
 * Displays formatted code with copy-to-clipboard functionality
 */

import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      <pre class="code-block-content"><code [class]="'language-' + language()">{{ code() }}</code></pre>
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

  protected copyCode(): void {
    navigator.clipboard.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}

