/**
 * Tabs Component
 *
 * A themable tabs component with keyboard navigation and ARIA support.
 * Supports horizontal and vertical orientations.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  contentChildren,
  effect,
  viewChildren,
  ElementRef,
  afterNextRender,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TabComponent } from './tab.component';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'fui-tabs',
  imports: [NgClass],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class TabsComponent {
  /**
   * Active tab index
   */
  readonly activeIndex = input<number>(0);

  /**
   * Tabs orientation
   */
  readonly orientation = input<TabsOrientation>('horizontal');

  /**
   * Tabs size
   */
  readonly size = input<TabsSize>('md');

  /**
   * Full width tabs
   */
  readonly fullWidth = input<boolean>(false);

  /**
   * Active tab change event
   */
  readonly activeIndexChange = output<number>();

  /**
   * Tab components
   */
  protected readonly tabs = contentChildren(TabComponent);

  /**
   * Tab button elements
   */
  protected readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  /**
   * Internal active index
   */
  protected readonly internalActiveIndex = signal(0);

  /**
   * Indicator position (left or top depending on orientation)
   */
  protected readonly indicatorPosition = signal(0);

  /**
   * Indicator size (width or height depending on orientation)
   */
  protected readonly indicatorSize = signal(0);

  /**
   * Computed CSS classes
   */
  protected readonly tabsClasses = computed(() => ({
    'fui-tabs': true,
    [`fui-tabs--${this.orientation()}`]: true,
    [`fui-tabs--${this.size()}`]: true,
    'fui-tabs--full-width': this.fullWidth(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.tabsClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  constructor() {
    // Sync internal active index
    effect(() => {
      this.internalActiveIndex.set(this.activeIndex());
    });

    // Update tab active states
    effect(() => {
      const activeIdx = this.internalActiveIndex();
      const tabsList = this.tabs();

      tabsList.forEach((tab, index) => {
        tab.setActive(index === activeIdx);
        tab.setIndex(index);
      });
    });

    // Update indicator position and size when active index changes
    effect(() => {
      // Track the active index change
      const activeIdx = this.internalActiveIndex();

      // Only update after DOM is ready
      if (this.tabButtons().length > 0) {
        requestAnimationFrame(() => {
          this.updateIndicator();
        });
      }
    });

    // Initial calculation after first render
    afterNextRender(() => {
      requestAnimationFrame(() => {
        this.updateIndicator();
      });
    });
  }

  /**
   * Update indicator position and size based on active tab button
   */
  private updateIndicator(): void {
    const activeIdx = this.internalActiveIndex();
    const buttons = this.tabButtons();
    const isHorizontal = this.orientation() === 'horizontal';

    if (buttons && buttons.length > 0 && buttons[activeIdx]) {
      const button = buttons[activeIdx].nativeElement;

      if (button) {
        if (isHorizontal) {
          // For horizontal tabs, position from left and use width
          const position = button.offsetLeft;
          const size = button.offsetWidth;

          this.indicatorPosition.set(position);
          this.indicatorSize.set(size);
        } else {
          // For vertical tabs, position from top and use height
          const position = button.offsetTop;
          const size = button.offsetHeight;

          this.indicatorPosition.set(position);
          this.indicatorSize.set(size);
        }
      }
    }
  }

  /**
   * Handle tab click
   */
  protected selectTab(index: number): void {
    const tabsList = this.tabs();
    const tab = tabsList[index];

    if (tab && !tab.disabled()) {
      this.internalActiveIndex.set(index);
      this.activeIndexChange.emit(index);

      // Manually trigger indicator update
      requestAnimationFrame(() => {
        this.updateIndicator();
      });
    }
  }

  /**
   * Handle keyboard navigation
   */
  protected handleKeyDown(event: KeyboardEvent, currentIndex: number): void {
    const tabsList = this.tabs();
    const isHorizontal = this.orientation() === 'horizontal';
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = this.getPreviousEnabledTab(currentIndex);
        }
        break;
      case 'ArrowRight':
        if (isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextEnabledTab(currentIndex);
        }
        break;
      case 'ArrowUp':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = this.getPreviousEnabledTab(currentIndex);
        }
        break;
      case 'ArrowDown':
        if (!isHorizontal) {
          event.preventDefault();
          newIndex = this.getNextEnabledTab(currentIndex);
        }
        break;
      case 'Home':
        event.preventDefault();
        newIndex = this.getFirstEnabledTab();
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.getLastEnabledTab();
        break;
    }

    if (newIndex !== currentIndex) {
      this.selectTab(newIndex);
      // Focus the new tab
      requestAnimationFrame(() => {
        const buttons = document.querySelectorAll('.fui-tab-button');
        if (buttons[newIndex]) {
          (buttons[newIndex] as HTMLElement).focus();
        }
      });
    }
  }

  /**
   * Get next enabled tab index
   */
  private getNextEnabledTab(currentIndex: number): number {
    const tabsList = this.tabs();
    for (let i = currentIndex + 1; i < tabsList.length; i++) {
      if (!tabsList[i].disabled()) {
        return i;
      }
    }
    return currentIndex;
  }

  /**
   * Get previous enabled tab index
   */
  private getPreviousEnabledTab(currentIndex: number): number {
    const tabsList = this.tabs();
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!tabsList[i].disabled()) {
        return i;
      }
    }
    return currentIndex;
  }

  /**
   * Get first enabled tab index
   */
  private getFirstEnabledTab(): number {
    const tabsList = this.tabs();
    for (let i = 0; i < tabsList.length; i++) {
      if (!tabsList[i].disabled()) {
        return i;
      }
    }
    return 0;
  }

  /**
   * Get last enabled tab index
   */
  private getLastEnabledTab(): number {
    const tabsList = this.tabs();
    for (let i = tabsList.length - 1; i >= 0; i--) {
      if (!tabsList[i].disabled()) {
        return i;
      }
    }
    return tabsList.length - 1;
  }
}
