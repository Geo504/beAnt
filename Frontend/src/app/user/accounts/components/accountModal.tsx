"use client";

import { UpdateAccountResponse } from "@/src/services/accountData";
import { useAccountModalStore } from "@/src/store/accountModal";
import DeleteAccount from "./main/form/deleteAccount";
import UpdateAccountForm from "./main/form/updateAccountForm";
import { Account } from "@/src/interfaces";

import Modal from "@/src/components/ui/modal";
import AddTransactionForm from "./main/form/addTransactionForm";
import { createTransactionResponse } from "@/src/services/transactionData";




interface Props {
  allAccounts: Account[] | [];
  accountData: Account;
  updateAccount: (accountId: string, data: {name: string, currency: string}) => Promise<UpdateAccountResponse | null>;
  createTransaction: (data: {name: string, value: number, category: string, accountId: string, date: string}) => Promise<createTransactionResponse | null>;
  deleteAccount: (id: string) => Promise<boolean>;
}



export default function AccountModal({ accountData, updateAccount, deleteAccount, allAccounts, createTransaction }: Props) {

  const { isOpen, setIsOpen, modalData } = useAccountModalStore();



  const renderComponent = () => {
    switch (modalData.action) {
      case "edit":
        return (
          <UpdateAccountForm 
            accountData={accountData} 
            updateAccount={updateAccount} 
            setIsOpen={setIsOpen}
          />
        );
      case "addTransaction":
        return (
          <AddTransactionForm
            allAccounts={allAccounts}
            currentAccount={accountData}
            createTransaction={createTransaction}
            setIsOpen={setIsOpen}
          />
        );
      case "delete":
        return (
          <DeleteAccount
            account={accountData}
            deleteAccount={deleteAccount}
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
