import { PeopleResponse, CourseAuthor } from '../models/person';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Person } from '../models/person';

@Injectable()
export class PeopleService {
  private readonly PEOPLE_URL = 'courses';
  private readonly AUTHORS_URL = 'authors';
  private readonly LIMIT = 10;

  constructor(private http: HttpClient) {}

  getList(page: number = 0, searchCriteria?: string): Observable<PeopleResponse> {
    const params = new HttpParams()
      .set('start', (page * this.LIMIT).toString())
      .set('count', (this.LIMIT).toString())
      .set('textFragment', searchCriteria || '');

    return this.http.get<Person[]>(this.PEOPLE_URL, { params })
      .pipe(
        map((people) => ({ people, hasMorePeople: people.length === this.LIMIT }))
      );
  }

  createPerson(person: Person): Observable<Person>  {
    return this.http.post<Person>(this.PEOPLE_URL, person);
  }

  getItemById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.PEOPLE_URL}/${id}`);
  }

  updateItem(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.PEOPLE_URL}/${person.id}`, person);
  }

  removeItem(person: Person): Observable<any> {
    return this.http.delete(`${this.PEOPLE_URL}/${person.id}`);
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
