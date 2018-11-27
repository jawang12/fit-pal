import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';

const trainingRoutes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: 'new',
        component: NewTrainingComponent
      },
      {
        path: 'current',
        component: CurrentTrainingComponent
      },
      {
        path: 'past',
        component: PastTrainingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(trainingRoutes)],
  exports: [RouterModule]
})

export class TrainingRoutingModule {

}