import { Action } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as Training from './training.actions';
import { Exercise } from '../../training/exercise.model';

export interface TrainingState {
  exercises: Exercise[];
  recordedExercises: Exercise[];
  exerciseInProgress: Exercise;
}

// export interface TrainingFeature extends fromApp.AppState {  --> for typing purposes when injecting Store<>
//   training: TrainingState;
// }

export const initialState: TrainingState = {
  exercises: [],
  recordedExercises: [],
  exerciseInProgress: null
};

export function TrainingReducer(state = initialState, action: Training.TrainingActions): TrainingState {
  switch (action.type) {
    case Training.TrainingActionTypes.SET_AVAILABLE_EXERCISES:
      return Object.assign({}, state, { exercises: action.exercises });
    case Training.TrainingActionTypes.SET_RECORDED_EXERCISES:
      return {
        ...state,
        recordedExercises: action.recordedExercises
      };
    case Training.TrainingActionTypes.START_EXERCISE:
      const exerciseInProgress = { ...state.exercises.find(exercise => exercise.id === action.id) };
      return Object.assign({}, state, { exerciseInProgress });
    case Training.TrainingActionTypes.FINISH_EXERCISE:
      return Object.assign({}, state, { exerciseInProgress: null });
    default:
      return state;
  }
}
