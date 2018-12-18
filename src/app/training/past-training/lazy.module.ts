import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
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
    SharedModule,
    RouterModule.forChild(pastTrainingRoutes)
  ]
})

export class PastTrainingLazyModule { }
