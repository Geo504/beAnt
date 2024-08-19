import { redirect } from "next/navigation";

import { deleteAccount, getAccount, getAllAccounts, updateAccount } from "@/src/services/accountData";
import { createTransaction } from "@/src/services/transactionData";

import AllAccounts from "./components/header/allAccounts";
import HeaderCurrentAccount from "./components/main/header";
import AccountModal from "./components/accountModal";
import TransactionTable from "./components/main/transactionTable/transactionTable";



export default async function AccountsPage({ searchParams }: any) {
  const allAccounts = await getAllAccounts();
  const accountData = await getAccount(searchParams.id);
  
  
  if (!searchParams.id) {
    redirect(`/user/accounts?id=${allAccounts?.favoriteAccountId}`);
  }



  return (
    <>
    <AllAccounts allAccounts={allAccounts}/>

    {!accountData ? (
      <div className="flex flex-col items-center justify-center min-h-96">
        <h1 className="text-2xl font-bold">Account not found</h1>
      </div>
    ) : (
      <>
      <AccountModal
        accountData={accountData}
        updateAccount={updateAccount}
        deleteAccount={deleteAccount}
        allAccounts={allAccounts?.accounts || []}
        createTransaction={createTransaction}
      />

      <HeaderCurrentAccount accountName={accountData.name}/>

      <section className="grid grid-cols-4 gap-4">
        <TransactionTable
          accountData={accountData}
          allAccounts={allAccounts?.accounts || []}
        />
      </section>
      </>
    )}

    </>
  )
}