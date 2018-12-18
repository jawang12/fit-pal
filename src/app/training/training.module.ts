import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

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
    AngularFirestoreModule,
    SharedModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingModalComponent]
})

export class TrainingModule {

}