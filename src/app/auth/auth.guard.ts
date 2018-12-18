import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Route, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private authService: AuthService) {}

  // canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
  //   if (this.authService.authStatus) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/']);
  //   }
  // }

  canLoad(route: Route): Promise<boolean> | Observable<boolean> | boolean {
    if (this.authService.authStatus()) {
      return true;
    } else {
      this.router.navigate(['/training']);
    }
  }
}