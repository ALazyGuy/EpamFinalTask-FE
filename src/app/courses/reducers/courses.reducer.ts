import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Course } from '../models/course';
import {
  CoursesAction,
  SET_COURSES_ACTION,
  APPEND_COURSES_ACTION,
  LOAD_MORE_COURSES_ACTION,
  LOAD_COURSES_ACTION
} from './../actions/courses.actions';

export interface CoursesState {
  courses: Course[];
  hasMoreCourses: boolean;
  searchCriteria: string;
  currentPage: number;
  isLoading: boolean;
}

export const initialState: CoursesState = {
  courses: [],
  hasMoreCourses: false,
  searchCriteria: '',
  currentPage: 0,
  isLoading: false
};

export function reducer(state = initialState, action: CoursesAction) {
  switch (action.type) {
    case LOAD_COURSES_ACTION: {
      return {
        ...state,
        searchCriteria: action.payload.searchCriteria,
        currentPage: 0,
        isLoading: true
      };
    }

    case LOAD_MORE_COURSES_ACTION: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        isLoading: true
      };
    }

    case SET_COURSES_ACTION: {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        courses: action.payload.courses,
        hasMoreCourses: action.payload.hasMoreCourses,
        isLoading: false
      };
    }

    case APPEND_COURSES_ACTION: {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        courses: state.courses.concat(action.payload.courses),
        hasMoreCourses: action.payload.hasMoreCourses,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}

export const coursesStateSelector = createFeatureSelector<CoursesState>('courses');
export const getCourses = createSelector(coursesStateSelector, (state: CoursesState) => state.courses);
export const getSearchCriteria = createSelector(coursesStateSelector, (state: CoursesState) => state.searchCriteria);
export const getHasMoreCourses = createSelector(coursesStateSelector, (state: CoursesState) => state.hasMoreCourses);
export const getIsLoading = createSelector(coursesStateSelector, (state: CoursesState) => state.isLoading);
