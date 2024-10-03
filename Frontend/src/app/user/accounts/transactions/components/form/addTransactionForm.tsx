import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";

import { createTransactionResponse } from "@/src/services/transactionData";
import { Account } from "@/src/interfaces";
import { categoryIcons, transactionsCategories } from "@/src/app/user/accounts/transactions/utils/transactionCategory";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Calendar } from "@/src/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarSvg, MinusCircleSvg, PlusCircleSvg } from "@/src/components/icons";



interface InputsSended {
  name: string;
  value: number;
  category: string;
  accountId: string;
  date: string;
}

interface Props {
  allAccounts: Account[];
  currentAccount?: Account | undefined;
  setIsOpen: (isOpen: boolean) => void;
  createTransaction: (data: {name: string, value: number, category: string, accountId: string, date: string}) => Promise<createTransactionResponse | null>;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "A description is necessary."}).max(35),
  value: z
    .string()
    .min(1, { message: "Required or invalid value."})
    .max(12, { message: "Value is too long."})
    .refine((value: string) => {
      const isValidNumber = /^-?\d+(\.\d{1,2})?$/.test(value);
      if (!isValidNumber) return false;
      return true;
    }, { message: "Maximum 2 decimal." })
    .refine((value: string) => {
      if (Number(value) === 0) return false;
      return true;
    }, { message: "Value can not be 0." }),
  category: z.string(),
  accountId: z.string(),
  date: z
    .date(),
})



export default function AddTransactionForm({ allAccounts, currentAccount, setIsOpen, createTransaction }: Props) {
  const [currency, setCurrency] = useState(currentAccount?.currency);

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: "",
      category: undefined,
      accountId: currentAccount?.id,
      date: new Date(),
    },
  })
  

  const { accountId } = form.watch();

  useEffect(() => {
    if (accountId !== undefined) {
      const selectedAccount = allAccounts.find(account => account.id === accountId);
      setCurrency(selectedAccount?.currency);
    }
  }, [accountId]);


  const formValue = form.getValues("value");
  const invalidValue = !!form.getFieldState("value").error || formValue === "";
  const isNegative = formValue.charAt(0) === '-';
  const toggleSign = () => {
    form.setValue("value", String(-Number(form.getValues("value"))));
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues: InputsSended = {
      ...values,
      value: Number(values.value),
      date: values.date.toISOString(),
    };

    try {
      const success = await createTransaction(formattedValues);
      if (!success) {
        return toast.error("Error creating transaction. Please try again.");
      }
      setIsOpen(false);
      toast.success("Transaction created successfully.");
      
    } catch (error) {
      toast.error("Error creating transaction. Please try again.");
    }
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex flex-col gap-4">

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-8 pl-3 text-left font-normal bg-transparent border border-muted-foreground",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarSvg className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1910-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent border-muted-foreground">
                      <SelectValue placeholder="Choose a category"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-[14.1rem]">
                    {transactionsCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          {categoryIcons[category]} {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input className="bg-transparent border-muted-foreground" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-transparent border-muted-foreground pl-9 pr-12 no-arrows"
                        {...field}
                      />
                    </FormControl>
                    {!invalidValue && (
                      <FormDescription>
                        This will count as an {isNegative ? "expense" : "income"}.
                      </FormDescription>
                    )}
                    <span className="absolute right-0 top-1 opacity-50 border-l border-muted-foreground w-7 text-center">
                      {currency}
                    </span>
                    <button
                      type="button"
                      onClick={toggleSign}
                      disabled={invalidValue}
                      className={`absolute left-1 top-1 flex justify-center items-center w-6 h-6 text-white rounded hover:opacity-80 transition-opacity duration-200 ${isNegative ? "bg-destructive" : "bg-[#8db347]"}`}>
                        {isNegative
                          ? <MinusCircleSvg size={20} />
                          : <PlusCircleSvg size={20} />
                        }
                    </button>
                  </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size={"full"} className="mt-4">
            Create Transaction
          </Button>
        </div>


      </form>
    </Form>
  )
}