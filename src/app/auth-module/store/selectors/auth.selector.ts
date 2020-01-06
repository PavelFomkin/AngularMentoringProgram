import {AuthState} from '../auth.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {User} from '../../models/user';

export const getProductsState = createFeatureSelector('authState');

export const selectUser = createSelector(
  getProductsState,
  (state: AuthState) => state.user
);
export const selectError = createSelector(
  getProductsState,
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
