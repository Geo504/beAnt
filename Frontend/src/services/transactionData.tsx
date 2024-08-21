'use server';
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { Transaction } from "../interfaces";



export type createTransactionResponse = {
  id: string;
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
  accountId: string;
  date: Date;
  status: "paid" | "pending" | "send" | "rejected" | "canceled";
  userId: string;
}
export async function createTransaction(data: {name: string, value: number, category: string, accountId: string, date: string}): Promise<createTransactionResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return null;
  }

  revalidatePath('/user/accounts');
  return res.json();
}




export type getTransactionsByIdResponse = {
  totalItems: number;
  actualPage: number;
  totalPages: number;
  limitPerPage: number;
  transactions: Transaction[];
}
export async function getTransactionsById(accountId: string): Promise<getTransactionsByIdResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/transactions?accountId=${accountId}&limit=5`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export type getTransactionsResponse = {
  totalItems: number;
  actualPage: number;
  totalPages: number;
  limitPerPage: number;
  transactions: Transaction[];
}
export async function getTransactions(query?: { accountId?: string; search?: string; page?: string }): Promise<getTransactionsByIdResponse | null> {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/transactions`);

  if (query && (query.accountId || query.search || query.page)) {
    if (query.accountId) {
      url.searchParams.append('accountId', query.accountId);
    }
    if (query.search) {
      url.searchParams.append('search', query.search);
    }
    if (query.page) {
      url.searchParams.append('page', query.page);
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}




export type updateTransactionResponse = {
  id: string;
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
  accountId: string;
  date: Date;
  status: "paid" | "pending" | "send" | "rejected" | "canceled";
  userId: string;
}
export async function updateTransaction(data: { name: string, value: number, category: string, accountId: string, date: string}, id: string): Promise<updateTransactionResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log(res);
    return null;
  }

  revalidatePath('/user/accounts');
  return res.json();
}



export async function deleteTransactionById(id: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/transactions/${id}`, {
    method: "DELETE",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return false;
  }

  revalidatePath('/user/accounts');
  return true;
}