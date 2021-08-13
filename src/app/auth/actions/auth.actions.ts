import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';

export const LOG_IN_ACTION = '[Auth] Log In';
export const LOG_OUT_ACTION = '[Auth] Log Out';
export const LOG_IN_SUCCESS_ACTION = '[Auth] Log In Success';
export const LOG_IN_FAIL_ACTION = '[Auth] Log In Fail';

export const REGISTRATION_ACTION = '[Auth] Registration';
export const REGISTRATION_SUCCESS_ACTION = '[Auth] Registration Success';
export const REGISTRATION_FAIL_ACTION = '[Auth] Registration Fail';

export const SET_IS_AUTHENTICATED_ACTION = '[Auth] Set Is Authenticated';
export const SET_USER_ACTION = '[Auth] Set User';
export const INCREASE_USER_CASH_ACTION = '[Auth] Increase User Cash';

export const CLEAR_LOGIN_ERROR = '[Auth] Clear Login Error';

export class LogInAction implements Action {
  public readonly type = LOG_IN_ACTION;

  constructor(public payload: { email: string, password: string }) {}
}

export class LogOutAction implements Action {
  public readonly type = LOG_OUT_ACTION;
}

export class LogInSuccessAction implements Action {
  public readonly type = LOG_IN_SUCCESS_ACTION;

  constructor(public payload: string) {}
}

export class LogInFailAction implements Action {
  public readonly type = LOG_IN_FAIL_ACTION;

  constructor(public payload: HttpErrorResponse) {}
}

export class RegistrationAction implements Action {
  public readonly type = REGISTRATION_ACTION;

  constructor(public payload: User) {}
}

export class RegistrationSuccessAction implements Action {
  public readonly type = REGISTRATION_SUCCESS_ACTION;

  constructor(public payload: string) {}
}

export class RegistrationFailAction implements Action {
  public readonly type = REGISTRATION_FAIL_ACTION;

  constructor(public payload: HttpErrorResponse) {}
}

export class SetIsAuthenticatedAction implements Action {
  public readonly type = SET_IS_AUTHENTICATED_ACTION;

  constructor(public payload: boolean) {}
}

export class SetUserAction implements Action {
  public readonly type = SET_USER_ACTION;

  constructor(public payload: User | null) {}
}

export class IncreaseUserCashAction implements Action {
  public readonly type = INCREASE_USER_CASH_ACTION;

  constructor(public payload: number) {}
}

export class ClearLoginErrorAction implements Action {
  public readonly type = CLEAR_LOGIN_ERROR;
}

export type AuthAction =
  | LogInAction
  | LogOutAction
  | LogInSuccessAction
  | LogInFailAction
  | RegistrationAction
  | RegistrationSuccessAction
  | RegistrationFailAction
  | SetIsAuthenticatedAction
  | SetUserAction
  | IncreaseUserCashAction
  | ClearLoginErrorAction;
