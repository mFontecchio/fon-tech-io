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
  output,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'ui-stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
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
  protected readonly internalActiveStep = signal(0);

  /**
   * Computed CSS classes
   */
  protected readonly stepperClasses = computed(() => ({
    'ui-stepper': true,
    [`ui-stepper--${this.orientation()}`]: true,
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

  constructor() {
    // Sync internal active step
    effect(() => {
      this.internalActiveStep.set(this.activeStep());
    });
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

