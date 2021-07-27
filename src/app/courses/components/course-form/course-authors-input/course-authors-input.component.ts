import { Component, Input, forwardRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from '@angular/material/autocomplete';

import { SubForm } from '../sub-form/sub-form';
import { CourseAuthor } from 'src/app/courses/models/course';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-authors-input',
  templateUrl: './course-authors-input.component.html',
  styleUrls: ['./course-authors-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseAuthorsInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseAuthorsInputComponent),
      multi: true
    }
  ],
})
export class CourseAuthorsInputComponent extends SubForm implements OnInit {
  @Input() suggestedAuthors: CourseAuthor[];
  @Input() errorMatcher: any;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('authorInput') authorInput: ElementRef<HTMLInputElement>;

  filteredAuthors: Observable<CourseAuthor[]>;

  form = new FormGroup({
    authors: new FormArray([]),
    selectedAuthor: new FormControl(''),
  });

  authorTmpInput = new FormControl();

  ngOnInit(): void {
    this.filteredAuthors = this.authorTmpInput.valueChanges.pipe(
      startWith(null),
      map((author: string | null) => this.filter(author)));
  }

  writeValue(values: CourseAuthor[]): void {
    if (values) {
      values.forEach((value) => this.createArrayControl(value));
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    super.registerOnChange((value) => fn(value.authors));
  }

  validate(): ValidationErrors | null {
    return this.form.value.authors.length >= 1
      ? null
      : { minAuthorsLength: true };
  }

  selectAuthor(event: MatAutocompleteSelectedEvent) {
    const fullName = event.option.value.split(' ');
    this.createArrayControl({ firstName: fullName[0], lastName: fullName[1] });
    this.authorTmpInput.setValue('');
    this.authorInput.nativeElement.value = '';
  }

  removeAuthor(index: number): void {
    const authorsControl = this.form.controls['authors'] as FormArray;
    authorsControl.removeAt(index);
  }

  private createArrayControl({ firstName, lastName }: CourseAuthor) {
    const authorsControl = this.form.controls['authors'] as FormArray;
    authorsControl.push(new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName)
    }));
  }

  private filter(value: string | null): CourseAuthor[] {
    return value
      ? this.suggestedAuthors
          .filter(
            (author) => `${author.firstName.toLowerCase()} ${author.lastName?.toLowerCase()}`
              .includes(value.toLowerCase()) && !this.isAuthorSelected(author)
          )
      : this.suggestedAuthors
        .filter(
          (author) => !this.isAuthorSelected(author)
        );
  }

  private isAuthorSelected(author: CourseAuthor): boolean {
    return !!this.form.value.authors
      .find(
        ({ firstName, lastName }: CourseAuthor) => author.firstName === firstName && author.lastName === lastName
      );
  }
}
