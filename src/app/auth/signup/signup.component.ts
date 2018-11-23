import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, NgControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('signupForm') signupForm: NgForm;
  @ViewChild('emailInput') email: NgControl;

  maxDate: Date;

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  errorMessage() {
    return this.email.hasError('required') ? 'Please enter a email address' : this.email.hasError('email') ? 'The email you entered is invalid' : '';
  }
}
