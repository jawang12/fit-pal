import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})

export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>(); // value is the element inside the array; array is assumed
  totalExercises: number;
  recordedExercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.recordedExercisesSubscription = this.trainingService.recordedExercisesChanges.subscribe((recordedExercises: Exercise[]) => {
      this.dataSource.data = recordedExercises;
      this.totalExercises = recordedExercises.length;
    });
    this.trainingService.fetchRecordedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.recordedExercisesSubscription) {
      this.recordedExercisesSubscription.unsubscribe();
    }
  }

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}

/* viewchild is fetching from template and template isnt finished rendering during oninit
afterviewinit executes the after view is done rendering and initializing */