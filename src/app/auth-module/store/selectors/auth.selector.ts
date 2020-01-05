import {AuthState} from '../auth.state';
import {createSelector} from '@ngrx/store';
import {User} from '../../models/user';

export const selectUser = (state: AuthState) => state.user;
export const selectRedirectUrl = (state: AuthState) => state.redirectUrl;
export const selectError = (state: AuthState) => state.error;

export const selectToken = createSelector(
  selectUser,
  (user: User) => !!user ? user.token : null
);
export const selectUserName = createSelector(
  selectUser,
  (user: User) => !!user ? user.name.first + user.name.last : null
);
