import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material/material.module';
import { NavigationComponent } from './navigation.component';
import { AuthService } from '@auth0/auth0-angular';
import { QuickTipsService } from '../quick_tips_dialog/quick_tips.service';
import { QuickTips } from '../quick_tips_dialog/quick_tips_dialog.component';
import { Observable, of } from 'rxjs'

class MockQuickTipsService  {
  getQuickTips(): Observable<QuickTips[]> {
    return of([
      {"id": 1, "text": "hahaha"},
      {"id": 2, "text": "hehehe"}
    ])
  }
}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let quickTipsServiceSpy: jasmine.SpyObj<QuickTipsService>


  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);

    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MaterialModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: QuickTipsService, useClass: MockQuickTipsService}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });





});
