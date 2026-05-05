/**
 * Carousel Component
 *
 * Displays projected slides with keyboard, pointer, autoplay, and thumbnail navigation.
 */

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CarouselSlideComponent } from './carousel-slide.component';
import { CarouselSize, CarouselSlideChangedEvent, CarouselVariant } from './carousel.types';

const SWIPE_THRESHOLD = 48;

@Component({
  selector: 'fui-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.--fui-carousel-visible-slides]': 'effectiveVisibleSlides()',
    '[style.--fui-carousel-track-translate]': 'trackTranslate()',
    '[attr.role]': '"region"',
    '[attr.aria-roledescription]': '"carousel"',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.tabindex]': 'slideCount() > 0 ? 0 : null',
    '(keydown)': 'handleKeyDown($event)',
    '(mouseenter)': 'pauseAutoplay()',
    '(mouseleave)': 'resumeAutoplay()',
    '(focusin)': 'pauseAutoplay()',
    '(focusout)': 'handleFocusOut($event)',
  },
})
export class CarouselComponent {
  /**
   * Carousel transition variant.
   */
  readonly variant = input<CarouselVariant>('slide');

  /**
   * Size used for control buttons.
   */
  readonly size = input<CarouselSize>('md');

  /**
   * Whether the carousel wraps around.
   */
  readonly loop = input<boolean>(true);

  /**
   * Enables automatic slide advancement.
   */
  readonly autoplay = input<boolean>(false);

  /**
   * Autoplay delay in milliseconds.
   */
  readonly autoplayDelay = input<number>(5000);

  /**
   * Shows previous and next buttons.
   */
  readonly showControls = input<boolean>(true);

  /**
   * Shows dot navigation buttons.
   */
  readonly showIndicators = input<boolean>(true);

  /**
   * Shows thumbnail navigation buttons.
   */
  readonly showThumbnails = input<boolean>(false);

  /**
   * Number of slides visible at once in slide mode.
   */
  readonly visibleSlides = input<number>(1);

  /**
   * Accessible label for the carousel region.
   */
  readonly ariaLabel = input<string>('Carousel');

  /**
   * Controlled active slide index.
   */
  readonly activeIndex = input<number>(0);

  /**
   * Emits the current active index.
   */
  readonly activeIndexChange = output<number>();

  /**
   * Emits when the active slide changes.
   */
  readonly slideChanged = output<CarouselSlideChangedEvent>();

  protected readonly slides = contentChildren(CarouselSlideComponent);

  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly userPausedAutoplay = signal(false);
  private readonly dragStartX = signal<number | null>(null);
  private readonly dragOffset = signal(0);

  protected readonly currentIndex = signal(0);
  protected readonly isPlaying = signal(false);
  protected readonly isDragging = signal(false);

  protected readonly slideCount = computed(() => this.slides().length);

  protected readonly effectiveVisibleSlides = computed(() => {
    if (this.variant() === 'fade') {
      return 1;
    }

    const slideCount = this.slideCount();
    const requestedSlides = Math.max(1, Math.floor(this.visibleSlides() || 1));

    return slideCount === 0 ? 1 : Math.min(requestedSlides, slideCount);
  });

  protected readonly maxStartIndex = computed(() => {
    return Math.max(0, this.slideCount() - this.effectiveVisibleSlides());
  });

  protected readonly canGoPrevious = computed(() => {
    return this.loop() || this.currentIndex() > 0;
  });

  protected readonly canGoNext = computed(() => {
    return this.loop() || this.currentIndex() < this.maxStartIndex();
  });

  protected readonly liveRegionMode = computed(() => {
    return this.autoplay() && this.isPlaying() ? 'off' : 'polite';
  });

  protected readonly statusMessage = computed(() => {
    const count = this.slideCount();
    if (count === 0) {
      return 'No slides available';
    }

    const current = this.currentIndex() + 1;
    const visible = this.effectiveVisibleSlides();

    if (visible > 1 && this.variant() === 'slide') {
      const end = Math.min(this.currentIndex() + visible, count);
      return `Showing slides ${current} through ${end} of ${count}`;
    }

    return `Showing slide ${current} of ${count}`;
  });

