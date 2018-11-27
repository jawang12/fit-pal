import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';

const trainingRoutes: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    children: [
      {
        path: 'new',
        loadChildren: './new-training/lazy.module#NewTrainingLazyModule'
      },
      {
        path: 'current',
        component: CurrentTrainingComponent
      },
      {
        path: 'past',
        loadChildren: './past-training/lazy.module#PastTrainingLazyModule'
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