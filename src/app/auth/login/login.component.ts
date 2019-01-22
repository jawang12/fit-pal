import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { Verification } from '../verification.model';
import * as fromApp from '../../store/app.reducer';
import * as fromUi from '../../store/ui/ui.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveLogin: FormGroup;
  loading$: Observable<fromUi.UiState>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.initForm();
    this.loading$ = this.store.pipe(select('ui'));
  }

  private initForm() {
    this.reactiveLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  errorMessage() {
    return this.reactiveLogin.get('email').hasError('required')
      ? 'Please enter a email address'
      : this.reactiveLogin.get('email').hasError('email')
      ? 'The email you entered is invalid'
      : '';
  }

  isValidEmail() {
    return this.reactiveLogin.get('email').invalid;
  }

  onSubmit() {
    const { email, password } = this.reactiveLogin.value;
    this.authService.login(new Verification(email, password));
  }
}
