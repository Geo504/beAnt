interface User {
  id: string;
  name: string;
  email: string;
  img?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  users: User[];
}
