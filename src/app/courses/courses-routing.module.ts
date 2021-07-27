import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';
import { AuthorsResolver } from './resolvers/authors.resolver';
import { EditCoursePageComponent } from './pages/edit-course-page/edit-course-page.component';
import { CourseResolver } from './resolvers/course.resolver';

const routes: Routes = [
  {
    path: '',
    component: CourseListPageComponent
  },
  {
    path: 'new',
    component: CreateCoursePageComponent,
    data: {
      breadcrumb: {
        name: 'Create'
      }
    },
    resolve: {
      authors: AuthorsResolver
    }
  },
  {
    path: ':id',
    component: EditCoursePageComponent,
    resolve: {
      course: CourseResolver,
      authors: AuthorsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
