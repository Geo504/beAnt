"use client";
import { useTransactionModalStore } from "@/src/store/transactionModal";

import { Account } from "@/src/interfaces";
import { createTransaction, updateTransactionResponse } from "@/src/services/transactionData";

import AddTransactionForm from "./form/addTransactionForm";
import UpdateTransactionForm from "../components/form/updateTransactionForm";
import DeleteTransaction from "../components/form/deleteTransaction";
import Modal from "@/src/components/ui/modal";




interface Props {
  allAccounts: Account[] | [];
  updateTransaction: (data: {name: string, value: number, category: string, accountId: string, date: string}, id: string) => Promise<updateTransactionResponse | null>;
  deleteTransaction: (id: string) => Promise<boolean>;
}



export default function TransactionModal({ allAccounts, updateTransaction, deleteTransaction }: Props) {

  const { isOpen, setIsOpen, modalData } = useTransactionModalStore();



  const renderComponent = () => {
    switch (modalData.action) {
      case "add":
        return (
          <AddTransactionForm
            allAccounts={allAccounts}
            createTransaction={createTransaction}
            setIsOpen={setIsOpen}
          />
        );
      case "edit":
        return (
          <UpdateTransactionForm 
            transaction={modalData.transaction}
            allAccounts={allAccounts}
            updateTransaction={updateTransaction}
            setIsOpen={setIsOpen}
          />
        );
      case "delete":
        return (
          <DeleteTransaction
            transaction={modalData.transaction}
            deleteTransaction={deleteTransaction}
            setIsOpen={setIsOpen}
          />
        );
      default:
        return null;
    }
  };



  return (
    <Modal
      side={modalData.position }
      title={modalData?.title}
      description={modalData.description}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      { renderComponent() }
    </Modal>
  );
}
