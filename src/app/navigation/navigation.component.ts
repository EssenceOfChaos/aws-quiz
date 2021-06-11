import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuickTipsDialogComponent } from '../quick_tips_dialog/quick_tips_dialog.component';
import { QuickTipsService } from '../quick_tips_dialog/quick_tips.service';
import { TilePosition } from '@angular/material/grid-list/tile-coordinator';

export interface QuickTips {
  id: number;
  text: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  quick_tips: QuickTips[] = []

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT)
    public document: Document,
    public auth: AuthService,
    public dialog: MatDialog,
    private tipsService: QuickTipsService
    ) {}
    ngOnInit() {
      console.log('NavigationComponent: ngOnInit')
      this.tipsService.getQuickTips().subscribe(res => this.quick_tips = res)
    }


  openDialog() {
    let tip = this.pickRandom(this.quick_tips)
    console.log(tip);
    this.dialog.open(QuickTipsDialogComponent, {
      data: {
        id: tip.id,
        text: tip.text
      },
      height: '300px',
      width: '400px',
    });
  }


  logout(returnToObject: any) {
    localStorage.clear();
    this.auth.logout(returnToObject)
  }

  private pickRandom(tips: any) {
    let len = tips.length
    let num = Math.floor(Math.random() * len)
    console.log(tips[num])
    return tips[num]
  }

}

