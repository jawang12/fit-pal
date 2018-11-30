import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Exercise[];

  constructor(private router: Router, private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getExercises();
  }

  startTraining(selected: MatSelect) {
    this.trainingService.startExercise(selected.value.id);
    this.router.navigate(['/', 'training', 'current']);
  }
}
