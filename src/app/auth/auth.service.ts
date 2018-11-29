import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';
import { Verification } from './verification.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: User;
  loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(creds: Verification) {
    this.user = new User(creds.email, Math.round(Math.random() * 10000).toString());
    this.loginStatus.next(true);

    this.router.navigate(['/training']);
  }

  login(creds: Verification) {
    this.user = new User(creds.email, Math.round(Math.random() * 10000).toString());
    this.loginStatus.next(true);

    this.router.navigate(['/training']);
  }

  getUser() {
    const { email, userId } = this.user;
    return new User(email, userId); // returns new user object since objects are pass by ref;
  }

  logout() {
    this.user = null;
    this.loginStatus.next(false);

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return Boolean(this.user); // this.user !== null
  }
}