import {
  LoadPeopleAction,
  RemovePersonAction,
  PeopleAction,
  ARREST_PERSON_ACTION,
  ArrestPersonAction
} from '../actions/people.actions';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map, pluck, tap, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import { PeopleService } from '../services/people.service';
import {
  LOAD_PEOPLE_ACTION,
  CREATE_PERSON_ACTION,
  EDIT_PERSON_ACTION,
  REMOVE_PERSON_ACTION,
  SetPeopleAction,
} from '../actions/people.actions';
import { Person } from '../models/person';
import { PeopleState, getSearchCriteria } from '../reducers/people.reducer';
import { IncreaseUserCashAction, LogInSuccessAction } from "../../auth/actions/auth.actions";
import { AuthService } from "../../auth/services/auth.service";

@Injectable()
export class PeopleEffects {
  @Effect()
  public loadPeople$: Observable<SetPeopleAction> = this.actions$.pipe(
    ofType(LOAD_PEOPLE_ACTION),
    pluck('payload'),
    switchMap(
      ({ searchCriteria }) => this.peopleService.getList(searchCriteria)
        .pipe(
          map((people) => new SetPeopleAction(people)),
          catchError(() => of(new SetPeopleAction([])))
        )
    )
  );

  @Effect({ dispatch: false })
  public createPerson$: Observable<any> = this.actions$.pipe(
    ofType(CREATE_PERSON_ACTION),
    pluck('payload'),
    switchMap(
      (person: Person) => this.peopleService.createPerson(person)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError(() => of()) // TODO: create some notification area for errors
        )
    )
  );

  @Effect({ dispatch: false })
  public editPerson$: Observable<any> = this.actions$.pipe(
    ofType(EDIT_PERSON_ACTION),
    pluck('payload'),
    switchMap(
      (person: Person) => this.peopleService.updateItem(person)
        .pipe(
          tap(() => this.router.navigate(['/'])),
          catchError(() => of()) // TODO: create some notification area for errors
        )
    )
  );

  @Effect()
  public removePerson$: Observable<LoadPeopleAction> = this.actions$.pipe(
    ofType(REMOVE_PERSON_ACTION),
    map((action: RemovePersonAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getSearchCriteria))),
    switchMap(
      ([ person, searchCriteria ]) => this.peopleService.removeItem(person)
        .pipe(
          catchError(() => of()), // TODO: create some notification area for errors
          map(() => new LoadPeopleAction({ searchCriteria }))
        )
    )
  );

  @Effect()
  public arrestPerson$: Observable<LoadPeopleAction | LogInSuccessAction> = this.actions$.pipe(
    ofType(ARREST_PERSON_ACTION),
    map((action: ArrestPersonAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getSearchCriteria))),
    switchMap(
      ([ person, searchCriteria ]) => this.peopleService.arrest(person)
        .pipe(
          catchError(() => of()), // TODO: create some notification area for errors
          switchMap(() => [new LoadPeopleAction({ searchCriteria }), new LogInSuccessAction(this.authService.getToken())])
        )
    )
  );

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private authService: AuthService,
    private store: Store<PeopleState>,
    private router: Router
  ) {}
}
