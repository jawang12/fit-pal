import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  LOGIN_FAIL = 'LOGIN_FAIL',
  SIGN_UP = 'SIGN_UP',
  SIGN_UP_FAIL = 'SIGN_UP_FAIL',
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

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGN_UP;
  constructor(public email: string, public password: string) {}
}

export class SignUpFail implements Action {
  readonly type = AuthActionTypes.SIGN_UP_FAIL;
}

export type AuthActions = Login | Logout | LoginAttempt;