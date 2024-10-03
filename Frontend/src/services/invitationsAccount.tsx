'use server';
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { ErrorResponse, Invitation } from "../interfaces";



export async function sendInvitation(data: {guest: string, accountId: string}): Promise<[ErrorResponse?, boolean?]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/invitations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorDescriptions: {[key: number]: string} = {
      403: "This is because only admins can invite others users to this account.",
      404: "This is because the user you are trying to invite does not exist."
    };
    
    const error = await res.json();
    const errorDescription = errorDescriptions[res.status];
  
    return [{
      errorMessage: error.error,
      errorDescription: errorDescription || undefined
    }];
  }

  revalidatePath('/user/profile');

  return [ undefined, true];
}



export async function getInvitationsReceived(): Promise<Invitation[] | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/invitations/received`, {
    method: "GET",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export async function getInvitationsSent(): Promise<Invitation[] | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/invitations/sent`, {
    method: "GET",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export async function cancelInvitation(id: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/invitations/id/${id}`, {
    method: "DELETE",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return false;
  }

  revalidatePath('/user/profile');

  return true;
}



export async function acceptInvitation(id: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/invitations/id/${id}?status=true`, {
    method: "PUT",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return false;
  }

  revalidatePath('/user/profile');

  return true;
}



export async function rejectInvitation(id: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/invitations/id/${id}?status=false`, {
    method: "PUT",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return false;
  }

  revalidatePath('/user/profile');

  return true;
}