import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercisesSub: Subscription;
  exercises: Exercise[];
  loading$: Observable<boolean>;

  constructor(private router: Router,
              public trainingService: TrainingService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.exercisesSub = this.trainingService.exercisesChanges.subscribe(updatedExercises => {
      this.exercises = updatedExercises;
    });
    this.loading$ = this.store.select('ui').pipe(map(uiState => uiState.isLoading));
    this.trainingService.fetchAllExercises();
  }

  ngOnDestroy() {
    if (this.exercisesSub) {
      this.exercisesSub.unsubscribe();
    }
  }

  startTraining(selected: MatSelect) {
    this.trainingService.startExercise(selected.value.id);
    this.router.navigate(['/', 'training', 'current']);
  }
}
