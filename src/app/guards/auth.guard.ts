import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private httpClient: HttpClient
  ) {}

  /**
   * For now it's not used, maybe later
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {( Promise<boolean> )}
   * @memberof AuthGuard
   */
  canActivate(): Promise<boolean> {
    return this.checkLogin();
  }

  /**
   * Check for the child route
   *
   * @param {ActivatedRouteSnapshot} childRoute
   * @param {RouterStateSnapshot} state
   * @returns {( Promise<boolean>)}
   * @memberof AuthGuard
   */
  canActivateChild(): Promise<boolean> {
    return this.checkLogin();
  }

  /**
   * Check if token exist
   *
   * @private
   * @param {string} url
   * @returns {boolean}
   * @memberof AuthGuard
   */
  private checkLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
