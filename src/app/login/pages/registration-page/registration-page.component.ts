import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AuthState } from 'src/app/auth/reducers/auth.reducer';
import { loginErrorMessage } from './../../../auth/reducers/auth.reducer';
import { ClearLoginErrorAction, RegistrationAction } from 'src/app/auth/actions/auth.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  errorMessage$ = this.store.pipe(select(loginErrorMessage));

  constructor(private store: Store<AuthState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      middleName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearLoginErrorAction());
  }

  performRegistration() {
    const { confirmPassword, ...user } = this.registrationForm.value;
    this.store.dispatch(new RegistrationAction(user));
  }
}
