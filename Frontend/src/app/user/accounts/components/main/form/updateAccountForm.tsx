import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { UpdateAccountResponse } from "@/src/services/accountData";
import { Account } from "@/src/interfaces";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";



interface Props {
  accountData: Account;
  updateAccount: (accountId: string, data: {name: string, currency: string}) => Promise<UpdateAccountResponse | null>;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1).max(20),
  currency: z.string().max(1),
})



export default function UpdateAccountForm({ accountData, updateAccount, setIsOpen }: Props) {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: accountData.name,
      currency: accountData.currency,
    },
  })



  const { isDirty } = form.formState;

  useEffect(() => {
    setIsSubmitEnabled(isDirty);
  }, [isDirty]);



  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const success = await updateAccount(accountData.id, values);
      if (!success) {
        return toast.error("Error updating account. Please try again.");
      }
      setIsOpen(false);
      toast.success("Account updated successfully.");

    } catch (error) {
      toast.error("Error updating account. Please try again.");
    }
  }



  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input className="bg-transparent border-muted-foreground" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent border-muted-foreground">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="€">€ (Euros)</SelectItem>
                    <SelectItem value="$">$ (Dollars)</SelectItem>
                    <SelectItem value="£">£ (Pounds)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size={"full"} className="mt-4" disabled={!isSubmitEnabled}>
            Update Changes
          </Button>
        </div>

      </form>
    </Form>
    </>
  )
}
