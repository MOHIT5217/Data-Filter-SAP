import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private apiUrl = 'https://spa.api.logicloop.io/api/games';

  constructor(private http: HttpClient, private toaster:ToastrService) { }

  getGames(filters: any = {}): Observable<any> {
    let params = new HttpParams();

    if (filters.name) {
      params = params.append('filters[name][$containsi]', filters.name);
    }
    if (filters.miniscore) {
      params = params.append('filters[rating][$gte]', filters.miniscore);
    }
    if (filters.sort) {
      const sortField = filters.sort === 'date' ? 'firstReleaseDate' : filters.sort;
      params = params.append('sort', sortField);
    }
    console.log(this.apiUrl, { params });
    
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    this.toaster.error(errorMessage,"Error");
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
