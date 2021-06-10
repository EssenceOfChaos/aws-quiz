import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
// Import Angular Material Components
import { MaterialModule } from './modules/material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { Stack } from './shared/stack';
import { QuickTipsDialogComponent } from './quick_tips_dialog/quick_tips_dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    HomeComponent,
    LeaderboardComponent,
    SubjectsComponent,
    FeedbackComponent,
    QuickTipsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: 'dev-zwb844h4.us.auth0.com',
      clientId: 'TnDKLhy4P0V9uU40CXHw3lknmnnd9LXJ'
    }),
    LayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [Title, Stack],
  bootstrap: [AppComponent]
})
export class AppModule { }
