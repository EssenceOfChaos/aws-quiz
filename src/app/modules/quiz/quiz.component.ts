import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  DESIGN_PERFORMANT_ANSWERS,
  DESIGN_RESILIENT_ANSWERS,
  DESIGN_SECURE_ANSWERS,
  DESIGN_COST_OPTIMIZED_ANSWERS
} from './answers';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { MatRadioChange } from '@angular/material/radio';
import { QuizService } from './quiz.service';
import { Title } from '@angular/platform-browser';

interface Answer {
  id: number;
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
  // responseSelected = false;
  index = 0;
  isAnswered = false;
  quizFinished = false;
  correctAnswers = 0;
  response!: string;
  userName!: string;
  subject: any;
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
    this.subject = this.route.snapshot.paramMap.get('subject');
    console.log(`Beginning quiz on the subject: ${this.subject}`)

    this.quizService.getQuestions(this.subject).subscribe(res => {
      if (res) {
        this.shuffleQuestions(res.questions);
      }
    });

    this.userName = localStorage.getItem('user') || 'Unregistered'

    // select answers based on the subject
    if (this.subject == 'design_resilient') {
      this.answers = DESIGN_RESILIENT_ANSWERS
    } else if (this.subject == 'design_performant') {
      this.answers = DESIGN_PERFORMANT_ANSWERS
    } else if (this.subject == 'design_secure') {
      this.answers = DESIGN_SECURE_ANSWERS
    } else if (this.subject == 'design_cost_optimized') {
      this.answers = DESIGN_COST_OPTIMIZED_ANSWERS
    }

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

  submitChoice(response: any, multiResponse=false, questionId: number) {
    console.log(this.index, response, questionId);

    if (multiResponse) {
      this.checkMultiAnswer(response.multiChoiceResponse, questionId)
    } else {
      this.checkAnswer(response, questionId);
    }

    this.isAnswered = true;

    // is it the end of the quiz?
    if (this.index === this.questions.length - 1) {
      this.quizFinished = true;
      this.recordScore(this.correctAnswers);
      this.router.navigate(['/leaderboard']);
    }
  }

  checkAnswer(choice: any, questionId: number) {
    const answer = this.answers.find((a: Answer) => a.id == questionId)

    if (choice == answer.choice) {
      this.correctAnswer = 'yes';
      this.correctAnswers = this.correctAnswers + 1;
    } else {
      this.correctAnswer = 'no';
    }
  }

  checkMultiAnswer(choices: [], questionId: number){
    let validResponse = choices.filter(function (response) {
      return response != null;
    });
    const answer = this.answers.find((a: Answer) => a.id == questionId)
    let targetNumber = 0
    let responsesLength = validResponse.length
    let answersLength = answer.choice.length

    if (responsesLength === answersLength) {
      for (let choice of validResponse) {
        if (answer.choice.includes(choice)) {
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
    const multiChoiceResponse: FormArray = this.form.get('multiChoiceResponse') as FormArray;
    // console.log(multiChoiceResponse);
    // if (multiChoiceResponse.value.length == 2) {
    //   this.responseSelected = true;
    // }
    if (e.checked) {
      // console.log(`${e.source.name}`)
      multiChoiceResponse.push(new FormControl(e.source.name));
    } else {
      let i: number = 0;
      multiChoiceResponse.controls.forEach((item: any) => {
        // console.log(Object.keys(item))
        // console.log(item.value)
        if (item.value == e.source.name) {
          // console.log(`${e.source.name}`)
          multiChoiceResponse.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  shuffleQuestions(arrayOfQuestions: Question[]) {
    for(let i = arrayOfQuestions.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = arrayOfQuestions[i]
      arrayOfQuestions[i] = arrayOfQuestions[j]
      arrayOfQuestions[j] = temp
    }
    this.questions = arrayOfQuestions
  }
  /** TODO:increment progress by this.questions.length / 100 */
  incrementProgressBar() {
    // 20 questions means increment 5 per question
    this.quizProgressBar += 5
  }

  logToConsole(event: MatRadioChange) {
    // console.log(event);
    // if (this.responseSelected) {
    //   this.responseSelected = false;
    // } else {
    //   this.responseSelected = true;
    // }

  }

}

