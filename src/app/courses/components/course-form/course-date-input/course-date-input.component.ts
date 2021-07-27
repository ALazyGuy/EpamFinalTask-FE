import { Component, forwardRef, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { SubForm } from '../sub-form/sub-form';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-course-date-input',
  templateUrl: './course-date-input.component.html',
  styleUrls: ['./course-date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateInputComponent),
      multi: true,
    }
  ],
})
export class CourseDateInputComponent extends SubForm {
  form = new FormGroup({
    date: new FormControl('')
  });

  @Input() errorMatcher: any;

  writeValue(value: any): void {
    super.writeValue({ date: value });
  }

  registerOnChange(fn: (value: any) => void): void {
    super.registerOnChange((value) => fn(value.date));
  }

  // Date validation is already included into mat-date-picker.
  // No need to put custom validator here as it will cause some issues
}
