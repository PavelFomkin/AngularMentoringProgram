import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  constructor(private actions$: Actions,
              private authService: AuthService) {
  }

  @Effect()
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap((props) =>
      this.authService.login(props.username, props.password).pipe(
        map(user => ({type: AuthActions.loginSuccess.type, user})),
        catchError(error => of({type: AuthActions.loginFail.type, error}))
      )
    )
  ));

  @Effect()
  refreshUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.refreshUserInfo),
    mergeMap((props) =>
      this.authService.getUserInfo(props.token).pipe(
        map(userInfo => ({type: AuthActions.setUser.type, user: userInfo})),
        catchError(() => of({type: AuthActions.removeUser.type}))
      )
    )
  ));
}
