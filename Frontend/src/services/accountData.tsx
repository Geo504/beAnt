'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { Account, ErrorResponse } from "../interfaces";



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
export async function createAccount(data: {name: string, currency?: string}): Promise<CreateAccountResponse | ErrorResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });

  if (res.status === 403) {
    return {errorMessage: 'You have reached the maximum number of accounts'};
  }
  if (!res.ok) {
    return {errorMessage: 'Error creating account. Please try again.'};
  }

  revalidatePath('/user/accounts');
  return res.json();
}



export async function getAccount(accountId: string): Promise<Account | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${accountId}`, {
    method: "GET",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export type UpdateAccountResponse = {
  id: string;
  name: string;
  currency: string;
}
export async function updateAccount(accountId: string, data: {name: string, currency: string}): Promise<UpdateAccountResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${accountId}`, {
    method: "PUT",
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



export async function deleteAccount(accountId: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/${accountId}`, {
    method: "DELETE",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return false;
  }

  revalidatePath('/user/accounts');
  return true;
}