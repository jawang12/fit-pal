import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // loadingStateStatus = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration
    });
  }
}
