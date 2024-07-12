"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner";

import { LoginResponse } from "@/src/services/authData";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { EyeCloseSvg, EyeOpenSvg, LogoSvg } from "@/src/components/icons";



const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
})

interface Props {
  loginUser: (data: { email: string; password: string }) => Promise< LoginResponse >
}



export default function LoginForm( { loginUser }: Props) {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    try {
      const resp = await loginUser(values);
      if ('errorMessage' in resp) {
        return toast.error(resp.errorMessage, resp.errorDescription ? { description: resp.errorDescription } : undefined);
      }
      toast.success(`Welcome back ${resp.user.name}!`);
      router.push("/user/home");

    } catch (error) {
      toast.error("An unexpected error occurred.");

    } finally {
      setLoading(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" autoComplete="email" {...field} />
              </FormControl>
              <FormDescription>
                Enter your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input type={viewPassword ? "text" : "password"} className="pr-7" {...field} />
                </FormControl>
                <button type="button" className="absolute right-1 top-1" onClick={()=>setViewPassword(!viewPassword)}>
                  {viewPassword ? <EyeOpenSvg /> : <EyeCloseSvg />}
                </button>
              </div>
              <FormDescription>
                Enter your secret password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={"full"} type="submit" disabled={loading} className="mt-10">
        {loading ? 
            <>
            <LogoSvg className="animate-pulse mr-1" />Loading...
            </>
          : "Sign Me In"}
        </Button>
      </form>
    </Form>
  )
}
