import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Route, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, map, tap } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../store/auth/auth.reducer';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    return this.store.select('auth').pipe(take(1), map((status: fromAuth.AuthState) => {
      if (status.isAuthenticated) {
        return true; // returns Observable<true>
      } else {
        this.router.navigate(['/']);
      }
    }));
  }

  canLoad(route: Route): Promise<boolean> | Observable<boolean> | boolean {
    return this.store.select(fromApp.getIsAuthenticated).pipe(take(1), tap(status => {
      if (!status) {
        this.router.navigate(['/']);
      }
    }));
  }
}