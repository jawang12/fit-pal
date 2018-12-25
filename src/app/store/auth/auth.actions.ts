import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LoginAttempt implements Action {
  readonly type = AuthActionTypes.LOGIN_ATTEMPT;
  constructor(public username: string, public password: string) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
}

export type AuthActions = Login | Logout | LoginAttempt;