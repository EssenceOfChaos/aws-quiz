import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz.component';

const routes: Routes = [
  {
    path: ':subject',
    component: QuizComponent,
    data: { animation: 'subject' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
