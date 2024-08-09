'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";



export type createTransactionResponse = {
  id: string;
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
  accountId: string;
  date: Date;
  status: "paid" | "pending";
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