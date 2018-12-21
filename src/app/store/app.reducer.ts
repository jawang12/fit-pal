import { UiReducer, UiState } from './ui/ui.reducer';
import { AuthReducer, AuthState } from './auth/auth.reducer';
import { TrainingReducer, TrainingState } from './training/training.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  ui: UiState;
  auth: AuthState;
  training: TrainingState;
}

export const combinedReducers: ActionReducerMap<AppState> = {
  ui: UiReducer,
  auth: AuthReducer,
  training: TrainingReducer
};

/******* Helpers *****/

// Alternative to easily gain access to the UiState in a component
// returns the actual selected state object with current values
const getUiState = createFeatureSelector<UiState>('ui');

// Takes the state returned from getUiState and returns a value
// second parameter is the returned result/state from the first
export const getIsLoading = createSelector(getUiState, (state: UiState) => {
  return state.isLoading;
});

const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuthenticated = createSelector(getAuthState, (authState => authState.isAuthenticated));

const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getExercises = createSelector(getTrainingState, (trainingState => trainingState.exercises));
export const getRecordedExercises = createSelector(getTrainingState, (trainingState => trainingState.recordedExercises));
export const getExerciseInProgress = createSelector(getTrainingState, (trainingState => trainingState.exerciseInProgress));