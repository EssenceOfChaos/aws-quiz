import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [

  { path: 'profile', component: ProfileComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'subjects', component: SubjectsComponent },
  {path: 'feedback', component: FeedbackComponent },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./modules/quiz/quiz.module').then(m => m.QuizModule)
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
