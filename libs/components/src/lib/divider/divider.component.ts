/**
 * Divider Component
 * 
 * A thin line that groups content in lists or layouts.
 * Supports horizontal and vertical orientations with optional text.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerAlign = 'left' | 'center' | 'right';

@Component({
  selector: 'fui-divider',
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"separator"',
    '[attr.aria-orientation]': 'orientation()',
  },
})
export class DividerComponent {
  /**
   * Divider orientation
   */
  readonly orientation = input<DividerOrientation>('horizontal');

  /**
   * Text label
   */
  readonly label = input<string | undefined>(undefined);

  /**
   * Text alignment (for horizontal with label)
   */
  readonly align = input<DividerAlign>('center');

  /**
   * Dashed style
   */
  readonly dashed = input<boolean>(false);

  /**
   * Computed CSS classes
   */
  protected readonly dividerClasses = computed(() => ({
    'fui-divider': true,
    [`fui-divider--${this.orientation()}`]: true,
    [`fui-divider--${this.align()}`]: !!this.label(),
    'fui-divider--dashed': this.dashed(),
    'fui-divider--with-label': !!this.label(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.dividerClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });
}

