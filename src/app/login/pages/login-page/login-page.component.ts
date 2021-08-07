import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AuthState } from 'src/app/auth/reducers/auth.reducer';
import { loginErrorMessage } from './../../../auth/reducers/auth.reducer';
import { ClearLoginErrorAction, LogInAction } from 'src/app/auth/actions/auth.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessage$ = this.store.pipe(select(loginErrorMessage));

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearLoginErrorAction());
  }

  login() {
    this.store.dispatch(new LogInAction(this.loginForm.value));
  }

}
