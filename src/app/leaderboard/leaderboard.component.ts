import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { LeaderboardService } from './leaderboard.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserInfo {
  _id: string;
  user: string;
  score: string;
  subject: string;
  date: Date;
}

// {_id: "6085db59c6e12fc28d67a534", subject: "aws-solutions-architect", user: "Bob", score: "7", date: "2021-04-25T21:14:49.428Z"}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
  rank = 0;

  displayedColumns: string[] = ['user', 'score', 'quiz', 'date'];
  dataSource: any;
  // dataSource = new MatTableDataSource<UserInfo>();
  // dataSource is fetched from the lb service
  // dataSource needs to be type of MatTableDataSource for sorting and pagination to work
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  constructor(private lb: LeaderboardService) {}

  ngOnInit() {
    this.lb.getScores().subscribe(res => {
      if (res) {
        console.log(res);
        this.dataSource = res;
      }
    });
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
}
