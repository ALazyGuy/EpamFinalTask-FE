import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Person} from '../models/person';

@Injectable()
export class PeopleService {
  private readonly PEOPLE_URL = 'people';
  private readonly LIMIT = 10;

  constructor(private http: HttpClient) {
  }

  getList(searchCriteria?: string): Observable<Person[]> {
    return searchCriteria
      ? this.getAll()
      : this.searchPeople(searchCriteria as string)
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.PEOPLE_URL}/add`, person);
  }

  getItemById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.PEOPLE_URL}/${id}`);
  }

  updateItem(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.PEOPLE_URL}/found`, person, {params: new HttpParams({fromString: `id=${person.id}`})});
  }

  removeItem(person: Person): Observable<any> {
    return this.http.delete(`${this.PEOPLE_URL}/remove`, {params: new HttpParams({fromString: `id=${person.id}`})});
  }

  private getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.PEOPLE_URL}/getAll`);
  }

  private searchPeople(fullName: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.PEOPLE_URL}/search`, {params: {fullName}});
  }
}
