import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
// import material design module
import { MaterialModule } from "src/app/modules/material/material.module";
import { NgModule } from "@angular/core";
import { QuizComponent } from "./quiz.component";
import { QuizRoutingModule } from "./quiz-routing.module";
import { QuizService } from "./quiz.service";

@NgModule({
  imports: [
    CommonModule,
    QuizRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [QuizComponent],
  providers: [QuizService]
})
export class QuizModule {}
