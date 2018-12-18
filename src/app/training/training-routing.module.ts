import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { AuthGuard } from '../auth/auth.guard';

const trainingRoutes: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        loadChildren: './new-training/lazy.module#NewTrainingLazyModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'current',
        component: CurrentTrainingComponent
      },
      {
        path: 'past',
        loadChildren: './past-training/lazy.module#PastTrainingLazyModule',
        canLoad: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(trainingRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class TrainingRoutingModule {

}