/**
 * Dock Item Component
 *
 * An individual item within a Dock component. Renders an interactive button
 * with a projected icon slot, text label, optional badge bubble, and an
 * active state indicator. Orientation (horizontal vs vertical) is set by
 * the parent DockComponent via setVertical().
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'fui-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrl: './dock-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-dock-item-host]': 'true',
  },
})
export class DockItemComponent {
  /**
   * Text label displayed beneath (horizontal) or beside (vertical) the icon.
   * Omit for icon-only items — use ariaLabel to retain accessibility.
   */
  readonly label = input<string>('');

  /**
   * Badge bubble value. Numbers above 99 display as "99+".
   */
  readonly badge = input<number | string | undefined>(undefined);

  /**
   * Whether this item is highlighted as the active/selected entry.
   */
  readonly active = input<boolean>(false);

  /**
   * Whether this item is disabled. Suppresses click events and dims the item.
   */
  readonly disabled = input<boolean>(false);

  /**
   * Accessible label override. Falls back to the label input when not provided.
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Emitted when the item is clicked or activated via keyboard.
   * Suppressed when disabled is true.
   */
  readonly itemClick = output<MouseEvent>();

  /** Internal vertical layout flag, set by the parent DockComponent. */
  private readonly _isVertical = signal(false);

  /** Whether this item is rendered in a vertically oriented dock. */
  protected readonly isVertical = this._isVertical.asReadonly();

  /** Reference to the native button element for programmatic focus management. */
  private readonly buttonEl = viewChild.required<ElementRef<HTMLButtonElement>>('button');

  /** Host element reference, used by containsFocus(). */
  private readonly hostEl = inject(ElementRef);

  /**
   * Formatted badge display value. Returns undefined when no badge is set.
   * Caps numeric values at "99+".
   */
  protected readonly displayBadge = computed<string | undefined>(() => {
    const b = this.badge();
    if (b === undefined || b === null || b === '') return undefined;
    if (typeof b === 'number' && b > 99) return '99+';
    return String(b);
  });

  /**
   * Effective accessible label: ariaLabel input if provided, otherwise label.
   */
  protected readonly effectiveAriaLabel = computed(
    () => this.ariaLabel() ?? this.label()
  );

  /**
   * Handle button click — suppressed when disabled.
   */
  protected handleClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.itemClick.emit(event);
  }

  /**
   * Move keyboard focus to the internal button element.
   * Called by the parent DockComponent during arrow-key navigation.
   */
  public focus(): void {
    this.buttonEl().nativeElement.focus();
  }

  /**
   * Returns true if the internal button currently holds document focus.
   * Used by the parent DockComponent to determine which item is focused
   * during keydown events.
   */
  public containsFocus(): boolean {
    return (this.hostEl.nativeElement as HTMLElement).contains(document.activeElement);
  }

  /**
   * Set vertical layout mode. Called by the parent DockComponent via an effect
   * whenever the dock position changes.
   *
   * @param vertical - True for left/right positions, false for top/bottom.
   */
  public setVertical(vertical: boolean): void {
    this._isVertical.set(vertical);
  }
}
