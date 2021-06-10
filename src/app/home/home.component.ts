import { Component, OnInit } from '@angular/core';
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
      viewValue: 'Resiliency',
      image: '/assets/images/backup.png',
      enabled: true
    },
    {
      value: 'design_performant',
      viewValue: 'Performance',
      image: '/assets/images/speedometer.png',
      enabled: true
    },
    {
      value: 'design_cost_optimized',
      viewValue: 'Cost Optimization',
      image: '/assets/images/low-prices.png',
      enabled: true
    },
    {
      value: 'design_secure',
      viewValue: 'Security',
      image: '/assets/images/shield.png',
      enabled: true
    }
  ];
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  startQuiz(subjectValue: any) {
    console.log(subjectValue);
    this.router.navigate([`/quiz/${subjectValue}`])
  }

}
