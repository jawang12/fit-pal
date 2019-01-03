import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { Verification } from '../verification.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') signupForm: NgForm;
  @ViewChild('emailInput') email: NgControl;

  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.isLoading$ = this.store.pipe(select(fromApp.getIsLoading));
  }

  onSubmit() {
    const { email, password } = this.signupForm.value;
    this.authService.registerUser(new Verification(email, password));
  }

  errorMessage() {
    return this.email.hasError('required')
      ? 'Please enter a email address'
      : this.email.hasError('email')
      ? 'The email you entered is invalid'
      : '';
  }

  validate() {
    if (!this.signupForm) {
      return true;
    }
    if (!this.signupForm.valid) {
      return true;
    }
    return false;
  }
}
