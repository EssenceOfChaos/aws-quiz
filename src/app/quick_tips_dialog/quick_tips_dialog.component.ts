
import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface QuickTips {
  id: number;
  text: string;
}

@Component({
  selector: 'app-quick-tips',
  templateUrl: 'quick_tips_dialog.component.html',
  styleUrls: ['./quick_tips_dialog.component.css']
})
export class QuickTipsDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: QuickTips) {}
  ngOnInit() {
    console.log('[QuickTipsDialogComponent]:ngOnInit ')
  }
}
