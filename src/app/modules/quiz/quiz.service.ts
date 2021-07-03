import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Quiz } from './quiz';
import { environment } from '../../../environments/environment';

let quizPath = {
  design_resilient: 'assets/data/design_resilient.json',
  design_performant: 'assets/data/design_performant.json',
  design_secure: 'assets/data/design_secure.json',
  design_cost_optimized: 'assets/data/design_cost_optimized.json',
  practice_test: 'assets/data/practice_test.json'
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizEndpoint = environment.quizUrl
  quizUrl = '';
  endpoint = environment.endpoint;
  constructor(private http: HttpClient) {}

  getQuestions(subject: string = 'design_secure'): Observable<any> {
    if (subject == 'design_resilient') {
      this.quizUrl = quizPath.design_resilient
    } else if(subject == 'design_secure') {
      this.quizUrl = quizPath.design_secure
    } else if (subject == 'design_performant') {
      this.quizUrl = quizPath.design_performant
    } else if (subject == 'design_cost_optimized') {
      this.quizUrl = quizPath.design_cost_optimized
    } else if (subject == 'practice_test') {
      this.quizUrl = quizPath.practice_test
    }


    console.log( `${this.endpoint}/${this.quizUrl}`);

    return this.http.get(`${this.endpoint}/${this.quizUrl}`).pipe(
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
      .post<Quiz>(`${this.quizEndpoint}/quizzes`, result)
      .pipe(catchError(this.handleError));
  }

 getQuizzes() {
    return this.http.get(`${this.quizEndpoint}/quizzes`);
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
