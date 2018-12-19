import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../auth/auth.service';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn$: Observable<boolean>;

  @ViewChild('menu') menu: MatIcon;
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(fromApp.getIsAuthenticated);
  }

  toggle() {
    this.toggleSidebar.emit();
    this.menu._elementRef.nativeElement.blur();
  }

  logout() {
    this.authService.logout();
  }

}
