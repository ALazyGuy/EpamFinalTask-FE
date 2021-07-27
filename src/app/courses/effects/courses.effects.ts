import { LoadCoursesAction, RemoveCourseAction, CoursesAction } from './../actions/courses.actions';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, pluck, tap, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import { CourseService } from '../services/course.service';
import {
  LOAD_COURSES_ACTION,
  LOAD_MORE_COURSES_ACTION,
  CREATE_COURSE_ACTION,
  EDIT_COURSE_ACTION,
  REMOVE_COURSE_ACTION,
  SetCoursesAction,
  AppendCoursesAction,
} from '../actions/courses.actions';
import { Course } from '../models/course';
import { CoursesState, coursesStateSelector, getSearchCriteria } from '../reducers/courses.reducer';

@Injectable()
export class CoursesEffects {
  @Effect()
  public loadCourses$: Observable<SetCoursesAction> = this.actions$.pipe(
    ofType(LOAD_COURSES_ACTION),
    pluck('payload'),
    switchMap(
      ({ searchCriteria }) => this.courseService.getList(0, searchCriteria)
        .pipe(
          map((courses) => new SetCoursesAction(courses)),
          catchError(() => of(new SetCoursesAction(null)))
        )
    )
  );

  @Effect()
  public loadMoreCourses$: Observable<AppendCoursesAction> = this.actions$.pipe(
    ofType(LOAD_MORE_COURSES_ACTION),
    withLatestFrom(
      this.store.pipe(
        select(coursesStateSelector),
        map((state: CoursesState) => ({ page: state.currentPage, searchCriteria: state.searchCriteria }))
      )
    ),
    switchMap(
      ([ action, { page, searchCriteria } ]) => this.courseService.getList(page, searchCriteria)
        .pipe(
          map((courses) => new AppendCoursesAction(courses)),
          catchError(() => of(new AppendCoursesAction(null)))
        )
    )
  );

  @Effect({ dispatch: false })
  public createCourse$: Observable<any> = this.actions$.pipe(
    ofType(CREATE_COURSE_ACTION),
    pluck('payload'),
    switchMap(
      (course: Course) => this.courseService.createCourse(course)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError(() => of()) // TODO: create some notification area for errors
        )
    )
  );

  @Effect({ dispatch: false })
  public editCourse$: Observable<any> = this.actions$.pipe(
    ofType(EDIT_COURSE_ACTION),
    pluck('payload'),
    switchMap(
      (course: Course) => this.courseService.updateItem(course)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError(() => of()) // TODO: create some notification area for errors
        )
    )
  );

  @Effect()
  public removeCourse$: Observable<LoadCoursesAction> = this.actions$.pipe(
    ofType(REMOVE_COURSE_ACTION),
    map((action: RemoveCourseAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getSearchCriteria))),
    switchMap(
      ([ course, searchCriteria ]) => this.courseService.removeItem(course)
        .pipe(
          catchError(() => of()), // TODO: create some notification area for errors
          map(() => new LoadCoursesAction({ searchCriteria }))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private store: Store<CoursesState>,
    private router: Router
  ) {}
}
