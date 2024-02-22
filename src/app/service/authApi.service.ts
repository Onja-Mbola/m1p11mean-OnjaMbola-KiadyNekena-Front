import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  baseUri: string = 'http://localhost:3000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // Register
  registerClient(data): Observable<any> {
    let url = `${this.baseUri}/registerClient`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  /*registerClient(data): Observable<any> {
    let url = `${this.baseUri}/registerClient`;
    return this.http.post(url, data).pipe(
      tap((response) => {
        console.log('Réponse du serveur :', response);
      }),
      catchError((error) => {
        console.error('Erreur lors de la requête :', error);
        return throwError(error); // Utilisez throwError pour relancer l'erreur
      })
    );
  }*/
  
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}