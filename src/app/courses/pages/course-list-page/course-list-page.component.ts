import { Component, OnInit } from '@angular/core';
import { Course } from '../../../courses/models/course';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CoursesState, getCourses, getHasMoreCourses } from '../../reducers/courses.reducer';
import { LoadCoursesAction, LoadMoreCoursesAction, RemoveCourseAction } from '../../actions/courses.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.scss']
})
export class CourseListPageComponent implements OnInit {
  courses$ = this.store.pipe(select(getCourses));
  hasMoreCourses$ = this.store.pipe(select(getHasMoreCourses));
  searchInput = new FormControl();

  private debounceSubject = new Subject<string>();

  constructor(private store: Store<CoursesState>,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.loadCourses();

    this.debounceSubject
      .pipe(
        filter((value) => !value.length || value.length >= 3),
        debounceTime(1000)
      ).subscribe(() => {
        this.loadCourses();
      });

    this.searchInput.valueChanges.subscribe((value) => this.debounceSubject.next(value));
  }

  loadCourses() {
    this.store.dispatch(new LoadCoursesAction({ searchCriteria: this.searchInput.value }));
  }

  loadMoreCourses() {
    this.store.dispatch(new LoadMoreCoursesAction());
  }

  editCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  removeCourse(course: Course) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.store.dispatch(new RemoveCourseAction(course));
      }
    });
  }
}
