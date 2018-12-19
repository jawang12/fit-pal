import { UiReducer, UiState } from './ui/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  ui: UiState;
}

export const combinedReducers: ActionReducerMap<AppState> = {
  ui: UiReducer
};

// Alternative to gain access to the UiState in components
// returns the actual selected state object with current values
export const getUiState = createFeatureSelector<UiState>('ui');

// Takes the state returned from getUiState and returns a value
// second parameter is the returned result/state from the first
export const getIsLoading = createSelector(getUiState, (state: UiState) => {
  return state.isLoading;
});