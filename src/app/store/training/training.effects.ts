import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UiService } from '../../shared/ui.service';
import * as fromApp from '../app.reducer';
import * as UI from '../ui/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private uiService: UiService
  ) {}

  @Effect()
  fetchAllExercises = this.actions$.pipe(
    ofType(Training.TrainingActionTypes.FETCH_ALL_EXERCISES),
    switchMap((actionPayload: Training.FetchAllExercises) => {
      const allExercises = actionPayload.allExercises;
      this.store.dispatch(new UI.StopLoading());
      return [new Training.SetAvailableExercises(allExercises)];
    }),
    catchError(() => {
      return of(new Training.FailedFetchingExercises());
    })
  );

  @Effect({ dispatch: false })
  failedToGetExercises = this.actions$.pipe(
    ofType(Training.TrainingActionTypes.FAILED_FETCHING_EXERCISES),
    tap(() => {
      this.store.dispatch(new UI.StopLoading());
      this.store.dispatch(new Training.SetAvailableExercises(null));
      this.uiService.openSnackBar(
        'there was an error retrieving all exercises',
        null,
        5000
      );
    })
  );
}
