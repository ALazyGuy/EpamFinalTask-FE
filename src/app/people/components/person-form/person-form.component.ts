import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, QueryList } from '@angular/core';

import { Person } from '../../models/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;

  @Input() person: Person = {} as Person;

  @Output() save = new EventEmitter<Person>();
  @Output() cancel = new EventEmitter();

  @ViewChildren('customFormControl') customControls: QueryList<any>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      id: [this.person.id],
      fullName: [this.person.fullName, [Validators.required, Validators.maxLength(50)]],
      photoName: [this.person.photoName, [Validators.required, Validators.maxLength(500)]],
      cash: [this.person.cash, Validators.required],
      status: [this.person.status],
    });
  }

  createCustomErrorStateMatcher(controlName: string) {
    return {
      isErrorState: () => {
        return this.personForm.controls[controlName].touched && this.personForm.controls[controlName].invalid;
      },
      hasError: (error: string) => {
        return this.personForm.controls[controlName].hasError(error);
      }
    };
  }

  onSubmit(): void {
    this.save.emit(this.personForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

