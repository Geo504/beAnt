import { createAccount, getAllAccounts, updateFavoriteAccount } from "@/src/services/accountData";

import Accounts from "./components/accounts";



export default async function AccountsPage() {
  const allAccounts = await getAllAccounts();


  
  return (
    <>
    <h1 className="text-2xl font-semibold mt-1 text-primary">Accounts</h1>

    <Accounts 
      allAccounts={allAccounts}
      updateFavoriteAccount={updateFavoriteAccount}
      createAccount={createAccount}
    />
    </>
  )
}