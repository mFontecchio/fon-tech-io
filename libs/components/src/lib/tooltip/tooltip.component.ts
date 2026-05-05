/**
 * Tooltip Component
 *
 * A themable tooltip component with positioning support.
 * Uses CSS for positioning with fallback for viewport constraints.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ElementRef,
  inject, OnDestroy,
} from '@angular/core';
import { NgClass } from '@angular/common';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type TooltipSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'fui-tooltip',
  imports: [NgClass],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-tooltip-wrapper]': 'true',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focusin)': 'handleFocusIn()',
    '(focusout)': 'handleFocusOut()',
  },
})
export class TooltipComponent implements OnDestroy {
  /**
   * Tooltip text content
   */
  readonly text = input.required<string>();

  /**
   * Tooltip position
   */
  readonly position = input<TooltipPosition>('top');

  /**
   * Tooltip size
   */
  readonly size = input<TooltipSize>('md');

  /**
   * Delay before showing (ms)
   */
  readonly showDelay = input<number>(200);

  /**
   * Delay before hiding (ms)
   */
  readonly hideDelay = input<number>(0);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Internal visibility state
   */
  protected readonly isVisible = signal(false);

  /**
   * Show timeout ID
   */
  private showTimeoutId?: number;

  /**
   * Hide timeout ID
   */
  private hideTimeoutId?: number;

  /**
   * Computed CSS classes
   */
  protected readonly tooltipClasses = computed(() => ({
    'fui-tooltip': true,
    [`fui-tooltip--${this.position()}`]: true,
    [`fui-tooltip--${this.size()}`]: true,
    'fui-tooltip--visible': this.isVisible(),
  }));

  /**
   * Handle mouse enter
   */
  protected handleMouseEnter(): void {
    if (this.disabled()) return;

    this.clearHideTimeout();

    this.showTimeoutId = window.setTimeout(() => {
      this.updatePosition();
      this.isVisible.set(true);
    }, this.showDelay());
  }

  /**
   * Handle mouse leave
   */
  protected handleMouseLeave(): void {
    if (this.disabled()) return;

    this.clearShowTimeout();

    this.hideTimeoutId = window.setTimeout(() => {
      this.isVisible.set(false);
    }, this.hideDelay());
  }

  /**
   * Handle focus (for keyboard accessibility)
   */
  protected handleFocusIn(): void {
    if (this.disabled()) return;

    this.clearHideTimeout();
    this.updatePosition();
    this.isVisible.set(true);
  }

  /**
   * Handle blur
   */
  protected handleFocusOut(): void {
    if (this.disabled()) return;

    this.clearShowTimeout();
    this.isVisible.set(false);
  }

  /**
   * Clear show timeout
   */
  private clearShowTimeout(): void {
    if (this.showTimeoutId) {
      window.clearTimeout(this.showTimeoutId);
      this.showTimeoutId = undefined;
    }
  }

  /**
   * Clear hide timeout
   */
  private clearHideTimeout(): void {
    if (this.hideTimeoutId) {
      window.clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = undefined;
    }
  }

  /**
   * Update tooltip position based on trigger element
   */
  private updatePosition(): void {
    const hostElement = this.elementRef?.nativeElement;
    if (!hostElement) return;

    const rect = hostElement.getBoundingClientRect();
    const position = this.position();
    const gap = 8; // 0.5rem

    let left = 0;
    let top = 0;
    let transform = 'none';

    switch (position) {
      case 'top':
        left = rect.left + rect.width / 2;
        top = rect.top - gap;
        transform = 'translate(-50%, -100%)';
        break;
      case 'bottom':
        left = rect.left + rect.width / 2;
        top = rect.bottom + gap;
        transform = 'translateX(-50%)';
        break;
      case 'left':
        left = rect.left - gap;
        top = rect.top + rect.height / 2;
        transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        left = rect.right + gap;
        top = rect.top + rect.height / 2;
        transform = 'translateY(-50%)';
        break;
    }

    hostElement.style.setProperty('--fui-tooltip-left', `${left}px`);
    hostElement.style.setProperty('--fui-tooltip-top', `${top}px`);
    hostElement.style.setProperty('--fui-tooltip-transform', transform);
  }

  /**
   * Cleanup on destroy
   */
  ngOnDestroy(): void {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }

  private elementRef = inject(ElementRef);
}
