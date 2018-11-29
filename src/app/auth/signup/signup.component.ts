import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Verification } from '../verification.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupForm') signupForm: NgForm;
  @ViewChild('emailInput') email: NgControl;

  maxDate: Date;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit() {
    const { email, password } = this.signupForm.value;
    this.authService.registerUser(new Verification(email, password));
  }

  errorMessage() {
    return this.email.hasError('required') ? 'Please enter a email address' : this.email.hasError('email') ? 'The email you entered is invalid' : '';
  }
}
