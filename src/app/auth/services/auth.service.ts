import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly AUTH_URL = 'user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/auth`, {
      email,
      password
    });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/add`, user)
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.AUTH_URL}/current`);
  }

  getToken(): string {
    return this.getLocalStorageItem('accessToken');
  }

  private getLocalStorageItem(prop: string) {
    const item = localStorage.getItem(prop);

    return item && JSON.parse(item);
  }
}
