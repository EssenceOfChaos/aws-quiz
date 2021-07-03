import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { QuickTips } from './quick_tips_dialog.component';

@Injectable({
  providedIn: 'root'
})

export class QuickTipsService {

  tips_url = 'assets/data/quick_tips.json'
  endpoint = environment.endpoint
  constructor(private http: HttpClient) {}

  getQuickTips(): Observable<QuickTips[]> {
    console.log( `Fetching QuickTips...`);
    return this.http.get<QuickTips[]>(`${this.endpoint}/${this.tips_url}`).pipe(
      tap(data => console.log(`Fetched: ${data.length} QuickTips`)),
      retry(3),
      catchError(this.handleError)
    );
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
