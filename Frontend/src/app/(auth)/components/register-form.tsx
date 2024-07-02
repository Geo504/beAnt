"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import { RegisterResponse } from "@/src/services/authData";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input"
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
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(30),
})

interface Props {
  registerUser: (data: { name: string; email: string; password: string }) => Promise<RegisterResponse>
}


export default function RegisterForm({ registerUser }: Props) {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const resp = await registerUser(values)
      if ('errorMessage' in resp) {
        return toast.error(resp.errorMessage, resp.errorDescription ? { description: resp.errorDescription } : undefined);
      }
  
      toast.success("Successfully register",{
        description: "Please check your email to verify your account."
      });
      router.push("/login")
      
    } catch (error) {
      toast.error("An unexpected error occurred.");

    } finally {
      setLoading(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Example" autoComplete="name" {...field} />
              </FormControl>
              <FormDescription>
                This will be your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
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
                This is your email address.
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
                This will be your secret password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={"full"} type="submit" disabled={loading}>
          {loading ? 
            <>
            <LogoSvg className="animate-pulse mr-1" />Loading...
            </>
          : "Sign Me Up"}
        </Button>
      </form>
    </Form>
  )
}