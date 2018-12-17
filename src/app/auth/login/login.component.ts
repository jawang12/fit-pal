import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Verification } from '../verification.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private uiService: UiService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.reactiveLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  errorMessage() {
    return this.reactiveLogin.get('email').hasError('required') ? 'Please enter a email address' :
    this.reactiveLogin.get('email').hasError('email') ? 'The email you entered is invalid' : '';
  }

  onSubmit() {
    const { email, password } = this.reactiveLogin.value;
    this.authService.login(new Verification(email, password));
  }

}
