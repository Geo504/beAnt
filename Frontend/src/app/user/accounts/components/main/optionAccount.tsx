"use client";
import { accountModalConfig, useAccountModalStore } from "@/src/store/accountModal";
import { useNavbarStore } from "@/src/store/navbar";

import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { AddUserSvg, CreditCardPlusSvg, EditPencilSvg, OptionSvg, TrashSvg } from "@/src/components/icons";



interface Props {
  accountName: string;
  users: any[];
}



export default function OptionAccount({ accountName, users }: Props) {
  const { handleOpenModal } = useAccountModalStore();
  const { userData } = useNavbarStore();


  const user = users.find(user => user.email === userData?.email);
  const isAdmin = user?.role === 'admin';



  const dropdownConfig = [
    {
      icon: <EditPencilSvg className="mr-2 h-4 w-4" />,
      text: "Edit",
      action: accountModalConfig.edit,
      requiresAdmin: true,
    },
    {
      icon: <CreditCardPlusSvg className="mr-2 h-4 w-4" />,
      text: "Add Transaction",
      action: accountModalConfig.addTransaction,
    },
    {
      icon: <AddUserSvg className="mr-2 h-4 w-4" />,
      text: "Invite Friend",
      action: accountModalConfig.addUser,
      requiresAdmin: true,
    },
    {
      icon: <TrashSvg className="mr-2 h-4 w-4" />,
      text: "Delete",
      action: accountModalConfig.delete,
      requiresAdmin: true,
    },
  ]



  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };



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
          <span className="text-xs text-muted-foreground font-normal">
            {user && capitalizeFirstLetter(user.role)}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {dropdownConfig.map((item, index) => (
          <DropdownMenuItem
            key={index} 
            onClick={() => handleOpenModal(item.action)} 
            className={`${item.text==='Delete' && 'text-destructive focus:text-destructive'}`}
            disabled={item.requiresAdmin && !isAdmin}
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
