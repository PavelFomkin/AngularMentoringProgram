import {Action} from '@ngrx/store';
import {User} from '../../models/user';

export enum authActions {
  login = '[Auth] Log in',
  setUserInfo = '[Auth] Set user info',
  setError = '[Auth] Set error',
  logout = '[Auth] Log out',
}

export class LoginAction implements Action {
  readonly type: string = authActions.login;
  constructor(public payload: { username: string, password: string }) { }
}

export class SetUserInfoAction implements Action {
  readonly type: string = authActions.setUserInfo;
  constructor(public payload: User) { }
}

export class SetErrorAction implements Action {
  readonly type: string = authActions.setError;
  constructor(public payload: string) { }
}

export class LogoutAction implements Action {
  readonly type: string = authActions.logout;
}
