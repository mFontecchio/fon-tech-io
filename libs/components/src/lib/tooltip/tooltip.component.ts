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
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type TooltipSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-tooltip',
  imports: [NgClass, NgStyle],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-tooltip-wrapper]': 'true',
  },
})
export class TooltipComponent {
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
   * Dynamic position styles
   */
  protected readonly tooltipStyles = signal<Record<string, string>>({});

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
    'ui-tooltip': true,
    [`ui-tooltip--${this.position()}`]: true,
    [`ui-tooltip--${this.size()}`]: true,
    'ui-tooltip--visible': this.isVisible(),
  }));

  /**
   * Handle mouse enter
   */
  @HostListener('mouseenter')
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
  @HostListener('mouseleave')
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
  @HostListener('focusin')
  protected handleFocusIn(): void {
    if (this.disabled()) return;

    this.clearHideTimeout();
    this.updatePosition();
    this.isVisible.set(true);
  }

  /**
   * Handle blur
   */
  @HostListener('focusout')
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

    const styles: Record<string, string> = {};

    switch (position) {
      case 'top':
        styles['left'] = `${rect.left + rect.width / 2}px`;
        styles['top'] = `${rect.top - gap}px`;
        styles['transform'] = 'translate(-50%, -100%)';
        break;
      case 'bottom':
        styles['left'] = `${rect.left + rect.width / 2}px`;
        styles['top'] = `${rect.bottom + gap}px`;
        styles['transform'] = 'translateX(-50%)';
        break;
      case 'left':
        styles['left'] = `${rect.left - gap}px`;
        styles['top'] = `${rect.top + rect.height / 2}px`;
        styles['transform'] = 'translate(-100%, -50%)';
        break;
      case 'right':
        styles['left'] = `${rect.right + gap}px`;
        styles['top'] = `${rect.top + rect.height / 2}px`;
        styles['transform'] = 'translateY(-50%)';
        break;
    }

    this.tooltipStyles.set(styles);
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

