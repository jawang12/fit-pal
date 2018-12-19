import * as Auth from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
};

export function AuthReducer(state = initialState, action: Auth.AuthActions) {
  switch (action.type) {
    case Auth.AuthActionTypes.LOGIN:
      return {
        isAuthenticated: true
      };
    case Auth.AuthActionTypes.LOGOUT:
      return {
        isAuthenticated: false
      };
    default: return {
      ...state
    };
  }
}