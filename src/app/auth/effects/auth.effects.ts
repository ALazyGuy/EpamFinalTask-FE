import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, pluck, tap, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

import {
  LOG_IN_ACTION,
  LOG_OUT_ACTION,
  LOG_IN_SUCCESS_ACTION,
  LogInFailAction,
  LogInSuccessAction,
  SetIsAuthenticatedAction,
  SetUserAction,
  REGISTRATION_ACTION,
  RegistrationSuccessAction,
  RegistrationFailAction,
  REGISTRATION_SUCCESS_ACTION,
} from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  public logIn$: Observable<LogInSuccessAction | LogInFailAction> = this.actions$.pipe(
    ofType(LOG_IN_ACTION),
    pluck('payload'),
    switchMap(
      ({ email, password }) => this.authService.login(email, password)
        .pipe(
          map(({ token }) => new LogInSuccessAction(token)),
          catchError((error) => of(new LogInFailAction({
            ...error,
            message: error.status === 401 ? 'Incorrect username or password' : error.message
          })))
        )
    )
  );

  @Effect()
  public registration$: Observable<RegistrationSuccessAction | RegistrationFailAction> = this.actions$.pipe(
    ofType(REGISTRATION_ACTION),
    pluck('payload'),
    switchMap(
      user => this.authService.register(user)
        .pipe(
          map(({ token }) => new RegistrationSuccessAction(token)),
          catchError((error) => of(new RegistrationFailAction({
            ...error,
            message: 'User with such email is already exist'
          })))
        )
    )
  );

  @Effect()
  public logInSuccess$: Observable<SetIsAuthenticatedAction | SetUserAction> = this.actions$.pipe(
    ofType(LOG_IN_SUCCESS_ACTION, REGISTRATION_SUCCESS_ACTION),
    pluck('payload'),
    tap((token) => localStorage.accessToken = JSON.stringify(token)),
    switchMap(
      () => this.authService.getUserInfo()
        .pipe(
          switchMap((user) => [
            new SetIsAuthenticatedAction(true),
            new SetUserAction(user)
          ]),
          tap(() => this.router.navigate(['/'])),
          catchError(() => of(
            new SetIsAuthenticatedAction(false),
            new SetUserAction(null)
          ))
        )
    )
  );

  @Effect()
  public logout$: Observable<SetIsAuthenticatedAction | SetUserAction> = this.actions$.pipe(
    ofType(LOG_OUT_ACTION),
    tap(() => {
      localStorage.removeItem('accessToken');
      this.router.navigate(['/auth/login']);
    }),
    switchMap(() => [
      new SetIsAuthenticatedAction(false),
      new SetUserAction(null)
    ])
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
