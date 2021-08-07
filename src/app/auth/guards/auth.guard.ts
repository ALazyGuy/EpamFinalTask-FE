import { isAuthenticated } from './../reducers/auth.reducer';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';

import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) {}

  canLoad(): Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    return this.store
      .pipe(
        select(isAuthenticated),
        take(1),
        tap((_isAuthenticated) => {
          if (!_isAuthenticated) {
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }

}
