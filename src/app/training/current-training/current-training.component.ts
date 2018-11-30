import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingModalComponent } from './stop-training-modal.component';
import { Router } from '@angular/router';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer;
  message = `Give it all you've got. Strive for greatness!`;
  currentExercise: Exercise;

  constructor(private dialog: MatDialog, private router: Router, private trainingService: TrainingService) { }

  ngOnInit() {
    this.currentExercise = this.trainingService.getCurrentExercise();
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const duration = this.currentExercise.duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress === 50) {
        this.message = 'Almost there, keep pushing!';
      }
      if (this.progress === 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, duration);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingModalComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === 'no' ? this.startOrResumeTimer() : this.trainingService.cancelExercise(this.progress);
    });
  }

}
