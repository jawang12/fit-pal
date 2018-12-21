import * as uiActions from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initialState: UiState = {
  isLoading: false
};

export function UiReducer(state = initialState, action: uiActions.UiActions): UiState {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: action.isLoading
      };
    case 'STOP_LOADING':
      return {
        isLoading: action.isLoading
      };
    default: return {
      ...state
    };
  }
}