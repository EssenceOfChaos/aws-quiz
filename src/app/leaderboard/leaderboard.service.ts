import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {UserInfo} from './leaderboard.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private url = environment.endpoint;
  constructor(private http: HttpClient) {}

  getScores(): Observable<UserInfo[]> {
    // console.log('LeaderboardService.getScores() - getting the users and their scores')
    return this.http.get<UserInfo[]> (`${this.url}/api/quizzes`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // getScores(): Observable<UserInfo[]> {
  //   return this.http.get<UserInfo[]> (`${this.url}/api/quizzes`).pipe(
  //     retry(2),
  //     catchError(this.handleError)
  //   );
  // }

  // General Error Handling Function
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }
}
