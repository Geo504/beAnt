"use client";
import { modalConfig, useAccountModalStore } from "@/src/store/accountModal";

import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { CreditCardPlusSvg, EditPencilSvg, OptionSvg, TrashSvg } from "@/src/components/icons";



interface Props {
  accountName: string;
}



export default function OptionAccount({ accountName }: Props) {
  const { handleOpenModal } = useAccountModalStore();

  const dropdownConfig = [
    {
      icon: <EditPencilSvg className="mr-2 h-4 w-4" />,
      text: "Edit",
      action: modalConfig.edit,
    },
    {
      icon: <CreditCardPlusSvg className="mr-2 h-4 w-4" />,
      text: "Add transaction",
      action: modalConfig.addTransaction,
    },
    {
      icon: <TrashSvg className="mr-2 h-4 w-4" />,
      text: "Delete",
      action: modalConfig.delete,
    },
  ]



  return (
    <>
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="tertiary" size="icon_sm" className="border border-primary">
          <OptionSvg />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          Account Settings
          <span className="text-xs text-muted-foreground font-normal">{accountName}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {dropdownConfig.map((item, index) => (
          <DropdownMenuItem
            key={index} 
            onClick={() => handleOpenModal(item.action)} 
            className={`${item.text==='Delete' && 'text-destructive focus:text-destructive'}`}
          >
            {item.icon}
            <span>{item.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>

    </DropdownMenu>
    </>
  )
}
