import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UiService } from '../shared/ui.service';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {
  private exercises: Exercise[];
  private exerciseInProgress: Exercise;
  private recordedExercises: Exercise[];
  exercisesChanges = new Subject<Exercise[]>();
  recordedExercisesChanges = new Subject<Exercise[]>();
  activeSubs: Subscription[] = [];

  constructor(private router: Router, private afs: AngularFirestore, private uiService: UiService) {}

  startExercise(id: string) {
    this.exerciseInProgress = this.exercises.find(exercise => exercise.id === id);
  }

  fetchAllExercises() {
    // this subscription is managed automatically
    this.uiService.loadingStateStatus.next(true);
    this.activeSubs.push(this.afs.collection('exercises').snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(obj => {
        const id = obj.payload.doc.id;
        const exerciseDetail = obj.payload.doc.data();
        return new Exercise(id, exerciseDetail['name'], exerciseDetail['duration'], exerciseDetail['calories']);
      });
    })
    ).subscribe((pipedDocArray: Exercise[]) => {
      this.exercises = pipedDocArray;
      this.exercisesChanges.next(this.exercises.slice()); // pass a copy so that original array remains immutable
      this.uiService.loadingStateStatus.next(false);
    }, (error) => {
      console.log(error, 'error fetching exercises');
    }));
  }

  fetchRecordedExercises() {
    this.activeSubs.push(this.afs.collection('recordedExercises').valueChanges()
    .subscribe((recordedExercises: Exercise[]) => {
      this.recordedExercises = recordedExercises;
      this.recordedExercisesChanges.next(this.recordedExercises.slice());
    }));
  }

  getCurrentExercise() {
    return { ...this.exerciseInProgress };
  }

  completeExercise() {
    const { id, name, duration, calories } = this.exerciseInProgress;
    this.dbAddRecordedExercise({
      id,
      name,
      duration,
      calories,
      date: new Date(),
      state: 'completed'
    });
    this.router.navigate(['/training/new']);
  }

  cancelExercise(progress: number) {
    const { id, name, duration, calories } = this.exerciseInProgress;
    this.dbAddRecordedExercise({
      id,
      name,
      duration: +(duration * (progress / 100)).toFixed(2),
      calories: Number((calories * (progress / 100)).toFixed(2)),
      date: new Date(),
      state: 'cancelled'
    });
    this.router.navigate(['/training/new']);
  }

  dbAddRecordedExercise(exercise: Exercise) {
    this.afs.collection('recordedExercises').doc('example').set(exercise)
    .catch(error => console.error(error, 'error adding to the database'));
  }

  unsubAll() {
    this.activeSubs.forEach(sub => {
      sub.unsubscribe();
    });
    this.activeSubs = [];
  }
}