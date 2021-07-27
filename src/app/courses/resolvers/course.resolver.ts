import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Course } from './../models/course';
import { CourseService } from '../services/course.service';

@Injectable()
export class CourseResolver implements Resolve<Course> {
  constructor(private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.courseService.getItemById(+route.params.id);
  }
}
