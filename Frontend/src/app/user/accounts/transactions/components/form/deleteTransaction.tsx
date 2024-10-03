import { toast } from "sonner";

import { Transaction } from "@/src/interfaces";

import { TrashSvg } from "@/src/components/icons";
import { Button } from "@/src/components/ui/button";




interface Props {
  deleteTransaction: (id: string) => Promise<boolean>;
  setIsOpen: (isOpen: boolean) => void;
  transaction?: Transaction;
}

export default function DeleteTransaction({transaction, deleteTransaction, setIsOpen}: Props) {

  const handleDelete = async() => {
    try {
      const success = await deleteTransaction(transaction?.id || "");
      if (!success) {
        return toast.error("Error deleting transaction. Please try again.");
      }
      setIsOpen(false);
      toast("Transaction deleted successfully.");
    } catch (error) {
      toast.error("Error deleting transaction. Please try again.");
    }
  }



  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Are you sure you want to delete this transaction? This action cannot be undone.
      </p>
      
      <ul className="text-xs opacity-70 border rounded border-primary py-3 px-4 self-center bg-secondary">
        <li>Description: <b>{transaction?.name}</b></li>
        <li>Value: <b>{transaction?.account.currency} {transaction?.value.toFixed(2)}</b></li>
        <li>Category: <b>{transaction?.category}</b></li>
        <li>Date: <b>{transaction?.date ? new Date(transaction.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</b></li>
        <li>Account: <b>{transaction?.account.name}</b></li>

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
