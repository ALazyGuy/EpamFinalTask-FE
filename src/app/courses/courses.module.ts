import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { CourseItemComponent } from './components/course-item/course-item.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MinutesToTimePipe } from './pipes/minutes-to-time.pipe';
import { CreationDateStatusDirective } from './directives/creation-date-status.directive';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseService } from './services/course.service';
import { EditCoursePageComponent } from './pages/edit-course-page/edit-course-page.component';
import { CreateCoursePageComponent } from './pages/create-course-page/create-course-page.component';
import { CourseResolver } from './resolvers/course.resolver';
import { AuthorsResolver } from './resolvers/authors.resolver';

import { reducer } from './reducers/courses.reducer';
import { CoursesEffects } from './effects/courses.effects';
import { CourseDateInputComponent } from './components/course-form/course-date-input/course-date-input.component';
import { CourseDurationInputComponent } from './components/course-form/course-duration-input/course-duration-input.component';
import { CourseAuthorsInputComponent } from './components/course-form/course-authors-input/course-authors-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    CoursesRoutingModule,
    TranslateModule.forChild({}),
    StoreModule.forFeature('courses', reducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  declarations: [
    CourseListPageComponent,
    CourseItemComponent,
    MinutesToTimePipe,
    CreationDateStatusDirective,
    FilterByPipe,
    OrderByPipe,
    ConfirmationDialogComponent,
    CourseFormComponent,
    EditCoursePageComponent,
    CreateCoursePageComponent,
    CourseDateInputComponent,
    CourseDurationInputComponent,
    CourseAuthorsInputComponent,
  ],
  providers: [CourseService, CourseResolver, AuthorsResolver, FilterByPipe],
  entryComponents: [ConfirmationDialogComponent],
})
export class CoursesModule {}
