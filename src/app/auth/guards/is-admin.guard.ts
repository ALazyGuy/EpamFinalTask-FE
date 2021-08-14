import { isAdmin } from './../reducers/auth.reducer';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(isAdmin),
        take(1),
        tap((isAdmin) => {
          if (!isAdmin) {
            this.router.navigate(['/']);
          }
        })
      );
  }

}
