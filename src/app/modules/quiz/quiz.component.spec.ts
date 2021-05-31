import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { QuizComponent } from './quiz.component';
import { Title } from '@angular/platform-browser';
import { QuizService } from './quiz.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from "src/app/modules/material/material.module";

describe('QuizComponent', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;
  let formBuilder: FormBuilder;

  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, MaterialModule],
      declarations: [ QuizComponent ],
      providers: [Title, QuizService, FormBuilder]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
