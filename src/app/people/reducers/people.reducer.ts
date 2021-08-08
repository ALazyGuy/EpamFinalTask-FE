import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Person } from '../models/person';
import {
  PeopleAction,
  SET_PEOPLE_ACTION,
  APPEND_PEOPLE_ACTION,
  LOAD_MORE_PEOPLE_ACTION,
  LOAD_PEOPLE_ACTION
} from '../actions/people.actions';

export interface PeopleState {
  people: Person[];
  hasMorePeople: boolean;
  searchCriteria: string;
  currentPage: number;
  isLoading: boolean;
}

export const initialState: PeopleState = {
  people: [],
  hasMorePeople: false,
  searchCriteria: '',
  currentPage: 0,
  isLoading: false
};

export function reducer(state = initialState, action: PeopleAction) {
  switch (action.type) {
    case LOAD_PEOPLE_ACTION: {
      return {
        ...state,
        searchCriteria: action.payload.searchCriteria,
        currentPage: 0,
        isLoading: true
      };
    }

    case LOAD_MORE_PEOPLE_ACTION: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        isLoading: true
      };
    }

    case SET_PEOPLE_ACTION: {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        people: action.payload.people,
        hasMorePeople: action.payload.hasMorePeople,
        isLoading: false
      };
    }

    case APPEND_PEOPLE_ACTION: {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        people: state.people.concat(action.payload.people),
        hasMorePeople: action.payload.hasMorePeople,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}

export const peopleStateSelector = createFeatureSelector<PeopleState>('people');
export const getPeople = createSelector(peopleStateSelector, (state: PeopleState) => state.people);
export const getSearchCriteria = createSelector(peopleStateSelector, (state: PeopleState) => state.searchCriteria);
export const getHasMorePeople = createSelector(peopleStateSelector, (state: PeopleState) => state.hasMorePeople);
export const getIsLoading = createSelector(peopleStateSelector, (state: PeopleState) => state.isLoading);
