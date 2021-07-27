import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

import { Course, CourseAuthor } from '../../models/course';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;

  @Input() course: Course = {} as Course;
  @Input() suggestedAuthors: CourseAuthor[];

  @Output() save = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter();

  @ViewChildren('customFormControl') customControls: QueryList<any>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      id: [this.course.id],
      name: [this.course.name, [Validators.required, Validators.maxLength(50)]],
      description: [this.course.description, [Validators.required, Validators.maxLength(500)]],
      date: [this.course.date, Validators.required],
      length: [this.course.length, Validators.required],
      authors: [this.course.authors],
    });
  }

  createCustomErrorStateMatcher(controlName: string) {
    return {
      isErrorState: () => {
        return this.courseForm.controls[controlName].touched && this.courseForm.controls[controlName].invalid;
      },
      hasError: (error: string) => {
        return this.courseForm.controls[controlName].hasError(error);
      }
    };
  }

  onSubmit(): void {
    this.save.emit(this.courseForm.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

