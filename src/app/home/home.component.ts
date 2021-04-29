import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentUser = '';
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  startQuiz(userName: string) {
    console.log(userName);
    this.currentUser = userName;
    this.router.navigate([`/quiz/`], {
      state: { data: { currentUser: userName } }
    });
  }

}
