import { Action } from '@ngrx/store';
import { Person } from '../models/person';

export const LOAD_PEOPLE_ACTION = '[People] Load People';
export const SET_PEOPLE_ACTION = '[People] Set People';
export const CREATE_PERSON_ACTION = '[People] Create Person';
export const EDIT_PERSON_ACTION = '[People] Edit Person';
export const REMOVE_PERSON_ACTION = '[People] Remove Person';
export const ARREST_PERSON_ACTION = '[People] Arrest Person';

export class LoadPeopleAction implements Action {
  public readonly type = LOAD_PEOPLE_ACTION;

  constructor(public payload: { searchCriteria?: string }) {}
}

export class SetPeopleAction implements Action {
  public readonly type = SET_PEOPLE_ACTION;

  constructor(public payload: Person[]) {}
}

export class CreatePersonAction implements Action {
  public readonly type = CREATE_PERSON_ACTION;

  constructor(public payload: Person) {}
}

export class EditPersonAction implements Action {
  public readonly type = EDIT_PERSON_ACTION;

  constructor(public payload: Person) {}
}

export class RemovePersonAction implements Action {
  public readonly type = REMOVE_PERSON_ACTION;

  constructor(public payload: Person) {}
}

export class ArrestPersonAction implements Action {
  public readonly type = ARREST_PERSON_ACTION;

  constructor(public payload: Person) {}
}

export type PeopleAction =
  | LoadPeopleAction
  | SetPeopleAction
  | CreatePersonAction
  | EditPersonAction
  | RemovePersonAction
  | ArrestPersonAction;
