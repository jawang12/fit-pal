import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingModalComponent } from './stop-training-modal.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer;
  message = `Give it all you've got. Strive for greatness!`;
  // currentExercise$: Observable<Exercise>;

  constructor(private dialog: MatDialog,
              private router: Router,
              private trainingService: TrainingService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.currentExercise$ = this.store.select(fromApp.getExerciseInProgress);
    // this.currentExercise$ = this.store.select('training').pipe(map(tState => tState.exerciseInProgress));
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromApp.getExerciseInProgress).pipe(take(1)).subscribe(exercise => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress === 50) {
          this.message = 'Almost there, keep pushing!';
        }
        if (this.progress === 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
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
