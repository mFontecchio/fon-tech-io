/**
 * Skeleton Component
 * 
 * A loading placeholder component that displays a shimmer effect
 * while content is being loaded.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

@Component({
  selector: 'ui-skeleton',
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
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
    'ui-skeleton': true,
    [`ui-skeleton--${this.variant()}`]: true,
    'ui-skeleton--no-animation': this.noAnimation(),
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.skeletonClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  /**
   * Computed inline styles
   */
  protected readonly inlineStyles = computed(() => {
    const styles: Record<string, string> = {};
    
    const width = this.width();
    const height = this.height();
    
    if (width) {
      styles['width'] = width;
    }
    if (height) {
      styles['height'] = height;
    }
    
    return styles;
  });

  /**
   * Array for rendering multiple lines
   */
  protected readonly lineArray = computed(() => {
    return Array.from({ length: this.lines() }, (_, i) => i);
  });
}

