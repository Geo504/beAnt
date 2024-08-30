// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// import { UpdateAccountResponse } from "@/src/services/accountData";
import { Account } from "@/src/interfaces";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { AddUserSvg } from "@/src/components/icons";



interface Props {
  allAccounts: Account[];
  currentAccount?: Account | undefined;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  guestEmail: z.string().email(),
  accountId: z.string().min(10),
})



export default function InviteUserForm({ allAccounts, currentAccount, setIsOpen }: Props) {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestEmail: "",
      accountId: currentAccount?.id,
    },
  })



  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      // const success = await updateAccount(accountData.id, values);
      // if (!success) {
      //   return toast.error("Error updating account. Please try again.");
      // }
      setIsOpen(false);
      toast.success("Invitation send successfully.");

    } catch (error) {
      toast.error("Error sending invitation. Please try again.");
    }
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="accountId"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent border-muted-foreground">
                      <SelectValue placeholder="Select an account"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allAccounts.map((account) => (
                      <SelectItem 
                        key={account.id} 
                        value={account.id}
                      >
                        {account.name}
                        <span className="ml-2 opacity-60 text-xs">
                          ({account.currency} {account.balance.toFixed(2)})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>
                  Select the account you want to invite the user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guestEmail"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Guest Email</FormLabel>

                <div className="relative">
                  <FormControl>
                    <Input className="bg-transparent border-muted-foreground" {...field} />
                  </FormControl>
                  <span className="absolute right-0 top-1.5 opacity-50 border-l border-muted-foreground w-7 pl-[0.22rem]">
                    <AddUserSvg className="h-5 w-5 "/>
                  </span>
                </div>

                <FormDescription>
                  Enter the email of the user you want to invite to this account.
                </FormDescription>
                <FormMessage />

              </FormItem>
            )}
          />

          <Button type="submit" size={"full"} className="mt-4">
            Send Invitation
          </Button>
        </div>

      </form>
    </Form>
  )
}
