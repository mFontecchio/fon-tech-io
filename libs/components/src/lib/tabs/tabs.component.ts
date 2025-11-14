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
  viewChildren,
  effect,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TabComponent } from './tab.component';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-tabs',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"tablist"',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class TabsComponent implements AfterViewInit {
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
  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  /**
   * Internal active index
   */
  protected readonly internalActiveIndex = signal(0);

  /**
   * Indicator position and size signals
   */
  protected readonly indicatorLeft = signal(0);
  protected readonly indicatorTop = signal(0);
  protected readonly indicatorWidth = signal(0);
  protected readonly indicatorHeight = signal(0);

  /**
   * Computed CSS classes
   */
  protected readonly tabsClasses = computed(() => ({
    'ui-tabs': true,
    [`ui-tabs--${this.orientation()}`]: true,
    [`ui-tabs--${this.size()}`]: true,
    'ui-tabs--full-width': this.fullWidth(),
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

    // Update indicator position when active index changes
    effect(() => {
      this.internalActiveIndex(); // Track changes
      setTimeout(() => this.updateIndicatorPosition(), 0);
    });

    // Update indicator when tab buttons change
    effect(() => {
      this.tabButtons(); // Track changes
      setTimeout(() => this.updateIndicatorPosition(), 0);
    });
  }

  ngAfterViewInit(): void {
    // Initial indicator position
    this.updateIndicatorPosition();
  }

  /**
   * Update indicator position and size based on active tab button
   */
  private updateIndicatorPosition(): void {
    const activeIndex = this.internalActiveIndex();
    const buttons = this.tabButtons();

    if (!buttons || buttons.length === 0 || activeIndex < 0 || activeIndex >= buttons.length) {
      return;
    }

    const activeButton = buttons[activeIndex]?.nativeElement;
    if (!activeButton) {
      return;
    }

    const isHorizontal = this.orientation() === 'horizontal';

    if (isHorizontal) {
      this.indicatorLeft.set(activeButton.offsetLeft);
      this.indicatorWidth.set(activeButton.offsetWidth);
    } else {
      this.indicatorTop.set(activeButton.offsetTop);
      this.indicatorHeight.set(activeButton.offsetHeight);
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
      setTimeout(() => {
        const buttons = document.querySelectorAll('.ui-tab-button');
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
