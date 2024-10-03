

type User = {
  name: string;
  email: string;
  img?: string;
}
type Account = {
  name: string;
}

export interface Invitation {
  id: string;
  sender: User;
  guest: User;
  role: string;
  account: Account;
  createdAt: Date;
}