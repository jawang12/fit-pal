import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveLogin: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.reactiveLogin = this.fb.group({
      'username': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  errorMessage() {
    return this.reactiveLogin.get('username').hasError('required') ? 'Please enter a email address' :
    this.reactiveLogin.get('username').hasError('email') ? 'The email you entered is invalid' : '';
  }

  onSubmit() {
    console.log(this.reactiveLogin);
  }

}
