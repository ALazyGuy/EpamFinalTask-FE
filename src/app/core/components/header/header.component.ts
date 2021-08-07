import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthState } from 'src/app/auth/reducers/auth.reducer';
import { currentUser } from './../../../auth/reducers/auth.reducer';
import { LogOutAction } from 'src/app/auth/actions/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$ = this.store.pipe(select(currentUser));
  langFormControl = new FormControl();
  lang: string

  constructor(private router: Router,
              private store: Store<AuthState>,
              private translateService: TranslateService) {}

  ngOnInit() {
    this.lang = (localStorage.getItem('lang') as string) || 'en';
    this.langFormControl.setValue(this.lang);

    this.translateService.use(this.lang);
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  register() {
    this.router.navigate(['/auth/registration']);
  }

  logout() {
    this.store.dispatch(new LogOutAction());
  }

  public changeLang(lang: string) {
    this.lang = lang;

    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
  }
}
