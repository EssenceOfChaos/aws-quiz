import { Component, OnInit } from '@angular/core';

export interface Subject {
  value: string;
  viewValue: string;
  image: string;
}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})

export class SubjectsComponent implements OnInit {

  constructor() { }
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
  ngOnInit(): void {
  }

}