  protected readonly trackTranslate = computed(() => {
    if (this.variant() === 'fade') {
      return '0%';
    }

    const visibleSlides = this.effectiveVisibleSlides();
    const dragPercent = this.dragOffset();
    const basePercent = this.currentIndex() * (100 / visibleSlides);

    return `calc(-${basePercent}% + ${dragPercent}px)`;
  });

  protected readonly hostClasses = computed(() => {
    return [
      'fui-carousel',
      `fui-carousel--${this.variant()}`,
      `fui-carousel--${this.size()}`,
      this.showThumbnails() ? 'fui-carousel--with-thumbnails' : '',
      this.isDragging() ? 'fui-carousel--dragging' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  constructor() {
    effect(() => {
      const slideCount = this.slideCount();
      const requestedIndex = this.activeIndex();

      if (slideCount === 0) {
        this.currentIndex.set(0);
        return;
      }

      this.currentIndex.set(this.normalizeIndex(requestedIndex));
    });

    effect(() => {
      const autoplayEnabled = this.autoplay();
      const slideCount = this.slideCount();

      if (!autoplayEnabled || slideCount < 2) {
        this.isPlaying.set(false);
        this.userPausedAutoplay.set(false);
        return;
      }

      if (!this.userPausedAutoplay()) {
        this.isPlaying.set(true);
      }
    });

    effect(() => {
      const slides = this.slides();
      const count = slides.length;
      const currentIndex = this.currentIndex();
      const variant = this.variant();
      const visibleSlides = this.effectiveVisibleSlides();

      slides.forEach((slide, index) => {
        slide.setIndex(index);
        slide.setTotalSlides(count);
        slide.setVariant(variant);
        slide.setAccessibleLabel(this.createSlideLabel(index, count, slide.label()));
        slide.setActive(this.isSlideVisible(index, currentIndex, visibleSlides, count, variant));
      });
    });

    effect((onCleanup) => {
      if (!this.isBrowser || !this.autoplay() || !this.isPlaying() || this.slideCount() < 2) {
        return;
      }

      const intervalId = window.setInterval(() => {
        this.goToNext();
      }, Math.max(2000, this.autoplayDelay()));

      onCleanup(() => {
        window.clearInterval(intervalId);
      });
    });

    this.destroyRef.onDestroy(() => {
      this.removePointerListeners();
    });
  }

  /**
   * Moves to the previous slide.
   */
  protected goToPrevious(): void {
    if (!this.canGoPrevious()) {
      return;
    }

    const nextIndex = this.currentIndex() === 0 ? this.maxStartIndex() : this.currentIndex() - 1;
    this.setCurrentIndex(nextIndex, true);
  }

  /**
   * Moves to the next slide.
   */
  protected goToNext(): void {
    if (!this.canGoNext()) {
      return;
    }

    const nextIndex = this.currentIndex() >= this.maxStartIndex() ? 0 : this.currentIndex() + 1;
    this.setCurrentIndex(nextIndex, true);
  }

  /**
   * Moves to a specific slide index.
   *
   * @param index - Zero-based slide index.
   */
  protected goTo(index: number): void {
    this.setCurrentIndex(index, true);
  }

  /**
   * Pauses autoplay without marking it as a user preference.
   */
  protected pauseAutoplay(): void {
    if (!this.autoplay()) {
      return;
    }

    this.isPlaying.set(false);
  }

  /**
   * Resumes autoplay when it is enabled and not explicitly paused by the user.
   */
  protected resumeAutoplay(): void {
    if (!this.autoplay() || this.userPausedAutoplay() || this.slideCount() < 2) {
      return;
    }

    this.isPlaying.set(true);
  }

  /**
   * Toggles the autoplay state for user control.
   */
  protected toggleAutoplay(): void {
    if (!this.autoplay()) {
      return;
    }

    const shouldPause = this.isPlaying();
    this.userPausedAutoplay.set(shouldPause);
    this.isPlaying.set(!shouldPause);
  }

  /**
   * Handles keyboard navigation.
   *
   * @param event - Keyboard event from the carousel region.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.goToPrevious();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.goToNext();
        break;
      case 'Home':
        event.preventDefault();
        this.setCurrentIndex(0, true);
        break;
      case 'End':
        event.preventDefault();
        this.setCurrentIndex(this.maxStartIndex(), true);
        break;
    }
  }

  /**
   * Starts pointer-based swipe navigation.
   *
   * @param event - Pointer event from the track element.
   */
  protected handlePointerDown(event: PointerEvent): void {
    if (!this.isBrowser || this.variant() === 'fade' || this.slideCount() < 2) {
      return;
    }

    this.pauseAutoplay();
    this.dragStartX.set(event.clientX);
    this.dragOffset.set(0);
    this.isDragging.set(true);

    const target = event.currentTarget;
    if (target instanceof HTMLElement) {
      target.setPointerCapture(event.pointerId);
    }

    window.addEventListener('pointermove', this.boundPointerMove);
    window.addEventListener('pointerup', this.boundPointerUp);
    window.addEventListener('pointercancel', this.boundPointerUp);
  }

  /**
   * Resumes autoplay only when focus leaves the carousel region.
   *
   * @param event - Focusout event from the host element.
   */
  protected handleFocusOut(event: FocusEvent): void {
    if (!this.isBrowser) {
      return;
    }

    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && this.hostElement.nativeElement.contains(nextTarget)) {
      return;
    }

    this.resumeAutoplay();
  }

  private readonly boundPointerMove = (event: PointerEvent): void => {
    if (!this.isDragging() || this.dragStartX() === null) {
      return;
    }

    this.dragOffset.set(event.clientX - this.dragStartX()!);
  };

  private readonly boundPointerUp = (): void => {
    if (!this.isDragging()) {
      return;
    }

    const delta = this.dragOffset();

    if (delta <= -SWIPE_THRESHOLD) {
      this.goToNext();
    } else if (delta >= SWIPE_THRESHOLD) {
      this.goToPrevious();
    }

    this.dragStartX.set(null);
    this.dragOffset.set(0);
    this.isDragging.set(false);
    this.removePointerListeners();
    this.resumeAutoplay();
  };

  private removePointerListeners(): void {
    if (!this.isBrowser) {
      return;
    }

    window.removeEventListener('pointermove', this.boundPointerMove);
    window.removeEventListener('pointerup', this.boundPointerUp);
    window.removeEventListener('pointercancel', this.boundPointerUp);
  }

  private setCurrentIndex(index: number, emitEvents: boolean): void {
    const slideCount = this.slideCount();
    if (slideCount === 0) {
      return;
    }

    const previousIndex = this.currentIndex();
    const normalizedIndex = this.normalizeIndex(index);

    if (normalizedIndex === previousIndex) {
      return;
    }

    this.currentIndex.set(normalizedIndex);

    if (emitEvents) {
      this.activeIndexChange.emit(normalizedIndex);
      this.slideChanged.emit({ from: previousIndex, to: normalizedIndex });
    }
  }

  private normalizeIndex(index: number): number {
    const maxStartIndex = this.maxStartIndex();

    if (this.loop()) {
      if (index < 0) {
        return maxStartIndex;
      }

      if (index > maxStartIndex) {
        return 0;
      }
    }

    return Math.max(0, Math.min(index, maxStartIndex));
  }

  private createSlideLabel(index: number, totalSlides: number, label: string): string {
    const baseLabel = `Slide ${index + 1} of ${totalSlides}`;
    return label ? `${baseLabel}: ${label}` : baseLabel;
  }

  private isSlideVisible(
    index: number,
    currentIndex: number,
    visibleSlides: number,
    totalSlides: number,
    variant: CarouselVariant,
  ): boolean {
    if (variant === 'fade') {
      return index === currentIndex;
    }

    const endIndex = currentIndex + visibleSlides;

    if (endIndex <= totalSlides) {
      return index >= currentIndex && index < endIndex;
    }

    return this.loop() && (index >= currentIndex || index < endIndex - totalSlides);
  }
}