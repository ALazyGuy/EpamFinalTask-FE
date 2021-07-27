import { CourseResponse, CourseAuthor } from './../models/course';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Course } from '../models/course';

@Injectable()
export class CourseService {
  private readonly COURSES_URL = 'courses';
  private readonly AUTHORS_URL = 'authors';
  private readonly LIMIT = 10;

  constructor(private http: HttpClient) {}

  getList(page: number = 0, searchCriteria?: string): Observable<CourseResponse> {
    const params = new HttpParams()
      .set('start', (page * this.LIMIT).toString())
      .set('count', (this.LIMIT).toString())
      .set('textFragment', searchCriteria || '');

    return this.http.get<Course[]>(this.COURSES_URL, { params })
      .pipe(
        map((courses) => ({ courses, hasMoreCourses: courses.length === this.LIMIT }))
      );
  }

  createCourse(course: Course): Observable<Course>  {
    return this.http.post<Course>(this.COURSES_URL, course);
  }

  getItemById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.COURSES_URL}/${id}`);
  }

  updateItem(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.COURSES_URL}/${course.id}`, course);
  }

  removeItem(course: Course): Observable<any> {
    return this.http.delete(`${this.COURSES_URL}/${course.id}`);
  }

  getAuthors(): Observable<CourseAuthor[]> {
    return this.http.get<any[]>(`${this.AUTHORS_URL}`).pipe(
      map((response) => response.map((item) => {
        const fullName = item.name.split(' ');
        return {
          firstName: fullName[0],
          lastName: fullName[1]
        };
      }))
    );
  }
}
