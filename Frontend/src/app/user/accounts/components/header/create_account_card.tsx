"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CreateAccountResponse } from "@/src/services/accountData";
import { ErrorResponse } from "@/src/interfaces";

import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/src/components/ui/form"
import { PlusCircleSvg } from "@/src/components/icons";


interface Props {
  accountNumber: number;
  createAccount: (data: { name: string, currency?: string }) => Promise<CreateAccountResponse | ErrorResponse>;
}

const formSchema = z.object({
  name: z.string().min(1).max(20),
});

export default function CreateAccountCard({ accountNumber, createAccount }: Props) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  
  const { errors } = form.formState;


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await createAccount(values);

      if ('errorMessage' in resp) {
        return toast.error(resp.errorMessage);
      }

      form.reset();
      toast.success("Account created successfully");
      
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="px-4 py-2 rounded w-full bg-secondary text-primary">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative flex justify-between items-center">
            <h3 className="font-medium mt-1 mb-3 mr-6">Create Account</h3>
            <button type="submit" className="absolute top-0 -right-2 p-0.5 rounded text-muted-foreground hover:shadow dark:hover:shadow-primary/50 hover:bg-background transition-all duration-300">
              <PlusCircleSvg size={26}/>
            </button>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className={`border-muted-foreground ${errors.name ? 'bg-destructive/10 border-destructive' : 'bg-transparent border-muted-foreground'}`}
                    placeholder="Account Name"
                    autoComplete="off"
                    {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <p className="text-xs mt-2 pt-1 border-t text-primary/60">
        Accounts: {accountNumber}
      </p>
    </div>
  )
}
