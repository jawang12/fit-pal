import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forChild(newTrainingRoute)
  ]
})
export class NewTrainingLazyModule { }
