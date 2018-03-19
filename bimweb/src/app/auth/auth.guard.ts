// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }
  //ActivatedRouteSnapshot 将要激活的路由
  //RouterStateSnapsho 路由器当前状态

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.tokenValid) {
      return true;
    } else {
      // Send guarded route to redirect to after logging in
      this.auth.login(state.url);
      return false;
    }
  }

}