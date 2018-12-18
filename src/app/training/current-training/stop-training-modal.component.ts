import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training-modal',
  template: `<h1 mat-dialog-title>You're already {{ progressData.progress }}% there!</h1>
             <p style="text-align: center">Are you sure you want to stop?</p>
             <mat-dialog-actions align="center">
               <button mat-button mat-dialog-close="yes">Yes</button>
               <button mat-button mat-dialog-close="no">No</button>
             </mat-dialog-actions>`
})

export class StopTrainingModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public progressData: { progress: number }) {}

}