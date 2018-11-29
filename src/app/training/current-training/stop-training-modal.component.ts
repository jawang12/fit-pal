import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training-modal',
  template: `<h1 mat-dialog-title>You're already {{ progressData.progress }}% there!</h1>
             <h5>Are you sure you want to stop?</h5>
             <mat-dialog-actions align="center">
               <button mat-button mat-dialog-close="yes">Yes</button>
               <button mat-button mat-dialog-close="no">No</button>
             </mat-dialog-actions>`
})

export class StopTrainingModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private progressData: { progress: number }) {}

}