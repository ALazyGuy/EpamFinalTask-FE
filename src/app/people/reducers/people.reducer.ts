import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Person } from '../models/person';
import {
  PeopleAction,
  SET_PEOPLE_ACTION,
  LOAD_PEOPLE_ACTION
} from '../actions/people.actions';

export interface PeopleState {
  people: Person[];
  searchCriteria: string;
  isLoading: boolean;
}

export const initialState: PeopleState = {
  people: [],
  searchCriteria: '',
  isLoading: false
};

export function reducer(state = initialState, action: PeopleAction) {
  switch (action.type) {
    case LOAD_PEOPLE_ACTION: {
      return {
        ...state,
        searchCriteria: action.payload.searchCriteria,
        isLoading: true
      };
    }

    case SET_PEOPLE_ACTION: {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        people: action.payload,
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
export const getIsLoading = createSelector(peopleStateSelector, (state: PeopleState) => state.isLoading);
