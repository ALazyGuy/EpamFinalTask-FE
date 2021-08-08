import {
  ControlValueAccessor,
  Validator,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  FormControl
} from '@angular/forms';

export abstract class SubForm implements ControlValueAccessor, Validator {

  form: FormGroup;

  onTouched: () => void;
  onChanged: (value: any) => any;

  writeValue(value: any): void {
    this.form.patchValue(value, {
      onlySelf: true,
      emitEvent: false
    });
  }

  registerOnChange(fn: (value: any) => void): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable()
      : this.form.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { subformerror: true };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.form.statusChanges.subscribe(fn);
  }
}
