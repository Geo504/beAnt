interface User {
  id: string;
  name: string;
  email: string;
  img?: string;
}
interface UserSubset {
  id: string;
  name: string;
  img?: string;
  email?: string;
}


export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  users: User[];
}
interface AccountSubset {
  id: string;
  currency: string;
  name: string;
}


export interface Transaction {
  id: string;
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
  account: AccountSubset;
  date: Date;
  status: "paid" | "pending" | "canceled";
  user: UserSubset;
}