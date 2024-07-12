import Link from "next/link";
import { cookies } from "next/headers";

import { HomeSvg, LogoSvg } from "../components/icons";



export default function () {
  let redirectUrl = '/login';

  const accessToken = cookies().get('access_token');
  if (accessToken) {
    redirectUrl = '/user/home';
  }

  return (
    <main className="flex flex-col grow items-center justify-center px-4 pb-2 sm:px-4 sm:pb-4 text-primarySoft">
      <LogoSvg className="mb-4" size={80} />

      <h1 className="text-6xl">404</h1>
      <h2 className="text-2xl">Page Not Found</h2>
      <p className="text-muted-foreground text-center">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href={redirectUrl} className="mt-4 flex items-center gap-0.5 font-semibold hover:underline">
        <HomeSvg />
        Back to home
      </Link>
    </main>
  )
}
