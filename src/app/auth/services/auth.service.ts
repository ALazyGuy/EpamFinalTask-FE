import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly AUTH_URL = 'auth';

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/login`, {
      login,
      password
    });
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.AUTH_URL}/userInfo`);
  }

  getToken(): string {
    return this.getLocalStorageItem('accessToken');
  }

  private getLocalStorageItem(prop: string) {
    const item = localStorage.getItem(prop);

    return item && JSON.parse(item);
  }
}
