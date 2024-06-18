import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (isPlatformBrowser(this.platformId) && response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(this.handleError)
    );
  }


  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }


  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    // Décode le token et vérifiez son expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.role === 'admin';
      }
    }
    return false;
  }

  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        role: payload.role
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur actuel:', error);
      return null;
    }
  } 

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError(error);
  }


  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.get(`${this.apiUrl}/profile`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  updateProfile(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.put(`${this.apiUrl}/profile`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.delete(`${this.apiUrl}/profile`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers(page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.get<any>(`${this.apiUrl}/users/paginated?page=${page}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }












}
