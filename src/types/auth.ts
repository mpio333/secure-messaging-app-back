import { User } from './user';

export type Auth = {
  isAuthenticated: boolean;
  user?: User;
};
