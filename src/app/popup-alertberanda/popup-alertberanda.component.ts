import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-alertberanda',
  templateUrl: './popup-alertberanda.component.html',
  styleUrls: ['./popup-alertberanda.component.css']
})
export class PopupAlertberandaComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupAlertberandaComponent>,
   
  ) {
   
  }
}
