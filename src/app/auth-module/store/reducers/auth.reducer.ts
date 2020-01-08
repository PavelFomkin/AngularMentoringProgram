import {Action} from '@ngrx/store';
import {AuthState} from '../auth.state';
import {authActions, SetErrorAction, SetUserInfoAction} from '../actions/auth.actions';

const initialState: AuthState = {
  user: null,
  error: null,
};

export function authReducer(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case authActions.setUserInfo:
      return ({user: (action as SetUserInfoAction).payload, error: null});
    case authActions.setError:
      return ({error: (action as SetErrorAction).payload, user: null});
    case authActions.logout:
      return initialState;
    default:
      return state;
  }
}
