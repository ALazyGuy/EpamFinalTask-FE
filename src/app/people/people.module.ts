import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleListPageComponent } from './pages/people-list-page/people-list-page.component';
import { PeopleItemComponent } from './components/people-item/people-item.component';

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
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PeopleService } from './services/people.service';
import { EditPersonPageComponent } from './pages/edit-person-page/edit-person-page.component';
import { CreatePersonPageComponent } from './pages/create-person-page/create-person-page.component';
import { PersonResolver } from './resolvers/person-resolver.service';
import { AuthorsResolver } from './resolvers/authors.resolver';

import { reducer } from './reducers/people.reducer';
import { PeopleEffects } from './effects/people.effects';
import { CourseDateInputComponent } from './components/person-form/course-date-input/course-date-input.component';
import { CourseDurationInputComponent } from './components/person-form/course-duration-input/course-duration-input.component';
import { CourseAuthorsInputComponent } from './components/person-form/course-authors-input/course-authors-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { PeopleRoutingModule } from './people-routing.module';

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
    PeopleRoutingModule,
    TranslateModule.forChild({}),
    StoreModule.forFeature('people', reducer),
    EffectsModule.forFeature([PeopleEffects]),
  ],
  declarations: [
    PeopleListPageComponent,
    PeopleItemComponent,
    MinutesToTimePipe,
    CreationDateStatusDirective,
    FilterByPipe,
    OrderByPipe,
    ConfirmationDialogComponent,
    PersonFormComponent,
    EditPersonPageComponent,
    CreatePersonPageComponent,
    CourseDateInputComponent,
    CourseDurationInputComponent,
    CourseAuthorsInputComponent,
  ],
  providers: [PeopleService, PersonResolver, AuthorsResolver, FilterByPipe],
  entryComponents: [ConfirmationDialogComponent],
})
export class PeopleModule {}
