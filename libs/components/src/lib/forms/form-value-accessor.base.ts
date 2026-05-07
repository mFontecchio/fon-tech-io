import { signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class FormValueAccessorBase<T> implements ControlValueAccessor {
  protected readonly valueAccessorDisabled = signal(false);

  private onChange?: (value: T) => void;
  private onTouched?: () => void;

  writeValue(value: T | null | undefined): void {
    this.setValue(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.valueAccessorDisabled.set(isDisabled);
  }

  protected emitValueChange(value: T): void {
    this.onChange?.(value);
  }

  protected markAsTouched(): void {
    this.onTouched?.();
  }

  protected abstract setValue(value: T | null | undefined): void;
}
