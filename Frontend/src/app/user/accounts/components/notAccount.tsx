import { LogoSvg } from "@/src/components/icons";



export default function NotAccounts() {
  return (
    <div className="grow flex flex-col items-center justify-center gap-2">
      <LogoSvg className="mb-4" size={80} />

      <h1 className="text-6xl">Sorry!</h1>
      <h2 className="text-2xl">Not accounts created yet</h2>
      <p className="text-muted-foreground text-center">
        First you need to create an account.
      </p>
    </div>
  )
}
