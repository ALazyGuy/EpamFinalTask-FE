import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListPageComponent } from './pages/people-list-page/people-list-page.component';
import { CreatePersonPageComponent } from './pages/create-person-page/create-person-page.component';
import { AuthorsResolver } from './resolvers/authors.resolver';
import { EditPersonPageComponent } from './pages/edit-person-page/edit-person-page.component';
import { PersonResolver } from './resolvers/person-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PeopleListPageComponent
  },
  {
    path: 'new',
    component: CreatePersonPageComponent,
    data: {
      breadcrumb: {
        name: 'Create'
      }
    },
  },
  {
    path: ':id',
    component: EditPersonPageComponent,
    resolve: {
      person: PersonResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
