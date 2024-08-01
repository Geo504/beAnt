interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  users: User[];
}
