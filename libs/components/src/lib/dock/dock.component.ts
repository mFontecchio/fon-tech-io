/**
 * Dock Component
 *
 * A taskbar-style navigation bar fixed to a viewport edge.
 * Supports top, right, bottom, and left positions with automatic
 * horizontal/vertical layout switching. Child DockItemComponents are
 * notified of orientation changes via setVertical(). Provides full
 * ARIA toolbar keyboard navigation.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  input,
} from '@angular/core';
import { DockItemComponent } from './dock-item.component';
import { DockPosition } from './dock.types';

@Component({
  selector: 'fui-dock',
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    'role': 'toolbar',
    '[attr.aria-label]': '"Application dock"',
    '[attr.aria-orientation]': 'isVertical() ? "vertical" : "horizontal"',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class DockComponent {
  /**
   * Viewport edge the dock attaches to.
   * Determines whether layout is horizontal (top/bottom) or vertical (left/right).
   */
  readonly position = input<DockPosition>('bottom');

  /**
   * Whether the dock is in vertical layout mode (left or right position).
   * Read by child DockItemComponents via setVertical().
   */
  readonly isVertical = computed(
    () => this.position() === 'left' || this.position() === 'right'
  );

  /** Projected child dock items used for keyboard navigation. */
  private readonly items = contentChildren(DockItemComponent);

  /** Computed CSS host classes. */
  protected readonly hostClasses = computed(
    () => `fui-dock fui-dock--${this.position()}`
  );

  constructor() {
    // Propagate orientation to all child items whenever position changes.
    effect(() => {
      const vertical = this.isVertical();
      this.items().forEach((item) => item.setVertical(vertical));
    });
  }

  /**
   * Handle keyboard navigation across dock items.
   * Arrow keys move focus between enabled items.
   * Home/End jump to the first/last enabled item.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    const itemsList = this.items();
    if (itemsList.length === 0) return;

    const vertical = this.isVertical();
    const currentIndex = itemsList.findIndex((item) => item.containsFocus());
    if (currentIndex === -1) return;

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        if (!vertical) {
          event.preventDefault();
          newIndex = this.getPreviousEnabled(currentIndex);
        }
        break;
      case 'ArrowRight':
        if (!vertical) {
          event.preventDefault();
          newIndex = this.getNextEnabled(currentIndex);
        }
        break;
      case 'ArrowUp':
        if (vertical) {
          event.preventDefault();
          newIndex = this.getPreviousEnabled(currentIndex);
        }
        break;
      case 'ArrowDown':
        if (vertical) {
          event.preventDefault();
          newIndex = this.getNextEnabled(currentIndex);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = this.getFirstEnabled();
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.getLastEnabled();
        break;
    }

    if (newIndex !== currentIndex) {
      itemsList[newIndex].focus();
    }
  }

  private getPreviousEnabled(currentIndex: number): number {
    const itemsList = this.items();
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!itemsList[i].disabled()) return i;
    }
    return currentIndex;
  }

  private getNextEnabled(currentIndex: number): number {
    const itemsList = this.items();
    for (let i = currentIndex + 1; i < itemsList.length; i++) {
      if (!itemsList[i].disabled()) return i;
    }
    return currentIndex;
  }

  private getFirstEnabled(): number {
    const itemsList = this.items();
    for (let i = 0; i < itemsList.length; i++) {
      if (!itemsList[i].disabled()) return i;
    }
    return 0;
  }

  private getLastEnabled(): number {
    const itemsList = this.items();
    for (let i = itemsList.length - 1; i >= 0; i--) {
      if (!itemsList[i].disabled()) return i;
    }
    return itemsList.length - 1;
  }
}
