import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { LeaderboardService } from './leaderboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent, merge, Observable, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import {LeaderboardDataSource} from './leaderboard_datasource.service';
export interface UserInfo {
  __v?: number;
  _id?: string;
  user: string;
  score: string;
  subject: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
  rank = 0;
  data: UserInfo[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  dataSource!: LeaderboardDataSource;
  displayedColumns: string[] = ['user', 'score', 'subject', 'date'];

  // dataSource = new MatTableDataSource<UserInfo>();
  // dataSource needs to be type of MatTableDataSource for sorting and pagination to work
  // dataSource: MatTableDataSource<UserInfo>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private lb_service: LeaderboardService) {

  }

  ngOnInit() {
    this.dataSource = new LeaderboardDataSource(this.lb_service);
    this.dataSource.getUserScores();
    // this.lb_service.getScores().subscribe(res => {
    //   if (res) {
    //     console.log(res);
    //     this.dataSource = res;
    //   }
    // });
  }

  ngAfterViewInit() {

    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // merge(this.sort.sortChange, this.paginator.page)
    // .pipe(
    //     tap(() => this.getUserScores())
    // )
    // .subscribe();

}

  getUserScores(){
    // console.log('getting scores')
    this.dataSource.getUserScores();
  }
}


const mock_users: UserInfo[] = [
  {user: "Bob", score: '12', subject: "design_performant", date: "2021-04-27T20:14:49.428Z"},
  {user: "Bill", score: '11', subject: "design_performant", date: "2021-04-26T21:14:49.428Z"},
  {user: "Ben", score: '6', subject: "design_secure", date: "2021-04-25T21:14:49.428Z"},
  {user: "Brian", score: '10', subject: "design_performant", date: "2021-04-29T20:12:49.428Z"},
  {user: "Beau", score: '9', subject: "design_secure", date: "2021-04-25T21:14:49.428Z"},
  {user: "Betty", score: '15', subject: "design_resilient", date: "2021-04-30T16:10:49.428Z"}

];


