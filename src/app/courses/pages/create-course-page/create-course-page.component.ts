import { Component, OnInit } from '@angular/core';
import { Course, CourseAuthor } from '../../models/course';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../reducers/courses.reducer';
import { CreateCourseAction } from '../../actions/courses.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {
  authors: CourseAuthor[];

  constructor(
              private store: Store<CoursesState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.authors = this.route.snapshot.data['authors'];
  }

  onSubmit(course: Course) {
    this.store.dispatch(new CreateCourseAction(course));
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
