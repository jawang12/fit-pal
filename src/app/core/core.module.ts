import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  exports: [
    AppRoutingModule
  ]
})

export class CoreModule { }
