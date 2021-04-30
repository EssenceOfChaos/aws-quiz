import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

// interface User {
// nickname: string;
// name: string;
// picture: string;
// updated_at: string;
// email: string;
// email_verified: string;
// sub: string;
// }
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  private profileJson: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, @Inject(DOCUMENT)
    public document: Document,
    public auth: AuthService
    ) {}
    ngOnInit() {
      this.auth.user$.subscribe(
        (profile) => {
          (this.profileJson = profile)
        }
      );
    }

get currentUser() {
  return this.profileJson.name
}

storeCurrentUser() {
  localStorage.setItem('user', this.currentUser)
}

}

