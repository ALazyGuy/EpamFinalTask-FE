import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AuthState } from 'src/app/auth/reducers/auth.reducer';
import { loginErrorMessage } from './../../../auth/reducers/auth.reducer';
import { LogInAction } from 'src/app/auth/actions/auth.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage$ = this.store.pipe(select(loginErrorMessage));

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.store.dispatch(new LogInAction(this.loginForm.value));
  }

}
