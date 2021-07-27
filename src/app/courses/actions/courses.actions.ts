import { Action } from '@ngrx/store';
import { Course, CourseResponse } from '../models/course';

export const LOAD_COURSES_ACTION = '[Courses] Load Courses';
export const LOAD_MORE_COURSES_ACTION = '[Courses] Load More Courses';
export const SET_COURSES_ACTION = '[Courses] Set Courses';
export const APPEND_COURSES_ACTION = '[Courses] Append Courses';
export const CREATE_COURSE_ACTION = '[Courses] Create Course';
export const EDIT_COURSE_ACTION = '[Courses] Edit Course';
export const REMOVE_COURSE_ACTION = '[Courses] Remove Course';

export class LoadCoursesAction implements Action {
  public readonly type = LOAD_COURSES_ACTION;

  constructor(public payload: { searchCriteria?: string }) {}
}

export class LoadMoreCoursesAction implements Action {
  public readonly type = LOAD_MORE_COURSES_ACTION;
}

export class SetCoursesAction implements Action {
  public readonly type = SET_COURSES_ACTION;

  constructor(public payload: CourseResponse | null) {}
}

export class AppendCoursesAction implements Action {
  public readonly type = APPEND_COURSES_ACTION;

  constructor(public payload: CourseResponse | null) {}
}

export class CreateCourseAction implements Action {
  public readonly type = CREATE_COURSE_ACTION;

  constructor(public payload: Course) {}
}

export class EditCourseAction implements Action {
  public readonly type = EDIT_COURSE_ACTION;

  constructor(public payload: Course) {}
}

export class RemoveCourseAction implements Action {
  public readonly type = REMOVE_COURSE_ACTION;

  constructor(public payload: Course) {}
}

export type CoursesAction =
  | LoadCoursesAction
  | LoadMoreCoursesAction
  | SetCoursesAction
  | AppendCoursesAction
  | CreateCourseAction
  | EditCourseAction
  | RemoveCourseAction;
