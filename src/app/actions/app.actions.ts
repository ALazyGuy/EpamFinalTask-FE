import { Action } from '@ngrx/store';

export const SET_IS_LOADING = '[App] Set Is Loading';

export class SetIsLoadingAction implements Action {
  public readonly type = SET_IS_LOADING;

  constructor(public payload: boolean) {}
}

export type AppAction =
  | SetIsLoadingAction;
