import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";



interface JwtPayload {
  id: string;
  exp: number;
  iat: number;
}

function isValidToken(accessToken: string): boolean {
  try {
    const tokenDecode = jwtDecode(accessToken) as JwtPayload;
    const currentTime = Date.now() / 1000;
    return tokenDecode.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  
  const accessToken = request.cookies.get('access_token')?.value;
  const loggedPath = request.nextUrl.pathname.startsWith('/user');
  const loggedForbiddenPaths = ['/', '/login', '/register'].includes(request.nextUrl.pathname);
  
  if ((!accessToken && loggedPath) || (accessToken && !isValidToken(accessToken) && loggedPath)) {
    return Response.redirect(new URL('/login', request.url));
  }
  
  if (accessToken && isValidToken(accessToken) && loggedForbiddenPaths) {
    return Response.redirect(new URL('/user/home', request.url));
  }
}