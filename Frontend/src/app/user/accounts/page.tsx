import { notFound, redirect } from "next/navigation";

import { deleteAccount, getAccount, getAllAccounts, updateAccount } from "@/src/services/accountData";
import { createTransaction } from "@/src/services/transactionData";

import AllAccounts from "./components/header/allAccounts";
import HeaderCurrentAccount from "./components/main/header";
import AccountModal from "./components/accountModal";
import TransactionTable from "./components/main/transactionTable/transactionTable";
import NotFoundAccount from "./components/notFoundAccount";



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
      <NotFoundAccount />
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