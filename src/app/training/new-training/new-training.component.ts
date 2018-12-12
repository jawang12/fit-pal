import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(private router: Router, protected trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchAllExercises();
  }

  startTraining(selected: MatSelect) {
    this.trainingService.startExercise(selected.value.id);
    this.router.navigate(['/', 'training', 'current']);
  }
}
