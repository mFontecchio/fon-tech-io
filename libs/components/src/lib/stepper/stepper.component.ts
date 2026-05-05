/**
 * Stepper Component
 *
 * A step-by-step progress indicator component.
 * Supports linear and non-linear navigation through steps.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
  ElementRef,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';

export interface Step {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export type StepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'fui-stepper',
  imports: [NgClass],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '(keydown)': 'handleKeyDown($event)',
  },
})
export class StepperComponent {
  /**
   * Steps
   */
  readonly steps = input.required<Step[]>();

  /**
   * Current active step index
   */
  readonly activeStep = input<number>(0);

  /**
   * Stepper orientation
   */
  readonly orientation = input<StepperOrientation>('horizontal');

  /**
   * Linear mode (users must complete steps in order)
   */
  readonly linear = input<boolean>(false);

  /**
   * Active step change event
   */
  readonly activeStepChange = output<number>();

  /**
   * Step click event
   */
  readonly stepClick = output<{ step: Step; index: number }>();

  /**
   * Internal active step
   */
  protected readonly internalActiveStep = linkedSignal(() => this.activeStep());

  /**
   * Computed CSS classes
   */
  protected readonly stepperClasses = computed(() => ({
    'fui-stepper': true,
    [`fui-stepper--${this.orientation()}`]: true,
  }));

  /**
   * Computed host classes
   */
  protected readonly hostClasses = computed(() => {
    return Object.entries(this.stepperClasses())
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  });

  private readonly elementRef = inject(ElementRef);

  /**
   * Arrow key navigation (WAI-ARIA step/tablist pattern)
   * Horizontal orientation: ArrowLeft / ArrowRight
   * Vertical orientation:   ArrowUp  / ArrowDown
   * Home / End move to the first / last focusable step.
   */
  protected handleKeyDown(event: KeyboardEvent): void {
    const isHorizontal = this.orientation() === 'horizontal';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    if (![prevKey, nextKey, 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();

    const steps = this.steps();
    const current = this.internalActiveStep();

    const firstClickable = (): number => {
      for (let i = 0; i < steps.length; i++) {
        if (this.isStepClickable(steps[i], i)) return i;
      }
      return current;
    };

    const lastClickable = (): number => {
      for (let i = steps.length - 1; i >= 0; i--) {
        if (this.isStepClickable(steps[i], i)) return i;
      }
      return current;
    };

    const nextClickable = (from: number, dir: 1 | -1): number => {
      let i = from + dir;
      while (i >= 0 && i < steps.length) {
        if (this.isStepClickable(steps[i], i)) return i;
        i += dir;
      }
      return from;
    };

    let target = current;
    if (event.key === prevKey) target = nextClickable(current, -1);
    else if (event.key === nextKey) target = nextClickable(current, 1);
    else if (event.key === 'Home') target = firstClickable();
    else if (event.key === 'End') target = lastClickable();

    if (target !== current) {
      this.handleStepClick(steps[target], target);
      this.focusStep(target);
    }
  }

  /**
   * Programmatically focus the step button at the given index
   */
  private focusStep(index: number): void {
    const buttons = Array.from(
      this.elementRef.nativeElement.querySelectorAll('.fui-stepper-step-button')
    ) as HTMLElement[];
    buttons[index]?.focus();
  }

  /**
   * Handle step click
   */
  protected handleStepClick(step: Step, index: number): void {
    if (step.disabled) return;

    // In linear mode, only allow navigation to completed steps or next step
    if (this.linear()) {
      const isNextStep = index === this.internalActiveStep() + 1;
      const isPreviousOrCurrent = index <= this.internalActiveStep();
      const isCompleted = step.completed;

      if (!isNextStep && !isPreviousOrCurrent && !isCompleted) {
        return;
      }
    }

    this.internalActiveStep.set(index);
    this.activeStepChange.emit(index);
    this.stepClick.emit({ step, index });
  }

  /**
   * Check if step is active
   */
  protected isStepActive(index: number): boolean {
    return this.internalActiveStep() === index;
  }

  /**
   * Check if step is completed
   */
  protected isStepCompleted(step: Step, index: number): boolean {
    return step.completed || index < this.internalActiveStep();
  }

  /**
   * Check if step is clickable
   */
  protected isStepClickable(step: Step, index: number): boolean {
    if (step.disabled) return false;
    if (!this.linear()) return true;

    // In linear mode, allow clicking on current, previous, or next step
    return index <= this.internalActiveStep() + 1;
  }

  /**
   * Get step status
   */
  protected getStepStatus(step: Step, index: number): string {
    if (step.error) return 'error';
    if (this.isStepCompleted(step, index)) return 'completed';
    if (this.isStepActive(index)) return 'active';
    return 'pending';
  }
}
