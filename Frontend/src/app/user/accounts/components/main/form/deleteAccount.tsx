import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { TrashSvg } from "@/src/components/icons";
import { Account } from "@/src/interfaces";



interface Props {
  account: Account;
  deleteAccount: (id: string) => Promise<boolean>;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DeleteAccount({account, deleteAccount, setIsOpen}: Props) {

  const handleDelete = async() => {
    try {
      const success = await deleteAccount(account.id);
      if (success) {
        setIsOpen(false);
        toast("Account deleted successfully.");
      }
    } catch (error) {
      toast.error("Error deleting account. Please try again.");
    }
  }


  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Are you sure you want to delete this account? This action cannot be undone and all related data will be erase.
      </p>
      
      <ul className="text-xs opacity-70 border rounded border-primary py-3 px-4 self-center bg-secondary">
        <li>Account: <b>{account.name}</b></li>
        <li>Balance: <b>{account.balance.toFixed(2)} {account.currency}</b></li>
        <li>Members: <b>{account.users.length}</b></li>
      </ul>

      <div className="mt-2 flex justify-end gap-4">
        <Button variant={"secondary"} className="w-20" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button variant={"destructive"} className="w-20" onClick={handleDelete}>
          <TrashSvg className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}
