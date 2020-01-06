import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {authActions, LoginAction, SetErrorAction, SetUserInfoAction} from '../actions/auth.actions';
import {catchError, exhaustMap, finalize, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from "../auth.state";
import {Router} from "@angular/router";
import {LoaderService} from "../../../core-module/services/loader.service";

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private store: Store<AuthState>,
              private router: Router,
              private loader: LoaderService) {
  }

  @Effect()
  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    tap(() => this.loader.turnLoaderOn()),
    exhaustMap((action: LoginAction) =>
      this.authService.login(action.payload.username, action.payload.password).pipe(
        switchMap(resp => {
          return this.authService.getUserInfo(resp.body.token).pipe(
            map(resp => {
              this.router.navigateByUrl('');
              return new SetUserInfoAction(resp.body)
            }),
            finalize(() => this.loader.turnLoaderOff()),
            catchError(resp => of(new SetErrorAction(resp.error))),
          );
        }),
        finalize(() => this.loader.turnLoaderOff()),
        catchError(resp => of(new SetErrorAction(resp.error))),
      )
    )
  ));
}
