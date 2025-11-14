/**
 * Accordion Component
 * 
 * A vertically stacked set of interactive headings with collapsible content panels.
 * Supports single or multiple expanded items.
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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';

export type AccordionMode = 'single' | 'multiple';

@Component({
  selector: 'ui-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ui-accordion]': 'true',
  },
})
export class AccordionComponent {
  /**
   * Accordion mode (single or multiple panels can be expanded)
   */
  readonly mode = input<AccordionMode>('single');

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
  protected readonly internalExpanded = signal<number[]>([]);

  constructor() {
    // Sync internal expanded state
    effect(() => {
      this.internalExpanded.set(this.expanded());
    });

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
      // Single mode: only one item can be expanded
      const newExpanded = currentExpanded.includes(index) ? [] : [index];
      this.internalExpanded.set(newExpanded);
      this.expandedChange.emit(newExpanded);
    } else {
      // Multiple mode: toggle individual item
      const newExpanded = currentExpanded.includes(index)
        ? currentExpanded.filter(i => i !== index)
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

