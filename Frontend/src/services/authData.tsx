'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { jwtDecode } from "jwt-decode";

import { ErrorResponse, User } from "../interfaces";



export type RegisterResponse = {success: true} | ErrorResponse;

export async function registerUser(data: {name: string, email: string, password: string}) : Promise<RegisterResponse> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = 'Error. Please try again later.'
    let errorDescription = ''

    if (res.status === 400) {
      errorMessage = 'Credentials are invalid.'
    }
    return { errorMessage, errorDescription };
  }
  
  return {success: true};
}




export type LoginResponse = {user: User} | ErrorResponse;

export async function loginUser(data: {email: string, password: string}): Promise< LoginResponse > {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!res.ok) {
    let errorMessage = 'Credentials are invalid.'
    let errorDescription = ''

    if (res.status === 500) {
      errorMessage = 'Error. Please try again later.'
    } else if (res.status === 401) {
      errorMessage = 'Email not verified.'
      errorDescription = 'Please check your email to verify your account.'
    }
    return { errorMessage, errorDescription };
  }
  
  const cookieHeader = res.headers.get('set-cookie');
  if (!cookieHeader) throw new Error("Cookie header not found in the response.");
  
  const accessToken = cookieHeader.match(/access_token=([^;]+)/)?.[1];
  if (!accessToken) throw new Error("Access token not found in the response.");
  const tokenDecoded = jwtDecode(accessToken);

  const cookieOptions = {
    path: '/',
    httpOnly: true,
    sameSite: true,
    secure: /Secure/.test(cookieHeader),
    expires: new Date(tokenDecoded.exp! * 1000),
  };
  
  cookies().set('access_token', accessToken, cookieOptions);
  
  const response = await res.json();
  return response;
}



export async function logoutUser(): Promise<boolean> {
  cookies().delete('access_token');
  return true;
}



export async function getUser(): Promise<User | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
    method: "GET",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export type GetProfileResponse = {
  user: User;
  lastName?: string;
  profession?: string;
  phone?: string;
  birth?: Date;
}

export async function getUserProfile(): Promise<GetProfileResponse | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/profile`, {
    method: "GET",
    headers: {Cookie: cookies().toString()},
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}



export type UpdateProfileResponse = {
  name?: string;
  lastName?: string;
  profession?: string;
  phone?: string;
  birth?: Date;
}

export async function updateUser(data: UpdateProfileResponse): Promise<UpdateProfileResponse | ErrorResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return {errorMessage: 'Error updating. Please try again.'};
  }

  revalidatePath('/user/profile');
  return res.json();
}