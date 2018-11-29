import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../material.module';

import { NewTrainingComponent } from './new-training.component';

const newTrainingRoute: Routes = [
  {
    path: '',
    component: NewTrainingComponent
  }
];

@NgModule({
  declarations: [ NewTrainingComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(newTrainingRoute),
    MatCardModule,
    MatButtonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class NewTrainingLazyModule { }
