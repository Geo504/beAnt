"use client";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { EditPencilSvg, OptionSvg, TrashSvg } from "@/src/components/icons";


interface Props {
  id: string ;
  name: string ;
  deleteAccount: (id: string) => Promise<boolean>;
}

export default function OptionAccount({ id, name, deleteAccount }: Props) {

  async function handleDelete() {
    try {
      const success = await deleteAccount(id);
      if (success) {
        toast.success("Account deleted successfully.");
      }
    } catch (error) {
      toast.error("An error occurred deleting account. Please try again.");
    }
  }



  const dropdownContent = [
    {
      icon: <EditPencilSvg className="mr-2 h-4 w-4" />,
      text: "Edit"
    },
    {
      icon: <TrashSvg className="mr-2 h-4 w-4" />,
      text: "Delete"
    }
  ]


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="icon_sm" className="border border-primary">
          <OptionSvg />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          Account Options
          <span className="text-xs text-muted-foreground font-normal">{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {dropdownContent.map(({ icon, text }) => (
          <DropdownMenuItem key={text} onClick={ handleDelete }>
            {icon} {text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
