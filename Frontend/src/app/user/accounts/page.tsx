import { redirect } from "next/navigation";

import { getAllAccounts } from "@/src/services/accountData";

import Accounts from "./components/header/accounts";
import HeaderCurrentAccount from "./components/main/header";



export default async function AccountsPage({ searchParams }: any) {
  const allAccounts = await getAllAccounts();


  if (!searchParams.id) {
    redirect(`/user/accounts?id=${allAccounts?.favoriteAccountId}`);
  }

  
  return (
    <>
    <h1 className="text-2xl font-semibold mt-1 text-primary">
      Accounts
    </h1>
    <Accounts allAccounts={allAccounts}/>

    <HeaderCurrentAccount />
    </>
  )
}