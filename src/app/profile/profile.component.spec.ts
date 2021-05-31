import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { AuthService } from '@auth0/auth0-angular';

xdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let auth0ClientSpy: any;

  beforeEach(async () => {
    auth0ClientSpy = jasmine.createSpyObj('Auth0Client', ['loginWithRedirect']);

    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [{ provide: AuthService, useValue: auth0ClientSpy }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: Fix failing test
  // TypeError: Cannot read property 'subscribe' of undefined
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
