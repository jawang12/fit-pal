import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'training',
    // since we are lazy loading this module, we do not have to add TrainingModule to any imports
    loadChildren: './training/training.module#TrainingModule'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}