import { IUser } from './index';
export interface ICheckAuthResponse {
  user:  IUser;
  token: string;
}

