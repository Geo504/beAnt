import { Button } from '@/src/components/ui/button';
import { FacebookSvg, GoogleSvg } from '@/src/components/icons';



export default function HeaderForm({variant="login"}) {

  const loginHeader = {
    title: "Login",
    description: "Login page allows users to enter login credentials for authentication and access to secure content.",
    message: "Welcome Back!"
  }

  const registerHeader = {
    title: "Register",
    description: "Register page allows users to enter login credentials for authentication and access to secure content.",
    message: "Welcome!"
  }



  return (
    <>
    <h1 className=" text-2xl font-bold text-primary mb-4">
      {variant === "login" ? loginHeader.message : registerHeader.message}
    </h1>
    <p className="text-xs text-muted-foreground my-4">
      {variant === "login" ? loginHeader.description : registerHeader.description}
    </p>
    <h3 className=" font-semibold mb-4">
      {variant === "login" ? loginHeader.title : registerHeader.title}
    </h3>

    <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
      <Button variant={"secondary"} className="text-xs px-4">
        <GoogleSvg size={20} className="mr-1"/>
        Sign in with Google
      </Button>
      <Button variant={"secondary"} className="text-xs">
        <FacebookSvg size={20} className="mr-1"/>
        Sign in with Facebook
      </Button>
    </div>
    </>
  )
}
