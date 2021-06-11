import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { NavigationComponent } from './navigation.component';
import { AuthService } from '@auth0/auth0-angular';
import { QuickTipsService } from '../quick_tips_dialog/quick_tips.service';
import { of } from 'rxjs'

class MockQuickTipsService {
  getQuickTips() {
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
  // let quickTipsService: jasmine.SpyObj<QuickTipsService>
  let mockQuickTipsService: MockQuickTipsService


  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);
    // quickTipsService = jasmine.createSpyObj('QuickTipsService', ['getQuickTips'])

    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MaterialModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: QuickTipsService, useValue: mockQuickTipsService}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
// TODO: fix test
  // it('should compile', () => {
  //   expect(component).toBeTruthy();
  // });
});
