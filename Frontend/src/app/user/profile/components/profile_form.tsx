"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";

import { ErrorResponse } from "@/src/interfaces";
import { GetProfileResponse, UpdateProfileResponse } from "@/src/services/authData";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Calendar } from "@/src/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CalendarSvg, UpdateSvg } from "@/src/components/icons";



interface Props {
  profileData: GetProfileResponse | null;
  updateProfile: (data: UpdateProfileResponse) => Promise<UpdateProfileResponse | ErrorResponse>;
}

const formSchema = z.object({
  name: z.string().min(2).max(20),
  lastName: z.string().max(20),
  profession: z.string().max(20),
  phone: z.string().max(15),
  birth: z.date(),
}).partial();



export default function ProfileForm({ profileData, updateProfile }: Props) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profileData?.user.name || "",
      lastName: profileData?.lastName || "",
      profession: profileData?.profession || "",
      phone: profileData?.phone || "",
      birth: profileData?.birth ? new Date(profileData.birth) : undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const filteredValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        .filter(([_, value]) => value !== undefined && value !== '')
    );
    
    try {
      const updatedProfile = await updateProfile(filteredValues);
      if ('errorMessage' in updatedProfile) {
        return toast.error(updatedProfile.errorMessage);
      }
      toast.success("Profile updated successfully!");

    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-left">

        <header className="flex justify-between items-center border-b-2">
          <h2 className="text-lg font-semibold text-primary">Profile Setup</h2>
          <Button size="sm" className="mb-2" type="submit">
            Update
            <UpdateSvg className="ml-1" size={18}/>
          </Button>
        </header>

        <main className="flex flex-col sm:flex-row gap-6 mt-2">
          <div className="grow space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className="bg-transparent border-muted-foreground" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input  className="bg-transparent border-muted-foreground" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-transparent border-muted-foreground" value={profileData?.user.email} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          <div className="grow space-y-4">
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input className="bg-transparent border-muted-foreground" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input className="bg-transparent border-muted-foreground" autoComplete="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth</FormLabel>
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
          </div>
        </main>


      </form>
    </Form>
  )
}
