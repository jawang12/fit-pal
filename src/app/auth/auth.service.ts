import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { Verification } from './verification.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromApp from '../store/app.reducer';
import * as UI from '../store/ui/ui.actions';
import * as Auth from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // private isAuthenticated = false;
  // loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService,
              private store: Store<fromApp.AppState>) {}

  // listens to changes in the authentication status; emits event whenever the auth state changes
  authListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afAuth.auth.setPersistence('session')
        .then(() => {
          this.store.dispatch(new Auth.Login());
        })
        .catch(error => console.error(error));
      } else {
        this.trainingService.unsubAll();
        console.log('hit');
      }
    });
  }

  registerUser(creds: Verification) {
    this.store.dispatch(new UI.StartLoading());
    this.store.dispatch(new Auth.SignUp(creds.email, creds.password));
    /*
    this.afAuth.auth.createUserWithEmailAndPassword(creds.email, creds.password)
    .then(result => {
      console.log('user has been created', result);
      this.store.dispatch(new UI.StopLoading());
      this.router.navigate(['/training']);
    })
    .catch((error: Error) => {
      console.error(error);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.openSnackBar(error.message, null, 5000);
    });
    */
  }

  login(creds: Verification) {
    this.store.dispatch(new UI.StartLoading());
    this.store.dispatch(new Auth.LoginAttempt(creds.email, creds.password));
    /*
    this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
    .then(result => {
      console.log('user has successfully signed in', result);
      this.store.dispatch(new UI.StopLoading());
      this.router.navigate(['/training']);
    })
    .catch((error: Error) => {
      console.error('error signing in', error);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.openSnackBar(error.message, null, 5000);
    });
    */
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
  }
}
