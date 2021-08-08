import { Component, forwardRef, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { SubForm } from '../sub-form/sub-form';

@Component({
  selector: 'app-course-duration-input',
  templateUrl: './course-duration-input.component.html',
  styleUrls: ['./course-duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDurationInputComponent),
      multi: true
    }
  ],
})
export class CourseDurationInputComponent extends SubForm {
  form = new FormGroup({
    length: new FormControl('')
  });

  @Input() errorMatcher: any;

  writeValue(value: any): void {
    super.writeValue({ length: value });
  }

  registerOnChange(fn: (value: any) => void): void {
    super.registerOnChange((value) => fn(value.length));
  }

  validate(): ValidationErrors | null {
    return !this.form.value.length || Number.isInteger(+this.form.value.length)
      ? null
      : { notInteger: true };
  }

}
