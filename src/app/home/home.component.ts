import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { Subject } from 'src/app/subjects/subjects.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subjects: Subject[] = [
    {
      value: 'design_resilient',
      viewValue: 'Design Resilient Architectures',
      image: '/assets/images/backup.png',
      enabled: true
    },
    {
      value: 'design_performant',
      viewValue: 'Design Performant Architectures',
      image: '/assets/images/speedometer.png',
      enabled: false
    },
    {
      value: 'design_cost_optimized',
      viewValue: 'Design Cost-Optimized Architectures',
      image: '/assets/images/low-prices.png',
      enabled: false
    },
    {
      value: 'design_secure',
      viewValue: 'Design Secure Applications',
      image: '/assets/images/shield.png',
      enabled: false
    }
  ];
  constructor(public router: Router) { }

  // userForm = new FormGroup({
  //   subject: new FormControl('')
  // });

  ngOnInit(): void {
  }

  startQuiz(subjectValue: any) {
    console.log(subjectValue);
    this.router.navigate([`/quiz/${subjectValue}`])
  }

}
