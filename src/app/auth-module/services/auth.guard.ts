import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../store/auth.state';
import {refreshUserInfo, setRedirectUrl} from '../store/actions/auth.actions';
import {selectToken} from '../store/selectors/auth.selector';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<AuthState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.store.select(selectToken).pipe(
      distinctUntilChanged(),
      map(token => {
        if (token === null) {
          this.saveRedirectUrlAndNavigateToLoginPage(url);
          return false;
        }

        this.store.dispatch(refreshUserInfo({token})); // check that token is valid
        this.store.select(selectToken).pipe(
          map(token => {
            if (token === null) {
              this.saveRedirectUrlAndNavigateToLoginPage(url);
              return false;
            }
            return true;
          }));
      }));
  }

  private saveRedirectUrlAndNavigateToLoginPage(redirectUrl: string): void {
    // Store the attempted URL for redirecting
    this.store.dispatch(setRedirectUrl({redirectUrl}));
    this.router.navigate(['/login']);
  }

}
