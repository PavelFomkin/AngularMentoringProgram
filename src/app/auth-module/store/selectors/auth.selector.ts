import {AuthState} from '../auth.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {User} from '../../models/user';

export const authState = 'authState';
export const getAuthState = createFeatureSelector(authState);

export const selectUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);
export const selectError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const selectToken = createSelector(
  selectUser,
  (user: User) => !!user ? user.fakeToken : null
);
export const selectUserName = createSelector(
  selectUser,
  (user: User) => !!user ? user.name.first + ' ' + user.name.last : null
);
