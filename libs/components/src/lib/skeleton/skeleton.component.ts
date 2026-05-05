/**
 * Skeleton Component
 *
 * A loading placeholder component that displays a shimmer effect
 * while content is being loaded.
 */

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

@Component({
  selector: 'fui-skeleton',
  imports: [NgClass],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  /**
   * Skeleton variant/shape
   */
  readonly variant = input<SkeletonVariant>('text');

  /**
   * Width (CSS value: px, %, rem, etc.)
   */
  readonly width = input<string | undefined>(undefined);

  /**
   * Height (CSS value: px, %, rem, etc.)
   */
  readonly height = input<string | undefined>(undefined);

  /**
   * Number of lines (for text variant)
   */
  readonly lines = input<number>(1);

  /**
   * Disable animation
   */
  readonly noAnimation = input<boolean>(false);

  /**
   * Computed CSS classes
   */
  protected readonly skeletonClasses = computed(() => ({
    'fui-skeleton': true,
    [`fui-skeleton--${this.variant()}`]: true,
    'fui-skeleton--no-animation': this.noAnimation(),
  }));

  /**
   * Array for rendering multiple lines
   */
  protected readonly lineArray = computed(() => {
    return Array.from({ length: this.lines() }, (_, i) => i);
  });
}
