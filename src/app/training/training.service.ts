import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UiService } from '../shared/ui.service';
import { Exercise } from './exercise.model';
import * as fromApp from '../store/app.reducer';
import * as UI from '../store/ui/ui.actions';
import * as Training from '../store/training/training.actions';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  activeSubs: Subscription[] = [];

  constructor(private router: Router,
              private afs: AngularFirestore,
              private store: Store<fromApp.AppState>,
              private uiService: UiService) {}

  startExercise(id: string) {
    this.store.dispatch(new Training.StartExercise(id));
  }

  fetchAllExercises() {
    // this subscription is managed automatically
    this.store.dispatch(new UI.StartLoading());
    this.activeSubs.push(this.afs.collection('exercises').snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(obj => {
        const id = obj.payload.doc.id;
        const exerciseDetail = obj.payload.doc.data();
        return new Exercise(id, exerciseDetail['name'], exerciseDetail['duration'], exerciseDetail['calories']);
      });
    })
    ).subscribe((pipedDocArray: Exercise[]) => {
      this.store.dispatch(new Training.SetAvailableExercises(pipedDocArray));
      this.store.dispatch(new UI.StopLoading());
    }, error => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetAvailableExercises(null));
      this.uiService.openSnackBar('there was an error retrieving all exercises', null, 5000);
    }));
  }

  fetchRecordedExercises() {
    this.activeSubs.push(this.afs.collection('recordedExercises').valueChanges()
    .subscribe((recordedExercises: Exercise[]) => {
      this.store.dispatch(new Training.SetRecordedExercises(recordedExercises));
    }));
  }

  completeExercise() {
    this.store.select(fromApp.getExerciseInProgress).pipe(take(1)).subscribe(exerciseInProgress => {
      const { id, name, duration, calories } = exerciseInProgress;
      this.dbAddRecordedExercise({
        id,
        name,
        duration,
        calories,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.FinishExercise());
      this.router.navigate(['/training/new']);
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromApp.getExerciseInProgress).pipe(take(1)).subscribe(exerciseInProgress => {
      const { id, name, duration, calories } = exerciseInProgress;
      this.dbAddRecordedExercise({
        id,
        name,
        duration: +(duration * (progress / 100)).toFixed(2),
        calories: Number((calories * (progress / 100)).toFixed(2)),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.FinishExercise());
      this.router.navigate(['/training/new']);
    });
  }

  dbAddRecordedExercise(exercise: Exercise) {
    // this.afs.collection('recordedExercises').doc('exampleIdName').set(exercise);
    this.afs.collection('recordedExercises').add(exercise)
    .catch(error => console.error(error, 'error adding to the database'));
  }

  unsubAll() {
    this.activeSubs.forEach(sub => {
      sub.unsubscribe();
    });
    this.activeSubs = [];
  }
}