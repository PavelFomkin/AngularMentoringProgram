import {UserName} from './user-name';

export interface User {
  id: number;
  token: string;
  name: UserName;
  login: string;
  password: string;
}
