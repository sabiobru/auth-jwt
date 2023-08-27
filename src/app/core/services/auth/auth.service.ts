// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'; // URL do JSON Server

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, { params: credentials }).pipe(
      map(users => {
        if (users.length === 1) {
          const user = users[0];
          localStorage.setItem('token', user.id.toString()); // Simples token, substitua por JWT no mundo real
          return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'Invalid credentials' };
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
