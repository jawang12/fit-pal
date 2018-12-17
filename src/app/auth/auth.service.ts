import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from './user.model';
import { Verification } from './verification.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService,
              private snackbar: MatSnackBar) {}

  // listens to changes in the authentication status; emits event whenever the auth state changes
  authListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afAuth.auth.setPersistence('session')
        .then(() => {
          this.isAuthenticated = true;
          this.loginStatus.next(true);
        })
        .catch(error => console.error(error));
      } else {
        this.trainingService.unsubAll();
        this.isAuthenticated = false;
        this.loginStatus.next(false);
      }
    });
  }

  registerUser(creds: Verification) {
    this.uiService.loadingStateStatus.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(creds.email, creds.password)
    .then(result => {
      console.log('user has been created', result);
      this.uiService.loadingStateStatus.next(false);
      this.router.navigate(['/training']);
    })
    .catch((error: Error) => {
      console.error(error);
      this.uiService.loadingStateStatus.next(false);
      this.snackbar.open(error.message, null, {
        duration: 5000
      });
    });
  }

  login(creds: Verification) {
    this.uiService.loadingStateStatus.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
    .then(result => {
      console.log('user has successfully signed in', result);
      this.uiService.loadingStateStatus.next(false);
      this.router.navigate(['/training']);
    })
    .catch((error: Error) => {
      console.error('error signing in', error);
      this.uiService.loadingStateStatus.next(false);
      this.snackbar.open(error.message, null, {
        duration: 5000
      });
    });
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(result => {
      console.log('signed out', result);
      this.router.navigate(['/']);
    })
    .catch((error: Error) => {
      console.error(error, 'error on signout');
      this.snackbar.open(error.message, null, {
        duration: 5000
      });
    });
  }

  authStatus() {
    return this.isAuthenticated;
  }
}
