import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingRoutingModule } from './training-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingModalComponent } from './current-training/stop-training-modal.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingModalComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    TrainingRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [StopTrainingModalComponent]
})

export class TrainingModule {

}