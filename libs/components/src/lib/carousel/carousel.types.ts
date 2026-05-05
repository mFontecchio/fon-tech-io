/**
 * Carousel transition variants.
 */
export type CarouselVariant = 'slide' | 'fade';

/**
 * Carousel control sizes.
 */
export type CarouselSize = 'sm' | 'md' | 'lg';

/**
 * Payload emitted when the active slide changes.
 */
export interface CarouselSlideChangedEvent {
  from: number;
  to: number;
}