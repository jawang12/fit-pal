import { Component, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menu') menu: MatIcon;
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  loggedIn = false;
  checkLoginStatus: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkLoginStatus = this.authService.loginStatus.subscribe((status: boolean) => {
      this.loggedIn = status;
    });
    console.log(this.loggedIn, typeof this.loggedIn);
  }

  ngOnDestroy() {
    this.checkLoginStatus.unsubscribe();
  }

  toggle() {
    this.toggleSidebar.emit();
    this.menu._elementRef.nativeElement.blur();
  }

  logout() {
    this.authService.logout();
  }

}
