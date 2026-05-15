/**
 * Image Compare Component
 *
 * A before/after image comparison slider. Drag the divider (or use keyboard)
 * to reveal more of either image. Supports horizontal and vertical orientations.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ImageCompareOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'fui-image-compare',
  imports: [],
  templateUrl: './image-compare.component.html',
  styleUrl: './image-compare.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-image-compare]': 'true',
    '[class.fui-image-compare--vertical]': 'orientation() === "vertical"',
    '[class.fui-image-compare--disabled]': 'disabled()',
    '[attr.role]': '"slider"',
    '[attr.tabindex]': 'disabled() ? "-1" : "0"',
    '[attr.aria-valuenow]': 'roundedPosition()',
    '[attr.aria-valuemin]': '"0"',
    '[attr.aria-valuemax]': '"100"',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-label]': 'ariaLabel() || "Image comparison slider"',
    '[attr.aria-valuetext]': 'ariaValueText()',
    '(pointerdown)': 'handlePointerDown($event)',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class ImageCompareComponent implements OnDestroy {
  /**
   * URL of the "before" image (displayed on the left / top).
   */
  readonly beforeSrc = input.required<string>();

  /**
   * URL of the "after" image (displayed on the right / bottom).
   */
  readonly afterSrc = input.required<string>();

  /**
   * Accessible alt text for the before image.
   */
  readonly beforeAlt = input<string>('Before');

  /**
   * Accessible alt text for the after image.
   */
  readonly afterAlt = input<string>('After');

  /**
   * Initial divider position as a percentage (0–100). Defaults to 50.
   * When changed externally the divider animates to the new position.
   */
  readonly position = input<number>(50);

  /**
   * Axis along which the divider moves.
   * `horizontal` splits left/right; `vertical` splits top/bottom.
   */
  readonly orientation = input<ImageCompareOrientation>('horizontal');

  /**
   * When true, pointer and keyboard interactions are suppressed.
   */
  readonly disabled = input<boolean>(false);

  /**
   * Override the default ARIA label applied to the host slider element.
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * Emitted whenever the divider position changes (rounded to nearest integer).
   */
  readonly positionChange = output<number>();

  /** Internally tracked position (0–100, floating-point during drag). */
  protected readonly internalPosition = signal<number>(50);

  /** Integer position for ARIA attributes and emissions. */
  protected readonly roundedPosition = computed(() =>
    Math.round(this.internalPosition()),
  );

  /** Human-readable aria-valuetext for assistive technology. */
  protected readonly ariaValueText = computed(
    () => `${this.roundedPosition()}% of before image visible`,
  );

  /**
   * clip-path applied to the before image to reveal/hide it progressively.
   * Clips from the right (horizontal) or bottom (vertical).
   */
  protected readonly beforeClipPath = computed(() => {
    const pos = this.internalPosition();
    return this.orientation() === 'horizontal'
      ? `inset(0 ${100 - pos}% 0 0)`
      : `inset(0 0 ${100 - pos}% 0)`;
  });

  /** CSS custom-property value string used to position the divider element. */
  protected readonly positionPercent = computed(() => `${this.internalPosition()}%`);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly boundPointerMove = this.onPointerMove.bind(this);
  private readonly boundPointerUp = this.onPointerUp.bind(this);
  private readonly boundPointerCancel = this.onPointerCancel.bind(this);

  constructor() {
    // Sync the `position` input to internal state whenever it changes.
    effect(() => {
      this.internalPosition.set(this.clampPosition(this.position()));
    });
  }

  ngOnDestroy(): void {
    this.removeDocumentListeners();
  }

  protected handlePointerDown(event: PointerEvent): void {
    if (this.disabled()) return;
    if (!isPlatformBrowser(this.platformId)) return;
    if (!event.isPrimary || event.button !== 0) return;

    event.preventDefault();
    document.addEventListener('pointermove', this.boundPointerMove);
    document.addEventListener('pointerup', this.boundPointerUp);
    document.addEventListener('pointercancel', this.boundPointerCancel);

    this.updatePosition(event);
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    const step = event.shiftKey ? 10 : 1;
    const isHorizontal = this.orientation() === 'horizontal';

    if (
      (isHorizontal && event.key === 'ArrowRight') ||
      (!isHorizontal && event.key === 'ArrowDown')
    ) {
      event.preventDefault();
      this.setPosition(this.internalPosition() + step);
    } else if (
      (isHorizontal && event.key === 'ArrowLeft') ||
      (!isHorizontal && event.key === 'ArrowUp')
    ) {
      event.preventDefault();
      this.setPosition(this.internalPosition() - step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setPosition(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setPosition(100);
    }
  }

  private onPointerMove(event: PointerEvent): void {
    this.updatePosition(event);
  }

  private onPointerUp(): void {
    this.removeDocumentListeners();
  }

  private onPointerCancel(): void {
    this.removeDocumentListeners();
  }

  private updatePosition(event: PointerEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    let pos: number;

    if (this.orientation() === 'horizontal') {
      pos = rect.width > 0 ? ((event.clientX - rect.left) / rect.width) * 100 : 50;
    } else {
      pos = rect.height > 0 ? ((event.clientY - rect.top) / rect.height) * 100 : 50;
    }

    this.setPosition(pos);
  }

  private setPosition(pos: number): void {
    const clamped = this.clampPosition(pos);
    this.internalPosition.set(clamped);
    this.positionChange.emit(Math.round(clamped));
  }

  private clampPosition(value: number): number {
    return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 50;
  }

  private removeDocumentListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.removeEventListener('pointermove', this.boundPointerMove);
    document.removeEventListener('pointerup', this.boundPointerUp);
    document.removeEventListener('pointercancel', this.boundPointerCancel);
  }
}
