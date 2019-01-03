import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingModalComponent } from './current-training/stop-training-modal.component';
import { TrainingEffects } from '../store/training/training.effects';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingModalComponent
  ],
  imports: [
    AngularFirestoreModule,
    SharedModule,
    TrainingRoutingModule,
    EffectsModule.forFeature([TrainingEffects])
  ],
  entryComponents: [StopTrainingModalComponent]
})

export class TrainingModule {

}