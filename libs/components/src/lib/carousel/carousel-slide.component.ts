/**
 * Carousel Slide Component
 *
 * Wraps a single projected slide inside the Carousel component.
 */

import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CarouselVariant } from './carousel.types';

@Component({
  selector: 'ui-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"group"',
    '[attr.aria-roledescription]': '"slide"',
    '[attr.aria-label]': 'computedAriaLabel()',
    '[attr.aria-hidden]': '!isActive() ? true : null',
    '[attr.inert]': '!isActive() ? "" : null',
  },
})
export class CarouselSlideComponent {
  /**
   * Human-readable slide label.
   */
  readonly label = input<string>('');

  /**
   * Optional thumbnail source for thumbnail navigation.
   */
  readonly thumbnail = input<string>('');

  /**
   * Alternate text for the thumbnail image.
   */
  readonly thumbnailAlt = input<string>('');

  private readonly activeState = signal(false);
  private readonly indexState = signal(0);
  private readonly totalSlidesState = signal(0);
  private readonly variantState = signal<CarouselVariant>('slide');
  private readonly activeLabelState = signal('');

  protected readonly isActive = this.activeState.asReadonly();

  protected readonly computedAriaLabel = computed(() => {
    return this.activeLabelState() || this.label() || `Slide ${this.indexState() + 1}`;
  });

  protected readonly hostClasses = computed(() => {
    return [
      'ui-carousel-slide',
      `ui-carousel-slide--${this.variantState()}`,
      this.isActive() ? 'ui-carousel-slide--active' : 'ui-carousel-slide--inactive',
    ].join(' ');
  });

  /**
   * Updates the active state from the parent carousel.
   *
   * @param active - Whether the slide is currently visible.
   */
  public setActive(active: boolean): void {
    this.activeState.set(active);
  }

  /**
   * Stores the slide index from the parent carousel.
   *
   * @param index - Zero-based slide index.
   */
  public setIndex(index: number): void {
    this.indexState.set(index);
  }

  /**
   * Stores the total slide count for accessibility labels.
   *
   * @param total - Total number of slides.
   */
  public setTotalSlides(total: number): void {
    this.totalSlidesState.set(total);
  }

  /**
   * Stores the active carousel variant for layout styling.
   *
   * @param variant - Carousel transition variant.
   */
  public setVariant(variant: CarouselVariant): void {
    this.variantState.set(variant);
  }

  /**
   * Stores the synthesized ARIA label from the parent carousel.
   *
   * @param label - Accessible slide label.
   */
  public setAccessibleLabel(label: string): void {
    this.activeLabelState.set(label);
  }

  /**
   * Returns whether the slide is currently visible.
   */
  public active(): boolean {
    return this.isActive();
  }

  /**
   * Returns the zero-based slide index.
   */
  public index(): number {
    return this.indexState();
  }

  /**
   * Returns the total number of slides in the carousel.
   */
  public totalSlides(): number {
    return this.totalSlidesState();
  }
}