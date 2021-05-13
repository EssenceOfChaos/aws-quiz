import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DESIGN_RESILIENT_ANSWERS, JAVASCRIPT_ANSWERS } from './answers';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { QuizService } from './quiz.service';
import { Title } from '@angular/platform-browser';

interface Answer {
  id: string;
  choice: [] | string
}
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
  quizProgressBar = 0;
  questions: Array<Question> = [];
  question!: Observable<Question>;
  answers: any;
  // answers = ANSWERS;
  index = 0;
  isAnswered = false;
  quizFinished = false;
  correctAnswers = 0;
  response!: string;
  userName!: string;
  subject = 'design_resilient'
  // state of user's choice ('unanswered', 'no', 'yes')
  correctAnswer = 'unanswered';
  form: FormGroup;

  constructor(
    private title: Title,
    private quizService: QuizService,
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute) {
      this.form = this.fb.group({
        multiChoiceResponse: this.fb.array([])
    })
  }

  ngOnInit() {
    console.log('ngOnInit Fired from QuizComponent.');
    this.title.setTitle(this.pageTitle);
    this.subject = this.route.snapshot.paramMap.get('subject') || 'design_resilient'

    this.quizService.getQuestions(this.subject).subscribe(res => {
      if (res) {
        console.log(res);
        this.questions = res.questions;
      }
    });

    this.userName = localStorage.getItem('user') || 'Unregistered'

    const subjects = {
      js: JAVASCRIPT_ANSWERS,
      design_resilient: DESIGN_RESILIENT_ANSWERS,

    };
    console.log(this.subject)
    this.answers = DESIGN_RESILIENT_ANSWERS

  }

  nextQuestion(i: number) {
    if (i >= this.questions.length) {
      i = 0;
    }
    this.question = of(this.questions[i]);
    this.index++;
    this.isAnswered = false;
    this.correctAnswer = 'unanswered';
    this.form.reset({});
    this.incrementProgressBar();
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
      this.recordScore(this.correctAnswers);
      this.router.navigate(['/leaderboard']);
    }
  }

  checkAnswer(choice: any) {
    // console.log(`The user has supplied the response ${choice}`);
    const answer = this.answers[this.index].choice;
    // console.log(`The correct answer to the question is ${answer}`);
    if (choice == answer) {
      this.correctAnswer = 'yes';
      this.correctAnswers = this.correctAnswers + 1;
    } else {
      this.correctAnswer = 'no';
    }
  }

  checkMultiAnswer(choices: []){
    let validResponse = choices.filter(function (response) {
      return response != null;
    });
    const answer = this.answers[this.index].choice;
    let targetNumber = 0
    let responsesLength = validResponse.length
    let answersLength = answer.length

    if (responsesLength === answersLength) {
      for (let choice of validResponse) {
        if (answer.includes(choice)) {
          targetNumber += 1
        }
      }

      if(targetNumber === answersLength) {
        this.correctAnswer = 'yes';
        this.correctAnswers = this.correctAnswers + 1;
      } else {
        this.correctAnswer = 'no';
      }
    }
  }

  recordScore(score: number, subject = this.subject, user = this.userName) {
    this.quizService.addScore(score, subject, user).subscribe(res => {
      console.log('Score Successfully Recorded');
    });
  }

  onCheckboxChange(e: any) {
    console.log(e);
    const multiChoiceResponse: FormArray = this.form.get('multiChoiceResponse') as FormArray;
    if (e.checked) {
      console.log(`${e.source.name}`)
      multiChoiceResponse.push(new FormControl(e.source.name));
    } else {
      let i: number = 0;
      multiChoiceResponse.controls.forEach((item: any) => {
        console.log(Object.keys(item))
        console.log(item.value)
        if (item.value == e.source.name) {
          console.log(`${e.source.name}`)
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

  incrementProgressBar() {
    // 20 questions means increment 5 per question
    this.quizProgressBar += 5
  }

}

