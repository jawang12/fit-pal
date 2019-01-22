import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>(); // value is the element inside the array; array is assumed
  totalExercises: number;
  recordedExercisesSubscription: Subscription;
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromApp.AppState>
  ) {}

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.recordedExercisesSubscription = this.store
      .pipe(select(fromApp.getRecordedExercises))
      .subscribe((recordedExercises: Exercise[]) => {
        this.dataSource.data = recordedExercises;
        this.totalExercises = recordedExercises.length;
      });
    this.trainingService.fetchRecordedExercises();
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

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
