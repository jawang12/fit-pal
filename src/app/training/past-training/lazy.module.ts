import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PastTrainingComponent } from './past-training.component';

const pastTrainingRoutes: Routes = [
  {
    path: '',
    component: PastTrainingComponent
  }
];

@NgModule({
  declarations: [ PastTrainingComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(pastTrainingRoutes)
  ]
})

export class PastTrainingLazyModule { }
