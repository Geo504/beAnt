import Link from "next/link";

import AsSideAuth from "../components/as-side";
import HeaderForm from "../components/header-form";
import RegisterForm from "../components/register-form";
import { registerUser } from "@/src/services/authData";



export default function Register() {


  return (
    <main className="flex flex-col grow items-center justify-center px-2 pb-2 sm:px-4 sm:pb-4">

      <section className="flex flex-col-reverse md:flex-row max-w-[65rem] min-h-[32rem] shadow rounded overflow-hidden">

        <div className="w-full md:w-auto min-h-full px-4 py-6 text-primary bg-primary-foreground text-center">
          <HeaderForm variant="register"/>
          
          <RegisterForm registerUser={registerUser}/>

          <footer className="mt-4">
            <p className="text-xs text-muted-foreground">
              You already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
            </p>
          </footer>
        </div>

        <AsSideAuth />

      </section>

    </main>
  )
}
