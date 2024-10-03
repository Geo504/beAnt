"use client"
import { ColumnDef } from "@tanstack/react-table"

import { transactionModalConfig, useTransactionModalStore } from "@/src/store/transactionModal";
import { useNavbarStore } from "@/src/store/navbar";
import { Transaction } from "@/src/interfaces"

import { Category, categoryIcons } from "@/src/app/user/accounts/transactions/utils/transactionCategory";
import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { EditPencilSvg, OptionHorizontalSvg, TrashSvg } from "@/src/components/icons";




export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "user",
    header: "Sent By",
    cell: ({ row }) => {
      const sender: any = row.getValue("user");

      return (
        <div className="flex gap-1">
          <img
            src={sender.img || "https://beant.s3.eu-west-3.amazonaws.com/web_images/default_avatar.jpg"}
            alt={sender.name}
            className="hidden sm:block w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-xs truncate">
            <p className="truncate">{sender.name}</p>
            <p className="text-muted-foreground truncate">{sender.email}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as Category;
      const Icon = categoryIcons[category];

      return (
        <div className="flex items-center gap-2">
          {Icon && <span>{Icon}</span>}
          {category}
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = {
        paid: "bg-[#8db347]",
        send: "bg-muted-foreground",
        pending: "bg-yellow-500",
        rejected: "bg-destructive",
        canceled: "bg-destructive",
      }[status];

      return (
        <span className={`text-white text-xs px-2 py-0.5 rounded-md ${variant}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"))
      const currency = row.original.account.currency;
      const formatted = `${currency} ${amount.toFixed(2)}`;

      return <div className="font-medium text-nowrap">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;
      const { handleOpenModal } = useTransactionModalStore();
      const { userData } = useNavbarStore();

      const isOwner = userData?.email === row.original.user.email;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-7 w-7 p-0" disabled={!isOwner}>
              <OptionHorizontalSvg size={20}/>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem onClick={()=> handleOpenModal(transactionModalConfig.edit, transaction)}>
              <EditPencilSvg className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={()=> handleOpenModal(transactionModalConfig.delete, transaction)}
            >
              <TrashSvg className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]