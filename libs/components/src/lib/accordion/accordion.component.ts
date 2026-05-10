/**
 * Accordion Component
 *
 * A vertically stacked set of interactive headings with collapsible content panels.
 * Supports single or multiple expanded items, and optional card, highlight, and
 * divider styling for flexible composition (e.g. standard accordion or nav group list).
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
  contentChildren,
  effect,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';

export type AccordionMode = 'single' | 'multiple';

@Component({
  selector: 'fui-accordion',
  imports: [NgTemplateOutlet],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-accordion]': 'true',
    '[class.fui-accordion--bordered]': 'bordered()',
    '[class.fui-accordion--highlight-expanded]': 'highlightExpanded()',
    '[class.fui-accordion--dividers]': 'dividers()',
  },
})
export class AccordionComponent {
  /**
   * Accordion mode (single or multiple panels can be expanded)
   */
  readonly mode = input<AccordionMode>('single');

  /**
   * Whether to render a border and border-radius around the entire accordion container.
   * Set to false for flush or nav-list contexts.
   * @default true
   */
  readonly bordered = input<boolean>(true);

  /**
   * Whether to apply a background highlight and brand-coloured chevron to the
   * currently expanded item header.
   * Set to false for minimal or nav-list contexts.
   * @default true
   */
  readonly highlightExpanded = input<boolean>(true);

  /**
   * Whether to render separator lines between accordion items.
   * Set to false for a fully unstyled expandable list.
   * @default true
   */
  readonly dividers = input<boolean>(true);

  /**
   * Array of expanded item indices
   */
  readonly expanded = input<number[]>([]);

  /**
   * Expanded state change event
   */
  readonly expandedChange = output<number[]>();

  /**
   * Accordion item components
   */
  protected readonly items = contentChildren(AccordionItemComponent);

  /**
   * Internal expanded indices
   */
  protected readonly internalExpanded = linkedSignal<number[]>(() => this.expanded());

  constructor() {
    // Update items expanded state
    effect(() => {
      const expandedIndices = this.internalExpanded();
      const itemsList = this.items();

      itemsList.forEach((item, index) => {
        item.setExpanded(expandedIndices.includes(index));
        item.setIndex(index);
      });
    });
  }

  /**
   * Toggle item expansion
   */
  protected toggleItem(index: number): void {
    const currentExpanded = this.internalExpanded();

    if (this.mode() === 'single') {
      const newExpanded = currentExpanded.includes(index) ? [] : [index];
      this.internalExpanded.set(newExpanded);
      this.expandedChange.emit(newExpanded);
    } else {
      const newExpanded = currentExpanded.includes(index)
        ? currentExpanded.filter((i) => i !== index)
        : [...currentExpanded, index];
      this.internalExpanded.set(newExpanded);
      this.expandedChange.emit(newExpanded);
    }
  }

  /**
   * Check if item is expanded
   */
  protected isExpanded(index: number): boolean {
    return this.internalExpanded().includes(index);
  }
}
