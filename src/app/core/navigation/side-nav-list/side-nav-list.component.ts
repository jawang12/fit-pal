import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../auth/auth.service';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})

export class SideNavListComponent implements OnInit {
  @Output() clickClose: EventEmitter<void> = new EventEmitter<void>();

  loggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(fromApp.getIsAuthenticated);
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.clickClose.emit();
  }
}