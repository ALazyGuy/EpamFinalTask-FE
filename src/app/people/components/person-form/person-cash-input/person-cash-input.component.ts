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
  selector: 'app-person-cash-input',
  templateUrl: './person-cash-input.component.html',
  styleUrls: ['./person-cash-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonCashInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PersonCashInputComponent),
      multi: true
    }
  ],
})
export class PersonCashInputComponent extends SubForm {
  form = new FormGroup({
    cash: new FormControl('')
  });

  @Input() errorMatcher: any;

  writeValue(value: any): void {
    super.writeValue({ cash: value });
  }

  registerOnChange(fn: (value: any) => void): void {
    super.registerOnChange((value) => fn(value.cash));
  }

  validate(): ValidationErrors | null {
    return !this.form.value.cash || Number.isInteger(+this.form.value.cash)
      ? null
      : { notInteger: true };
  }

}
