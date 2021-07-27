import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseAuthor } from '../../models/course';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../reducers/courses.reducer';
import { EditCourseAction } from '../../actions/courses.actions';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  course: Course;
  authors: CourseAuthor[];

  constructor(private store: Store<CoursesState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.authors = this.route.snapshot.data['authors'];
  }

  onSubmit(course: Course) {
    this.store.dispatch(new EditCourseAction(course));
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

}
