import { User } from '../models/user';
import {
  SET_IS_AUTHENTICATED_ACTION,
  SET_USER_ACTION,
  LOG_IN_SUCCESS_ACTION,
  LOG_IN_FAIL_ACTION,
  AuthAction
} from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  loginErrorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  loginErrorMessage: null,
};

export function reducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case SET_IS_AUTHENTICATED_ACTION: {
      return {
        ...state,
        isAuthenticated: action.payload
      };
    }

    case SET_USER_ACTION: {
      return {
        ...state,
        currentUser: action.payload
      };
    }

    case LOG_IN_SUCCESS_ACTION: {
      return {
        ...state,
        loginErrorMessage: null
      };
    }

    case LOG_IN_FAIL_ACTION: {
      return {
        ...state,
        loginErrorMessage: action.payload.message
      };
    }

    default: {
      return state;
    }
  }
}

const authStateSelector = createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(authStateSelector, (state: AuthState) => state.isAuthenticated);
export const currentUser = createSelector(authStateSelector, (state: AuthState) => state.currentUser);
export const loginErrorMessage = createSelector(authStateSelector, (state: AuthState) => state.loginErrorMessage);
