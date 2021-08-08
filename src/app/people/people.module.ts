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

import { reducer } from './reducers/people.reducer';
import { PeopleEffects } from './effects/people.effects';
import { PersonCashInputComponent } from './components/person-form/person-cash-input/person-cash-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { PeopleRoutingModule } from './people-routing.module';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

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
    MatSlideToggleModule,
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
    PersonCashInputComponent,
  ],
  providers: [PeopleService, PersonResolver, FilterByPipe],
  entryComponents: [ConfirmationDialogComponent],
})
export class PeopleModule {}
