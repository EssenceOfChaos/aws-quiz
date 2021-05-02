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
      image: 'http://localhost:4200/assets/images/backup.png'
    },
    {
      value: 'design_performant',
      viewValue: 'Design Performant Architectures',
      image: 'http://localhost:4200/assets/images/speedometer.png'
    },
    {
      value: 'design_cost_optimized',
      viewValue: 'Design Cost-Optimized Architectures',
      image: 'http://localhost:4200/assets/images/low-prices.png'
    },
    {
      value: 'specify_secure',
      viewValue: 'Specify Secure Applications',
      image: 'http://localhost:4200/assets/images/shield.png'
    }
  ];
  constructor(public router: Router) { }

  userForm = new FormGroup({
    subject: new FormControl('')
  });

  ngOnInit(): void {
  }

  startQuiz(formValues: any) {
    console.log(formValues);
    this.router.navigate([`/quiz/${formValues.value.subject}`])
  }

}
