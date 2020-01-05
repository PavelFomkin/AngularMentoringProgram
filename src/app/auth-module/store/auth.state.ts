import {User} from '../models/user';

export interface AuthState {
  user: User;
  redirectUrl: string;
  error: string;
}
