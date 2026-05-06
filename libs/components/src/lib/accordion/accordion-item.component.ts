/**
 * Accordion Item Component
 *
 * Individual collapsible item within an Accordion.
 * This component is for configuration only; content is projected in the parent.
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'fui-accordion-item',
  template: '<ng-template #contentTemplate><ng-content /></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AccordionItemComponent {
  /**
   * Item title
   */
  readonly title = input.required<string>();

  /**
   * Disabled state
   */
  readonly disabled = input<boolean>(false);

  /**
   * Item-specific projected content captured for the parent accordion to render.
   */
  readonly contentTemplate = viewChild.required<TemplateRef<unknown>>('contentTemplate');

  /**
   * Internal expanded state (set by parent)
   */
  protected readonly isExpanded = signal(false);

  /**
   * Internal index (set by parent)
   */
  protected readonly index = signal(0);

  /**
   * Set expanded state (called by parent)
   */
  public setExpanded(expanded: boolean): void {
    this.isExpanded.set(expanded);
  }

  /**
   * Set index (called by parent)
   */
  public setIndex(index: number): void {
    this.index.set(index);
  }

  /**
   * Get expanded state
   */
  public expanded(): boolean {
    return this.isExpanded();
  }
}
