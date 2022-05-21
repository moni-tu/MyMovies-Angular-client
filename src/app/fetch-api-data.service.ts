import { Injectable } from '@angular/core';

/* import { map } from 'rxjs/operators'; */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://mymovie-backend-api.herokuapp.com/';
//get the token from local storage
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const Username = localStorage.getItem('Username');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'mymovies/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // user gets list of all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'mymovies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }).pipe(catchError(this.handleError));
  }

  // user gets details for a single movie
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'mymovies/:movie_id', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // user gets director details
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'mymovies/director/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // user gets genre details
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'mymovies/genre/:name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // user gets profile data
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        /* map(this.extractResponseData), */
        catchError(this.handleError)
        );
  }

  // user update his profile
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      // Username with capital letter in profile-view.jsx
      .put(apiUrl + `users/${Username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // user adds favorite movie to list
  addFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('username');
    return this.http
      .post(apiUrl + `users/${Username}/favorites/${_id}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // user removes favorite movie from list
  deleteFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${Username}/favorites/${_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // user deletes profile
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}
