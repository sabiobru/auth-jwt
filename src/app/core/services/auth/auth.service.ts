// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { params: credentials }).pipe(
      map(users => {
        if (users.length === 1) {
          const user = users[0];
          localStorage.setItem('token', user.token.toString());
          localStorage.setItem('uid', user.id.toString());
          localStorage.setItem('isAuth', 'true');
          return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'Invalid credentials' };
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('isAuth');
    localStorage.clear;
  }

  isAuthenticated(): boolean {
    const logged = !!localStorage.getItem('isAuth');
    console.log(logged);
    return logged;
  }

  getUsername(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/username`).pipe(
      map(response => response)
    );
  }
}
