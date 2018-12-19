import { Action } from '@ngrx/store';

export enum UiActionTypes {
  START_LOADING = 'START_LOADING',
  STOP_LOADING = 'STOP_LOADING'
}

export class StartLoading implements Action {
  readonly type = UiActionTypes.START_LOADING;
  isLoading = true;
}

export class StopLoading implements Action {
  readonly type = UiActionTypes.STOP_LOADING;
  isLoading = false;
}

export type UiActions = StartLoading | StopLoading; // exporting our own type