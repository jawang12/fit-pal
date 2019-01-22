import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { NewTrainingComponent } from './new-training.component';

const newTrainingRoute: Routes = [
  {
    path: '',
    component: NewTrainingComponent,
    data: { animation: 'new' }
  }
];

@NgModule({
  declarations: [NewTrainingComponent],
  imports: [RouterModule.forChild(newTrainingRoute), SharedModule]
})
export class NewTrainingLazyModule {}
