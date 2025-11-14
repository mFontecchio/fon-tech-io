/**
 * Popover Component
 * 
 * A floating container that displays rich content when triggered.
 * Similar to Tooltip but for more complex content with interactions.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ElementRef,
  inject,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type PopoverPosition = 'top' | 'right' | 'bottom' | 'left';
export type PopoverTrigger = 'click' | 'hover';

@Component({
  selector: 'ui-popover',
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-popover-wrapper]': 'true',
  },
})
export class PopoverComponent {
  /**
   * Popover title
   */
  readonly title = input<string | undefined>(undefined);

  /**
   * Popover position
   */
  readonly position = input<PopoverPosition>('bottom');

  /**
   * Trigger type
   */
  readonly trigger = input<PopoverTrigger>('click');

  /**
   * Show arrow
   */
  readonly showArrow = input<boolean>(true);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Open state change event
   */
  readonly openChange = output<boolean>();

  /**
   * Internal open state
   */
  protected readonly isOpen = signal(false);

  /**
   * Dynamic position styles
   */
  protected readonly popoverStyles = signal<Record<string, string>>({});

  /**
   * Computed CSS classes
   */
  protected readonly popoverClasses = computed(() => ({
    'ui-popover': true,
    [`ui-popover--${this.position()}`]: true,
    'ui-popover--visible': this.isOpen(),
    'ui-popover--with-arrow': this.showArrow(),
  }));

  private elementRef = inject(ElementRef);

  /**
   * Toggle popover
   */
  protected toggle(): void {
    if (this.disabled()) return;

    const newState = !this.isOpen();
    this.isOpen.set(newState);
    
    if (newState) {
      this.updatePosition();
    }
    
    this.openChange.emit(newState);
  }

  /**
   * Open popover
   */
  protected open(): void {
    if (this.disabled() || this.isOpen()) return;

    this.updatePosition();
    this.isOpen.set(true);
    this.openChange.emit(true);
  }

  /**
   * Close popover
   */
  protected close(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.openChange.emit(false);
  }

  /**
   * Handle trigger click
   */
  protected handleTriggerClick(): void {
    if (this.trigger() === 'click') {
      this.toggle();
    }
  }

  /**
   * Handle trigger mouse enter
   */
  protected handleTriggerMouseEnter(): void {
    if (this.trigger() === 'hover') {
      this.open();
    }
  }

  /**
   * Handle trigger mouse leave
   */
  protected handleTriggerMouseLeave(): void {
    if (this.trigger() === 'hover') {
      setTimeout(() => this.close(), 100);
    }
  }

  /**
   * Click outside to close
   */
  @HostListener('document:click', ['$event'])
  protected handleClickOutside(event: Event): void {
    if (this.trigger() !== 'click') return;

    const target = event.target as HTMLElement;
    const hostElement = this.elementRef.nativeElement;

    if (!hostElement.contains(target) && this.isOpen()) {
      this.close();
    }
  }

  /**
   * Handle escape key
   */
  @HostListener('keydown.escape')
  protected handleEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  /**
   * Update popover position
   */
  private updatePosition(): void {
    const hostElement = this.elementRef?.nativeElement;
    if (!hostElement) return;

    const trigger = hostElement.querySelector('.ui-popover-trigger');
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const position = this.position();
    const gap = 8;

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

    this.popoverStyles.set(styles);
  }
}

