import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Person } from '../models/person';
import { PeopleService } from '../services/people.service';

@Injectable()
export class PersonResolver implements Resolve<Person> {
  constructor(private peopleService: PeopleService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.peopleService.getItemById(+route.params.id);
  }
}
