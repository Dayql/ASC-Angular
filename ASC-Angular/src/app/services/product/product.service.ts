import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  searchProducts(query: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.get(`${this.apiUrl}/search?q=${query}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getProductDetails(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.get<any>(`${this.apiUrl}/${productId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getProductMovements(productId: number, page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.get<any>(`${environment.apiUrl}/movements/product/${productId}?page=${page}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token ? token : ''
    });
    return this.http.put<any>(`${this.apiUrl}/${productId}`, productData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(error);
  }
}
