/**
 * Fieldset Component
 *
 * Groups related content or form fields under a titled border frame,
 * with an optional collapsible toggle.
 */

import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  output,
} from '@angular/core';

@Component({
  selector: 'fui-fieldset',
  imports: [],
  templateUrl: './fieldset.component.html',
  styleUrl: './fieldset.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-fieldset]': 'true',
    '[class.fui-fieldset--collapsible]': 'collapsible()',
    '[class.fui-fieldset--collapsed]': 'isCollapsed()',
    '[class.fui-fieldset--disabled]': 'disabled()',
  },
})
export class FieldsetComponent {
  /**
   * Legend text displayed in the fieldset border frame.
   */
  readonly legend = input.required<string>();

  /**
   * When true, a toggle button is rendered inside the legend so users can
   * collapse or expand the fieldset content.
   */
  readonly collapsible = input<boolean>(false);

  /**
   * Controlled collapsed state. When provided, the parent controls expansion.
   * Combine with (collapsedChange) to achieve two-way binding.
   */
  readonly collapsed = input<boolean>(false);

  /**
   * When true, the toggle button is disabled and the fieldset is visually dimmed.
   * Also propagates the native disabled attribute to form elements inside.
   */
  readonly disabled = input<boolean>(false);

  /**
   * Emitted when the user clicks the toggle button, carrying the new collapsed state.
   */
  readonly collapsedChange = output<boolean>();

  /** Internal collapsed state, synced from the `collapsed` input and updated on toggle. */
  protected readonly isCollapsed = linkedSignal(() => this.collapsed());

  /** Counter used to generate unique content region IDs across instances. */
  private static nextId = 0;

  /** Unique content-region ID used to wire aria-controls on the toggle button. */
  protected readonly contentId = `fui-fieldset-content-${FieldsetComponent.nextId++}`;

  /**
   * Toggle the collapsed state when the user clicks the legend button.
   */
  protected handleToggle(): void {
    if (this.disabled()) return;
    const next = !this.isCollapsed();
    this.isCollapsed.set(next);
    this.collapsedChange.emit(next);
  }
}
