import { LogoSvg } from "@/src/components/icons";



export default function NotFoundAccount() {
  return (
    <div className="grow flex flex-col items-center justify-center">
      <LogoSvg className="mb-4" size={80} />

      <h1 className="text-6xl">404</h1>
      <h2 className="text-2xl">Account Not Found</h2>
      <p className="text-muted-foreground text-center">
        Sorry, we couldn't find the account you're looking for.
      </p>
    </div>
  )
}
