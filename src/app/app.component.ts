import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState, isAuthenticated } from './auth/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { AppState, appStateSelector } from './reducers/app.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from "rxjs";
import { LogInSuccessAction } from "./auth/actions/auth.actions";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated$ = this.authStore.pipe(select(isAuthenticated));
  isLoading$ = this.appStore.pipe(
    select(appStateSelector),
    // Still haven't fixed it. TODO: find a way of not spaming loading action or not use it per each request at all
    // Instead I'd listen NavigationEnd event as previously and use isLoading boolean per store to indicate the loading process
    debounceTime<AppState>(0),
    map((state: AppState) => state.isLoading)
  );
  unsubscribe$ = new Subject<void>();

  constructor(private authStore: Store<AuthState>,
              private appStore: Store<AppState>,
              private authService: AuthService,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.isAuthenticated$.pipe(
      takeUntil(this.unsubscribe$),
      filter(Boolean),
      tap(() => this.authStore.dispatch(new LogInSuccessAction(this.authService.getToken())))
    ).subscribe();

    this.translateService.setDefaultLang('en');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
