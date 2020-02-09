import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../store/auth.state';
import {selectToken} from '../store/selectors/auth.selector';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<AuthState>,
              private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.store.select(selectToken).pipe(
      switchMap(token => {
        if (token === null) {
          this.router.navigate(['/login']);
          return of(false);
        }

        return this.authService.getUserInfo(token).pipe(
          map(() => true),
          catchError(() => of(false))
        );
      })
    );
  }
}
