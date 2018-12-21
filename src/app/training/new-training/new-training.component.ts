import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  loading$: Observable<boolean>;

  constructor(private router: Router,
              public trainingService: TrainingService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.exercises$ = this.store.select(fromApp.getExercises);
    this.loading$ = this.store.select('ui').pipe(map(uiState => uiState.isLoading));
    this.trainingService.fetchAllExercises();
  }

  startTraining(selected: MatSelect) {
    this.trainingService.startExercise(selected.value.id);
    this.router.navigate(['/', 'training', 'current']);
  }
}
