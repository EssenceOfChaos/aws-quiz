import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";

import {LeaderboardService} from "./leaderboard.service";
import {catchError, finalize} from "rxjs/operators";
import {UserInfo} from './leaderboard.component'


export class LeaderboardDataSource implements DataSource<UserInfo> {

    private quizzesSubject = new BehaviorSubject<UserInfo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private leaderboardService: LeaderboardService) {

    }

    getUserScores() {

        this.loadingSubject.next(true);

        this.leaderboardService.getScores().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(quizzes => this.quizzesSubject.next(quizzes));

    }

    connect(collectionViewer: CollectionViewer): Observable<UserInfo[]> {
        console.log("Connecting data source");
        return this.quizzesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.quizzesSubject.complete();
        this.loadingSubject.complete();
    }

}
