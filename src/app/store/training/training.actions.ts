import { Action } from '@ngrx/store';
import { Exercise } from '../../training/exercise.model';

export enum TrainingActionTypes {
  SET_AVAILABLE_EXERCISES = '[Training] Set Available Exercises',
  SET_RECORDED_EXERCISES = '[Training] Set Recorded Exercises',
  START_EXERCISE = '[Training] Start Exercise',
  FINISH_EXERCISE = '[Training] Finish Exercise'
}

export class SetAvailableExercises implements Action {
  readonly type = TrainingActionTypes.SET_AVAILABLE_EXERCISES;
  constructor(public exercises: Exercise[]) {}
}

export class SetRecordedExercises implements Action {
  readonly type = TrainingActionTypes.SET_RECORDED_EXERCISES;
  constructor(public recordedExercises: Exercise[]) {}
}

export class StartExercise implements Action {
  readonly type = TrainingActionTypes.START_EXERCISE;
  constructor(public id: string) {}
}

export class FinishExercise implements Action {
  readonly type = TrainingActionTypes.FINISH_EXERCISE;
}

export type TrainingActions =
SetAvailableExercises |
SetRecordedExercises |
StartExercise |
FinishExercise;
