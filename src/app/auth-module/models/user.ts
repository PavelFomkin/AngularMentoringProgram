import {UserName} from './user-name';

export interface User {
  id: number;
  fakeToken: string;
  name: UserName;
  login: string;
  password: string;
}
