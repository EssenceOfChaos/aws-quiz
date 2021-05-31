import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  // private profileJson: any;

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
      console.log('NavigationComponent: ngOnInit')
    }

// get currentUser() {
//   return this.profileJson.name
// }

// storeCurrentUser() {
//   localStorage.setItem('user', this.currentUser)
// }

logout(returnToObject: any) {
  localStorage.clear();
  this.auth.logout(returnToObject)
}

}

