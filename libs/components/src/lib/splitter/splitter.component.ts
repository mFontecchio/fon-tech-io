/**
 * Splitter Component
 *
 * Divides a container into two resizable panels separated by a draggable handle.
 * Supports horizontal and vertical orientations with pointer drag and keyboard navigation.
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

export type SplitterOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'fui-splitter',
  imports: [],
  templateUrl: './splitter.component.html',
  styleUrl: './splitter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.fui-splitter]': 'true',
    '[class.fui-splitter--horizontal]': 'orientation() === "horizontal"',
    '[class.fui-splitter--vertical]': 'orientation() === "vertical"',
    '[class.fui-splitter--disabled]': 'disabled()',
    '[class.fui-splitter--dragging]': 'isDragging()',
  },
})
export class SplitterComponent implements OnDestroy {
  /**
   * Layout axis: 'horizontal' places panels side by side; 'vertical' stacks them.
   */
  readonly orientation = input<SplitterOrientation>('horizontal');

  /**
   * Initial panel sizes as a percentage tuple [firstPanel, secondPanel].
   * Values should sum to 100. Only the first value is used to set the initial split;
   * the second panel fills the remaining space.
   */
  readonly sizes = input<[number, number]>([50, 50]);

  /**
   * Minimum size (in percent) for each panel. Prevents either panel from
   * collapsing below this threshold during drag or keyboard resize.
   */
  readonly minSize = input<number>(10);

  /**
   * When true, dragging and keyboard resizing are disabled.
   */
  readonly disabled = input<boolean>(false);

  /**
   * Emitted whenever the panel sizes change after a drag or keyboard interaction.
   * The tuple represents [firstPanelPercent, secondPanelPercent] and always sums to 100.
   */
  readonly sizesChange = output<[number, number]>();

  /** Internally tracked first-panel size (0–100). Updated on drag/keyboard. */
  protected readonly internalFirstSize = signal<number>(50);

  /** Whether the user is currently dragging the handle. */
  protected readonly isDragging = signal(false);

  /** CSS flex-basis value string for the first panel. */
  protected readonly firstSizePct = computed(() => `${this.internalFirstSize()}%`);

  /** Integer value of first panel for ARIA valuenow. */
  protected readonly roundedFirst = computed(() => Math.round(this.internalFirstSize()));

  /** Effective ARIA aria-valuemax: 100 minus the minimum reserved for the second panel. */
  protected readonly ariaMax = computed(() => 100 - this.minSize());

  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly boundPointerMove = this.onPointerMove.bind(this);
  private readonly boundPointerUp = this.onPointerUp.bind(this);
  private readonly boundPointerCancel = this.onPointerCancel.bind(this);

  constructor() {
    // Sync the `sizes` input to internal state whenever it changes.
    effect(() => {
      const [first] = this.sizes();
      this.internalFirstSize.set(this.clamp(first));
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
    this.isDragging.set(true);

    document.addEventListener('pointermove', this.boundPointerMove);
    document.addEventListener('pointerup', this.boundPointerUp);
    document.addEventListener('pointercancel', this.boundPointerCancel);
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
      this.setSizes(this.internalFirstSize() + step);
    } else if (
      (isHorizontal && event.key === 'ArrowLeft') ||
      (!isHorizontal && event.key === 'ArrowUp')
    ) {
      event.preventDefault();
      this.setSizes(this.internalFirstSize() - step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setSizes(this.minSize());
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setSizes(100 - this.minSize());
    }
  }

  private onPointerMove(event: PointerEvent): void {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    let pct: number;

    if (this.orientation() === 'horizontal') {
      pct = rect.width > 0 ? ((event.clientX - rect.left) / rect.width) * 100 : 50;
    } else {
      pct = rect.height > 0 ? ((event.clientY - rect.top) / rect.height) * 100 : 50;
    }

    this.setSizes(pct);
  }

  private onPointerUp(): void {
    this.isDragging.set(false);
    this.removeDocumentListeners();
  }

  private onPointerCancel(): void {
    this.isDragging.set(false);
    this.removeDocumentListeners();
  }

  private setSizes(firstPct: number): void {
    const clamped = this.clamp(firstPct);
    this.internalFirstSize.set(clamped);
    this.sizesChange.emit([clamped, 100 - clamped]);
  }

  private clamp(value: number): number {
    const min = this.minSize();
    const max = 100 - min;
    return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : 50;
  }

  private removeDocumentListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.removeEventListener('pointermove', this.boundPointerMove);
    document.removeEventListener('pointerup', this.boundPointerUp);
    document.removeEventListener('pointercancel', this.boundPointerCancel);
  }
}
