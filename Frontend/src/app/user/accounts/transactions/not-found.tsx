import Link from "next/link";

import { AccountsSvg, HomeSvg, LogoSvg } from "@/src/components/icons";


export default function() {
  return (
    <div className="grow flex flex-col items-center justify-center gap-2">
      <LogoSvg className="mb-4" size={80} />

      <h1 className="text-6xl">404</h1>
      <h2 className="text-2xl">Transactions Not Found</h2>
      <p className="text-muted-foreground text-center">
        Sorry, we couldn't find the transactions you're looking for. <br />
        This may be cause if you don't have any transactions or account yet.
      </p>

      <Link href={'./'} className="mt-4 flex items-center gap-0.5 font-semibold hover:underline">
        <AccountsSvg />
        Create Account
      </Link>

      <Link href={'/user/home'} className="mt-4 flex items-center gap-0.5 font-semibold hover:underline">
        <HomeSvg />
        Back to home
      </Link>
    </div>
  )
}
