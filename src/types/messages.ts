export type Message = {
  _id?: string;
  createdAt: number;
  author: string;
  body: string;
  seen: boolean;
};
