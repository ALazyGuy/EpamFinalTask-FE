import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CourseAuthor } from '../models/person';
import { PeopleService } from '../services/people.service';

@Injectable()
export class AuthorsResolver implements Resolve<CourseAuthor[]> {
  constructor(private peopleService: PeopleService) { }

  resolve() {
    return this.peopleService.getAuthors();
  }
}
