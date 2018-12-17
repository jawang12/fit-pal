import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Verification } from '../verification.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  @ViewChild('signupForm') signupForm: NgForm;
  @ViewChild('emailInput') email: NgControl;

  maxDate: Date;
  isLoading = false;
  loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loadingSub = this.uiService.loadingStateStatus.subscribe(loadingStatus => {
      this.isLoading = loadingStatus;
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  onSubmit() {
    const { email, password } = this.signupForm.value;
    this.authService.registerUser(new Verification(email, password));
  }

  errorMessage() {
    return this.email.hasError('required') ? 'Please enter a email address' : this.email.hasError('email') ? 'The email you entered is invalid' : '';
  }
}
