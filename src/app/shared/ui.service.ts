import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // loadingStateStatus = new Subject<boolean>();

}