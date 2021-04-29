import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ANSWERS } from './answers/test-quiz-answers';
import { QuizService } from './quiz.service';
import { Title } from '@angular/platform-browser';

interface Question {
  id: number;
  multi_choice: boolean;
  question: string;
  choices: string[];
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  pageTitle = 'Quiz';

  questions: Array<Question> = [];
  question!: Observable<Question>;
  answers = ANSWERS;
  index = 0;
  isAnswered = false;
  quizFinished = false;
  correctAnswers = 0;
  userName!: string;
  response!: string;
  subject = 'aws-solutions-architect'
  // state of user's choice ('unanswered', 'no', 'yes')
  correctAnswer = 'unanswered';
  currentUser = '';
  form: FormGroup;

  constructor(
    private title: Title,
    private quizService: QuizService,
    private fb: FormBuilder,
    public router: Router) {
      this.form = this.fb.group({
        multiChoiceResponse: this.fb.array([])
    })
  }

  ngOnInit() {
    console.log('ngOnInit Fired from QuizComponent.');
    this.title.setTitle(this.pageTitle);
    this.quizService.getQuestions().subscribe(res => {
      if (res) {
        console.log(res);
        this.questions = res.questions;
      }
    });
  }

  nextQuestion(i: number) {
    if (i >= this.questions.length) {
      i = 0;
    }
    this.question = of(this.questions[i]);
    this.index++;
    this.isAnswered = false;
    this.correctAnswer = 'unanswered';
  }

  submitChoice(response: any, multiResponse=false) {
    console.log(this.index, response);
    if (multiResponse) {

      this.checkMultiAnswer(response.multiChoiceResponse)
    } else {
      this.checkAnswer(response);
    }

    this.isAnswered = true;
    if (this.index === this.questions.length - 1) {
      this.quizFinished = true;
      this.recordScore(this.correctAnswers, this.subject, this.userName);
      this.router.navigate(['/leaderboard']);
    }
  }

  checkAnswer(choice: any) {
    console.log(`The user has supplied the response ${choice}`);
    const answer = this.answers[this.index].choice;
    console.log(`The correct answer to the question is ${answer}`);
    if (choice == answer) {
      this.correctAnswer = 'yes';
      this.correctAnswers = this.correctAnswers + 1;
    } else {
      this.correctAnswer = 'no';
    }
  }

  checkMultiAnswer(choices: []){
    const answer = this.answers[this.index].choice;
    console.log(answer);
    let targetNumber = 0
    let responses = choices.length
    let answers = answer.length
    if (responses === answers) {
      for (let choice of choices) {
        console.log(choice);
        if (answer.includes(choice)) {
          targetNumber += 1
        }
      }
      if(targetNumber === answers) {
        this.correctAnswer = 'yes';
        this.correctAnswers = this.correctAnswers + 1;
      } else {
        this.correctAnswer = 'no';
      }
    }
  }

  recordScore(score: number, subject = this.subject, user = 'Unregistered') {
    this.quizService.addScore(score, subject, user).subscribe(res => {
      console.log('Score Successfully Recorded');
    });
  }

  onCheckboxChange(e: any) {
    console.log(e);
    const multiChoiceResponse: FormArray = this.form.get('multiChoiceResponse') as FormArray;
    if (e.checked) {
      multiChoiceResponse.push(new FormControl(e.source.name));
    } else {
      let i: number = 0;
      multiChoiceResponse.controls.forEach((item: any) => {
        if (item == e.source.name) {
          multiChoiceResponse.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    console.log(this.form.value)
  }

}

