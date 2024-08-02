'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { Account } from "../interfaces";



export type GetAccountsResponse = {
  favoriteAccountId: string | null,
  accounts: Account[],
};

export async function getAllAccounts(): Promise<GetAccountsResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account`, {
    method: "GET",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export async function updateFavoriteAccount(accountId: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/favorite/${accountId}`, {
    method: "PUT",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return false;
  }

  revalidatePath('/user/accounts');
  return true;
}



export type CreateAccountResponse = {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

export async function createAccount(data: {name: string, currency?: string}): Promise<CreateAccountResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account`, {
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