import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Base URL for your NestJS backend auth routes
  private apiUrl = 'http://localhost:3000/auth';  

  constructor(private http: HttpClient) {}

  async login(credentials: { username: string; password: string }) {
    const response: any = await lastValueFrom(
      this.http.post(`${this.apiUrl}/login`, credentials) // ✅ now hits /auth/login
    );

    if (response?.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    return response;
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
