import { redirect } from "next/navigation";

import { deleteAccount, getAccount, getAllAccounts, updateAccount } from "@/src/services/accountData";
import { createTransaction } from "@/src/services/transactionData";

import HeaderCurrentAccount from "./components/main/header";
import AllAccounts from "./components/header/allAccounts";
import AccountModal from "./components/accountModal";



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
      </>
    )}

    </>
  )
}