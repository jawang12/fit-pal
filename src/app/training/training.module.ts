import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from '../material.module';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    TrainingRoutingModule
  ]
})

export class TrainingModule {

}