import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CourseAuthor } from './../models/course';
import { CourseService } from '../services/course.service';

@Injectable()
export class AuthorsResolver implements Resolve<CourseAuthor[]> {
  constructor(private courseService: CourseService) { }

  resolve() {
    return this.courseService.getAuthors();
  }
}
