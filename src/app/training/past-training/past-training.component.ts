import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})

export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>(); // value is the element inside the array; array is assumed
  totalExercises: number;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.getRecordedExercises();
    this.totalExercises = this.trainingService.getRecordedExercises().length;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}

/* viewchild is fetching from template and template isnt finished rendering during oninit
afterviewinit executes the after view is done rendering and initializing */