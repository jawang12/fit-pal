import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})

export class SideNavListComponent implements OnInit, OnDestroy {
  @Output() clickClose: EventEmitter<void> = new EventEmitter<void>();

  loggedIn = false;
  checkLoginStatus: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkLoginStatus = this.authService.loginStatus.subscribe((status: boolean) => {
      this.loggedIn = status;
    });
  }

  ngOnDestroy() {
    this.checkLoginStatus.unsubscribe();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  onClose() {
    this.clickClose.emit();
  }
}