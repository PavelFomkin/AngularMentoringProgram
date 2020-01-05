import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user';

export const login = createAction('[Auth] Log in', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login success', props<{ user: User }>());
export const loginFail = createAction('[Auth] Login fail', props<{ error: string }>());

// export const setError = createAction('[Auth] Set error', props<{ error: string }>());
// export const removeError = createAction('[Auth] Remove error');

export const setRedirectUrl = createAction('[Auth] Set redirect url', props<{ redirectUrl: string }>());
export const removeRedirectUrl = createAction('[Auth] Remove redirect url');

export const setUser = createAction('[Auth] Set user', props<{ user: User }>());
export const refreshUserInfo = createAction('[Auth] Refresh user info', props<{ token: string }>());
export const removeUser = createAction('[Auth] Remove user');

// export const saveToken = createAction('[Auth] Save token', props<{ token: string }>());
// export const removeToken = createAction('[Auth] Remove token');
