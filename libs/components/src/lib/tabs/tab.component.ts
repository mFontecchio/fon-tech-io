/**
 * Tab Component
 * 
 * Individual tab item used within Tabs component.
 * This component is for configuration only; content is projected in the parent.
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'ui-tab',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TabComponent {
  /**
   * Tab label
   */
  readonly label = input.required<string>();

  /**
   * Tab icon (emoji or text)
   */
  readonly icon = input<string | undefined>(undefined);

  /**
   * Tab badge count or text
   */
  readonly badge = input<string | number | undefined>(undefined);

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Internal active state (set by parent)
   */
  protected readonly isActive = signal(false);

  /**
   * Internal index (set by parent)
   */
  protected readonly index = signal(0);

  /**
   * Set active state (called by parent)
   */
  public setActive(active: boolean): void {
    this.isActive.set(active);
  }

  /**
   * Set index (called by parent)
   */
  public setIndex(index: number): void {
    this.index.set(index);
  }

  /**
   * Get active state
   */
  public active(): boolean {
    return this.isActive();
  }
}

