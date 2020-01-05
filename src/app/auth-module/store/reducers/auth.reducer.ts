import {Action, createReducer, on} from '@ngrx/store';
import {AuthState} from '../auth.state';
import * as AuthActions from '../actions/auth.actions';

export const initialState: AuthState = {
  user: null,
  redirectUrl: '',
  error: null,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, props) => ({...state, user: props.user, error: null})),
  on(AuthActions.loginFail, (state, props) => ({...state, error: props.error, user: null})),

  // on(AuthActions.setError, (state, props) => ({...state, error: props.error})),
  // on(AuthActions.removeError, (state) => ({...state, error: null})),

  on(AuthActions.setUser, (state, props) => ({...state, user: props.user})),
  on(AuthActions.removeUser, (state) => ({...state, user: null})),

  // on(AuthActions.saveToken, (state, props) => ({...state, user.token: props.token})),
  // on(AuthActions.removeToken, (state) => ({...state, token: null})),

  on(AuthActions.setRedirectUrl, (state, props) => ({...state, redirectUrl: props.redirectUrl})),
  on(AuthActions.removeRedirectUrl, (state) => ({...state, redirectUrl: ''})),
);

export function authReducer(state: AuthState, action: Action) {
  return reducer(state, action);
}
