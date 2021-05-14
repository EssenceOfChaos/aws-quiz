import { Component, OnInit } from '@angular/core';

export interface Subject {
  value: string;
  viewValue: string;
  image: string;
  description?: string;
  enabled?: boolean;
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
      image: '/assets/images/backup.png'
    },
    {
      value: 'design_performant',
      viewValue: 'Design Performant Architectures',
      image: '/assets/images/speedometer.png'
    },
    {
      value: 'design_cost_optimized',
      viewValue: 'Design Cost-Optimized Architectures',
      image: '/assets/images/low-prices.png'
    },
    {
      value: 'specify_secure',
      viewValue: 'Specify Secure Applications',
      image: '/assets/images/shield.png'
    }
  ];
  ngOnInit(): void {
  }

}
