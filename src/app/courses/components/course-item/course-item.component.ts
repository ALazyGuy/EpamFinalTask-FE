import { Course } from '../../../courses/models/course';
import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() course: Course;

  @Output() edit = new EventEmitter<Course>();
  @Output() remove = new EventEmitter<Course>();

  onRemove() {
    this.remove.emit(this.course);
  }

  onEdit() {
    this.edit.emit(this.course);
  }
}
