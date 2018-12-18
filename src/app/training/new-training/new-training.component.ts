import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { UiService } from '../../shared/ui.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercisesSub: Subscription;
  exercises: Exercise[];

  constructor(private router: Router,
              public trainingService: TrainingService,
              public uiService: UiService) { }

  ngOnInit() {
    this.exercisesSub = this.trainingService.exercisesChanges.subscribe(updatedExercises => {
      this.exercises = updatedExercises;
    });
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
