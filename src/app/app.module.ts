import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { FlexLayoutModule} from '@angular/flex-layout';
import { TrainingModule } from './training/training.module';
import { AngularFireModule } from '@angular/fire';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { combinedReducers } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot(combinedReducers),
    MaterialModule,
    TrainingModule,
    AuthModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
