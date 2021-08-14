import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from 'src/app/auth/services/auth.service';
import { reducer } from './reducers/auth.reducer';
import { AuthEffects } from './effects/auth.effects';
import { IsAdminGuard } from "./guards/is-admin.guard";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthService,
    AuthGuard,
    IsAdminGuard,
  ]
})
export class AuthModule { }
