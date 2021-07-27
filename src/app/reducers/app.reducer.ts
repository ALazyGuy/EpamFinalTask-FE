import { AppAction } from '../actions/app.actions';
import { SET_IS_LOADING } from './../actions/app.actions';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  isLoading: boolean;
}

export const initialState: AppState = {
  isLoading: false
};

export function reducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const appStateSelector = createFeatureSelector<AppState>('app');
