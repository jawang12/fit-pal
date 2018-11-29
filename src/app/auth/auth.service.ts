import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { Verification } from './verification.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: User;
  loginStatus: Subject<boolean> = new Subject<boolean>();

  registerUser(creds: Verification) {
    this.user = new User(creds.email, Math.round(Math.random() * 10000).toString());
    this.loginStatus.next(true);
  }

  login(creds: Verification) {
    this.user = new User(creds.email, Math.round(Math.random() * 10000).toString());
    this.loginStatus.next(true);
  }

  getUser() {
    return { ...this.user }; // returns new user object since objects are pass by ref;
  }

  logout() {
    this.user = null;
    this.loginStatus.next(false);
  }

  isAuthenticated() {
    return Boolean(this.user); // this.user !== null
  }
}