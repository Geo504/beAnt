import { redirect } from "next/navigation";

import { getAllAccounts } from "@/src/services/accountData";

import HeaderCurrentAccount from "./components/main/header";
import AllAccounts from "./components/header/accounts";



export default async function AccountsPage({ searchParams }: any) {
  const allAccounts = await getAllAccounts();


  if (!searchParams.id) {
    redirect(`/user/accounts?id=${allAccounts?.favoriteAccountId}`);
  }

  
  return (
    <>
    <AllAccounts allAccounts={allAccounts}/>

    <HeaderCurrentAccount accountId={searchParams.id}/>
    </>
  )
}