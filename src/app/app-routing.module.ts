import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Route[] = [
  {
    path: 'people',
    loadChildren: () =>
      import('./people/people.module').then((m) => m.PeopleModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      breadcrumb: { name: 'People', url: '/people' },
    },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },

  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
