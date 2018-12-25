import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, mergeMap, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as Auth from './auth.actions';
import * as UI from '../ui/ui.actions';
import * as fromApp from '../app.reducer';
import { UiService } from '../../shared/ui.service';

@Injectable()

export class AuthEffects {

  constructor(private actions$: Actions,
              private afa: AngularFireAuth,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private uiService: UiService) {}

  @Effect()
  loginAttempt = this.actions$
  .ofType(Auth.AuthActionTypes.LOGIN_ATTEMPT)
  .pipe(exhaustMap((actionPayload: Auth.LoginAttempt) => {
    const username = actionPayload.username;
    const password = actionPayload.password;
    return from(this.afa.auth.signInWithEmailAndPassword(username, password))
    .pipe(map(result => {
      console.log('user has logged in', result);
      this.store.dispatch(new UI.StopLoading());
      this.router.navigate(['/training']);
      return new Auth.Login();
    }),
    // catchError also needs to return an observable action type
    catchError(() => {
      return of(new Auth.LoginFail());
    }));
  }));

  // react to this action but don't send another
  @Effect({ dispatch: false })
  loginAttemptFail = this.actions$
  .ofType(Auth.AuthActionTypes.LOGIN_FAIL)
  .pipe(tap(() => {
    this.store.dispatch(new UI.StopLoading());
    this.uiService.openSnackBar('invalid login credentials', null, 5000);
  }));
}