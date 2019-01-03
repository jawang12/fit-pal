import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ButtonExtDirective } from './signup/button-ext.directive';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ButtonExtDirective
  ],
  imports: [
    AngularFireAuthModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}