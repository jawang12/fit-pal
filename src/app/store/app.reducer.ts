import { UiReducer, UiState } from './ui/ui.reducer';
import { AuthReducer, AuthState } from './auth/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const combinedReducers: ActionReducerMap<AppState> = {
  ui: UiReducer,
  auth: AuthReducer
};

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
