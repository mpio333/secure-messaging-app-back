import { Message } from './messages';

export type Thread = {
  _id: string;
  admin: string;
  user: string;
  messages?: Message[];
};
