import Link from "next/link";

import AsSideAuth from "../components/as-side";
import LoginForm from "../components/login-form";
import HeaderForm from "../components/header-form";
import { loginUser } from "@/src/services/authData";

export default function Login() {



  return (
    <main className="flex flex-col grow items-center justify-center px-2 pb-2 sm:px-4 sm:pb-4">

      <section className="flex flex-col md:flex-row max-w-[65rem] min-h-[32rem] shadow rounded overflow-hidden">

        <AsSideAuth />

        <div className="w-full md:w-auto min-h-full px-4 py-6 text-primary bg-primary-foreground text-center">
          <HeaderForm variant="login"/>
  
          <LoginForm loginUser={ loginUser } />

          <footer className="mt-4">
            <p className="text-xs text-muted-foreground">
              Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
            </p>
          </footer>
        </div>
      </section>

    </main>
  )
}
