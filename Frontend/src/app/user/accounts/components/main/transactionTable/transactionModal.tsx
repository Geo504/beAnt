"use client";
import { updateTransactionResponse } from "@/src/services/transactionData";

import { useTransactionModalStore } from "@/src/store/transactionModal";
import UpdateTransactionForm from "../form/updateTransactionForm";
import { Account, Transaction } from "@/src/interfaces";

import Modal from "@/src/components/ui/modal";
import DeleteTransaction from "../form/deleteTransaction";




interface Props {
  allAccounts: Account[] | [];
  accountData: Account;
  updateTransaction: (data: {name: string, value: number, category: string, accountId: string, date: string}, id: string) => Promise<updateTransactionResponse | null>;
  deleteTransaction: (id: string) => Promise<boolean>;
}



export default function TransactionModal({ allAccounts, accountData, updateTransaction, deleteTransaction }: Props) {

  const { isOpen, setIsOpen, modalData } = useTransactionModalStore();



  const renderComponent = () => {
    switch (modalData.action) {
      case "edit":
        return (
          <UpdateTransactionForm 
            allAccounts={allAccounts}
            currentAccount={accountData}
            updateTransaction={updateTransaction}
            transaction={modalData.transaction}
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
