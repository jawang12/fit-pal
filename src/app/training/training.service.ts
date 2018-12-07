import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {
  private exercises: Exercise[] = [
    new Exercise('push-ups', 'Push Ups', 30, 10),
    new Exercise('burpees', 'Burpees', 120, 25),
    new Exercise('crunches', 'Crunches', 60, 10),
    new Exercise('squats', 'Squats', 30, 7)
  ];

  private exerciseInProgress: Exercise;
  private recordedExercises: Exercise[] = [];

  constructor(private router: Router) {}

  startExercise(id: string) {
    this.exerciseInProgress = this.exercises.find(exercise => exercise.id === id);
  }

  getExercises() {
    return [ ...this.exercises ];
  }

  getRecordedExercises() {
    return this.recordedExercises.slice();
  }

  getCurrentExercise() {
    return { ...this.exerciseInProgress };
  }

  completeExercise() {
    const { id, name, duration, calories } = this.exerciseInProgress;
    this.recordedExercises.push(new Exercise(id, name, duration, calories, new Date(), 'completed'));
    this.router.navigate(['/training/new']);
  }

  cancelExercise(progress: number) {
    const { id, name, duration, calories } = this.exerciseInProgress;
    this.recordedExercises.push(
      new Exercise(id, name, +(duration * (progress / 100)).toFixed(2), Number((calories * (progress / 100)).toFixed(2)), new Date(), 'cancelled')
    );
    this.router.navigate(['/training/new']);
  }
}