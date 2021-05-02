import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { environment } from '../../../environments/environment';

let quizPath = {
  design_resilient: 'assets/data/design_resilient.json',
  js: 'assets/data/javascript_quiz.json'
};
@Injectable({
  providedIn: 'root'
})
export class QuizService {


  quizUrl = '';
  endpoint = environment.quizUrl;
  constructor(private http: HttpClient) {}

  getQuestions(subject: any): Observable<any> {
    if (subject == 'design_resilient') {
      this.quizUrl = 'assets/data/design_resilient.json'
    } else if(subject == 'js') {
      this.quizUrl = 'assets/data/javascript_quiz.json'
    }

    console.log(this.quizUrl);

    return this.http.get(this.quizUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addScore(score: number, subject: string, user: string) {
    const date = Date.now();
    const result: Quiz = {
      user,
      subject,
      date,
      score
    };
    console.log(result);
    return this.http
      .post<Quiz>(`${this.endpoint}/quizzes`, result)
      .pipe(catchError(this.handleError));
  }

  getQuizzes() {
    return this.http.get(`${this.endpoint}/quizzes`);
  }

  // generic error handler
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
