import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { NavigationComponent } from './navigation.component';
import { AuthService } from '@auth0/auth0-angular';
import { QuickTipsService } from '../quick_tips_dialog/quick_tips.service';
import { QuickTips } from '../quick_tips_dialog/quick_tips_dialog.component';
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';

// export function getMockQuickTips(): Observable<QuickTips[]>  {
//   return of([
//     {"id": 1, "text": "hahaha"},
//     {"id": 2, "text": "hehehe"}
//   ])
// }
class MockQuickTipsService  {
  getQuickTips(): Observable<QuickTips[]> {
    return of([
      {"id": 1, "text": "hahaha"},
      {"id": 2, "text": "hehehe"}
    ])
  }
}

fdescribe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let quickTipsServiceSpy: jasmine.SpyObj<QuickTipsService>
  // let mockQuickTipsService: MockQuickTipsService


  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithRedirect']);
    quickTipsServiceSpy = jasmine.createSpyObj('QuickTipsService', ['getQuickTips'])

    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MaterialModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: QuickTipsService, useValue: quickTipsServiceSpy}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: fix test
  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  // Chrome Headless 91.0.4472.77 (Mac OS 10.15.7) NavigationComponent should compile FAILED
  //       TypeError: Cannot read property 'getQuickTips' of undefined
  //           at NavigationComponent.ngOnInit (src/app/navigation/navigation.component.ts:42:24)

  // it("should fetch data asynchronously", async () => {
  //   const mockQuickTips = of([{"id": 1, "text": "haha"}, {"id": 2, "text": "hehe"}])
  //   const quickTipsService = fixture.debugElement.injector.get(QuickTipsService);
  //   let spy = spyOn(quickTipsService, "getQuickTips").and.returnValue(
  //     mockQuickTips
  //   );
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.quick_tips).toBe(mockQuickTips);
  //   });
  // });


});
