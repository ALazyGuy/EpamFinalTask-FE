import { Component, OnInit } from '@angular/core';
import { AuthState, isAuthenticated } from './auth/reducers/auth.reducer';
import { Store, select } from '@ngrx/store';
import { debounceTime, map } from 'rxjs/operators';
import { AppState, appStateSelector } from './reducers/app.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$ = this.authStore.pipe(select(isAuthenticated));
  isLoading$ = this.appStore.pipe(
    select(appStateSelector),
    // Still haven't fixed it. TODO: find a way of not spaming loading action or not use it per each request at all
    // Instead I'd listen NavigationEnd event as previously and use isLoading boolean per store to indicate the loading process
    debounceTime<AppState>(0),
    map((state: AppState) => state.isLoading)
  );

  constructor(private authStore: Store<AuthState>,
              private appStore: Store<AppState>,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('en');
  }
}
